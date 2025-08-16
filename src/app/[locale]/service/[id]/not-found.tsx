"use client";

import { Container, Button } from "react-bootstrap";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "@/i18n/LanguageContext";

export default function ServiceNotFound() {
  const t = useTranslations("service_page");

  return (
    <Container className="text-center py-5">
      <h2 className="text-white">{t("not_found")}</h2>
      <p className="text-white">
        {t("not_found_description") || "El servicio que buscas no existe o ha sido movido."}
      </p>
      <Link href="/">
        <Button variant="primary">{t("go_back_home")}</Button>
      </Link>
    </Container>
  );
}
