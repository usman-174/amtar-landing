import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { V2_GALLERY_IMAGES, type V2GalleryImage } from "@/data/v2-assets"

const AUTO_MS = 5200

type Props = {
  images?: readonly V2GalleryImage[]
  className?: string
}

export function HeroImageShowcase({ images = V2_GALLERY_IMAGES, className = "" }: Props) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(0)
  const count = images.length

  const go = useCallback(
    (delta: number) => {
      setDir(delta)
      setIndex((i) => (i + delta + count) % count)
    },
    [count]
  )

  useEffect(() => {
    const t = window.setInterval(() => go(1), AUTO_MS)
    return () => window.clearInterval(t)
  }, [go])

  const onDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 48
    if (info.offset.x < -threshold || info.velocity.x < -300) go(1)
    else if (info.offset.x > threshold || info.velocity.x > 300) go(-1)
  }

  const current = images[index]

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-transparent to-teal-500/15 blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-slate-800/65 shadow-[0_24px_80px_rgba(11,59,255,0.16)]">
        <div className="relative aspect-[16/11] w-full md:aspect-[16/10]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={current.id}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 64 : -64, scale: 1.04 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: dir >= 0 ? -48 : 48, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={onDragEnd}
                className="relative h-full w-full cursor-grab active:cursor-grabbing"
              >
                <img
                  src={current.src}
                  alt={current.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute start-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-800/60 text-white backdrop-blur-md transition hover:bg-slate-800/80"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute end-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-800/60 text-white backdrop-blur-md transition hover:bg-slate-800/80"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-slate-800/50 px-4 py-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => {
                setDir(i > index ? 1 : -1)
                setIndex(i)
              }}
              className="relative h-1.5 overflow-hidden rounded-full bg-white/15 transition-all"
              style={{ width: i === index ? 32 : 8 }}
            >
              {i === index ? (
                <motion.span
                  layoutId="hero-dot"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-teal-400"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              ) : null}
            </button>
          ))}
        </div>

        <div className="hidden gap-2 overflow-x-auto border-t border-white/5 px-3 py-2 md:flex md:justify-center">
          {images.map((img, i) => (
            <button
              key={`thumb-${img.id}`}
              type="button"
              onClick={() => {
                setDir(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition ${
                i === index ? "border-blue-400/60 ring-2 ring-blue-500/30" : "border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
