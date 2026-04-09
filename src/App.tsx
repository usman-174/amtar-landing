import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ChevronRight,
  CirclePlay,
  Globe2,
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

import "./i18n"
import { Button } from "@/components/ui/button"
import { renderCanvas } from "./components/ui/canvas"

gsap.registerPlugin(ScrollTrigger)

type Metric = {
  label: string
  value: number
  suffix: string
}

type BarPoint = {
  label: string
  value: number
}

type StepItem = {
  title: string
  body: string
  kpi: string
}

type Testimonial = {
  quote: string
  author: string
  role: string
  company: string
  logo: string
}

type Plan = {
  name: string
  price: string
  period: string
  points: string[]
  featured?: boolean
}

const colors = {
  teal: "#0d9488",
  blue: "#2563eb",
  violet: "#7c3aed",
  textPrimary: "#1e293b",
  textSecondary: "#475569",
}

const workflowFallback: Array<{ title: string; body: string }> = [
  {
    title: "Digital Catalog",
    body: "Publish your complete product and service catalog with specs, SLAs, and branch-level visibility.",
  },
  {
    title: "Smart Offers",
    body: "Generate winning quotations with templates, approval paths, and controlled margin visibility.",
  },
  {
    title: "Operational Sync",
    body: "Coordinate delivery, procurement, and branch inventory from one timeline across the organization.",
  },
  {
    title: "Financial Control",
    body: "Close the loop with invoicing, tax compliance, and cashflow analytics in a single command center.",
  },
]

const operationsFallback: Array<{ title: string; body: string }> = [
  {
    title: "Branch Synchronization",
    body: "Share stock and pricing signals between branches without manual reconciliation overhead.",
  },
  {
    title: "Procurement Intelligence",
    body: "Forecast demand movement and optimize sourcing windows before pressure reaches fulfillment teams.",
  },
  {
    title: "Execution Visibility",
    body: "Trace every step from inquiry to compliant invoicing with role-based accountability.",
  },
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
    quote:
      "We replaced disconnected spreadsheets with one reliable operating flow across procurement, sales, and finance.",
    author: "Rania Al-Harthy",
    role: "Head of Operations",
    company: "Revibe",
    logo: "/images/revibe.png",
  },
  {
    quote:
      "Branch teams finally share one source of truth. Quote delivery speed improved within the first month.",
    author: "Khaled Mansour",
    role: "Commercial Director",
    company: "ShopGalaxy",
    logo: "/images/shopgalaxy.jpg",
  },
  {
    quote:
      "Finance gained cleaner approvals and faster invoice cycles with fewer handoffs and zero process ambiguity.",
    author: "Sara Al-Qahtani",
    role: "Finance Controller",
    company: "ShopWise",
    logo: "/images/shopwise.jpg",
  },
]

const plansFallback: Plan[] = [
  {
    name: "Amtar Basic",
    price: "Free",
    period: "Forever",
    points: [
      "Digital catalog",
      "Supply requests",
      "Basic invoicing",
      "Single branch operations",
    ],
  },
  {
    name: "Amtar Growth",
    price: "1609 SAR",
    period: "Annual",
    featured: true,
    points: [
      "All Saudi cities",
      "2 team seats",
      "Custom storefront",
      "Advanced analytics",
    ],
  },
  {
    name: "Amtar PRO",
    price: "3769 SAR",
    period: "Annual",
    points: [
      "5 team seats",
      "Branch controls",
      "Marketplace publishing",
      "ZATCA operations toolkit",
    ],
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

const MagneticCard = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = cardRef.current
    if (!element) {
      return
    }

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const relX = event.clientX - rect.left
      const relY = event.clientY - rect.top
      const x = (relX / rect.width - 0.5) * 16
      const y = (relY / rect.height - 0.5) * 16
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
      className={`group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-sm transition-transform duration-200 will-change-transform ${className ?? ""}`}
      style={{
        boxShadow: "0 18px 40px rgba(37,99,235,0.12)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx) var(--my), rgba(37,99,235,0.18), transparent 58%)",
        }}
      />
      {children}
    </div>
  )
}

