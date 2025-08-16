"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CardBody, CardText, CardTitle } from "react-bootstrap";
import { useMessages } from "next-intl";
import { useTranslations, useLocale } from "@/i18n/LanguageContext";
import { Link } from "@/i18n/navigation";
import { servicesData, servicesImages } from "@/data/services/servicesData";
import Contact from "@/sections/Contact/Contact";
import ServiceCarousel from "./ServiceCarousel";
import ServicePageClient from "./ServicePageClient";
import styles from "./ServicePage.module.css";
import type { TranslatedService, UIService } from "@/types";

interface ServicePageContentProps {
  serviceId: string;
}

export default function ServicePageContent({ serviceId }: ServicePageContentProps) {
  const { services_data, service_page } = useMessages() as {
    services_data?: TranslatedService[];
    service_page?: Record<string, string>;
  };
  
  const locale = useLocale();
  const t = useTranslations("service_page");
  const [currentLocale, setCurrentLocale] = useState(locale);

  // Force re-render when locale changes
  useEffect(() => {
    if (currentLocale !== locale) {
      setCurrentLocale(locale);
    }
  }, [locale, currentLocale]);

  // Fallback translations if not loaded
  const translations = {
    start_project_button: service_page?.start_project_button || t("start_project_button"),
    our_services_title: service_page?.our_services_title || t("our_services_title"),
    other_services_title: service_page?.other_services_title || t("other_services_title"),
    back_to_services: service_page?.back_to_services || t("back_to_services"),
  };

  const translatedServices: TranslatedService[] = services_data ?? [];
  
  // Find the service data
  const serviceImage = servicesData.find((s) => String(s.id) === String(serviceId));
  const service = translatedServices.find((s) => String(s.id) === String(serviceId));

  if (!serviceImage || !service) {
    return (
      <main className={styles.servicePage}>
        <Container>
          <div className="text-center py-5">
            <h2 className="text-white">
              {locale === 'en' ? 'Service not found' : locale === 'nl' ? 'Dienst niet gevonden' : 'Servicio no encontrado'}
            </h2>
            <p className="text-white">
              {locale === 'en' ? 'The service you are looking for does not exist.' : locale === 'nl' ? 'De dienst die u zoekt bestaat niet.' : 'El servicio que buscas no existe.'}
            </p>
            <Link href="/">
              <Button variant="primary">
                {locale === 'en' ? 'Go back home' : locale === 'nl' ? 'Terug naar home' : 'Volver al inicio'}
              </Button>
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const otherServices: UIService[] = translatedServices
    .filter((s) => String(s.id) !== String(serviceId))
    .map((s) => {
      const serviceImage = servicesImages.find((img) => String(img.id) === String(s.id));
      return {
        ...s,
        img: servicesData.find((img) => String(img.id) === String(s.id))?.front.img || undefined,
        carouselImg: serviceImage?.carouselImg,
      };
    });

  return (
    <main key={`service-page-${locale}-${serviceId}`} className={styles.servicePage}>
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
          <ServiceCarousel services={otherServices} activeId={serviceId} />
        </Container>
      </section>

      {/* Contact Section */}
      <Contact />
    </main>
  );
}
