"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { links, sectionIds } from "@/lib/content";
import { useLanguage } from "./language-provider";

export const OPEN_PALETTE_EVENT = "cig:open-palette";

type Command = { id: string; label: string; hint: string; run: () => void };

export function CommandPalette() {
  const { t, lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const open = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      ...sectionIds.map((id) => ({ id, label: `${t.palette.go} ${t.nav[id]}`, hint: `#${id}`, run: go(id) })),
      { id: "github", label: `${t.palette.open} GitHub`, hint: "github.com/andresklve", run: open(links.github) },
      { id: "linkedin", label: `${t.palette.open} LinkedIn`, hint: "in/andresinfantass", run: open(links.linkedin) },
      { id: "piensaya", label: `${t.palette.open} PiensaYa`, hint: "repo", run: open("https://github.com/andresklve/PiensaYa") },
      {
        id: "reclamaya",
        label: `${t.palette.open} ReclamaYa`,
        hint: "repo",
        run: open("https://github.com/andresklve/report-and-be-hear-api"),
      },
      {
        id: "email",
        label: t.palette.copyEmail,
        hint: links.email,
        run: () => navigator.clipboard?.writeText(links.email).catch(() => {}),
      },
      { id: "lang", label: t.palette.switchLang, hint: lang === "es" ? "EN" : "ES", run: toggleLang },
    ];
  }, [t, lang, toggleLang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when closing
      setQuery("");
      setIndex(0);
    }
  }, [open]);

  const run = (cmd: Command | undefined) => {
    if (!cmd) return;
    setOpen(false);
    cmd.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-panel shadow-2xl"
            initial={{ y: -12, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -8, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="font-mono text-accent">❯</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIndex((i) => Math.min(i + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIndex((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") {
                    run(filtered[index]);
                  }
                }}
                placeholder={t.palette.placeholder}
                className="h-14 w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-dim"
              />
              <kbd className="rounded border border-line px-1.5 font-mono text-[10px] text-dim">esc</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center font-mono text-sm text-dim">{t.palette.empty}</li>}
              {filtered.map((cmd, i) => (
                <li key={cmd.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => run(cmd)}
                    className={`relative flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === index ? "text-fg" : "text-muted"
                    }`}
                  >
                    {i === index && (
                      <motion.span
                        layoutId="palette-active"
                        className="absolute inset-0 rounded-lg border border-accent/30 bg-accent/10"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                    <span className="relative">{cmd.label}</span>
                    <span className="relative font-mono text-xs text-dim">{cmd.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
