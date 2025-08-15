import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { servicesData } from "@/data/services/servicesData";
import Contact from "@/sections/Contact/Contact";
import ServiceCarousel from "./ServiceCarousel";
import styles from "./ServicePage.module.css";
import type { Locale } from "@/i18n/locales";
import type { TranslatedService, UIService } from "@/types";
import { CardBody, CardText, CardTitle } from "react-bootstrap";
import { getMessages } from "next-intl/server";
import ServicePageClient from "./ServicePageClient";

// Pre-render de rutas estáticas para navegación rápida
export async function generateStaticParams() {
  // Only generate params for services that actually exist in our data
  // This prevents 404s from being generated as static pages
  return servicesData.map((s) => ({ id: String(s.id) }));
}

interface ServicePageProps {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  try {
    const { locale, id } = await params;

    // Load translations on server
    const messages = await getMessages({ locale });

    const servicePageMessages =
      ((messages as Record<string, unknown>).service_page as Record<
        string,
        string
      >) || {};
    const servicesDataMessages =
      ((messages as Record<string, unknown>)
        .services_data as TranslatedService[]) || [];

    const translations = {
      start_project_button:
        servicePageMessages.start_project_button || "Iniciar proyecto",
      our_services_title:
        servicePageMessages.our_services_title || "Nuestros servicios de",
      other_services_title:
        servicePageMessages.other_services_title || "Otros servicios",
      back_to_services:
        servicePageMessages.back_to_services || "Volver a servicios",
    };

    // Load service data on server
    const serviceImage = servicesData.find((s) => String(s.id) === String(id));
    if (!serviceImage) {
      notFound();
    }

    const translatedServices: TranslatedService[] = servicesDataMessages;
    const service = translatedServices.find((s) => String(s.id) === String(id));

    if (!service) {
      notFound();
    }

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
                <a href={`#services`} className={styles.breadcrumbBack}>
                  ← {translations.back_to_services}
                </a>
                <h1 className={styles.typographyH1}>{service.page_title}</h1>
                <p className={`${styles.typographyBody} mb-4`}>
                  {service.page_description}
                </p>
                <ServicePageClient
                  buttonText={translations.start_project_button}
                />
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
                {translations.our_services_title} {service.front_title}
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
              {translations.other_services_title}
            </h2>
            <ServiceCarousel services={otherServices} activeId={id} />
          </Container>
        </section>

        {/* Contact Section */}
        <Contact />
      </main>
    );
  } catch (error) {
    console.error(`Error loading service page:`, error);
    notFound();
  }
}
