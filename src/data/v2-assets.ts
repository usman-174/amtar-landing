/** Images served from `public/v2/` */
export const V2_GALLERY_IMAGES = [
  { id: "v2-0", src: "/v2/hero-0.png", alt: "Amtar showcase 1" },
  { id: "v2-1", src: "/v2/hero-1.jpg", alt: "Amtar showcase 2" },
  { id: "v2-2", src: "/v2/hero-2.jpg", alt: "Amtar showcase 3" },
  { id: "v2-3", src: "/v2/pixel-3-v.jpg", alt: "Amtar showcase 4" },
  { id: "v2-4", src: "/v2/pixel-4.jpg", alt: "Amtar showcase 5" },
] as const

/** Right hero panel — cycles `public/v2/` hero + detail shots */
export const HERO_SHOWCASE_IMAGES = [
  { id: "hero-0", src: "/v2/hero-0.png", alt: "Amtar hero visual" },
  { id: "hero-1", src: "/v2/hero-1.jpg", alt: "Amtar platform preview" },
  { id: "hero-2", src: "/v2/hero-2.jpg", alt: "Amtar construction commerce" },
  { id: "hero-3", src: "/v2/pixel-3-v.jpg", alt: "Amtar product detail" },
  { id: "hero-4", src: "/v2/pixel-4.jpg", alt: "Amtar interface detail" },
] as const

export type V2GalleryImage = (typeof V2_GALLERY_IMAGES)[number]
export type HeroShowcaseImage = (typeof HERO_SHOWCASE_IMAGES)[number]
