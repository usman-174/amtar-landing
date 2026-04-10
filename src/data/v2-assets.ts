/** Images served from `public/v2/` */
export const V2_GALLERY_IMAGES = [
  { id: "v2-0", src: "/v2/hero-0.png", alt: "Amtar showcase 1" },
  { id: "v2-1", src: "/v2/hero-1.jpg", alt: "Amtar showcase 2" },
  { id: "v2-2", src: "/v2/hero-2.jpg", alt: "Amtar showcase 3" },
  { id: "v2-3", src: "/v2/pixel-3-v.jpg", alt: "Amtar showcase 4" },
  { id: "v2-4", src: "/v2/pixel-4.jpg", alt: "Amtar showcase 5" },
] as const

export type V2GalleryImage = (typeof V2_GALLERY_IMAGES)[number]
