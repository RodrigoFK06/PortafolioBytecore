import type { Metadata } from "next"
import Link from "next/link"
import SystemTest from "@/components/SystemTest"
import { KineticText } from "@/components/motion/kinetic-text"

// ── Lead magnet interactivo #1 ──────────────────────────────────
// Self-assessment basado en la checklist del post "5 señales".
// Indexable: el contexto SSR de esta página es citable (AEO); el
// quiz corre en cliente.

const baseUrl = "https://xn--rkos-4na.com"

export const metadata: Metadata = {
  title: "Test: ¿Tu negocio ya necesita un sistema? | Árkos",
  description:
    "10 preguntas honestas para saber si tu pyme ya necesita software a medida, un ajuste de lo que tienes — o nada todavía. Resultado al instante, sin registro.",
  alternates: { canonical: "/necesitas-un-sistema" },
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

        <p className="max-w-3xl mt-8 text-sm text-muted-foreground leading-relaxed">
          Este test está basado en la checklist de{" "}
          <Link href="/blog/5-senales-tu-negocio-necesita-un-sistema" className="text-brand hover:underline">
            “5 señales de que tu negocio ya necesita un sistema”
          </Link>
          , escrita desde casos reales de restaurantes, hoteles, clínicas y servicios técnicos en Perú.
        </p>
      </div>
    </main>
  )
}
