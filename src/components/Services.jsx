import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import logo from "../assets/img/logo.png";

export const Services = () => {
  // Estado para almacenar el índice de la tarjeta actualmente volteada (1 a 6). Si es null, ninguna está volteada.
  const [flippedCard, setFlippedCard] = useState(null);

  // Función para manejar el flip de cada tarjeta.
  // Si la tarjeta seleccionada ya está volteada, se "desflip", de lo contrario se establece como la tarjeta actual.
  const handleFlip = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <section className="services" id="services">
      <Container>
        {/* Fila 1 */}
        <Row className="mb-5">
          {/* Tarjeta 1 */}
          <Col md={4}>
            <div className={`flip-container ${flippedCard === 1 ? "flipped" : ""}`}>
              <div className="flip-card">
                {/* Parte Frontal */}
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(1)}>
                      <Card.Img variant="top" src={logo} alt="Service 1" />
                      <Card.Body>
                        <Card.Title>Servicio 1</Card.Title>
                        <Card.Text>Breve descripción del servicio 1.</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                {/* Parte Trasera */}
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(1)}>
                      <Card.Body>
                        <Card.Title>Servicio 1</Card.Title>
                        <Card.Text>
                          Aquí va la descripción extendida del servicio 1.
                        </Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 2 */}
          <Col md={4}>
            <div className={`flip-container ${flippedCard === 2 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(2)}>
                      <Card.Img variant="top" src={logo} alt="Service 2" />
                      <Card.Body>
                        <Card.Title>Servicio 2</Card.Title>
                        <Card.Text>Breve descripción del servicio 2.</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(2)}>
                      <Card.Body>
                        <Card.Title>Servicio 2</Card.Title>
                        <Card.Text>
                          Aquí va la descripción extendida del servicio 2.
                        </Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 3 */}
          <Col md={4}>
            <div className={`flip-container ${flippedCard === 3 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(3)}>
                      <Card.Img variant="top" src={logo} alt="Service 3" />
                      <Card.Body>
                        <Card.Title>Servicio 3</Card.Title>
                        <Card.Text>Breve descripción del servicio 3.</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(3)}>
                      <Card.Body>
                        <Card.Title>Servicio 3</Card.Title>
                        <Card.Text>
                          Aquí va la descripción extendida del servicio 3.
                        </Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Fila 2 */}
        <Row className="mb-5">
          {/* Tarjeta 4 */}
          <Col md={4}>
            <div className={`flip-container ${flippedCard === 4 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(4)}>
                      <Card.Img variant="top" src={logo} alt="Service 4" />
                      <Card.Body>
                        <Card.Title>Servicio 4</Card.Title>
                        <Card.Text>Breve descripción del servicio 4.</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(4)}>
                      <Card.Body>
                        <Card.Title>Servicio 4</Card.Title>
                        <Card.Text>
                          Descripción extendida del servicio 4.
                        </Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 5 */}
          <Col md={4}>
            <div className={`flip-container ${flippedCard === 5 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(5)}>
                      <Card.Img variant="top" src={logo} alt="Service 5" />
                      <Card.Body>
                        <Card.Title>Servicio 5</Card.Title>
                        <Card.Text>Breve descripción del servicio 5.</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(5)}>
                      <Card.Body>
                        <Card.Title>Servicio 5</Card.Title>
                        <Card.Text>
                          Descripción extendida del servicio 5.
                        </Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 6 */}
          <Col md={4}>
            <div className={`flip-container ${flippedCard === 6 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(6)}>
                      <Card.Img variant="top" src={logo} alt="Service 6" />
                      <Card.Body>
                        <Card.Title>Servicio 6</Card.Title>
                        <Card.Text>Breve descripción del servicio 6.</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(6)}>
                      <Card.Body>
                        <Card.Title>Servicio 6</Card.Title>
                        <Card.Text>
                          Descripción extendida del servicio 6.
                        </Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
