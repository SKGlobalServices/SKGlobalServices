"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { useTranslations } from "next-intl";
import styles from "./ScrollDownPrompt.module.css";

export default function ScrollDownPrompt() {
  const t = useTranslations("hero");

  return (
    <div className={styles.scrollDownPrompt}>
      <Image
        className={styles.promptLogo}
  src="/img/logo.png"
        alt="Logo"
        width={200}
        height={60}
        priority
      />
      <h1>{t("title", { defaultValue: "S&K Global Services" })}</h1>

      <TypeAnimation
        className={styles.reactTypeAnimation}
        sequence={[
          t("typed1", { defaultValue: "Web development" }), 1500,
          t("typed2", { defaultValue: "Billing" }), 1500,
          t("typed3", { defaultValue: "Digital advertising" }), 1500
        ]}
        wrapper="span"
        cursor
        repeat={Infinity}
      />

      <div className={styles.mouseScrollIcon}>
        <div className={styles.mouseWheel}></div>
      </div>
      <p>{t("scroll_hint", { defaultValue: "Scroll down" })}</p>
    </div>
  );
}
