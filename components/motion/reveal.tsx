"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, prefersReducedMotion, DUR } from "@/lib/motion"

// ── Reveal — entrada de bloques no tipográficos ─────────────────
// effect="rise": sube y asienta (la entrada por defecto de cards/media).
// effect="mask": barrido enmascarado; el clip se libera al terminar
//   (nunca un overflow-hidden permanente: recorta sombras/descendentes).
// effect="fade": aparición simple para elementos secundarios.

interface RevealProps {
  children: ReactNode
  className?: string
  effect?: "rise" | "mask" | "fade"
  direction?: "bottom" | "left" | "right"
  delay?: number
  as?: "div" | "section" | "article" | "span"
}

export function Reveal({
  children,
  className = "",
  effect = "rise",
  direction = "bottom",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wrap = wrapRef.current
      const inner = innerRef.current
      if (!wrap || !inner) return

      if (prefersReducedMotion()) {
        gsap.set(inner, { clearProps: "all", autoAlpha: 1 })
        if (effect === "mask") gsap.set(wrap, { overflow: "visible" })
        return
      }

      const from: gsap.TweenVars =
        effect === "fade"
          ? { autoAlpha: 0 }
          : effect === "mask"
            ? direction === "left"
              ? { xPercent: -101, autoAlpha: 1 }
              : direction === "right"
                ? { xPercent: 101, autoAlpha: 1 }
                : { yPercent: 101, autoAlpha: 1 }
            : { y: 24, autoAlpha: 0 }

      gsap.fromTo(inner, from, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        autoAlpha: 1,
        duration: effect === "fade" ? DUR.fast : DUR.base,
        ease: "arkos-out",
        delay,
        scrollTrigger: {
          trigger: wrap,
          start: "top 85%",
          once: true,
        },
        onComplete: () => {
          if (effect === "mask" && wrapRef.current) {
            wrapRef.current.style.overflow = "visible"
          }
        },
      })
    },
    { scope: wrapRef }
  )

  return (
    <Tag ref={wrapRef as React.Ref<any>} className={effect === "mask" ? "overflow-hidden" : undefined}>
      <div ref={innerRef} className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    </Tag>
  )
}
