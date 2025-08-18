"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import {
  useTranslations,
  useLocale,
  useLanguage,
} from "@/i18n/LanguageContext";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const { changeLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [activeLink, setActiveLink] = useState<"home" | "services" | "contact">(
    "home"
  );
  const [scrolled, setScrolled] = useState(false);
  const [copySuccess, setCopySuccess] = useState({
    email: false,
    phone: false,
  });
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value: "home" | "services" | "contact") =>
    setActiveLink(value);
// TODO: no funcionan los links de regresar al estar en la página de servicio individual
  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      await navigator.clipboard.writeText(text);
      setCopySuccess({ email: false, phone: false, [type]: true });
      copyTimeout.current = setTimeout(
        () => setCopySuccess({ email: false, phone: false }),
        2000
      );
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  const handleLanguageChange = (lng: "es" | "en" | "nl") => {
    changeLanguage(lng);
  };

  const handleAnchorClick =
    (id: "home" | "services" | "contact") =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      const isHomePath = pathname === "/";

      if (isHomePath && el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        onUpdateActiveLink(id);
        return;
      }

      // If not on home (e.g., service detail), go to the homepage with the anchor
      router.push("/");
      onUpdateActiveLink(id);

      // Manejar el scroll al elemento después de navegar con el hash
      const checkAndScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", `#${id}`);
          }, 150);
        } else {
          // Si el elemento no existe aún, intentar nuevamente
          setTimeout(checkAndScroll, 100);
        }
      };

      setTimeout(checkAndScroll, 200);
    };

  return (
    <section className="home">
      <BsNavbar
        expand="lg"
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      >
        <Container>
          <BsNavbar.Brand as={Link} href="/" className={styles.brand}>
            <Image
              src="/images/logo.webp"
              alt="Logo"
              width={120}
              height={36}
              priority
            />
          </BsNavbar.Brand>

          {/* Language Selector - Always Visible on Mobile */}
          <div className={`${styles.mobileLanguageSelector} d-lg-none`}>
            <ButtonGroup size="sm">
              <Button
                variant="outline-light"
                onClick={() => handleLanguageChange("es")}
                disabled={locale === "es"}
                className={`${styles.langBtn} ${
                  locale === "es" ? styles.activeLang : ""
                }`}
              >
                ES
              </Button>
              <Button
                variant="outline-light"
                onClick={() => handleLanguageChange("en")}
                disabled={locale === "en"}
                className={`${styles.langBtn} ${
                  locale === "en" ? styles.activeLang : ""
                }`}
              >
                EN
              </Button>
              <Button
                variant="outline-light"
                onClick={() => handleLanguageChange("nl")}
                disabled={locale === "nl"}
                className={`${styles.langBtn} ${
                  locale === "nl" ? styles.activeLang : ""
                }`}
              >
                NL
              </Button>
            </ButtonGroup>
          </div>

          <BsNavbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.navbarToggler}
          />
          <BsNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#home"
                className={`${styles.navbarLink} ${
                  activeLink === "home" ? styles.active : ""
                }`}
                onClick={handleAnchorClick("home")}
              >
                {t("home")}
              </Nav.Link>
              <Nav.Link
                href="#services"
                className={`${styles.navbarLink} ${
                  activeLink === "services" ? styles.active : ""
                }`}
                onClick={handleAnchorClick("services")}
              >
                {t("services")}
              </Nav.Link>
              <Nav.Link
                href="#contact"
                className={`${styles.navbarLink} ${
                  activeLink === "contact" ? styles.active : ""
                }`}
                onClick={handleAnchorClick("contact")}
              >
                {t("contact")}
              </Nav.Link>
              <div className={`${styles.socialIcon} d-none d-lg-flex`}>
                <a
                  href="https://www.facebook.com/people/SK-Global-Services/61573197338873/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <Image
                    src="/icons/facebook_icon.webp"
                    alt="Facebook"
                    width={20}
                    height={20}
                  />
                </a>
                <a
                  href="https://www.instagram.com/skglobalservices_21?igsh=MXVndHd3czJzOHJoeQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <Image
                    src="/icons/instagram_icon.webp"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                </a>
              </div>
            </Nav>

            {/* Social Icons - Always visible on mobile/tablet */}
            <div className={`${styles.socialIcon} d-lg-none`}>
              <a
                href="https://www.facebook.com/people/SK-Global-Services/61573197338873/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <Image
                  src="/icons/facebook_icon.webp"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </a>
              <a
                href="https://www.instagram.com/skglobalservices_21?igsh=MXVndHd3czJzOHJoeQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <Image
                  src="/icons/instagram_icon.webp"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
            </div>

            {/* Language Selector - Desktop Only */}
            <div className={`${styles.languageSelector} ms-2 me-4 d-none d-lg-flex`}>
              <ButtonGroup size="sm">
                <Button
                  variant="outline-light"
                  onClick={() => handleLanguageChange("es")}
                  disabled={locale === "es"}
                  className={`${styles.langBtn} ${
                    locale === "es" ? styles.activeLang : ""
                  }`}
                >
                  ES
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => handleLanguageChange("en")}
                  disabled={locale === "en"}
                  className={`${styles.langBtn} ${
                    locale === "en" ? styles.activeLang : ""
                  }`}
                >
                  EN
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => handleLanguageChange("nl")}
                  disabled={locale === "nl"}
                  className={`${styles.langBtn} ${
                    locale === "nl" ? styles.activeLang : ""
                  }`}
                >
                  NL
                </Button>
              </ButtonGroup>
            </div>

            {/* Desktop Social Icons and Contact Info */}
            <div
              className={`${styles.desktopOnly} d-none d-lg-flex align-items-center`}
            >
              <div className={styles.contactInfo}>
                <div
                  className={styles.copyableText}
                  onClick={() =>
                    copyToClipboard("skglobalservices2024@gmail.com", "email")
                  }
                >
                  skglobalservices2024@gmail.com
                  <span className={styles.tooltip}>
                    {copySuccess.email ? t("copy_success") : t("copy_prompt")}
                  </span>
                </div>
                <div
                  className={styles.copyableText}
                  onClick={() => copyToClipboard("+297 741 5171", "phone")}
                >
                  +297 741 5171
                  <span className={styles.tooltip}>
                    {copySuccess.phone ? t("copy_success") : t("copy_prompt")}
                  </span>
                </div>
              </div>
            </div>

            {/* Language Selector - Always Visible */}

            {/* Mobile Contact Info Only */}
            <div className={`${styles.mobileOnly} d-lg-none mt-3`}>
              <div className={styles.mobileContactInfo}>
                <div
                  className={styles.mobileContact}
                  onClick={() =>
                    copyToClipboard("skglobalservices2024@gmail.com", "email")
                  }
                >
                  📧 skglobalservices2024@gmail.com
                </div>
                <div
                  className={styles.mobileContact}
                  onClick={() => copyToClipboard("+297 741 5171", "phone")}
                >
                  📞 +297 741 5171
                </div>
              </div>
            </div>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>
    </section>
  );
}
