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
      <main className="relative z-[2]">
        <Hero />
        <ScrollReveal delay={0}>
          <ResumeSection />
        </ScrollReveal>
        <ScrollReveal delay={0.04}>
          <EducationSection />
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <ProjectsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <BlogSection />
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <LifeSection />
        </ScrollReveal>
      </main>
      <ScrollReveal delay={0.06} className="w-full">
        <SiteFooter />
      </ScrollReveal>
    </>
  );
}
