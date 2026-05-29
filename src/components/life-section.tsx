"use client";

import { Heart, PenLine } from "lucide-react";
import { motion } from "framer-motion";
import { hobbies, lifeNotes, sectionCopy } from "@/data/site";
import { SectionHeading } from "./section-heading";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

export function LifeSection() {
  const c = sectionCopy.life;

  return (
    <section id="life" className="section-shell section-shell--amber scroll-mt-16 px-4 py-14 sm:px-6 sm:py-20">
      <div className="module-glass mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} hint={c.hint} />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3, margin: "0px" }}
                transition={{ ...spring, delay: 0.05 }}
              >
                <Heart className="h-4 w-4 text-muted-2" strokeWidth={1.75} aria-hidden />
              </motion.span>
              <h3 className="text-sm font-semibold tracking-[-0.02em] text-fg">{c.hobbiesColumn}</h3>
            </div>
            <motion.ul
              className="mt-5 space-y-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15, margin: "0px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {hobbies.map((h, i) => (
                <motion.li
                  key={h.title}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.985 },
                    show: { opacity: 1, y: 0, transition: spring },
                  }}
                >
                  <motion.div
                    className="card-shine group relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(244,248,252,0.74))] p-6 shadow-[var(--elevation-1)] sm:p-7"
                    whileHover={{
                      y: -8,
                      rotate: i % 2 === 0 ? -0.8 : 0.8,
                      scale: 1.01,
                      boxShadow: "var(--elevation-hover-strong)",
                    }}
                    whileTap={{ scale: 0.997 }}
                    transition={spring}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                      Interest
                    </p>
                    <h4 className="mt-3 text-[1.2rem] font-semibold tracking-[-0.03em] text-fg">
                      {h.title}
                    </h4>
                    <p className="mt-3 text-[17px] leading-[1.8] text-muted">{h.body}</p>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3, margin: "0px" }}
                transition={{ ...spring, delay: 0.05 }}
              >
                <PenLine className="h-4 w-4 text-muted-2" strokeWidth={1.75} aria-hidden />
              </motion.span>
              <h3 className="text-sm font-semibold tracking-[-0.02em] text-fg">{c.notesColumn}</h3>
            </div>
            <motion.ul
              className="mt-5 space-y-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15, margin: "0px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {lifeNotes.map((line, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: 16, scale: 0.99 },
                    show: { opacity: 1, x: 0, transition: spring },
                  }}
                  className="card-shine group relative overflow-hidden rounded-[1.7rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(244,248,252,0.7))] px-5 py-5 text-[17px] leading-[1.8] text-muted shadow-[var(--elevation-1)]"
                  whileHover={{
                    x: 8,
                    y: -4,
                    rotate: i % 2 === 0 ? -0.6 : 0.6,
                    scale: 1.01,
                    boxShadow: "var(--elevation-hover-strong)",
                  }}
                  whileTap={{ scale: 0.997 }}
                >
                  {line}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
