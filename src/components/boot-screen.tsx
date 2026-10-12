"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useState } from "react";
import { useLanguage } from "./language-provider";

const SESSION_KEY = "cig-booted";
const LINE_MS = 230;

/** Muestra el arranque y remonta `children` al terminar para que sus animaciones de entrada se vean. */
export function BootScreen({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let booted = false;
    try {
      booted = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    if (booted || reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skip intro on revisit
      setVisible(false);
      return;
    }
    const total = t.boot.length + 1;
    const timers = Array.from({ length: total }, (_, i) =>
      setTimeout(() => setStep(i + 1), (i + 1) * LINE_MS),
    );
    const done = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
    }, total * LINE_MS + 550);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [reduce, t.boot.length]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
  }, [visible]);

  return (
    <>
    <Fragment key={visible ? "booting" : "ready"}>{children}</Fragment>
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg px-6"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setVisible(false)}
        >
          <div className="w-full max-w-md font-mono text-[13px] leading-7">
            {t.boot.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={step > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="flex gap-3"
              >
                <span className="text-dim">[</span>
                <span className="text-accent">&nbsp;OK&nbsp;</span>
                <span className="text-dim">]</span>
                <span className="text-muted">{line}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: step > t.boot.length ? 1 : 0 }}
              className="mt-3 text-fg"
            >
              <span className="text-accent">❯</span> {t.bootReady}
              <span className="caret ml-1 inline-block h-4 w-2 translate-y-[3px] bg-accent" />
            </motion.div>
            <div className="mt-6 h-px w-full overflow-hidden bg-line">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / (t.boot.length + 1)) * 100}%` }}
                transition={{ ease: "easeOut", duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
