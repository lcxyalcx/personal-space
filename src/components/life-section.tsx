"use client";

import { Heart, PenLine } from "lucide-react";
import { motion } from "framer-motion";
import { hobbies, lifeNotes, sectionCopy } from "@/data/site";
import { SectionHeading } from "./section-heading";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

export function LifeSection() {
  const c = sectionCopy.life;

  return (
    <section id="life" className="scroll-mt-16 bg-bg px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} hint={c.hint} />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                initial={false}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3, margin: "0px" }}
                transition={{ ...spring, delay: 0.05 }}
              >
                <Heart className="h-4 w-4 text-muted-2" strokeWidth={1.75} aria-hidden />
              </motion.span>
              <h3 className="text-sm font-semibold text-fg">{c.hobbiesColumn}</h3>
            </div>
            <motion.ul
              className="mt-5 space-y-4"
              initial={false}
              whileInView="show"
              viewport={{ once: true, amount: 0.15, margin: "0px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {hobbies.map((h) => (
                <motion.li
                  key={h.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: spring },
                  }}
                >
                  <motion.div
                    className="card-shine group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-surface p-6 shadow-sm sm:p-7"
                    whileHover={{ y: -4, boxShadow: "0 18px 36px -20px rgba(0,0,0,0.12)" }}
                    transition={spring}
                  >
                    <h4 className="text-[17px] font-semibold text-fg">{h.title}</h4>
                    <p className="mt-2 text-[17px] leading-relaxed text-muted">{h.body}</p>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                initial={false}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3, margin: "0px" }}
                transition={{ ...spring, delay: 0.05 }}
              >
                <PenLine className="h-4 w-4 text-muted-2" strokeWidth={1.75} aria-hidden />
              </motion.span>
              <h3 className="text-sm font-semibold text-fg">{c.notesColumn}</h3>
            </div>
            <motion.ul
              className="mt-5 space-y-4"
              initial={false}
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
                    hidden: { opacity: 0, x: 14 },
                    show: { opacity: 1, x: 0, transition: spring },
                  }}
                  className="border-l-2 border-[#d2d2d7] pl-5 text-[17px] leading-relaxed text-muted"
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
