"use client";

import { useTranslations } from "next-intl";
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
  poster="/img/app_mobile.png"
      >
  <source src="/img/banner-videoR.mp4" type="video/mp4" />
        {t("video_fallback", { defaultValue: "Your browser does not support video." })}
      </video>
      {children}
    </section>
  );
}
