import Link from "next/link"
import { alternates, absUrl, BASE_URL } from "@/lib/seo"

const baseUrl = BASE_URL

export const metadata = {
  title: "¿Cuánto cuesta desarrollar software a medida en Perú? | Precios Árkos",
  description:
    "Precios de desarrollo de software a medida, web apps, e-commerce y sistemas (ERP, CRM, PMS, SaaS) en Perú. Rangos 'desde' en soles (S/) y dólares (USD), factores de precio y modelos de pago.",
  alternates: alternates("/precios"),
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: absUrl("/precios"),
    siteName: "Árkos",
    title: "¿Cuánto cuesta desarrollar software a medida en Perú? | Precios Árkos",
    description:
      "Rangos 'desde' en soles y dólares para landings, webs, e-commerce, apps y sistemas a medida (ERP, CRM, PMS, SaaS) en Perú.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Precios de Árkos" }],
  },
}

type Tier = {
  name: string
  usd: number
  usdLabel: string
  penLabel: string
  note: string
  quote?: boolean
}

const tiers: Tier[] = [
  { name: "Landing de alta conversión", usd: 300, usdLabel: "300", penLabel: "1,100", note: "Una sola página, pensada para captar leads y convertir." },
  { name: "Web corporativa", usd: 600, usdLabel: "600", penLabel: "2,250", note: "Sitio institucional hiper-optimizado para SEO y rendimiento." },
  { name: "E-commerce", usd: 900, usdLabel: "900", penLabel: "3,400", note: "Tienda con pasarela de pago en soles, control de stock y panel admin." },
  { name: "Web App / MVP a medida", usd: 1200, usdLabel: "1,200", penLabel: "4,500", note: "Aplicación web full-stack con Next.js, React y TypeScript." },
  { name: "Sistema a medida — CRM, ERP, PMS, SaaS", usd: 3500, usdLabel: "3,500", penLabel: "13,000", note: "Cotización personalizada según módulos y alcance. Cumplimiento SUNAT (facturación electrónica, PLE/SIRE) incluido de fábrica.", quote: true },
  { name: "App móvil (iOS + Android)", usd: 2500, usdLabel: "2,500", penLabel: "9,400", note: "Flutter, publicada en App Store y Google Play. Cotización según alcance.", quote: true },
  { name: "Integración de IA y automatización", usd: 500, usdLabel: "500", penLabel: "1,900", note: "Chatbots, agentes de ventas y automatizaciones con n8n / Make." },
]

const faqs = [
  {
    q: "¿Cuánto cuesta desarrollar software a medida en Perú?",
    a: "El desarrollo de software a medida en Perú cuesta desde S/ 1,100 (USD 300) por una landing de alta conversión hasta desde S/ 13,000 (USD 3,500) por un sistema empresarial como un ERP, CRM o SaaS. El precio final depende del alcance, las integraciones y la complejidad del proyecto.",
  },
  {
    q: "¿Cuánto cuesta una página web profesional en Perú?",
    a: "En Árkos una landing de alta conversión parte de S/ 1,100 (USD 300) y una web corporativa optimizada para SEO desde S/ 2,250 (USD 600). Un e-commerce con pasarela de pago en soles, control de stock y panel administrable parte de S/ 3,400 (USD 900).",
  },
  {
    q: "¿Cuánto cuesta un MVP o una aplicación web a medida?",
    a: "Una web app o MVP a medida con Next.js, React y TypeScript parte de S/ 4,500 (USD 1,200). El precio depende del número de pantallas, las integraciones (pagos, APIs, IA) y si requiere paneles de administración o roles de usuario.",
  },
  {
    q: "¿Cuánto cuesta un ERP, CRM o SaaS a medida?",
    a: "Un sistema a medida (ERP, CRM, PMS o SaaS) parte de S/ 13,000 (USD 3,500) y se cotiza por alcance, según los módulos que necesites. Construimos sistemas como RestHUB (ERP de restaurantes) u OrquestadorADM (PMS hotelero con revenue management).",
  },
  {
    q: "¿Por qué el software a medida cuesta más que una plantilla?",
    a: "Una plantilla te obliga a adaptar tu negocio al software; el software a medida se construye desde tu operación real y te hace dueño del producto y de los datos. A mediano plazo suele ser más barato: dejas de pagar suscripciones por funciones que no usas y de perder tiempo peleando con un sistema genérico.",
  },
  {
    q: "¿Se puede pagar en cuotas?",
    a: "Sí. En Árkos trabajamos con pago por etapas (contra entregas / hitos) o mensualidades, y aplicamos descuentos por contratación múltiple. Definimos el modelo de pago junto contigo según el tamaño del proyecto.",
  },
]

