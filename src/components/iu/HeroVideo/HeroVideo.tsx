"use client";

import { useTranslations } from "@/i18n/LanguageContext";
import styles from "./HeroVideo.module.css";

type Props = {
  children?: React.ReactNode;
};

export default function HeroVideo({ children }: Props) {
  const t = useTranslations("navbar");

  return (
    <section id="home" className={styles.hero}>
      <video
        className={styles.videoBackground}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/app_mobile.webp"
      >
        <source src="/videos/banner-videoR.mp4" type="video/mp4" />
        {t("video_fallback")}
      </video>
      {children}
    </section>
  );
}
