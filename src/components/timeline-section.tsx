"use client";

import type { TimelineItem } from "@/data/site";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  hint?: string;
  items: TimelineItem[];
  /** 与区块背景一致，用于时间轴节点外环颜色 */
  ambient: "alt" | "base";
};

const spring = { type: "spring" as const, stiffness: 420, damping: 32 };

export function TimelineSection({ id, eyebrow, title, hint, items, ambient }: Props) {
  const ring = ambient === "alt" ? "ring-bg-alt" : "ring-bg";
  const shell = ambient === "alt" ? "section-shell section-shell--cyan" : "section-shell section-shell--amber";

  const glass = ambient === "alt" ? "module-glass module-glass--alt" : "module-glass";

  return (
    <section id={id} className={`${shell} scroll-mt-16 px-4 py-14 sm:px-6 sm:py-20`}>
      <div className={`mx-auto max-w-6xl ${glass} px-5 py-12 sm:px-8 sm:py-16`}>
        <SectionHeading eyebrow={eyebrow} title={title} hint={hint} />
        <ol className="relative mx-auto max-w-4xl space-y-0 border-l border-[var(--timeline-line)] pl-8 sm:pl-10">
          {items.map((item, i) => (
            <motion.li
              key={`${item.title}-${i}`}
              className="relative pb-12 last:pb-0"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.12, margin: "100px 0px" }}
              transition={{ ...spring, delay: i * 0.06 }}
            >
              <span
                className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-surface bg-muted-2 ring-2 ${ring}`}
              />
              <motion.div
                className="card-shine group relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(244,248,252,0.72))] p-6 shadow-[var(--elevation-1)] sm:p-8"
                whileHover={{
                  y: -8,
                  rotate: i % 2 === 0 ? -0.9 : 0.9,
                  scale: 1.008,
                  boxShadow: "var(--elevation-hover-strong)",
                }}
                whileTap={{ scale: 0.997 }}
                transition={spring}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                      Timeline Entry
                    </p>
                    <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.04em] text-fg sm:text-[1.6rem]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="inline-flex rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5 text-sm font-medium text-muted-2 shadow-[0_12px_26px_-24px_rgba(15,23,42,0.28)]">
                    {item.period}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-muted">{item.org}</p>
                <p className="mt-4 max-w-3xl text-[17px] leading-[1.8] text-muted">{item.detail}</p>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
