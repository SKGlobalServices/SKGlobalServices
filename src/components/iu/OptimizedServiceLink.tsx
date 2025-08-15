"use client";

import { Link } from "@/i18n/navigation";
import { ReactNode, useMemo } from "react";

interface OptimizedServiceLinkProps {
  serviceId: string | number;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  prefetch?: boolean;
}

export default function OptimizedServiceLink({
  serviceId,
  children,
  className = "",
  ariaLabel,
  prefetch = true,
}: OptimizedServiceLinkProps) {
  const href = useMemo(
    () => ({
      pathname: "/service/[id]" as const,
      params: { id: String(serviceId) },
    }),
    [serviceId]
  );

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}
