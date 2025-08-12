import React from "react";
import { Card, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./ServiceCard.css";

export const ServiceCard = ({ id, icon, title, description }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/service/${id}`);
  };

  return (
    <Col xs={12} sm={6} md={4} className="d-flex">
      <Card
        className="service-card w-100 h-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        onClick={handleCardClick}
      >
        <Card.Body className="d-flex flex-column text-center">
          <div className="d-flex flex-column align-items-center">
            <div className="service-icon mb-3">
              <div dangerouslySetInnerHTML={{ __html: icon }} />
            </div>
            <Card.Title as="h3" className="mb-2 service-card-title">
              {title}
            </Card.Title>
          </div>
          <Card.Text className="text-sm service-card-text">
            {description}
          </Card.Text>
          <div className="learn-more mt-auto">
            <span>{t("services_section.learn_more")}</span>
            <span className="arrow">→</span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
