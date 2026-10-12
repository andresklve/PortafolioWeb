"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/content";
import { useLanguage } from "./language-provider";

export function SiteFooter() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const index = routes.findIndex((r) => r.href === pathname);
  const next = routes[(Math.max(index, 0) + 1) % routes.length];

  return (
    <footer className="relative z-10 mx-auto max-w-6xl px-5 pb-12 md:px-8">
      <Link
        href={next.href}
        className="group flex items-end justify-between gap-6 border-t border-line py-12 md:py-16"
      >
        <span>
          <span className="block font-mono text-xs text-dim">{t.nextPage} →</span>
          <span className="mt-3 block text-5xl font-semibold tracking-[-0.045em] text-fg transition-colors duration-300 group-hover:text-accent md:text-8xl">
            <span className="text-dim transition-colors group-hover:text-accent/60">/</span>
            {t.nav[next.id]}
          </span>
        </span>
        <span className="mb-3 grid size-14 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-bg md:size-20">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </Link>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-8 font-mono text-xs text-dim md:flex-row md:items-center">
        <span>© 2026 · {t.footer}</span>
        <span className="flex items-center gap-2">
          <Image src="/images/peru.jpg" alt="Perú" width={18} height={12} className="h-3 w-[18px] rounded-[2px] object-cover" />
          Lima, Perú
          <span className="text-accent">●</span>
        </span>
      </div>
    </footer>
  );
}
