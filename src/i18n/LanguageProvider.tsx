"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type Lang, type TranslationKey, t as translate } from "./dictionary";

// Holds the current language for every client component below it.
const LangContext = createContext<Lang>("en");

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

// Read just the current language code ("en" | "zh").
export function useLang(): Lang {
  return useContext(LangContext);
}

// Get a translate function already bound to the current language.
// Usage in a component:  const t = useT();  then  t("items.title")
export function useT() {
  const lang = useContext(LangContext);
  return (key: TranslationKey, vars?: Record<string, string | number>) =>
    translate(lang, key, vars);
}
