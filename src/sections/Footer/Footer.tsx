"use client";

import { Container, Row, Col } from "react-bootstrap";
import { useTranslations } from "@/i18n/LanguageContext";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const router = useRouter();

  const handleAnchorClick =
    (id: "home" | "services" | "contact") =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      const isHomePath = pathname === "/";

      if (isHomePath && el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        return;
      }

      // Si no estás en home, navega al home y luego al hash
      router.push("/");
      // El hash se manejará cuando la página se cargue
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${id}`);
        }
      }, 100);
    };

  return (
    <footer className={styles.footer} id="footer">
      <Container>
        {/* Main Footer Content */}
        <Row className="g-4">
          {/* Logo Section */}
          <Col xs={12} md={6} lg={4} className="text-center text-md-start">
            <div className={styles.logoContainer}>
              <Image
                src="/images/logo.webp"
                alt="S&K Global Services Logo"
                className={styles.footerLogo}
                width={140}
                height={42}
                priority={false}
              />
              <p className={styles.logoTagline}>
                {t("services")} profesionales de calidad
              </p>
            </div>
          </Col>

          {/* Navigation & Contact Section */}
          <Col xs={12} md={6} lg={4} className="text-center">
            <div className={styles.navigationSection}>
              <h5 className={styles.sectionTitle}>Navegación</h5>
              <nav className={styles.footerNav}>
                <a
                  href="#home"
                  onClick={handleAnchorClick("home")}
                  className={styles.footerLink}
                >
                  {t("home")}
                </a>
                <a
                  href="#services"
                  onClick={handleAnchorClick("services")}
                  className={styles.footerLink}
                >
                  {t("services")}
                </a>
                <a
                  href="#contact"
                  onClick={handleAnchorClick("contact")}
                  className={styles.footerLink}
                >
                  {t("contact")}
                </a>
              </nav>
            </div>
          </Col>

          {/* Contact & Social Section */}
          <Col xs={12} lg={4} className="text-center text-lg-end">
            <div className={styles.contactSection}>
              <h5 className={styles.sectionTitle}>Contacto</h5>
              <div className={styles.contactInfo}>
                <a
                  href="mailto:skglobalservices2024@gmail.com"
                  className={styles.contactLink}
                >
                  skglobalservices2024@gmail.com
                </a>
                <a href="tel:+2977415171" className={styles.contactLink}>
                  +297 741 5171
                </a>
              </div>
              <div className={styles.socialSection}>
                <div className={styles.socialIcons}>
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
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Footer */}
        <div className={styles.bottomFooter}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} S&K Global Services. Todos los
              derechos reservados.
            </p>
            <span className={styles.madeWith}>Hecho con ❤️ en Colombia</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
