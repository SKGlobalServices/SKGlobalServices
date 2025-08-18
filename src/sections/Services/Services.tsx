"use client";

import { Container, Button } from "react-bootstrap";
import { useTranslations } from "@/i18n/LanguageContext";
import ServicesList from "@/components/services/ServicesList";
import styles from "./Services.module.css";

export default function Services() {
  const t = useTranslations("services_section");

  return (
    <section className={styles.services} id="services">
      <Container>
        <h2 className="text-center text-white">{t("title")}</h2>
        <p className="text-center text-white">{t("description")}</p>
        <ServicesList />
        <div className="mt-5 text-center">
          <Button variant="primary" size="lg" href="#contact">
            {t("quote_button")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
