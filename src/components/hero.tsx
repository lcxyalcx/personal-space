"use client";

import { Binary, Blocks, Bolt, Brackets, BrainCircuit, FolderGit2, Mail, UsersRound, X } from "lucide-react";
import { motion } from "framer-motion";
import { HelloCycle } from "@/components/hello-cycle";
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
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-4 pb-28 pt-24 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-scan pointer-events-none absolute inset-0" aria-hidden />
      <motion.div
        className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(138,109,72,0.2),transparent_65%)] blur-2xl"
        aria-hidden
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-16 bottom-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(92,84,74,0.14),transparent_60%)] blur-2xl"
        aria-hidden
        animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <HelloCycle />

        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-2 sm:text-left"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.05 }}
        >
          {siteMeta.author}
        </motion.p>
        <motion.h1
          className="headline-gradient headline-drift relative mt-4 text-center text-[clamp(2.1rem,6.5vw,4.75rem)] font-semibold leading-[1.06] tracking-tight sm:text-left md:text-[clamp(2.75rem,5.2vw,4.85rem)] lg:text-[5rem]"
          initial={false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.14 }}
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          className="mx-auto mt-7 max-w-2xl text-center text-[clamp(1.05rem,2.4vw,1.35rem)] leading-relaxed text-muted sm:mx-0 sm:text-left"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-surface/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted shadow-sm backdrop-blur-sm"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.36 + i * 0.05 }}
              whileHover={{ y: -2, borderColor: "rgba(0,102,204,0.25)" }}
            >
              <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
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
      </div>
    </section>
  );
}
