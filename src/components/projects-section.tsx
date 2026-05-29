"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects, sectionCopy } from "@/data/site";
import { SectionHeading } from "./section-heading";

const spring = { type: "spring" as const, stiffness: 380, damping: 30 };

export function ProjectsSection() {
  const c = sectionCopy.projects;

  return (
    <section id="projects" className="section-shell section-shell--rose scroll-mt-16 bg-bg px-4 py-14 sm:px-6 sm:py-20">
      <div className="module-glass mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} hint={c.hint} />

        <motion.ul
          className="grid gap-5 md:grid-cols-2 md:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15, margin: "0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {projects.map((project, i) => (
            <motion.li
              key={project.name}
              variants={{
                hidden: { opacity: 0, y: 32, scale: 0.985 },
                show: { opacity: 1, y: 0, transition: spring },
              }}
            >
              <motion.article
                className={`project-card group h-full ${i % 2 === 0 ? "project-card--teal" : "project-card--amber"}`}
                whileHover={{ y: -6, boxShadow: "var(--elevation-hover)" }}
                transition={spring}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="project-card__status">{project.status}</span>
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-2">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] text-fg">{project.name}</h3>
                    <p className="mt-1 text-sm font-medium text-muted">{project.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-[16px] leading-[1.8] text-muted">{project.description}</p>

                <p className="project-card__highlight mt-5">{project.highlight}</p>

                <ul className="mt-6 space-y-3">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-[0.58rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="project-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-pill inline-flex items-center gap-1.5"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} aria-hidden />
                    </a>
                  ))}
                </div>
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
