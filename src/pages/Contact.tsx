import { useLayoutEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, PhoneCall, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { buttonVariants, Button } from "@/components/ui/button"
import { NavBar } from "@/components/NavBar"
import { SiteFooter } from "@/components/SiteFooter"
import { useMotionPolicy } from "@/hooks/useMotionPolicy"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language.startsWith("ar")
  const { shouldRunHeavyAnimations } = useMotionPolicy()

  const rootRef = useRef<HTMLDivElement | null>(null)
  const [status, setStatus] = useState<"idle" | "sent">("idle")

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const fade = gsap.utils.toArray<HTMLElement>("[data-contact-anim='true']")
      fade.forEach((el, index) => {
        gsap.fromTo(
          el,
          { y: shouldRunHeavyAnimations ? 24 : 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: shouldRunHeavyAnimations ? 0.75 : 0.5,
            delay: Math.min(index * 0.04, 0.16),
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        )
      })
    }, root)

    return () => ctx.revert()
  }, [shouldRunHeavyAnimations])

  const toggleLanguage = () => i18n.changeLanguage(isRTL ? "en" : "ar")

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <style>{`
        .glass-panel {
          background: oklch(from var(--card) l c h / 0.72);
          border: 1px solid oklch(from var(--border) l c h / 0.7);
          backdrop-filter: blur(18px);
        }
      `}</style>

      <NavBar onToggleLanguage={toggleLanguage} />

      <main className="relative z-10 px-4 pb-24 pt-14 md:px-8 md:pt-20">
        <section className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-card/60 p-8 shadow-xl shadow-black/10 md:p-14">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 18% 18%, rgba(11,59,255,0.26), transparent 46%), radial-gradient(circle at 86% 80%, rgba(13,148,136,0.18), transparent 46%), linear-gradient(140deg, rgba(15,23,42,0.20), rgba(15,23,42,0.00))",
              }}
            />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p
                  data-contact-anim="true"
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary/90"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {t("contact.badge")}
                </p>

                <h1 data-contact-anim="true" className="mt-5 text-balance text-4xl font-semibold text-foreground md:text-6xl">
                  {t("contact.title")}
                </h1>
                <p data-contact-anim="true" className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {t("contact.subtitle")}
                </p>

                <div className="mt-10 grid gap-3">
                  <div data-contact-anim="true" className="glass-panel flex items-start gap-3 rounded-2xl px-5 py-4">
                    <Mail className="mt-0.5 h-5 w-5 text-primary/90" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t("contact.emailLabel")}</p>
                      <a className="text-sm text-muted-foreground hover:text-primary" href="mailto:hello@amtar.sa">
                        hello@amtar.sa
                      </a>
                    </div>
                  </div>
                  <div data-contact-anim="true" className="glass-panel flex items-start gap-3 rounded-2xl px-5 py-4">
                    <PhoneCall className="mt-0.5 h-5 w-5 text-primary/90" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t("contact.phoneLabel")}</p>
                      <a className="text-sm text-muted-foreground hover:text-primary" href="tel:+966500000000">
                        +966 50 000 0000
                      </a>
                    </div>
                  </div>
                  <div data-contact-anim="true" className="glass-panel flex items-start gap-3 rounded-2xl px-5 py-4">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary/90" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t("contact.locationLabel")}</p>
                      <p className="text-sm text-muted-foreground">{t("contact.locationValue")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div data-contact-anim="true" className="glass-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
                <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

                <form
                  className="relative z-10 grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setStatus("sent")
                  }}
                >
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-foreground/80">{t("contact.form.name")}</label>
                    <input
                      required
                      className="h-11 rounded-xl border border-border/70 bg-card/60 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
                      name="name"
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-foreground/80">{t("contact.form.email")}</label>
                    <input
                      required
                      type="email"
                      className="h-11 rounded-xl border border-border/70 bg-card/60 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
                      name="email"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-foreground/80">{t("contact.form.message")}</label>
                    <textarea
                      required
                      className="min-h-32 resize-none rounded-xl border border-border/70 bg-card/60 px-4 py-3 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
                      name="message"
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <Button className="h-11 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25" type="submit">
                      {t("contact.form.submit")}
                    </Button>
                    <a
                      href="mailto:hello@amtar.sa?subject=Amtar%20Inquiry"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "h-11 rounded-full border-border/70 bg-card/60 px-7 text-foreground/80 hover:bg-card/80 hover:text-foreground"
                      )}
                    >
                      {t("contact.form.emailUs")}
                    </a>
                  </div>

                  {status === "sent" ? (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-sm text-primary/90">
                      {t("contact.form.sent")}
                    </motion.p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter useAbsoluteHash />
    </div>
  )
}

