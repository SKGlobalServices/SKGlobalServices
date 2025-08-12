"use client";

import { Container, Row, Col } from "react-bootstrap";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleAnchorClick =
    (id: "home" | "services" | "contact") =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      const isHomePath = pathname === `/${locale}`;
      if (isHomePath && el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        return;
      }
      router.push(`/#${id}`, { scroll: true });
    };

  return (
    <footer className={styles.footer} id="footer">
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={4}
            className="text-center text-md-start mb-4 mb-md-0"
          >
            <Image
              src="/img/logo.webp"
              alt="Logo"
              className={styles.footerLogo}
              width={150}
              height={45}
            />
          </Col>

          <Col
            xs={12}
            md={4}
            className={`${styles.footerLinks} text-center mb-4 mb-md-0`}
          >
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
          </Col>

          <Col xs={12} md={4} className="text-center text-md-end">
            <div className={styles.socialIcon}>
              <a
                href="https://www.facebook.com/people/SK-Global-Services/61573197338873/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/img/facebook_icon.webp"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.instagram.com/skglobalservices_21?igsh=MXVndHd3czJzOHJoeQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/img/instagram_icon.webp"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <p className={styles.copy}>
              © {new Date().getFullYear()} S&K Global Services. Todos los
              derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
