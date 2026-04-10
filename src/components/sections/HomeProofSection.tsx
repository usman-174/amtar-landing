import { forwardRef } from "react"
import { useTranslation } from "react-i18next"

import { SectionHeading } from "./home-primitives"

export const HomeProofSection = forwardRef<HTMLElement>(function HomeProofSection(_, ref) {
  const { t } = useTranslation()
  const badges = (t("proof.badges", { returnObjects: true }) as string[]) ?? []

  return (
    <section ref={ref} className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={t("proof.title")} subtitle={t("proof.subtitle")} centered />
        <div className="mt-12 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge) => (
            <div
              key={badge}
              className="proof-badge rounded-2xl border border-border/70 bg-primary/10 px-4 py-3 text-center text-xs font-semibold text-primary/85"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
