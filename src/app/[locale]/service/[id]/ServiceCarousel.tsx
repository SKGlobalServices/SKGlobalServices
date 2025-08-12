"use client";

import { Link } from "@/i18n/navigation";
import Card from "react-bootstrap/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./ServicePage.module.css";
import type { UIService } from "@/types";
import Image from "next/image";

const responsiveCarousel = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
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
      autoPlaySpeed={3000}
      className="pb-4 pt-4"
    >
      {services.map((s) => (
        <div key={s.id} className="px-2">
          <Link href={`/service/${s.id}`} className="text-decoration-none">
            <Card
              className={`${styles.serviceCarouselCard} ${
                String(s.id) === String(activeId ?? "")
                  ? styles.serviceCarouselCardActive
                  : ""
              }`}
            >
              <Card.Body className="d-flex align-items-center justify-content-center gap-2">
                {s.img ? (
                  <span className={styles.serviceCarouselThumb}>
                    <Image
                      src={s.img}
                      alt={s.front_title}
                      width={28}
                      height={28}
                    />
                  </span>
                ) : null}
                <Card.Title className="mb-0 text-center">
                  {s.front_title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}
