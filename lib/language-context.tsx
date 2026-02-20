"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (id: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  }, []);

  const t = useCallback(
    (id: string, en: string) => {
      return language === "id" ? id : en;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
