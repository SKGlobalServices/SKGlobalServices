import { Col, Container, Nav, Row } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import facebookicon from "../../assets/img/facebook_icon.png";
import instagramicon from "../../assets/img/instagram_icon.png";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer = () => {
  const {t} = useTranslation();
  return (
    <footer className="footer" id="footer">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={4} className="text-center text-md-start mb-4 mb-md-0">
            <img src={logo} alt="Logo" className="footer-logo" />
          </Col>
          <Col xs={12} md={4} className="footer-links text-center mb-4 mb-md-0">
            <Link
                as={Link}
                to="/#home"
                className="navbar-link"
              >
                {t("navbar.home")}
              </Link>
              <Link
                as={Link}
                to="/#services"
                className="navbar-link"
              >
                {t("navbar.services")}
              </Link>
              <Link
                as={Link}
                to="/#contact"
                className="navbar-link"
              >
                {t("navbar.contact")}
              </Link>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-end">
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
            <p>{t("footer.copyright")}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
