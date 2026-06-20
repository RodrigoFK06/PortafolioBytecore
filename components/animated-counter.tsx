"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
}

export function AnimatedCounter({ from, to, duration = 2 }: AnimatedCounterProps) {
  // Inicia en `to`: así el SSR / crawlers AI / usuarios sin JS ven el número
  // REAL (no "0"). La animación de conteo se ejecuta solo en cliente al entrar
  // en viewport. Como el valor inicial coincide con el SSR, no hay hydration mismatch.
  const [count, setCount] = useState(to)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const totalFrames = Math.round(duration * 60)
    const frameRate = 1000 / 60
    let frame = 0
    setCount(from)

    const counter = setInterval(() => {
      frame++
      const progress = frame / totalFrames

      if (frame >= totalFrames) {
        clearInterval(counter)
        setCount(to)
      } else {
        setCount(Math.round(from + (to - from) * progress))
      }
    }, frameRate)

    return () => clearInterval(counter)
  }, [from, to, duration, isInView])

  return <span ref={ref}>{count}</span>
}
