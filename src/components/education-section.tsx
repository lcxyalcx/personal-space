import { education, sectionCopy } from "@/data/site";
import { TimelineSection } from "./timeline-section";

export function EducationSection() {
  const c = sectionCopy.education;
  return (
    <TimelineSection
      id="education"
      eyebrow={c.eyebrow}
      title={c.title}
      hint={c.hint}
      items={education}
      ambient="alt"
    />
  );
}
