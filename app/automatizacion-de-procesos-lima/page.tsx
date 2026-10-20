import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Check } from "lucide-react"

import { getService } from "@/data/services"
import {
  PRICE_TIERS,
  PRICE_FOOTNOTE,
  PRECIO_DIAGNOSTICO,
  DIAGNOSTICO_SEMANAS,
  GARANTIA_MULTIPLO,
  PRECIO_TALLER,
  TALLER_HORAS,
  TALLER_PERSONAS_MAX,
  soles,
} from "@/data/pricing"
import { alternates, absUrl, BASE_URL } from "@/lib/seo"

// ── /automatizacion-de-procesos-lima ────────────────────────────────────
// Página de servicio + ciudad para la consulta sin marca «automatización de
// procesos para empresas Lima» (medición del 19-oct). Calcada de
// /desarrollo-de-software-lima. La página de servicio sin ciudad sigue
// siendo /services/integracion-ia: esta enlaza a ella, no la reemplaza.
//
// Reglas duras, las mismas de la página de Lima:
//  · Sin `PostalAddress`: no hay dirección pública. `City Lima` en areaServed.
//  · El FAQPage del JSON-LD sale del MISMO array que el FAQ visible.
//  · Cero cifras inventadas: precios de data/pricing.ts, casos tal como están
//    en data/services.ts (integracion-ia) y data/projects.ts.

const PAGE_PATH = "/automatizacion-de-procesos-lima"
const PAGE_URL = absUrl(PAGE_PATH)

const TITLE = "Automatización de Procesos para Empresas en Lima | Árkos"
const DESCRIPTION =
  "Automatización de procesos para empresas en Lima: qué automatizar primero, con n8n, Make, IA o un sistema a medida. Desde S/ 1,900, con diagnóstico con garantía."

const WA_MESSAGE = encodeURIComponent(
  "Hola Árkos, mi empresa está en Lima y quiero automatizar un proceso."
)
const WA_LINK = `https://wa.me/51961869348?text=${WA_MESSAGE}`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternates(PAGE_PATH),
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: PAGE_URL,
    siteName: "Árkos",
    title: TITLE,
    description:
      "Medimos dónde se va el tiempo de tu equipo, ordenamos el proceso y recién después lo automatizamos. Para empresas de Lima, desde S/ 1,900.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Automatización de procesos para empresas en Lima — Árkos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatización de procesos para empresas en Lima — Árkos",
    description:
      "Medimos dónde se va el tiempo de tu equipo, ordenamos el proceso y recién después lo automatizamos. Desde S/ 1,900.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

const IA = getService("integracion-ia")!
const PRECIO_AUTOMATIZACION = PRICE_TIERS.find((p) => p.name === "Integración y adopción de IA")!
const PRECIO_SISTEMA = PRICE_TIERS.find((p) => p.name.startsWith("Sistema a medida"))!

// Los mismos candidatos que el post «Qué procesos automatizar primero».
const PROCESOS = [
  {
    title: "Registro doble de pedidos o ventas",
    body: "El pedido llega por WhatsApp o en papel y alguien lo vuelve a escribir en el Excel, en la caja o en el sistema de facturación.",
  },
  {
    title: "Cierre y cuadre de caja",
    body: "Sumar ventas, separar efectivo, Yape, tarjeta y transferencias, y buscar la diferencia cada noche.",
  },
  {
    title: "Conciliación de pagos",
    body: "Cruzar los abonos del banco o de la billetera con lo que se vendió o se facturó.",
  },
  {
    title: "Confirmaciones y recordatorios",
    body: "Citas, reservas, entregas y cobros pendientes que hoy alguien avisa uno por uno.",
  },
  {
    title: "Reportes armados a mano",
    body: "El resumen de cada lunes que alguien copia de tres lugares distintos.",
  },
  {
    title: "Consultas que se repiten",
    body: "Las mismas veinte preguntas sobre precios, horarios o el estado de un pedido, respondidas con tus datos y pasadas a una persona cuando hace falta.",
  },
]

const PREGUNTAS = [
  "¿Se repite muchas veces por semana?",
  "¿Sigue reglas que podrías escribir en una hoja?",
  "¿Le cuesta horas a personas, sumadas entre todos?",
  "¿Hoy deja errores que puedes contar?",
]

// Casos tal como los describe /services/integracion-ia, más RestHUB.
const CASOS = [
  ...IA.cases.filter((c) => [12, 28, 21].includes(c.id)),
  {
    id: 19,
    title: "RestHUB",
    note: "ERP propio para restaurantes. En el piloto redujo el tiempo de toma de pedidos casi 60% y el cierre de caja de 45 a 5 minutos.",
  },
]

