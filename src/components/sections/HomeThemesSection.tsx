import { forwardRef } from "react"
import { useTranslation } from "react-i18next"

import { MagneticCard, SectionHeading } from "./home-primitives"
import { themeShowcase } from "./home-data"

export const HomeThemesSection = forwardRef<HTMLElement>(function HomeThemesSection(_, ref) {
  const { t } = useTranslation()

  return (
    <section ref={ref} className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker={t("home.themeKicker", { defaultValue: "Theme Showcase" })}
          title={t("home.themeTitle", { defaultValue: "Four storefront themes to launch faster" })}
          subtitle={t("home.themeSubtitle", { defaultValue: "Pick a direction, publish instantly, then customize as you scale." })}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {themeShowcase.map((theme) => (
            <MagneticCard key={theme.title} className="theme-card overflow-hidden p-0">
              <img src={theme.image} alt={theme.title} className="h-52 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-50">{theme.title}</h3>
                <p className="mt-2 text-sm text-slate-200/70">
                  {t("home.themeCardBody", { defaultValue: "Designed for product-heavy construction catalogs." })}
                </p>
              </div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
})
