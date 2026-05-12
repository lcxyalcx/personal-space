"use client";

import Image from "next/image";
import { ArrowUpRight, FolderGit2, Mail, Sparkles, UsersRound, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { HelloCycle } from "@/components/hello-cycle";
import { hero, projects, siteMeta, social } from "@/data/site";

const socialConfig = [
  {
    href: social.github,
    label: "GitHub",
    Icon: FolderGit2,
    show: !!social.github,
  },
  {
    href: social.email,
    label: "邮件",
    Icon: Mail,
    show: !!social.email,
  },
  {
    href: social.linkedin,
    label: "LinkedIn",
    Icon: UsersRound,
    show: !!social.linkedin,
  },
  {
    href: social.twitter,
    label: "X",
    Icon: X,
    show: !!social.twitter,
  },
].filter((x) => x.show);

const spring = { type: "spring" as const, stiffness: 320, damping: 28 };

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scrollEase = useSpring(scrollYProgress, {
    stiffness: reduce ? 520 : 86,
    damping: reduce ? 520 : 24,
    mass: reduce ? 0.08 : 0.45,
  });

  const contentY = useTransform(scrollEase, [0, 1], [0, reduce ? 0 : 42]);
  const boardY = useTransform(scrollEase, [0, 1], [0, reduce ? 0 : -24]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[96vh] flex-col justify-center overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 hero-mesh" aria-hidden />

      <motion.div
        className="relative mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1.14fr)_minmax(21rem,0.86fr)] lg:gap-12"
        style={{ y: contentY }}
      >
        <div className="relative z-10 pt-4">
          <HelloCycle />

          <motion.p
            className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)] sm:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.05 }}
          >
            {siteMeta.author} · Agent Systems · AI Product Engineering
          </motion.p>

          <motion.h1
            className="mt-5 max-w-4xl text-balance font-display text-[clamp(2.85rem,7vw,5.85rem)] leading-[0.93] tracking-[-0.04em] text-fg sm:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.82, ease: "easeOut", delay: 0.12 }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-center text-[clamp(1.04rem,1.8vw,1.15rem)] leading-relaxed text-muted sm:mx-0 sm:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
          >
            {hero.subline}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.26 }}
          >
            {hero.focusAreas.map((area, i) => (
              <motion.span
                key={area}
                className="liquid-chip inline-flex items-center px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.28 + i * 0.04 }}
              >
                {area}
              </motion.span>
            ))}
          </motion.div>

          {socialConfig.length > 0 ? (
            <motion.ul
              className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:justify-start"
              initial={false}
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.34 } },
              }}
            >
              {socialConfig.map(({ href, label, Icon }) => (
                <motion.li
                  key={label}
                  variants={{
                    hidden: { opacity: 0, y: 14, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1, transition: spring },
                  }}
                >
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-button inline-flex h-12 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-fg focus-visible:ring-2 focus-visible:ring-[var(--link)] focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring}
                  >
                    <Icon className="h-[18px] w-[18px] text-muted" strokeWidth={1.75} aria-hidden />
                    {label}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          ) : null}

          <motion.p
            className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-muted-2 sm:mx-0 sm:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.42 }}
          >
            {hero.statusLine}
          </motion.p>
        </div>

        <motion.aside className="hero-board relative" style={{ y: boardY }}>
          <div className="hero-board__header">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/6">
                <Image
                  src="/author-avatar.jpg"
                  alt={`${siteMeta.author} portrait`}
                  fill
                  sizes="48px"
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Field Notes</p>
                <p className="mt-1 text-base font-medium text-white/90">How I think about systems, products, and recent work</p>
              </div>
            </div>
            <span className="hero-board__badge">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              Ongoing
            </span>
          </div>

          <motion.div
            className="hero-note-card mt-5"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.16 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">How I work</p>
            <div className="mt-4 space-y-4">
              {hero.principles.map((item) => (
                <div key={item.title} className="border-l border-white/14 pl-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/78">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-note-card mt-4"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.24 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">Recent Public Updates</p>
                <p className="mt-1 text-sm leading-relaxed text-white/62">最新公开项目会被收进作品集，但不会盖过整体研究方向。</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {projects.slice(0, 2).map((project) => (
                <div key={project.name} className="hero-update-row">
                  <div>
                    <p className="text-base font-semibold text-white">{project.name}</p>
                    <p className="mt-1 text-sm text-white/58">{project.role}</p>
                  </div>
                  <a
                    href={project.links[0]!.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/78 transition-colors hover:bg-white/14"
                  >
                    Open
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {hero.stats.map((item, i) => {
              const isBaseCard = i === hero.stats.length - 1;

              return (
                <motion.div
                  key={item.label}
                  className={`hero-stat-card${isBaseCard ? " hero-stat-card--surface" : ""}`}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.34 + i * 0.06 }}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      isBaseCard ? "text-[var(--muted-2)]" : "text-white/40"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`mt-3 text-lg font-semibold leading-snug ${
                      isBaseCard ? "text-[var(--fg)]" : "text-white"
                    }`}
                  >
                    {item.value}
                  </p>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isBaseCard ? "text-[var(--muted)]" : "text-white/60"
                    }`}
                  >
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}
