import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, MessageCircle, Search, FileText, ClipboardCheck } from "lucide-react"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { SITE_CONFIG } from "@/lib/constants"
import { alternates } from "@/lib/seo"

// ── Oferta de entrada productizada ──────────────────────────────
// Dos niveles: llamada gratis (punto de entrada) + diagnóstico
// profundo pagado (califica, entrega valor real y convierte).
// El precio se descuenta íntegro del proyecto si avanzamos.

const PRECIO_DIAGNOSTICO = 950 // S/ — ajustable; se refleja en UI y JSON-LD

const baseUrl = "https://xn--rkos-4na.com"

export const metadata: Metadata = {
  title: "Diagnóstico de sistemas para tu negocio | Árkos",
  description:
    `Antes de escribir código, un diagnóstico honesto: llamada gratis de 30 minutos o diagnóstico profundo de 2 semanas (S/ ${PRECIO_DIAGNOSTICO}, descontable del proyecto) con auditoría de operación, cumplimiento SUNAT y roadmap con costos.`,
  alternates: alternates("/diagnostico"),
  openGraph: {
    title: "Diagnóstico de sistemas para tu negocio | Árkos",
    description:
      "A veces la respuesta es un sistema; a veces es ordenar lo que ya tienes. Te lo decimos con honestidad — y con un plan.",
    url: `${baseUrl}/diagnostico`,
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
}

const WA_GRATIS = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
  "Hola Rodrigo, quiero agendar la llamada de diagnóstico gratis de 30 minutos."
)}`
const WA_PROFUNDO = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
  `Hola Rodrigo, quiero reservar el Diagnóstico profundo (S/ ${PRECIO_DIAGNOSTICO}).`
)}`

const PROFUNDO_INCLUYE = [
  "Entrevistas con las personas que operan el negocio (no solo con el dueño).",
  "Revisión de tus herramientas actuales: Excel, sistemas enlatados, WhatsApp, cuadernos.",
  "Auditoría de cumplimiento: facturación electrónica, PLE/SIRE, huecos frente a SUNAT.",
  "Mapa de tu operación real: dónde se pierde tiempo, plata o clientes.",
  "Informe final: esto encontramos, esto te cuesta cada mes, así se arregla.",
  "Roadmap priorizado con costos reales — construyas con nosotros o no.",
]

const SEMANAS = [
  {
    icon: Search,
    code: "SEMANA 1",
    title: "Entender la operación",
    description:
      "Entrevistas, revisión de herramientas y números. Vemos cómo funciona tu negocio de verdad — no cómo debería funcionar en teoría.",
  },
  {
    icon: FileText,
    code: "SEMANA 2",
    title: "Informe y roadmap",
    description:
      "Te entregamos el diagnóstico por escrito y lo revisamos juntos en una sesión: hallazgos, costos de no actuar y un plan priorizado con precios.",
  },
]

const FAQS = [
  {
    q: "¿Por qué el diagnóstico profundo es pagado?",
    a: `Porque es trabajo real con un entregable real: dos semanas de análisis y un roadmap que vale por sí mismo, construyas con nosotros o no. Y porque el compromiso funciona en ambas direcciones — los S/ ${PRECIO_DIAGNOSTICO} se descuentan íntegros del proyecto si avanzamos.`,
  },
  {
    q: "¿Qué pasa si la conclusión es que NO necesito un sistema?",
    a: "Te lo decimos tal cual, por escrito, con lo que sí deberías hacer (ordenar tu Excel, definir un proceso, esperar más volumen). Te habrás ahorrado varios miles de soles en software que no necesitabas.",
  },
  {
    q: "¿Funciona si estoy fuera de Lima o de Perú?",
    a: "Sí. Las entrevistas y la sesión de cierre son por videollamada; la revisión de herramientas es remota. Operamos desde Lima —donde también hacemos reuniones presenciales agendadas— y trabajamos con clientes de todo el Perú y de otros países.",
  },
  {
    q: "¿En qué se diferencia de la llamada gratis?",
    a: "La llamada gratis es una lectura honesta de 30 minutos: te digo si esto pinta a sistema, a ajuste o a nada todavía. El diagnóstico profundo es un análisis de dos semanas con entregable: números, hallazgos y un plan con costos.",
  },
]

