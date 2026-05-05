"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects, sectionCopy } from "@/data/site";
import { SectionHeading } from "./section-heading";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

export function ProjectsSection() {
  const c = sectionCopy.projects;
  return (
    <section id="projects" className="scroll-mt-16 bg-bg px-4 py-14 sm:px-6 sm:py-20">
      <div className="module-glass mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} hint={c.hint} />
        <motion.ul
          className="grid gap-5 [perspective:1200px] md:grid-cols-2 md:gap-6"
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.15, margin: "0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {projects.map((p) => (
            <motion.li
              key={p.name}
              variants={{
                hidden: { opacity: 0, y: 36, rotateX: -6 },
                show: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
                },
              }}
            >
              <motion.article
                className="card-shine group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-surface p-6 shadow-[var(--elevation-1)] sm:p-8"
                whileHover={{
                  y: -6,
                  rotateX: 2,
                  boxShadow: "0 24px 48px -20px rgba(0,0,0,0.16)",
                }}
                transition={spring}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[21px] font-semibold leading-snug tracking-tight text-fg">
                    {p.name}
                  </h3>
                  <span className="shrink-0 text-xs font-medium text-muted-2">{p.year}</span>
                </div>
                <p className="mt-3 flex-1 text-[17px] leading-relaxed text-muted">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <motion.span
                      key={s}
                      className="rounded-full bg-bg-alt px-3 py-1 text-xs font-medium text-muted"
                      whileHover={{ scale: 1.06, backgroundColor: "rgba(0,102,204,0.08)" }}
                      transition={spring}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-link transition-colors hover:text-[var(--link-hover)]"
                  >
                    {c.linkLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} aria-hidden />
                  </a>
                ) : null}
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
