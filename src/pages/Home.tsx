import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ChevronRight,
  CirclePlay,
  Layers3,
  Sparkles,
  Star,
  TrendingUp,
  Users2,
  Workflow,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/NavBar"
import { useMotionPolicy } from "@/hooks/useMotionPolicy"

gsap.registerPlugin(ScrollTrigger)

type Metric = { label: string; value: number; suffix: string }
type BarPoint = { label: string; value: number }
type StepItem = { title: string; body: string; kpi: string }
type Testimonial = { quote: string; author: string; role: string; company: string; logo: string }
type Plan = { name: string; price: string; period: string; points: string[]; featured?: boolean }

const palette = {
  teal: "#0d9488",
  blue: "#0B3BFF",
  cyan: "#06b6d4",
  ink: "#050B1A",
  ink2: "#071129",
  textPrimary: "#EAF0FF",
  textSecondary: "rgba(234,240,255,0.72)",
}

const workflowFallback: Array<{ title: string; body: string }> = [
  {
    title: "Digital Catalog",
    body: "Publish your complete product and service catalog with specs, SLAs, and branch-level visibility.",
  },
  { title: "Smart Offers", body: "Generate winning quotations with templates and controlled approval paths." },
  { title: "Operational Sync", body: "Coordinate delivery, procurement, and branch inventory from one timeline." },
  { title: "Financial Control", body: "Close the loop with invoicing, compliance, and cashflow analytics." },
]

const operationsFallback: Array<{ title: string; body: string }> = [
  { title: "Branch Synchronization", body: "Route offers and availability between branches with one source of truth." },
  { title: "Procurement Intelligence", body: "Forecast demand movement and optimize sourcing windows before pressure hits." },
  { title: "Execution Visibility", body: "Trace every step from inquiry to compliant invoicing with accountability." },
]

const industriesFallback = [
  "Engineering Offices",
  "Building Materials",
  "Ready Mix Concrete",
  "Crushers & Quarries",
  "Soil Testing Labs",
  "Contracting Companies",
  "Designers",
  "Equipment Rentals",
]

const testimonialFallback: Testimonial[] = [
  {
    quote: "We replaced disconnected spreadsheets with one reliable operating flow across procurement, sales, and finance.",
    author: "Rania Al-Harthy",
    role: "Head of Operations",
    company: "Revibe",
    logo: "/images/revibe.png",
  },
  {
    quote: "Branch teams finally share one source of truth. Quote delivery speed improved within the first month.",
    author: "Khaled Mansour",
    role: "Commercial Director",
    company: "ShopGalaxy",
    logo: "/images/shopgalaxy.jpg",
  },
  {
    quote: "Finance gained cleaner approvals and faster invoice cycles with fewer handoffs and zero ambiguity.",
    author: "Sara Al-Qahtani",
    role: "Finance Controller",
    company: "ShopWise",
    logo: "/images/shopwise.jpg",
  },
]

const plansFallback: Plan[] = [
  { name: "Amtar Basic", price: "Free", period: "Forever", points: ["Catalog", "Supply requests", "Basic invoicing", "One city"] },
  {
    name: "Amtar Growth",
    price: "1609 SAR",
    period: "Annual",
    featured: true,
    points: ["All Saudi cities", "2 team accounts", "Custom domain", "Professional design"],
  },
  {
    name: "Amtar PRO",
    price: "3769 SAR",
    period: "Annual",
    points: ["Instant VAT", "5 team accounts", "Branch management", "Marketplace listing"],
  },
]

const themeShowcase = [
  { title: "Minimal Commerce", image: "/images/theme1.png" },
  { title: "Industrial Grid", image: "/images/theme2.png" },
  { title: "Material Flow", image: "/images/theme3.png" },
  { title: "Executive Premium", image: "/images/theme4.png" },
]

const dashboardProof = [
  "/images/dashboard.png",
  "/images/analytics-dashboard.png",
  "/images/analytics-dashboard1.png",
  "/images/analytics-dashboard2.png",
]

const MagneticCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const relX = event.clientX - rect.left
      const relY = event.clientY - rect.top
      const x = (relX / rect.width - 0.5) * 14
      const y = (relY / rect.height - 0.5) * 14
      element.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateZ(0)`
      element.style.setProperty("--mx", `${relX}px`)
      element.style.setProperty("--my", `${relY}px`)
    }

    const handleLeave = () => {
      element.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
    }

    element.addEventListener("mousemove", handleMove)
    element.addEventListener("mouseleave", handleLeave)
    return () => {
      element.removeEventListener("mousemove", handleMove)
      element.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/35 backdrop-blur-xl transition-transform duration-200 will-change-transform ${
        className ?? ""
      }`}
      style={{ boxShadow: "0 24px 80px rgba(11,59,255,0.14)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), rgba(11,59,255,0.18), transparent 58%)",
        }}
      />
      {children}
    </div>
  )
}

const ParticleField = ({ enabled }: { enabled: boolean }) => {
  const particleRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!enabled) return
    const canvas = particleRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    let raf = 0
    let width = window.innerWidth
    let height = window.innerHeight

    const count = window.innerWidth < 1024 ? 46 : 84
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 2.4,
      speedX: -0.28 + Math.random() * 0.56,
      speedY: -0.18 + Math.random() * 0.36,
      color: [palette.blue, palette.teal][Math.floor(Math.random() * 2)],
    }))

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      particles.forEach((particle, i) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        if (particle.x < -20 || particle.x > width + 20) particle.speedX *= -1
        if (particle.y < -20 || particle.y > height + 20) particle.speedY *= -1

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = particle.color
        context.globalAlpha = 0.16
        context.fill()

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 110) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = palette.blue
            context.globalAlpha = 0.07 * (1 - distance / 110)
            context.lineWidth = 1
            context.stroke()
          }
        }
      })
      context.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [enabled])

  if (!enabled) return null
  return <canvas ref={particleRef} className="pointer-events-none fixed inset-0 z-0 opacity-75" />
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

const RadarViz = ({
  enabled,
  metrics,
}: {
  enabled: boolean
  metrics: Metric[]
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null)

  const points = useMemo(() => {
    const base = metrics.slice(0, 3)
    const values = base.map((m) => {
      const v = typeof m.value === "number" ? m.value : 0
      return clamp01(v / 100)
    })
    return values.length === 3 ? values : [0.72, 0.58, 0.84]
  }, [metrics])

  useLayoutEffect(() => {
    if (!enabled) return
    const root = wrapRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-radar='ring']"),
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: root, start: "top 78%" } }
      )
      gsap.fromTo(
        root.querySelectorAll("[data-radar='poly']"),
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: root, start: "top 78%" } }
      )
      gsap.fromTo(
        root.querySelectorAll("[data-radar='dot']"),
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.8)", scrollTrigger: { trigger: root, start: "top 78%" } }
      )
      gsap.to(root.querySelector("[data-radar='sweep']"), {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 6.5,
        repeat: -1,
        ease: "none",
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [enabled])

  const center = 120
  const radius = 92
  const angles = [-(Math.PI / 2), -(Math.PI / 2) + (2 * Math.PI) / 3, -(Math.PI / 2) + (4 * Math.PI) / 3]

  const xy = points.map((p, i) => {
    const r = radius * (0.24 + 0.76 * p)
    return {
      x: center + Math.cos(angles[i]) * r,
      y: center + Math.sin(angles[i]) * r,
    }
  })

  const poly = `${xy.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}`

  return (
    <div ref={wrapRef} className="relative">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_40%_20%,rgba(11,59,255,0.25),transparent_42%),radial-gradient(circle_at_80%_90%,rgba(13,148,136,0.18),transparent_44%)] opacity-70" />
      <svg viewBox="0 0 240 240" className="relative z-10 h-[260px] w-full">
        <defs>
          <linearGradient id="amtarRadar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(11,59,255,0.95)" />
            <stop offset="0.55" stopColor="rgba(6,182,212,0.78)" />
            <stop offset="1" stopColor="rgba(13,148,136,0.78)" />
          </linearGradient>
          <radialGradient id="amtarGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0" stopColor="rgba(11,59,255,0.30)" />
            <stop offset="1" stopColor="rgba(11,59,255,0)" />
          </radialGradient>
        </defs>

        <circle data-radar="ring" cx={center} cy={center} r={92} fill="url(#amtarGlow)" opacity="0.65" />
        {[92, 66, 40].map((r) => (
          <circle key={r} data-radar="ring" cx={center} cy={center} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        ))}
        {angles.map((a, idx) => (
          <line
            key={idx}
            data-radar="ring"
            x1={center}
            y1={center}
            x2={center + Math.cos(a) * 92}
            y2={center + Math.sin(a) * 92}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
        ))}

        <g data-radar="sweep">
          <path
            d={`M ${center} ${center} L ${center} ${center - 92} A 92 92 0 0 1 ${center + 1} ${center - 92} Z`}
            fill="rgba(11,59,255,0.10)"
          />
        </g>

        <polygon data-radar="poly" points={poly} fill="url(#amtarRadar)" opacity="0.22" />
        <polygon data-radar="poly" points={poly} fill="none" stroke="url(#amtarRadar)" strokeWidth="2" opacity="0.9" />
        {xy.map((p, i) => (
          <g key={i} data-radar="dot">
            <circle cx={p.x} cy={p.y} r="6.5" fill="rgba(11,59,255,0.75)" />
            <circle cx={p.x} cy={p.y} r="3.2" fill="rgba(255,255,255,0.95)" />
          </g>
        ))}
      </svg>
    </div>
  )
}

