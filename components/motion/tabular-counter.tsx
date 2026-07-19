"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, prefersReducedMotion } from "@/lib/motion"

// ── TabularCounter — cifras que cuadran ─────────────────────────
// Cuenta hasta el valor al entrar en viewport, en mono tabular
// (el ancho no baila). El HTML servido ya contiene el valor final.

interface TabularCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function TabularCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.2,
  className = "",
}: TabularCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return

      const state = { n: 0 }
      gsap.to(state, {
        n: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.n)}${suffix}`
        },
      })
    },
    { scope: ref }
  )

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
