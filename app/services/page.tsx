import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { SERVICES } from "@/data/services";
import { alternates, absUrl, BASE_URL } from "@/lib/seo";

export const metadata = {
  title: "Servicios de desarrollo de software a medida en Perú | Árkos",
  description:
    "Software a medida (ERP, CRM, SaaS), desarrollo web, apps móviles, diseño UX/UI, integración de IA y e-commerce para empresas del Perú. Precios publicados y casos reales.",
  alternates: alternates("/services"),
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: absUrl("/services"),
    siteName: "Árkos",
    title: "Servicios de desarrollo de software a medida en Perú | Árkos",
    description:
      "Seis servicios con precio publicado y casos reales: software a medida, desarrollo web, apps móviles, diseño UX/UI, integración de IA y e-commerce.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Servicios de Árkos" }],
  },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "¿Dónde está ubicada Árkos y atiende a empresas fuera de Lima?",
    a: "Árkos es una agencia de desarrollo de software a medida con base en Lima, Perú, fundada en 2020 por Rodrigo Torres. Atiende a empresas de Lima y Callao con reuniones presenciales agendadas, y al resto del Perú y de Latinoamérica de forma remota: PYMEs de clínicas, hoteles, restaurantes, comercios y servicios técnicos en cualquier ciudad. Contacto: gerencia@árkos.com, WhatsApp +51 961 869 348.",
  },
  {
    q: "¿Por qué contratar software a medida en lugar de un sistema enlatado o una plantilla?",
    a: "El software a medida se construye desde tu operación real, no desde una plantilla genérica que te obliga a adaptar tu negocio al sistema. Árkos diseña ERPs, CRMs y PMS cuando los sistemas enlatados no encajan, como RestHUB (ERP para restaurantes) o VR PMS para alquileres vacacionales, alternativa económica a Guesty u Hostaway.",
  },
  {
    q: "¿Conviene un software a medida si mi PYME es pequeña y recién empieza?",
    a: "Sí. Árkos se especializa en PYMEs latinoamericanas y construye desde lo esencial según tu operación, evitando pagar por módulos que nunca usarás. Casos como Solutec System (CRM de servicio técnico) o ATELIER Clinic (SaaS para clínicas) nacieron resolviendo necesidades concretas. Los proyectos parten desde S/ 1,100 (USD 300) según el alcance.",
  },
  {
    q: "¿Qué tecnologías y stack usa Árkos para desarrollar?",
    a: "Árkos desarrolla con React, Next.js, TypeScript y Tailwind CSS en frontend; Node.js, Laravel, CodeIgniter y Spring Boot en backend; y Supabase, Firebase, MySQL y MongoDB como bases de datos. Para móvil usa Flutter y Dart, y para IA integra Gemini y GPT con automatizaciones en n8n y Make. Diseño UX/UI en Figma.",
  },
  {
    q: "¿El sistema funcionará rápido y aparecerá en Google y en buscadores con IA?",
    a: "Sí. Árkos construye con rendimiento y SEO/GEO nativos: arquitectura JAMStack, optimización de Core Web Vitals y preparación para buscadores y modelos de lenguaje. Sitios como Ñawi Producciones o ReLu Coffee se entregan rápidos en cualquier conexión, con imágenes optimizadas WebP/AVIF y foco en conversión, jerarquía visual y carga ágil.",
  },
  {
    q: "¿Pueden integrar inteligencia artificial, como un chatbot o automatizaciones, en mi negocio?",
    a: "Sí. La integración de IA es parte central de las soluciones de Árkos: chatbots y agentes de ventas inteligentes con Gemini o GPT, y flujos de automatización con n8n y Make para optimizar procesos empresariales. La IA se incorpora dentro del sistema a medida, conectada a tu operación real, no como un agregado genérico aislado.",
  },
  {
    q: "¿Cuánto tarda en desarrollarse un proyecto con Árkos?",
    a: "El plazo depende del alcance: una landing de alta conversión no toma lo mismo que un ERP con varios módulos como RestHUB o un PMS como OrquestadorADM. Un proyecto web típico toma de 3 a 8 semanas según el alcance; un sistema a medida toma más, en función de su complejidad.",
  },
  {
    q: "¿Cómo es el proceso de trabajo desde que los contacto hasta la entrega?",
    a: "Árkos parte de investigación de usuario real (entrevistas, personas, journey maps), luego wireframes y prototipos en Figma, y desarrolla con React, Next.js y TypeScript. El propósito es mejorar tus procesos, no solo escribir código. El primer paso es escribir a gerencia@árkos.com o al WhatsApp +51 961 869 348.",
  },
  {
    q: "¿Árkos hace tiendas online con pagos en soles y factura electrónica?",
    a: "Sí. Árkos desarrolla e-commerce listo para vender con pasarelas de pago en soles (Izipay, Culqi, MercadoPago y Stripe), factura electrónica, control de stock, integración con courier, catálogo administrable y métricas en tiempo real. Un ejemplo es ReLu Coffee, e-commerce de café gourmet y cafeteras, construido para vender sin fricción.",
  },
  {
    q: "¿Tienen experiencia en mi sector y proyectos reales?",
    a: "Sí. Árkos ha desarrollado para varios rubros: restaurantes (RestHUB), hotelería y alquiler vacacional (VR PMS, OrquestadorADM), clínicas estéticas (ATELIER Clinic), servicio técnico (Solutec System y su landing Solutec DHA), delivery (Rapiditos, en App Store y Google Play) y audiovisual (Ñawi Producciones).",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Diagnóstico",
    body: "Una llamada de 30 minutos, sin costo, para entender cómo operas hoy. Si tu problema no se resuelve con software, te lo decimos ahí.",
  },
  {
    step: "02",
    title: "Alcance y propuesta",
    body: "Definimos qué entra y qué no, con precio y plazo por escrito. Sin sorpresas a mitad del proyecto.",
  },
  {
    step: "03",
    title: "Diseño y prototipo",
    body: "Prototipo navegable en Figma antes de programar. Corregir aquí cuesta minutos; corregirlo en código cuesta días.",
  },
  {
    step: "04",
    title: "Desarrollo por hitos",
    body: "Entregas revisables, no una caja negra de tres meses. Ves avance real y puedes corregir el rumbo temprano.",
  },
  {
    step: "05",
    title: "Entrega y acompañamiento",
    body: "Despliegue, capacitación, código y datos en tus manos. Decides tú si quieres mantenimiento continuo.",
  },
];

