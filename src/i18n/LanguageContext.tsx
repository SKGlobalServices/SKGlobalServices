"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "./locales";

// Import all messages
import enMessages from "./messages/en.json";
import esMessages from "./messages/es.json";
import nlMessages from "./messages/nl.json";

const messages = {
  en: enMessages,
  es: esMessages,
  nl: nlMessages,
};

type Messages = typeof enMessages;

interface LanguageContextType {
  currentLocale: Locale;
  changeLanguage: (locale: Locale) => void;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale: Locale;
}

export function LanguageProvider({
  children,
  initialLocale,
}: LanguageProviderProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale);

  const changeLanguage = (locale: Locale) => {
    setCurrentLocale(locale);

    // Update URL without page reload
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/^\/(en|es|nl)/, `/${locale}`);
      const finalPath = newPath === `/${locale}` ? `/${locale}` : newPath;

      window.history.pushState(
        {},
        "",
        finalPath + window.location.search + window.location.hash
      );
    }
  };

  const contextValue: LanguageContextType = {
    currentLocale,
    changeLanguage,
    messages: messages[currentLocale],
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <NextIntlClientProvider
        locale={currentLocale}
        messages={messages[currentLocale]}
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Hook to get translated messages (similar to useTranslations from next-intl)
export function useTranslations(namespace?: string) {
  const { messages } = useLanguage();

  return (key: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split(".");
    let value: unknown = messages;

    for (const k of keys) {
      if (typeof value === "object" && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key "${fullKey}" not found`);
        return fullKey;
      }
    }

    return typeof value === "string" ? value : fullKey;
  };
}

// Hook to get current locale (similar to useLocale from next-intl)
export function useLocale() {
  const { currentLocale } = useLanguage();
  return currentLocale;
}
