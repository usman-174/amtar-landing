import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslation } from "react-i18next"

import { LandingIntroCurtain } from "@/components/landing/LandingIntroCurtain"
import { NavBar } from "@/components/NavBar"
import { SiteFooter } from "@/components/SiteFooter"
import { V2ScrollProjectGallery } from "@/components/V2ScrollProjectGallery"
import {
  HomeCtaSection,
  HomeDashboardSection,
  HomeHeroSection,
  HomeIndustriesSection,
  HomeInsightsSection,
  HomeOperationsSection,
  HomePhoneSection,
  HomePricingSection,
  HomeProofSection,
  HomeStorySection,
  HomeTestimonialsSection,
  HomeThemesSection,
  HomeWorkflowSection,
} from "@/components/sections"
import { ParticleField } from "@/components/sections/home-primitives"
import { palette } from "@/components/sections/home-data"
import { useMotionPolicy } from "@/hooks/useMotionPolicy"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { i18n } = useTranslation()
  const isRTL = i18n.language.startsWith("ar")
  const { shouldRunHeavyAnimations } = useMotionPolicy()

  const [curtainDone, setCurtainDone] = useState(false)
  const handleCurtainDismiss = useCallback(() => setCurtainDone(true), [])

  const rootRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const workflowRef = useRef<HTMLElement | null>(null)
  const insightsRef = useRef<HTMLElement | null>(null)
  const operationsRef = useRef<HTMLElement | null>(null)
  const industriesRef = useRef<HTMLElement | null>(null)
  const proofRef = useRef<HTMLElement | null>(null)
  const testimonialRef = useRef<HTMLElement | null>(null)
  const themesRef = useRef<HTMLElement | null>(null)
  const phoneRef = useRef<HTMLElement | null>(null)
  const dashboardRef = useRef<HTMLElement | null>(null)
  const pricingRef = useRef<HTMLElement | null>(null)
  const ctaRef = useRef<HTMLElement | null>(null)
  const storyRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll()
  const springProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 130, mass: 0.2 })
  const topBarScale = useTransform(springProgress, [0, 1], [0, 1])

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = isRTL ? "ar" : "en"
  }, [isRTL])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh()

      const fadeUps = gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']")
      fadeUps.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: shouldRunHeavyAnimations ? 34 : 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: shouldRunHeavyAnimations ? 0.84 : 0.55,
            delay: Math.min(index * 0.015, 0.12),
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none reverse" },
          }
        )
      })

      if (!shouldRunHeavyAnimations) return

      gsap.fromTo(
        ".hero-title-line",
        { y: 64, opacity: 0, rotateX: -65 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%" },
        }
      )

      gsap.fromTo(
        ".hero-action",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, scrollTrigger: { trigger: heroRef.current, start: "top 76%" } }
      )

      gsap.fromTo(
        ".workflow-card",
        { y: 80, opacity: 0, rotateY: 10 },
        { y: 0, opacity: 1, rotateY: 0, duration: 0.95, stagger: 0.14, ease: "power3.out", scrollTrigger: { trigger: workflowRef.current, start: "top 72%" } }
      )

      gsap.fromTo(
        ".insight-metric",
        { scale: 0.9, opacity: 0, y: 26 },
        { scale: 1, opacity: 1, y: 0, duration: 0.86, stagger: 0.12, scrollTrigger: { trigger: insightsRef.current, start: "top 74%" } }
      )

      gsap.fromTo(
        ".ops-card",
        { opacity: 0, y: 56, rotateX: -18 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.92, stagger: 0.12, scrollTrigger: { trigger: operationsRef.current, start: "top 70%" } }
      )

      gsap.fromTo(
        ".success-step",
        { x: isRTL ? 80 : -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, stagger: 0.16, scrollTrigger: { trigger: operationsRef.current, start: "top 56%" } }
      )

      gsap.fromTo(
        ".industry-chip",
        { opacity: 0, y: 20, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.6, scrollTrigger: { trigger: industriesRef.current, start: "top 72%" } }
      )

      gsap.fromTo(
        ".proof-badge",
        { opacity: 0, y: 16, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.62, scrollTrigger: { trigger: proofRef.current, start: "top 76%" } }
      )

      gsap.fromTo(
        ".testimonial-card",
        { y: 42, opacity: 0, rotate: -1.5 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.86, stagger: 0.15, scrollTrigger: { trigger: testimonialRef.current, start: "top 74%" } }
      )

      gsap.fromTo(
        ".theme-card",
        { opacity: 0, y: 58, rotateY: 8 },
        { opacity: 1, y: 0, rotateY: 0, duration: 0.9, stagger: 0.12, scrollTrigger: { trigger: themesRef.current, start: "top 72%" } }
      )

      gsap.fromTo(
        ".phone-block",
        { opacity: 0, y: 80, scale: 0.86 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.1)", scrollTrigger: { trigger: phoneRef.current, start: "top 75%" } }
      )

      gsap.fromTo(
        ".dashboard-card",
        { y: 40, opacity: 0, rotateX: -9 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.88, stagger: 0.11, scrollTrigger: { trigger: dashboardRef.current, start: "top 74%" } }
      )

      gsap.fromTo(
        ".price-card",
        { y: 64, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.92, stagger: 0.12, scrollTrigger: { trigger: pricingRef.current, start: "top 73%" } }
      )

      gsap.fromTo(
        ".cta-block",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.92, stagger: 0.1, scrollTrigger: { trigger: ctaRef.current, start: "top 78%" } }
      )

      if (storyRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(".story-card")
        const titles = gsap.utils.toArray<HTMLElement>(".story-title")
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top top",
            end: "+=1400",
            scrub: 1,
            pin: true,
          },
        })

        cards.forEach((card, i) => {
          tl.fromTo(
            card,
            { y: 80, opacity: 0, rotateX: -10, clipPath: "inset(0 0 100% 0 round 24px)" },
            { y: 0, opacity: 1, rotateX: 0, clipPath: "inset(0 0 0% 0 round 24px)", duration: 0.7, ease: "power3.out" },
            i * 0.8
          ).to(
            titles,
            { opacity: (index: number) => (index === i ? 1 : 0.35), duration: 0.3, ease: "power2.out" },
            i * 0.8
          )
        })
      }
    }, root)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((item) => item.kill())
    }
  }, [isRTL, shouldRunHeavyAnimations])

  useEffect(() => {
    if (curtainDone) ScrollTrigger.refresh()
  }, [curtainDone])

  const toggleLanguage = () => i18n.changeLanguage(isRTL ? "en" : "ar")

  const topGradient =
    "linear-gradient(155deg, rgba(59,130,246,0.18) 0%, rgba(45,212,191,0.12) 50%, rgba(56,189,248,0.14) 100%)"

  return (
    <div
      ref={rootRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-hidden bg-slate-900"
      style={{ color: palette.textPrimary }}
    >
      <style>{`
        .glass-panel {
          background: rgba(30, 41, 59, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(18px);
        }
        .text-shadow-soft {
          text-shadow: 0 16px 52px rgba(11,59,255,0.18);
        }
        .section-sheen {
          background-image:
            radial-gradient(circle at 14% 12%, rgba(59,130,246,0.16), transparent 48%),
            radial-gradient(circle at 88% 80%, rgba(45,212,191,0.12), transparent 56%),
            radial-gradient(circle at 50% 50%, rgba(56,189,248,0.08), transparent 58%);
        }
        .grain::before{
          content:"";
          position:absolute;
          inset:-30%;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E");
          opacity:.045;
          mix-blend-mode:overlay;
          pointer-events:none;
          transform:rotate(7deg);
        }
      `}</style>

      <LandingIntroCurtain onDismiss={handleCurtainDismiss} />

      {curtainDone && (
        <motion.div
          className="fixed left-0 right-0 top-0 z-[90] h-1 origin-left bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-400"
          style={{ scaleX: topBarScale }}
        />
      )}

      {curtainDone && <ParticleField enabled={shouldRunHeavyAnimations} />}

      <NavBar onToggleLanguage={toggleLanguage} />

      <main className="relative z-10">
        <HomeHeroSection ref={heroRef} shouldRunHeavyAnimations={shouldRunHeavyAnimations} topGradient={topGradient} autoPlay={curtainDone} />

        <V2ScrollProjectGallery isRTL={isRTL} />

        <HomeStorySection ref={storyRef} />
        <HomeWorkflowSection ref={workflowRef} />
        <HomeInsightsSection ref={insightsRef} shouldRunHeavyAnimations={shouldRunHeavyAnimations} />
        <HomeOperationsSection ref={operationsRef} />
        <HomeIndustriesSection ref={industriesRef} />
        <HomeProofSection ref={proofRef} />
        <HomeTestimonialsSection ref={testimonialRef} />
        <HomeThemesSection ref={themesRef} />
        <HomePhoneSection ref={phoneRef} shouldRunHeavyAnimations={shouldRunHeavyAnimations} />
        <HomeDashboardSection ref={dashboardRef} />
        <HomePricingSection ref={pricingRef} />
        <HomeCtaSection ref={ctaRef} />
      </main>

      <SiteFooter />
    </div>
  )
}
