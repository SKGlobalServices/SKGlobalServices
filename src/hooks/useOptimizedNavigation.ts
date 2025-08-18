"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useCallback, useTransition } from "react";

export function useOptimizedNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const navigateToService = useCallback(
    (serviceId: string | number) => {
      startTransition(() => {
        router.push({
          pathname: "/service/[id]",
          params: { id: String(serviceId) },
        });
      });
    },
    [router]
  );

  const navigateToHome = useCallback(
    (section?: string) => {
      if (pathname === "/") {
        // Already on home page, just scroll to section
        if (section) {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            history.replaceState(null, "", `#${section}`);
          }
        }
      } else {
        // Navigate to home page
        startTransition(() => {
          router.push("/");

          // After navigation, scroll to section
          if (section) {
            setTimeout(() => {
              const element = document.getElementById(section);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                history.replaceState(null, "", `#${section}`);
              }
            }, 100);
          }
        });
      }
    },
    [router, pathname]
  );

  return {
    navigateToService,
    navigateToHome,
    isPending,
  };
}
