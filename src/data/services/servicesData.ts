import type { ServiceImage, ServiceImages } from "@/types";

// Legacy data structure for backward compatibility
export const servicesData: ServiceImage[] = [
  { id: 1, front: { img: "/images/services/service-1-card.webp" } }, // Desarrollo web
  { id: 2, front: { img: "/images/services/service-2-card.webp" } }, // Sistemas empresariales
  { id: 3, front: { img: "/images/services/service-3-card.webp" } }, // Aplicaciones móviles
  { id: 4, front: { img: "/images/services/service-4-card.webp" } }, // Plataformas educativas
  { id: 5, front: { img: "/images/services/service-5-card.webp" } }, // Sistemas de facturación
  { id: 6, front: { img: "/images/services/service-6-card.webp" } }, // APIs e integraciones
  { id: 7, front: { img: "/images/services/service-7-card.webp" } }, // Anuncios publicitarios
  { id: 8, front: { img: "/images/services/service-8-card.webp" } }, // Logos corporativos
  { id: 10, front: { img: "/images/services/service-9-card.webp" } }, // Automatización (usando imagen 9 para servicio 10)
];

export const servicesDataCarrusel: ServiceImage[] = [
  { id: 1, front: { img: "/images/services/service-1-carrusel.webp" } }, // Desarrollo web
  { id: 2, front: { img: "/images/services/service-2-carrusel.webp" } }, // Sistemas empresariales
  { id: 3, front: { img: "/images/services/service-3-carrusel.webp" } }, // Aplicaciones móviles
  { id: 4, front: { img: "/images/services/service-4-carrusel.webp" } }, // Plataformas educativas
  { id: 5, front: { img: "/images/services/service-5-carrusel.webp" } }, // Sistemas de facturación
  { id: 6, front: { img: "/images/services/service-6-carrusel.webp" } }, // APIs e integraciones
  { id: 7, front: { img: "/images/services/service-7-carrusel.webp" } }, // Anuncios publicitarios
  { id: 8, front: { img: "/images/services/service-8-carrusel.webp" } }, // Logos corporativos
  { id: 10, front: { img: "/images/services/service-9-carrusel.webp" } }, // Automatización 
];

// New combined data structure
export const servicesImages: ServiceImages[] = [
  { 
    id: 1, 
    cardImg: "/images/services/service-1-card.webp",
    carouselImg: "/images/services/service-1-carrusel.webp"
  }, // Desarrollo web
  { 
    id: 2, 
    cardImg: "/images/services/service-2-card.webp",
    carouselImg: "/images/services/service-2-carrusel.webp"
  }, // Sistemas empresariales
  { 
    id: 3, 
    cardImg: "/images/services/service-3-card.webp",
    carouselImg: "/images/services/service-3-carrusel.webp"
  }, // Aplicaciones móviles
  { 
    id: 4, 
    cardImg: "/images/services/service-4-card.webp",
    carouselImg: "/images/services/service-4-carrusel.webp"
  }, // Plataformas educativas
  { 
    id: 5, 
    cardImg: "/images/services/service-5-card.webp",
    carouselImg: "/images/services/service-5-carrusel.webp"
  }, // Sistemas de facturación
  { 
    id: 6, 
    cardImg: "/images/services/service-6-card.webp",
    carouselImg: "/images/services/service-6-carrusel.webp"
  }, // APIs e integraciones
  { 
    id: 7, 
    cardImg: "/images/services/service-7-card.webp",
    carouselImg: "/images/services/service-7-carrusel.webp"
  }, // Anuncios publicitarios
  { 
    id: 8, 
    cardImg: "/images/services/service-8-card.webp",
    carouselImg: "/images/services/service-8-carrusel.webp"
  }, // Logos corporativos
  { 
    id: 10, 
    cardImg: "/images/services/service-9-card.webp",
    carouselImg: "/images/services/service-9-carrusel.webp"
  }, // Automatización
];