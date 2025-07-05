import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import facebookicon from "../assets/img/facebook_icon.png";
import instagramicon from "../assets/img/instagram_icon.png";
import bannervideo from "../assets/img/banner-videoR.mp4";

export const NavBar = () => {
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

  return (
    <div className="navbar-with-video">
      <video className="video-background" autoPlay muted loop>
        <source src={bannervideo} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <section className="home" id="home">
        <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
          <Container>
            <Navbar.Brand href="https://skglobalservices.github.io/SKGlobalServices/">
              <img src={logo} alt="Logo" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link
                  href="#home"
                  className={
                    activeLink === "home" ? "active navbar-link" : "navbar-link"
                  }
                  onClick={() => onUpdateActiveLink("home")}
                >
                  Inicio
                </Nav.Link>
                <Nav.Link
                  href="#services"
                  className={
                    activeLink === "services"
                      ? "active navbar-link"
                      : "navbar-link"
                  }
                  onClick={() => onUpdateActiveLink("services")}
                >
                  Servicios
                </Nav.Link>
                <Nav.Link
                  href="#contact"
                  className={
                    activeLink === "contact"
                      ? "active navbar-link"
                      : "navbar-link"
                  }
                  onClick={() => onUpdateActiveLink("contact")}
                >
                  Contactanos
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
                    onClick={() => copyToClipboard('skglobalservices2024@gmail.com', 'email')}
                  >
                    skglobalservices2024@gmail.com
                    <span className="tooltip">
                      {copySuccess.email ? '¡Copiado!' : 'Click para copiar'}
                    </span>
                  </p>
                  <p 
                    className="copyable-text "
                    onClick={() => copyToClipboard('+297 746 8097', 'phone')}
                  >
                    +297 746 8097
                    <span className="tooltip">
                      {copySuccess.phone ? '¡Copiado!' : 'Click para copiar'}
                    </span>
                  </p>
                </div>
              </span>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
    </div>
  );
};
