"use client";

import Image from "next/image";
import { useTranslations } from "@/i18n/LanguageContext";
import styles from "./Whatsappbutton.module.css";

const PHONE = "2977415171";

export default function Whatsappbutton() {
  const t = useTranslations("whatsapp");
  return (
    <div className={styles.whatsappFloat}>
      <a
        href={`https://api.whatsapp.com/send?phone=${PHONE}`}
        className={styles.whatsappIconLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <Image
          src="/img/WhatsApp_icon.webp"
          alt="WhatsApp"
          width={40}
          height={40}
        />
      </a>
      <span className={styles.whatsappTooltip}>{t("tooltip")}</span>
    </div>
  );
}
