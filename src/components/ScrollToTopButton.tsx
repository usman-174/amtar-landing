import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { useMotionPolicy } from "@/hooks/useMotionPolicy"

export function ScrollToTopButton({ className }: { className?: string }) {
  const { shouldRunHeavyAnimations } = useMotionPolicy()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Don't show while the intro curtain is active (it also has an affordance in the same spot).
      const curtainActive = document.querySelector(".intro-curtain-root") !== null
      setVisible(!curtainActive && window.scrollY > 650)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          key="scroll-top"
          initial={{ opacity: 0, y: 10, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.92 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: shouldRunHeavyAnimations ? "smooth" : "auto" })
          }}
          className={cn(
            "fixed bottom-6 right-6 z-[120] inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-card/70 text-foreground shadow-lg shadow-black/10 backdrop-blur-md outline-none transition hover:bg-card/90 focus-visible:ring-2 focus-visible:ring-ring/50",
            className
          )}
          aria-label="Scroll to top"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.18),transparent_60%)]" />
          <ArrowUp className="relative h-5 w-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}

