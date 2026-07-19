"use client"

import { MessageSquare, FileText, Code2, Headphones } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"

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
    <section id="process" className="py-20 md:py-32 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-14 md:mb-20">
        <header className="max-w-4xl">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 09 — Proceso
          </p>
          <KineticText
            as="h2"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Cómo <span className="text-brand">trabajamos</span>
          </KineticText>
          <Reveal effect="fade" delay={0.15}>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
              Cuatro pasos claros, sin sorpresas. Sabes exactamente qué pasa antes de firmar,
              durante el desarrollo y después de la entrega.
            </p>
          </Reveal>
        </header>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <StaggerGroup
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative"
          stagger={0.08}
          childSelector=":scope > article"
        >
          {/* Línea conectora horizontal en desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-border pointer-events-none"
          />

          {STEPS.map((step) => (
            <article
              key={step.number}
              className="group relative bg-card p-7 rounded-lg shadow-hairline hover:shadow-hairline-md transition-shadow duration-300 h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="spec-label text-brand">[{step.number}]</span>
                <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display text-xl font-bold mb-1.5 text-foreground">{step.title}</h3>

              <p className="spec-label mb-4">
                <span className="tabular">{step.duration}</span>
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                {step.description}
              </p>
            </article>
          ))}
        </StaggerGroup>

        {/* Qué pasa después de enviar el formulario */}
        <div className="mt-14 md:mt-20 max-w-4xl mx-auto">
          <Reveal effect="rise">
            <div className="rounded-lg bg-secondary p-6 md:p-10 shadow-hairline">
              <p className="spec-label text-brand mb-5">
                Qué pasa después de que envíes el formulario
              </p>
              <ol className="space-y-3 text-foreground">
                {NEXT_STEPS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base leading-relaxed">
                    <span
                      className="shrink-0 w-6 h-6 rounded bg-background shadow-hairline text-brand text-xs font-mono font-medium flex items-center justify-center mt-0.5 tabular"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
