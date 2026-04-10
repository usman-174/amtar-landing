import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useTranslation } from "react-i18next"

import { MagneticCard, SectionHeading } from "./home-primitives"

type Props = { shouldRunHeavyAnimations: boolean }

export const HomePhoneSection = forwardRef<HTMLElement, Props>(function HomePhoneSection(
  { shouldRunHeavyAnimations },
  ref
) {
  const { t } = useTranslation()
  const mobilePoints =
    (t("home.mobilePoints", { returnObjects: true }) as string[]) ?? [
      "Live notifications for quote progress and approvals",
      "Mobile invoice tracking with compliance checkpoints",
      "Branch inventory snapshots with instant status sync",
      "Arabic and English optimized interfaces",
    ]

  return (
    <section ref={ref} className="section-sheen px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            kicker={t("home.mobileKicker", { defaultValue: "Mobile Command" })}
            title={t("home.mobileTitle", { defaultValue: "Manage offers, approvals, and delivery from your phone" })}
            subtitle={t("home.mobileSubtitle", {
              defaultValue: "A full mobile experience for field teams and branch managers with real-time updates.",
            })}
          />
          <ul className="mt-8 space-y-4">
            {mobilePoints.map((point) => (
              <li key={point} className="phone-block flex items-start gap-3 text-sm text-slate-200/80">
                <Check className="mt-0.5 h-4 w-4 text-teal-200/90" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          className="phone-block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: shouldRunHeavyAnimations ? 0.9 : 0.6, ease: "easeOut" }}
        >
          <MagneticCard className="p-4">
            <img src="/images/Phones.png" alt="Amtar Mobile App" className="h-auto w-full object-contain" loading="lazy" />
          </MagneticCard>
        </motion.div>
      </div>
    </section>
  )
})
