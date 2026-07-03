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

  const meta = ["≈ 5 minutos", "Cero pitch de venta", "100% confidencial"]

  return (
    <main className="relative min-h-screen bg-background">
      {/* Glow ambiental de marca */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[820px] max-w-[130vw] rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Centrado por flex: el hijo NO usa mx-auto para no chocar con la regla global
          `.mx-auto { max-width: 100vw !important }` de globals.css que anularía el max-w. */}
      <div className="relative flex justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-28">
       <div className="w-full max-w-[600px]">
        {/* Encabezado estilo banner (barra de acento de marca arriba) */}
        <header className="overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm shadow-sm mb-6">
          <div className="h-2 w-full bg-gradient-to-r from-brand via-brand/80 to-brand/50" />
          <div className="p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.06] px-3 py-1 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
                Árkos · Investigación
              </span>
            </div>

            <h1 className="text-2xl sm:text-[2rem] leading-[1.12] font-bold text-foreground tracking-tight mb-4">
              Tu mirada experta sobre el fine dining
            </h1>

            <div className="space-y-3 text-foreground/75 leading-relaxed text-[15px]">
              <p>
                Ya conocimos cómo opera <strong className="text-foreground font-semibold">{restaurant}</strong> y,
                sinceramente, nos voló la cabeza lo afinado que está todo. No venimos a proponerte nada:
                venimos a aprender del sector desde tu experiencia.
              </p>
              <p className="text-foreground/60">
                Queremos entender de verdad cómo se opera un menú degustación y, sobre todo, dónde la están
                pasando mal los restaurantes parecidos al tuyo que todavía no llegan a ese nivel. Son pocas
                preguntas y abiertas. Gracias por el tiempo.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {meta.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </header>

        <FineDiningSurvey restaurant={restaurant} />

        <p className="mt-8 text-center text-xs text-foreground/45">
          Tus respuestas llegan directo al equipo de Árkos. No las compartimos con terceros.
        </p>
       </div>
      </div>
    </main>
  )
}
