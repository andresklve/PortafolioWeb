"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { routes } from "@/lib/content";
import { useLanguage } from "./language-provider";

export function Nav() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll mientras el menú móvil está abierto y lo cierra al pasar a escritorio
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => media.matches && setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    media.addEventListener("change", onChange);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      media.removeEventListener("change", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
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
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="relative grid size-9 place-items-center rounded-lg border border-line text-fg md:hidden"
        >
          <span className="relative block h-3.5 w-[18px]">
            <motion.span
              className="absolute left-0 h-[1.5px] w-full rounded-full bg-current"
              animate={menuOpen ? { top: "50%", rotate: 45, y: "-50%" } : { top: "0%", rotate: 0, y: "0%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current"
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 h-[1.5px] w-full rounded-full bg-current"
              animate={menuOpen ? { top: "50%", rotate: -45, y: "-50%" } : { top: "100%", rotate: 0, y: "-100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </button>

        <ul className="hidden min-w-0 items-center gap-0.5 md:flex">
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

        <div className="ml-auto flex shrink-0 items-center rounded-lg border border-line p-0.5" role="group" aria-label="Language">
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

    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-bg/95 px-6 pt-28 pb-10 backdrop-blur-xl md:hidden"
          initial={{ clipPath: "circle(0% at 32px 36px)" }}
          animate={{ clipPath: "circle(150% at 32px 36px)" }}
          exit={{ clipPath: "circle(0% at 32px 36px)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <ul className="flex flex-1 flex-col justify-center gap-2">
            {routes.map(({ id, href }, i) => {
              const active = pathname === href;
              return (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-baseline gap-4 py-2 text-5xl font-semibold tracking-[-0.04em] transition-colors ${
                      active ? "text-accent" : "text-fg active:text-accent"
                    }`}
                  >
                    <span className="font-mono text-xs font-normal tracking-normal text-dim">0{i + 1}</span>
                    <span>
                      <span className={active ? "text-accent/50" : "text-dim"}>/</span>
                      {t.nav[id]}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 border-t border-line pt-6 font-mono text-xs text-dim"
          >
            <Image src="/images/peru.jpg" alt="" width={18} height={12} className="h-3 w-[18px] rounded-[2px] object-cover" />
            Lima, Perú
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
