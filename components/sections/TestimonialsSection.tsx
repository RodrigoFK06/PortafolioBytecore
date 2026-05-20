"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { RevealText, StaggerReveal } from "@/components/gsap-reveal"

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
  white: "bg-white border-black/10",
  dark: "bg-slate-900 border-white/10",
  neutral: "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10",
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="py-16 md:py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 mb-16 md:mb-24">
        <div className="max-w-4xl relative text-left">

          {/* Anotación Marginal */}
          <div className="absolute -top-10 left-0 md:-left-4 font-mono text-[10px] text-brand/80 italic px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 z-20 transform -rotate-1">
             // Opiniones_
          </div>

          <RevealText as="h2" className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10 mb-8 md:mb-12">
            Lo que dicen <br className="hidden md:block" /> <span className="text-brand">nuestros socios</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-foreground/80 mt-8 max-w-2xl text-base md:text-lg leading-relaxed relative z-10 md:pl-16 border-l-[2px] border-brand/30 ml-2">
              No construimos para clientes, forjamos alianzas con visionarios. Estas son las impresiones de quienes apostaron por la arquitectura de élite.
            </p>
          </RevealText>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" stagger={0.1}>
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="group relative bg-black/[0.04] dark:bg-white/[0.01] backdrop-blur-[12px] p-8 md:p-10 rounded-2xl border border-black/10 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-500 h-full flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] overflow-hidden"
              aria-label={`Testimonio de ${testimonial.name}, ${testimonial.position}`}
            >
              {/* Chiseled Light border on hover */}
              <div className="absolute inset-0 border border-black/0 dark:border-white/0 group-hover:border-black/10 dark:group-hover:border-white/10 rounded-2xl transition-colors pointer-events-none opacity-0 group-hover:opacity-100 z-20" style={{ background: "linear-gradient(135deg, rgba(150,150,150,0.15) 0%, rgba(150,150,150,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />

              <div className="flex flex-col h-full relative z-10">
                {/* Opening quote (decorative) */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  className="h-9 w-9 text-brand/40 mb-6 group-hover:text-brand transition-colors duration-300"
                  fill="currentColor"
                >
                  <path d="M10.5 8C6.91 8 4 10.91 4 14.5V24h9.5v-9.5H8.5C8.5 12.57 9.57 11.5 11.5 11.5h.5V8h-1.5zm14 0c-3.59 0-6.5 2.91-6.5 6.5V24H27.5v-9.5h-5C22.5 12.57 23.57 11.5 25.5 11.5h.5V8h-1.5z" />
                </svg>

                {/* Testimonial text — contraste reforzado para WCAG AA */}
                <p className="text-foreground/95 dark:text-foreground/90 leading-relaxed mb-8 flex-grow text-base md:text-lg">
                  <span aria-hidden="true">“</span>{testimonial.text}<span aria-hidden="true">”</span>
                </p>

                {/* Metric / highlight badge */}
                {testimonial.metric && (
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-brand/10 text-brand border border-brand/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                      {testimonial.metric}
                    </span>
                  </div>
                )}

                {/* Project / service rendered */}
                <p className="text-xs font-mono uppercase tracking-wider text-foreground/60 mb-4">
                  <span className="text-brand/70">— </span>{testimonial.project}
                </p>

                {/* Client info */}
                <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center gap-4">
                   <div className={`w-14 h-14 rounded-full overflow-hidden border flex items-center justify-center shrink-0 relative p-2 ${LOGO_BG_CLASS[testimonial.logoBg ?? "neutral"]}`}>
                     <Image
                       src={testimonial.logo}
                       alt={`Logo de ${testimonial.company}`}
                       fill
                       sizes="56px"
                       className="object-contain p-1"
                     />
                   </div>
                   <div className="min-w-0">
                     <p className="font-bold text-foreground group-hover:text-brand transition-colors truncate">{testimonial.name}</p>
                     <p className="text-xs font-mono tracking-wider uppercase text-foreground/75">
                       {testimonial.position}
                     </p>
                     <a
                       href={testimonial.link}
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label={`Visitar el sitio web de ${testimonial.company} (se abre en una nueva pestaña)`}
                       className="mt-1 text-xs font-mono tracking-wider uppercase text-brand hover:underline inline-flex items-center gap-0.5"
                     >
                       {testimonial.company}
                       <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                     </a>
                   </div>
                </div>
              </div>
            </article>
          ))}
        </StaggerReveal>

        {/* CTA al pie de la sección */}
        <RevealText delay={0.3}>
          <div className="mt-16 md:mt-20 flex flex-col items-center text-center">
            <p className="text-foreground/70 text-sm md:text-base mb-6 max-w-xl">
              ¿Listo para sumar tu visión a esta lista? Construyamos algo que merezca contarse.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-brand-foreground font-mono text-sm uppercase tracking-wider hover:bg-brand/90 transition-colors duration-300 border border-brand/40"
            >
              Conversemos sobre tu proyecto
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </RevealText>
      </div>
    </section>
  )
}
