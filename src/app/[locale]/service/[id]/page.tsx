import { notFound } from "next/navigation";
import { servicesData } from "@/data/services/servicesData";
import { locales, type Locale } from "@/i18n/locales";
import ServicePageContent from "./ServicePageContent";

// Pre-render de rutas estáticas para navegación rápida
export async function generateStaticParams() {
  // Generate all combinations of locales x service ids
  return locales.flatMap((locale) =>
    servicesData.map((s) => ({ locale, id: String(s.id) }))
  );
}

interface ServicePageProps {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  try {
    const { id } = await params;

    // Validate that the service exists
    const serviceExists = servicesData.find((s) => String(s.id) === String(id));
    if (!serviceExists) {
      notFound();
    }

    return <ServicePageContent serviceId={id} />;
  } catch (error) {
    console.error(`Error loading service page:`, error);
    notFound();
  }
}
