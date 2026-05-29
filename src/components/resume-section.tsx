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
    <section id="resume" className="scroll-mt-16 bg-bg-alt px-4 py-14 sm:px-6 sm:py-20">
      <div className="module-glass module-glass--alt mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} hint={c.hint} />

        <ol className="relative mx-auto max-w-4xl space-y-0 border-l border-[var(--timeline-line)] pl-8 sm:pl-10">
          {experience.map((item, i) => (
            <motion.li
              key={`${item.title}-${i}`}
              className="relative pb-12 last:pb-0"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.12, margin: "100px 0px" }}
              transition={{ ...spring, delay: i * 0.06 }}
            >
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-surface bg-muted-2 ring-2 ring-bg-alt" />
              <motion.div
                className="card-shine group relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(244,248,252,0.72))] p-6 shadow-[var(--elevation-1)] sm:p-8"
                whileHover={{ y: -6, boxShadow: "var(--elevation-hover)" }}
                transition={spring}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                      Build Log
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

        <div className="mx-auto mt-20 max-w-6xl border-t border-[var(--border)] pt-16 sm:mt-24 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "0px" }}
            transition={{ ...spring, delay: 0.05 }}
            className="text-center sm:text-left"
          >
            <span className="inline-flex rounded-full border border-[var(--border)] bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--primary)_56%,var(--muted-2))]">
              {sk.eyebrow}
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-fg sm:text-3xl">{sk.title}</h3>
          </motion.div>
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-3"
            initial="hidden"
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
                className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(244,248,252,0.74))] p-6 shadow-[var(--elevation-1)] sm:p-7"
                whileHover={{ y: -5, scale: 1.015 }}
                transition={spring}
              >
                <div className="flex items-center gap-2.5">
                  <motion.span
                    className="flex h-10 w-10 items-center justify-center rounded-[1rem] border border-white/55 bg-white/72 text-muted shadow-[0_14px_24px_-20px_rgba(15,23,42,0.28)]"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.45 }}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                  </motion.span>
                  <h4 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">{label}</h4>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {list.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-[15px] text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklab,var(--primary)_70%,white)]" />
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
