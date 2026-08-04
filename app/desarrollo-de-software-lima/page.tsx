import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Check, Quote } from "lucide-react"

import { SERVICES } from "@/data/services"
import { alternates, absUrl, BASE_URL } from "@/lib/seo"

// ── /desarrollo-de-software-lima ────────────────────────────────────────
// La página de dinero. Blueprint en docs/PLAN-SEO-LIMA.md §6.
//
// Reglas duras aplicadas aquí:
//  · Sin `PostalAddress` de Lima. No hay dirección pública que declarar;
//    `areaServed: City Lima` es la señal correcta y honesta.
//  · El FAQPage del JSON-LD se genera del MISMO array que el FAQ visible,
//    así que coinciden palabra por palabra por construcción. Marcar FAQPage
//    sin preguntas visibles incumple las guidelines de Google.
//  · Cero cifras inventadas. Todo número sale de /precios, de
//    data/projects.ts o de los testimonios firmados del home.

const PAGE_PATH = "/desarrollo-de-software-lima"
const PAGE_URL = absUrl(PAGE_PATH)

const WA_MESSAGE = encodeURIComponent(
  "Hola Árkos, mi empresa está en Lima y quiero cotizar un software a medida."
)
const WA_LINK = `https://wa.me/51961869348?text=${WA_MESSAGE}`

