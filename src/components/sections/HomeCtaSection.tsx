import { forwardRef } from "react"
import { ArrowRight, Users2 } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"

export const HomeCtaSection = forwardRef<HTMLElement>(function HomeCtaSection(_, ref) {
  const { t } = useTranslation()

  return (
    <section ref={ref} className="px-4 pb-28 pt-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="cta-block relative overflow-hidden rounded-[2.2rem] border border-border/70 bg-card/60 p-8 shadow-xl shadow-black/10 md:p-14">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.16),transparent_42%),radial-gradient(circle_at_80%_86%,rgba(13,148,136,0.16),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12),transparent_52%)]" />
          <div className="relative z-10 max-w-4xl">
            <p className="cta-block text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">{t("finalCta.kicker")}</p>
            <h2 className="cta-block mt-3 text-3xl font-semibold text-foreground md:text-5xl">{t("finalCta.title")}</h2>
            <p className="cta-block mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{t("finalCta.body")}</p>
            <div className="cta-block mt-8 flex flex-wrap gap-3">
              <Button className="h-12 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25">
                {t("finalCta.primary")}
                <ArrowRight className="ms-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full border-border/70 bg-card/60 px-8 text-foreground/80 hover:bg-card/80 hover:text-foreground"
              >
                <Users2 className="me-2 h-4 w-4" />
                {t("finalCta.secondary")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
