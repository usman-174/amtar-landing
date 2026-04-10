import { forwardRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CirclePlay, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"

import { HeroImageShowcase } from "@/components/HeroImageShowcase"
import { Button } from "@/components/ui/button"

import { MagneticCard } from "./home-primitives"

type Props = { shouldRunHeavyAnimations: boolean; topGradient: string }

export const HomeHeroSection = forwardRef<HTMLElement, Props>(function HomeHeroSection(
  { shouldRunHeavyAnimations, topGradient },
  ref
) {
  const { t } = useTranslation()

  return (
    <section
      ref={ref}
      className="grain section-sheen relative overflow-hidden px-4 pb-24 pt-16 md:px-8 md:pt-24"
      style={{ backgroundImage: topGradient }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative">
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

        <motion.div
          data-animate="fade-up"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: shouldRunHeavyAnimations ? 0.8 : 0.55 }}
          className="flex flex-col gap-5"
        >
          <HeroImageShowcase />
        </motion.div>
      </div>
    </section>
  )
})
