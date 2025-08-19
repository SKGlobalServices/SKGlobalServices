"use client";

// ...existing code...
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
  // Usar solo useTranslations para las traducciones
  const locale = useLocale();
  const t = useTranslations("service_page");
  // ...existing code...

  // Obtener los servicios traducidos
  const { services_data } = useMessages() as {
    services_data?: TranslatedService[];
  };
  const translatedServices: TranslatedService[] = services_data ?? [];

  // Buscar el servicio actual
  const serviceImage = servicesData.find((s) => String(s.id) === String(serviceId));
  const service = translatedServices.find((s) => String(s.id) === String(serviceId));

  // Si no existe el servicio, mostrar mensaje traducido
  if (!serviceImage || !service) {
    return (
      <main className={styles.servicePage}>
        <Container>
          <div className="text-center py-5">
            <h2 className="text-white">{t("not_found_title")}</h2>
            <p className="text-white">{t("not_found_description")}</p>
            <Link href="/">
              <Button variant="primary">{t("go_back_home")}</Button>
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  // Otros servicios para el carrusel
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

  // Botón de regreso funcional usando Link
  function handleBackClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.history.back();
  }

  return (
    <main key={`service-page-${locale}-${serviceId}`} className={styles.servicePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <a
                href="#"
                className={styles.breadcrumbBack}
                onClick={handleBackClick}
                role="button"
                tabIndex={0}
              >
                ← {t("back_to_services")}
              </a>
              <h1 className={styles.typographyH1}>{service.page_title}</h1>
              <p className={`${styles.typographyBody} mb-4`}>
                {service.page_description}
              </p>
              <ServicePageClient buttonText={t("start_project_button")} />
            </Col>
            <Col md={6}>
              <Image
                src={serviceImage.front.img}
                alt={service.page_title ?? "Service image"}
                width={600}
                height={250}
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
              {t("our_services_title")} {service.front_title}
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
            {t("other_services_title")}
          </h2>
          <ServiceCarousel services={otherServices} activeId={serviceId} />
        </Container>
      </section>

      {/* Contact Section */}
      <Contact />
    </main>
  );
}
