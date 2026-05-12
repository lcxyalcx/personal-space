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
};

export function SectionHeading({ eyebrow, title, hint }: Props) {
  return (
    <motion.div
      className="mb-12 text-center sm:mb-16 sm:text-left"
      variants={list}
      initial={false}
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px" }}
    >
      <motion.p
        variants={item}
        className="text-xs font-semibold uppercase tracking-[0.16em] text-[color-mix(in_oklab,var(--primary)_38%,var(--muted-2))]"
      >
        {eyebrow}
      </motion.p>
      <motion.div
        variants={item}
        className="mx-auto mt-4 h-px w-16 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_46%,transparent),transparent)] sm:mx-0"
      />
      <motion.h2
        variants={item}
        className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.08]"
      >
        {title}
      </motion.h2>
      {hint ? (
        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-muted sm:mx-0"
        >
          {hint}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
