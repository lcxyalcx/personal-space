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
  const sectionBg = ambient === "alt" ? "bg-bg-alt" : "bg-bg";

  return (
    <section id={id} className={`scroll-mt-16 ${sectionBg} px-4 py-24 sm:px-6 sm:py-32`}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={eyebrow} title={title} hint={hint} />
        <ol className="relative mx-auto max-w-3xl space-y-0 border-l border-[#d2d2d7] pl-8 sm:pl-10">
          {items.map((item, i) => (
            <motion.li
              key={`${item.title}-${i}`}
              className="relative pb-12 last:pb-0"
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.12, margin: "100px 0px" }}
              transition={{ ...spring, delay: i * 0.08 }}
            >
              <span
                className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-surface bg-muted-2 ring-2 ${ring}`}
              />
              <motion.div
                className="card-shine group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-surface p-6 shadow-sm sm:p-8"
                whileHover={{ y: -4, boxShadow: "0 20px 40px -24px rgba(0,0,0,0.14)" }}
                transition={spring}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold text-fg sm:text-xl">{item.title}</h3>
                  <span className="text-sm font-medium text-muted-2">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{item.org}</p>
                <p className="mt-3 text-[17px] leading-relaxed text-muted">{item.detail}</p>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
