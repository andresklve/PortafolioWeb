"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { links } from "@/lib/content";
import { useLanguage } from "./language-provider";
import { ArrowIcon, GithubIcon, LinkedinIcon, Reveal, SectionHeader } from "./ui";

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const command = `curl -s api/contact | jq`;
  const [typed, setTyped] = useState("");
  const done = typed.length === command.length;

  useEffect(() => {
    if (!inView || done) return;
    const id = setTimeout(() => setTyped(command.slice(0, typed.length + 1)), 45);
    return () => clearTimeout(id);
  }, [inView, typed, done, command]);

  const json: [string, string][] = [
    ["name", "Carlos Andres Infantas Galindo"],
    ["role", "Backend Developer"],
    ["email", links.email],
    ["location", "Lima, Perú (UTC-5)"],
    ["open_to", "internships · remote"],
  ];

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-line-strong bg-panel">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-dim">zsh — carlos@lima</span>
      </div>
      <div className="min-h-[250px] p-5 font-mono text-[12.5px] leading-6">
        <div>
          <span className="text-accent">❯</span> <span className="text-fg">{typed}</span>
          {!done && <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-[3px] bg-accent" />}
        </div>
        {done && (
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="text-dim">
              {"{"}
            </motion.div>
            {json.map(([k, v], i) => (
              <motion.div
                key={k}
                variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
                className="pl-5"
              >
                <span className="text-accent-2">&quot;{k}&quot;</span>
                <span className="text-dim">: </span>
                <span className="text-accent">&quot;{v}&quot;</span>
                {i < json.length - 1 && <span className="text-dim">,</span>}
              </motion.div>
            ))}
            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="text-dim">
              {"}"}
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-1">
              <span className="text-accent">❯</span>
              <span className="caret ml-2 inline-block h-4 w-2 translate-y-[3px] bg-accent" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  const socials = [
    { label: "GitHub", href: links.github, sub: "@andresklve", icon: <GithubIcon /> },
    { label: "LinkedIn", href: links.linkedin, sub: "in/andresinfantass", icon: <LinkedinIcon /> },
    {
      label: t.contact.whatsapp,
      href: links.whatsapp,
      sub: links.phone,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 pt-28 pb-16 md:px-8 md:pt-36">
      <SectionHeader
        index="05"
        label={t.contact.label}
        title={
          <>
            {t.contact.title} <em className="font-serif font-normal text-accent italic">{t.contact.titleAccent}</em>
          </>
        }
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-muted">{t.contact.body}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${links.email}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-mono text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
              >
                {links.email}
                <ArrowIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                type="button"
                onClick={copy}
                className="relative inline-flex h-[46px] min-w-36 items-center justify-center overflow-hidden rounded-xl border border-line-strong px-4 font-mono text-xs text-fg transition-colors hover:bg-white/5"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "copied" : "copy"}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className={copied ? "text-accent" : ""}
                  >
                    {copied ? `✓ ${t.contact.copied}` : t.contact.copy}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </Reveal>

          <div className="mt-10 divide-y divide-line border-y border-line">
            {socials.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.06}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-4 transition-colors"
                >
                  <span className="grid size-10 place-items-center rounded-xl border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                    {s.icon}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-fg">{s.label}</span>
                    <span className="block font-mono text-xs text-dim">{s.sub}</span>
                  </span>
                  <ArrowIcon className="text-dim transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <Terminal />
        </Reveal>
      </div>

      <footer className="mt-28 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 font-mono text-xs text-dim md:flex-row md:items-center">
        <span>
          © 2026 · {t.footer}
        </span>
        <span className="flex items-center gap-2">
          <Image src="/images/peru.jpg" alt="Perú" width={18} height={12} className="h-3 w-[18px] rounded-[2px] object-cover" />
          Lima, Perú · Next.js
          <span className="text-accent">●</span>
        </span>
      </footer>
    </section>
  );
}
