"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Linkedin, Github } from "lucide-react"
import { RevealText } from "@/components/gsap-reveal"

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
      className="py-16 md:py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl relative text-left mb-12 md:mb-16">
          {/* Anotación Marginal */}

          <RevealText
            as="h2"
            className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10"
          >
            Quién <br className="hidden md:block" /> <span className="text-brand">construye esto</span>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          {/* Avatar + identidad */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative w-44 h-52 rounded-2xl overflow-hidden border border-border mb-6">
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
            <p className="text-sm font-mono uppercase tracking-widest text-foreground/60 mt-1">
              Fundador de Árkos
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href={RODRIGO_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Rodrigo Torres"
                className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-foreground/70 hover:text-brand hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={RODRIGO_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Rodrigo Torres"
                className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-foreground/70 hover:text-brand hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
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
            <p className="text-foreground/70 leading-relaxed mt-6 max-w-xl">En los últimos años puse en producción cosas como:</p>
            <ul className="mt-4 space-y-2 max-w-xl">
              {LO_QUE_HAGO.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80 leading-relaxed">
                  <span className="text-brand mt-1.5 shrink-0" aria-hidden="true">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-foreground/70 leading-relaxed mt-6 max-w-xl">
              Si tu negocio creció más rápido que tus sistemas, esa es exactamente la conversación que me gusta tener.
            </p>

            {/* CTA consultivo — diagnóstico (punto de entrada de asesor, no de vendor) */}
            <div className="mt-10 p-6 md:p-8 rounded-2xl bg-brand/5 border border-brand/15">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-2">Diagnóstico gratis</p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">¿No sabes por dónde empezar?</h3>
              <p className="text-foreground/75 leading-relaxed mb-6 max-w-prose">
                Agenda 30 minutos conmigo, sin compromiso. Te digo con honestidad si lo que
                necesitas es un sistema, un ajuste o nada todavía — aunque no terminemos
                trabajando juntos.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-brand-foreground font-mono text-sm uppercase tracking-wider hover:bg-brand/90 transition-colors duration-300"
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
