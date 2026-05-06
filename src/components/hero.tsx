"use client";

import Image from "next/image";
import {
  Binary,
  Blocks,
  Bolt,
  Brackets,
  BrainCircuit,
  Cpu,
  FolderGit2,
  Mail,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { HelloCycle } from "@/components/hello-cycle";
import { CHROMA_PALETTES } from "@/data/chroma-palettes";
import { hero, siteMeta, social } from "@/data/site";

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

const techStrip = [
  { Icon: BrainCircuit, label: "思考" },
  { Icon: Brackets, label: "抽象" },
  { Icon: Blocks, label: "系统" },
  { Icon: Binary, label: "比特" },
  { Icon: Bolt, label: "交付" },
] as const;

const spring = { type: "spring" as const, stiffness: 380, damping: 28 };

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [chromaIdx, setChromaIdx] = useState(0);
  const onChromaIndexChange = useCallback((ix: number) => setChromaIdx(ix), []);
  const chroma = CHROMA_PALETTES[chromaIdx % CHROMA_PALETTES.length]!;
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollEase = useSpring(scrollYProgress, {
    stiffness: reduce ? 520 : 78,
    damping: reduce ? 520 : 26,
    mass: reduce ? 0.08 : 0.42,
  });
  const contentY = useTransform(scrollEase, [0, 1], [0, reduce ? 0 : 56]);
  const visualY = useTransform(scrollEase, [0, 1], [0, reduce ? 0 : -34]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[94vh] flex-col justify-center overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-scan pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-spectrum pointer-events-none absolute inset-x-[-18%] top-[9%] h-[42rem]" aria-hidden />

      <motion.div
        className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.78fr)] lg:gap-14"
        style={{ y: contentY }}
      >
        <div className="relative z-10">
          <HelloCycle onChromaIndexChange={onChromaIndexChange} />

          <div
            aria-hidden
            className="hello-chroma-strip mx-auto mb-6 mt-1 h-1.5 max-w-[min(22rem,92vw)] rounded-full shadow-[0_10px_30px_color-mix(in_oklab,var(--primary)_20%,transparent)] ring-1 ring-white/60 sm:mx-0"
            style={{
              backgroundImage: chroma.hello,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          />

          <motion.p
            className="text-center text-xs font-semibold uppercase tracking-[0.2em] sm:text-left"
            style={{ color: chroma.caption }}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 0.05 }}
          >
            {siteMeta.author}
          </motion.p>
          <motion.h1
            className="headline-gradient headline-drift relative mt-4 max-w-4xl text-balance text-center text-[clamp(2.35rem,7vw,5.8rem)] font-semibold leading-[0.96] tracking-tight sm:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.14 }}
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            className="mx-auto mt-7 max-w-2xl text-center text-[clamp(1.05rem,2.2vw,1.32rem)] leading-relaxed text-muted sm:mx-0 sm:text-left"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.22 }}
          >
            {hero.subline}
          </motion.p>
          {hero.statusLine.trim() ? (
            <motion.p
              className="mx-auto mt-5 max-w-xl text-center text-sm text-muted-2 sm:mx-0 sm:text-left"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.3 }}
            >
              {hero.statusLine}
            </motion.p>
          ) : null}

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:justify-start"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.34 }}
            aria-hidden
          >
            {techStrip.map(({ Icon, label }, i) => (
              <motion.span
                key={label}
                className="liquid-chip inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.36 + i * 0.05 }}
                whileHover={
                  reduce
                    ? { y: -2 }
                    : {
                        y: -2,
                        borderColor: "color-mix(in oklab, var(--primary) 32%, transparent)",
                      }
                }
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-muted-2" strokeWidth={1.75} />
                {label}
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
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.42 } },
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
                    whileHover={{ scale: 1.04, y: -2, boxShadow: "0 20px 46px -18px rgba(0,0,0,0.26)" }}
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
        </div>

        <motion.div className="hero-portrait-wrap relative mx-auto w-full max-w-[24rem] lg:mx-0" style={{ y: visualY }}>
          <motion.div
            className="hero-portrait-stage relative aspect-[0.78] overflow-hidden rounded-[2.35rem] p-3"
            initial={false}
            animate={reduce ? undefined : { rotate: [0, 0.7, -0.4, 0], y: [0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="hero-portrait-screen relative h-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/author-avatar.jpg"
                alt={`${siteMeta.author} portrait`}
                fill
                sizes="(max-width: 1024px) 90vw, 384px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_32%,rgba(0,0,0,0.5)_100%)]" aria-hidden />
              <div className="absolute inset-x-5 bottom-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Current Focus</p>
                    <p className="mt-1 text-lg font-semibold leading-tight text-white">LLM Agents & RL</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md">
                    <Cpu className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="hero-floating-note absolute -left-2 top-8 hidden w-44 rounded-[1.35rem] px-4 py-3 text-sm text-fg shadow-[0_18px_48px_-24px_rgba(0,0,0,0.35)] sm:block"
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="mb-2 h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} aria-hidden />
            Speculative decoding, faster rollouts, calmer systems.
          </motion.div>
          <motion.div
            className="hero-floating-note absolute -right-2 bottom-10 hidden w-36 rounded-[1.35rem] px-4 py-3 text-sm text-fg shadow-[0_18px_48px_-24px_rgba(0,0,0,0.35)] sm:block"
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <Bolt className="mb-2 h-4 w-4 text-[var(--warm)]" strokeWidth={1.75} aria-hidden />
            Building personal tools with a research pulse.
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
