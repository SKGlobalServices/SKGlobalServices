import "./globals.css";
import type { Metadata } from "next";
import BootstrapClient from "@/components/iu/BootstrapClient";

export const metadata: Metadata = {
  title: "S&K Global Services",
  description: "Software y servicios",
  icons: [{ rel: "icon", url: "/img/logo.png" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
