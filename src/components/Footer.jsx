import { Col, Container, Row } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import facebookicon from "../assets/img/facebook_icon.png";
import instagramicon from "../assets/img/instagram_icon.png";

export const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <Container>
        <Row className="align-item-center">
          <Col sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col sm={6} className="text-center text-sn-end">
            <div className="social-icon">
              <a
                href="https://www.facebook.com/people/SK-Global-Services/61573197338873/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebookicon} alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/skglobalservices_21?igsh=MXVndHd3czJzOHJoeQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagramicon} alt="Instagram" />
              </a>
            </div>
            <p>CopyRight 2025. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
