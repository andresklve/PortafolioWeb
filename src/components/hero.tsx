"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { coreStack, stack } from "@/lib/content";
import { useLanguage } from "./language-provider";
import { ease } from "./ui";
import photo from "../../public/images/yo.jpeg";

function useTypewriter(words: readonly string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === "") delay = 250;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, wordIndex, words]);

  return text;
}

function LimaClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-PE", {
      timeZone: "America/Lima",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

const NAME_TOP = "Carlos Andres";
const NAME_BOTTOM = "Infantas Galindo";

const chips = [
  { label: "200 OK", className: "-left-8 top-16 text-accent", depth: 30 },
  { label: "@Transactional", className: "-right-10 top-1/3 text-accent-2", depth: -40 },
  { label: "ws://chat ●", className: "-left-12 bottom-24 text-accent-3", depth: 50 },
  { label: "amqp://events", className: "-right-6 bottom-10 text-muted", depth: -25 },
];

export function Hero() {
  const { t } = useLanguage();
  const role = useTypewriter(t.hero.roles);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  const allTech = stack.flatMap((c) => c.items);

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 font-mono text-sm text-muted"
          >
            <span className="text-accent">carlos@lima</span>
            <span className="text-dim">:</span>
            <span className="text-accent-2">~</span>
            <span className="text-dim">$ </span>
            <span className="text-fg">{t.hero.prompt}</span>
          </motion.div>

          <h1 className="text-[clamp(2.6rem,6.6vw,5.4rem)] leading-[0.92] font-semibold tracking-[-0.045em]">
            <SplitName text={NAME_TOP} delay={0.35} className="pb-1" />
            <SplitName text={NAME_BOTTOM} delay={0.6} className="pb-2" letterClassName="text-outline" />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-6 flex h-8 items-center font-mono text-lg text-accent md:text-xl"
          >
            <span className="mr-2 text-dim">&gt;</span>
            {role}
            <span className="caret ml-1 inline-block h-5 w-2.5 bg-accent" />
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { delayChildren: 1.25, staggerChildren: 0.05 } } }}
            className="mt-8 flex max-w-xl flex-wrap gap-2"
            aria-label="Stack"
          >
            {coreStack.map((tech) => (
              <motion.li
                key={tech}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="rounded-lg border border-line-strong bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {tech}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/proyectos"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-bg"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative">{t.hero.ctaProjects}</span>
              <svg className="relative transition-transform group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-fg/40 hover:bg-white/5"
            >
              {t.hero.ctaContact}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-muted"
          >
            <span className="flex items-center gap-2">
              <Image src="/images/peru.jpg" alt="Perú" width={20} height={13} className="h-[13px] w-5 rounded-[2px] object-cover" />
              {t.hero.location} · <LimaClock /> <span className="text-dim">UTC−5</span>
            </span>
          </motion.div>
        </div>

        {/* Tarjeta de perfil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease }}
          className="relative mx-auto w-full max-w-[380px] [perspective:1200px]"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            <div className="group overflow-hidden rounded-2xl border border-line-strong bg-panel shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-[11px] text-dim">~/profile/yo.jpeg</span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={photo}
                  alt="Carlos Andres Infantas Galindo"
                  fill
                  priority
                  placeholder="blur"
                  sizes="380px"
                  className="object-cover object-[60%_40%] contrast-[1.15] grayscale brightness-[1.15] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-accent mix-blend-multiply opacity-25 transition-opacity duration-700 group-hover:opacity-0" />
                <div className="scanlines absolute inset-0 opacity-40" />
                <div className="scan-bar absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-transparent via-accent/15 to-transparent" />
                {/* esquinas */}
                {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c) => (
                  <span key={c} className={`absolute size-5 border-accent ${c}`} />
                ))}
              </div>
              <dl className="grid grid-cols-2 gap-px bg-line font-mono text-[11px]">
                {t.hero.photoMeta.map(([k, v]) => (
                  <div key={k} className="bg-panel px-4 py-2.5">
                    <dt className="text-dim">{k}</dt>
                    <dd className="text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {chips.map((chip, i) => (
              <FloatingChip key={chip.label} chip={chip} index={i} sx={sx} sy={sy} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee de tecnologías */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="marquee relative mt-20 overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]"
      >
        <div className="marquee-track flex w-max gap-10 font-mono text-sm text-dim">
          {[...allTech, ...allTech].map((tech, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap transition-colors hover:text-accent">
              {tech}
              <span className="text-line-strong">✦</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FloatingChip({
  chip,
  index,
  sx,
  sy,
}: {
  chip: (typeof chips)[number];
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const x = useTransform(sx, (n) => n * chip.depth);
  const y = useTransform(sy, (n) => n * chip.depth);
  return (
    <motion.span
      style={{ x, y, translateZ: 40 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6 + index * 0.12, duration: 0.5 }}
      className={`absolute hidden rounded-lg border border-line-strong bg-bg/80 px-2.5 py-1.5 font-mono text-[11px] backdrop-blur-md sm:block ${chip.className}`}
    >
      {chip.label}
    </motion.span>
  );
}

function SplitName({
  text,
  delay,
  className = "",
  letterClassName = "",
}: {
  text: string;
  delay: number;
  className?: string;
  letterClassName?: string;
}) {
  const words = text.split(" ");
  const offsets = words.map((_, w) => words.slice(0, w).join("").length);
  return (
    <span className={`block overflow-hidden ${className}`}>
      {words.map((word, w) => (
        <span key={w} className="mr-[0.22em] inline-block whitespace-nowrap last:mr-0">
          {word.split("").map((ch, c) => (
            <motion.span
              key={c}
              className={`inline-block ${letterClassName}`}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: delay + (offsets[w] + c) * 0.03, duration: 0.8, ease }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
