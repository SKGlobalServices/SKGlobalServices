import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Pre-import all messages for better performance
import enMessages from "./messages/en.json";
import esMessages from "./messages/es.json";
import nlMessages from "./messages/nl.json";

const messages = {
  en: enMessages,
  es: esMessages,
  nl: nlMessages,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: messages[locale],
  };
});
