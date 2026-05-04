import { Redis } from "@upstash/redis";
import { likeSlugFromHref } from "@/lib/like-slug";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const COOKIE_SITE = "ps_liked_site";

function cookiePost(slug: string) {
  return `ps_liked_p_${slug}`;
}

function redis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function redisKeySite() {
  return "likes:site";
}

function redisKeyPost(slug: string) {
  return `likes:post:${slug}`;
}

async function readCount(r: Redis, key: string): Promise<number> {
  const v = await r.get(key);
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

type ScopeBody = { scope: "site" | "post"; href?: string };

function resolvePost(body: ScopeBody, url: URL): { slug: string; cookieName: string; redisKey: string } | null {
  const href = body.href ?? url.searchParams.get("href") ?? "";
  if (!href.trim()) return null;
  const slug = likeSlugFromHref(href.trim());
  return { slug, cookieName: cookiePost(slug), redisKey: redisKeyPost(slug) };
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const scope = url.searchParams.get("scope") === "post" ? "post" : "site";
  const r = redis();

  if (scope === "site") {
    const liked = !!req.cookies.get(COOKIE_SITE)?.value;
    const count = r ? await readCount(r, redisKeySite()) : null;
    return NextResponse.json({ count, liked, persisted: !!r });
  }

  const resolved = resolvePost({ scope: "post", href: url.searchParams.get("href") ?? undefined }, url);
  if (!resolved) {
    return NextResponse.json({ error: "missing href" }, { status: 400 });
  }
  const liked = !!req.cookies.get(resolved.cookieName)?.value;
  const count = r ? await readCount(r, resolved.redisKey) : null;
  return NextResponse.json({ count, liked, persisted: !!r });
}

export async function POST(req: NextRequest) {
  let body: ScopeBody;
  try {
    body = (await req.json()) as ScopeBody;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const scope = body.scope === "post" ? "post" : "site";
  const r = redis();

  if (scope === "site") {
    if (req.cookies.get(COOKIE_SITE)?.value) {
      const count = r ? await readCount(r, redisKeySite()) : null;
      return NextResponse.json({ count, liked: true, persisted: !!r, duplicate: true });
    }
    if (r) {
      await r.incr(redisKeySite());
    }
    const count = r ? await readCount(r, redisKeySite()) : null;
    const res = NextResponse.json({ count, liked: true, persisted: !!r, duplicate: false });
    res.cookies.set(COOKIE_SITE, "1", {
      maxAge: 60 * 60 * 24 * 400,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
    });
    return res;
  }

  const resolved = resolvePost(body, req.nextUrl);
  if (!resolved) {
    return NextResponse.json({ error: "missing href" }, { status: 400 });
  }
  if (req.cookies.get(resolved.cookieName)?.value) {
    const count = r ? await readCount(r, resolved.redisKey) : null;
    return NextResponse.json({ count, liked: true, persisted: !!r, duplicate: true });
  }
  if (r) {
    await r.incr(resolved.redisKey);
  }
  const count = r ? await readCount(r, resolved.redisKey) : null;
  const res = NextResponse.json({
    count,
    liked: true,
    persisted: !!r,
    duplicate: false,
  });
  res.cookies.set(resolved.cookieName, "1", {
    maxAge: 60 * 60 * 24 * 400,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
  });
  return res;
}
