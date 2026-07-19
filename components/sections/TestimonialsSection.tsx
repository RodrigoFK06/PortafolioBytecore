"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"

export interface Testimonial {
  name: string
  position: string
  company: string
  link: string
  logo: string
  /** Fondo del avatar. Logos blancos requieren fondo oscuro;
   *  logos oscuros/coloridos suelen verse mejor sobre blanco. */
  logoBg?: "white" | "dark" | "neutral"
  project: string
  text: string
  metric?: string
}

const LOGO_BG_CLASS: Record<NonNullable<Testimonial["logoBg"]>, string> = {
  white: "bg-white",
  dark: "bg-slate-900",
  neutral: "bg-secondary",
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-14 md:mb-20">
        <header className="max-w-4xl">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 08 — Clientes
          </p>
          <KineticText
            as="h2"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Lo que dicen <span className="text-brand">nuestros clientes</span>
          </KineticText>
          <Reveal effect="fade" delay={0.15}>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
              Sistemas en producción, operados a diario por gente real. Esto es lo que cuentan
              quienes ya trabajan con nosotros.
            </p>
          </Reveal>
        </header>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.08}>
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="group relative bg-card p-8 rounded-lg shadow-hairline hover:shadow-hairline-md transition-shadow duration-300 h-full flex flex-col"
              aria-label={`Testimonio de ${testimonial.name}, ${testimonial.position}`}
            >
              <div className="flex flex-col h-full">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  className="h-8 w-8 text-brand/30 mb-6 group-hover:text-brand transition-colors duration-300"
                  fill="currentColor"
                >
                  <path d="M10.5 8C6.91 8 4 10.91 4 14.5V24h9.5v-9.5H8.5C8.5 12.57 9.57 11.5 11.5 11.5h.5V8h-1.5zm14 0c-3.59 0-6.5 2.91-6.5 6.5V24H27.5v-9.5h-5C22.5 12.57 23.57 11.5 25.5 11.5h.5V8h-1.5z" />
                </svg>

                <p className="text-foreground leading-relaxed mb-8 flex-grow text-base">
                  <span aria-hidden="true">“</span>
                  {testimonial.text}
                  <span aria-hidden="true">”</span>
                </p>

                {testimonial.metric && (
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider bg-brand/5 text-brand">
                      <span className="w-1 h-1 bg-brand" aria-hidden="true" />
                      {testimonial.metric}
                    </span>
                  </div>
                )}

                <p className="spec-label mb-4">{testimonial.project}</p>

                <div className="pt-6 border-t border-border flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-md overflow-hidden shadow-hairline flex items-center justify-center shrink-0 relative ${LOGO_BG_CLASS[testimonial.logoBg ?? "neutral"]}`}
                  >
                    <Image
                      src={testimonial.logo}
                      alt={`Logo de ${testimonial.company}`}
                      fill
                      sizes="48px"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{testimonial.position}</p>
                    <a
                      href={testimonial.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar el sitio web de ${testimonial.company} (se abre en una nueva pestaña)`}
                      className="mt-0.5 text-xs font-mono tracking-wide text-brand hover:underline inline-flex items-center gap-0.5"
                    >
                      {testimonial.company}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </StaggerGroup>

        <Reveal effect="fade">
          <div className="mt-14 md:mt-20 flex flex-col items-center text-center">
            <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-xl">
              ¿Listo para sumar tu operación a esta lista? Construyamos algo que merezca contarse.
            </p>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Conversemos sobre tu proyecto
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
