import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { Sparkles } from "lucide-react"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"

import { palette } from "./home-data"
import type { Metric } from "./home-types"

gsap.registerPlugin(ScrollTrigger)

export function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
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
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/12 bg-slate-800/50 backdrop-blur-xl transition-transform duration-200 will-change-transform",
        className
      )}
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

export function ParticleField({ enabled }: { enabled: boolean }) {
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

    const count = window.innerWidth < 1024 ? 30 : 50
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

        const connDist = 100
        const connDistSq = connDist * connDist
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distSq = dx * dx + dy * dy
          if (distSq < connDistSq) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = palette.blue
            context.globalAlpha = 0.07 * (1 - Math.sqrt(distSq) / connDist)
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

export function RadarViz({ enabled, metrics }: { enabled: boolean; metrics: Metric[] }) {
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
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 78%" },
        }
      )
      gsap.fromTo(
        root.querySelectorAll("[data-radar='poly']"),
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: root, start: "top 78%" } }
      )
      gsap.fromTo(
        root.querySelectorAll("[data-radar='dot']"),
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: root, start: "top 78%" },
        }
      )
      const sweep = root.querySelector("[data-radar='sweep']")
      if (sweep) {
        gsap.to(sweep, {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 6.5,
          repeat: -1,
          ease: "none",
        })
      }
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

export function HeroScene({ enabled, className }: { enabled: boolean; className?: string }) {
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
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

  return <div ref={mountRef} className={cn("h-[320px] w-full md:h-[520px]", className)} />
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  centered = false,
}: {
  kicker?: string
  title: string
  subtitle?: string
  centered?: boolean
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {kicker ? (
        <p
          data-animate="fade-up"
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-slate-800/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200"
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
}
