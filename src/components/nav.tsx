"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { routes } from "@/lib/content";
import { useLanguage } from "./language-provider";
import { OPEN_PALETTE_EVENT } from "./command-palette";

export function Nav() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
    >
      <nav
        className={`flex w-full max-w-5xl items-center gap-2 rounded-2xl border px-2 py-2 transition-all duration-300 ${
          scrolled
            ? "border-line-strong bg-bg/70 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-line bg-bg/40 backdrop-blur-md"
        }`}
      >
        <ul className="flex min-w-0 items-center gap-0.5 overflow-x-auto [scrollbar-width:none]">
          {routes.map(({ id, href }) => {
            const active = pathname === href;
            return (
              <li key={id} className="relative shrink-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-10 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[12px] transition-colors md:px-3 md:text-[13px] ${
                    active ? "text-bg" : "text-muted hover:text-fg"
                  }`}
                >
                  <span className={active ? "text-bg/60" : "text-dim"}>/</span>
                  {t.nav[id]}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
          className="ml-auto hidden shrink-0 items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg sm:flex"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="hidden lg:inline">{t.nav.palette}</span>
          <kbd className="rounded border border-line px-1 text-[10px] text-dim">⌘K</kbd>
        </button>

        <div className="ml-auto flex shrink-0 items-center rounded-lg border border-line p-0.5 sm:ml-0" role="group" aria-label="Language">
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
              <span className="relative hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
