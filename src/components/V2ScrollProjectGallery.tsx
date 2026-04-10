import { useLayoutEffect, useRef, useState } from "react"
import { Drawer } from "@base-ui/react/drawer"
import { ExternalLink, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { V2_GALLERY_IMAGES } from "@/data/v2-assets"
import { cn } from "@/lib/utils"

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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<OpenState | null>(null)

  const openProject = (state: OpenState) => {
    setActiveItem(state)
    setDrawerOpen(true)
  }

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
      <style>{`
        .v2-drawer-backdrop {
          opacity: calc(0.82 * (1 - var(--drawer-swipe-progress, 0)));
          transition: opacity 240ms ease-out;
        }
        .v2-drawer-backdrop[data-ending-style] {
          opacity: 0;
        }
        .v2-drawer-backdrop[data-swiping],
        .v2-drawer-popup[data-swiping] {
          transition-duration: 0ms;
        }
        .v2-drawer-popup[data-swipe-direction='down'] {
          transform: translateY(calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)));
        }
        .v2-drawer-popup[data-ending-style][data-swipe-direction='down'] {
          transform: translateY(100%);
        }
        .v2-drawer-popup[data-ending-style],
        .v2-drawer-backdrop[data-ending-style] {
          transition-duration: calc(var(--drawer-swipe-strength, 1) * 380ms);
        }
      `}</style>

      <section
        ref={rootRef}
        data-v2-section
        className="relative overflow-hidden px-4 py-24 md:px-8"
        aria-labelledby="v2-gallery-heading"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(11,59,255,0.14),transparent),radial-gradient(ellipse_60%_40%_at_100%_60%,rgba(11,59,255,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(11,59,255,0.22),transparent),radial-gradient(ellipse_60%_40%_at_100%_60%,rgba(13,148,136,0.12),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">{t("v2Gallery.kicker")}</p>
            <h2 id="v2-gallery-heading" className="mt-3 text-balance text-3xl font-semibold text-foreground md:text-5xl">
              {t("v2Gallery.title")}
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">{t("v2Gallery.subtitle")}</p>
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
                    onClick={() => openProject({ index, src: img.src, alt: img.alt })}
                    className="group relative w-full max-w-2xl shrink-0 overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/60 text-start shadow-[0_28px_90px_rgba(11,59,255,0.08)] outline-none transition hover:border-primary/35 focus-visible:ring-2 focus-visible:ring-ring/50 md:w-[58%]"
                  >
                    <div data-v2-card-inner className="relative aspect-[16/11] w-full overflow-hidden md:aspect-[5/3]">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-primary/10 opacity-80 dark:from-slate-900/65" />
                      <span className="absolute bottom-4 start-4 inline-flex rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                        {t("v2Gallery.openHint")}
                      </span>
                    </div>
                  </button>

                  <div className="flex flex-1 flex-col justify-center px-1 md:px-8">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                      {t("v2Gallery.caseLabel", { n: String(index + 1) })}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">{title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">{body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Drawer.Root
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onOpenChangeComplete={(open) => {
          if (!open) setActiveItem(null)
        }}
        swipeDirection="down"
      >
        <Drawer.Portal>
          <Drawer.Backdrop className="v2-drawer-backdrop fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md" />
          <Drawer.Viewport className="fixed inset-x-0 bottom-0 z-[201] flex max-h-[min(92dvh,920px)] justify-center overscroll-contain px-0 pt-6">
            <Drawer.Popup
              className={cn(
                "v2-drawer-popup w-full max-w-lg rounded-t-2xl border border-border/70 bg-background shadow-2xl shadow-black/15 outline-none transition-transform duration-300 ease-out"
              )}
            >
              <Drawer.Content className="max-h-[min(85dvh,820px)] overflow-y-auto rounded-t-2xl">
                {activeItem ? (
                  <>
                    <div className="sticky top-0 z-10 flex justify-end border-b border-border/60 bg-background/92 px-3 py-2 backdrop-blur-md">
                      <Drawer.Close
                        type="button"
                        aria-label={t("v2Gallery.dialog.close")}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/70 text-foreground/80 transition hover:bg-card"
                      >
                        <X className="h-4 w-4" />
                      </Drawer.Close>
                    </div>

                    <div className="aspect-video w-full overflow-hidden">
                      <img src={activeItem.src} alt={activeItem.alt} className="h-full w-full object-cover" />
                    </div>

                    <div className="space-y-3 p-6 pb-8">
                      <Drawer.Title className="text-xl font-semibold text-foreground" id="v2-drawer-title">
                        {t(`v2Gallery.items.item${activeItem.index}.title`)}
                      </Drawer.Title>
                      <Drawer.Description className="text-sm leading-relaxed text-muted-foreground">
                        {t(`v2Gallery.items.item${activeItem.index}.body`)}
                      </Drawer.Description>
                      <p className="text-xs text-muted-foreground">{t("v2Gallery.dialog.hint")}</p>
                      <a
                        href="https://example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-95"
                      >
                        {t("v2Gallery.dialog.cta")}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </>
                ) : null}
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}
