"use client";

import OptimizedServiceLink from "@/components/iu/OptimizedServiceLink";
import Card from "react-bootstrap/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./ServicePage.module.css";
import type { UIService } from "@/types";
import Image from "next/image";

const responsiveCarousel = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1, slidesToSlide: 1 },
};

type Props = {
  services: UIService[];
  activeId?: string;
};

export default function ServiceCarousel({ services, activeId }: Props) {
  return (
    <Carousel
      responsive={responsiveCarousel}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      pauseOnHover={true}
      showDots={false}
      arrows={true}
      swipeable={true}
      draggable={true}
      className={`${styles.serviceCarousel} pb-4 pt-4`}
      containerClass="carousel-container"
      itemClass="carousel-item-padding"
    >
      {services.map((s) => (
        <div key={s.id} className="px-2">
          <OptimizedServiceLink
            serviceId={s.id}
            className="text-decoration-none"
          >
            <Card
              className={`${styles.serviceCarouselCard} ${
                String(s.id) === String(activeId ?? "")
                  ? styles.serviceCarouselCardActive
                  : ""
              }`}
              style={{
                backgroundImage: s.carouselImg ? `url(${s.carouselImg})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className={styles.serviceCarouselOverlay}>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center gap-3 p-3 position-relative">
                  <Card.Title className={`${styles.serviceCarouselTitle} mb-0 text-center`}>
                    {s.front_title}
                  </Card.Title>
                </Card.Body>
              </div>
            </Card>
          </OptimizedServiceLink>
        </div>
      ))}
    </Carousel>
  );
}
