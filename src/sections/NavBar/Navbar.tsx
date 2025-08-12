"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
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
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value: "home" | "services" | "contact") =>
    setActiveLink(value);

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

  const changeLanguage = (lng: "es" | "en" | "nl") => {
    if (!pathname) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    // Cambia el locale manteniendo la ruta actual y ancla, sin hacer scroll al top
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: lng, scroll: false });
    });
  };

  const handleAnchorClick = (id: "home" | "services" | "contact") => (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    const isHomePath = pathname === `/${locale}`;

    if (isHomePath && el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      onUpdateActiveLink(id);
      return;
    }

  // If not on home (e.g., service detail), go to the homepage with the anchor
  router.push(`/#${id}`, { scroll: true });
  };

  return (
    <section className="home">
      <BsNavbar
        expand="lg"
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      >
        <Container>
          <BsNavbar.Brand
            as={Link}
            href="/"
            locale={locale}
            className={styles.brand}
          >
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={120}
              height={36}
              priority
            />
          </BsNavbar.Brand>

          <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BsNavbar.Collapse id="basic-navbar-nav">
            <Nav>
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
            </Nav>

            <span className={styles.msRight}>
              <div className={styles.socialIcon}>
                <a
                  href="https://www.facebook.com/people/SK-Global-Services/61573197338873/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/img/facebook_icon.png"
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
                    src="/img/instagram_icon.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </span>

            <span className="ms-auto">
              <div className={styles.contactInfo}>
                <p
                  className={styles.copyableText}
                  onClick={() =>
                    copyToClipboard("skglobalservices2024@gmail.com", "email")
                  }
                >
                  skglobalservices2024@gmail.com
                  <span className={styles.tooltip}>
                    {copySuccess.email ? t("copy_success") : t("copy_prompt")}
                  </span>
                </p>
                <p
                  className={styles.copyableText}
                  onClick={() => copyToClipboard("+297 741 5171", "phone")}
                >
                  +297 741 5171
                  <span className={styles.tooltip}>
                    {copySuccess.phone ? t("copy_success") : t("copy_prompt")}
                  </span>
                </p>
              </div>

              <ButtonGroup className="ms-3" aria-busy={isPending}>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => changeLanguage("es")}
                  onMouseEnter={() =>
                    startTransition(() =>
                      router.prefetch(pathname, { locale: "es" })
                    )
                  }
                  disabled={isPending && locale === "es"}
                >
                  ES
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => changeLanguage("en")}
                  onMouseEnter={() =>
                    startTransition(() =>
                      router.prefetch(pathname, { locale: "en" })
                    )
                  }
                  disabled={isPending && locale === "en"}
                >
                  EN
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => changeLanguage("nl")}
                  onMouseEnter={() =>
                    startTransition(() =>
                      router.prefetch(pathname, { locale: "nl" })
                    )
                  }
                  disabled={isPending && locale === "nl"}
                >
                  NL
                </Button>
              </ButtonGroup>
            </span>
          </BsNavbar.Collapse>
          {/* Prefetch alternate locale routes for smoother instant switches */}
          <span style={{ display: "none" }} aria-hidden>
            <Link href={pathname || "/"} prefetch locale="es">
              es
            </Link>
            <Link href={pathname || "/"} prefetch locale="en">
              en
            </Link>
            <Link href={pathname || "/"} prefetch locale="nl">
              nl
            </Link>
          </span>
        </Container>
      </BsNavbar>
    </section>
  );
}
