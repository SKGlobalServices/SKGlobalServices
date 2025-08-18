"use client";

import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import Image from "next/image";
import { useTranslations } from "@/i18n/LanguageContext";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import styles from "./Contact.module.css";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  honeypot?: string; // Anti-spam field
};

type SecurityState = {
  attempts: number;
  lastAttempt: number;
  isBlocked: boolean;
  blockUntil: number;
};

export default function Contact() {
  const t = useTranslations("contact");
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [securityState, setSecurityState] = useState<SecurityState>({
    attempts: 0,
    lastAttempt: 0,
    isBlocked: false,
    blockUntil: 0,
  });

  // Valores iniciales del formulario
  const initialValues: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  };

  // Schema de validación con Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, t("form.validation.first_name_too_short"))
      .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, t("form.validation.first_name_invalid"))
      .required(t("form.validation.first_name_required")),
    lastName: Yup.string()
      .min(2, t("form.validation.last_name_too_short"))
      .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, t("form.validation.last_name_invalid"))
      .required(t("form.validation.last_name_required")),
    email: Yup.string()
      .email(t("form.validation.email_invalid"))
      .required(t("form.validation.email_required")),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]{7,}$/, t("form.validation.phone_invalid"))
      .optional(),
    message: Yup.string()
      .min(10, t("form.validation.message_too_short"))
      .max(1000, t("form.validation.message_too_long"))
      .required(t("form.validation.message_required")),
    honeypot: Yup.string().max(0), // Debe estar vacío
  });

  // Reset alerts after 5 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  // Check if user is blocked
  useEffect(() => {
    const checkBlock = () => {
      const now = Date.now();
      if (securityState.isBlocked && now > securityState.blockUntil) {
        setSecurityState(prev => ({ ...prev, isBlocked: false, attempts: 0 }));
      }
    };
    const interval = setInterval(checkBlock, 1000);
    return () => clearInterval(interval);
  }, [securityState.isBlocked, securityState.blockUntil]);

  // Función de envío del formulario con Formik
  const handleSubmit = async (values: FormData, { resetForm }: { resetForm: () => void }) => {
    // Clear alerts
    setShowError(false);
    setShowSuccess(false);

    // Check if user is blocked
    const now = Date.now();
    if (securityState.isBlocked) {
      const remainingTime = Math.ceil((securityState.blockUntil - now) / 1000);
      setErrorMessage(t("form.security.please_wait").replace("{seconds}", remainingTime.toString()));
      setShowError(true);
      return;
    }

    // Rate limiting check
    if (securityState.attempts >= 3 && now - securityState.lastAttempt < 60000) {
      const blockUntil = now + 300000; // 5 minutes
      setSecurityState(prev => ({
        ...prev,
        isBlocked: true,
        blockUntil,
      }));
      setErrorMessage(t("form.security.too_many_attempts"));
      setShowError(true);
      return;
    }

    // Security check - honeypot should be empty
    if (values.honeypot && values.honeypot.trim() !== "") {
      setErrorMessage(t("form.security.bot_detected"));
      setShowError(true);
      return;
    }

    setIsLoading(true);

    try {
      if (form.current) {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        // Success feedback
        setShowSuccess(true);
        setSecurityState(prev => ({ ...prev, attempts: 0 })); // Reset attempts on success
        
        // Reset form
        resetForm();
        
        // Optional: Still show SweetAlert for important success messages
        setTimeout(() => {
          Swal.fire({
            title: t("form.success_title"),
            text: t("form.success_text"),
            icon: "success",
            confirmButtonText: "OK",
            timer: 3000,
            timerProgressBar: true,
          });
        }, 500);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      
      // Update security state
      setSecurityState(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        lastAttempt: now,
      }));
      
      setErrorMessage(t("form.security.send_error"));
      setShowError(true);
      
      // Also show SweetAlert for errors
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

  // TODO: cambiar imagen
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
                    src="/icons/contact-img.svg"
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
                    
                    {/* Success Alert */}
                    {showSuccess && (
                      <Alert variant="success" className="mb-3" dismissible onClose={() => setShowSuccess(false)}>
                        <Alert.Heading>{t("form.success_title")}</Alert.Heading>
                        <p className="mb-0">{t("form.success_text")}</p>
                      </Alert>
                    )}
                    
                    {/* Error Alert */}
                    {showError && (
                      <Alert variant="danger" className="mb-3" dismissible onClose={() => setShowError(false)}>
                        <Alert.Heading>{t("form.error_title")}</Alert.Heading>
                        {errorMessage && <p className="mb-0">{errorMessage}</p>}
                      </Alert>
                    )}
                    
                    {/* Security Block Alert */}
                    {securityState.isBlocked && (
                      <Alert variant="warning" className="mb-3">
                        <Alert.Heading>{t("form.security.temporarily_blocked")}</Alert.Heading>
                        <p className="mb-0">{t("form.security.too_many_attempts")}</p>
                      </Alert>
                    )}
                    
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                      validateOnChange={true}
                      validateOnBlur={true}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit: formikSubmit,
                        isValid,
                        dirty
                      }: FormikProps<FormData>) => (
                        <Form ref={form} onSubmit={formikSubmit} noValidate>
                          <Row>
                            <Col sm={6} className="px-2">
                              <Form.Control
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                placeholder={t("form.first_name")}
                                onChange={(e) => {
                                  handleChange(e);
                                  if (showSuccess) setShowSuccess(false);
                                  if (showError) setShowError(false);
                                }}
                                onBlur={handleBlur}
                                autoComplete="given-name"
                                autoCapitalize="words"
                                required
                                isInvalid={!!(errors.firstName && touched.firstName)}
                                className="rounded-3"
                              />
                              {errors.firstName && touched.firstName && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.firstName}
                                </Form.Control.Feedback>
                              )}
                            </Col>
                            <Col sm={6} className="px-2">
                              <Form.Control
                                type="text"
                                name="lastName"
                                value={values.lastName}
                                placeholder={t("form.last_name")}
                                onChange={(e) => {
                                  handleChange(e);
                                  if (showSuccess) setShowSuccess(false);
                                  if (showError) setShowError(false);
                                }}
                                onBlur={handleBlur}
                                autoComplete="family-name"
                                autoCapitalize="words"
                                required
                                isInvalid={!!(errors.lastName && touched.lastName)}
                                className="rounded-3"
                              />
                              {errors.lastName && touched.lastName && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.lastName}
                                </Form.Control.Feedback>
                              )}
                            </Col>
                            <Col sm={6} className="px-2">
                              <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                placeholder={t("form.email")}
                                onChange={(e) => {
                                  handleChange(e);
                                  if (showSuccess) setShowSuccess(false);
                                  if (showError) setShowError(false);
                                }}
                                onBlur={handleBlur}
                                autoComplete="email"
                                required
                                isInvalid={!!(errors.email && touched.email)}
                                className="rounded-3"
                              />
                              {errors.email && touched.email && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.email}
                                </Form.Control.Feedback>
                              )}
                            </Col>
                            <Col sm={6} className="px-2">
                              <Form.Control
                                type="tel"
                                name="phone"
                                value={values.phone}
                                placeholder={`${t("form.phone")} (${t("form.optional")})`}
                                onChange={(e) => {
                                  handleChange(e);
                                  if (showSuccess) setShowSuccess(false);
                                  if (showError) setShowError(false);
                                }}
                                onBlur={handleBlur}
                                autoComplete="tel"
                                inputMode="tel"
                                isInvalid={!!(errors.phone && touched.phone)}
                                className="rounded-3"
                              />
                              {errors.phone && touched.phone && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.phone}
                                </Form.Control.Feedback>
                              )}
                            </Col>
                            <Col xs={12} className="px-2">
                              <Form.Control
                                as="textarea"
                                rows={6}
                                name="message"
                                value={values.message}
                                placeholder={t("form.message")}
                                onChange={(e) => {
                                  handleChange(e);
                                  if (showSuccess) setShowSuccess(false);
                                  if (showError) setShowError(false);
                                }}
                                onBlur={handleBlur}
                                required
                                isInvalid={!!(errors.message && touched.message)}
                                className="rounded-3"
                              />
                              {errors.message && touched.message && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.message}
                                </Form.Control.Feedback>
                              )}
                              <div className="text-muted small mt-1">
                                {values.message.length}/1000 characters
                              </div>
                            </Col>
                            
                            {/* Honeypot field - hidden from users */}
                            <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
                              <Form.Control
                                type="text"
                                name="honeypot"
                                value={values.honeypot}
                                onChange={handleChange}
                                tabIndex={-1}
                                autoComplete="off"
                              />
                            </div>
                            
                            {/* Hidden fields for EmailJS */}
                            <input
                              type="hidden"
                              name="nombre"
                              value={values.firstName}
                            />
                            <input
                              type="hidden"
                              name="apellido"
                              value={values.lastName}
                            />
                            <input
                              type="hidden"
                              name="correo"
                              value={values.email}
                            />
                            <input
                              type="hidden"
                              name="telefono"
                              value={values.phone}
                            />
                            <input
                              type="hidden"
                              name="mensaje"
                              value={values.message}
                            />
                            <Col xs={12} className="text-center mt-4">
                              <Button
                                variant="primary"
                                size="lg"
                                type="submit"
                                disabled={!isValid || !dirty || isLoading || securityState.isBlocked}
                                className="px-5 py-3"
                              >
                                {isLoading && (
                                  <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                  />
                                )}
                                <span>
                                  {securityState.isBlocked
                                    ? t("form.security.temporarily_blocked")
                                    : isLoading
                                    ? t("form.sending")
                                    : t("form.send_button")}
                                </span>
                              </Button>
                              
                              {/* Security info */}
                              {securityState.attempts > 0 && !securityState.isBlocked && (
                                <div className="text-warning small mt-2">
                                  {t("form.security.too_many_attempts")} ({securityState.attempts}/3)
                                </div>
                              )}
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
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
