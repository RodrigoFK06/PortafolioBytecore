import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { CustomEase } from "gsap/CustomEase"

// ── Registro central de GSAP ────────────────────────────────────
// Todos los componentes de motion importan gsap/plugins desde aquí;
// ningún componente registra plugins por su cuenta.

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

// Ease de la casa: salida rápida que "asienta" — la sensación de una
// pieza cayendo en su lugar (metáfora Árkos: del caos al sistema).
export const EASE_OUT = CustomEase.create(
  "arkos-out",
  "M0,0 C0.19,0.84 0.28,1 1,1"
)

// Presupuesto de motion: nada fuera de estos tiempos.
export const DUR = {
  fast: 0.3,
  base: 0.4,
  slow: 0.5,
} as const

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true

export { gsap, ScrollTrigger, SplitText, CustomEase }
