"use client";

import OptimizedServiceLink from "@/components/iu/OptimizedServiceLink";
import Card from "react-bootstrap/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslations } from "@/i18n/LanguageContext";
import styles from "./ServicePage.module.css";
import type { UIService } from "@/types";

const responsiveCarousel = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 20,
  },
};

type Props = {
  services: UIService[];
  activeId?: string;
};

export default function ServiceCarousel({ services, activeId }: Props) {
  const t = useTranslations("services_section");

  return (
    <Carousel
      responsive={responsiveCarousel}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={6000}
      pauseOnHover={true}
      showDots={false}
      arrows={true}
      swipeable={true}
      draggable={true}
      removeArrowOnDeviceType={[]}
      partialVisible={false}
      centerMode={false}
      keyBoardControl={true}
      customTransition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      transitionDuration={600}
      className={`${styles.serviceCarousel} ${styles.serviceCarouselLarge} p-4`}
      containerClass="carousel-container"
      itemClass="carousel-item-padding"
    >
      {services.map((s) => (
        <div key={s.id} className={styles.carouselItemWrapper}>
          <OptimizedServiceLink
            serviceId={s.id}
            className="text-decoration-none"
          >
            <Card
              className={`${styles.serviceCarouselCard} ${
                s.carouselImg ? styles.serviceCarouselCardWithBackground : ""
              } ${
                String(s.id) === String(activeId ?? "")
                  ? styles.serviceCarouselCardActive
                  : ""
              }`}
              style={{
                backgroundImage: s.carouselImg
                  ? `url(${s.carouselImg})`
                  : undefined,
                minHeight: "200px",
                maxHeight: "300px",
                boxShadow: "0 8px 32px rgba(74,47,189,0.18)",
              }}
            >
              <div
                className={`${styles.serviceCarouselOverlay} ${
                  s.carouselImg
                    ? styles.serviceCarouselOverlayWithBackground
                    : ""
                }`}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center h-100 p-4 position-relative">
                  {/* Imagen eliminada, solo título y botón */}
                  <div className="text-center mt-3">
                    <Card.Title
                      className={`${styles.serviceCarouselTitle} mb-2`}
                      style={{ fontSize: "1.35rem", fontWeight: 800 }}
                    >
                      {s.front_title}
                    </Card.Title>
                    <div
                      className={styles.serviceCarouselLearnMore}
                      style={{ fontSize: "1rem", marginTop: "0.5rem" }}
                    >
                      <span>{t("learn_more")}</span>
                      <span className={styles.serviceCarouselArrow}>→</span>
                    </div>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </OptimizedServiceLink>
        </div>
      ))}
    </Carousel>
  );
}
