export const locales = ["es", "en", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
