import { BlogSection } from "@/components/blog-section";
import { EducationSection } from "@/components/education-section";
import { Hero } from "@/components/hero";
import { LifeSection } from "@/components/life-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResumeSection } from "@/components/resume-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="page-stack relative z-[2]">
        <Hero />
        <ScrollReveal delay={0} className="section-reveal section-reveal--lead">
          <ResumeSection />
        </ScrollReveal>
        <ScrollReveal delay={0.04} className="section-reveal">
          <EducationSection />
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="section-reveal">
          <ProjectsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.12} className="section-reveal">
          <BlogSection />
        </ScrollReveal>
        <ScrollReveal delay={0.16} className="section-reveal">
          <LifeSection />
        </ScrollReveal>
      </main>
      <ScrollReveal delay={0.06} className="section-reveal section-reveal--footer w-full">
        <SiteFooter />
      </ScrollReveal>
    </>
  );
}
