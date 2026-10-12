"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "./language-provider";
import { trackGlow } from "./background";
import { Reveal, SectionHeader } from "./ui";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

export function About() {
  const { t } = useLanguage();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = t.about.statement.split(" ");

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeader index="01" label={t.about.label} title={t.about.title} />

      <p ref={ref} className="max-w-4xl text-2xl leading-snug font-medium tracking-[-0.02em] text-fg md:text-[2.1rem]">
        {words.map((w, i) => (
          <Word key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.about.cards.map((card, i) => (
          <Reveal key={card.k} delay={i * 0.08}>
            <div
              onPointerMove={trackGlow}
              className="glow-card group h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 flex items-center justify-between font-mono text-[11px]">
                <span className="text-accent">{card.k}</span>
                <span className="text-dim">0{i + 1}</span>
              </div>
              <p className="text-[15px] leading-relaxed text-fg/90">{card.v}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
