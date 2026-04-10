import { forwardRef } from "react"
import { Workflow } from "lucide-react"
import { useTranslation } from "react-i18next"

import { MagneticCard, SectionHeading } from "./home-primitives"
import { workflowFallback } from "./home-data"

export const HomeWorkflowSection = forwardRef<HTMLElement>(function HomeWorkflowSection(_, ref) {
  const { t } = useTranslation()
  const workflowCards =
    (t("horizontal.cards", { returnObjects: true }) as Array<{ title: string; body: string }>) ?? workflowFallback

  return (
    <section id="workflow" ref={ref} className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Workflow" title={t("horizontal.heading")} subtitle={t("horizontal.subtitle")} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {workflowCards.map((card, index) => (
            <MagneticCard key={card.title} className="workflow-card p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">0{index + 1}</span>
                <Workflow className="h-5 w-5 text-primary/80" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
})