const CursorTrail = () => {
  const [dots, setDots] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let id = 0
    const limit = 16

    const handleMove = (event: MouseEvent) => {
      const next = { x: event.clientX, y: event.clientY, id: id++ }
      setDots((prev) => [next, ...prev].slice(0, limit))
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      {dots.map((dot, index) => (
        <motion.span
          key={dot.id}
          className="absolute block rounded-full"
          initial={{ opacity: 0.75, scale: 1 }}
          animate={{ opacity: 0.08, scale: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            left: dot.x,
            top: dot.y,
            width: Math.max(4, 12 - index / 1.6),
            height: Math.max(4, 12 - index / 1.6),
            background: index % 3 === 0 ? colors.teal : index % 3 === 1 ? colors.blue : colors.violet,
            transform: "translate(-50%, -50%)",
            filter: "blur(0.2px)",
          }}
        />
      ))}
    </div>
  )
}

const ParticleField = () => {
  const particleRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = particleRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext("2d")
    if (!context) {
      return
    }

    let raf = 0
    let width = window.innerWidth
    let height = window.innerHeight

    const particles = Array.from({ length: 84 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 2.6,
      speedX: -0.35 + Math.random() * 0.7,
      speedY: -0.25 + Math.random() * 0.5,
      color: [colors.blue, colors.teal, colors.violet][Math.floor(Math.random() * 3)],
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

        if (particle.x < -20 || particle.x > width + 20) {
          particle.speedX *= -1
        }
        if (particle.y < -20 || particle.y > height + 20) {
          particle.speedY *= -1
        }

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = particle.color
        context.globalAlpha = 0.18
        context.fill()

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 108) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = colors.blue
            context.globalAlpha = 0.08 * (1 - distance / 108)
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
  }, [])

  return <canvas ref={particleRef} className="pointer-events-none fixed inset-0 z-0 opacity-80" />
}

const HeroScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }

    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 4.2

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(1.08, 1)
    const material = new THREE.MeshStandardMaterial({
      color: colors.blue,
      wireframe: true,
      emissive: colors.violet,
      emissiveIntensity: 0.18,
      metalness: 0.16,
      roughness: 0.28,
    })
    const ico = new THREE.Mesh(geometry, material)
    scene.add(ico)

    const ringGeo = new THREE.TorusGeometry(1.66, 0.03, 20, 120)
    const ringMat = new THREE.MeshBasicMaterial({ color: colors.teal, transparent: true, opacity: 0.75 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 3.4
    ring.rotation.y = Math.PI / 5
    scene.add(ring)

    const ambient = new THREE.AmbientLight(0xffffff, 0.75)
    const directional = new THREE.DirectionalLight(0xffffff, 1.15)
    directional.position.set(5, 5, 4)
    scene.add(ambient)
    scene.add(directional)

    let frame = 0
    const animate = () => {
      frame += 1
      const t = frame * 0.007
      ico.rotation.x = t * 0.7
      ico.rotation.y = t
      ring.rotation.z = t * 0.45
      ico.position.y = Math.sin(t) * 0.08
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      mount.removeChild(renderer.domElement)
      geometry.dispose()
      ringGeo.dispose()
      material.dispose()
      ringMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="h-[340px] w-full md:h-[520px]" />
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
        style={{ color: colors.blue }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {kicker}
      </p>
    ) : null}
    <h2
      data-animate="fade-up"
      className="text-balance text-3xl font-semibold md:text-5xl"
      style={{ color: colors.textPrimary }}
    >
      {title}
    </h2>
    {subtitle ? (
      <p
        data-animate="fade-up"
        className="mt-4 text-pretty text-sm leading-relaxed md:text-lg"
        style={{ color: colors.textSecondary }}
      >
        {subtitle}
      </p>
    ) : null}
  </div>
)

export function App() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language.startsWith("ar")
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

  const { scrollYProgress } = useScroll()
  const springProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 130,
    mass: 0.2,
  })
  const topBarScale = useTransform(springProgress, [0, 1], [0, 1])

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = isRTL ? "ar" : "en"
  }, [isRTL])

  useEffect(() => {
    renderCanvas()
  }, [])

  const workflowCards =
    (t("horizontal.cards", { returnObjects: true }) as Array<{ title: string; body: string }>) ??
    workflowFallback
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
    (t("operations.pillars", { returnObjects: true }) as Array<{ title: string; body: string }>) ??
    operationsFallback
  const successSteps = (t("success.steps", { returnObjects: true }) as StepItem[]) ?? [
    {
      title: "Capture Demand",
      body: "Collect requests and specs in one place with branch routing and accountability.",
      kpi: "Average setup: 7 min",
    },
    {
      title: "Price and Approve",
      body: "Create controlled quotations and lock approvals with role-based governance.",
      kpi: "38% faster turnaround",
    },
    {
      title: "Deliver and Invoice",
      body: "Ship and invoice with compliance alignment and minimal manual handoff.",
      kpi: "Cycle reduced to 4 days",
    },
  ]
  const industries = (t("industries.items", { returnObjects: true }) as string[]) ?? industriesFallback
  const plans = (t("pricing.plans", { returnObjects: true }) as Plan[]) ?? plansFallback

  const testimonials = useMemo(() => {
    const translated = (t("proof.testimonials", { returnObjects: true }) as
      | Array<{ quote: string; author: string; role: string }>
      | undefined) ?? []

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
    if (!root) {
      return
    }

    const context = gsap.context(() => {
      const fadeUps = gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']")
      fadeUps.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.84,
            delay: Math.min(index * 0.02, 0.18),
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

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
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
        }
      )

      gsap.fromTo(
        ".hero-action",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 76%",
          },
        }
      )

      gsap.fromTo(
        ".workflow-card",
        { y: 80, opacity: 0, rotateY: 10 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: workflowRef.current,
            start: "top 72%",
          },
        }
      )

      gsap.fromTo(
        ".insight-metric",
        { scale: 0.85, opacity: 0, y: 26 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.86,
          stagger: 0.12,
          scrollTrigger: {
            trigger: insightsRef.current,
            start: "top 74%",
          },
        }
      )

      gsap.fromTo(
        ".insight-bar",
        { scaleY: 0, transformOrigin: "bottom center" },
        {
          scaleY: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: insightsRef.current,
            start: "top 72%",
          },
        }
      )

      gsap.fromTo(
        ".ops-card",
        { opacity: 0, y: 56, rotateX: -22 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.92,
          stagger: 0.12,
          scrollTrigger: {
            trigger: operationsRef.current,
            start: "top 70%",
          },
        }
      )

      gsap.fromTo(
        ".success-step",
        { x: isRTL ? 80 : -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.16,
          scrollTrigger: {
            trigger: operationsRef.current,
            start: "top 56%",
          },
        }
      )

      gsap.fromTo(
        ".industry-chip",
        { opacity: 0, y: 20, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          scrollTrigger: {
            trigger: industriesRef.current,
            start: "top 72%",
          },
        }
      )

      gsap.fromTo(
        ".proof-badge",
        { opacity: 0, y: 16, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.62,
          scrollTrigger: {
            trigger: proofRef.current,
            start: "top 76%",
          },
        }
      )

      gsap.fromTo(
        ".testimonial-card",
        { y: 42, opacity: 0, rotate: -1.5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.86,
          stagger: 0.15,
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 74%",
          },
        }
      )

      gsap.fromTo(
        ".logo-float",
        { opacity: 0, y: 20, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 70%",
          },
        }
      )

      gsap.fromTo(
        ".theme-card",
        { opacity: 0, y: 58, rotateY: 8 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.9,
          stagger: 0.12,
          scrollTrigger: {
            trigger: themesRef.current,
            start: "top 72%",
          },
        }
      )

      gsap.fromTo(
        ".phone-block",
        { opacity: 0, y: 80, scale: 0.82 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.1)",
          scrollTrigger: {
            trigger: phoneRef.current,
            start: "top 75%",
          },
        }
      )

      gsap.fromTo(
        ".dashboard-card",
        { y: 40, opacity: 0, rotateX: -9 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.88,
          stagger: 0.11,
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: "top 74%",
          },
        }
      )

      gsap.fromTo(
        ".price-card",
        { y: 64, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.92,
          stagger: 0.12,
          scrollTrigger: {
            trigger: pricingRef.current,
            start: "top 73%",
          },
        }
      )

      gsap.fromTo(
        ".cta-block",
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.92,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 78%",
          },
        }
      )

      // Additional section-level triggers to exceed 20 distinct scroll animations.
      const sectionRefs = [
        heroRef.current,
        workflowRef.current,
        insightsRef.current,
        operationsRef.current,
        industriesRef.current,
        proofRef.current,
        testimonialRef.current,
        themesRef.current,
        phoneRef.current,
        dashboardRef.current,
        pricingRef.current,
        ctaRef.current,
      ]

      sectionRefs.forEach((section, index) => {
        if (!section) {
          return
        }

        gsap.fromTo(
          section,
          { backgroundPositionY: "0%" },
          {
            backgroundPositionY: `${8 + index * 2}%`,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      })
    }, root)

    return () => {
      context.revert()
      ScrollTrigger.getAll().forEach((item) => item.kill())
    }
  }, [isRTL])

  const toggleLanguage = () => {
    i18n.changeLanguage(isRTL ? "en" : "ar")
  }

  const topGradient =
    "linear-gradient(155deg, rgba(37,99,235,0.14) 0%, rgba(13,148,136,0.11) 45%, rgba(124,58,237,0.12) 100%)"

  return (
    <div
      ref={rootRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-hidden bg-slate-50"
      style={{ color: colors.textPrimary }}
    >
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(148, 163, 184, 0.24);
          backdrop-filter: blur(14px);
        }
        .text-shadow-soft {
          text-shadow: 0 6px 24px rgba(37,99,235,0.12);
        }
        .section-sheen {
          background-image: radial-gradient(circle at 16% 12%, rgba(37,99,235,0.1), transparent 42%),
            radial-gradient(circle at 88% 80%, rgba(13,148,136,0.12), transparent 50%);
        }
      `}</style>

      <motion.div
        className="fixed left-0 right-0 top-0 z-[90] h-1 origin-left bg-gradient-to-r from-teal-500 via-blue-600 to-violet-600"
        style={{ scaleX: topBarScale }}
      />

      <ParticleField />
      <CursorTrail />
      <canvas id="canvas" className="pointer-events-none fixed inset-0 z-[70] opacity-[0.33]" />

      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <img src="/images/amtar-logo.png" alt="Amtar" className="h-10 w-auto" />
            <span className="text-sm font-semibold tracking-wide text-slate-700">Amtar</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#workflow" className="transition hover:text-blue-700">
              {t("nav.solutions")}
            </a>
            <a href="#insights" className="transition hover:text-blue-700">
              {t("nav.insights")}
            </a>
            <a href="#industries" className="transition hover:text-blue-700">
              {t("nav.industries")}
            </a>
            <a href="#pricing" className="transition hover:text-blue-700">
              {t("nav.pricing")}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full border-blue-200 bg-white px-5 text-blue-700"
              onClick={toggleLanguage}
            >
              <Globe2 className="mr-2 h-4 w-4" />
              {isRTL ? "EN" : "AR"}
            </Button>
            <Button className="hidden rounded-full bg-blue-600 px-6 text-white shadow-lg shadow-blue-500/30 md:inline-flex">
              {t("hero.ctaPrimary")}
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section
          ref={heroRef}
          className="section-sheen relative overflow-hidden px-4 pb-24 pt-16 md:px-8 md:pt-24"
          style={{ backgroundImage: topGradient }}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p
                data-animate="fade-up"
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t("hero.badge")}
              </p>

              <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
                <span className="hero-title-line block text-shadow-soft">{t("hero.title")}</span>
              </h1>

              <p
                data-animate="fade-up"
                className="max-w-2xl text-pretty text-base leading-relaxed text-slate-600 md:text-lg"
              >
                {t("hero.subtitle")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="hero-action h-12 rounded-full bg-blue-600 px-7 text-white shadow-xl shadow-blue-500/30">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hero-action h-12 rounded-full border-teal-300 bg-white px-7 text-teal-700"
                >
                  <CirclePlay className="me-2 h-4 w-4" />
                  {t("hero.ctaSecondary")}
                </Button>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
                <MagneticCard className="p-5">
                  <p className="text-2xl font-bold text-blue-700">150K+</p>
                  <p className="mt-2 text-sm text-slate-600">{t("hero.statsProjects")}</p>
                </MagneticCard>
                <MagneticCard className="p-5">
                  <p className="text-2xl font-bold text-teal-700">620+</p>
                  <p className="mt-2 text-sm text-slate-600">{t("hero.statsBranches")}</p>
                </MagneticCard>
              </div>
            </div>

            <motion.div
              data-animate="fade-up"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8 }}
              className="glass-panel rounded-[2rem] p-3"
            >
              <HeroScene />
            </motion.div>
          </div>
        </section>

        <section id="workflow" ref={workflowRef} className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              kicker="Workflow"
              title={t("horizontal.heading")}
              subtitle={t("horizontal.subtitle")}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {workflowCards.map((card, index) => (
                <MagneticCard key={card.title} className="workflow-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      0{index + 1}
                    </span>
                    <Workflow className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
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
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                    <p className="mt-4 text-4xl font-bold text-blue-700">
                      {metric.value}
                      {metric.suffix}
                    </p>
                    <div className="mt-5 flex items-center text-xs text-teal-700">
                      <TrendingUp className="me-1 h-3.5 w-3.5" />
                      Live tracking
                    </div>
                  </MagneticCard>
                ))}
              </div>

              <MagneticCard className="p-8">
                <div className="flex h-64 items-end justify-between gap-3 md:h-72">
                  {bars.map((bar, index) => (
                    <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="insight-bar w-full rounded-t-xl bg-gradient-to-t from-blue-600 via-teal-500 to-violet-500"
                        style={{
                          height: `${Math.max(18, bar.value)}%`,
                          opacity: 0.9 - index * 0.1,
                        }}
                      />
                      <span className="text-xs text-slate-500">{bar.label}</span>
                    </div>
                  ))}
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
                  <div className="mb-4 inline-flex rounded-xl bg-violet-100 p-2 text-violet-700">
                    {index === 0 ? (
                      <Building2 className="h-5 w-5" />
                    ) : index === 1 ? (
                      <BarChart3 className="h-5 w-5" />
                    ) : (
                      <Layers3 className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
                </MagneticCard>
              ))}
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {successSteps.map((step, index) => (
                <MagneticCard key={step.title} className="success-step p-6">
                  <div className="flex items-center gap-3 text-sm font-medium text-blue-700">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50">
                      {index + 1}
                    </span>
                    {step.title}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{step.body}</p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">{step.kpi}</p>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" ref={industriesRef} className="section-sheen px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              kicker="Industries"
              title={t("industries.title")}
              subtitle={t("industries.subtitle")}
              centered
            />

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="industry-chip rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section ref={proofRef} className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              kicker={t("proof.kicker")}
              title={t("proof.title")}
              subtitle={t("proof.subtitle")}
              centered
            />

            <div className="mt-12 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
              {((t("proof.badges", { returnObjects: true }) as string[]) ?? []).map((badge) => (
                <div
                  key={badge}
                  className="proof-badge rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-center text-xs font-semibold text-blue-700"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={testimonialRef} className="section-sheen px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              kicker="Testimonials"
              title="Trusted by leading teams"
              subtitle="Real companies using Amtar to upgrade commercial control and delivery speed."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {testimonials.map((item) => (
                <div
                  key={`${item.company}-logo`}
                  className="logo-float glass-panel flex items-center justify-center rounded-2xl px-6 py-4"
                >
                  <img src={item.logo} alt={item.company} className="h-10 w-auto object-contain" />
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <MagneticCard key={item.author} className="testimonial-card p-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${item.author}-star-${index}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">"{item.quote}"</p>
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="font-semibold text-slate-900">{item.author}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                    <p className="text-xs font-semibold text-blue-700">{item.company}</p>
                  </div>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section ref={themesRef} className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              kicker="Theme Showcase"
              title="Four storefront themes to launch faster"
              subtitle="Pick a visual direction, publish instantly, and customize as your business scales."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {themeShowcase.map((theme) => (
                <MagneticCard key={theme.title} className="theme-card overflow-hidden p-0">
                  <img src={theme.image} alt={theme.title} className="h-52 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-slate-900">{theme.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">Designed for product-heavy construction catalogs.</p>
                  </div>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section ref={phoneRef} className="section-sheen px-4 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                kicker="Mobile Command"
                title="Manage offers, approvals, and delivery from your phone"
                subtitle="A full mobile experience for field teams and branch managers with real-time updates."
              />

              <ul className="mt-8 space-y-4">
                {[
                  "Live notifications for quote progress and approvals",
                  "Mobile invoice tracking with compliance checkpoints",
                  "Branch inventory snapshots with instant status sync",
                  "Arabic and English optimized interfaces",
                ].map((point) => (
                  <li key={point} className="phone-block flex items-start gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 text-teal-600" />
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
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <MagneticCard className="p-4">
                <img src="/images/Phones.png" alt="Amtar Mobile App" className="h-auto w-full object-contain" />
              </MagneticCard>
            </motion.div>
          </div>
        </section>

        <section ref={dashboardRef} className="px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              kicker="Dashboard Proof"
              title="Operational dashboards that prove execution"
              subtitle="From quote velocity to invoice health, every metric is visible, filterable, and actionable."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {dashboardProof.map((image, index) => (
                <MagneticCard key={image} className="dashboard-card overflow-hidden p-0">
                  <img
                    src={image}
                    alt={`Dashboard ${index + 1}`}
                    className="h-64 w-full object-cover md:h-72"
                    loading="lazy"
                  />
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" ref={pricingRef} className="section-sheen px-4 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              kicker="Pricing"
              title={t("pricing.title")}
              subtitle={t("pricing.subtitle")}
              centered
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <MagneticCard
                  key={plan.name}
                  className={`price-card p-7 ${plan.featured ? "border-blue-300 bg-blue-50/70" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                    {plan.featured ? (
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        Popular
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-5 text-3xl font-bold text-blue-700">{plan.price}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{plan.period}</p>

                  <ul className="mt-6 space-y-3">
                    {plan.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 text-teal-600" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`mt-8 h-11 w-full rounded-full ${
                      plan.featured
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-white text-blue-700"
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
            <div className="cta-block relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-blue-500/10 md:p-14">
              <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.16),transparent_42%),radial-gradient(circle_at_80%_86%,rgba(13,148,136,0.16),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.13),transparent_50%)]" />

              <div className="relative z-10 max-w-4xl">
                <p className="cta-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  {t("finalCta.kicker")}
                </p>
                <h2 className="cta-block mt-3 text-3xl font-semibold text-slate-900 md:text-5xl">
                  {t("finalCta.title")}
                </h2>
                <p className="cta-block mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                  {t("finalCta.body")}
                </p>

                <div className="cta-block mt-8 flex flex-wrap gap-3">
                  <Button className="h-12 rounded-full bg-blue-600 px-8 text-white shadow-lg shadow-blue-500/30">
                    {t("finalCta.primary")}
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="h-12 rounded-full border-teal-300 bg-white px-8 text-teal-700">
                    <Users2 className="me-2 h-4 w-4" />
                    {t("finalCta.secondary")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80 px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 md:flex-row">
          <p>{t("footer.line")}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex items-center gap-1 hover:text-blue-700">
              <Globe2 className="h-4 w-4" />
              amtar.sa
            </a>
            <a href="#" className="inline-flex items-center gap-1 hover:text-blue-700">
              <Users2 className="h-4 w-4" />
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
