"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, SplitText, prefersReducedMotion, DUR } from "@/lib/motion"

// ── KineticText — la firma tipográfica de Árkos ─────────────────
// mode="sort": las unidades parten con un jitter determinista y
//   convergen a su lugar (stagger aleatorio) — poner orden en el
//   caos, la metáfora de producto hecha motion.
// mode="rise": slide-up enmascarado sobrio para títulos corrientes.
// El HTML servido conserva el texto plano (SEO/AEO intacto);
// SplitText gestiona aria y se revierte al terminar para que el
// texto vuelva a ser un nodo normal (selección, reflow, find).

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"

interface KineticTextProps {
  children: ReactNode
  as?: Tag
  className?: string
  by?: "chars" | "words" | "lines"
  mode?: "sort" | "rise"
  trigger?: "load" | "scroll"
  stagger?: number
  delay?: number
  /** Selector de nodos que SplitText no debe partir (p.ej. el logo inline del hero) */
  ignore?: string
  "aria-label"?: string
}

// Jitter determinista (sin Math.random: estable entre renders/SSR)
const jitter = (i: number, amp: number) => {
  const r = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return ((r - Math.floor(r)) * 2 - 1) * amp
}

export function KineticText({
  children,
  as: TagName = "div",
  className = "",
  by = "words",
  mode = "rise",
  trigger = "scroll",
  stagger = 0.05,
  delay = 0,
  ignore,
  "aria-label": ariaLabel,
}: KineticTextProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (prefersReducedMotion()) {
        gsap.set(el, { visibility: "visible" })
        return
      }

      let split: SplitText | null = null
      let cancelled = false

      // Partir después de que las fuentes carguen: evita saltos de línea falsos.
      document.fonts.ready.then(() => {
        if (cancelled || !ref.current) return

        split = new SplitText(el, {
          type: by,
          ...(mode === "rise" ? { mask: by } : {}),
          ...(ignore ? { ignore } : {}),
          aria: "auto",
        })

        const units: Element[] =
          by === "chars" ? split.chars : by === "lines" ? split.lines : split.words

        if (!units.length) {
          gsap.set(el, { visibility: "visible" })
          return
        }

        if (mode === "sort") {
          units.forEach((u, i) => {
            gsap.set(u, {
              x: `${jitter(i, 0.25)}em`,
              y: `${jitter(i + 57, 0.3)}em`,
              rotation: jitter(i + 113, 3),
              autoAlpha: 0.2,
            })
          })
        } else {
          gsap.set(units, { yPercent: 110, autoAlpha: 0 })
        }

        gsap.set(el, { visibility: "visible" })

        gsap.to(units, {
          x: 0,
          y: 0,
          yPercent: 0,
          rotation: 0,
          autoAlpha: 1,
          duration: mode === "sort" ? DUR.slow : DUR.base,
          ease: "arkos-out",
          delay,
          stagger:
            mode === "sort"
              ? { each: stagger, from: "random" }
              : { each: stagger },
          ...(trigger === "scroll"
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  once: true,
                },
              }
            : {}),
          onComplete: () => {
            split?.revert()
            split = null
          },
        })
      })

      return () => {
        cancelled = true
        split?.revert()
      }
    },
    { scope: ref }
  )

  return (
    <TagName
      ref={ref as React.Ref<any>}
      className={className}
      aria-label={ariaLabel}
      style={{ visibility: "hidden" }}
      suppressHydrationWarning
    >
      {children}
    </TagName>
  )
}
