"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { useTranslations, useLocale } from "@/i18n/LanguageContext";
import styles from "./ScrollDownPrompt.module.css";

export default function ScrollDownPrompt() {
  const t = useTranslations("hero");
  const currentLocale = useLocale();

  return (
    <div className={styles.scrollDownPrompt}>
      <Image
        className={styles.promptLogo}
        src="/images/logo.webp"
        alt="Logo"
        width={200}
        height={60}
        priority
      />
      <h1>{t("title")}</h1>

      <TypeAnimation
        key={currentLocale}
        className={styles.reactTypeAnimation}
        sequence={[t("typed1"), 1500, t("typed2"), 1500, t("typed3"), 1500]}
        wrapper="span"
        cursor
        repeat={Infinity}
      />

      <div className={styles.mouseScrollIcon}>
        <div className={styles.mouseWheel}></div>
      </div>
      <p>{t("scroll_hint")}</p>
    </div>
  );
}
