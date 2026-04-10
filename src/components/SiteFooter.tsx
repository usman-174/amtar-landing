import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { useMotionPolicy } from "@/hooks/useMotionPolicy"

type SiteFooterProps = {
  /** When true, in-page hash links use `/#section` so they work from other routes */
  useAbsoluteHash?: boolean
}

export function SiteFooter({ useAbsoluteHash = false }: SiteFooterProps) {
  const { t } = useTranslation()
  const { shouldRunHeavyAnimations } = useMotionPolicy()

  const h = (id: string) => (useAbsoluteHash ? `/#${id}` : `#${id}`)

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-slate-800/90 via-slate-900 to-slate-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 90% 50% at 50% -20%, rgba(59,130,246,0.12), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 80%, rgba(20,184,166,0.08), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div className="flex flex-col">
            <Link to="/" className="inline-flex w-fit items-center gap-3">
              <img src="/images/amtar-logo.png" alt="Amtar" className="h-11 w-auto" />
              <span className="text-lg font-semibold tracking-tight text-white">Amtar</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">{t("footerPremium.tagline")}</p>
            <p className="mt-2 text-xs text-slate-500">{t("footer.line")}</p>

            <div className="relative mt-8 flex items-end gap-4">
              <motion.div
                className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/10 blur-xl" />
                <motion.img
                  src="/images/constructionRobot.png"
                  alt={t("footerPremium.robotAlt")}
                  className="relative z-10 h-full w-full object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
                  animate={
                    shouldRunHeavyAnimations
                      ? { y: [0, -5, 0], rotate: [0, -1.5, 0] }
                      : {}
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <p className="mb-1 max-w-[200px] text-xs leading-relaxed text-slate-400">{t("footerPremium.robotCaption")}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">{t("footerPremium.colProduct")}</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>
                <a href={h("workflow")} className="transition hover:text-white">
                  {t("footerPremium.linkWorkflow")}
                </a>
              </li>
              <li>
                <a href={h("insights")} className="transition hover:text-white">
                  {t("footerPremium.linkInsights")}
                </a>
              </li>
              <li>
                <a href={h("industries")} className="transition hover:text-white">
                  {t("footerPremium.linkIndustries")}
                </a>
              </li>
              <li>
                <a href={h("pricing")} className="transition hover:text-white">
                  {t("footerPremium.linkPricing")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200/90">{t("footerPremium.colCompany")}</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>
                <Link to="/contact" className="transition hover:text-white">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <a href="mailto:hello@amtar.sa" className="transition hover:text-white">
                  hello@amtar.sa
                </a>
              </li>
              <li>
                <span className="text-slate-500">{t("footerPremium.office")}</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t("footerPremium.colLegal")}</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="transition hover:text-slate-200">
                  {t("footerPremium.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-slate-200">
                  {t("footerPremium.terms")}
                </a>
              </li>
            </ul>
            <a
              href="https://amtar.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full border border-white/15 bg-slate-800/50 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-blue-400/30 hover:bg-slate-800/80"
            >
              amtar.sa
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-center text-xs text-slate-500 md:text-start">{t("footerPremium.rights")}</p>
          <p className="text-xs text-slate-600">{t("footerPremium.madeIn")}</p>
        </div>
      </div>
    </footer>
  )
}
