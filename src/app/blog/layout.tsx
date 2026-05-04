import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <div className="relative z-[2] min-h-[calc(100vh-8rem)]">{children}</div>
      <SiteFooter />
    </>
  );
}
