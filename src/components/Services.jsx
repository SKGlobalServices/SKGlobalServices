import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import create_logo from "../assets/img/create_logo.png";
import img_ads from "../assets/img/img_ads.png";
import desarrollo_web from "../assets/img/desarrollo_web.png";
import app_mobile from "../assets/img/app_mobile.png";
import creacion_empresarial from "../assets/img/creacion_empresarial.png";
import facturacion from "../assets/img/facturacion.png";

export const Services = () => {
  const [flippedCard, setFlippedCard] = useState(null);
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
            <div
              className={`flip-container ${flippedCard === 1 ? "flipped" : ""}`}
            >
              <div className="flip-card">
                {/* Parte Frontal */}
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(1)}>
                      <Card.Img
                        variant="top"
                        src={create_logo}
                        alt="Service 1"
                      />
                      <Card.Body>
                        <Card.Title>Creación De Logos</Card.Title>
                        <Card.Text>Logotipos únicos para tu marca</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                {/* Parte Trasera */}
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(1)}>
                      <Card.Body>
                        <Card.Title>Creación De Logo</Card.Title>
                        <Card.Text>Potencia tu imagen corporativa</Card.Text>
                        <Card.Text>Diseños creativos y profesionales</Card.Text>
                        <Card.Text>Diseños creativos y profesionales</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 2 */}
          <Col md={4}>
            <div
              className={`flip-container ${flippedCard === 2 ? "flipped" : ""}`}
            >
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(2)}>
                      <Card.Img variant="top" src={img_ads} alt="Service 2" />
                      <Card.Body>
                        <Card.Title>Anuncios Publicitarios</Card.Title>
                        <Card.Text>
                          Atrae Más Clientes Con Campañas Creativas
                        </Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(2)}>
                      <Card.Body>
                        <Card.Title>Anuncions Publicitarios</Card.Title>
                        <Card.Text>Promoción efectiva de tu negocio</Card.Text>
                        <Card.Text>Publicidad que genera resultados</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Col>

          {/* Tarjeta 3 */}
          <Col md={4}>
            <div
              className={`flip-container ${flippedCard === 3 ? "flipped" : ""}`}
            >
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(3)}>
                      <Card.Img
                        variant="top"
                        src={facturacion}
                        alt="Service 3"
                      />
                      <Card.Body>
                        <Card.Title>
                          Sistema De Facturación Personalizado
                        </Card.Title>
                        <Card.Text>Optimiza tu proceso de ventas</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(3)}>
                      <Card.Body>
                        <Card.Title>
                          Sistema De Facturación Personalizado
                        </Card.Title>
                        <Card.Text>
                          Emisión rápida y segura de facturas
                        </Card.Text>
                        <Card.Text>
                          Control de inventario en tiempo real
                        </Card.Text>
                        <Card.Text>
                          Reportes automáticos y personalizados
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
            <div
              className={`flip-container ${flippedCard === 4 ? "flipped" : ""}`}
            >
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(4)}>
                      <Card.Img
                        variant="top"
                        src={desarrollo_web}
                        alt="Service 4"
                      />
                      <Card.Body>
                        <Card.Title>Desarrollo De Pagina Web</Card.Title>
                        <Card.Text>
                          Sitios modernos y fáciles de navegar
                        </Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(4)}>
                      <Card.Body>
                        <Card.Title>Desarrollo De Pagina Web</Card.Title>
                        <Card.Text>Destaca con un estilo único</Card.Text>
                        <Card.Text>Experiencia de usuario óptima</Card.Text>
                        <Card.Text>
                          Tiendas virtuales con pagos seguros y alcance global.
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
            <div
              className={`flip-container ${flippedCard === 5 ? "flipped" : ""}`}
            >
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(5)}>
                      <Card.Img
                        variant="top"
                        src={app_mobile}
                        alt="Service 5"
                      />
                      <Card.Body>
                        <Card.Title>Aplicaciónes Moviles</Card.Title>
                        <Card.Text>Desarrollo para Android e iOS</Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(5)}>
                      <Card.Body>
                        <Card.Title>Aplicacións Moviles</Card.Title>
                        <Card.Text>Apps intuitivas y seguras</Card.Text>
                        <Card.Text>Innovación para tu negocio</Card.Text>
                        <Card.Text>
                          Soluciones personalizadas para cualquier tipo de
                          negocio.
                        </Card.Text>
                        <Card.Text>
                          Tiendas virtuales con pagos seguros y alcance global.
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
            <div
              className={`flip-container ${flippedCard === 6 ? "flipped" : ""}`}
            >
              <div className="flip-card">
                <div className="flip-card-front">
                  <Card>
                    <Button variant="" onClick={() => handleFlip(6)}>
                      <Card.Img
                        variant="top"
                        src={creacion_empresarial}
                        alt="Service 6"
                      />
                      <Card.Body>
                        <Card.Title>
                          Desarrollo De Sistemas Empresariales
                        </Card.Title>
                        <Card.Text>
                          Automatiza procesos y ahorra tiempo
                        </Card.Text>
                      </Card.Body>
                    </Button>
                  </Card>
                </div>
                <div className="flip-card-back">
                  <Card className="btn-card">
                    <Button variant="" onClick={() => handleFlip(6)}>
                      <Card.Body>
                        <Card.Title>
                          Desarrollo De Sistemas Empresariales
                        </Card.Title>
                        <Card.Text>
                          Control de facturación e inventarios
                        </Card.Text>
                        <Card.Text>
                          Gestión de ingresos y gastos en un solo lugar
                        </Card.Text>
                        <Card.Text>
                          Sistemas a la medida de tu negocio
                        </Card.Text>
                        <Card.Text>Planes de soporte y mantenimiento</Card.Text>
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
