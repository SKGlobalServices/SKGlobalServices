import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { NavBar } from "../../sections/NavBar/Navbar";
import { Footer } from "../../sections/Footer/Footer";
import { Contact } from "../../sections/Contact/Contact";
import { Whatsappbutton } from "../../components/iu/Whatsappbutton/Whatsappbutton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ServicePage.css";
import { servicesData as serviceImageData } from "../../data/services";

const responsiveCarousel = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export const ServicePage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const services = t("services_data", { returnObjects: true });
  const service = services.find((s) => s.id.toString() === id);
  const serviceImage = serviceImageData.find((s) => s.id.toString() === id);

  if (!service) {
    return (
      <div>
        <NavBar />
        <Container className="text-center py-5">
          <h2>{t("service_page.not_found")}</h2>
          <Link to="/">
            <Button variant="primary">{t("service_page.go_back_home")}</Button>
          </Link>
        </Container>
        <Footer />
      </div>
    );
  }

  const otherServices = services.filter((s) => s.id.toString() !== id);

  return (
    <>
      <Whatsappbutton />
      <NavBar />
      <main className="service-page">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <h1 className="typography_h1 mb-4">{service.page_title}</h1>
                <p className="typography_body mb-8">
                  {service.page_description}
                </p>
                <Button
                  variant="primary"
                  className="button_primary"
                  href="#contact"
                >
                  {t("service_page.start_project_button")}
                </Button>
              </Col>
              <Col md={6}>
                <Image
                  src={serviceImage.front.img}
                  alt={service.page_title}
                  fluid
                  rounded
                  className="shadow-lg"
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-light-dark">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="typography_h2 mb-4">
                {t("service_page.our_services_title")} {service.front_title}
              </h2>
            </div>
            <Row className="mt-12">
              {service.features.map((feature, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="feature-card h-100">
                    <Card.Body>
                      <Card.Title as="h3">{feature.title}</Card.Title>
                      <Card.Text>{feature.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Portfolio Section */}
        {/* <section className="py-16 md:py-24">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="typography_h2 mb-5">
                {t("service_page.portfolio_title")}
              </h2>
            </div>
            <Row>
              {porfolioItems && portfolioItems.map((item, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="portfolio-card">
                    <Card.Img variant="top" src={item.img} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section> */}

        {/* Other Services Carousel */}
        <section className="py-16 md:py-24 bg-light-dark" id="services">
          <Container>
            <h2 className="text-center typography_h2 mb-5">
              {t("service_page.other_services_title")}
            </h2>
            <Carousel
              responsive={responsiveCarousel}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              className="pb-4"
            >
              {otherServices.map((s) => (
                <div key={s.id} className="px-2">
                  <Link
                    to={`/service/${s.id}`}
                    className="text-decoration-none"
                  >
                    <Card className="service-carousel-card h-100">
                      <Card.Body className="d-flex align-items-center justify-content-center">
                        <Card.Title className="mb-0">
                          {s.front_title}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              ))}
            </Carousel>
          </Container>
        </section>

        {/* Contact Section */}
        <Contact />
      </main>
      <Footer />
    </>
  );
};
