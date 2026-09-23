"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import Timeline from "@/components/Timeline"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { TabularCounter } from "@/components/motion/tabular-counter"

// Cifras reales (Rodrigo, sept. 2026). "Entregados" y "en producción" van
// siempre juntos: son dos números distintos y separarlos confunde.
const STATS = [
  { label: "Años de experiencia", value: 6, prefix: "" },
  { label: "Proyectos entregados", value: 50, prefix: "+" },
  { label: "Sistemas en producción hoy", value: 20, prefix: "+" },
  { label: "Clientes desde 2020", value: 45, prefix: "+" },
  { label: "Personas en el equipo", value: 9, prefix: "" },
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
      <meta itemProp="description" content="Empresa de tecnología en Lima, Perú: mejora los procesos de las empresas con automatización e IA, enseña a sus equipos a usarla y desarrolla el software a medida que haga falta." />

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
                  Árkos empezó en 2020 como un equipo pequeño construyendo software a medida para pymes peruanas
                  que se habían quedado cortas con Excel. Desde 2022 somos nueve personas y en 2026 nos constituimos
                  como Árkos Soluciones Informáticas S.A.C.S. En el camino entregamos más de 50 proyectos para más de
                  45 clientes en Perú, Latinoamérica, Estados Unidos y Europa; más de 20 de esos sistemas siguen en
                  producción hoy.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  No somos una fábrica de software. El onboarding de cada cliente lo hace Rodrigo de punta a punta,
                  con equipos de 5 a más de 200 usuarios, y desde hace dos años acompañamos a empresas de salud,
                  banca, transporte, logística, comercio y sector naval a incorporar IA a su trabajo diario:
                  asistentes con bases de conocimiento propias, conectados a los CRM y ERP que ya operan. Medimos
                  antes y después de intervenir, y solo reportamos lo que podemos verificar.
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
