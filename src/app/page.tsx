import { BlogSection } from "@/components/blog-section";
import { EducationSection } from "@/components/education-section";
import { Hero } from "@/components/hero";
import { LifeSection } from "@/components/life-section";
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
          <EducationSection />
        </ScrollReveal>
        <ScrollReveal delay={0.06}>
          <ResumeSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <LifeSection />
        </ScrollReveal>
        <ScrollReveal delay={0.14}>
          <BlogSection />
        </ScrollReveal>
      </main>
      <ScrollReveal delay={0.06} className="w-full">
        <SiteFooter />
      </ScrollReveal>
    </>
  );
}
