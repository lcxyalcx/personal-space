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
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between rounded-full border border-[color-mix(in_oklab,#fff_68%,var(--border-strong))] bg-[color-mix(in_oklab,var(--surface)_68%,transparent)] px-3 shadow-[var(--nav-elev-shadow)] backdrop-blur-2xl backdrop-saturate-[1.45] sm:h-[3.25rem] sm:px-4">
        <a
          href={`${hashBase}#top`}
          aria-label={siteMeta.author}
          className="flex items-center gap-2 rounded-full text-[15px] font-semibold tracking-tight text-fg transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[var(--link)] focus-visible:ring-offset-2"
        >
          <Image
            src="/author-avatar.jpg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-[10px] object-cover shadow-sm ring-1 ring-black/[0.08]"
            priority
          />
          <span className="hidden sm:inline">{siteMeta.author}</span>
        </a>
        <nav className="flex max-w-[min(100%,22rem)] flex-wrap items-center justify-end gap-0.5 sm:max-w-none sm:gap-1">
          {navItems.map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`${hashBase}#${item.id}`}
                className={`rounded-full px-2.5 py-1.5 text-[13px] transition-[color,background,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-[var(--link)] focus-visible:ring-offset-2 sm:px-3 ${
                  active
                    ? "bg-[color-mix(in_oklab,var(--primary)_10%,transparent)] font-medium text-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-[color-mix(in_oklab,var(--primary)_22%,transparent)]"
                    : "text-muted hover:bg-[color-mix(in_oklab,var(--primary)_6%,transparent)] hover:text-fg"
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
