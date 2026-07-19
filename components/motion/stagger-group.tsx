"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, prefersReducedMotion, DUR } from "@/lib/motion"

// ── StaggerGroup — grids y listas que se ensamblan ──────────────
// Los hijos entran escalonados; from="random" refuerza la firma
// caos→sistema en grids grandes, "start" para listas de lectura.

interface StaggerGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
  childSelector?: string
  from?: "start" | "center" | "random"
}

export function StaggerGroup({
  children,
  className = "",
  stagger = 0.07,
  childSelector = ":scope > *",
  from = "start",
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const items = root.querySelectorAll(childSelector)
      if (!items.length) return

      if (prefersReducedMotion()) {
        gsap.set(items, { clearProps: "all", autoAlpha: 1 })
        return
      }

      gsap.fromTo(
        items,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: DUR.fast,
          ease: "arkos-out",
          stagger: { each: stagger, from },
          scrollTrigger: {
            trigger: root,
            start: "top 88%",
            once: true,
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
