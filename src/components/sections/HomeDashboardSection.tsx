import { forwardRef } from "react"
import { useTranslation } from "react-i18next"

import { MagneticCard, SectionHeading } from "./home-primitives"
import { dashboardProof } from "./home-data"

export const HomeDashboardSection = forwardRef<HTMLElement>(function HomeDashboardSection(_, ref) {
  const { t } = useTranslation()

  return (
    <section ref={ref} className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker={t("home.dashboardKicker", { defaultValue: "Dashboard Proof" })}
          title={t("home.dashboardTitle", { defaultValue: "Operational dashboards that prove execution" })}
          subtitle={t("home.dashboardSubtitle", {
            defaultValue: "From quote velocity to invoice health, every metric is visible, filterable, and actionable.",
          })}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {dashboardProof.map((image, index) => (
            <MagneticCard key={image} className="dashboard-card overflow-hidden p-0">
              <img src={image} alt={`Dashboard ${index + 1}`} className="h-64 w-full object-cover md:h-72" loading="lazy" />
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
})