export default function PreciosPage() {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Desarrollo de software a medida",
    name: "Desarrollo de software a medida en Perú",
    provider: { "@type": "Organization", name: "Árkos", url: baseUrl },
    areaServed: [
      { "@type": "Country", name: "Peru" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    description:
      "Desarrollo de software a medida, web apps, e-commerce y sistemas empresariales (ERP, CRM, PMS, SaaS) para PYMEs de Perú y Latinoamérica.",
    offers: tiers.map((t) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: t.name },
      priceSpecification: { "@type": "PriceSpecification", minPrice: t.usd, priceCurrency: "USD" },
      description: t.quote ? "Precio 'desde'; cotización personalizada según alcance." : "Precio 'desde'.",
    })),
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            ¿Cuánto cuesta desarrollar <span className="text-brand">software a medida</span> en Perú?
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Desarrollar software a medida en Perú cuesta <strong className="text-foreground">desde S/ 1,100 (USD 300)</strong> por una
            landing de alta conversión hasta <strong className="text-foreground">desde S/ 13,000 (USD 3,500)</strong> por un sistema
            empresarial (ERP, CRM, SaaS). El precio depende del alcance, las integraciones y la complejidad. En Árkos publicamos
            rangos <em>“desde”</em> y cotizamos cada proyecto según tu operación real.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-4 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary text-sm">
                <th className="p-4 font-semibold">Tipo de proyecto</th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">Desde (S/)</th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">Desde (USD)</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.name} className="border-t border-border align-top">
                  <td className="p-4">
                    <div className="font-medium">
                      {t.name}
                      {t.quote && <span className="ml-2 text-xs text-brand">cotización</span>}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.note}</div>
                  </td>
                  <td className="p-4 text-right font-semibold whitespace-nowrap">S/ {t.penLabel}</td>
                  <td className="p-4 text-right whitespace-nowrap text-muted-foreground">$ {t.usdLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-4xl mx-auto mb-16 text-xs text-muted-foreground text-center">
          Precios “desde”, referenciales a 2026. Tipo de cambio aproximado S/ 3.75 = USD 1. Los sistemas a medida y apps móviles se cotizan por alcance.
        </p>

        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">Precios para proyectos en Lima</h2>
          <p className="text-muted-foreground leading-relaxed">
            Estos rangos son los mismos para todo el Perú: no cobramos distinto por ciudad. Si tu
            empresa está en Lima o Callao, en{" "}
            <Link href="/desarrollo-de-software-lima" className="text-brand font-medium hover:underline">
              desarrollo de software a medida en Lima
            </Link>{" "}
            encontrarás además los casos con clientes limeños, el detalle de cumplimiento SUNAT y
            cómo funcionan las reuniones presenciales agendadas.
          </p>
        </section>

        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">Qué afecta el precio</h2>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            <li>• <strong className="text-foreground">Alcance:</strong> número de módulos, pantallas y roles de usuario.</li>
            <li>• <strong className="text-foreground">Integraciones:</strong> pasarelas de pago en soles (Izipay, Culqi, MercadoPago), factura electrónica, courier, APIs externas.</li>
            <li>• <strong className="text-foreground">Diseño UX/UI:</strong> a medida en Figma vs. plantilla.</li>
            <li>• <strong className="text-foreground">IA y automatización:</strong> chatbots, agentes y flujos con n8n / Make.</li>
            <li>• <strong className="text-foreground">Migración:</strong> traer datos o reemplazar un sistema antiguo.</li>
            <li>• <strong className="text-foreground">Soporte:</strong> mantenimiento y evolución post-lanzamiento.</li>
          </ul>
        </section>

        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">Cómo cobramos y plazos</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Trabajamos con <strong className="text-foreground">pago por etapas</strong> (contra hitos de entrega) o{" "}
            <strong className="text-foreground">mensualidades</strong>, con descuentos por contratación múltiple. Defines el
            modelo junto con nosotros según el tamaño del proyecto.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Un proyecto web típico toma de <strong className="text-foreground">3 a 8 semanas</strong> según el alcance; un sistema a
            medida toma más, en función de su complejidad.
          </p>
        </section>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">Preguntas frecuentes sobre precios</h2>
          <div className="divide-y divide-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer font-medium list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-brand transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="max-w-3xl mx-auto mt-16 text-center rounded-2xl border border-border p-8 bg-secondary">
          <h2 className="text-2xl font-bold mb-3 tracking-tight">¿Listo para cotizar tu proyecto?</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Cuéntanos qué necesitas y te damos una cotización a medida según tu operación.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/51961869348" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 font-medium text-white transition hover:opacity-90">
              Cotizar por WhatsApp
            </a>
            <a href="mailto:gerencia@árkos.com" className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 font-medium transition hover:bg-secondary">
              gerencia@árkos.com
            </a>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </main>
  )
}
