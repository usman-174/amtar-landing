import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Globe2, Menu, Moon, Sun, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import gsap from "gsap"
import { AnimatePresence, motion } from "framer-motion"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMotionPolicy } from "@/hooks/useMotionPolicy"
import { useTheme } from "@/components/theme-provider"

type NavItem = {
  key: string
  label: string
  to: string
  kind: "route" | "section"
}

function isHomePath(pathname: string) {
  return pathname === "/" || pathname === ""
}

export function NavBar({
  onToggleLanguage,
}: {
  onToggleLanguage: () => void
}) {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language.startsWith("ar")
  const { shouldRunHeavyAnimations } = useMotionPolicy()
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const resolvedIsDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const items: NavItem[] = useMemo(
    () => [
      { key: "solutions", label: t("nav.solutions"), to: "workflow", kind: "section" },
      { key: "insights", label: t("nav.insights"), to: "insights", kind: "section" },
      { key: "industries", label: t("nav.industries"), to: "industries", kind: "section" },
      { key: "pricing", label: t("nav.pricing"), to: "pricing", kind: "section" },
      { key: "contact", label: t("nav.contact"), to: "/contact", kind: "route" },
    ],
    [t]
  )

  const rootRef = useRef<HTMLDivElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const pillRef = useRef<HTMLDivElement | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const runToSection = (id: string) => {
    const go = () => {
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior: shouldRunHeavyAnimations ? "smooth" : "auto", block: "start" })
    }

    if (isHomePath(location.pathname)) {
      go()
      return
    }

    navigate(`/#${id}`)
    window.setTimeout(go, 30)
  }

  useEffect(() => {
    const hash = location.hash?.replace("#", "")
    if (!hash) return
    const el = document.getElementById(hash)
    if (!el) return
    el.scrollIntoView({ behavior: shouldRunHeavyAnimations ? "smooth" : "auto", block: "start" })
  }, [location.hash, shouldRunHeavyAnimations])

  useLayoutEffect(() => {
    if (!shouldRunHeavyAnimations) return
    const rail = railRef.current
    const pill = pillRef.current
    if (!rail || !pill) return

    const ctx = gsap.context(() => {
      gsap.set(pill, { opacity: 0, x: 0, width: 0 })

      const moveToEl = (el: HTMLElement) => {
        const railRect = rail.getBoundingClientRect()
        const rect = el.getBoundingClientRect()
        const x = rect.left - railRect.left
        gsap.to(pill, {
          opacity: 1,
          x,
          width: rect.width,
          duration: 0.38,
          ease: "power3.out",
        })
      }

      const links = Array.from(rail.querySelectorAll<HTMLElement>("[data-nav-item='true']"))
      const onEnter = (event: Event) => {
        const el = event.currentTarget as HTMLElement
        moveToEl(el)
      }
      const onLeave = () => {
        gsap.to(pill, { opacity: 0, duration: 0.25, ease: "power2.out" })
      }

      links.forEach((link) => {
        link.addEventListener("mouseenter", onEnter)
        link.addEventListener("focus", onEnter)
      })
      rail.addEventListener("mouseleave", onLeave)

      return () => {
        links.forEach((link) => {
          link.removeEventListener("mouseenter", onEnter)
          link.removeEventListener("focus", onEnter)
        })
        rail.removeEventListener("mouseleave", onLeave)
      }
    }, rootRef)

    return () => ctx.revert()
  }, [shouldRunHeavyAnimations])

  return (
    <header ref={rootRef} className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <img src="/images/amtar-logo.png" alt="Amtar" className="h-10 w-auto" />
          <span className="text-sm font-semibold tracking-wide text-foreground/80 transition group-hover:text-foreground">
            Amtar
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <div
            ref={railRef}
            className="relative flex items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 text-sm text-foreground/80 shadow-sm"
          >
            <div
              ref={pillRef}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1 top-1 rounded-full bg-gradient-to-r from-primary to-cyan-500 opacity-0"
              style={{ filter: "blur(0px)" }}
            />

            {items.map((item) =>
              item.kind === "route" ? (
                <NavLink
                  key={item.key}
                  to={item.to}
                  data-nav-item="true"
                  className={({ isActive }) =>
                    `relative z-10 rounded-full px-4 py-2 transition ${
                      isActive ? "text-foreground" : "hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <button
                  key={item.key}
                  type="button"
                  data-nav-item="true"
                  onClick={() => runToSection(item.to)}
                  className="relative z-10 rounded-full px-4 py-2 transition hover:text-foreground"
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(resolvedIsDark ? "light" : "dark")}
            className={cn(
              "relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-card/60 text-foreground/80 shadow-sm outline-none transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
              shouldRunHeavyAnimations && "hover:bg-card/80"
            )}
            aria-label={resolvedIsDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                background:
                  theme === "dark"
                    ? "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.18), transparent 60%)"
                    : "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.18), transparent 60%)",
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <AnimatePresence initial={false} mode="wait">
              {resolvedIsDark ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="relative"
                >
                  <Sun className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: 60, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -60, scale: 0.7 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="relative"
                >
                  <Moon className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <Button
            variant="outline"
            className="rounded-full border-border/70 bg-card/60 px-5 text-foreground/80 hover:bg-card/80"
            onClick={onToggleLanguage}
          >
            <Globe2 className="mr-2 h-4 w-4" />
            {isRTL ? "EN" : "AR"}
          </Button>

          <Link
            to="/contact"
            className={cn(
              buttonVariants({ variant: "default" }),
              "hidden rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/25 md:inline-flex"
            )}
          >
            {t("nav.contactCta")}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/60 text-foreground/80 shadow-sm md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border/60 bg-background/80 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="grid gap-2">
              {items.map((item) =>
                item.kind === "route" ? (
                  <Link
                    key={item.key}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm font-medium text-foreground shadow-sm"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setMobileOpen(false)
                      runToSection(item.to)
                    }}
                    className="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-left text-sm font-medium text-foreground shadow-sm"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

