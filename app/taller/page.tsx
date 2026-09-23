import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Compass, FlaskConical, ListChecks } from "lucide-react"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { SITE_CONFIG } from "@/lib/constants"
import { alternates } from "@/lib/seo"
import {
  PRECIO_TALLER,
  TALLER_HORAS,
  TALLER_PERSONAS_MAX,
  PRECIO_DIAGNOSTICO,
  GARANTIA_MULTIPLO,
  soles,
} from "@/data/pricing"

// ── Taller de adopción de tecnología — la puerta de entrada ─────
// Orden de la oferta (decidido 2026-09-22): taller → diagnóstico →
// desarrollo a medida. El taller NO es "de IA": es de adopción de
// tecnología, con la IA como camino, y enseña criterio de uso.
// Formato cerrado y repetible: lo da Rodrigo en persona.
// Sin testimonios: la prueba es el método, no citas inventadas.
// Precio, duración y grupo viven en data/pricing.ts.

const baseUrl = "https://xn--rkos-4na.com"

export const metadata: Metadata = {
  title: "Taller de adopción de tecnología e IA para equipos | Árkos",
  description:
    `Un taller de ${TALLER_HORAS} horas para que tu equipo aprenda a usar la tecnología —y la IA— con criterio, sobre su propio trabajo. Hasta ${TALLER_PERSONAS_MAX} personas, S/ ${soles(PRECIO_TALLER)} por grupo.`,
  alternates: alternates("/taller"),
  openGraph: {
    title: "Taller de adopción de tecnología e IA para equipos | Árkos",
    description:
      "No es un curso de IA. Es criterio: qué herramienta sirve para qué, probado sobre el trabajo real de tu equipo.",
    url: `${baseUrl}/taller`,
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
}

const WA_TALLER = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
  `Hola Rodrigo, quiero el taller de adopción de tecnología para mi equipo (S/ ${soles(PRECIO_TALLER)}).`
)}`

const INCLUYE = [
  `${TALLER_HORAS} horas con tu equipo, hasta ${TALLER_PERSONAS_MAX} personas.`,
  "Lo da Rodrigo Torres en persona, no un instructor de catálogo.",
  "Los ejercicios salen de las tareas reales de tu equipo, no de ejemplos genéricos.",
  "Un mapa escrito de las tareas repetidas: cuáles se llevan a una herramienta y cuáles no.",
  "Presencial en Lima y Callao, o por videollamada para el resto del Perú.",
]

const BLOQUES = [
  {
    icon: Compass,
    code: "BLOQUE 1",
    title: "Criterio",
    description:
      "Cada herramienta y cada modelo tiene sus fuertes. Lo primero es saber cuál sirve para qué, cuándo confiar en lo que responde y cuándo no.",
  },
  {
    icon: FlaskConical,
    code: "BLOQUE 2",
    title: "Jugar con el trabajo real",
    description:
      "Se aprende jugando. Cada persona prueba con sus propias tareas —el correo que redacta cada lunes, el reporte que arma a mano— hasta que le sale solo.",
  },
  {
    icon: ListChecks,
    code: "BLOQUE 3",
    title: "El mapa",
    description:
      "Salimos con la lista de tareas repetidas del equipo: cuáles ya pueden hacerse con la herramienta, cuáles necesitan ordenar antes el proceso y cuáles no conviene tocar.",
  },
]

const FAQS = [
  {
    q: "¿Es un curso de IA?",
    a: "No. Es un taller de adopción de tecnología, y la IA es el camino. Lo que se enseña es criterio de uso: qué herramienta sirve para qué, cuándo confiar en lo que responde y cuándo no. Las herramientas cambian cada pocos meses; el criterio se queda.",
  },
  {
    q: "¿Un taller alcanza para que el equipo adopte la tecnología?",
    a: "No, y no lo prometemos. Adoptar lleva semanas: que el equipo siga usando la herramienta cuando ya nadie se lo recuerda. El taller es el primer paso: el equipo pierde el miedo, aprende el criterio y sale con un mapa de por dónde empezar.",
  },
  {
    q: "¿Mi equipo necesita saber de tecnología?",
    a: "No. Se trabaja sobre lo que cada persona ya hace en su puesto. Si alguien sabe mandar un correo y llenar un Excel, puede aprovechar el taller.",
  },
  {
    q: `¿Y si somos más de ${TALLER_PERSONAS_MAX} personas?`,
    a: `Se arma en grupos de hasta ${TALLER_PERSONAS_MAX}; cada grupo es un taller. Con más gente en la sala ya no hay tiempo de trabajar sobre las tareas de cada uno, que es justo lo que hace que sirva.`,
  },
  {
    q: "¿Qué pasa después del taller?",
    a: `Nada obligatorio: el mapa es tuyo y puedes usarlo solo. Si el mapa muestra procesos que conviene ordenar antes de automatizar, el siguiente paso es el diagnóstico de procesos (S/ ${soles(PRECIO_DIAGNOSTICO)}, dos semanas), con garantía: si no encuentra pérdidas de al menos ${GARANTIA_MULTIPLO} veces su precio al año, te devolvemos el pago. Taller y diagnóstico se pagan por separado: uno forma al equipo, el otro le sirve al dueño para decidir.`,
  },
]

export default function TallerPage() {
  return (
    <main className="pt-28 md:pt-36 pb-20 bg-background">
      {/* JSON-LD: breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
              { "@type": "ListItem", position: 2, name: "Taller", item: `${baseUrl}/taller` },
            ],
          }),
        }}
      />

      {/* JSON-LD: FAQ visible de la página (mismo array FAQS → siempre en sync) */}
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

      {/* JSON-LD: servicio con su oferta por grupo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${baseUrl}/taller#service`,
            name: "Taller de adopción de tecnología e IA para equipos",
            serviceType: "Formación en adopción de tecnología e inteligencia artificial",
            provider: { "@id": `${baseUrl}/#organization` },
            areaServed: [{ "@type": "Country", name: "Peru" }],
            description:
              "Taller para equipos de empresa: criterio de uso de la tecnología y la IA, ejercicios sobre las tareas reales del equipo y un mapa escrito de qué tareas llevar a una herramienta.",
            offers: {
              "@type": "Offer",
              name: `Taller de ${TALLER_HORAS} horas (hasta ${TALLER_PERSONAS_MAX} personas)`,
              price: String(PRECIO_TALLER),
              priceCurrency: "PEN",
              description: "Precio por grupo. Lo dicta Rodrigo Torres, fundador de Árkos.",
            },
          }),
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <header className="max-w-4xl mb-14 md:mb-20">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            Paso 01 — La puerta de entrada
          </p>
          <KineticText
            as="h1"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Tu equipo ya tiene la tecnología. <span className="text-brand">Falta el criterio.</span>
          </KineticText>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            Un taller de adopción de tecnología, con la IA como camino. No enseñamos una
            herramienta de moda: enseñamos a decidir qué sirve para qué, probándolo sobre el
            trabajo real de tu equipo.
          </p>
        </header>

        {/* Oferta */}
        <Reveal effect="rise">
          <article className="relative bg-card p-8 md:p-10 rounded-lg shadow-hairline-md ring-1 ring-brand/30 max-w-3xl mb-16 md:mb-24">
            <p className="spec-label text-brand mb-4">Formato cerrado — Siempre el mismo</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Taller de adopción de tecnología
            </h2>
            <p className="font-mono tabular text-3xl font-medium text-foreground mb-6">
              S/ {soles(PRECIO_TALLER)}{" "}
              <span className="text-sm text-muted-foreground">
                · por grupo · {TALLER_HORAS} horas
              </span>
            </p>
            <ul className="space-y-2.5 mb-8">
              {INCLUYE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={WA_TALLER}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Agendar el taller
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </article>
        </Reveal>

        {/* Cómo funciona */}
        <section className="max-w-5xl mb-16 md:mb-24">
          <Reveal effect="fade">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              Qué pasa en esas {TALLER_HORAS} horas
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.1}>
            {BLOQUES.map((b) => (
              <article key={b.code} className="bg-card p-7 rounded-lg shadow-hairline">
                <div className="flex items-center justify-between mb-5">
                  <span className="spec-label text-brand">[{b.code}]</span>
                  <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center">
                    <b.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold mb-2 text-foreground">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
              </article>
            ))}
          </StaggerGroup>
        </section>

        {/* Para quién sí / no */}
        <section className="max-w-5xl mb-16 md:mb-24">
          <Reveal effect="rise">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-7 rounded-lg bg-secondary shadow-hairline">
                <p className="spec-label text-brand mb-4">Es para tu equipo si…</p>
                <ul className="space-y-2.5 text-sm text-foreground leading-relaxed">
                  <li>· Pagan herramientas que casi nadie usa, o que cada uno usa a su manera.</li>
                  <li>· Alguien prueba la IA por su cuenta y el resto no sabe ni por dónde empezar.</li>
                  <li>· Las mismas tareas manuales se repiten cada semana y nadie tiene tiempo de pensarlas.</li>
                  <li>· Quieres saber qué se puede mejorar antes de comprar nada.</li>
                </ul>
              </div>
              <div className="p-7 rounded-lg bg-secondary shadow-hairline">
                <p className="spec-label mb-4">No es para tu equipo si…</p>
                <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                  <li>· Buscas una certificación o un curso técnico de programación.</li>
                  <li>· Necesitas un sistema construido ya: para eso está el diagnóstico.</li>
                  <li>· Esperas que en {TALLER_HORAS} horas el equipo cambie cómo trabaja para siempre.</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Puente al paso 2 */}
        <Reveal effect="fade">
          <div className="max-w-5xl mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 rounded-lg bg-card shadow-hairline">
            <div>
              <p className="spec-label text-brand mb-2">Paso 02</p>
              <p className="text-foreground text-sm md:text-base leading-relaxed max-w-xl">
                Si el mapa muestra procesos que hay que ordenar antes de automatizar, sigue el
                diagnóstico de procesos: dos semanas, S/ {soles(PRECIO_DIAGNOSTICO)} y garantía de
                devolución si no encuentra pérdidas de al menos {GARANTIA_MULTIPLO} veces su precio.
              </p>
            </div>
            <Link
              href="/diagnostico"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all shrink-0"
            >
              Ver el diagnóstico
              <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {/* FAQ */}
        <section className="max-w-3xl">
          <Reveal effect="fade">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <StaggerGroup className="divide-y divide-border border-t border-b border-border" stagger={0.06}>
            {FAQS.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{f.a}</p>
              </div>
            ))}
          </StaggerGroup>
          <p className="text-sm text-muted-foreground mt-8 leading-relaxed">
            Más sobre cómo lo trabajamos:{" "}
            <Link href="/blog/adopcion-de-ia-en-empresas" className="text-brand hover:underline">
              adopción de IA en empresas, cómo lograr que tu equipo la use de verdad
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
