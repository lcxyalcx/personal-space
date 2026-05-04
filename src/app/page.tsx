import { BlogSection } from "@/components/blog-section";
import { EducationSection } from "@/components/education-section";
import { Hero } from "@/components/hero";
import { LifeSection } from "@/components/life-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResumeSection } from "@/components/resume-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="relative z-[2]">
        <Hero />
        <EducationSection />
        <ResumeSection />
        <LifeSection />
        <BlogSection />
      </main>
      <SiteFooter />
    </>
  );
}
