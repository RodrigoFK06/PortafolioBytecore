import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { SITE_CONFIG } from "@/lib/constants"
import { alternates } from "@/lib/seo"

// ── FacturArkos — la página del producto en el dominio ──────────
// Hasta el 2026-09-27 el producto no tenía ni una URL indexable en árkos.com:
// la única que lo trataba, /portfolio/21, va con noindex porque su caso de
// estudio es MOCK (ver data/projects.ts). Esta página describe capacidades,
// no resultados: nada de clientes ni cifras de uso.
//
// Planes y funciones copiados de la app publicada (facturarkos-web,
// components/Pricing.tsx y la landing) el 2026-09-27. Si allá cambian,
// cambian aquí.

const baseUrl = "https://xn--rkos-4na.com"
const APP_URL = "https://facturarkos-web.vercel.app"

export const metadata: Metadata = {
  title: "FacturArkos: facturación electrónica SUNAT y POS para Mypes | Árkos",
  description:
    "FacturArkos emite boletas y facturas electrónicas aceptadas por SUNAT, vende con punto de venta, controla inventario y abre tu tienda online. Sin instalación. Plan gratuito y planes desde S/ 59 al mes.",
  alternates: alternates("/facturarkos"),
  openGraph: {
    title: "FacturArkos: facturación electrónica SUNAT y POS para Mypes | Árkos",
    description:
      "Facturación SUNAT, punto de venta, inventario y tienda online en un solo sistema. Producto propio de Árkos.",
    url: `${baseUrl}/facturarkos`,
    images: [{ url: `${baseUrl}/facturarkos.png`, width: 1440, height: 900 }],
  },
}

const FUNCIONES = [
  {
    title: "Facturación electrónica SUNAT",
    description:
      "Boletas, facturas, notas de crédito y débito y guías de remisión aceptadas por SUNAT, cada una con su CDR y su PDF.",
  },
  {
    title: "Punto de venta (POS)",
    description:
      "Vende desde cualquier dispositivo. Sigue funcionando sin internet y sincroniza al volver la conexión.",
  },
  {
    title: "Inventario y compras",
    description:
      "Stock por almacén, kardex valorizado, alertas de stock bajo y costeo promedio en cada compra.",
  },
  {
    title: "Monitoreo diario SUNAT",
    description:
      "Cada día se revisa el estado de tus comprobantes y te avisa si alguno necesita tu atención.",
  },
  {
    title: "Tienda online y pedidos por WhatsApp",
    description:
      "Tu catálogo en una página lista para vender. El cliente arma su carrito y te lo manda por WhatsApp.",
  },
  {
    title: "Caja, reportes y emisión masiva",
    description:
      "Apertura y arqueo de caja, ventas, márgenes, IGV y P&L, y emisión de cientos de comprobantes desde un Excel.",
  },
]

const PLANES = [
  {
    name: "Emprende",
    price: 0,
    note: "Para empezar a facturar hoy.",
    features: ["1 usuario", "Hasta 50 comprobantes al mes", "Boletas y facturas SUNAT", "POS y tienda online básica"],
  },
  {
    name: "Negocio",
    price: 59,
    note: "Lo que una Mype necesita para crecer. Prueba de 14 días.",
    features: [
      "Comprobantes ilimitados",
      "Hasta 3 usuarios",
      "Notas de crédito y débito",
      "Inventario, reportes y monitoreo diario SUNAT",
    ],
  },
  {
    name: "Pro",
    price: 119,
    note: "Para varias sucursales y alto volumen.",
    features: [
      "Multi-sucursal y usuarios ilimitados",
      "Emisión masiva por Excel",
      "Guía de remisión electrónica (GRE)",
      "SIRE y PLE (RVIE y RCE)",
    ],
  },
]

