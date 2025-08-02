import { Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ServicesList } from "../../components/services/ServicesList";
import "./Services.css";

export const Services = () => {
  const { t } = useTranslation();
// TODO: Poner mejor fondo para la sección de servicios
  return (
    <section className="services" id="services">
      <Container>
        <h2 className="text-center">{t("services_section.title")}</h2>
        <p className="text-center">{t("services_section.description")}</p>
        <ServicesList />
        <div className="mt-5 text-center">
          <Button variant="primary" size="lg" className="button_primary">
            {t("services_section.quote_button")}
          </Button>
        </div>
      </Container>
    </section>
  );
};
