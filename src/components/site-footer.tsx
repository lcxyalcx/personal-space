import { siteMeta } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-footer-bg px-4 py-10 text-footer-fg sm:px-6 sm:py-12">
      <div className="module-glass--footer mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-center text-xs leading-relaxed text-footer-muted sm:text-left">
          Copyright © {year} {siteMeta.author}。保留所有权利。
        </p>
        <p className="text-center text-xs text-footer-muted sm:text-right">
          Next.js · 部署于 Vercel
        </p>
      </div>
    </footer>
  );
}
