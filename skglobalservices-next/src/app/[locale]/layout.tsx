import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/i18n/locales";
import Navbar from "@/sections/NavBar/Navbar";
import Footer from "@/sections/Footer/Footer";
import Whatsappbutton from "@/components/iu/Whatsappbutton/Whatsappbutton";

type ParamsPromise = Promise<{ locale: Locale }>;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ParamsPromise;
}) {
  const { locale } = await params;
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <Whatsappbutton />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
