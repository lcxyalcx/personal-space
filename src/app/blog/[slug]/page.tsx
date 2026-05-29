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

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} · ${siteMeta.author}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogArticle(slug);

  if (!post) {
    notFound();
  }

  const c = sectionCopy.blog;
  const bodyText = post.sections.flatMap((section) => section.paragraphs).join("\n");
  const readMin = estimateReadMinutes(`${post.title}\n${post.excerpt}\n${bodyText}`);
  const canonicalHref = `/blog/${post.slug}`;

  const likeLabels = {
    like: c.likePostLabel,
    liked: c.likedLabel,
    suffix: c.likeCountSuffix,
  };

  return (
    <main className="mx-auto max-w-4xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-24">
      <div className="module-glass module-glass--alt px-5 py-10 sm:px-8 sm:py-12">
        <nav className="mb-10 text-sm">
          <Link
            href="/#blog"
            className="inline-flex rounded-full border border-[var(--border)] bg-white/72 px-4 py-2 font-medium text-link transition-colors hover:text-[var(--link-hover)]"
          >
            ← {c.backToBlog}
          </Link>
        </nav>

        <article>
          <header className="border-b border-[var(--border)] pb-8">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-white/72 px-3 py-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-white/72 px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                {c.readApprox}
                {readMin}
                {c.readMinutes}
              </span>
              {post.tag ? (
                <span className="rounded-full border border-[var(--border)] bg-white/72 px-3 py-1.5 font-medium text-muted">
                  {post.tag}
                </span>
              ) : null}
            </div>

            <h1 className="mt-6 max-w-3xl text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.06em] text-fg sm:text-[3.4rem]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-[18px] leading-[1.82] text-muted">{post.excerpt}</p>
          </header>

          <div className="mt-10 space-y-10">
            {post.sections.map((section, index) => (
              <section
                key={index}
                className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(245,248,252,0.6))] px-5 py-6 shadow-[0_22px_42px_-34px_rgba(15,23,42,0.18)] sm:px-7 sm:py-7"
              >
                {section.heading ? (
                  <h2 className="text-[1.3rem] font-semibold tracking-[-0.04em] text-fg">
                    {section.heading}
                  </h2>
                ) : null}
                <div className={section.heading ? "mt-4 space-y-4" : "space-y-4"}>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-[17px] leading-[1.82] text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <footer className="mt-16 rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(245,248,252,0.62))] px-5 py-6 shadow-[0_22px_42px_-34px_rgba(15,23,42,0.18)] sm:px-7">
            <p className="mb-4 text-[15px] text-muted">{c.postFooterLike}</p>
            <LikeButton scope="post" href={canonicalHref} labels={likeLabels} size="md" />
          </footer>
        </article>
      </div>
    </main>
  );
}
