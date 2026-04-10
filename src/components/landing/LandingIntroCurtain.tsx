import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

/**
 * Full-viewport intro above the nav. Peel amount is driven by wheel / touch / keys only —
 * document scroll stays at 0 until the curtain is gone, so the hero (not the next section) is revealed first.
 */
export function LandingIntroCurtain() {
  const { t } = useTranslation()
  const [peelPx, setPeelPx] = useState(() =>
    typeof window !== "undefined" ? Math.min(window.innerHeight, 900) : 800
  )
  const peelPxRef = useRef(peelPx)
  peelPxRef.current = peelPx

  const [offset, setOffset] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const onResize = () => {
      const next = Math.min(window.innerHeight, 900)
      setPeelPx(next)
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useLayoutEffect(() => {
    if (done) {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
      window.scrollTo(0, 0)
      return
    }

    window.scrollTo(0, 0)
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"

    return () => {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [done])

  const applyDelta = useCallback((delta: number) => {
    if (done) return
    const max = peelPxRef.current
    setOffset((prev) => {
      const next = Math.min(max, Math.max(0, prev + delta))
      if (next >= max * 0.985) {
        queueMicrotask(() => setDone(true))
        return max
      }
      return next
    })
  }, [done])

  useEffect(() => {
    if (done) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      applyDelta(e.deltaY)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " " || e.key === "Enter") {
        if (e.key === " " && e.target instanceof HTMLElement) {
          const tag = e.target.tagName
          if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target.isContentEditable) return
        }
        e.preventDefault()
        applyDelta(peelPxRef.current * 0.12)
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        setOffset((prev) => Math.max(0, prev - peelPxRef.current * 0.12))
      }
    }

    let lastTouchY = 0
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const y = e.touches[0].clientY
      const dy = lastTouchY - y
      lastTouchY = y
      applyDelta(dy * 1.2)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [done, applyDelta])

  const hintFade = Math.max(0, 1 - offset / (peelPx * 0.22))

  if (done) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ transform: `translateY(${-offset}px)` }}
      aria-hidden={false}
    >
      <div className="absolute inset-0">
        <img
          src="/images/constructionRobot.png"
          alt=""
          className="h-full w-full object-cover object-[center_30%] sm:object-[center_20%]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/92 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_22%,rgba(59,130,246,0.14),transparent_50%)]" />
      </div>

      <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-blue-200/90">{t("home.intro.kicker")}</p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">{t("home.intro.headline")}</h1>
        <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-slate-200/75 md:text-lg">{t("home.intro.subhead")}</p>

        <motion.div className="mt-14 flex flex-col items-center gap-2" style={{ opacity: hintFade }}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 md:text-xs">{t("home.intro.scrollHint")}</span>
          <motion.div
            className="flex h-10 w-6 justify-center rounded-full border border-white/20 bg-white/5"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="mt-2 block h-2 w-2 rounded-full bg-blue-300/90" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
