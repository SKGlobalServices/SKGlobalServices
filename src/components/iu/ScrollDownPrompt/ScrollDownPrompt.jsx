import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/img/logo.png";
import "./ScrollDownPrompt.css"; // Importa los estilos locales

export const ScrollDownPrompt = () => {
  const { t, i18n } = useTranslation(); 

  const sequences = t("prompt.sequences");

  return (
    <div className="scroll-down-prompt">
      <img src={logo} alt="SK Global Services Logo" className="prompt-logo" />
      <h1>SK Global Services</h1>
      <TypeAnimation
        key={i18n.language}
        sequence={sequences}
        wrapper="h2"
        speed={150}
        repeat={Infinity}
      />
      <div className="mouse-scroll-icon">
        <div className="mouse-wheel"></div>
      </div>
      <p>{t("prompt.scroll")}</p>
    </div>
  );
};