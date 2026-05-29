"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, siteMeta } from "@/data/site";

function useActiveNavId(isHome: boolean) {
  const [scrollActiveId, setScrollActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const ids = navItems.map((n) => n.id);

    const update = () => {
      const y = window.scrollY + window.innerHeight * 0.28;
      const tops = ids
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.getBoundingClientRect().top + window.scrollY } : null;
        })
        .filter((x) => x !== null)
        .sort((a, b) => a.top - b.top);

      let current: string | null = null;
      for (const row of tops) {
        if (y >= row.top) current = row.id;
      }
      setScrollActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  return isHome ? scrollActiveId : null;
}

export function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeId = useActiveNavId(isHome);
  const hashBase = isHome ? "" : "/";

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-[1.9rem] border border-[color-mix(in_oklab,#fff_76%,var(--border-strong))] bg-[color-mix(in_oklab,var(--surface)_72%,transparent)] px-4 py-2 shadow-[var(--nav-elev-shadow)] backdrop-blur-[28px] backdrop-saturate-[1.5]">
        <a
          href={`${hashBase}#top`}
          aria-label={siteMeta.author}
          className="flex items-center gap-3 rounded-full text-[15px] font-semibold tracking-tight text-fg transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--link)] focus-visible:ring-offset-2"
        >
          <Image
            src="/author-avatar.jpg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-[12px] object-cover shadow-[0_12px_24px_-20px_rgba(15,23,42,0.45)] ring-1 ring-black/[0.05]"
            priority
          />
          <div className="hidden sm:block">
            <span className="block">{siteMeta.author}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-2">
              Personal Space
            </span>
          </div>
        </a>
        <nav className="flex max-w-[min(100%,22rem)] flex-wrap items-center justify-end gap-1 rounded-full border border-white/45 bg-white/48 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:max-w-none">
          {navItems.map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`${hashBase}#${item.id}`}
                className={`rounded-full px-3 py-1.5 text-[13px] transition-[color,background,box-shadow,transform] duration-200 focus-visible:ring-2 focus-visible:ring-[var(--link)] focus-visible:ring-offset-2 ${
                  active
                    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(240,246,255,0.82))] font-medium text-fg shadow-[0_10px_24px_-18px_rgba(15,23,42,0.32)] ring-1 ring-[color-mix(in_oklab,var(--primary)_22%,transparent)]"
                    : "text-muted hover:bg-white/60 hover:text-fg"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