export default function DiagnosticoPage() {
  return (
    <main className="pt-28 md:pt-36 pb-20 bg-background">
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

      {/* JSON-LD: servicio con sus dos ofertas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${baseUrl}/diagnostico#service`,
            name: "Diagnóstico de sistemas para pymes",
            serviceType: "Auditoría de operación, sistemas y cumplimiento SUNAT",
            provider: { "@id": `${baseUrl}/#organization` },
            areaServed: [{ "@type": "Country", name: "Peru" }, { "@type": "Place", name: "Latinoamérica" }],
            description:
              "Diagnóstico honesto de la operación de un negocio antes de construir software: auditoría de herramientas, cumplimiento SUNAT (facturación electrónica, PLE/SIRE) y roadmap priorizado con costos.",
            offers: [
              {
                "@type": "Offer",
                name: "Llamada de diagnóstico (30 minutos)",
                price: "0",
                priceCurrency: "PEN",
                description: "Lectura honesta de 30 minutos: sistema, ajuste o nada todavía.",
              },
              {
                "@type": "Offer",
                name: "Diagnóstico profundo (2 semanas)",
                price: String(PRECIO_DIAGNOSTICO),
                priceCurrency: "PEN",
                description:
                  "Auditoría de operación y cumplimiento con informe y roadmap con costos. El precio se descuenta íntegro del proyecto si avanzamos.",
              },
            ],
          }),
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <header className="max-w-4xl mb-14 md:mb-20">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            Diagnóstico — La puerta de entrada
          </p>
          <KineticText
            as="h1"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Primero el diagnóstico, <span className="text-brand">después el código</span>
          </KineticText>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            A veces la respuesta es un sistema a medida. A veces es ordenar lo que ya tienes. Y a
            veces es no hacer nada todavía. Nuestro trabajo empieza por decirte cuál es tu caso —
            con números, no con un pitch.
          </p>
        </header>

        {/* Dos niveles */}
        <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mb-16 md:mb-24" stagger={0.1}>
          {/* Nivel 1 — gratis */}
          <article className="bg-card p-8 md:p-10 rounded-lg shadow-hairline flex flex-col">
            <p className="spec-label mb-4">Nivel 01 — Para empezar</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Llamada de diagnóstico
            </h2>
            <p className="font-mono tabular text-3xl font-medium text-foreground mb-6">
              Gratis <span className="text-sm text-muted-foreground">· 30 min</span>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
              Me cuentas cómo opera tu negocio y te doy una lectura honesta: si lo tuyo pinta a
              sistema, a un ajuste de lo que ya tienes, o a nada todavía. Sin compromiso — aunque
              no terminemos trabajando juntos.
            </p>
            <a
              href={WA_GRATIS}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
            >
              <MessageCircle className="h-4 w-4 text-brand" aria-hidden="true" />
              Agendar por WhatsApp
            </a>
          </article>

          {/* Nivel 2 — pagado (destacado) */}
          <article className="relative bg-card p-8 md:p-10 rounded-lg shadow-hairline-md flex flex-col ring-1 ring-brand/30">
            <p className="spec-label text-brand mb-4">Nivel 02 — El diagnóstico completo</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Diagnóstico profundo
            </h2>
            <p className="font-mono tabular text-3xl font-medium text-foreground mb-1">
              S/ {PRECIO_DIAGNOSTICO} <span className="text-sm text-muted-foreground">· 2 semanas</span>
            </p>
            <p className="text-sm text-brand font-medium mb-6">
              Se descuenta íntegro del proyecto si avanzamos.
            </p>
            <ul className="space-y-2.5 mb-8 flex-grow">
              {PROFUNDO_INCLUYE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={WA_PROFUNDO}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Reservar diagnóstico
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </article>
        </StaggerGroup>

        {/* Cómo funciona */}
        <section className="max-w-5xl mb-16 md:mb-24">
          <Reveal effect="fade">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              Cómo funciona el diagnóstico profundo
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.1}>
            {SEMANAS.map((s) => (
              <article key={s.code} className="bg-card p-7 rounded-lg shadow-hairline">
                <div className="flex items-center justify-between mb-5">
                  <span className="spec-label text-brand">[{s.code}]</span>
                  <div className="w-11 h-11 rounded-md bg-secondary flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold mb-2 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </article>
            ))}
          </StaggerGroup>
        </section>

        {/* Para quién sí / no */}
        <section className="max-w-5xl mb-16 md:mb-24">
          <Reveal effect="rise">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-7 rounded-lg bg-secondary shadow-hairline">
                <p className="spec-label text-brand mb-4">Es para ti si…</p>
                <ul className="space-y-2.5 text-sm text-foreground leading-relaxed">
                  <li>· Tu operación vive repartida en Excel, WhatsApp y cuadernos que no se hablan.</li>
                  <li>· Facturas y declaras, pero sospechas que hay huecos frente a SUNAT.</li>
                  <li>· Pagas un sistema enlatado que te obliga a operar a su manera.</li>
                  <li>· Creciste más rápido que tus herramientas y las decisiones llegan tarde.</li>
                </ul>
              </div>
              <div className="p-7 rounded-lg bg-secondary shadow-hairline">
                <p className="spec-label mb-4">No es para ti si…</p>
                <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                  <li>· Buscas una cotización rápida sin mirar la operación (eso sale mal — no lo hacemos).</li>
                  <li>· Tu volumen todavía cabe cómodo en una hoja de cálculo bien hecha.</li>
                  <li>· Necesitas un logo o una web básica: eso lo cotizamos directo, sin diagnóstico.</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Test bridge */}
        <Reveal effect="fade">
          <div className="max-w-5xl mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 rounded-lg bg-card shadow-hairline">
            <div>
              <p className="spec-label text-brand mb-2">3 minutos</p>
              <p className="text-foreground text-sm md:text-base leading-relaxed max-w-xl">
                ¿No estás seguro de si esto es para ti? Responde el test de 10 preguntas y te damos
                una lectura inicial al instante. También tenemos un{" "}
                <Link href="/cumplimiento-sunat" className="text-brand hover:underline">
                  assessment de cumplimiento SUNAT
                </Link>{" "}
                y una{" "}
                <Link href="/costo-del-excel" className="text-brand hover:underline">
                  calculadora del costo del Excel
                </Link>
                .
              </p>
            </div>
            <Link
              href="/necesitas-un-sistema"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all shrink-0"
            >
              <ClipboardCheck className="h-4 w-4 text-brand" aria-hidden="true" />
              Hacer el test
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
        </section>
      </div>
    </main>
  )
}
