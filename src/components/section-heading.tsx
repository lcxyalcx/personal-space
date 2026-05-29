"use client";

import { motion } from "framer-motion";

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type Props = {
  eyebrow: string;
  title: string;
  hint?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, hint, className = "" }: Props) {
  return (
    <motion.div
      className={`mb-12 text-center sm:mb-16 sm:text-left ${className}`}
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px" }}
    >
      <motion.div variants={item} className="inline-flex items-center justify-center sm:justify-start">
        <span className="rounded-full border border-[color-mix(in_oklab,#fff_72%,var(--border-strong))] bg-[rgba(255,255,255,0.62)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--primary)_56%,var(--muted-2))] shadow-[0_12px_28px_-24px_rgba(15,23,42,0.28)]">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        variants={item}
        className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-fg sm:mx-0 sm:text-4xl md:text-[3rem] md:leading-[1.02]"
      >
        {title}
      </motion.h2>
      {hint ? (
        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-2xl text-[17px] leading-[1.8] text-muted sm:mx-0"
        >
          {hint}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
