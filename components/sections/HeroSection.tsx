"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { gsap, prefersReducedMotion, DUR } from "@/lib/motion"
import { KineticText } from "@/components/motion/kinetic-text"

// ── Hero "Light 2026" ───────────────────────────────────────────
// Blanco + retícula blueprint + kinetic type que se ordena (la
// metáfora de Árkos: del caos al sistema). Un solo acento cobalto.

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const belowRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const targets = [
        taglineRef.current,
        ...(belowRef.current ? Array.from(belowRef.current.children) : []),
      ].filter(Boolean)

      if (prefersReducedMotion()) {
        gsap.set(targets, { autoAlpha: 1 })
        return
      }

      gsap.fromTo(
        targets,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: DUR.base,
          ease: "arkos-out",
          stagger: 0.09,
          delay: 0.55,
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-background"
    >
      {/* Retícula blueprint — plano de ingeniería, se desvanece hacia abajo */}
      <div
        className="absolute inset-0 blueprint-grid pointer-events-none [mask-image:linear-gradient(to_bottom,black_55%,transparent_95%)]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 pt-32 md:pt-36 pb-16">
        <div className="max-w-7xl mx-auto w-full">
          {/* Etiqueta técnica */}
          <p ref={taglineRef} className="spec-label mb-8 md:mb-10 flex items-center gap-3" style={{ opacity: 0 }}>
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 01 — Agencia de software · Trujillo, Perú
          </p>

          {/* Headline — kinetic type que se ordena */}
          <KineticText
            as="h1"
            by="chars"
            mode="sort"
            trigger="load"
            stagger={0.028}
            delay={0.15}
            duration={0.75}
            ignore=".kinetic-ignore"
            aria-label="Mejoramos tus procesos"
            className="font-display text-[3rem] sm:text-6xl md:text-8xl lg:text-[8.5rem] font-bold tracking-tight leading-[0.95] text-foreground mb-10 md:mb-14"
          >
            Mejoramos
            <br />
            <span className="ml-0 md:ml-[1.2em]">
              tus{" "}
              <span className="text-brand">
                pr
                <span className="sr-only kinetic-ignore">o</span>
                <span
                  aria-hidden="true"
                  className="kinetic-ignore inline-block align-baseline mx-[0.04em] w-[0.72em] h-[0.72em] relative translate-y-[0.08em]"
                >
                  <img
                    src="/logo_ico/final - LOGO 2-071.svg"
                    alt=""
                    aria-hidden="true"
                    width={16}
                    height={16}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </span>
                cesos
              </span>
            </span>
          </KineticText>

          <div ref={belowRef}>
            {/* Descripción — editorial, sin vidrio */}
            <p
              className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
              style={{ opacity: 0 }}
            >
              Somos <strong className="text-foreground font-semibold">Árkos</strong>. Convertimos
              operaciones que ya no entran en un Excel en software a medida: sistemas web, ERPs
              y apps que ordenan tu negocio.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-14 md:mb-20" style={{ opacity: 0 }}>
              <Link
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
              >
                Ver proyectos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
              >
                Contáctanos
              </Link>
            </div>

            {/* Prueba temprana — cifras que cuadran, en mono */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3" style={{ opacity: 0 }}>
              <span className="spec-label shrink-0">Sistemas en producción</span>
              <span className="hidden md:block w-px h-4 bg-border" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">
                <span className="tabular font-medium text-foreground">78%</span> de citas digitales{" "}
                <span className="text-muted-foreground">— Clínica Juan Pablo II</span>
              </span>
              <span className="hidden md:block w-px h-4 bg-border" aria-hidden="true" />
              <a
                href="https://apps.apple.com/pe/app/rapiditos-vz/id6748567718"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-brand transition-colors"
              >
                <span className="font-medium text-foreground">Rapiditos</span> en App Store{" "}
                <span className="text-muted-foreground">— delivery activo</span>
              </a>
              <span className="hidden md:block w-px h-4 bg-border" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">
                <span className="tabular font-medium text-foreground">+50</span> proyectos desplegados
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
