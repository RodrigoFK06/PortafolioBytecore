"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion"

// ── Smooth scroll global (Lenis + GSAP ScrollTrigger) ───────────
// Corre sobre el scroll nativo: preserva sticky, anchors y a11y.
// Con prefers-reduced-motion NO se instancia: scroll 100% nativo.

const HEADER_OFFSET = -96 // compensa el navbar fijo (= scroll-padding-top)

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      anchors: { offset: HEADER_OFFSET },
    })

    lenis.on("scroll", ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
