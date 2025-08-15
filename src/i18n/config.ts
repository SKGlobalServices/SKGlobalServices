import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "./locales";

// Pre-import all messages for better performance
import enMessages from "./messages/en.json";
import esMessages from "./messages/es.json";
import nlMessages from "./messages/nl.json";

const messages = {
  en: enMessages,
  es: esMessages,
  nl: nlMessages,
} as const;

export default getRequestConfig(async ({ locale }) => {
  const loc = (locale ?? defaultLocale) as string;
  const isSupported = (value: string): value is Locale =>
    (locales as readonly string[]).includes(value);
  const current: Locale = isSupported(loc) ? loc : defaultLocale;

  return {
    locale: current,
    messages: messages[current],
  };
});