const HeroScene = ({ enabled }: { enabled: boolean }) => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) return
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.background = null
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 4.2

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(1.08, 1)
    const material = new THREE.MeshStandardMaterial({
      color: palette.blue,
      wireframe: true,
      emissive: palette.cyan,
      emissiveIntensity: 0.12,
      metalness: 0.14,
      roughness: 0.32,
    })
    const ico = new THREE.Mesh(geometry, material)
    scene.add(ico)

    const ringGeo = new THREE.TorusGeometry(1.66, 0.03, 20, 120)
    const ringMat = new THREE.MeshBasicMaterial({ color: palette.teal, transparent: true, opacity: 0.75 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 3.4
    ring.rotation.y = Math.PI / 5
    scene.add(ring)

    const ambient = new THREE.AmbientLight(0xffffff, 0.75)
    const directional = new THREE.DirectionalLight(0xffffff, 1.15)
    directional.position.set(5, 5, 4)
    scene.add(ambient)
    scene.add(directional)

    let raf = 0
    let frame = 0
    const animate = () => {
      frame += 1
      const t = frame * 0.007
      ico.rotation.x = t * 0.7
      ico.rotation.y = t
      ring.rotation.z = t * 0.45
      ico.position.y = Math.sin(t) * 0.08
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      mount.removeChild(renderer.domElement)
      geometry.dispose()
      ringGeo.dispose()
      material.dispose()
      ringMat.dispose()
      renderer.dispose()
    }
  }, [enabled])

  return <div ref={mountRef} className="h-[320px] w-full md:h-[520px]" />
}

const SectionHeading = ({
  kicker,
  title,
  subtitle,
  centered = false,
}: {
  kicker?: string
  title: string
  subtitle?: string
  centered?: boolean
}) => (
  <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
    {kicker ? (
      <p
        data-animate="fade-up"
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: palette.blue }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </p>
    ) : null}
    <h2 data-animate="fade-up" className="text-balance text-3xl font-semibold md:text-5xl" style={{ color: palette.textPrimary }}>
      {title}
    </h2>
    {subtitle ? (
      <p data-animate="fade-up" className="mt-4 text-pretty text-sm leading-relaxed md:text-lg" style={{ color: palette.textSecondary }}>
        {subtitle}
      </p>
    ) : null}
  </div>
)

