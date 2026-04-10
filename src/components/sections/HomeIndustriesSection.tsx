import { forwardRef } from "react"
import { useTranslation } from "react-i18next"

import { SectionHeading } from "./home-primitives"
import { industriesFallback } from "./home-data"

export const HomeIndustriesSection = forwardRef<HTMLElement>(function HomeIndustriesSection(_, ref) {
  const { t } = useTranslation()
  const industries = (t("industries.items", { returnObjects: true }) as string[]) ?? industriesFallback

  return (
    <section id="industries" ref={ref} className="section-sheen px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Industries" title={t("industries.title")} subtitle={t("industries.subtitle")} centered />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <span
              key={industry}
              className="industry-chip rounded-full border border-border/70 bg-card/70 px-5 py-2 text-sm font-medium text-foreground shadow-sm"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
})
