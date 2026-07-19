"use client"

import Link from "next/link"
import { ArrowRight, FileCheck2, BookOpenCheck, ShieldCheck, Calculator } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"

// ── Cumplimiento embebido — el moat de Árkos ────────────────────
// En Perú el cumplimiento no es opcional; aquí no es un módulo que
// se compra aparte: es la base sobre la que se construye el sistema.

interface ComplianceItem {
  icon: LucideIcon
  code: string
  title: string
  description: string
}

const ITEMS: ComplianceItem[] = [
  {
    icon: FileCheck2,
    code: "CPE",
    title: "Facturación electrónica",
    description:
      "Boletas, facturas y notas emitidas y validadas contra SUNAT desde el propio sistema. Sin doble digitación, sin depender de un portal aparte.",
  },
  {
    icon: BookOpenCheck,
    code: "PLE · SIRE",
    title: "Libros electrónicos",
    description:
      "Registros de ventas y compras que salen del sistema ya en el formato que SUNAT exige. Tu contador recibe archivos listos, no capturas de pantalla.",
  },
  {
    icon: ShieldCheck,
    code: "RENIEC · SUNAT",
    title: "Validación de identidad",
    description:
      "Clientes y proveedores validados contra RENIEC y el padrón de SUNAT al registrarlos. Datos limpios desde el origen.",
  },
  {
    icon: Calculator,
    code: "CIERRE",
    title: "Reportes para tu contador",
    description:
      "Cierres de caja, kardex y reportes contables que cuadran con lo declarado. El fin de mes deja de ser una reconstrucción arqueológica.",
  },
]

export default function ComplianceSection() {
  return (
    <section id="cumplimiento" className="py-20 md:py-32 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <header className="mb-14 md:mb-20">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 04 — Cumplimiento
          </p>
          <KineticText
            as="h2"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground max-w-4xl"
          >
            Cumplimiento SUNAT <span className="text-brand">de fábrica</span>
          </KineticText>
          <Reveal effect="fade" delay={0.15}>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
              En Perú, cumplir no es opcional — y parcharlo después sale caro. Por eso nuestros
              sistemas no tratan el cumplimiento como un módulo aparte: nacen integrados con
              SUNAT, y todo cuadra desde el primer día.
            </p>
          </Reveal>
        </header>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
          {ITEMS.map((item) => (
            <article
              key={item.code}
              className="bg-card p-7 rounded-lg shadow-hairline hover:shadow-hairline-md transition-shadow duration-300 h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="spec-label text-brand">[{item.code}]</span>
                <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
              </div>
              <h3 className="font-display text-lg font-bold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{item.description}</p>
            </article>
          ))}
        </StaggerGroup>

        <Reveal effect="fade">
          <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 rounded-lg bg-secondary shadow-hairline">
            <p className="text-foreground text-sm md:text-base leading-relaxed max-w-2xl">
              ¿No sabes en qué estado está tu operación frente a SUNAT — o si tu sistema actual
              te está dejando huecos? Empecemos por un diagnóstico honesto.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/cumplimiento-sunat"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-background text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md transition-all"
              >
                Evaluar mi cumplimiento
              </Link>
              <Link
                href="/diagnostico"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
              >
                Ver el diagnóstico
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
