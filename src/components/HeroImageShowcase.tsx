import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { HERO_SHOWCASE_IMAGES, type HeroShowcaseImage } from "@/data/v2-assets"
import { cn } from "@/lib/utils"

const AUTO_MS = 5200

type Props = {
  images?: readonly HeroShowcaseImage[]
  className?: string
}

export function HeroImageShowcase({ images = HERO_SHOWCASE_IMAGES, className = "" }: Props) {
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

  const current = images[index]

  return (
    <div className={cn("relative isolate min-h-full w-full", className)}>
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
          <img
            src={current.src}
            alt={current.alt}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
