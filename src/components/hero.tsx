"use client";

import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  FolderGit2,
  Mail,
  MapPin,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
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
    label: "Email",
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
].filter((item) => item.show);

const spring = { type: "spring" as const, stiffness: 220, damping: 26 };
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scrollEase = useSpring(scrollYProgress, {
    stiffness: reduce ? 420 : 92,
    damping: reduce ? 420 : 24,
    mass: reduce ? 0.1 : 0.46,
  });

  const contentY = useTransform(scrollEase, [0, 1], [0, reduce ? 0 : 34]);
  const boardY = useTransform(scrollEase, [0, 1], [0, reduce ? 0 : -18]);
  const boardRotate = useTransform(scrollEase, [0, 1], [0, reduce ? 0 : -2.5]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[90svh] flex-col justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:pb-20 lg:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 hero-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-0 hero-spectrum" aria-hidden />
      <div className="hero-prism hero-prism--left" aria-hidden />
      <div className="hero-prism hero-prism--right" aria-hidden />
      <div className="hero-orbit hero-orbit--a" aria-hidden />
      <div className="hero-orbit hero-orbit--b" aria-hidden />

      <motion.div
        className="relative mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:gap-12"
        style={{ y: contentY }}
      >
        <div className="relative z-10">
          <motion.div
            className="hero-float-badge hero-float-badge--top"
            initial={{ opacity: 0, y: 14, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.74, ease, delay: 0.22 }}
          >
            <span className="hero-float-badge__label">Latency</span>
            <span className="hero-float-badge__value">Fast enough to feel alive</span>
          </motion.div>

          <motion.div
            className="hero-kicker"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.04 }}
          >
            <span className="hero-kicker__pill">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              Personal Space
            </span>
            <span className="hero-kicker__meta">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              Shanghai / Fudan University
            </span>
          </motion.div>

          <HelloCycle />

          <motion.p
            className="mt-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--muted-2)] sm:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease, delay: 0.1 }}
          >
            {siteMeta.author} · Agent Systems · AI Product Engineering
          </motion.p>

          <motion.h1
            className="mt-6 max-w-4xl text-balance font-display text-[clamp(3.4rem,8vw,6.6rem)] leading-[0.92] tracking-[-0.06em] text-fg sm:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.82, ease, delay: 0.14 }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-[clamp(1.05rem,1.7vw,1.2rem)] leading-[1.75] text-muted sm:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, ease, delay: 0.22 }}
          >
            {hero.subline}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, ease, delay: 0.28 }}
          >
            <a href="#projects" className="hero-primary-button">
              Selected Work
              <ArrowRight className="h-4 w-4" strokeWidth={1.9} aria-hidden />
            </a>
            <a href="#blog" className="hero-secondary-button">
              Writing & Notes
            </a>
          </motion.div>

          {socialConfig.length > 0 ? (
            <motion.ul
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={false}
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.34 } },
              }}
            >
              {socialConfig.map(({ href, label, Icon }) => (
                <motion.li
                  key={label}
                  variants={{
                    hidden: { opacity: 0, y: 12, scale: 0.98 },
                    show: { opacity: 1, y: 0, scale: 1, transition: spring },
                  }}
                >
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-button inline-flex h-12 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-fg focus-visible:ring-2 focus-visible:ring-[var(--link)] focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={spring}
                  >
                    <Icon className="h-[18px] w-[18px] text-muted" strokeWidth={1.75} aria-hidden />
                    {label}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          ) : null}

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-2.5"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, ease, delay: 0.38 }}
          >
            {hero.focusAreas.map((area, index) => (
              <span
                key={area}
                className="liquid-chip inline-flex items-center px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {area}
              </span>
            ))}
          </motion.div>

          <motion.p
            className="mt-7 max-w-xl text-sm leading-relaxed text-muted-2"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, ease, delay: 0.44 }}
          >
            {hero.statusLine}
          </motion.p>

          <motion.div
            className="hero-float-badge hero-float-badge--bottom"
            initial={{ opacity: 0, y: 16, rotate: 7 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 0.74, ease, delay: 0.36 }}
          >
            <span className="hero-float-badge__label">Quality</span>
            <span className="hero-float-badge__value">Readable systems, visible tradeoffs</span>
          </motion.div>
        </div>

        <motion.aside className="hero-board relative" style={{ y: boardY, rotate: boardRotate }}>
          <div className="hero-board__chrome">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,95,86,0.82)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,189,46,0.82)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(39,201,63,0.82)]" />
            </div>
            <span className="hero-board__badge">Profile Overview</span>
          </div>

          <motion.div
            className="hero-note-card"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.64, ease, delay: 0.16 }}
            whileHover={
              reduce
                ? undefined
                : {
                    y: -8,
                    rotate: -1.1,
                    scale: 1.012,
                    boxShadow: "var(--elevation-hover-strong)",
                  }
            }
            whileTap={reduce ? undefined : { scale: 0.997 }}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-[4.75rem] w-[4.75rem] rounded-[1.5rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(236,244,253,0.68))] shadow-[0_18px_34px_-24px_rgba(15,23,42,0.35)]">
                <div className="absolute inset-1 overflow-hidden rounded-[1.15rem] bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.9),rgba(207,233,255,0.4)_64%,transparent_82%)]">
                  <Image
                    src="/author-avatar.jpg"
                    alt={`${siteMeta.author} portrait`}
                    fill
                    sizes="76px"
                    className="object-contain object-center scale-[1.04]"
                    priority
                  />
                </div>
              </div>
              <div className="min-w-0">
                <p className="hero-board__eyebrow">Personal Profile</p>
                <h2 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.03em] text-fg">
                  {siteMeta.author}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Researching LLM systems, building agent products, and shipping tools with a
                  bias toward clarity.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <motion.div
              className="hero-note-card"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.64, ease, delay: 0.22 }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -8,
                      rotate: 0.9,
                      scale: 1.012,
                      boxShadow: "var(--elevation-hover-strong)",
                    }
              }
              whileTap={reduce ? undefined : { scale: 0.997 }}
            >
              <p className="hero-board__eyebrow">Working Principles</p>
              <div className="mt-4 space-y-4">
                {hero.principles.map((item) => (
                  <div key={item.title} className="border-l border-[rgba(15,23,42,0.08)] pl-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-fg">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="hero-note-card"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.64, ease, delay: 0.28 }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -8,
                      rotate: -0.8,
                      scale: 1.012,
                      boxShadow: "var(--elevation-hover-strong)",
                    }
              }
              whileTap={reduce ? undefined : { scale: 0.997 }}
            >
              <p className="hero-board__eyebrow">Recent Launches</p>
              <div className="mt-4 space-y-3">
                {projects.slice(0, 2).map((project) => (
                  <motion.div
                    key={project.name}
                    className="hero-update-row"
                    whileHover={reduce ? undefined : { x: 6 }}
                    transition={spring}
                  >
                    <div>
                      <p className="text-base font-semibold text-fg">{project.name}</p>
                      <p className="mt-1 text-sm text-muted">{project.role}</p>
                    </div>
                    <a
                      href={project.links[0]!.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-[rgba(15,23,42,0.08)] bg-white/72 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-fg transition-all hover:-translate-y-0.5 hover:border-[rgba(43,103,246,0.24)] hover:text-[var(--primary-dark)]"
                    >
                      View
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {hero.stats.map((item, index) => (
              <motion.div
                key={item.label}
                className="hero-stat-card"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, ease, delay: 0.34 + index * 0.05 }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -6,
                        rotate: index % 2 === 0 ? -0.8 : 0.8,
                        scale: 1.03,
                        boxShadow: "var(--elevation-hover-strong)",
                      }
                }
                whileTap={reduce ? undefined : { scale: 0.997 }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold leading-snug text-fg">{item.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}
