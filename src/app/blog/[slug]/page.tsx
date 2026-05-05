import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LikeButton } from "@/components/like-button";
import { getBlogArticle, getBlogSlugs } from "@/data/blog-articles";
import { sectionCopy, siteMeta } from "@/data/site";
import { estimateReadMinutes } from "@/lib/read-time";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogArticle(slug);
  if (!post) return { title: "未找到" };
  return {
    title: `${post.title} · ${siteMeta.author}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogArticle(slug);
  if (!post) notFound();

  const c = sectionCopy.blog;
  const bodyText = post.sections.flatMap((s) => s.paragraphs).join("\n");
  const readMin = estimateReadMinutes(`${post.title}\n${post.excerpt}\n${bodyText}`);
  const canonicalHref = `/blog/${post.slug}`;

  const likeLabels = {
    like: c.likePostLabel,
    liked: c.likedLabel,
    suffix: c.likeCountSuffix,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20">
      <div className="module-glass module-glass--alt px-5 py-10 sm:px-8 sm:py-12">
        <nav className="mb-10 text-sm">
          <Link
            href="/#blog"
            className="font-medium text-link transition-colors hover:text-[var(--link-hover)]"
          >
            ← {c.backToBlog}
          </Link>
        </nav>

        <article>
        <header className="border-b border-[var(--border)] pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-2">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
              {c.readApprox}
              {readMin}
              {c.readMinutes}
            </span>
            {post.tag ? (
              <span className="rounded-full bg-bg-alt px-2 py-0.5 font-medium text-muted">{post.tag}</span>
            ) : null}
          </div>
          <h1 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-tight text-fg sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">{post.excerpt}</p>
        </header>

        <div className="mt-10 space-y-10">
          {post.sections.map((sec, i) => (
            <section key={i}>
              {sec.heading ? (
                <h2 className="text-lg font-semibold tracking-tight text-fg">{sec.heading}</h2>
              ) : null}
              <div className={sec.heading ? "mt-4 space-y-4" : "space-y-4"}>
                {sec.paragraphs.map((p, j) => (
                  <p key={j} className="text-[17px] leading-[1.75] text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-[var(--border)] pt-10">
          <p className="mb-4 text-[15px] text-muted">{c.postFooterLike}</p>
          <LikeButton scope="post" href={canonicalHref} labels={likeLabels} size="md" />
        </footer>
        </article>
      </div>
    </main>
  );
}
