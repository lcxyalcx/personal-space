"use client";

import { Binary, Blocks, Bolt, Brackets, BrainCircuit, FolderGit2, Mail, UsersRound, X } from "lucide-react";
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

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-x-hidden px-4 pb-28 pt-24 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-scan pointer-events-none absolute inset-0" aria-hidden />
      <motion.div
        className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_65%)] blur-2xl"
        aria-hidden
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-16 bottom-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.14),transparent_60%)] blur-2xl"
        aria-hidden
        animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div
        className="module-glass--hero relative mx-auto w-full max-w-6xl px-5 py-9 sm:px-8 sm:py-11"
        style={{ y: contentY }}
      >
        <HelloCycle onChromaIndexChange={onChromaIndexChange} />

        <div
          aria-hidden
          className="hello-chroma-strip mx-auto mb-5 mt-1 h-1.5 max-w-[min(20rem,92vw)] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] sm:mx-0"
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
          className="headline-gradient relative mt-4 max-w-full overflow-x-auto text-center text-lg font-semibold leading-snug tracking-tight whitespace-nowrap sm:text-left md:text-xl"
          initial={false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.14 }}
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          className="mx-auto mt-7 max-w-2xl text-center text-[clamp(1.05rem,2.4vw,1.35rem)] leading-relaxed text-muted font-serif italic tracking-wide sm:mx-0 sm:text-left"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.22 }}
        >
          {hero.subline}
        </motion.p>
        <motion.p
          className="mx-auto mt-5 max-w-xl text-center text-sm text-muted-2 sm:mx-0 sm:text-left"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          {hero.statusLine}
        </motion.p>

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
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted shadow-[var(--elevation-1)] ring-1 ring-[var(--chip-ring)] backdrop-blur-sm"
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
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-surface px-4 text-[15px] text-fg shadow-sm focus-visible:ring-2 focus-visible:ring-[var(--link)] focus-visible:ring-offset-2"
                  whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 28px -8px rgba(0,0,0,0.12)" }}
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
      </motion.div>
    </section>
  );
}
