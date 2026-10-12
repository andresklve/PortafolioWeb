"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { sectionIds, type SectionId } from "@/lib/content";
import { useLanguage } from "./language-provider";
import { OPEN_PALETTE_EVENT } from "./command-palette";

export function Nav() {
  const { t, lang, setLang } = useLanguage();
  const [active, setActive] = useState<SectionId | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
    >
      <nav
        className={`flex w-full max-w-5xl items-center gap-2 rounded-2xl border px-3 py-2 transition-all duration-300 ${
          scrolled
            ? "border-line-strong bg-bg/70 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2 pr-2 font-mono text-sm">
          <span className="grid size-7 place-items-center rounded-lg bg-accent font-bold text-bg transition-transform group-hover:rotate-[-8deg]">
            C
          </span>
          <span className="hidden text-fg sm:inline">
            carlos<span className="text-accent">.</span>dev
          </span>
        </a>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {sectionIds.map((id) => (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                className={`relative z-10 block rounded-lg px-3 py-1.5 font-mono text-[13px] transition-colors ${
                  active === id ? "text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {t.nav[id]}
              </a>
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
          className="ml-auto flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg md:ml-2"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="hidden sm:inline">{t.nav.palette}</span>
          <kbd className="rounded border border-line px-1 text-[10px] text-dim">⌘K</kbd>
        </button>

        <div className="flex items-center rounded-lg border border-line p-0.5" role="group" aria-label="Language">
          {(
            [
              ["es", "/images/spain.jpg", "ES"],
              ["en", "/images/usa.jpg", "EN"],
            ] as const
          ).map(([code, flag, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`relative flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] transition-colors ${
                lang === code ? "text-fg" : "text-dim hover:text-muted"
              }`}
            >
              {lang === code && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-md bg-white/10"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Image
                src={flag}
                alt=""
                width={18}
                height={12}
                className={`relative h-3 w-[18px] rounded-[2px] object-cover transition ${
                  lang === code ? "" : "opacity-50 grayscale"
                }`}
              />
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
