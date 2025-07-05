import React from "react";
import WhatsApp from "../assets/img/WhatsApp_icon.png";

function WhatsAppButton() {
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
      <span className="whatsapp-tooltip">¿Necesitas ayuda?</span>
    </div>
  );
}

export default WhatsAppButton;