export default function Home() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language.startsWith("ar")
  const { shouldRunHeavyAnimations } = useMotionPolicy()

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

  const workflowCards =
    (t("horizontal.cards", { returnObjects: true }) as Array<{ title: string; body: string }>) ?? workflowFallback
  const metrics = (t("insights.metrics", { returnObjects: true }) as Metric[]) ?? [
    { label: "Quote Win Rate", value: 86, suffix: "%" },
    { label: "Avg Invoice Cycle", value: 4, suffix: "d" },
    { label: "Monthly Revenue Growth", value: 31, suffix: "%" },
  ]
  const bars = (t("insights.bars", { returnObjects: true }) as BarPoint[]) ?? [
    { label: "Q1", value: 42 },
    { label: "Q2", value: 58 },
    { label: "Q3", value: 74 },
    { label: "Q4", value: 91 },
  ]
  const operationCards =
    (t("operations.pillars", { returnObjects: true }) as Array<{ title: string; body: string }>) ?? operationsFallback
  const successSteps = (t("success.steps", { returnObjects: true }) as StepItem[]) ?? []
  const industries = (t("industries.items", { returnObjects: true }) as string[]) ?? industriesFallback
  const plans = (t("pricing.plans", { returnObjects: true }) as Plan[]) ?? plansFallback

  const testimonials = useMemo(() => {
    const translated =
      ((t("proof.testimonials", { returnObjects: true }) as Array<{ quote: string; author: string; role: string }>) ??
        []) ?? []
    if (translated.length === 3) {
      return translated.map((item, index) => ({
        ...item,
        company: testimonialFallback[index].company,
        logo: testimonialFallback[index].logo,
      }))
    }
    return testimonialFallback
  }, [t])

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
        ".insight-bar",
        { scaleY: 0, transformOrigin: "bottom center" },
        { scaleY: 1, duration: 1, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: insightsRef.current, start: "top 72%" } }
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

  const toggleLanguage = () => i18n.changeLanguage(isRTL ? "en" : "ar")

  const topGradient =
    "linear-gradient(155deg, rgba(37,99,235,0.14) 0%, rgba(13,148,136,0.11) 55%, rgba(2,132,199,0.10) 100%)"

  return (
    <div
      ref={rootRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-hidden bg-slate-950"
      style={{ color: palette.textPrimary }}
    >
      <style>{`
        .glass-panel {
          background: rgba(3, 7, 18, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(18px);
        }
        .text-shadow-soft {
          text-shadow: 0 16px 52px rgba(11,59,255,0.18);
        }
        .section-sheen {
          background-image:
            radial-gradient(circle at 14% 12%, rgba(11,59,255,0.22), transparent 46%),
            radial-gradient(circle at 88% 80%, rgba(13,148,136,0.16), transparent 54%),
            radial-gradient(circle at 50% 50%, rgba(6,182,212,0.10), transparent 55%);
        }
        .grain::before{
          content:"";
          position:absolute;
          inset:-30%;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E");
          opacity:.06;
          mix-blend-mode:multiply;
          pointer-events:none;
          transform:rotate(7deg);
        }
      `}</style>

      <motion.div
        className="fixed left-0 right-0 top-0 z-[90] h-1 origin-left bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-400"
        style={{ scaleX: topBarScale }}
      />

      <ParticleField enabled={shouldRunHeavyAnimations} />

      <NavBar onToggleLanguage={toggleLanguage} />

      <main className="relative z-10">
        <section
          ref={heroRef}
          className="grain section-sheen relative overflow-hidden px-4 pb-24 pt-16 md:px-8 md:pt-24"
          style={{ backgroundImage: topGradient }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl" />
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p
                data-animate="fade-up"
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t("hero.badge")}
              </p>

              <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-tight text-slate-50 md:text-6xl">
                <span className="hero-title-line block text-shadow-soft">{t("hero.title")}</span>
              </h1>

              <p data-animate="fade-up" className="max-w-2xl text-pretty text-base leading-relaxed text-slate-200/75 md:text-lg">
                {t("hero.subtitle")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="hero-action h-12 rounded-full bg-blue-500 px-7 text-white shadow-xl shadow-blue-500/30">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hero-action h-12 rounded-full border-white/15 bg-slate-950/20 px-7 text-teal-200 hover:bg-slate-950/30"
                >
                  <CirclePlay className="me-2 h-4 w-4" />
                  {t("hero.ctaSecondary")}
                </Button>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
                <MagneticCard className="p-5">
                  <p className="text-2xl font-bold text-blue-200">150K+</p>
                  <p className="mt-2 text-sm text-slate-200/70">{t("hero.statsProjects")}</p>
                </MagneticCard>
                <MagneticCard className="p-5">
                  <p className="text-2xl font-bold text-teal-200">620+</p>
                  <p className="mt-2 text-sm text-slate-200/70">{t("hero.statsBranches")}</p>
                </MagneticCard>
              </div>
            </div>

            <motion.div
              data-animate="fade-up"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: shouldRunHeavyAnimations ? 0.8 : 0.55 }}
              className="glass-panel rounded-[2rem] p-3"
            >
              <HeroScene enabled={shouldRunHeavyAnimations} />
            </motion.div>
          </div>
        </section>

        <section ref={storyRef} className="relative px-4 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="story-title text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{t("horizontal.heading")}</p>
                <h2 className="mt-3 text-balance text-3xl font-semibold text-slate-950 md:text-5xl">
                  {t("horizontal.subtitle")}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                  {t("home.storyBody", { defaultValue: "Scroll to reveal the command flow: from catalog to compliant invoicing, with a single operating timeline." })}
                </p>

                <div className="mt-8 space-y-3">
                  {workflowCards.map((card) => (
                    <div
                      key={card.title}
                      className="story-title rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-medium text-slate-100 shadow-sm"
                    >
                      {card.title}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                {workflowCards.map((card, index) => (
                  <div key={card.title} className="story-card">
                    <MagneticCard className="p-7">
                      <div className="flex items-center justify-between">
                        <span className="rounded-xl bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-200">0{index + 1}</span>
                        <Workflow className="h-5 w-5 text-blue-300" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-slate-50">{card.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-200/70">{card.body}</p>
                      <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-blue-600/70 via-teal-500/60 to-cyan-500/40" />
                    </MagneticCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" ref={workflowRef} className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker="Workflow" title={t("horizontal.heading")} subtitle={t("horizontal.subtitle")} />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {workflowCards.map((card, index) => (
                <MagneticCard key={card.title} className="workflow-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-200">0{index + 1}</span>
                    <Workflow className="h-5 w-5 text-blue-300" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-50">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200/70">{card.body}</p>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section id="insights" ref={insightsRef} className="section-sheen px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title={t("insights.title")} subtitle={t("insights.subtitle")} kicker="Insights" />
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-4 md:grid-cols-3">
                {metrics.map((metric) => (
                  <MagneticCard key={metric.label} className="insight-metric p-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-200/65">{metric.label}</p>
                    <p className="mt-4 text-4xl font-bold text-blue-200">
                      {metric.value}
                      {metric.suffix}
                    </p>
                    <div className="mt-5 flex items-center text-xs text-teal-200/90">
                      <TrendingUp className="me-1 h-3.5 w-3.5" />
                      {t("home.liveTracking", { defaultValue: "Live tracking" })}
                    </div>
                  </MagneticCard>
                ))}
              </div>

              <MagneticCard className="p-8">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                      {t("insights.title")}
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-200/65">
                      {t("home.radarBody", {
                        defaultValue: "Monitor momentum across sales, quote conversion, and invoice velocity with a live radar that surfaces drift early.",
                      })}
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {bars.slice(0, 4).map((bar) => (
                        <div key={bar.label} className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3">
                          <p className="text-xs text-slate-200/65">{bar.label}</p>
                          <p className="mt-1 text-lg font-semibold text-slate-50">{bar.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full max-w-sm">
                    <RadarViz enabled={shouldRunHeavyAnimations} metrics={metrics} />
                  </div>
                </div>
              </MagneticCard>
            </div>
          </div>
        </section>

        <section ref={operationsRef} className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title={t("operations.title")} subtitle={t("operations.subtitle")} kicker="Operations" />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {operationCards.map((card, index) => (
                <MagneticCard key={card.title} className="ops-card p-7">
                  <div className="mb-4 inline-flex rounded-xl bg-blue-500/15 p-2 text-blue-200">
                    {index === 0 ? <Building2 className="h-5 w-5" /> : index === 1 ? <BarChart3 className="h-5 w-5" /> : <Layers3 className="h-5 w-5" />}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-50">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200/70">{card.body}</p>
                </MagneticCard>
              ))}
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {(successSteps.length ? successSteps : [
                { title: t("home.step1Title", { defaultValue: "Capture Demand" }), body: t("home.step1Body", { defaultValue: "Collect project requests with specs and routing from one intake point." }), kpi: t("home.step1Kpi", { defaultValue: "Average intake setup: 7 min" }) },
                { title: t("home.step2Title", { defaultValue: "Price and Approve" }), body: t("home.step2Body", { defaultValue: "Build controlled quotations, track revisions, and lock approvals." }), kpi: t("home.step2Kpi", { defaultValue: "Quote turnaround faster by 38%" }) },
                { title: t("home.step3Title", { defaultValue: "Deliver and Invoice" }), body: t("home.step3Body", { defaultValue: "Move from approved quote to delivery and compliant invoicing." }), kpi: t("home.step3Kpi", { defaultValue: "Invoice cycle reduced to 4 days" }) },
              ]).map((step, index) => (
                <MagneticCard key={step.title} className="success-step p-6">
                  <div className="flex items-center gap-3 text-sm font-medium text-blue-200">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-blue-500/10">{index + 1}</span>
                    {step.title}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200/70">{step.body}</p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-teal-200/90">{step.kpi}</p>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" ref={industriesRef} className="section-sheen px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker="Industries" title={t("industries.title")} subtitle={t("industries.subtitle")} centered />
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="industry-chip rounded-full border border-white/10 bg-slate-950/25 px-5 py-2 text-sm font-medium text-slate-100 shadow-sm"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section ref={proofRef} className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker={t("proof.kicker")} title={t("proof.title")} subtitle={t("proof.subtitle")} centered />
            <div className="mt-12 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
              {((t("proof.badges", { returnObjects: true }) as string[]) ?? []).map((badge) => (
                <div
                  key={badge}
                  className="proof-badge rounded-2xl border border-white/10 bg-blue-500/10 px-4 py-3 text-center text-xs font-semibold text-blue-200"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={testimonialRef} className="section-sheen px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker={t("home.testimonialsKicker", { defaultValue: "Testimonials" })} title={t("home.testimonialsTitle", { defaultValue: "Trusted by leading teams" })} subtitle={t("home.testimonialsSubtitle", { defaultValue: "Real companies using Amtar to upgrade delivery speed and commercial control." })} />

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <MagneticCard key={item.author} className="testimonial-card p-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${item.author}-star-${index}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200/80">"{item.quote}"</p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="font-semibold text-slate-50">{item.author}</p>
                    <p className="text-xs text-slate-200/60">{item.role}</p>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold text-blue-200">{item.company}</p>
                      <img
                        src={item.logo}
                        alt={item.company}
                        className="h-7 w-auto object-contain opacity-90"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section ref={themesRef} className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker={t("home.themeKicker", { defaultValue: "Theme Showcase" })} title={t("home.themeTitle", { defaultValue: "Four storefront themes to launch faster" })} subtitle={t("home.themeSubtitle", { defaultValue: "Pick a direction, publish instantly, then customize as you scale." })} />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {themeShowcase.map((theme) => (
                <MagneticCard key={theme.title} className="theme-card overflow-hidden p-0">
                  <img src={theme.image} alt={theme.title} className="h-52 w-full object-cover" loading="lazy" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-slate-50">{theme.title}</h3>
                    <p className="mt-2 text-sm text-slate-200/70">{t("home.themeCardBody", { defaultValue: "Designed for product-heavy construction catalogs." })}</p>
                  </div>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section ref={phoneRef} className="section-sheen px-4 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading kicker={t("home.mobileKicker", { defaultValue: "Mobile Command" })} title={t("home.mobileTitle", { defaultValue: "Manage offers, approvals, and delivery from your phone" })} subtitle={t("home.mobileSubtitle", { defaultValue: "A full mobile experience for field teams and branch managers with real-time updates." })} />
              <ul className="mt-8 space-y-4">
                {(
                  (t("home.mobilePoints", { returnObjects: true }) as string[]) ?? [
                    "Live notifications for quote progress and approvals",
                    "Mobile invoice tracking with compliance checkpoints",
                    "Branch inventory snapshots with instant status sync",
                    "Arabic and English optimized interfaces",
                  ]
                ).map((point) => (
                  <li key={point} className="phone-block flex items-start gap-3 text-sm text-slate-200/80">
                    <Check className="mt-0.5 h-4 w-4 text-teal-200/90" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <motion.div className="phone-block" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: shouldRunHeavyAnimations ? 0.9 : 0.6, ease: "easeOut" }}>
              <MagneticCard className="p-4">
                <img src="/images/Phones.png" alt="Amtar Mobile App" className="h-auto w-full object-contain" loading="lazy" />
              </MagneticCard>
            </motion.div>
          </div>
        </section>

        <section ref={dashboardRef} className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker={t("home.dashboardKicker", { defaultValue: "Dashboard Proof" })} title={t("home.dashboardTitle", { defaultValue: "Operational dashboards that prove execution" })} subtitle={t("home.dashboardSubtitle", { defaultValue: "From quote velocity to invoice health, every metric is visible, filterable, and actionable." })} />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {dashboardProof.map((image, index) => (
                <MagneticCard key={image} className="dashboard-card overflow-hidden p-0">
                  <img src={image} alt={`Dashboard ${index + 1}`} className="h-64 w-full object-cover md:h-72" loading="lazy" />
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" ref={pricingRef} className="section-sheen px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker="Pricing" title={t("pricing.title")} subtitle={t("pricing.subtitle")} centered />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <MagneticCard key={plan.name} className={`price-card p-7 ${plan.featured ? "border-blue-300 bg-blue-50/70" : ""}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-950">{plan.name}</h3>
                    {plan.featured ? (
                      <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                        {t("home.popular", { defaultValue: "Popular" })}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-5 text-3xl font-bold text-blue-200">{plan.price}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-200/60">{plan.period}</p>
                  <ul className="mt-6 space-y-3">
                    {plan.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-slate-200/80">
                        <Check className="mt-0.5 h-4 w-4 text-teal-200/90" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`mt-8 h-11 w-full rounded-full ${
                      plan.featured
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : "bg-slate-950/20 text-blue-200 hover:bg-slate-950/30"
                    }`}
                  >
                    {t("pricing.choose")}
                    <ChevronRight className="ms-2 h-4 w-4" />
                  </Button>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="px-4 pb-28 pt-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="cta-block relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-slate-950/35 p-8 shadow-xl shadow-blue-500/10 md:p-14">
              <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.16),transparent_42%),radial-gradient(circle_at_80%_86%,rgba(13,148,136,0.16),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12),transparent_52%)]" />
              <div className="relative z-10 max-w-4xl">
                <p className="cta-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">{t("finalCta.kicker")}</p>
                <h2 className="cta-block mt-3 text-3xl font-semibold text-slate-50 md:text-5xl">{t("finalCta.title")}</h2>
                <p className="cta-block mt-4 max-w-3xl text-sm leading-relaxed text-slate-200/70 md:text-base">{t("finalCta.body")}</p>
                <div className="cta-block mt-8 flex flex-wrap gap-3">
                  <Button className="h-12 rounded-full bg-blue-500 px-8 text-white shadow-lg shadow-blue-500/30">
                    {t("finalCta.primary")}
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="h-12 rounded-full border-white/15 bg-slate-950/20 px-8 text-teal-200 hover:bg-slate-950/30">
                    <Users2 className="me-2 h-4 w-4" />
                    {t("finalCta.secondary")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/40 px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-slate-200/60 md:flex-row">
          <p>{t("footer.line")}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex items-center gap-1 hover:text-blue-200">
              amtar.sa
            </a>
            <Link to="/contact" className="inline-flex items-center gap-1 hover:text-blue-200">
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