// Cada respuesta abre con la respuesta directa en la primera frase: es la que
// un asistente extrae cuando le preguntan "qué es FacturArkos".
const FAQS = [
  {
    q: "¿Qué es FacturArkos?",
    a: "FacturArkos es un sistema de facturación electrónica SUNAT y punto de venta para Mypes del Perú, hecho por Árkos. Reúne en un solo lugar la emisión de comprobantes, la venta en caja, el inventario y una tienda online, y funciona desde el navegador del celular, la tablet o la PC, sin instalar nada.",
  },
  {
    q: "¿Los comprobantes de FacturArkos son válidos ante SUNAT?",
    a: "Sí. FacturArkos emite boletas, facturas, notas de crédito y débito y guías de remisión electrónicas que SUNAT acepta, y guarda de cada una la constancia de recepción (CDR) y el PDF. Además revisa cada día el estado de tus comprobantes y te avisa si alguno necesita atención.",
  },
  {
    q: "¿Cuánto cuesta FacturArkos?",
    a: "FacturArkos tiene un plan gratuito y dos de pago. Emprende cuesta S/ 0 al mes, con 1 usuario y hasta 50 comprobantes. Negocio cuesta S/ 59 al mes, con comprobantes ilimitados y hasta 3 usuarios. Pro cuesta S/ 119 al mes, con varias sucursales, usuarios ilimitados, emisión masiva por Excel, guías de remisión y SIRE/PLE. Se cambia o se cancela el plan cuando quieras.",
  },
  {
    q: "¿FacturArkos genera los registros de ventas y compras del SIRE?",
    a: "Sí, en el plan Pro. FacturArkos genera el Registro de Ventas e Ingresos (RVIE) y el Registro de Compras (RCE) del SIRE, y los libros PLE, desde las mismas ventas y compras que registras en el sistema.",
  },
  {
    q: "¿Qué pasa si se cae el internet en mi tienda?",
    a: "El punto de venta de FacturArkos sigue funcionando sin conexión y sincroniza las ventas cuando vuelve internet.",
  },
  {
    q: "¿Quién está detrás de FacturArkos?",
    a: `Árkos, una empresa peruana de mejora de procesos, automatización y desarrollo de software a medida (${SITE_CONFIG.legal.name}, RUC ${SITE_CONFIG.legal.ruc}). FacturArkos nació de construir una y otra vez la misma capa de facturación SUNAT dentro de sistemas a medida.`,
  },
  {
    q: "¿Y si mi negocio necesita más de lo que hace FacturArkos?",
    a: "Entonces lo que conviene no es un plan más caro, sino mirar el proceso. El diagnóstico de procesos de Árkos revisa cómo trabaja tu negocio hoy y dice qué conviene automatizar y qué no; si hace falta un sistema a medida, la facturación SUNAT va incluida de fábrica.",
  },
]

