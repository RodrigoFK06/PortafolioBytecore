import type { Metadata } from "next"
import Link from "next/link"
import ExcelCostCalculator from "@/components/ExcelCostCalculator"
import { KineticText } from "@/components/motion/kinetic-text"

// ── Lead magnet interactivo #2 ──────────────────────────────────
// Calculadora del costo mensual/anual de operar con Excel, WhatsApp
// y cuadernos. El contexto SSR es citable (AEO); el cálculo corre
// en cliente con los números del propio negocio.

const baseUrl = "https://xn--rkos-4na.com"

export const metadata: Metadata = {
  title: "Calculadora: ¿cuánto te cuesta operar en Excel? | Árkos",
  description:
    "Calcula con tus propios números cuánto te cuesta al mes operar tu negocio con Excel, WhatsApp y cuadernos: horas de digitación doble y errores manuales, en soles. Sin registro.",
  alternates: { canonical: "/costo-del-excel" },
  openGraph: {
    title: "¿Cuánto te cuesta operar en Excel?",
    description:
      "Horas de trabajo manual + errores recurrentes, con tus números y en soles. El resultado suele sorprender.",
    url: `${baseUrl}/costo-del-excel`,
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
}

export default function CostoDelExcelPage() {
  return (
    <main className="pt-28 md:pt-36 pb-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <header className="max-w-3xl mb-10 md:mb-14">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            Calculadora — Sin registro
          </p>
          <KineticText
            as="h1"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            ¿Cuánto te cuesta operar <span className="text-brand">en Excel</span>?
          </KineticText>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            El Excel parece gratis, pero operar con él tiene un costo que se paga todos los meses:
            horas de digitación doble, cuadres manuales y errores recurrentes. Pon tus números y
            míralo en soles. La estimación es conservadora a propósito — la realidad suele ser peor.
          </p>
        </header>

        <div className="max-w-5xl">
          <ExcelCostCalculator />
        </div>

        <p className="max-w-5xl mt-8 text-sm text-muted-foreground leading-relaxed">
          ¿Quieres saber si tu caso ya amerita un sistema? Haz{" "}
          <Link href="/necesitas-un-sistema" className="text-brand hover:underline">
            el test de 10 preguntas
          </Link>{" "}
          o revisa cómo funciona{" "}
          <Link href="/diagnostico" className="text-brand hover:underline">
            el diagnóstico
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
