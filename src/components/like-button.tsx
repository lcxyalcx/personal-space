"use client";

import { Heart } from "lucide-react";
import { startTransition, useCallback, useEffect, useState } from "react";

type LikeState = {
  count: number | null;
  liked: boolean;
  persisted: boolean;
};

type Base = {
  labels: {
    like: string;
    liked: string;
    suffix: string;
    localHint?: string;
  };
  className?: string;
  size?: "sm" | "md";
};

type Props =
  | (Base & { scope: "site" })
  | (Base & { scope: "post"; href: string });

async function fetchLike(scope: "site" | "post", href?: string): Promise<LikeState> {
  const query =
    scope === "site" ? "scope=site" : `scope=post&href=${encodeURIComponent(href ?? "")}`;
  const res = await fetch(`/api/likes?${query}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("likes fetch failed");
  }
  return (await res.json()) as LikeState;
}

async function postLike(scope: "site" | "post", href?: string): Promise<LikeState> {
  const res = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scope === "site" ? { scope: "site" } : { scope: "post", href }),
  });

  if (!res.ok) {
    throw new Error("likes post failed");
  }

  return (await res.json()) as LikeState;
}

export function LikeButton(props: Props) {
  const { labels, className = "", size = "md" } = props;
  const [state, setState] = useState<LikeState | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);

  const load = useCallback(async () => {
    try {
      const href = props.scope === "post" ? props.href : undefined;
      const data = await fetchLike(props.scope, href);
      setState(data);
      setErr(false);
    } catch {
      setErr(true);
    }
  }, [props]);

  useEffect(() => {
    startTransition(() => {
      void load();
    });
  }, [load]);

  const onClick = async () => {
    if (!state || state.liked || busy) {
      return;
    }

    setBusy(true);
    setErr(false);

    try {
      const href = props.scope === "post" ? props.href : undefined;
      const data = await postLike(props.scope, href);
      setState(data);
    } catch {
      setErr(true);
    } finally {
      setBusy(false);
    }
  };

  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const pad = size === "sm" ? "gap-1 px-2.5 py-1.5 text-xs" : "gap-1.5 px-3.5 py-2 text-[13px]";

  const liked = state?.liked ?? false;
  const count = state?.count;
  const showCount = typeof count === "number";

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <button
        type="button"
        onClick={onClick}
        disabled={!state || liked || busy}
        className={`inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(244,248,252,0.74))] font-medium text-muted shadow-[0_18px_30px_-24px_rgba(15,23,42,0.24)] transition-[color,background,border,transform,box-shadow] hover:-translate-y-0.5 hover:border-link/35 hover:text-fg hover:shadow-[0_22px_36px_-24px_rgba(47,106,246,0.28)] disabled:cursor-default disabled:opacity-90 ${pad} ${
          liked ? "border-link/25 bg-[linear-gradient(180deg,rgba(234,242,255,0.96),rgba(226,238,255,0.82))] text-fg" : ""
        }`}
        aria-pressed={liked}
        aria-label={liked ? labels.liked : labels.like}
      >
        <Heart
          className={`${iconClass} shrink-0 transition-transform ${liked ? "fill-current scale-105" : ""}`}
          strokeWidth={1.75}
          aria-hidden
        />
        <span>{liked ? labels.liked : labels.like}</span>
        {showCount ? (
          <span className="tabular-nums text-muted-2">
            · {count}
            {labels.suffix}
          </span>
        ) : null}
      </button>
      {state && !state.persisted && labels.localHint ? (
        <p className="mt-1 max-w-[14rem] text-[11px] leading-snug text-muted-2">{labels.localHint}</p>
      ) : null}
      {err ? <p className="mt-1 text-[11px] text-muted-2">Network error. Please try again later.</p> : null}
    </div>
  );
}
