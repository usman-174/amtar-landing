import { forwardRef } from "react"
import { TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"

import { MagneticCard, RadarViz, SectionHeading } from "./home-primitives"
import type { BarPoint, Metric } from "./home-types"

type Props = { shouldRunHeavyAnimations: boolean }

export const HomeInsightsSection = forwardRef<HTMLElement, Props>(function HomeInsightsSection(
  { shouldRunHeavyAnimations },
  ref
) {
  const { t } = useTranslation()
  const metrics = (t("insights.metrics", { returnObjects: true }) as Metric[]) ?? [
    { label: "Quote Win Rate", value: 86, suffix: "%" },
    { label: "Avg Invoice Cycle", value: 4, suffix: "d" },
    { label: "Monthly Revenue Growth", value: 31, suffix: "%" },
  ]
  const bars = (t("insights.bars", { returnObjects: true }) as BarPoint[]) ?? [
    { label: "Q1", value: 42 },
    { label: "Q2", value: 58 },
    { label: "Q3", value: 74 },
    { label: "Q4", value: 91 },
  ]

  return (
    <section id="insights" ref={ref} className="section-sheen px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t("insights.title")} subtitle={t("insights.subtitle")} kicker="Insights" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <MagneticCard key={metric.label} className="insight-metric p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-200/65">{metric.label}</p>
                <p className="mt-4 text-4xl font-bold text-blue-200">
                  {metric.value}
                  {metric.suffix}
                </p>
                <div className="mt-5 flex items-center text-xs text-teal-200/90">
                  <TrendingUp className="me-1 h-3.5 w-3.5" />
                  {t("home.liveTracking", { defaultValue: "Live tracking" })}
                </div>
              </MagneticCard>
            ))}
          </div>

          <MagneticCard className="p-8">
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70">{t("insights.title")}</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-200/65">
                  {t("home.radarBody", {
                    defaultValue:
                      "Monitor momentum across sales, quote conversion, and invoice velocity with a live radar that surfaces drift early.",
                  })}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {bars.slice(0, 4).map((bar) => (
                    <div key={bar.label} className="rounded-2xl border border-white/10 bg-slate-800/40 px-4 py-3">
                      <p className="text-xs text-slate-200/65">{bar.label}</p>
                      <p className="mt-1 text-lg font-semibold text-slate-50">{bar.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full max-w-sm">
                <RadarViz enabled={shouldRunHeavyAnimations} metrics={metrics} />
              </div>
            </div>
          </MagneticCard>
        </div>
      </div>
    </section>
  )
})
