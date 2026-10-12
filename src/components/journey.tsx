"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "./language-provider";
import { Reveal, SectionHeader } from "./ui";

function Commit({
  hash,
  branch,
  logo,
  message,
  org,
  date,
  children,
  pending,
  side,
}: {
  hash: string;
  branch?: string;
  logo?: React.ReactNode;
  message: string;
  org?: string;
  date: string;
  children?: React.ReactNode;
  pending?: boolean;
  side?: boolean;
}) {
  return (
    <Reveal className={`relative pb-14 ${side ? "pl-20 md:pl-28" : "pl-12 md:pl-16"}`}>
      {/* nodo */}
      <span
        className={`absolute top-1.5 grid size-[18px] place-items-center rounded-full border-2 bg-bg ${
          pending ? "border-dashed border-dim" : side ? "border-accent-2" : "border-accent"
        } ${side ? "left-[51px] md:left-[59px]" : "left-[11px] md:left-[19px]"}`}
      >
        {!pending && <span className={`size-1.5 rounded-full ${side ? "bg-accent-2" : "bg-accent"}`} />}
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
        <span className="text-accent-3">{hash}</span>
        {branch && (
          <span
            className={`rounded border px-1.5 py-0.5 text-[10px] ${
              side ? "border-accent-2/40 bg-accent-2/10 text-accent-2" : "border-accent/40 bg-accent/10 text-accent"
            }`}
          >
            {branch}
          </span>
        )}
        <span className="text-dim">{date}</span>
      </div>
      <div className="mt-3 flex items-start gap-4">
        {logo}
        <div>
          <h3 className={`text-xl font-semibold tracking-tight md:text-2xl ${pending ? "text-muted" : "text-fg"}`}>{message}</h3>
          {org && <p className="mt-1 text-sm text-muted">{org}</p>}
        </div>
      </div>
      {children && <div className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{children}</div>}
    </Reveal>
  );
}

export function Journey() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="journey" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeader
        index="04"
        label={t.journey.label}
        title={<span className="font-mono text-3xl tracking-tight md:text-5xl">$ {t.journey.title}</span>}
      />

      <div ref={ref} className="relative">
        {/* rama main */}
        <div className="absolute top-2 bottom-14 left-[19px] w-px bg-line md:left-[27px]" />
        <motion.div
          style={{ scaleY }}
          className="absolute top-2 bottom-14 left-[19px] w-px origin-top bg-accent md:left-[27px]"
        />

        <Commit
          hash="a3f9c21"
          branch="HEAD → main"
          message={t.journey.upc.message}
          org={t.journey.upc.org}
          date={`08/2023 — ${t.journey.present}`}
          logo={
            <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-white">
              <Image src="/images/upc.png" alt="UPC" fill sizes="48px" className="scale-90 object-cover object-[50%_28%]" />
            </span>
          }
        />

        {/* rama lateral: experiencia en USA */}
        <div className="relative">
          <svg
            className="absolute -top-14 left-[19px] h-[calc(100%+3.5rem)] w-16 md:left-[27px]"
            aria-hidden
          >
            <motion.path
              d="M0 0 C0 30 41 30 41 60 L41 9999"
              fill="none"
              stroke="var(--accent-2)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
          <Commit
            side
            hash="7b21e0d"
            branch="usa/work"
            message={t.journey.safeway.message}
            org={t.journey.safeway.org}
            date="12/2023 — 03/2024"
            logo={
              <span className="relative h-8 w-12 shrink-0 overflow-hidden rounded-md border border-line">
                <Image src="/images/usa.jpg" alt="USA" fill sizes="48px" className="object-cover" />
              </span>
            }
          >
            <ul className="space-y-2">
              {t.journey.safeway.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1 font-mono text-xs text-accent-2">+</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Commit>
        </div>
      </div>
    </section>
  );
}
