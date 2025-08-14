import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { servicesData } from "@/data/services/servicesData";
import Contact from "@/sections/Contact/Contact";
import ServiceCarousel from "./ServiceCarousel";
import styles from "./ServicePage.module.css";
import type { Locale } from "@/i18n/locales";
import type { TranslatedService, UIService } from "@/types";
import { CardBody, CardText, CardTitle } from "react-bootstrap";

// Next.js 15 typed routes: params/searchParams may be Promises
type ParamsPromise = Promise<{ locale: Locale; id: string }>;

// Pre-render de rutas estáticas
export async function generateStaticParams() {
  return servicesData.map((s) => ({ id: String(s.id) }));
}

// Helper function to get translations for server components
async function getServiceTranslations(locale: Locale) {
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  return {
    start_project_button:
      messages.service_page?.start_project_button || "Iniciar proyecto",
    our_services_title:
      messages.service_page?.our_services_title || "Nuestros servicios de",
    other_services_title:
      messages.service_page?.other_services_title || "Otros servicios",
    back_to_services:
      messages.service_page?.back_to_services || "Volver a servicios",
  };
}

export default async function ServicePage({
  params,
}: {
  params: ParamsPromise;
}) {
  const { locale, id } = await params;
  const t = await getServiceTranslations(locale);

  // Buscar el servicio por ID
  const serviceImage = servicesData.find((s) => String(s.id) === String(id));
  if (!serviceImage) return notFound();

  // Cargar traducciones
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default as {
    services_data?: TranslatedService[];
    service_page?: {
      start_project_button?: string;
      our_services_title?: string;
      other_services_title?: string;
      back_to_services?: string;
    };
  };
  const translatedServices: TranslatedService[] = messages?.services_data ?? [];
  const service = translatedServices.find((s) => String(s.id) === String(id));

  if (!service) return notFound();

  // Otros servicios para el carrusel
  const otherServices: UIService[] = translatedServices
    .filter((s) => String(s.id) !== String(id))
    .map((s) => ({
      ...s,
      img:
        servicesData.find((img) => String(img.id) === String(s.id))?.front
          .img || undefined,
    }));

  return (
    <main className={styles.servicePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <a href={`/${locale}#services`} className={styles.breadcrumbBack}>
                ← {t.back_to_services}
              </a>
              <h1 className={styles.typographyH1}>{service.page_title}</h1>
              <p className={`${styles.typographyBody} mb-4`}>
                {service.page_description}
              </p>
              <Button
                variant="primary"
                href={`/${locale}#contact`}
                size="lg"
              >
                {t.start_project_button}
              </Button>
            </Col>
            <Col md={6}>
              <Image
                src={serviceImage.front.img}
                alt={service.page_title ?? "Service image"}
                width={600}
                height={400}
                style={{ width: "100%", height: "auto" }}
                className="rounded shadow-lg"
                priority
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <Container>
          <div className="text-center mb-5">
            <h2 className={styles.typographyH2}>
              {t.our_services_title} {service.front_title}
            </h2>
          </div>
          <Row>
            {service.features?.map(
              (
                feature: { title: string; description: string },
                index: number
              ) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className={styles.featureCard}>
                    <CardBody>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardText>{feature.description}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </Container>
      </section>

      {/* Other Services Carousel */}
      <section className={styles.carouselSection}>
        <Container>
          <h2 className={`text-center ${styles.typographyH2} mb-5`}>
            {t.other_services_title}
          </h2>
          <ServiceCarousel services={otherServices} activeId={id} />
        </Container>
      </section>

      {/* Contact Section */}
      <Contact />
    </main>
  );
}
