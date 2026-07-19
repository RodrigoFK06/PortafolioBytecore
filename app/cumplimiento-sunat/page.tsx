import type { Metadata } from "next"
import Link from "next/link"
import SunatTest from "@/components/SunatTest"
import { KineticText } from "@/components/motion/kinetic-text"

// ── Lead magnet interactivo #3 — el moat hecho herramienta ──────
// Assessment de madurez de cumplimiento SUNAT para pymes. El
// contexto SSR de esta página es citable (AEO); el quiz corre en
// cliente.

const baseUrl = "https://xn--rkos-4na.com"

export const metadata: Metadata = {
  title: "Assessment: ¿Cómo está tu cumplimiento SUNAT? | Árkos",
  description:
    "8 preguntas para medir la fricción y el riesgo de tu operación frente a SUNAT: facturación electrónica, PLE/SIRE, validación de datos y cierre de mes. Resultado al instante, sin registro.",
  alternates: { canonical: "/cumplimiento-sunat" },
  openGraph: {
    title: "Assessment: ¿Cómo está tu cumplimiento SUNAT?",
    description:
      "Mide en 3 minutos cuánta fricción y riesgo tiene tu operación frente a SUNAT — y qué hacer al respecto.",
    url: `${baseUrl}/cumplimiento-sunat`,
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
}

export default function CumplimientoSunatPage() {
  return (
    <main className="pt-28 md:pt-36 pb-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <header className="max-w-3xl mb-10 md:mb-14">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            Assessment de 3 minutos — Sin registro
          </p>
          <KineticText
            as="h1"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            ¿Cómo está tu <span className="text-brand">cumplimiento SUNAT</span>?
          </KineticText>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            En Perú, cumplir no es opcional — pero muchas pymes cumplen a costa de digitación
            doble, cuadres manuales y cierres de mes heroicos. Estas 8 preguntas miden cuánta
            fricción (y cuánto riesgo) tiene tu operación frente a SUNAT: facturación
            electrónica, PLE/SIRE, datos validados y sustento de periodos.
          </p>
        </header>

        <div className="max-w-3xl">
          <SunatTest />
        </div>

        <p className="max-w-3xl mt-8 text-sm text-muted-foreground leading-relaxed">
          Nuestros sistemas integran el cumplimiento{" "}
          <Link href="/#cumplimiento" className="text-brand hover:underline">
            de fábrica
          </Link>
          : emisión de comprobantes, libros PLE/SIRE y validación RENIEC/SUNAT dentro del mismo
          sistema que opera tu negocio. Si prefieres empezar por una mirada general,{" "}
          <Link href="/necesitas-un-sistema" className="text-brand hover:underline">
            este test de 10 preguntas
          </Link>{" "}
          evalúa toda tu operación.
        </p>
      </div>
    </main>
  )
}
