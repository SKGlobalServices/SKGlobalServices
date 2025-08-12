"use client";

import { useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Image from "next/image";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import styles from "./Contact.module.css";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const t = useTranslations("contact");
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Derived validity for UX (disables submit until valid, mirrors legacy behavior)
  const emailRegex = /\S+@\S+\.\S+/;
  const isFormValid =
    [
      formData.firstName,
      formData.lastName,
      formData.phone,
      formData.message,
    ].every((v) => v.trim() !== "") && emailRegex.test(formData.email);

  const validateForm = (): boolean => {
    const { firstName, lastName, email, phone, message } = formData;

    if (!firstName.trim()) {
      Swal.fire("Error", t("form.validation.first_name_required"), "error");
      return false;
    }
    if (!lastName.trim()) {
      Swal.fire("Error", t("form.validation.last_name_required"), "error");
      return false;
    }
    if (!email.trim()) {
      Swal.fire("Error", t("form.validation.email_required"), "error");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Swal.fire("Error", t("form.validation.email_invalid"), "error");
      return false;
    }
    if (!phone.trim()) {
      Swal.fire("Error", t("form.validation.phone_required"), "error");
      return false;
    }
    if (!message.trim()) {
      Swal.fire("Error", t("form.validation.message_required"), "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (form.current) {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        Swal.fire({
          title: t("form.success_title"),
          text: t("form.success_text"),
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      Swal.fire({
        title: t("form.error_title"),
        text: t("form.error_text"),
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <Container>
        <Row>
          <Col xs={12}>
            <div className={styles.contactBx}>
              <Row>
                <Col lg={6}>
                  <Image
                    className={styles.contactImage}
                    src="/img/contact-img.svg"
                    alt="Contact Us"
                    width={640}
                    height={640}
                    priority={false}
                  />
                </Col>
                <Col lg={6}>
                  <div className={styles.contactForm}>
                    <h2>{t("title")}</h2>
                    <p>{t("subtitle")}</p>
                    <Form ref={form} onSubmit={handleSubmit} noValidate>
                      <Row>
                        <Col sm={6} className="px-1">
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            placeholder={t("form.first_name")}
                            onChange={handleInputChange}
                            autoComplete="given-name"
                            autoCapitalize="words"
                            required
                          />
                        </Col>
                        <Col sm={6} className="px-1">
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            placeholder={t("form.last_name")}
                            onChange={handleInputChange}
                            autoComplete="family-name"
                            autoCapitalize="words"
                            required
                          />
                        </Col>
                        <Col sm={6} className="px-1">
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder={t("form.email")}
                            onChange={handleInputChange}
                            autoComplete="email"
                            required
                          />
                        </Col>
                        <Col sm={6} className="px-1">
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            placeholder={t("form.phone")}
                            onChange={handleInputChange}
                            autoComplete="tel"
                            inputMode="tel"
                            pattern="[0-9+\-\s()]{7,}"
                            required
                          />
                        </Col>
                        <Col xs={12} className="px-1">
                          <Form.Control
                            as="textarea"
                            rows={6}
                            name="message"
                            value={formData.message}
                            placeholder={t("form.message")}
                            onChange={handleInputChange}
                            required
                          />
                          {/* Hidden fields to remain compatible with legacy EmailJS template variables */}
                          <input
                            type="hidden"
                            name="nombre"
                            value={formData.firstName}
                          />
                          <input
                            type="hidden"
                            name="apellido"
                            value={formData.lastName}
                          />
                          <input
                            type="hidden"
                            name="correo"
                            value={formData.email}
                          />
                          <input
                            type="hidden"
                            name="telefono"
                            value={formData.phone}
                          />
                          <input
                            type="hidden"
                            name="mensaje"
                            value={formData.message}
                          />
                          <Button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className={styles.submitBtn}
                          >
                            {isLoading && (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className={styles.spinner}
                              />
                            )}
                            <span>
                              {isLoading
                                ? t("form.sending")
                                : t("form.send_button")}
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
