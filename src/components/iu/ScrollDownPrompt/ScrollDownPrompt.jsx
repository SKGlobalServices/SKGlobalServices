import React from "react";
import { TypeAnimation } from "react-type-animation";
import logo from "../../../assets/img/logo.png";
import "./ScrollDownPrompt.css"; // Importa los estilos locales

export const ScrollDownPrompt = () => {
  return (
    <div className="scroll-down-prompt">
      <img src={logo} alt="SK Global Services Logo" className="prompt-logo" />
      <TypeAnimation
        sequence={[
          "Innovación y Tecnología a tu Alcance",
          2000,
          "Soluciones Digitales para tu Negocio",
          2000,
          "Creamos el Futuro, Hoy",
          2000,
        ]}
        wrapper="h1"
        speed={50}
        repeat={Infinity}
      />
      <div className="mouse-scroll-icon">
        <div className="mouse-wheel"></div>
      </div>
      <p>Desliza para descubrir</p>
    </div>
  );
};