import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

import { SERVICES, getService } from "@/data/services"
import { alternates, absUrl, BASE_URL } from "@/lib/seo"

type Params = { slug: string }

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: "Servicio no encontrado | Árkos" }

  const url = absUrl(`/services/${service.slug}`)
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: alternates(`/services/${service.slug}`),
    openGraph: {
      type: "website",
      locale: "es_PE",
      url,
      siteName: "Árkos",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: `Árkos — ${service.navTitle}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [`${BASE_URL}/og-image.png`],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const pageUrl = absUrl(`/services/${service.slug}`)

  // @graph: una sola entidad Service, el FAQPage (cuyas preguntas SÍ están
  // visibles más abajo — marcar FAQPage sin FAQ visible incumple las
  // guidelines de Google) y el breadcrumb con URLs absolutas.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.h1,
        serviceType: service.serviceType,
        description: service.metaDescription,
        url: pageUrl,
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: [
          { "@type": "City", name: "Lima", containedInPlace: { "@type": "Country", name: "Perú" } },
          { "@type": "Country", name: "Perú" },
        ],
        audience: { "@type": "BusinessAudience", name: "Empresas y pymes del Perú" },
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: Number(service.priceFrom.pen.replace(/,/g, "")),
            priceCurrency: "PEN",
          },
          description: `Precio "desde" para ${service.priceFrom.what}. Cotización según alcance.`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "Servicios", item: absUrl("/services") },
          { "@type": "ListItem", position: 3, name: service.navTitle, item: pageUrl },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: service.metaTitle,
        description: service.metaDescription,
        inLanguage: "es-PE",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        author: { "@id": `${BASE_URL}/#rodrigo-torres` },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
    ],
  }

  const others = SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <main className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb visible — Google reportaba "página de referencia: no se
            ha detectado ninguna" en varias URLs; los enlaces son la cura. */}
        <nav aria-label="Ruta de navegación" className="max-w-3xl mx-auto mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <li><Link href="/" className="hover:text-brand transition-colors">Inicio</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/services" className="hover:text-brand transition-colors">Servicios</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium">{service.navTitle}</li>
          </ol>
        </nav>

        <header className="max-w-3xl mx-auto mb-14">
          <p className="spec-label mb-5">Servicio</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
            {service.h1}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{service.lead}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/diagnostico"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Agenda una llamada de diagnóstico
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/precios"
              className="inline-flex items-center px-6 py-3 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
            >
              Ver precios
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Desde <strong className="text-foreground">S/ {service.priceFrom.pen}</strong> (USD {service.priceFrom.usd})
            para {service.priceFrom.what}.{" "}
            <Link href="/precios" className="text-brand hover:underline">
              Todos los rangos en la página de precios
            </Link>
            .
          </p>
        </header>

        {/* Secciones de contenido */}
        <div className="max-w-3xl mx-auto space-y-14">
          {service.sections.map((section) => (
            <section key={section.h2}>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">{section.h2}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-5 space-y-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <Check className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Entregables */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">Qué recibes</h2>
            <ul className="space-y-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <Check className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Stack habitual: <span className="text-foreground">{service.stack.join(" · ")}</span>
            </p>
          </section>

          {/* Casos reales — enlazan a las fichas de portafolio */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Proyectos donde ya lo hicimos
            </h2>
            <div className="space-y-4">
              {service.cases.map((c) => (
                <Link
                  key={c.id}
                  href={`/portfolio/${c.id}`}
                  className="block rounded-lg p-6 bg-card shadow-hairline hover:shadow-hairline-md transition-shadow"
                >
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    {c.title}
                    <ArrowRight className="h-4 w-4 text-brand" aria-hidden="true" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.note}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Cobertura — enlace contextual a la página de Lima */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              ¿Dónde atendemos?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Operamos desde Lima. Atendemos a empresas de Lima y Callao con reuniones presenciales
              agendadas, y al resto del Perú y de Latinoamérica de forma remota, en el mismo huso
              horario. Si tu empresa está en la capital, tenemos una página dedicada:{" "}
              <Link href="/desarrollo-de-software-lima" className="text-brand font-medium hover:underline">
                desarrollo de software a medida en Lima
              </Link>
              .
            </p>
          </section>

          {/* FAQ VISIBLE — debe coincidir palabra por palabra con el FAQPage */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 tracking-tight">
              Preguntas frecuentes
            </h2>
            <div className="divide-y divide-border border-t border-b border-border">
              {service.faqs.map((f) => (
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

          {/* Otros servicios */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">Otros servicios</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block rounded-lg p-4 shadow-hairline hover:shadow-hairline-md transition-shadow"
                  >
                    <span className="font-medium text-foreground">{s.navTitle}</span>
                    <span className="block text-sm text-muted-foreground mt-1">{s.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/services" className="inline-flex items-center gap-2 text-brand font-medium hover:underline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver al hub de servicios
              </Link>
            </p>
          </section>

          {/* Cierre */}
          <section className="rounded-2xl border border-border bg-secondary p-8 text-center">
            <h2 className="font-display text-2xl font-bold mb-3 tracking-tight">
              ¿Conversamos sobre tu proyecto?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Empieza por una llamada de diagnóstico de 30 minutos, sin costo. Si tu caso no necesita
              este servicio, te lo decimos.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90"
              >
                Agendar diagnóstico
              </Link>
              <a
                href="https://wa.me/51961869348"
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
