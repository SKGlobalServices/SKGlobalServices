import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales
  locales: ["es", "en", "nl"],

  // Match the app's default locale
  defaultLocale: "es",

  // Always include locale in URL for consistency
  localePrefix: "always",

  // The `pathnames` object holds pairs of internal and
  // external paths. Keep them identical to the filesystem
  // routes to avoid mismatches and slow rewrites.
  pathnames: {
    "/": "/",
    "/service/[id]": "/service/[id]",
  },
});

// Note: Navigation helpers are exported from `@/i18n/navigation`.
