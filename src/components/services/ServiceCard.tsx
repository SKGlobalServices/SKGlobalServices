"use client";

import { Card, Col } from "react-bootstrap";
import { useTranslations } from "@/i18n/LanguageContext";
import styles from "./ServiceCard.module.css";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

type Props = {
  id: string | number;
  icon: string; // SVG string
  title: string;
  description: string;
  image?: string; // optional image path from public (e.g., /img/xxx.png)
};

export default function ServiceCard({
  id,
  icon,
  title,
  description,
  image,
}: Props) {
  const t = useTranslations("services_section");

  return (
    <Col xs={12} sm={6} md={4} className="d-flex">
      <Link
        href={{
          pathname: "/service/[id]",
          params: { id: String(id) },
        }}
        className="w-100 text-decoration-none"
        aria-label={`${title} - ${t("learn_more")}`}
      >
        <Card className={`${styles.card} w-100 h-100`}>
          <Card.Body className="d-flex flex-column text-center">
            <div className="d-flex flex-column align-items-center">
              {icon ? (
                <div
                  className={`${styles.serviceIcon} mb-3`}
                  dangerouslySetInnerHTML={{ __html: icon }}
                  aria-hidden
                />
              ) : image ? (
                <div className={`${styles.serviceIcon} mb-3`}>
                  <Image src={image} alt={title} width={22} height={22} />
                </div>
              ) : null}
              <Card.Title as="h3" className={`mb-2 ${styles.serviceCardTitle}`}>
                {title}
              </Card.Title>
            </div>
            <Card.Text className={`text-sm ${styles.serviceCardText}`}>
              {description}
            </Card.Text>
            <div className={`${styles.learnMore} mt-auto`}>
              <span>{t("learn_more")}</span>
              <span className={styles.arrow}>→</span>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