export default function FacturArkosPage() {
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
              { "@type": "ListItem", position: 2, name: "FacturArkos", item: `${baseUrl}/facturarkos` },
            ],
          }),
        }}
      />

      {/* JSON-LD: el producto, colgado de la entidad Árkos del layout (mismo
          @id que usa la app en su propia landing) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": `${baseUrl}/facturarkos#software`,
            name: "FacturArkos",
            url: `${baseUrl}/facturarkos`,
            sameAs: [APP_URL],
            image: `${baseUrl}/facturarkos.png`,
            description:
              "Sistema de facturación electrónica SUNAT y punto de venta para Mypes del Perú: boletas, facturas, notas y guías de remisión electrónicas, POS que funciona sin internet, inventario, tienda online y SIRE/PLE.",
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Facturación electrónica",
            operatingSystem: "Web",
            inLanguage: "es-PE",
            featureList: FUNCIONES.map((f) => f.title),
            publisher: { "@id": `${baseUrl}/#organization` },
            provider: { "@id": `${baseUrl}/#organization` },
            offers: PLANES.map((p) => ({
              "@type": "Offer",
              name: p.name,
              price: String(p.price),
              priceCurrency: "PEN",
              description: `${p.note} Precio mensual.`,
              url: `${APP_URL}/precios`,
            })),
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <header className="max-w-4xl mb-12 md:mb-16">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            Producto propio de Árkos
          </p>
          <KineticText
            as="h1"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            FacturArkos: factura con SUNAT y vende <span className="text-brand">en el mismo sistema.</span>
          </KineticText>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            FacturArkos es el sistema de facturación electrónica SUNAT y punto de venta que hicimos
            para las Mypes del Perú. Emites boletas y facturas, vendes en caja, controlas tu inventario
            y abres tu tienda online desde el celular, la tablet o la PC, sin instalar nada.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`${APP_URL}/registro`}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Crear cuenta gratis
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
            >
              Ver FacturArkos funcionando
            </a>
          </div>
        </header>

        {/* Captura */}
        <Reveal effect="rise">
          <figure className="max-w-5xl mb-16 md:mb-24">
            <Image
              src="/facturarkos.png"
              alt="Pantalla de FacturArkos: facturación electrónica SUNAT y punto de venta"
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="w-full h-auto rounded-lg shadow-hairline-md"
              priority
            />
          </figure>
        </Reveal>

        {/* Qué hace */}
        <section className="max-w-5xl mb-16 md:mb-24">
          <Reveal effect="fade">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Qué hace FacturArkos
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
              Facturación, ventas, inventario y tienda en un solo lugar, en vez de dos o tres
              herramientas que no se hablan entre sí.
            </p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
            {FUNCIONES.map((f) => (
              <article key={f.title} className="bg-card p-7 rounded-lg shadow-hairline">
                <h3 className="font-display text-lg font-bold mb-2 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </article>
            ))}
          </StaggerGroup>
        </section>

        {/* Planes */}
        <section className="max-w-5xl mb-16 md:mb-24">
          <Reveal effect="fade">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Planes y precios
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
              Precios mensuales en soles. Cambias o cancelas el plan cuando quieras.
            </p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.1}>
            {PLANES.map((p) => (
              <article key={p.name} className="bg-card p-7 rounded-lg shadow-hairline flex flex-col">
                <p className="spec-label text-brand mb-3">{p.name}</p>
                <p className="font-mono tabular text-3xl font-medium text-foreground mb-1">
                  S/ {p.price}
                  <span className="text-sm text-muted-foreground"> / mes</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.note}</p>
                <ul className="space-y-2">
                  {p.features.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </StaggerGroup>
          <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
            El detalle completo de cada plan está en{" "}
            <a href={`${APP_URL}/precios`} target="_blank" rel="noopener" className="text-brand hover:underline">
              la página de precios de FacturArkos
            </a>
            .
          </p>
        </section>

        {/* Cómo empezar */}
        <section className="max-w-5xl mb-16 md:mb-24">
          <Reveal effect="rise">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { n: "01", t: "Crea tu cuenta", d: "Te registras en minutos y cargas los datos de tu negocio." },
                { n: "02", t: "Conecta SUNAT", d: "Vinculas tu cuenta del proveedor de emisión (APISUNAT) y ya puedes emitir." },
                { n: "03", t: "Vende y factura", d: "Emites desde el POS, abres tu tienda y ves todo en un panel." },
              ].map((s) => (
                <div key={s.n} className="p-7 rounded-lg bg-secondary shadow-hairline">
                  <p className="spec-label text-brand mb-3">Paso {s.n}</p>
                  <h3 className="font-display text-lg font-bold mb-2 text-foreground">{s.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Puente a Árkos */}
        <Reveal effect="fade">
          <div className="max-w-5xl mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 rounded-lg bg-card shadow-hairline">
            <p className="text-foreground text-sm md:text-base leading-relaxed max-w-xl">
              ¿Tu operación necesita más que facturar y vender? Antes de sumar herramientas, mira el
              proceso: el diagnóstico te dice qué conviene automatizar y qué no. Y si no sabes cómo
              está tu negocio frente a SUNAT,{" "}
              <Link href="/cumplimiento-sunat" className="text-brand hover:underline">
                mídelo en 8 preguntas
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/precios"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
              >
                Precios de Árkos
              </Link>
              <Link
                href="/diagnostico"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
              >
                Ver el diagnóstico
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <section className="max-w-3xl">
          <Reveal effect="fade">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              Preguntas frecuentes sobre FacturArkos
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
