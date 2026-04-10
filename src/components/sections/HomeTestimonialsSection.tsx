import { forwardRef, useMemo } from "react"
import { Star } from "lucide-react"
import { useTranslation } from "react-i18next"

import { MagneticCard, SectionHeading } from "./home-primitives"
import { testimonialFallback } from "./home-data"

export const HomeTestimonialsSection = forwardRef<HTMLElement>(function HomeTestimonialsSection(_, ref) {
  const { t } = useTranslation()

  const testimonials = useMemo(() => {
    const translated =
      (t("proof.testimonials", { returnObjects: true }) as Array<{ quote: string; author: string; role: string }>) ?? []
    if (translated.length === 3) {
      return translated.map((item, index) => ({
        ...item,
        company: testimonialFallback[index].company,
        logo: testimonialFallback[index].logo,
      }))
    }
    return testimonialFallback
  }, [t])

  return (
    <section ref={ref} className="section-sheen px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker={t("home.testimonialsKicker", { defaultValue: "Testimonials" })}
          title={t("home.testimonialsTitle", { defaultValue: "Trusted by leading teams" })}
          subtitle={t("home.testimonialsSubtitle", {
            defaultValue: "Real companies using Amtar to upgrade delivery speed and commercial control.",
          })}
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <MagneticCard key={item.author} className="testimonial-card p-6">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`${item.author}-star-${index}`} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{item.quote}"</p>
              <div className="mt-6 border-t border-border/60 pt-4">
                <p className="font-semibold text-foreground">{item.author}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold text-primary/85">{item.company}</p>
                  <img src={item.logo} alt={item.company} className="h-7 w-auto object-contain opacity-90" loading="lazy" />
                </div>
              </div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  )
})
