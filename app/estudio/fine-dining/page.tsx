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

  const meta = ["≈ 4 minutos", "2 preguntas obligatorias", "100% confidencial"]

  return (
    <main className="relative min-h-screen bg-background">
      {/* Glow ambiental de marca */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[820px] max-w-[130vw] rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 sm:px-6 pt-28 sm:pt-36 pb-28">
        {/* Encabezado / Intro */}
        <header className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.06] px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
              Árkos · Investigación
            </span>
          </div>

          <h1 className="text-[2rem] leading-[1.1] sm:text-[2.75rem] font-bold text-foreground tracking-tight mb-6">
            Tu mirada experta sobre el fine dining
          </h1>

          <div className="space-y-4 text-foreground/75 leading-relaxed text-[15px] sm:text-[17px] max-w-xl">
            <p>
              Estamos diseñando herramientas pensadas para restaurantes de menú degustación en Perú,
              y tu experiencia con <strong className="text-foreground font-semibold">{restaurant}</strong> es
              exactamente la mirada que necesitamos.
            </p>
            <p className="text-foreground/60">
              Son pocas preguntas, la mayoría rápidas. Gracias por el tiempo.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {meta.map((m) => (
              <span
                key={m}
                className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/70"
              >
                {m}
              </span>
            ))}
          </div>
        </header>

        <FineDiningSurvey restaurant={restaurant} />

        <p className="mt-10 text-center text-xs text-foreground/45">
          Tus respuestas llegan directo al equipo de Árkos. No las compartimos con terceros.
        </p>
      </div>
    </main>
  )
}
