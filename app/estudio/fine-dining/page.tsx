import type { Metadata } from "next"
import { FineDiningSurvey } from "@/components/fine-dining-survey"
import { FD_DEFAULT_RESTAURANT } from "@/lib/fine-dining-survey"

// Página privada: accesible solo por URL directa. No se indexa ni se sigue,
// no aparece en el sitemap ni enlazada desde ninguna parte del sitio.
export const metadata: Metadata = {
  title: "Tu mirada experta sobre el fine dining | Árkos",
  description:
    "Cuestionario privado de Árkos para chefs y operadores de restaurantes de menú degustación en Perú.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: undefined },
}

export default async function FineDiningSurveyPage({
  searchParams,
}: {
  searchParams: Promise<{ r?: string }>
}) {
  const params = await searchParams
  const restaurant = (params?.r || FD_DEFAULT_RESTAURANT).slice(0, 60)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-5 sm:px-6 pt-28 sm:pt-32 pb-24">
        {/* Encabezado / Intro */}
        <header className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-4">
            Árkos · Investigación
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6">
            Tu mirada experta sobre el fine dining
          </h1>
          <div className="space-y-4 text-foreground/75 leading-relaxed text-[15px] sm:text-base">
            <p>
              Estamos diseñando herramientas pensadas para restaurantes de menú degustación en Perú,
              y tu experiencia con <strong className="text-foreground">{restaurant}</strong> es exactamente
              la mirada que necesitamos.
            </p>
            <p>
              Son pocas preguntas, la mayoría rápidas. Gracias por el tiempo.
            </p>
          </div>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-brand/40 via-black/10 to-transparent dark:via-white/10" />
        </header>

        <FineDiningSurvey restaurant={restaurant} />
      </div>
    </main>
  )
}
