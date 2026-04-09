import { useEffect, useMemo, useState } from "react"

type MotionPolicy = {
  prefersReducedMotion: boolean
  isMobileViewport: boolean
  shouldRunHeavyAnimations: boolean
}

function getMediaQuery(query: string) {
  if (typeof window === "undefined") return null
  return window.matchMedia(query)
}

export function useMotionPolicy(): MotionPolicy {
  const reducedMq = useMemo(() => getMediaQuery("(prefers-reduced-motion: reduce)"), [])
  const mobileMq = useMemo(() => getMediaQuery("(max-width: 768px)"), [])

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => reducedMq?.matches ?? false)
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() => mobileMq?.matches ?? false)

  useEffect(() => {
    if (!reducedMq || !mobileMq) return

    const onReduced = () => setPrefersReducedMotion(reducedMq.matches)
    const onMobile = () => setIsMobileViewport(mobileMq.matches)

    reducedMq.addEventListener("change", onReduced)
    mobileMq.addEventListener("change", onMobile)

    return () => {
      reducedMq.removeEventListener("change", onReduced)
      mobileMq.removeEventListener("change", onMobile)
    }
  }, [reducedMq, mobileMq])

  return {
    prefersReducedMotion,
    isMobileViewport,
    shouldRunHeavyAnimations: !prefersReducedMotion && !isMobileViewport,
  }
}

