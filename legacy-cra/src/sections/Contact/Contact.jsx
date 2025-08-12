import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Container, Row, Col } from "react-bootstrap";
import contacting from "../../assets/img/contact-img.svg";
import Swal from "sweetalert2";
import "./Contact.css";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();
  const form = useRef();
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reemplaza con tus IDs de EmailJS
    const serviceID = "service_ll64ljl";
    const templateID = "template_4spl9d9";
    const publicKey = "QZUKsTwDBtQ9zwfIF";

    emailjs
      .sendForm(serviceID, templateID, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          // Muestra alerta de éxito con SweetAlert2
          Swal.fire({
            title: t("contact_section.alert_success_title"),
            text: t("contact_section.alert_success_text"),
            icon: "success",
            confirmButtonText: t("contact_section.alert_success_button"),
          });

          // Restablece los campos del formulario
          setNombre("");
          setApellido("");
          setCorreo("");
          setTelefono("");
          setMensaje("");
        },
        (error) => {
          // Muestra alerta de error con SweetAlert2
          Swal.fire({
            title: t("contact_section.alert_error_title"),
            text: `${t("contact_section.alert_error_text")}: ${error.text}`,
            icon: "error",
            confirmButtonText: t("contact_section.alert_error_button"),
          });
        }
      );
  };

  // Verifica si todos los campos están llenos (después de quitar espacios en blanco)
  const isFormValid = [nombre, apellido, correo, telefono, mensaje].every(
    (field) => field.trim() !== ""
  );

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img src={contacting} alt="Contacto" />
          </Col>
          <Col md={6}>
            <h2>{t("contact_section.title")}</h2>
            <form ref={form} onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="text"
                    placeholder={t("contact_section.form.first_name")}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    name="nombre"
                  />
                </Col>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="text"
                    placeholder={t("contact_section.form.last_name")}
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    name="apellido"
                  />
                </Col>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="email"
                    placeholder={t("contact_section.form.email")}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    name="correo"
                  />
                </Col>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="tel"
                    placeholder={t("contact_section.form.phone")}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    name="telefono"
                  />
                </Col>
                <Col xs={12} className="px-1">
                  <textarea
                    rows="6"
                    placeholder={t("contact_section.form.message")}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    name="mensaje"
                  ></textarea>
                  <button type="submit" disabled={!isFormValid}>
                    <span>{t("contact_section.form.submit")}</span>
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
