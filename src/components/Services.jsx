import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const Services = () => {
  const [isFlipped1, setIsFlipped1] = useState(false);
  const [isFlipped2, setIsFlipped2] = useState(false);
  const [isFlipped3, setIsFlipped3] = useState(false);
  const [isFlipped4, setIsFlipped4] = useState(false);
  const [isFlipped5, setIsFlipped5] = useState(false);
  const [isFlipped6, setIsFlipped6] = useState(false);
  const [isFlipped7, setIsFlipped7] = useState(false);
  const [isFlipped8, setIsFlipped8] = useState(false);
  const [isFlipped9, setIsFlipped9] = useState(false);

  return (
    <section className="services" id="services">
      <Container>
        {/* Fila 1 */}
        <Row className="mb-4">
          {/* Tarjeta 1 */}
          <Col md={4}>
            <div className={`flip-container ${isFlipped1 ? "flipped" : ""}`}>
              <div className="flip-card">
                {/* Parte Frontal */}
                <div className="flip-card-front">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/300x200"
                      alt="Service 1"
                    />
                    <Card.Body>
                      <Card.Title>Servicio 1</Card.Title>
                      <Card.Text>Breve descripción del servicio 1.</Card.Text>
                      <Button variant="primary" onClick={() => setIsFlipped1(true)}>
                        Más información
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
                {/* Parte Trasera */}
                <div className="flip-card-back">
                  <Card>
                    <Card.Body>
                      <Card.Title>Servicio 1</Card.Title>
                      <Card.Text>
                        Aquí va la descripción extendida del servicio 1.
                      </Card.Text>
                      <Button variant="secondary" onClick={() => setIsFlipped1(false)}>
                        Volver
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 2 */}
          <Col md={4}>
            <div className={`flip-container ${isFlipped2 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/300x200"
                      alt="Service 2"
                    />
                    <Card.Body>
                      <Card.Title>Servicio 2</Card.Title>
                      <Card.Text>Breve descripción del servicio 2.</Card.Text>
                      <Button variant="primary" onClick={() => setIsFlipped2(true)}>
                        Más información
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card>
                    <Card.Body>
                      <Card.Title>Servicio 2</Card.Title>
                      <Card.Text>
                        Aquí va la descripción extendida del servicio 2.
                      </Card.Text>
                      <Button variant="secondary" onClick={() => setIsFlipped2(false)}>
                        Volver
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 3 */}
          <Col md={4}>
            <div className={`flip-container ${isFlipped3 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/300x200"
                      alt="Service 3"
                    />
                    <Card.Body>
                      <Card.Title>Servicio 3</Card.Title>
                      <Card.Text>Breve descripción del servicio 3.</Card.Text>
                      <Button variant="primary" onClick={() => setIsFlipped3(true)}>
                        Más información
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card>
                    <Card.Body>
                      <Card.Title>Servicio 3</Card.Title>
                      <Card.Text>
                        Aquí va la descripción extendida del servicio 3.
                      </Card.Text>
                      <Button variant="secondary" onClick={() => setIsFlipped3(false)}>
                        Volver
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Fila 2 */}
        <Row className="mb-4">
          {/* Tarjeta 4 */}
          <Col md={4}>
            <div className={`flip-container ${isFlipped4 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/300x200"
                      alt="Service 4"
                    />
                    <Card.Body>
                      <Card.Title>Servicio 4</Card.Title>
                      <Card.Text>Breve descripción del servicio 4.</Card.Text>
                      <Button variant="primary" onClick={() => setIsFlipped4(true)}>
                        Más información
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card>
                    <Card.Body>
                      <Card.Title>Servicio 4</Card.Title>
                      <Card.Text>
                        Descripción extendida del servicio 4.
                      </Card.Text>
                      <Button variant="secondary" onClick={() => setIsFlipped4(false)}>
                        Volver
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 5 */}
          <Col md={4}>
            <div className={`flip-container ${isFlipped5 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/300x200"
                      alt="Service 5"
                    />
                    <Card.Body>
                      <Card.Title>Servicio 5</Card.Title>
                      <Card.Text>Breve descripción del servicio 5.</Card.Text>
                      <Button variant="primary" onClick={() => setIsFlipped5(true)}>
                        Más información
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card>
                    <Card.Body>
                      <Card.Title>Servicio 5</Card.Title>
                      <Card.Text>
                        Descripción extendida del servicio 5.
                      </Card.Text>
                      <Button variant="secondary" onClick={() => setIsFlipped5(false)}>
                        Volver
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 6 */}
          <Col md={4}>
            <div className={`flip-container ${isFlipped6 ? "flipped" : ""}`}>
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/300x200"
                      alt="Service 6"
                    />
                    <Card.Body>
                      <Card.Title>Servicio 6</Card.Title>
                      <Card.Text>Breve descripción del servicio 6.</Card.Text>
                      <Button variant="primary" onClick={() => setIsFlipped6(true)}>
                        Más información
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card>
                    <Card.Body>
                      <Card.Title>Servicio 6</Card.Title>
                      <Card.Text>
                        Descripción extendida del servicio 6.
                      </Card.Text>
                      <Button variant="secondary" onClick={() => setIsFlipped6(false)}>
                        Volver
                      </Button>
                    </Card.Body>
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
