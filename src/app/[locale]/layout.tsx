import type { Locale } from "@/i18n/locales";
import { LanguageProvider } from "@/i18n/LanguageContext";
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

  return (
    <LanguageProvider initialLocale={locale} >
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <Whatsappbutton />
        <main className="flex-grow-1">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
