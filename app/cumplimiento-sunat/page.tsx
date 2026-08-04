import type { Metadata } from "next"
import { alternates } from "@/lib/seo"
import Link from "next/link"
import SunatTest from "@/components/SunatTest"
import { KineticText } from "@/components/motion/kinetic-text"

// ── Lead magnet interactivo #3 — el moat hecho herramienta ──────
// Assessment de madurez de cumplimiento SUNAT para pymes. El
// contexto SSR de esta página es citable (AEO); el quiz corre en
// cliente.

const baseUrl = "https://xn--rkos-4na.com"

const FAQS = [
  {
    q: "¿Qué evalúa este assessment de cumplimiento SUNAT?",
    a: "Ocho puntos de fricción y riesgo operativo frente a SUNAT: doble digitación entre el sistema de emisión y el control interno, registros de ventas y compras armados a mano para el PLE/SIRE, diferencias entre lo declarado y lo vendido, datos de clientes sin validar contra RUC/DNI, notas de crédito sueltas, información contable difícil de reunir y capacidad de sustentar un periodo completo ante una fiscalización.",
  },
  {
    q: "¿Qué es el SIRE y en qué se diferencia del PLE?",
    a: "El SIRE (Sistema Integrado de Registros Electrónicos) es la plataforma de SUNAT que reemplaza progresivamente a los registros de compras y ventas del PLE (Programa de Libros Electrónicos): SUNAT genera una propuesta con los comprobantes electrónicos que ya conoce y el contribuyente la confirma o ajusta. Cuando el sistema del negocio emite y registra todo electrónicamente, esa confirmación deja de ser una reconstrucción manual.",
  },
  {
    q: "¿Por qué la doble digitación es un riesgo y no solo una molestia?",
    a: "Porque cada re-digitación es una oportunidad de diferencia entre lo emitido y lo registrado. Cuando lo declarado no cuadra con lo vendido, el negocio queda expuesto en una fiscalización y el cierre contable se vuelve una auditoría interna cada mes. Integrar emisión, registro y control en un solo sistema elimina la fuente del error.",
  },
  {
    q: "¿Dónde puedo verificar los requisitos oficiales?",
    a: "La fuente oficial es SUNAT: el portal de comprobantes de pago electrónicos (cpe.sunat.gob.pe) para facturación electrónica, y sunat.gob.pe para libros electrónicos, SIRE y cronogramas de obligaciones. Este assessment no reemplaza la asesoría de tu contador — mide la fricción operativa de tu lado del proceso.",
  },
]

export const metadata: Metadata = {
  title: "Assessment: ¿Cómo está tu cumplimiento SUNAT? | Árkos",
  description:
    "8 preguntas para medir la fricción y el riesgo de tu operación frente a SUNAT: facturación electrónica, PLE/SIRE, validación de datos y cierre de mes. Resultado al instante, sin registro.",
  alternates: alternates("/cumplimiento-sunat"),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${baseUrl}/cumplimiento-sunat#app`,
            name: "Assessment: ¿Cómo está tu cumplimiento SUNAT?",
            url: `${baseUrl}/cumplimiento-sunat`,
            description:
              "Assessment gratuito de 8 preguntas que mide la fricción y el riesgo operativo de una pyme peruana frente a SUNAT: facturación electrónica, PLE/SIRE, validación de datos y sustento de periodos.",
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

        {/* Contexto normativo extraíble (SSR) con fuentes oficiales */}
        <section className="max-w-3xl mt-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            El contexto: cumplir en Perú es electrónico
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            La facturación electrónica (CPE) es obligatoria para la gran mayoría de contribuyentes
            en Perú, y los registros de ventas y compras migran progresivamente del PLE al{" "}
            <strong className="text-foreground">SIRE</strong>, donde SUNAT propone los registros a
            partir de los comprobantes electrónicos que ya conoce. En ese mundo, un negocio cuya
            operación interna vive en Excel y cuya emisión vive en un portal aparte paga la
            diferencia todos los meses: doble digitación, cuadres manuales y riesgo de que lo
            declarado no coincida con lo vendido.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Las fuentes oficiales para requisitos y cronogramas son el{" "}
            <a
              href="https://cpe.sunat.gob.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              portal CPE de SUNAT
            </a>{" "}
            y{" "}
            <a
              href="https://www.sunat.gob.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              sunat.gob.pe
            </a>
            . Este assessment mide tu lado del proceso: cuánta fricción y riesgo operativo hay entre
            tu negocio y esas obligaciones.
          </p>

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
          Nuestros sistemas integran el cumplimiento{" "}
          <Link href="/#cumplimiento" className="text-brand hover:underline">
            de fábrica
          </Link>
          : emisión de comprobantes, libros PLE/SIRE y validación RENIEC/SUNAT dentro del mismo
          sistema que opera tu negocio. Si prefieres empezar por una mirada general,{" "}
          <Link href="/necesitas-un-sistema" className="text-brand hover:underline">
            este test de 10 preguntas
          </Link>{" "}
          evalúa toda tu operación. Y si tu empresa está en la capital, en{" "}
          <Link href="/desarrollo-de-software-lima" className="text-brand hover:underline">
            desarrollo de software a medida en Lima
          </Link>{" "}
          está el detalle de cómo integramos CPE, PLE/SIRE y pagos locales dentro del sistema, con
          casos de clientes limeños y precios en soles.
        </p>
      </div>
    </main>
  )
}
