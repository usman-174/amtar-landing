import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { V2_GALLERY_IMAGES } from "@/data/v2-assets"

gsap.registerPlugin(ScrollTrigger)

export type V2ScrollProjectGalleryProps = {
  isRTL: boolean
}

type OpenState = {
  index: number
  src: string
  alt: string
}

export function V2ScrollProjectGallery({ isRTL }: V2ScrollProjectGalleryProps) {
  const { t } = useTranslation()
  const rootRef = useRef<HTMLElement | null>(null)
  const [open, setOpen] = useState<OpenState | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll<HTMLElement>("[data-v2-card]")
      cards.forEach((el, i) => {
        const fromX = isRTL ? (i % 2 === 0 ? 120 : -120) : i % 2 === 0 ? -120 : 120
        const fromY = i % 3 === 0 ? 40 : i % 3 === 1 ? -28 : 18

        gsap.fromTo(
          el,
          { x: fromX, y: fromY, opacity: 0, scale: 0.86 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 35%",
              scrub: 1.15,
            },
          }
        )

        const inner = el.querySelector<HTMLElement>("[data-v2-card-inner]")
        if (inner) {
          gsap.fromTo(
            inner,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 25%",
                scrub: 1.4,
              },
            }
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [isRTL])

  return (
    <>
      <section
        ref={rootRef}
        data-v2-section
        className="relative overflow-hidden px-4 py-24 md:px-8"
        aria-labelledby="v2-gallery-heading"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(11,59,255,0.22),transparent),radial-gradient(ellipse_60%_40%_at_100%_60%,rgba(13,148,136,0.12),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200/90">{t("v2Gallery.kicker")}</p>
            <h2 id="v2-gallery-heading" className="mt-3 text-balance text-3xl font-semibold text-slate-50 md:text-5xl">
              {t("v2Gallery.title")}
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-200/70 md:text-base">{t("v2Gallery.subtitle")}</p>
          </div>

          <div className="mt-16 flex flex-col gap-16 md:gap-24">
            {V2_GALLERY_IMAGES.map((img, index) => {
              const isLeft = index % 2 === 0
              const itemKey = `v2Gallery.items.item${index}`
              const title = t(`${itemKey}.title`)
              const body = t(`${itemKey}.body`)

              return (
                <div
                  key={img.id}
                  data-v2-card
                  className={`flex flex-col gap-6 md:flex-row md:items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen({ index, src: img.src, alt: img.alt })}
                    className="group relative w-full max-w-2xl shrink-0 overflow-hidden rounded-[1.75rem] border border-white/12 bg-slate-800/55 text-start shadow-[0_28px_90px_rgba(11,59,255,0.1)] outline-none transition hover:border-blue-400/35 focus-visible:ring-2 focus-visible:ring-blue-400/50 md:w-[58%]"
                  >
                    <div data-v2-card-inner className="relative aspect-[16/11] w-full overflow-hidden md:aspect-[5/3]">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-900/65 via-transparent to-blue-500/10 opacity-80" />
                      <span className="absolute bottom-4 start-4 inline-flex rounded-full border border-white/15 bg-slate-800/65 px-3 py-1 text-xs font-medium text-slate-100 backdrop-blur-md">
                        {t("v2Gallery.openHint")}
                      </span>
                    </div>
                  </button>

                  <div className="flex flex-1 flex-col justify-center px-1 md:px-8">
                    <span className="text-xs font-semibold uppercase tracking-widest text-teal-200/80">
                      {t("v2Gallery.caseLabel", { n: String(index + 1) })}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-50 md:text-3xl">{title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-200/70 md:text-base">{body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="v2-dialog-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/88 p-4 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-blue-500/10"
            >
              <button
                type="button"
                aria-label={t("v2Gallery.dialog.close")}
                onClick={() => setOpen(null)}
                className="absolute end-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-slate-800/90 text-slate-200 transition hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-video w-full overflow-hidden">
                <img src={open.src} alt={open.alt} className="h-full w-full object-cover" />
              </div>

              <div className="space-y-3 p-6">
                <h3 id="v2-dialog-title" className="text-xl font-semibold text-slate-50">
                  {t(`v2Gallery.items.item${open.index}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-slate-200/75">{t(`v2Gallery.items.item${open.index}.body`)}</p>
                <p className="text-xs text-slate-400">{t("v2Gallery.dialog.hint")}</p>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400"
                >
                  {t("v2Gallery.dialog.cta")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
