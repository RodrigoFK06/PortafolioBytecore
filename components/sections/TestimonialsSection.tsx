"use client"

import { Quote } from "lucide-react"
import { RevealText, StaggerReveal } from "@/components/gsap-reveal"

interface Testimonial {
  name: string
  position: string
  text: string
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
            <p className="text-foreground/70 mt-8 max-w-2xl text-base md:text-lg leading-relaxed relative z-10 md:pl-16 border-l-[2px] border-brand/30 ml-2">
              No construimos para clientes, forjamos alianzas con visionarios. Estas son las impresiones de quienes apostaron por la arquitectura de élite.
            </p>
          </RevealText>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" stagger={0.1}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-black/[0.02] dark:bg-white/[0.01] backdrop-blur-[12px] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-500 h-full flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              {/* Chiseled Light border on hover */}
              <div className="absolute inset-0 border border-black/0 dark:border-white/0 group-hover:border-black/10 dark:group-hover:border-white/10 rounded-2xl transition-colors pointer-events-none opacity-0 group-hover:opacity-100 z-20" style={{ background: "linear-gradient(135deg, rgba(150,150,150,0.15) 0%, rgba(150,150,150,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />

              <div className="flex flex-col h-full relative z-10">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-brand/40 mb-6 group-hover:text-brand transition-colors duration-300" />

                {/* Testimonial text */}
                <p className="text-foreground/80 leading-relaxed mb-8 flex-grow italic text-lg">
                  "{testimonial.text}"
                </p>

                {/* Client info */}
                <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-brand font-mono">
                     {testimonial.name.charAt(0)}
                   </div>
                   <div>
                     <p className="font-bold text-foreground group-hover:text-brand transition-colors">{testimonial.name}</p>
                     <p className="text-xs font-mono tracking-wider uppercase text-foreground/50">{testimonial.position}</p>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
