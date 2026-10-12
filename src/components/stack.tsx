"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { stack } from "@/lib/content";
import { useLanguage } from "./language-provider";
import { Reveal, SectionHeader, ease } from "./ui";

type CategoryKey = (typeof stack)[number]["key"];

export function Stack() {
  const { t } = useLanguage();
  const [active, setActive] = useState<CategoryKey>("backend");
  const current = stack.find((c) => c.key === active)!;

  // líneas del "archivo" stack.ts
  const lines: { key?: CategoryKey; node: React.ReactNode }[] = [
    {
      node: (
        <>
          <span className="text-accent-3">export const</span> <span className="text-accent-2">stack</span>{" "}
          <span className="text-dim">=</span> {"{"}
        </>
      ),
    },
    ...stack.map((cat) => ({
      key: cat.key,
      node: (
        <>
          {"  "}
          <span className="text-fg">{cat.key}</span>
          <span className="text-dim">: [</span>
          {cat.items.map((item, i) => (
            <span key={item}>
              <span className="text-accent">&quot;{item}&quot;</span>
              {i < cat.items.length - 1 && <span className="text-dim">, </span>}
            </span>
          ))}
          <span className="text-dim">],</span>
        </>
      ),
    })),
    { node: <>{"}"} <span className="text-accent-3">as const</span>;</> },
  ];

  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeader index="02" label={t.stack.label} title={t.stack.title} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Editor */}
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line-strong bg-panel">
            <div className="flex items-center border-b border-line">
              <div className="flex items-center gap-2 border-r border-line bg-bg-2 px-4 py-2.5 font-mono text-xs text-fg">
                <span className="text-accent-2">TS</span> stack.ts
              </div>
              <div className="px-4 font-mono text-xs text-dim">src/lib</div>
            </div>
            <pre className="overflow-x-auto py-4 font-mono text-[12.5px] leading-7">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  onMouseEnter={() => line.key && setActive(line.key)}
                  className={`flex cursor-default pr-4 transition-colors ${
                    line.key && line.key === active ? "bg-accent/[0.07]" : line.key ? "hover:bg-white/[0.03]" : ""
                  }`}
                >
                  <span
                    className={`w-12 shrink-0 select-none pr-4 text-right ${
                      line.key === active ? "text-accent" : "text-dim/60"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="whitespace-pre-wrap text-muted">{line.node}</span>
                </motion.div>
              ))}
            </pre>
          </div>
        </Reveal>

        {/* Panel de categoría */}
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-2xl border border-line bg-white/[0.015] p-6">
            <div className="flex flex-wrap gap-2">
              {stack.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActive(cat.key)}
                  className={`relative rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                    active === cat.key ? "text-bg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === cat.key && (
                    <motion.span layoutId="stack-pill" className="absolute inset-0 rounded-lg bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative">{t.stack.categories[cat.key]}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-baseline gap-3">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl font-semibold tracking-tighter text-fg tabular-nums"
              >
                {String(current.items.length).padStart(2, "0")}
              </motion.span>
              <span className="font-mono text-xs text-muted">{t.stack.categories[active]}</span>
            </div>

            <div className="mt-6 flex flex-wrap content-start gap-2">
              <AnimatePresence mode="popLayout">
                {current.items.map((item, i) => (
                  <motion.span
                    key={`${active}-${item}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: i * 0.03, duration: 0.35, ease }}
                    className="rounded-lg border border-line-strong bg-bg-2 px-3 py-2 text-sm text-fg"
                  >
                    {item}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
