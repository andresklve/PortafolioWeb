"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect } from "react";

export function Background() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="bg-grid" aria-hidden />
      <div className="bg-spotlight" aria-hidden />
      <div className="bg-noise" aria-hidden />
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
    </>
  );
}

/** Actualiza --cx/--cy en la tarjeta para el borde iluminado. */
export function trackGlow(e: React.PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--cx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--cy", `${e.clientY - rect.top}px`);
}
