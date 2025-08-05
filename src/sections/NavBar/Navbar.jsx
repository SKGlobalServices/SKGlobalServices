import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Button, ButtonGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import facebookicon from "../../assets/img/facebook_icon.png";
import instagramicon from "../../assets/img/instagram_icon.png";
import "./Navbar.css";

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [copySuccess, setCopySuccess] = useState({
    email: false,
    phone: false,
  });
  const copyTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const copyToClipboard = async (text, type) => {
    try {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
      await navigator.clipboard.writeText(text);
      setCopySuccess({ email: false, phone: false, [type]: true });
      copyTimeout.current = setTimeout(() => {
        setCopySuccess({ email: false, phone: false });
      }, 2000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <section className="home" id="home">
      <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand as={Link} to="/SKGlobalServices">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link
                as={Link}
                to="/#home"
                className={
                  activeLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("home")}
              >
                {t("navbar.home")}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/#services"
                className={
                  activeLink === "services"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("services")}
              >
                {t("navbar.services")}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/#contact"
                className={
                  activeLink === "contact"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("contact")}
              >
                {t("navbar.contact")}
              </Nav.Link>
            </Nav>
            <span className="ms-right">
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
            </span>
            <span className="ms-auto">
              <div className="contact-info">
                <p
                  className="copyable-text"
                  onClick={() =>
                    copyToClipboard("skglobalservices2024@gmail.com", "email")
                  }
                >
                  skglobalservices2024@gmail.com
                  <span className="tooltip">
                    {copySuccess.email ? t("navbar.copy_success") : t("navbar.copy_prompt")}
                  </span>
                </p>
                <p
                  className="copyable-text "
                  onClick={() => copyToClipboard("+297 741 5171", "phone")}
                >
                  +
                  <span className="tooltip">
                    {copySuccess.phone ? t("navbar.copy_success") : t("navbar.copy_prompt")}
                  </span>
                </p>
              </div>
              <ButtonGroup className="ms-3">
                <Button variant="outline-light" size="sm" onClick={() => changeLanguage('es')}>ES</Button>
                <Button variant="outline-light" size="sm" onClick={() => changeLanguage('en')}>EN</Button>
                <Button variant="outline-light" size="sm" onClick={() => changeLanguage('nl')}>NL</Button>
              </ButtonGroup>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};
