import React, { useState } from "react";
import db from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Container, Row, Col } from "react-bootstrap";
import contacting from "../../assets/img/contact-img.svg";
import Swal from "sweetalert2";
import "./Contact.css";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Añade el documento a Firestore
      await addDoc(collection(db, "usuarios"), {
        nombre,
        apellido,
        correo,
        telefono,
        mensaje,
      });

      // Muestra alerta de éxito con SweetAlert2
      Swal.fire({
        title: t("contact.success.title"),
        text: t("contact.success.text"),
        icon: "success",
        confirmButtonText: t("contact.success.confirmButtonText"),
      });

      // Restablece los campos del formulario
      setNombre("");
      setApellido("");
      setCorreo("");
      setTelefono("");
      setMensaje("");
    } catch (error) {
      // Muestra alerta de error con SweetAlert2
      Swal.fire({
        title: t("contact.error.title"),
        text: `${t("contact.error.text")}: ${error.message}`,
        icon: "error",
        confirmButtonText: t("contact.error.confirmButtonText"),
      });
    }
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
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="text"
                    placeholder={t("contact_section.form.first_name")}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Col>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="text"
                    placeholder={t("contact_section.form.last_name")}
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </Col>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="email"
                    placeholder={t("contact_section.form.email")}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </Col>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="number"
                    placeholder={t("contact_section.form.phone")}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </Col>
                <Col xs={12} className="px-1">
                  <input
                    type="text"
                    placeholder={t("contact_section.form.message")}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
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
