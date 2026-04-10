import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const CURTAIN_CSS = `
.intro-curtain-root {
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.intro-curtain-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(148, 163, 184, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.07) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 14%, black 88%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 14%, black 88%, transparent);
}
.intro-curtain-giant {
  font-size: min(24vw, 13rem);
  line-height: 0.78;
  font-weight: 900;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(148, 163, 184, 0.12);
  background: linear-gradient(180deg, rgba(226, 232, 240, 0.12) 0%, transparent 62%);
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0.65;
}
.intro-curtain-headline {
  background: linear-gradient(180deg, #f8fafc 0%, rgba(96, 165, 250, 0.75) 55%, rgba(45, 212, 191, 0.55) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 12px 40px rgba(11, 59, 255, 0.22));
}
.intro-curtain-glass-btn {
  background: rgba(30, 41, 59, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 50px rgba(11, 59, 255, 0.12);
}
@keyframes curtain-robot-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.curtain-robot-float {
  animation: curtain-robot-float 5.5s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .curtain-robot-float { animation: none; }
}
`

/**
 * Full-screen intro curtain — wheel/touch peels it away; scroll locked until dismissed.
 *
 * Performance strategy: offset lives in a ref and is flushed to the DOM via a single
 * requestAnimationFrame per input event. Zero React re-renders during the peel —
 * only the final dismiss triggers a state update to unmount the component.
 */
export function LandingIntroCurtain({ onDismiss }: { onDismiss?: () => void }) {
  const { t } = useTranslation()
  const [done, setDone] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const peelPxRef = useRef(
    typeof window !== "undefined" ? Math.min(window.innerHeight, 900) : 800,
  )
  const rafRef = useRef(0)
  const doneRef = useRef(false)
  const onDismissRef = useRef(onDismiss)
  onDismissRef.current = onDismiss

  const flushTransform = useCallback(() => {
    rafRef.current = 0
    const el = rootRef.current
    if (el) el.style.transform = `translate3d(0,${-offsetRef.current}px,0)`
    const hint = hintRef.current
    if (hint) {
      hint.style.opacity = String(
        Math.max(0, 1 - offsetRef.current / (peelPxRef.current * 0.22)),
      )
    }
  }, [])

  const scheduleFlush = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(flushTransform)
  }, [flushTransform])

  const applyDelta = useCallback(
    (delta: number) => {
      if (doneRef.current) return
      const max = peelPxRef.current
      const next = Math.min(max, Math.max(0, offsetRef.current + delta))
      offsetRef.current = next
      if (next >= max * 0.985) {
        doneRef.current = true
        cancelAnimationFrame(rafRef.current)
        setDone(true)
        return
      }
      scheduleFlush()
    },
    [scheduleFlush],
  )

  const nudgePeel = useCallback(() => {
    applyDelta(peelPxRef.current * 0.22)
  }, [applyDelta])

  useEffect(() => {
    const onResize = () => {
      peelPxRef.current = Math.min(window.innerHeight, 900)
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
      onDismissRef.current?.()
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

  useEffect(() => {
    if (done) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      applyDelta(e.deltaY)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " " ||
        e.key === "Enter"
      ) {
        if (e.key === " " && e.target instanceof HTMLElement) {
          const tag = e.target.tagName
          if (
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT" ||
            e.target.isContentEditable
          )
            return
        }
        e.preventDefault()
        applyDelta(peelPxRef.current * 0.12)
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        applyDelta(-(peelPxRef.current * 0.12))
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
      cancelAnimationFrame(rafRef.current)
    }
  }, [done, applyDelta])

  const brandMark = `${String(t("home.intro.headline", { defaultValue: "Amtar" })).toUpperCase()}.`

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="intro-curtain-root fixed inset-0 z-[100] flex flex-col overflow-hidden bg-slate-900 text-slate-50"
      style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      aria-hidden={false}
    >
      <style>{CURTAIN_CSS}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-teal-400/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[50vh] w-[90vw] -translate-x-1/2 rounded-[50%] bg-blue-600/15 blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-x-[-6%] bottom-0 top-[4%] flex items-end justify-center sm:inset-x-0">
          <img
            src="/images/constructionRobot.png"
            alt={t("home.robotAlt")}
            className="curtain-robot-float h-[min(88vh,880px)] w-auto max-w-[min(112vw,760px)] object-contain object-bottom sm:max-w-[min(96vw,680px)] md:h-[min(90vh,920px)]"
            draggable={false}
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/55 to-slate-900/15"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/25 to-slate-900/75"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_18%,rgba(15,23,42,0.88),transparent_55%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_92%,rgba(11,59,255,0.14),transparent_55%)]"
          aria-hidden
        />
        <div className="intro-curtain-grid absolute inset-0 opacity-80" aria-hidden />
        <div
          className="intro-curtain-giant absolute -bottom-[4vh] left-1/2 w-[max-content] -translate-x-1/2 select-none whitespace-nowrap"
          aria-hidden
        >
          {brandMark}
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-8 pt-20">
        <p className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-slate-800/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
          {t("home.intro.kicker")}
        </p>
        <h1 className="intro-curtain-headline text-center text-5xl font-black tracking-tighter md:text-7xl lg:text-8xl">
          {t("footerCinematic.ready")}
        </h1>
        <p className="mt-6 max-w-lg text-center text-sm leading-relaxed text-slate-200/75 md:text-base">
          {t("home.intro.subhead")}
        </p>

        <div ref={hintRef} className="mt-10 flex flex-col items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 md:text-xs">
            {t("home.intro.scrollHint")}
          </span>
          <button
            type="button"
            onClick={nudgePeel}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/12 bg-slate-800/40 pt-2 transition hover:border-blue-400/35 hover:bg-slate-800/55"
            aria-label={t("home.intro.scrollHint")}
          >
            <span className="block h-2 w-2 rounded-full bg-blue-300/90" />
          </button>
        </div>
      </div>

      <div className="relative z-20 flex w-full flex-col items-center gap-6 px-6 pb-10 md:flex-row md:items-center md:justify-between md:px-12">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400 md:text-start md:text-xs">
          {t("footerPremium.rights")}
        </p>

        <button
          type="button"
          onClick={nudgePeel}
          className="intro-curtain-glass-btn flex h-12 w-12 items-center justify-center rounded-full text-teal-200/90 transition hover:border-white/20 hover:text-white"
          aria-label={t("home.intro.scrollHint")}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