export default function ServicesPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absUrl("/services")}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const catalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${absUrl("/services")}#catalog`,
    name: "Servicios de desarrollo de software de Árkos",
    provider: { "@id": `${BASE_URL}/#organization` },
    itemListElement: SERVICES.map((sv) => ({
      "@type": "Offer",
      url: absUrl(`/services/${sv.slug}`),
      itemOffered: {
        "@type": "Service",
        "@id": `${absUrl(`/services/${sv.slug}`)}#service`,
        name: sv.navTitle,
        serviceType: sv.serviceType,
        description: sv.summary,
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: [
          { "@type": "City", name: "Lima", containedInPlace: { "@type": "Country", name: "Perú" } },
          { "@type": "Country", name: "Perú" },
        ],
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Servicios", item: absUrl("/services") },
    ],
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-16">
          <p className="spec-label mb-5">Servicios</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
            Servicios de <span className="text-brand">desarrollo de software</span> en Perú
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Árkos construye software para empresas peruanas que ya no caben en un Excel: sistemas de
            gestión, sitios y plataformas web, aplicaciones móviles, tiendas online e integraciones
            de inteligencia artificial. Seis servicios, cada uno con su propia página, su precio
            publicado y los proyectos reales donde ya lo hicimos.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Lo que nos diferencia no es el stack —React, Next.js y TypeScript los usa medio mercado—
            sino tres decisiones: publicamos precios en soles en lugar de responder «depende del
            alcance», integramos el cumplimiento peruano (facturación electrónica SUNAT, libros
            PLE/SIRE, Ley 29733) desde el diseño y no como un módulo aparte, y te decimos cuando tu
            problema no necesita software. Puedes verificarlo antes de escribirnos: los precios
            están publicados y los proyectos están en vivo.
          </p>
        </div>

        {/* ── Los seis servicios ─────────────────────────────────────────
            Antes esto era un grid de <button> sin href: seis CTAs muertos y
            ninguna subpágina. Ahora cada tarjeta es un <Link> a una página
            real de 600–900 palabras. */}
        <section className="mb-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 tracking-tight max-w-3xl mx-auto">
            Los seis servicios
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
            Casi todos los proyectos combinan dos o tres. Un e-commerce necesita diseño; un ERP
            necesita web; una app necesita backend. Los separamos para que sepas qué estás
            comprando, no para vendértelos por separado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((sv) => (
              <Link
                key={sv.slug}
                href={`/services/${sv.slug}`}
                className="group p-8 rounded-lg bg-card shadow-hairline hover:shadow-hairline-md transition-shadow duration-300 h-full flex flex-col"
              >
                <h3 className="font-display text-xl font-bold mb-3 text-foreground">{sv.navTitle}</h3>
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed text-sm">
                  {sv.summary}
                </p>
                <span className="text-sm text-muted-foreground mb-4">
                  Desde <strong className="text-foreground">S/ {sv.priceFrom.pen}</strong>
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand mt-auto">
                  Ver el servicio
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="max-w-3xl mx-auto space-y-16">
          {/* ── Cómo elegir ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Cómo saber cuál necesitas
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              La pregunta que importa no es «¿qué tecnología uso?» sino «¿dónde se está yendo el
              tiempo de mi equipo?». Si tu gente copia datos de una herramienta a otra, lo tuyo es un
              sistema a medida. Si tienes producto que vender y hoy cierras cada venta a mano por
              WhatsApp, es e-commerce. Si tu problema es que la gente entra a tu web y se va sin
              hacer nada, es diseño y desarrollo web. Si repites la misma respuesta veinte veces al
              día, es automatización.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Y hay una cuarta respuesta legítima: todavía no necesitas nada. Un negocio con poco
              volumen y un proceso que aún cambia cada mes suele estar mejor con una hoja de cálculo
              ordenada que con un sistema que congela un proceso que no está maduro. Cuando ese es el
              diagnóstico, lo decimos por escrito.
            </p>
            <ul className="space-y-2">
              {[
                "Tu equipo pasa horas copiando datos entre herramientas → software a medida",
                "Vendes producto y cierras cada venta a mano → e-commerce",
                "Llega tráfico a tu web pero nadie hace nada → desarrollo web y diseño UX/UI",
                "Repites la misma respuesta veinte veces al día → integración de IA",
                "Tu servicio se usa a diario desde el celular → app móvil",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <Check className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Si prefieres una respuesta sin hablar con nadie, el{" "}
              <Link href="/necesitas-un-sistema" className="text-brand hover:underline">
                test de 10 preguntas
              </Link>{" "}
              te la da al instante, y la{" "}
              <Link href="/costo-del-excel" className="text-brand hover:underline">
                calculadora del costo del Excel
              </Link>{" "}
              te dice en soles cuánto te cuesta al mes seguir operando como hoy.
            </p>
          </section>

          {/* ── Cumplimiento ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Cumplimiento peruano, incluido de fábrica
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Un sistema que no emite comprobantes válidos obliga a facturar en otro lado y a cuadrar
              dos fuentes a mano cada noche. Por eso el cumplimiento no se cotiza aparte: entra en el
              diseño. Trabajamos comprobantes de pago electrónicos vía OSE/PSE, libros electrónicos
              PLE y SIRE, validación de datos contra RENIEC y SUNAT, y el tratamiento de datos
              personales que exige la Ley 29733.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Es también la razón de que exista FacturArkos, nuestro producto propio de facturación
              electrónica y punto de venta para Mypes: construimos esa capa tantas veces que acabó
              siendo un producto.{" "}
              <Link href="/cumplimiento-sunat" className="text-brand hover:underline">
                Mide en 8 preguntas cómo está tu cumplimiento SUNAT
              </Link>
              .
            </p>
          </section>

          {/* ── Proceso ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 tracking-tight">
              Cómo trabajamos
            </h2>
            <ol className="space-y-5">
              {PROCESS.map((p) => (
                <li key={p.step} className="flex gap-5">
                  <span className="spec-label shrink-0 pt-1">{p.step}</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Precios ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Precios publicados, en soles
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Una landing de alta conversión parte de S/ 1,100 (USD 300); una web corporativa desde
              S/ 2,250; un e-commerce desde S/ 3,400; una web app o MVP desde S/ 4,500; una app móvil
              para iOS y Android desde S/ 9,400; y un sistema a medida —ERP, CRM, PMS o SaaS— desde
              S/ 13,000. Son rangos «desde»: el número final depende del alcance, las integraciones y
              si hay que migrar datos de un sistema anterior.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Trabajamos con pago por etapas contra hitos de entrega o con mensualidades.{" "}
              <Link href="/precios" className="text-brand font-medium hover:underline">
                Mira el detalle completo de precios →
              </Link>
            </p>
          </section>

          {/* ── Cobertura ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Dónde atendemos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Operamos desde Lima. Atendemos a empresas de Lima y Callao con reuniones presenciales
              agendadas, y al resto del Perú y de Latinoamérica de forma remota, en el mismo huso
              horario. Si tu empresa está en la capital, la página de{" "}
              <Link href="/desarrollo-de-software-lima" className="text-brand font-medium hover:underline">
                desarrollo de software a medida en Lima
              </Link>{" "}
              tiene los casos limeños, los rangos de precio y el detalle de cumplimiento SUNAT.
            </p>
          </section>

          {/* ── FAQ visible (coincide palabra por palabra con el FAQPage) ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 tracking-tight">
              Preguntas <span className="text-brand">frecuentes</span>
            </h2>
            <div className="divide-y divide-border border-t border-b border-border">
              {faqs.map((f) => (
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
              Empieza por el diagnóstico
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Treinta minutos, sin costo, para saber si lo tuyo es un sistema, un ajuste o nada
              todavía.
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </main>
  );
}
