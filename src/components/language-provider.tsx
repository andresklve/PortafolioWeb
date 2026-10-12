"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dict, type Dict, type Lang } from "@/lib/content";

type LanguageContextValue = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "cig-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (stored === "en" || stored === "es") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const toggleLang = useCallback(() => setLang(lang === "es" ? "en" : "es"), [lang, setLang]);

  const value = useMemo(
    () => ({ lang, t: dict[lang] as Dict, setLang, toggleLang }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
