import React from "react";
import WhatsApp from "../assets/img/WhatsApp_icon.png";

function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=2977468097"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={WhatsApp}/>
    </a>
  );
}

export default WhatsAppButton;
