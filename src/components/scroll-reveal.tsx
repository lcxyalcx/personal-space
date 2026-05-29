"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** 与站点其它区块一致的「沉 + 起」缓动 */
const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  /** 略错开相邻区块，形成级联 */
  delay?: number;
};

export function ScrollReveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.14, margin: "-8% 0px -6% 0px" }}
      transition={{ duration: 0.84, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
