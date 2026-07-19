"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Linkedin, Github } from "lucide-react"
import { KineticText } from "@/components/motion/kinetic-text"

// 🔹 Bloque de fundador — trae a Rodrigo al frente como la cara y el criterio
//    detrás del trabajo (señal E-E-A-T + posicionamiento de asesor, no de vendor).
//    TODO Rodrigo: (1) cambiar el avatar de iniciales por tu FOTO real
//    (reemplaza el <div> de "RT" por <Image src="/rodrigo-torres.jpg" .../>);
//    (2) revisar el bio — está armado desde tu trabajo real, pero es tu voz en
//    público, así que debe sonar exactamente a ti.

const RODRIGO_LINKEDIN = "https://www.linkedin.com/in/rodrigo-torres-arkos"
const RODRIGO_GITHUB = "https://github.com/RodrigoFK06"

const LO_QUE_HAGO = [
  "ERPs de restaurante y PMS hoteleros con revenue management.",
  "Un CRM que una clienta real usa todos los días para operar su negocio.",
  "Una app de delivery nativa, publicada en App Store y Google Play.",
]

export default function FounderSection() {
  return (
    <section
      id="fundador"
      className="py-20 md:py-32 bg-background relative border-t border-border"
    >

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <header className="max-w-4xl mb-12 md:mb-16">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 06 — Fundador
          </p>
          <KineticText
            as="h2"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Quién <span className="text-brand">construye esto</span>
          </KineticText>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          {/* Avatar + identidad */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative w-44 h-52 rounded-lg overflow-hidden shadow-hairline mb-6">
              <Image
                src="/rodrigo-torres.png"
                alt="Rodrigo Torres, fundador de Árkos"
                fill
                sizes="176px"
                className="object-cover object-[50%_25%]"
                priority
              />
            </div>
            <p className="text-2xl font-bold text-foreground">Rodrigo Torres</p>
            <p className="spec-label mt-1.5">
              Fundador de Árkos
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href={RODRIGO_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Rodrigo Torres"
                className="w-10 h-10 rounded-md shadow-hairline flex items-center justify-center text-muted-foreground hover:text-brand hover:shadow-hairline-md transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={RODRIGO_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Rodrigo Torres"
                className="w-10 h-10 rounded-md shadow-hairline flex items-center justify-center text-muted-foreground hover:text-brand hover:shadow-hairline-md transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Bio + criterio (voz de Rodrigo) */}
          <div className="lg:col-span-2">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light max-w-3xl">
              Construyo software vertical para pymes de Latinoamérica. No vendo "Next.js":
              resuelvo operaciones que ya no entran en un Excel.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-6 max-w-xl">En los últimos años puse en producción cosas como:</p>
            <ul className="mt-4 space-y-2 max-w-xl">
              {LO_QUE_HAGO.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                  <span className="text-brand mt-1.5 shrink-0" aria-hidden="true">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-6 max-w-xl">
              Si tu negocio creció más rápido que tus sistemas, esa es exactamente la conversación que me gusta tener.
            </p>

            {/* CTA consultivo — diagnóstico (punto de entrada de asesor, no de vendor) */}
            <div className="mt-10 p-6 md:p-8 rounded-lg bg-secondary shadow-hairline">
              <p className="spec-label text-brand mb-2">Diagnóstico gratis</p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">¿No sabes por dónde empezar?</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-prose">
                Agenda 30 minutos conmigo, sin compromiso. Te digo con honestidad si lo que
                necesitas es un sistema, un ajuste o nada todavía — aunque no terminemos
                trabajando juntos.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
              >
                Agendar diagnóstico
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
