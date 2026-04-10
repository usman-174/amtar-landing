import { forwardRef } from "react"
import { Workflow } from "lucide-react"
import { useTranslation } from "react-i18next"

import { MagneticCard } from "./home-primitives"
import { workflowFallback } from "./home-data"

export const HomeStorySection = forwardRef<HTMLElement>(function HomeStorySection(_, ref) {
  const { t } = useTranslation()
  const workflowCards =
    (t("horizontal.cards", { returnObjects: true }) as Array<{ title: string; body: string }>) ?? workflowFallback

  return (
    <section ref={ref} className="relative px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="story-title text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">{t("horizontal.heading")}</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold text-foreground md:text-5xl">{t("horizontal.subtitle")}</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("home.storyBody", {
                defaultValue:
                  "Scroll to reveal the command flow: from catalog to compliant invoicing, with a single operating timeline.",
              })}
            </p>

            <div className="mt-8 space-y-3">
              {workflowCards.map((card) => (
                <div
                  key={card.title}
                  className="story-title rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-sm font-medium text-foreground shadow-sm"
                >
                  {card.title}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {workflowCards.map((card, index) => (
              <div key={card.title} className="story-card">
                <MagneticCard className="p-7">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">0{index + 1}</span>
                    <Workflow className="h-5 w-5 text-primary/80" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                  <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-blue-600/70 via-teal-500/60 to-cyan-500/40" />
                </MagneticCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})
