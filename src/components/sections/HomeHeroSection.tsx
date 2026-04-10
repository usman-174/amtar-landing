import { forwardRef } from "react"
import { ArrowRight, CirclePlay, Sparkles } from "lucide-react"
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
        <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute top-0 bottom-0 z-10 hidden lg:block"
        style={{ left: "55%", transform: "rotate(3deg) scaleY(1.12)" }}
        aria-hidden
      >
        <div className="absolute top-0 bottom-0 left-1/2 h-full w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-300/35 to-transparent blur-xl" />
        <div className="absolute top-0 bottom-0 left-1/2 h-full w-3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent blur-md" />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col lg:flex-row lg:items-stretch">
        <div
          className="relative z-10 flex w-full flex-col justify-center px-4 pb-16 pt-20 md:px-8 lg:h-full lg:min-h-0 lg:basis-[55%] lg:overflow-y-auto lg:px-12 lg:pb-20 lg:pt-24"
          style={{
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
            background:
              "linear-gradient(155deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.88) 55%, rgba(15,23,42,0.68) 100%)",
          }}
        >
          <p
            data-animate="fade-up"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/45 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </p>

          <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-tight text-slate-50 md:text-6xl">
            <span className="hero-title-line block text-shadow-soft">{t("hero.title")}</span>
          </h1>

          <p data-animate="fade-up" className="max-w-2xl text-pretty text-base leading-relaxed text-slate-200/75 md:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="hero-action h-12 rounded-full bg-blue-500 px-7 text-white shadow-xl shadow-blue-500/30">
              {t("hero.ctaPrimary")}
              <ArrowRight className="ms-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hero-action h-12 rounded-full border-white/15 bg-slate-800/40 px-7 text-teal-200 hover:bg-slate-800/45"
            >
              <CirclePlay className="me-2 h-4 w-4" />
              {t("hero.ctaSecondary")}
            </Button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
            <MagneticCard className="p-5">
              <p className="text-2xl font-bold text-blue-200">150K+</p>
              <p className="mt-2 text-sm text-slate-200/70">{t("hero.statsProjects")}</p>
            </MagneticCard>
            <MagneticCard className="p-5">
              <p className="text-2xl font-bold text-teal-200">620+</p>
              <p className="mt-2 text-sm text-slate-200/70">{t("hero.statsBranches")}</p>
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
