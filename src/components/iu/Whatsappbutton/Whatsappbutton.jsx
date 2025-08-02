import React from "react";
import WhatsApp from "../../../assets/img/WhatsApp_icon.png";
import "./Whatsappbutton.css";
import { useTranslation } from "react-i18next";

export const Whatsappbutton = () => {
  const {t}  = useTranslation();
  return (
    <div className="whatsapp-float">
      <a
        href="https://api.whatsapp.com/send?phone=2977468097"
        className="whatsapp-icon-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={WhatsApp} alt="WhatsApp" />
      </a>
      <span className="whatsapp-tooltip">{t("whatsapp.tooltip")}</span>
    </div>
  );
}