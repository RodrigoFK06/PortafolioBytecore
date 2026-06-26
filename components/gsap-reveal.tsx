"use client"

import React, { useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   RevealText — Text slides up with transform
   No clip-path to avoid cutting descenders
   ───────────────────────────────────────────── */

interface RevealTextProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"
}

export function RevealText({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!wrapRef.current || !innerRef.current) return

      if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(innerRef.current, { y: "0%", opacity: 1 })
        return
      }

      gsap.fromTo(
        innerRef.current,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          delay,
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 88%",
            once: true,
          },
        }
      )
    },
    { scope: wrapRef }
  )

  return (
    <div ref={wrapRef} className="overflow-hidden">
      <Tag ref={innerRef as React.Ref<any>} className={className} style={{ transform: "translateY(100%)", opacity: 0 }}>
        {children}
      </Tag>
    </div>
  )
}

/* ─────────────────────────────────────────────
   RevealBlock — Content wipes in with transform
   Uses overflow-hidden wrapper for clean edge
   ───────────────────────────────────────────── */

interface RevealBlockProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "bottom" | "left" | "right"
}

export function RevealBlock({
  children,
  className = "",
  delay = 0,
  direction = "bottom",
}: RevealBlockProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!wrapRef.current || !innerRef.current) return

      if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(innerRef.current, { x: 0, y: 0, opacity: 1 })
        return
      }

      const fromVars: gsap.TweenVars = {
        bottom: { y: "100%", opacity: 0 },
        left: { x: "-100%", opacity: 0 },
        right: { x: "100%", opacity: 0 },
      }[direction]

      gsap.fromTo(
        innerRef.current,
        fromVars,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 85%",
            once: true,
          },
        }
      )
    },
    { scope: wrapRef }
  )

  const initialStyle: React.CSSProperties = {
    bottom: { transform: "translateY(100%)", opacity: 0 },
    left: { transform: "translateX(-100%)", opacity: 0 },
    right: { transform: "translateX(100%)", opacity: 0 },
  }[direction]

  return (
    <div ref={wrapRef} className="overflow-hidden">
      <div ref={innerRef} className={className} style={initialStyle}>
        {children}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   StaggerReveal — Children stagger in
   Uses y transform + opacity for smooth feel
   ───────────────────────────────────────────── */

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  stagger?: number
  childSelector?: string
}

export function StaggerReveal({
  children,
  className = "",
  stagger = 0.08,
  childSelector = ":scope > *",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const items = ref.current.querySelectorAll(childSelector)
      if (!items.length) return

      if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { y: 0, opacity: 1 })
        return
      }

      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%",
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
