"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import Timeline from "@/components/Timeline"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { TabularCounter } from "@/components/motion/tabular-counter"

const STATS = [
  { label: "Años de experiencia", value: 6, prefix: "" },
  { label: "Proyectos completados", value: 50, prefix: "+" },
  { label: "Clientes satisfechos", value: 45, prefix: "+" },
  { label: "Industrias atendidas", value: 8, prefix: "+" },
]

const SOCIAL = [
  { href: "https://github.com/RodrigoFK06", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/rodrigo-torres-arkos", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:gerencia@árkos.com", icon: Mail, label: "Email" },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-background relative border-t border-border"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content="Árkos" />
      <meta itemProp="description" content="Agencia digital especialista en desarrollo web y diseño UX/UI en Trujillo, Perú." />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-24">
          {/* Columna izquierda: título + timeline */}
          <div className="w-full lg:w-1/2 space-y-10 md:space-y-14">
            <header>
              <p className="spec-label mb-6 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
                FIG. 02 — Nosotros
              </p>
              <KineticText
                as="h2"
                mode="rise"
                by="words"
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
              >
                Sobre <span className="text-brand">Nosotros</span>
              </KineticText>
            </header>

            <Reveal effect="rise">
              <Timeline />
            </Reveal>
          </div>

          {/* Columna derecha: historia + índice de stats + redes */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start space-y-10 lg:mt-28">
            <Reveal effect="rise">
              <div className="p-8 rounded-lg bg-card shadow-hairline">
                <h3 className="font-display text-2xl font-bold mb-5 text-foreground">Nuestra historia</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Fundada con la visión de transformar el panorama digital, Árkos ha evolucionado hasta convertirse
                  en una agencia destacada en desarrollo web y diseño UI/UX. Nuestro equipo multidisciplinario combina
                  experiencia técnica con creatividad para ofrecer soluciones digitales que destacan en el mercado.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nos apasiona crear experiencias digitales accesibles, intuitivas y visualmente atractivas que conectan
                  marcas con sus audiencias. Nuestro enfoque colaborativo nos permite entender profundamente las
                  necesidades de cada cliente para desarrollar soluciones personalizadas que generan resultados tangibles.
                </p>
              </div>
            </Reveal>

            {/* Índice archivístico de cifras */}
            <div className="border-t border-border">
              <StaggerGroup className="flex flex-col" stagger={0.06}>
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex justify-between items-center py-4 px-2 border-b border-border group hover:bg-secondary transition-colors"
                  >
                    <span className="spec-label group-hover:text-brand transition-colors">
                      [{String(i + 1).padStart(2, "0")}] {stat.label}
                    </span>
                    <span className="font-mono text-xl text-foreground group-hover:text-brand transition-colors">
                      <TabularCounter value={stat.value} prefix={stat.prefix} />
                    </span>
                  </div>
                ))}
              </StaggerGroup>
            </div>

            {/* Redes */}
            <div className="flex gap-3 pt-2">
              {SOCIAL.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : "_self"}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-md shadow-hairline flex items-center justify-center text-muted-foreground hover:text-brand hover:shadow-hairline-md transition-all"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
