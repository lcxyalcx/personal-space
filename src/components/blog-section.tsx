"use client";

import { ArrowUpRight, Calendar, Rss, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { blogMeta, blogPosts, sectionCopy } from "@/data/site";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

export function BlogSection() {
  const c = sectionCopy.blog;
  const hasFeed = !!blogMeta.feedUrl?.trim();

  const shareSite = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* 用户取消分享 */
    }
  };

  return (
    <section id="blog" className="scroll-mt-16 bg-bg-alt px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-2">{c.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
              {c.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-muted sm:mx-0">{c.hint}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            {hasFeed ? (
              <a
                href={blogMeta.feedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-surface px-4 py-2.5 text-sm font-medium text-fg shadow-sm transition-colors hover:border-link/30 hover:text-link"
              >
                <Rss className="h-4 w-4 text-link" strokeWidth={1.75} aria-hidden />
                {c.feedLabel}
              </a>
            ) : null}
            <button
              type="button"
              onClick={shareSite}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-surface px-4 py-2.5 text-sm font-medium text-fg shadow-sm transition-colors hover:border-link/30 hover:text-link"
            >
              <Share2 className="h-4 w-4 text-muted" strokeWidth={1.75} aria-hidden />
              {c.shareLabel}
            </button>
          </div>
        </div>

        {blogPosts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-surface/80 px-6 py-10 text-center text-[15px] leading-relaxed text-muted">
            {c.emptyHint}
          </p>
        ) : (
          <motion.ul
            className="grid gap-5 md:grid-cols-2 md:gap-6"
            initial={false}
            whileInView="show"
            viewport={{ once: true, amount: 0.15, margin: "0px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {blogPosts.map((post) => (
              <motion.li
                key={post.href}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: spring },
                }}
              >
                <article className="card-shine group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-surface p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-7">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-2">
                    <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                    <span>{post.date}</span>
                    {post.tag ? (
                      <span className="rounded-full bg-bg-alt px-2 py-0.5 font-medium text-muted">{post.tag}</span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">{post.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-link transition-colors hover:text-[var(--link-hover)]"
                  >
                    {c.readLabel}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </a>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