const PASOS = [
  {
    step: "01",
    title: "Llamada de 30 minutos, sin costo",
    body: "Nos cuentas qué proceso te quita más tiempo y te damos una lectura honesta: esto pinta a automatización, a ordenar el proceso primero o a nada todavía.",
  },
  {
    step: "02",
    title: `Diagnóstico de procesos (${DIAGNOSTICO_SEMANAS} semanas, S/ ${soles(PRECIO_DIAGNOSTICO)})`,
    body: `Medimos cuántas veces ocurre cada tarea, cuánto tarda y cuántos errores deja, y te entregamos el plan con costos. Garantía: si no encuentra pérdidas de al menos ${GARANTIA_MULTIPLO} veces su precio al año, te devolvemos el pago. Se descuenta del proyecto si avanzas.`,
  },
  {
    step: "03",
    title: "Ordenar el proceso",
    body: "Escribimos los pasos, las reglas y quién es el dueño. A veces este paso ya resuelve parte del problema antes de escribir una línea de código.",
  },
  {
    step: "04",
    title: "Automatizar uno, con registro",
    body: "Un proceso a la vez, documentado y con registro de cada ejecución, para que cuando algo falle se sepa dónde falló.",
  },
  {
    step: "05",
    title: "Medir de nuevo y elegir el siguiente",
    body: "Repetimos la misma medición del diagnóstico. Si el ahorro no se ve en los números, no se pasa al siguiente proceso.",
  },
]

// El FAQ visible y el FAQPage del schema salen de este mismo array.
const FAQS = [
  {
    q: "¿Cuánto cuesta automatizar un proceso en una empresa de Lima?",
    a: `Una automatización o un asistente con IA parte de S/ ${PRECIO_AUTOMATIZACION.penLabel} (USD ${PRECIO_AUTOMATIZACION.usdLabel}). Si el modelo de IA se paga por uso, ese costo va al proveedor y se estima antes de empezar. Cuando lo que hace falta es un sistema completo, un sistema a medida parte de S/ ${PRECIO_SISTEMA.penLabel}. Antes de invertir, calcula cuánto te cuesta hoy el proceso manual: si al año pierdes menos de lo que cuesta automatizarlo, no es el primer candidato.`,
  },
  {
    q: "¿Qué procesos conviene automatizar primero?",
    a: "El que se repite muchas veces por semana, sigue reglas claras, consume horas de personas y deja errores que se pueden contar. En comercio y servicios suelen ser el registro doble de pedidos, el cierre de caja, la conciliación de pagos y los recordatorios a clientes.",
  },
  {
    q: "¿Hace falta cambiar de sistema para automatizar?",
    a: "No siempre. Muchas automatizaciones conectan las herramientas que ya usas —formulario, hoja de cálculo, correo, WhatsApp, facturación— con n8n o Make. El sistema a medida conviene cuando ninguna pieza encaja con cómo trabaja tu negocio y terminas adaptando la operación al software.",
  },
  {
    q: "¿Cuánto demora automatizar un proceso?",
    a: `El diagnóstico toma ${DIAGNOSTICO_SEMANAS} semanas y deja el plan con el costo y el plazo de cada automatización. El plazo de cada una depende de cuántas herramientas hay que conectar y de si el proceso ya está escrito: se fija por escrito antes de empezar y se entrega por hitos, así que ves avance funcionando y no solo al final.`,
  },
  {
    q: "¿Trabajan con empresas fuera de Lima?",
    a: "Sí. Operamos desde Lima, con reuniones presenciales agendadas en Lima y Callao, y para el resto del Perú todo el proceso funciona por videollamada, en el mismo huso horario.",
  },
  {
    q: "¿Se puede automatizar un proceso que no está documentado?",
    a: "Se puede, pero sale caro: el flujo copia las inconsistencias y falla en cada excepción. Primero se escribe cómo se hace el proceso, con sus reglas y su responsable, y después se automatiza.",
  },
  {
    q: "¿La automatización usa inteligencia artificial?",
    a: "Solo donde paga: tareas repetitivas, de alto volumen y con un error que una persona puede revisar, como clasificar consultas, extraer datos de documentos o redactar borradores. Si el paso sigue reglas fijas, un flujo sin IA es más barato y más predecible. Las decisiones donde un error no admite revisión quedan en manos de una persona.",
  },
]

export default function AutomatizacionDeProcesosLimaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Automatización de procesos para empresas",
        serviceType: "Automatización de procesos",
        description:
          "Automatización de procesos para empresas de Lima: diagnóstico de dónde se va el tiempo del equipo, orden del proceso y automatización con n8n, Make, IA conectada a los datos de la empresa o un sistema a medida.",
        url: PAGE_URL,
        provider: { "@id": `${BASE_URL}/#organization` },
        // Sin PostalAddress: no hay dirección pública.
        areaServed: [
          { "@type": "City", name: "Lima", containedInPlace: { "@type": "Country", name: "Perú" } },
          { "@type": "AdministrativeArea", name: "Callao" },
        ],
        audience: { "@type": "BusinessAudience", name: "Empresas y pymes de Lima" },
        offers: [
          {
            "@type": "Offer",
            name: "Automatización o integración de IA",
            url: absUrl("/services/integracion-ia"),
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: Number(PRECIO_AUTOMATIZACION.penLabel.replace(/,/g, "")),
              priceCurrency: "PEN",
            },
          },
          {
            "@type": "Offer",
            name: `Diagnóstico de procesos (${DIAGNOSTICO_SEMANAS} semanas)`,
            url: absUrl("/diagnostico"),
            price: String(PRECIO_DIAGNOSTICO),
            priceCurrency: "PEN",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "Servicios", item: absUrl("/services") },
          { "@type": "ListItem", position: 3, name: "Automatización de procesos en Lima", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "es-PE",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${PAGE_URL}#service` },
        author: { "@id": `${BASE_URL}/#rodrigo-torres` },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
    ],
  }

  return (
    <main className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb visible ── */}
        <nav aria-label="Ruta de navegación" className="max-w-3xl mx-auto mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <li><Link href="/" className="hover:text-brand transition-colors">Inicio</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/services" className="hover:text-brand transition-colors">Servicios</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium">Automatización de procesos en Lima</li>
          </ol>
        </nav>

        {/* ── Hero: la respuesta va en el primer párrafo ── */}
        <header className="max-w-3xl mx-auto mb-20">
          <p className="spec-label mb-5">Lima · Callao · Todo el Perú</p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Automatización de procesos para empresas en <span className="text-brand">Lima</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Árkos hace automatización de procesos para empresas de Lima: el registro doble de
            pedidos, el cuadre de caja, la conciliación de pagos, los recordatorios y los reportes
            que hoy alguien arma a mano. Primero medimos dónde se va el tiempo de tu equipo, después
            ordenamos el proceso y recién entonces lo automatizamos, con n8n o Make, con IA conectada
            a tus datos o con un sistema a medida cuando las piezas no alcanzan.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Una automatización parte de{" "}
            <strong className="text-foreground">S/ {PRECIO_AUTOMATIZACION.penLabel}</strong>. Si no
            sabes por dónde empezar, el diagnóstico de procesos cuesta S/ {soles(PRECIO_DIAGNOSTICO)}{" "}
            y tiene garantía de devolución.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/diagnostico"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Llamada gratis de 30 minutos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </header>

        <div className="max-w-3xl mx-auto space-y-20">
          {/* ── 1. Qué procesos ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Qué procesos automatizamos primero
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              En comercio y servicios, los primeros candidatos casi siempre son estos. Ninguno es
              vistoso, y por eso funcionan: tienen volumen, reglas claras y un costo que se mide antes
              y después.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROCESOS.map((p) => (
                <div key={p.title} className="rounded-lg p-6 bg-card shadow-hairline">
                  <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 2. Cómo se elige ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Cómo elegimos qué automatizar
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Cada tarea repetida pasa por cuatro preguntas. El primer candidato es el que contesta
              «sí» a las cuatro y cuesta más en soles.
            </p>
            <ol className="space-y-3 mb-6">
              {PREGUNTAS.map((q) => (
                <li key={q} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <Check className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                  <span>{q}</span>
                </li>
              ))}
            </ol>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Lo que no conviene automatizar todavía: un proceso que nadie ha definido, lo que ocurre
              pocas veces al mes, las decisiones que no admiten revisión y el proceso que va a cambiar
              pronto. Automatizar un desorden solo lo hace fallar más rápido.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              El método completo, con un ejemplo en soles, está en{" "}
              <Link href="/blog/que-procesos-automatizar-primero" className="text-brand font-medium hover:underline">
                qué procesos automatizar primero en tu empresa
              </Link>
              . Para poner tu proceso en soles, usa la{" "}
              <Link href="/costo-del-excel" className="text-brand hover:underline">
                calculadora del costo del Excel
              </Link>
              .
            </p>
          </section>

          {/* ── 3. Con qué ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Con qué se automatiza
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">n8n o Make, sobre lo que ya usas</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Buena parte de lo que parece un problema de IA es un problema de integración: datos
                  que alguien copia de un formulario a una hoja, de la hoja al correo y del correo al
                  sistema. Ese trayecto se automatiza, se documenta y queda con registro de ejecución.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">IA conectada a tus datos</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Asistentes que responden con tu catálogo, tus precios o el estado de un pedido, y que
                  saben cuándo pasar la conversación a una persona. El detalle está en{" "}
                  <Link href="/services/integracion-ia" className="text-brand font-medium hover:underline">
                    automatización de procesos e integración de IA
                  </Link>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Un sistema a medida</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cuando ninguna pieza encaja con tu operación y terminas adaptando el negocio al
                  software. Para eso está el{" "}
                  <Link href="/desarrollo-de-software-lima" className="text-brand font-medium hover:underline">
                    desarrollo de software a medida en Lima
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* ── 4. Casos ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Dónde ya lo hicimos
            </h2>
            <div className="space-y-6">
              {CASOS.map((c) => (
                <article key={c.id} className="rounded-2xl border border-border p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{c.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{c.note}</p>
                  <Link
                    href={`/portfolio/${c.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                  >
                    Ver el caso
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* ── 5. Cuánto cuesta ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Cuánto cuesta automatizar un proceso en Lima
            </h2>
            <ul className="space-y-3 mb-6">
              <li className="flex gap-3 text-muted-foreground leading-relaxed">
                <Check className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Automatización o asistente con IA:</strong> desde S/{" "}
                  {PRECIO_AUTOMATIZACION.penLabel} (USD {PRECIO_AUTOMATIZACION.usdLabel}).
                </span>
              </li>
              <li className="flex gap-3 text-muted-foreground leading-relaxed">
                <Check className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Diagnóstico de procesos:</strong> S/{" "}
                  {soles(PRECIO_DIAGNOSTICO)}, {DIAGNOSTICO_SEMANAS} semanas, con garantía de devolución
                  si no encuentra pérdidas de al menos {GARANTIA_MULTIPLO} veces su precio al año.
                </span>
              </li>
              <li className="flex gap-3 text-muted-foreground leading-relaxed">
                <Check className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Taller de adopción de tecnología para el equipo:</strong>{" "}
                  S/ {soles(PRECIO_TALLER)} por grupo, {TALLER_HORAS} horas, hasta {TALLER_PERSONAS_MAX}{" "}
                  personas.
                </span>
              </li>
              <li className="flex gap-3 text-muted-foreground leading-relaxed">
                <Check className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Sistema a medida:</strong> desde S/{" "}
                  {PRECIO_SISTEMA.penLabel}, cotizado por alcance.
                </span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{PRICE_FOOTNOTE}</p>
            <p className="text-muted-foreground leading-relaxed">
              <Link href="/precios" className="text-brand font-medium hover:underline">
                Ver todos los precios →
              </Link>{" "}
              ·{" "}
              <Link href="/taller" className="text-brand hover:underline">
                Conocer el taller
              </Link>
            </p>
          </section>

          {/* ── 6. Cómo trabajamos ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Cómo trabajamos con empresas de Lima
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Las reuniones de arranque y de revisión pueden ser presenciales y agendadas en Lima o
              Callao; el resto del trabajo es remoto, en el mismo huso horario.
            </p>
            <ol className="space-y-6">
              {PASOS.map((p) => (
                <li key={p.step} className="flex gap-5">
                  <span className="spec-label shrink-0 pt-1">{p.step}</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-muted-foreground leading-relaxed">
              <Link href="/diagnostico" className="text-brand font-medium hover:underline">
                Conoce el diagnóstico de procesos en detalle →
              </Link>
            </p>
          </section>

          {/* ── 7. FAQ visible (idéntico al FAQPage del schema) ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 tracking-tight">
              Preguntas frecuentes sobre automatización de procesos en Lima
            </h2>
            <div className="divide-y divide-border border-t border-b border-border">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="cursor-pointer font-medium list-none flex justify-between items-center gap-4">
                    {f.q}
                    <span className="text-brand transition-transform group-open:rotate-45 text-xl leading-none shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ── Cierre ── */}
          <section className="rounded-2xl border border-border bg-secondary p-8 text-center">
            <h2 className="font-display text-2xl font-bold mb-3 tracking-tight">
              ¿Qué proceso le quita más horas a tu equipo?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Cuéntanoslo en una llamada de 30 minutos, sin costo. Te decimos si conviene
              automatizarlo, ordenarlo primero o dejarlo como está.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90"
              >
                Agendar la llamada
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold shadow-hairline transition hover:bg-background"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </section>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
