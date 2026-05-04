"use client";

import { Cloud, Code2, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { experience, sectionCopy, skills } from "@/data/site";
import { SectionHeading } from "./section-heading";

const icons = [Code2, Cloud, LayoutGrid] as const;

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

export function ResumeSection() {
  const c = sectionCopy.resume;
  const sk = sectionCopy.resumeSkills;
  const skillGroups = sk.columns.map((col, i) => ({
    label: col.title,
    list: skills[col.skillKey],
    Icon: icons[i]!,
  }));

  return (
    <section id="resume" className="scroll-mt-16 bg-bg-alt px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} hint={c.hint} />

        <ol className="relative mx-auto max-w-3xl space-y-0 border-l border-[#d2d2d7] pl-8 sm:pl-10">
          {experience.map((item, i) => (
            <motion.li
              key={`${item.title}-${i}`}
              className="relative pb-12 last:pb-0"
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.12, margin: "100px 0px" }}
              transition={{ ...spring, delay: i * 0.07 }}
            >
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-surface bg-muted-2 ring-2 ring-bg-alt" />
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

        <div className="mx-auto mt-20 max-w-6xl border-t border-[var(--border)] pt-16 sm:mt-24 sm:pt-20">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "0px" }}
            transition={{ ...spring, delay: 0.05 }}
            className="text-center sm:text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-2">{sk.eyebrow}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{sk.title}</h3>
          </motion.div>
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-3"
            initial={false}
            whileInView="show"
            viewport={{ once: true, amount: 0.15, margin: "0px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {skillGroups.map(({ label, list, Icon }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: spring },
                }}
                className="rounded-2xl border border-[var(--border)] bg-surface p-6 shadow-sm sm:p-7"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={spring}
              >
                <div className="flex items-center gap-2.5">
                  <motion.span
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg-alt text-muted"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.45 }}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                  </motion.span>
                  <h4 className="text-[17px] font-semibold text-fg">{label}</h4>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {list.map((s) => (
                    <li key={s} className="text-[15px] text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
