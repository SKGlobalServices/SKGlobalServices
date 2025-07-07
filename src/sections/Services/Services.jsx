import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { servicesData } from "../../data/services";
import "./Services.css";

export const Services = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const handleFlip = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <section className="services" id="services">
      <Container>
        <Row className="mb-5 justify-content-center">
          {servicesData.map((service) => (
            <Col md={4} key={service.id}>
              <div
                className={`flip-container ${
                  flippedCard === service.id ? "flipped" : ""
                }`}
              >
                <div className="flip-card">
                  {/* Parte Frontal */}
                  <div className="flip-card-front">
                    <Card>
                      <Button variant="" onClick={() => handleFlip(service.id)}>
                        <Card.Img
                          variant="top"
                          src={service.front.img}
                          alt={service.front.title}
                        />
                        <Card.Body>
                          <Card.Title>{service.front.title}</Card.Title>
                          <Card.Text>{service.front.text}</Card.Text>
                        </Card.Body>
                      </Button>
                    </Card>
                  </div>
                  {/* Parte Trasera */}
                  <div className="flip-card-back">
                    <Card className="btn-card">
                      <Button variant="" onClick={() => handleFlip(service.id)}>
                        <Card.Body>
                          <Card.Title>{service.back.title}</Card.Title>
                          {service.back.points.map((point, index) => (
                            <Card.Text key={index}>{point}</Card.Text>
                          ))}
                        </Card.Body>
                      </Button>
                    </Card>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
