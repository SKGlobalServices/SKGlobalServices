"use client";

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
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Component is now client-side

// Pre-render de rutas estáticas
export async function generateStaticParams() {
  return servicesData.map((s) => ({ id: String(s.id) }));
}

export default function ServicePage() {
  const params = useParams();
  const locale = params.locale as Locale;
  const id = params.id as string;
  
  const [translations, setTranslations] = useState<{
    start_project_button: string;
    our_services_title: string;
    other_services_title: string;
    back_to_services: string;
  }>({
    start_project_button: "Iniciar proyecto",
    our_services_title: "Nuestros servicios de",
    other_services_title: "Otros servicios",
    back_to_services: "Volver a servicios",
  });
  
  const [serviceData, setServiceData] = useState<{
    service: TranslatedService | null;
    serviceImage: { id: string | number; front: { img: string } } | null;
    otherServices: UIService[];
  }>({
    service: null,
    serviceImage: null,
    otherServices: [],
  });

  useEffect(() => {
    async function loadData() {
      // Load translations
      const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
      setTranslations({
        start_project_button: messages.service_page?.start_project_button || "Iniciar proyecto",
        our_services_title: messages.service_page?.our_services_title || "Nuestros servicios de",
        other_services_title: messages.service_page?.other_services_title || "Otros servicios",
        back_to_services: messages.service_page?.back_to_services || "Volver a servicios",
      });

      // Load service data
      const serviceImage = servicesData.find((s) => String(s.id) === String(id));
      if (!serviceImage) {
        notFound();
        return;
      }

      const translatedServices: TranslatedService[] = messages?.services_data ?? [];
      const service = translatedServices.find((s) => String(s.id) === String(id));
      
      if (!service) {
        notFound();
        return;
      }

      const otherServices: UIService[] = translatedServices
        .filter((s) => String(s.id) !== String(id))
        .map((s) => ({
          ...s,
          img: servicesData.find((img) => String(img.id) === String(s.id))?.front.img || undefined,
        }));

      setServiceData({
        service,
        serviceImage,
        otherServices,
      });
    }

    loadData();
  }, [locale, id]);

  if (!serviceData.service || !serviceData.serviceImage) {
    return <div>Loading...</div>;
  }

  const { service, serviceImage, otherServices } = serviceData;
  const t = translations;

  return (
    <main className={styles.servicePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <a href={`#services`} className={styles.breadcrumbBack}>
                ← {t.back_to_services}
              </a>
              <h1 className={styles.typographyH1}>{service.page_title}</h1>
              <p className={`${styles.typographyBody} mb-4`}>
                {service.page_description}
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
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