export const metadata: Metadata = {
  title: "Desarrollo de Software a Medida en Lima | Empresa de Software — Árkos",
  description:
    "Empresa de desarrollo de software a medida en Lima: ERP, CRM, apps y sistemas con facturación electrónica SUNAT. Precios en soles y casos con clientes limeños.",
  alternates: alternates(PAGE_PATH),
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: PAGE_URL,
    siteName: "Árkos",
    title: "Desarrollo de Software a Medida en Lima | Empresa de Software — Árkos",
    description:
      "ERP, CRM, apps y sistemas a medida para empresas de Lima, con facturación electrónica SUNAT. Precios publicados en soles y casos con clientes limeños.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Desarrollo de software a medida en Lima — Árkos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo de Software a Medida en Lima — Árkos",
    description:
      "ERP, CRM, apps y sistemas a medida para empresas de Lima, con facturación electrónica SUNAT. Precios en soles y casos limeños.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

// Las tres cifras del hero. Criterio: SOLO números que el visitante pueda
// comprobar él mismo sin creernos nada, y que ya estén declarados en otra
// parte del sitio — así no pueden contradecirse entre páginas, que es
// exactamente el error por el que dos de los competidores auditados pierden
// credibilidad (SB Perú dice 18 años en una plantilla y 20 en otra).
//
//  · "+50 proyectos desplegados" ya lo declara el hero del home.
//  · "24 casos publicados" es literal: son las 24 fichas de /portfolio, todas
//    con demo en vivo. Que sean menos que los desplegados es correcto y
//    honesto — el resto está bajo NDA.
//  · "2020" es el `foundingDate` del JSON-LD de la entidad.
//
// El blueprint pedía además el % de clientes que repiten. Esa cifra no existe
// en ningún sitio del repo y no se inventa.
// TODO(rodrigo): si mides la retención, añádela aquí como cuarta cifra y
// replícala IDÉNTICA en el home, el brochure, Clutch y el Perfil de Negocio.
const TRUST = [
  { figure: "+50", label: "Proyectos desplegados" },
  { figure: "24", label: "Casos publicados con demo en vivo" },
  { figure: "2020", label: "Operando desde" },
]

const LIMA_CASES = [
  {
    id: 2,
    title: "Solutec DHA",
    sector: "Servicio técnico a domicilio · Lima",
    body:
      "Dharcy Villafuerte atiende más de 2,500 clientes en Lima reparando electrodomésticos a domicilio, y toda esa relación vivía en WhatsApp. Construimos una landing premium —galería de trabajos, formulario de diagnóstico sin compromiso, CTAs directos a contacto— conectada a un sistema de gestión que captura los contactos de WhatsApp y los administra de punta a punta. El reto no era técnico: era que la web la hiciera ver profesional sin traicionar la cercanía que hizo crecer el negocio.",
    metric: "+40% de consultas mensuales por canal digital",
    quote:
      "Atiendo a más de 2,500 clientes en Lima desde WhatsApp y mi marca siempre fue cercana, casi de tú a tú. Mi miedo era que una web me hiciera ver fría o corporativa de más. El equipo logró lo contrario: ahora luzco profesional al primer clic, pero quien me escribe sigue encontrándose con la misma Dharcy de siempre.",
    author: "Dharcy Villafuerte",
    role: "Fundadora y Gerente, Solutec DHA",
  },
  {
    id: 4,
    title: "Casaroma Hostels",
    sector: "Alojamiento · Lima",
    body:
      "Alojamiento en Lima fundado por una familia de viajeros. El sitio tenía que transmitir el ambiente que hace que la gente vuelva —habitaciones cómodas, espacios para compartir con otros viajeros— y a la vez convertir la visita en una reserva. Es el tipo de proyecto donde el diseño hace la mayor parte del trabajo comercial.",
    metric: null,
    quote: null,
    author: null,
    role: null,
  },
  {
    id: 18,
    title: "Dr. Ing. Freedy Sotelo Valer",
    sector: "Académico · Universidad Nacional Tecnológica de Lima Sur",
    body:
      "Sitio personal editorial para el ex decano de facultad de la UNTELS: galería, propuestas y proyectos, preguntas frecuentes y descarga de materiales. Alto contraste, foco en tipografía y jerarquía. El requisito de fondo era que el sitio pesara tan poco como fuera posible sin perder carácter.",
    metric: "Carga del sitio en menos de 1.2 s",
    quote:
      "Mi trayectoria académica e ingenieril requería una presencia digital tan sobria como el contenido que respalda. Árkos tradujo años de docencia, investigación y gestión universitaria en una arquitectura web clara, ordenada y rigurosa. El resultado no es una página: es una credencial.",
    author: "Dr. Ing. Freedy Sotelo Valer",
    role: "Ex Decano de Facultad — UNTELS",
  },
]

const SECTORES = [
  {
    name: "Clínicas y salud",
    body:
      "Agendamiento de citas, historia clínica, portales separados de paciente y doctor. Lo hicimos en ATELIER Clinic (SaaS para clínicas estéticas) y en la plataforma de gestión hospitalaria de la Clínica Juan Pablo II, donde el 78% de las citas pasó a gestionarse digitalmente.",
    id: 6,
  },
  {
    name: "Restaurantes y delivery",
    body:
      "POS, cocina, caja y contabilidad en un solo sistema, en lugar de tres herramientas que no se hablan. RestHUB es nuestro ERP de restaurante; Rapiditos, la app de delivery propia con la que un negocio dejó de pagar comisión a marketplaces ajenos.",
    id: 19,
  },
  {
    name: "Hoteles y alojamiento",
    body:
      "PMS con reservas, huéspedes y rendimiento por propiedad, y revenue management cuando el volumen lo justifica. OrquestadorADM y VR PMS cubren desde el hotel boutique hasta el operador de varias unidades distribuidas.",
    id: 1,
  },
  {
    name: "Retail y comercio",
    body:
      "Tienda online con pasarela en soles, comprobante electrónico automático y stock único entre el canal digital y el punto de venta físico. ReLu Coffee, Maré y Colibrí son tres formas distintas de resolverlo.",
    id: 5,
  },
  {
    name: "Servicios profesionales",
    body:
      "Captación y ordenamiento de cartera para quien vende su tiempo o su oficio: landing que convierte más un CRM ligero detrás. Es exactamente el caso de Solutec DHA y de Solutec System.",
    id: 12,
  },
  {
    name: "Educación y sector público",
    body:
      "Sitios institucionales y sistemas de registro para eventos académicos, con inscripción, agenda y materiales descargables. El sitio del Dr. Ing. Freedy Sotelo (UNTELS) y el registro del II Simposio Veterinario Internacional son los dos referentes.",
    id: 15,
  },
]

const PRECIOS = [
  { tipo: "Landing de alta conversión", pen: "1,100", usd: "300" },
  { tipo: "Web corporativa", pen: "2,250", usd: "600" },
  { tipo: "E-commerce", pen: "3,400", usd: "900" },
  { tipo: "Web App / MVP a medida", pen: "4,500", usd: "1,200" },
  { tipo: "App móvil (iOS + Android)", pen: "9,400", usd: "2,500" },
  { tipo: "Sistema a medida — ERP, CRM, PMS, SaaS", pen: "13,000", usd: "3,500" },
]

const PROCESO = [
  {
    step: "01",
    title: "Llamada de diagnóstico (30 min, sin costo)",
    body:
      "Nos cuentas cómo operas hoy y te damos una lectura honesta: esto pinta a sistema, a ajuste o a nada todavía. Si tu empresa está en Lima, puede ser presencial y agendada.",
  },
  {
    step: "02",
    title: "Alcance y propuesta por escrito",
    body:
      "Definimos qué entra y qué no, con precio y plazo. Si quieres profundidad antes de comprometerte, existe el diagnóstico profundo de dos semanas (S/ 950), que se descuenta íntegro del proyecto si avanzas.",
  },
  {
    step: "03",
    title: "Diseño y prototipo navegable",
    body:
      "Prototipo en Figma con pantallas reales antes de programar. Tu equipo lo recorre y corrige ahí, donde corregir cuesta minutos en lugar de días.",
  },
  {
    step: "04",
    title: "Desarrollo por hitos",
    body:
      "Entregas revisables cada pocas semanas, no una caja negra de tres meses. Ves avance real y puedes cambiar el rumbo temprano.",
  },
  {
    step: "05",
    title: "Entrega, capacitación y acompañamiento",
    body:
      "Despliegue en producción, capacitación a tu equipo, y el código y los datos en tus manos. Decides tú si quieres mantenimiento continuo o si tu equipo se hace cargo.",
  },
]

// El FAQ visible y el FAQPage del schema salen de este mismo array.
const FAQS = [
  {
    q: "¿Cuánto cuesta desarrollar un software a medida en Lima?",
    a: "Un sistema a medida —ERP, CRM, PMS o SaaS— parte de S/ 13,000 (USD 3,500) y se cotiza por alcance según los módulos que necesites. Una web app o MVP parte de S/ 4,500, un e-commerce de S/ 3,400 y una landing de alta conversión de S/ 1,100. Son rangos «desde»: el precio final depende de las integraciones, los roles de usuario y si hay que migrar datos de un sistema anterior. Publicamos todos los rangos en la página de precios en lugar de responder «depende del alcance».",
  },
  {
    q: "¿En cuánto tiempo entregan un sistema?",
    a: "Un proyecto web típico toma de 3 a 8 semanas según el alcance. Un sistema a medida toma más, en función de su complejidad y del número de módulos. Trabajamos por hitos con entregas revisables, así que ves avance funcionando durante todo el proceso y no solo al final.",
  },
  {
    q: "¿El código fuente es mío?",
    a: "Sí. Al cierre del proyecto te entregamos el código fuente y la base de datos, y quedan a tu nombre. No trabajamos con esquemas que te obliguen a seguir contratándonos para poder usar tu propio sistema: si mañana decides cambiar de proveedor, puedes hacerlo sin rehacer nada.",
  },
  {
    q: "¿Integran con SUNAT y facturación electrónica?",
    a: "Sí, y va incluido de fábrica en los sistemas que lo requieren: comprobantes de pago electrónicos (CPE) vía OSE/PSE, libros electrónicos PLE y SIRE, y validación de datos contra RENIEC y SUNAT. También desarrollamos FacturArkos, nuestro producto propio de facturación electrónica y punto de venta para Mypes del Perú.",
  },
  {
    q: "¿Integran Yape, Plin, Niubiz, Culqi o Izipay?",
    a: "Sí. Integramos las pasarelas locales —Izipay, Culqi, MercadoPago— y Stripe para cobros internacionales, además de los medios de pago móvil que tu comprador ya usa en el celular. Cada pasarela tiene su propio proceso de afiliación, sus comisiones y sus tiempos de liquidación, y los revisamos contigo antes de elegir según tu ticket promedio y tu volumen.",
  },
  {
    q: "¿Trabajan presencialmente en Lima?",
    a: "Sí. Operamos desde Lima y hacemos reuniones presenciales agendadas en Lima y Callao —típicamente el arranque del proyecto y las revisiones de hito—, con el resto del trabajo en remoto. Para clientes fuera de Lima todo el proceso funciona por videollamada, en el mismo huso horario.",
  },
  {
    q: "¿Qué pasa si ya tengo un sistema y perdí contacto con el proveedor anterior?",
    a: "Es un escenario frecuente y no es un callejón sin salida. Empezamos por auditar qué hay: a qué datos se puede acceder, qué se puede migrar y qué conviene rehacer. En varios casos la salida más barata es recuperar y mantener lo existente en lugar de reescribirlo; te decimos cuál de las dos aplica antes de cotizar.",
  },
  {
    q: "¿Trabajan con proyectos de tesis o académicos?",
    a: "No. Desarrollamos software para empresas en operación. Si buscas apoyo para una tesis, un trabajo de curso o un proyecto académico, no somos el proveedor adecuado y preferimos decírtelo de entrada en lugar de hacerte perder tiempo.",
  },
  {
    q: "¿Hacen mantenimiento después de entregar?",
    a: "Sí, y es opcional. Al entregar defines si quieres un acompañamiento continuo —correcciones, evolución del sistema, soporte a tu equipo— o si tu equipo se hace cargo con el código y la documentación que te entregamos. Ambas opciones son legítimas y ninguna te deja atado.",
  },
  {
    q: "¿Firman NDA?",
    a: "Sí. Firmamos acuerdos de confidencialidad antes de que nos cuentes el detalle de tu operación, y varios proyectos del portafolio están publicados sin nombrar al cliente precisamente por eso. Si tu empresa maneja datos personales, además diseñamos el tratamiento conforme a la Ley 29733 de Protección de Datos Personales.",
  },
]

export default function DesarrolloDeSoftwareLimaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Desarrollo de software a medida en Lima",
        serviceType: "Desarrollo de software a medida",
        description:
          "Desarrollo de software a medida para empresas de Lima: ERP, CRM, PMS, SaaS, aplicaciones web y móviles, e-commerce e integración de inteligencia artificial, con facturación electrónica SUNAT incluida.",
        url: PAGE_URL,
        provider: { "@id": `${BASE_URL}/#organization` },
        // Sin PostalAddress: no hay dirección pública. `City Lima` es la señal
        // correcta para el orgánico y es honesta.
        areaServed: [
          { "@type": "City", name: "Lima", containedInPlace: { "@type": "Country", name: "Perú" } },
          { "@type": "AdministrativeArea", name: "Callao" },
        ],
        audience: { "@type": "BusinessAudience", name: "Empresas y pymes de Lima" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de desarrollo de software en Lima",
          itemListElement: SERVICES.map((sv) => ({
            "@type": "Offer",
            url: absUrl(`/services/${sv.slug}`),
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: Number(sv.priceFrom.pen.replace(/,/g, "")),
              priceCurrency: "PEN",
            },
            itemOffered: {
              "@type": "Service",
              name: sv.navTitle,
              serviceType: sv.serviceType,
              description: sv.summary,
            },
          })),
        },
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
          { "@type": "ListItem", position: 3, name: "Desarrollo de software en Lima", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Desarrollo de Software a Medida en Lima | Empresa de Software — Árkos",
        description:
          "Empresa de desarrollo de software a medida en Lima: ERP, CRM, apps y sistemas con facturación electrónica SUNAT. Precios en soles y casos con clientes limeños.",
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
            <li className="text-foreground font-medium">Desarrollo de software en Lima</li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <header className="max-w-3xl mx-auto mb-20">
          <p className="spec-label mb-5">Lima · Callao · Todo el Perú</p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Desarrollo de software a medida en <span className="text-brand">Lima</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Somos Árkos, una empresa de desarrollo de software que opera desde Lima. Construimos
            sistemas de gestión —ERP, CRM, PMS y SaaS—, aplicaciones web y móviles, tiendas online e
            integraciones de inteligencia artificial para empresas limeñas que ya no caben en un
            Excel.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Tres cosas nos separan del resto del mercado limeño, y las tres puedes verificarlas antes
            de escribirnos: publicamos los precios en soles, integramos el cumplimiento SUNAT desde
            el diseño y no como un módulo aparte, y mostramos clientes de Lima con nombre, métrica y
            testimonio firmado.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {TRUST.map((t) => (
              <div key={t.label}>
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground tabular">
                  {t.figure}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground leading-snug mt-1">{t.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Clientes en Lima:{" "}
            <Link href="/portfolio/2" className="text-foreground font-medium hover:text-brand transition-colors">
              Solutec DHA
            </Link>
            {" · "}
            <Link href="/portfolio/4" className="text-foreground font-medium hover:text-brand transition-colors">
              Casaroma Hostels
            </Link>
            {" · "}
            <Link href="/portfolio/18" className="text-foreground font-medium hover:text-brand transition-colors">
              Dr. Ing. Freedy Sotelo Valer (UNTELS)
            </Link>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/diagnostico"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Diagnóstico gratis de 30 minutos
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
          {/* ── 1. Qué construimos ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Qué construimos para empresas de Lima
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Seis servicios, y casi todos los proyectos combinan dos o tres. Cada uno tiene su
              página con el detalle, el precio «desde» y los proyectos reales donde ya lo hicimos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map((sv) => (
                <Link
                  key={sv.slug}
                  href={`/services/${sv.slug}`}
                  className="group block rounded-lg p-6 bg-card shadow-hairline hover:shadow-hairline-md transition-shadow"
                >
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    {sv.navTitle}
                    <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{sv.summary}</p>
                  <p className="text-xs text-muted-foreground">
                    Desde <strong className="text-foreground">S/ {sv.priceFrom.pen}</strong>
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── 2. Casos reales con empresas de Lima ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Casos reales con empresas de Lima
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              La parte que casi nadie en esta categoría pone en la página que compite por la
              búsqueda: clientes limeños con nombre, con métrica y con testimonio firmado. Cada caso
              enlaza a su ficha completa, con el problema, la decisión de diseño y el resultado.
            </p>

            <div className="space-y-8">
              {LIMA_CASES.map((c) => (
                <article key={c.id} className="rounded-2xl border border-border p-6 md:p-8">
                  <p className="spec-label mb-3">{c.sector}</p>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{c.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{c.body}</p>

                  {c.metric && (
                    <p className="text-sm font-medium text-foreground mb-4">
                      <span className="text-brand">→</span> {c.metric}
                    </p>
                  )}

                  {c.quote && (
                    <blockquote className="border-l-2 border-brand pl-4 mb-4">
                      <Quote className="h-4 w-4 text-brand mb-2" aria-hidden="true" />
                      <p className="text-muted-foreground leading-relaxed italic">“{c.quote}”</p>
                      <footer className="mt-2 text-sm text-foreground font-medium">
                        {c.author}
                        {c.role && <span className="text-muted-foreground font-normal"> — {c.role}</span>}
                      </footer>
                    </blockquote>
                  )}

                  <Link
                    href={`/portfolio/${c.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                  >
                    Ver el caso completo
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>

            <p className="mt-8 text-muted-foreground leading-relaxed">
              Hay 24 proyectos más en el{" "}
              <Link href="/portfolio" className="text-brand hover:underline">
                portafolio completo
              </Link>
              , con la ficha de cada uno: qué problema resolvía, qué decidimos y qué pasó después.
            </p>
          </section>

          {/* ── 3. Cuánto cuesta ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Cuánto cuesta un software a medida en Lima
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ninguna de las empresas de software que compiten por esta búsqueda en Lima publica un
              precio: todas responden «depende de la complejidad y el alcance». Depende, sí — pero
              eso no impide dar un punto de partida. Estos son los rangos «desde», en soles y
              referenciales a 2026, con tipo de cambio aproximado de S/ 3.75 por dólar.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-border mb-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary text-sm">
                    <th className="p-4 font-semibold">Tipo de proyecto</th>
                    <th className="p-4 font-semibold text-right whitespace-nowrap">Desde (S/)</th>
                    <th className="p-4 font-semibold text-right whitespace-nowrap">Desde (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {PRECIOS.map((p) => (
                    <tr key={p.tipo} className="border-t border-border">
                      <td className="p-4 font-medium">{p.tipo}</td>
                      <td className="p-4 text-right font-semibold whitespace-nowrap">S/ {p.pen}</td>
                      <td className="p-4 text-right whitespace-nowrap text-muted-foreground">$ {p.usd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Lo que mueve el precio hacia arriba es siempre lo mismo: el número de módulos y de
              roles de usuario, las integraciones (pasarelas de pago en soles, facturación
              electrónica, courier, APIs externas), el diseño a medida frente a plantilla, y la
              migración de datos cuando hay que reemplazar un sistema antiguo. Trabajamos con pago
              por etapas contra hitos de entrega o con mensualidades.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <Link href="/precios" className="text-brand font-medium hover:underline">
                Ver el detalle completo de precios →
              </Link>{" "}
              o calcula primero{" "}
              <Link href="/costo-del-excel" className="text-brand hover:underline">
                cuánto te cuesta al mes seguir operando en Excel
              </Link>
              .
            </p>
          </section>

          {/* ── 4. Cumplimiento peruano ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Cumplimiento peruano: SUNAT, datos personales y pagos locales
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Este es el bloque que separa a quien de verdad construye software en Perú de quien
              vende desarrollo genérico. Un sistema de gestión que no emite comprobantes válidos
              obliga a tu equipo a facturar en otra herramienta y a cuadrar dos fuentes a mano cada
              noche. Por eso el cumplimiento no se cotiza como extra: entra en el diseño desde el
              primer sprint.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Facturación electrónica (CPE): boletas y facturas emitidas y validadas vía OSE/PSE, enviadas automáticamente al cliente.",
                "Libros electrónicos PLE y SIRE, generados desde los mismos datos con los que opera el sistema.",
                "Validación de identidad y datos contra RENIEC y SUNAT, para que el comprobante no se rechace por un dato mal escrito.",
                "Ley 29733 de Protección de Datos Personales: qué se guarda, por cuánto tiempo, quién accede y cómo se elimina.",
                "Pagos locales: Izipay, Culqi, MercadoPago, Stripe para cobros internacionales, y los medios de pago móvil que tu cliente ya tiene en el celular.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <Check className="h-5 w-5 shrink-0 text-brand mt-0.5" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Construimos esta capa tantas veces que terminó siendo un producto propio: FacturArkos,
              facturación electrónica SUNAT más punto de venta, inventario y tienda online para
              Mypes, sin instalación y desde el celular.{" "}
              <Link href="/cumplimiento-sunat" className="text-brand font-medium hover:underline">
                Mide en 8 preguntas cómo está tu cumplimiento SUNAT
              </Link>{" "}
              o mira{" "}
              <Link href="/portfolio/21" className="text-brand hover:underline">
                la ficha de FacturArkos
              </Link>
              .
            </p>
          </section>

          {/* ── 5. Sectores ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Sectores que atendemos en Lima
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              No listamos sectores para llenar la página: cada uno está anclado a un proyecto real
              que puedes abrir y revisar.
            </p>
            <div className="space-y-6">
              {SECTORES.map((s) => (
                <div key={s.name}>
                  <h3 className="font-semibold text-foreground mb-2">{s.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">{s.body}</p>
                  <Link
                    href={`/portfolio/${s.id}`}
                    className="text-sm font-medium text-brand hover:underline"
                  >
                    Ver el caso →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. Cómo trabajamos ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight">
              Cómo trabajamos con empresas de Lima
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Cinco pasos, y el primero es gratis. Al operar desde Lima, las reuniones de arranque y
              las revisiones de hito pueden ser presenciales y agendadas en Lima o Callao; el resto
              del trabajo es remoto, en el mismo huso horario y sin la coordinación imposible de un
              proveedor a seis husos de distancia.
            </p>
            <ol className="space-y-6">
              {PROCESO.map((p) => (
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
                Conoce el diagnóstico en detalle →
              </Link>
            </p>
          </section>

          {/* ── 7. FAQ visible (idéntico al FAQPage del schema) ── */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 tracking-tight">
              Preguntas frecuentes sobre desarrollo de software en Lima
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
              ¿Tu empresa está en Lima y el Excel ya no da más?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Empieza por una llamada de 30 minutos, sin costo. Te decimos si lo tuyo es un sistema,
              un ajuste o nada todavía — incluida la tercera respuesta, que es la que nadie te da.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90"
              >
                Agendar diagnóstico gratis
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
