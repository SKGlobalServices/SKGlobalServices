import React, { useState } from "react";
import db from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { Container, Row, Col } from "react-bootstrap";
import contacting from "../assets/img/contact-img.svg";
import Swal from "sweetalert2";

export const Contact = () => {
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
        title: "¡Mensaje enviado!",
        text: "Mensaje enviado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
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
        title: "Error",
        text: `Hubo un error al enviar mensaje: ${error.message}`,
        icon: "error",
        confirmButtonText: "Cerrar",
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
            <h2>Contáctanos</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Col>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </Col>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </Col>
                <Col xs={12} sm={6} className="px-1">
                  <input
                    type="number"
                    placeholder="Teléfono celular"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </Col>
                <Col xs={12} className="px-1">
                  <input
                    type="text"
                    placeholder="Mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
                  <button type="submit" disabled={!isFormValid}>
                    <span>Enviar</span>
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
