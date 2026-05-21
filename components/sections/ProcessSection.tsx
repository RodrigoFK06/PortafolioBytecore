"use client"

import { MessageSquare, FileText, Code2, Headphones } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { RevealText, StaggerReveal } from "@/components/gsap-reveal"

interface ProcessStep {
  icon: LucideIcon
  number: string
  title: string
  duration: string
  description: string
}

const STEPS: ProcessStep[] = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Brief",
    duration: "1–2 días",
    description:
      "Nos cuentas qué necesitas, qué problema tienes y qué tiempos manejas. Por llamada, WhatsApp o el formulario. Sin presupuesto en frío.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Propuesta",
    duration: "3–5 días",
    description:
      "Te enviamos alcance, cronograma y precio claros. Si avanzamos, firmamos un contrato simple. Si no, nada se pierde.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Sprints quincenales",
    duration: "2–12 semanas",
    description:
      "Iteramos en ciclos cortos con demos cada dos semanas. Ves el avance funcional, no maquetas. Tu feedback entra en el siguiente sprint.",
  },
  {
    icon: Headphones,
    number: "04",
    title: "Entrega y soporte",
    duration: "continuo",
    description:
      "Lanzamos a producción, te capacitamos en uso y administración, y te acompañamos en los primeros meses para ajustar lo que la operación demande.",
  },
]

const NEXT_STEPS: string[] = [
  "Recibes un email de confirmación al enviar el formulario.",
  "Te respondemos en menos de 24 horas hábiles con preguntas concretas.",
  "Agendamos una llamada de 30 minutos sin compromiso.",
  "Si encajamos, mandamos propuesta cerrada en 3–5 días.",
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-16 md:py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 mb-16 md:mb-24">
        <div className="max-w-4xl relative text-left">

          {/* Anotación Marginal */}
          <div className="absolute -top-10 left-0 md:-left-4 font-mono text-[10px] text-brand/80 italic px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 z-20 transform -rotate-1">
             // Cómo trabajamos_
          </div>

          <RevealText as="h2" className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10 mb-8 md:mb-12">
            Cómo <br className="hidden md:block" /> <span className="text-brand">trabajamos</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-foreground/80 mt-8 max-w-2xl text-base md:text-lg leading-relaxed relative z-10 md:pl-16 border-l-[2px] border-brand/30 ml-2">
              Cuatro pasos claros, sin sorpresas. Sabes exactamente qué pasa antes de firmar, durante el desarrollo y después de la entrega.
            </p>
          </RevealText>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative" stagger={0.1}>
          {/* Línea conectora horizontal en desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent pointer-events-none"
          />

          {STEPS.map((step) => (
            <article
              key={step.number}
              className="group relative bg-black/[0.04] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.05] backdrop-blur-[12px] p-6 md:p-8 rounded-2xl border border-black/10 dark:border-white/10 hover:border-black/15 dark:hover:border-white/20 transition-all duration-500 h-full flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              {/* Número + ícono */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand opacity-70">
                  [{step.number}]
                </span>
                <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand/20 group-hover:scale-110 transition-all duration-500">
                  <step.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-brand transition-colors relative z-10">
                {step.title}
              </h3>

              <p className="text-xs font-mono uppercase tracking-wider text-foreground/55 mb-4 relative z-10">
                {step.duration}
              </p>

              <p className="text-foreground/80 text-sm leading-relaxed flex-grow relative z-10">
                {step.description}
              </p>
            </article>
          ))}
        </StaggerReveal>

        {/* Qué pasa después de enviar el formulario */}
        <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
          <RevealText delay={0.3}>
            <div className="rounded-2xl bg-brand/5 border border-brand/15 p-6 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-4">
                Qué pasa después de que envíes el formulario
              </p>
              <ol className="space-y-3 text-foreground/85">
                {NEXT_STEPS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base leading-relaxed">
                    <span
                      className="shrink-0 w-6 h-6 rounded-full bg-brand/15 text-brand text-xs font-bold flex items-center justify-center mt-0.5 font-mono"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  )
}
