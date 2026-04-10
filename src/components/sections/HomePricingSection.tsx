import { forwardRef } from "react"
import { Check, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"

import { MagneticCard, SectionHeading } from "./home-primitives"
import { plansFallback } from "./home-data"
import type { Plan } from "./home-types"

export const HomePricingSection = forwardRef<HTMLElement>(function HomePricingSection(_, ref) {
  const { t } = useTranslation()
  const plans = (t("pricing.plans", { returnObjects: true }) as Plan[]) ?? plansFallback

  return (
    <section id="pricing" ref={ref} className="section-sheen px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Pricing" title={t("pricing.title")} subtitle={t("pricing.subtitle")} centered />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <MagneticCard
              key={plan.name}
              className={`price-card p-7 ${plan.featured ? "border-primary/40 bg-primary/10 ring-1 ring-primary/20" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                {plan.featured ? (
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {t("home.popular", { defaultValue: "Popular" })}
                  </span>
                ) : null}
              </div>
              <p className="mt-5 text-3xl font-bold text-primary">{plan.price}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{plan.period}</p>
              <ul className="mt-6 space-y-3">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 text-primary/80" />
                    {point}
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 h-11 w-full rounded-full ${
                  plan.featured
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card/70 text-foreground/80 hover:bg-card hover:text-foreground"
                }`}
              >
                {t("pricing.choose")}
                <ChevronRight className="ms-2 h-4 w-4" />
              </Button>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
})
