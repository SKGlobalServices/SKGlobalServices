import React from "react";
import { useTranslation } from "react-i18next";
import { Row } from "react-bootstrap";
import { ServiceCard } from "./ServiceCard";
import { servicesData as serviceImageData } from "../../data/services";

const icons = [
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 20v-6m0 0V4m0 6h4m-4 0H6" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04A12.02 12.02 0 0021 12.045c0-2.42-.7-4.66-1.882-6.521z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
  `<svg class="h-8 w-8 text-[var(--primary-color)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
];

export const ServicesList = () => {
  const { t } = useTranslation();
  const translatedServices = t("services_data", { returnObjects: true });

  const services = serviceImageData.map((service, index) => ({
    ...service,
    ...translatedServices[index],
    icon: icons[index % icons.length],
  }));

  return (
    <Row className="g-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          icon={service.icon}
          title={service.front_title}
          description={service.front_text}
        />
      ))}
    </Row>
  );
};
