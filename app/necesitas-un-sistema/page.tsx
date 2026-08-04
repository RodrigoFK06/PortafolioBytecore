import type { Metadata } from "next"
import Link from "next/link"
import { alternates } from "@/lib/seo"
import SystemTest from "@/components/SystemTest"
import { KineticText } from "@/components/motion/kinetic-text"

// ── Lead magnet interactivo #1 ──────────────────────────────────
// Self-assessment basado en la checklist del post "5 señales".
// Indexable: el contexto SSR de esta página es citable (AEO); el
// quiz corre en cliente.

const baseUrl = "https://xn--rkos-4na.com"

const FAQS = [
  {
    q: "¿Qué evalúa este test?",
    a: "Diez señales operativas de que un negocio superó sus herramientas: información repartida en fuentes que no se conectan, dependencia de la memoria de una persona, errores manuales recurrentes, doble digitación, cierres de mes reconstruidos a mano y capacidad de escalar. Cada respuesta suma puntos y el total ubica al negocio en uno de tres perfiles.",
  },
  {
    q: "¿Qué significan los tres resultados posibles?",
    a: "«Todavía no» (0-5 puntos): tu operación aún cabe en herramientas simples y comprar software sería prematuro. «Zona gris» (6-12): hay fricción real que puede resolverse con ajustes o con un sistema — amerita una conversación. «Ya te quedó chico el Excel» (13-20): las señales indican que el desorden ya cuesta dinero todos los meses y un diagnóstico con números es el siguiente paso lógico.",
  },
  {
    q: "¿El resultado me compromete a algo?",
    a: "No. El test es gratuito, sin registro, y una de sus respuestas posibles es precisamente «no compres software todavía». Si tu puntaje es alto, puedes agendar una llamada gratuita de 30 minutos o un diagnóstico profundo de dos semanas — pero el resultado es tuyo y ya.",
  },
]

export const metadata: Metadata = {
  title: "Test: ¿Tu negocio ya necesita un sistema? | Árkos",
  description:
    "10 preguntas honestas para saber si tu pyme ya necesita software a medida, un ajuste de lo que tienes — o nada todavía. Resultado al instante, sin registro.",
  alternates: alternates("/necesitas-un-sistema"),
  openGraph: {
    title: "Test: ¿Tu negocio ya necesita un sistema?",
    description:
      "10 preguntas, 3 minutos, resultado honesto — incluida la respuesta “todavía no”.",
    url: `${baseUrl}/necesitas-un-sistema`,
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
}

export default function NecesitasUnSistemaPage() {
  return (
    <main className="pt-28 md:pt-36 pb-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${baseUrl}/necesitas-un-sistema#app`,
            name: "Test: ¿Tu negocio ya necesita un sistema?",
            url: `${baseUrl}/necesitas-un-sistema`,
            description:
              "Self-assessment gratuito de 10 preguntas para saber si una pyme ya necesita software a medida, un ajuste de sus herramientas o nada todavía.",
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
            Test de 3 minutos — Sin registro
          </p>
          <KineticText
            as="h1"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            ¿Tu negocio ya necesita <span className="text-brand">un sistema</span>?
          </KineticText>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            10 preguntas sobre cómo opera tu negocio de verdad. Al final te decimos con honestidad
            si lo tuyo pinta a software a medida, a un ajuste de lo que ya tienes — o a nada
            todavía. Sí, “todavía no” es una de las respuestas posibles.
          </p>
        </header>

        <div className="max-w-3xl">
          <SystemTest />
        </div>

        {/* FAQ extraíble (SSR) */}
        <section className="max-w-3xl mt-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>
          <div className="divide-y divide-border border-t border-b border-border">
            {FAQS.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="max-w-3xl mt-8 text-sm text-muted-foreground leading-relaxed">
          Este test está basado en la checklist de{" "}
          <Link href="/blog/5-senales-tu-negocio-necesita-un-sistema" className="text-brand hover:underline">
            “5 señales de que tu negocio ya necesita un sistema”
          </Link>
          , escrita desde casos reales de restaurantes, hoteles, clínicas y servicios técnicos en
          Perú. ¿Quieres ver el costo en soles? Prueba la{" "}
          <Link href="/costo-del-excel" className="text-brand hover:underline">
            calculadora del costo del Excel
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
