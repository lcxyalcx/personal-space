import { siteMeta } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 py-8 text-footer-fg sm:px-6 sm:py-10">
      <div className="module-glass--footer mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-center text-xs leading-relaxed text-footer-muted sm:text-left">
          © {year} {siteMeta.author}. Built as a calm, readable home on the web.
        </p>
        <p className="text-center text-xs text-footer-muted sm:text-right">
          Next.js · Vercel · Designed with clarity first
        </p>
      </div>
    </footer>
  );
}
