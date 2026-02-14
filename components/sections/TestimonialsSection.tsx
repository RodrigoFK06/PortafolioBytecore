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
    <section id="testimonials" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <RevealText as="h2" className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">
            Testimonios <span className="text-brand">de Clientes</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Lo que dicen nuestros clientes sobre trabajar con nosotros.
            </p>
          </RevealText>
        </div>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" stagger={0.1}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-border bg-card hover:border-brand/20 transition-colors duration-300"
            >
              <div className="flex flex-col h-full">
                {/* Quote icon */}
                <Quote className="h-6 w-6 text-brand/40 mb-4" />

                {/* Testimonial text */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {testimonial.text}
                </p>

                {/* Client info */}
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
