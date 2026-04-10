import { forwardRef } from "react"
import { ArrowRight, CirclePlay } from "lucide-react"
import { useTranslation } from "react-i18next"

import { HeroImageShowcase } from "@/components/HeroImageShowcase"
import { Button } from "@/components/ui/button"
import { HERO_SHOWCASE_IMAGES } from "@/data/v2-assets"

import { MagneticCard } from "./home-primitives"

type Props = { shouldRunHeavyAnimations: boolean; topGradient: string; autoPlay?: boolean }

export const HomeHeroSection = forwardRef<HTMLElement, Props>(function HomeHeroSection(
  { shouldRunHeavyAnimations: _shouldRunHeavyAnimations, topGradient, autoPlay = true },
  ref
) {
  const { t } = useTranslation()

  return (
    <section
      ref={ref}
      className="grain section-sheen relative flex min-h-screen flex-col overflow-hidden lg:h-[90vh] lg:min-h-0"
      style={{ backgroundImage: topGradient }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Ambient blobs */}
        <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-blue-500/16 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl dark:bg-teal-400/15" />
        {/* Subtle tech grid (light + dark variants) */}
        <div
          className="absolute inset-0 opacity-[0.55] dark:opacity-[0.85]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(circle at 35% 30%, black 35%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 35% 30%, black 35%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(circle at 35% 30%, black 35%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 35% 30%, black 35%, transparent 70%)",
          }}
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute top-0 bottom-0 z-10 hidden lg:block"
        style={{ left: "55%", transform: "rotate(3deg) scaleY(1.12)" }}
        aria-hidden
      >
        <div className="absolute top-0 bottom-0 left-1/2 h-full w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-xl" />
        <div className="absolute top-0 bottom-0 left-1/2 h-full w-3 -translate-x-1/2 bg-gradient-to-r from-transparent via-foreground/10 to-transparent blur-md" />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col lg:flex-row lg:items-stretch">
        <div
          className="relative z-10 flex w-full flex-col justify-center px-4 pb-12 pt-16 md:px-8 lg:h-full lg:min-h-0 lg:basis-[55%] lg:px-10 lg:pb-16 lg:pt-20"
          style={{
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
          }}
        >
          {/* Theme-aware surface: keep diagonal gradient in both themes, but lighter in light mode. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 backdrop-blur-md bg-[linear-gradient(155deg,rgba(241,245,249,0.94)_0%,rgba(226,232,240,0.88)_55%,rgba(226,232,240,0.68)_100%)] dark:bg-[linear-gradient(155deg,rgba(15,23,42,0.94)_0%,rgba(15,23,42,0.88)_55%,rgba(15,23,42,0.68)_100%)]"
          />
          {/* Inner border sheen for the diagonal panel */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-70"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 0 0 1px rgba(15,23,42,0.06)",
            }}
          />

          <h1 className="mb-5 max-w-3xl text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            <span className="hero-title-line block text-shadow-soft">{t("hero.title")}</span>
          </h1>

          <p
            data-animate="fade-up"
            className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="hero-action h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-xl shadow-primary/25">
              {t("hero.ctaPrimary")}
              <ArrowRight className="ms-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hero-action h-12 rounded-full border-border/70 bg-card/60 px-7 text-foreground/80 hover:bg-card/80 hover:text-foreground"
            >
              <CirclePlay className="me-2 h-4 w-4" />
              {t("hero.ctaSecondary")}
            </Button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
            <MagneticCard className="p-5">
              <p className="text-2xl font-bold text-primary">150K+</p>
              <p className="mt-2 text-sm text-muted-foreground">{t("hero.statsProjects")}</p>
            </MagneticCard>
            <MagneticCard className="p-5">
              <p className="text-2xl font-bold text-primary">620+</p>
              <p className="mt-2 text-sm text-muted-foreground">{t("hero.statsBranches")}</p>
            </MagneticCard>
          </div>
        </div>

        <div className="relative min-h-[min(28rem,70vh)] w-full flex-1 overflow-hidden lg:h-full lg:flex-none lg:basis-[45%] lg:self-stretch">
          <HeroImageShowcase images={HERO_SHOWCASE_IMAGES} className="absolute inset-0 size-full min-h-full" autoPlay={autoPlay} />
        </div>
      </div>
    </section>
  )
})
