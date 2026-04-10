import { forwardRef } from "react"
import { BarChart3, Building2, Layers3 } from "lucide-react"
import { useTranslation } from "react-i18next"

import { MagneticCard, SectionHeading } from "./home-primitives"
import { operationsFallback } from "./home-data"
import type { StepItem } from "./home-types"

export const HomeOperationsSection = forwardRef<HTMLElement>(function HomeOperationsSection(_, ref) {
  const { t } = useTranslation()
  const operationCards =
    (t("operations.pillars", { returnObjects: true }) as Array<{ title: string; body: string }>) ?? operationsFallback
  const successSteps = (t("success.steps", { returnObjects: true }) as StepItem[]) ?? []

  const steps =
    successSteps.length > 0
      ? successSteps
      : [
          {
            title: t("home.step1Title", { defaultValue: "Capture Demand" }),
            body: t("home.step1Body", {
              defaultValue: "Collect project requests with specs and routing from one intake point.",
            }),
            kpi: t("home.step1Kpi", { defaultValue: "Average intake setup: 7 min" }),
          },
          {
            title: t("home.step2Title", { defaultValue: "Price and Approve" }),
            body: t("home.step2Body", {
              defaultValue: "Build controlled quotations, track revisions, and lock approvals.",
            }),
            kpi: t("home.step2Kpi", { defaultValue: "Quote turnaround faster by 38%" }),
          },
          {
            title: t("home.step3Title", { defaultValue: "Deliver and Invoice" }),
            body: t("home.step3Body", {
              defaultValue: "Move from approved quote to delivery and compliant invoicing.",
            }),
            kpi: t("home.step3Kpi", { defaultValue: "Invoice cycle reduced to 4 days" }),
          },
        ]

  return (
    <section ref={ref} className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t("operations.title")} subtitle={t("operations.subtitle")} kicker="Operations" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {operationCards.map((card, index) => (
            <MagneticCard key={card.title} className="ops-card p-7">
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-2 text-primary/85">
                {index === 0 ? <Building2 className="h-5 w-5" /> : index === 1 ? <BarChart3 className="h-5 w-5" /> : <Layers3 className="h-5 w-5" />}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </MagneticCard>
          ))}
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <MagneticCard key={step.title} className="success-step p-6">
              <div className="flex items-center gap-3 text-sm font-medium text-primary/85">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-primary/10">{index + 1}</span>
                {step.title}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary/80">{step.kpi}</p>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
})
