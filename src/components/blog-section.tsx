"use client";

import { ArrowUpRight, Calendar, Clock, Rss, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { blogMeta, blogPosts, sectionCopy } from "@/data/site";
import { LikeButton } from "@/components/like-button";
import { estimateReadMinutes } from "@/lib/read-time";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

const likeLabelsSite = (c: (typeof sectionCopy)["blog"]) => ({
  like: c.likeSiteLabel,
  liked: c.likedLabel,
  suffix: c.likeCountSuffix,
  localHint: c.likeLocalHint,
});

const likeLabelsPost = (c: (typeof sectionCopy)["blog"]) => ({
  like: c.likePostLabel,
  liked: c.likedLabel,
  suffix: c.likeCountSuffix,
});

function isInternalHref(href: string) {
  return href.startsWith("/");
}

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
    <section id="blog" className="scroll-mt-16 bg-bg-alt px-4 py-14 sm:px-6 sm:py-20">
      <div className="module-glass module-glass--alt mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color-mix(in_oklab,var(--primary)_38%,var(--muted-2))]">
              {c.eyebrow}
            </p>
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

        <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_94%,transparent)] px-5 py-4 shadow-[var(--elevation-1)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[15px] leading-relaxed text-muted">{c.siteLikeIntro}</p>
          <LikeButton scope="site" labels={likeLabelsSite(c)} className="shrink-0" size="md" />
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
            {blogPosts.map((post) => {
              const readMin = estimateReadMinutes(`${post.title}\n${post.excerpt}`);
              return (
                <motion.li
                  key={post.href}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: spring },
                  }}
                >
                  <article className="card-shine group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-surface p-6 shadow-[var(--elevation-1)] transition-shadow hover:shadow-[var(--elevation-hover)] sm:p-7">
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
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">{post.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
                    <div className="mt-5">
                      {isInternalHref(post.href) ? (
                        <Link
                          href={post.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-link transition-colors hover:text-[var(--link-hover)]"
                        >
                          {c.readLabel}
                          <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                        </Link>
                      ) : (
                        <a
                          href={post.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-link transition-colors hover:text-[var(--link-hover)]"
                        >
                          {c.readLabel}
                          <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                        </a>
                      )}
                    </div>
                    <div className="mt-6 flex flex-col gap-2 border-t border-[var(--border)] pt-4">
                      <LikeButton scope="post" href={post.href} labels={likeLabelsPost(c)} size="sm" />
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
