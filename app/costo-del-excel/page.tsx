import type { Metadata } from "next"
import Link from "next/link"
import ExcelCostCalculator from "@/components/ExcelCostCalculator"
import { KineticText } from "@/components/motion/kinetic-text"

// ── Lead magnet interactivo #2 ──────────────────────────────────
// Calculadora del costo mensual/anual de operar con Excel, WhatsApp
// y cuadernos. El contexto SSR es citable (AEO); el cálculo corre
// en cliente con los números del propio negocio.

const baseUrl = "https://xn--rkos-4na.com"

const FAQS = [
  {
    q: "¿Cómo calcula esta herramienta el costo de operar en Excel?",
    a: "Suma dos costos medibles: las horas de trabajo manual (personas × horas semanales × 4.33 semanas, valorizadas con el sueldo promedio ÷ 208 horas laborales al mes) y los errores recurrentes (errores al mes × costo promedio por error). Con los valores de referencia — 3 personas, 5 horas semanales cada una, sueldo de S/ 1,500 y 4 errores de S/ 80 — el resultado es aproximadamente S/ 788 al mes, unos S/ 9,461 al año.",
  },
  {
    q: "¿Qué costos NO incluye la estimación?",
    a: "Deliberadamente no incluye ventas perdidas por demoras, decisiones tardías por falta de información, ni multas por errores de cumplimiento tributario. Es una estimación conservadora: el costo real de operar con herramientas desconectadas suele ser mayor.",
  },
  {
    q: "¿Cuándo se justifica pasar de Excel a un sistema a medida?",
    a: "Cuando el costo anual del desorden se acerca o supera el costo del sistema. Como referencia, una web app a medida parte desde S/ 4,500 y un sistema empresarial (ERP, CRM, PMS) desde S/ 13,000 — si tu operación pierde S/ 9,000+ al año en horas y errores, la inversión se recupera rápido.",
  },
]

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${baseUrl}/costo-del-excel#app`,
            name: "Calculadora: ¿cuánto te cuesta operar en Excel?",
            url: `${baseUrl}/costo-del-excel`,
            description:
              "Calculadora gratuita que estima en soles el costo mensual y anual de operar un negocio con Excel y herramientas desconectadas: horas de trabajo manual y errores recurrentes.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            inLanguage: "es-PE",
            isAccessibleForFree: true,
            provider: { "@id": `${baseUrl}/#organization` },
            offers: { "@type": "Offer", price: "0", priceCurrency: "PEN" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
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

        {/* Contexto extraíble (SSR) — metodología y FAQ para lectores e IAs */}
        <section className="max-w-3xl mt-16 md:mt-20">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Cómo funciona el cálculo
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            La calculadora suma dos costos que toda pyme puede medir: el tiempo y los errores.
            Las horas de trabajo manual (digitación doble, cuadres, reportes armados a mano) se
            valorizan con el sueldo promedio del equipo; los errores recurrentes (facturas mal
            emitidas, pedidos perdidos, faltantes de caja) se multiplican por su costo promedio.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Con los valores de referencia — un negocio de 3 personas que pierden 5 horas semanales
            cada una, con sueldo de S/ 1,500 y 4 errores costosos al mes — el desorden cuesta
            alrededor de <strong className="text-foreground">S/ 788 al mes: más de S/ 9,400 al año</strong>.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>
          <div className="divide-y divide-border border-t border-b border-border mb-10">
            {FAQS.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

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
