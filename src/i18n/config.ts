import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "./locales";

export default getRequestConfig(async ({ locale }) => {
  const loc = (locale ?? defaultLocale) as string;
  const isSupported = (value: string): value is Locale =>
    (locales as readonly string[]).includes(value);
  const current: Locale = isSupported(loc) ? loc : defaultLocale;
  return {
    locale: current,
    messages: (await import(`./messages/${current}.json`)).default,
  };
});
