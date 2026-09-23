import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { fontSans, fontMono, fontDisplay } from "@/app/fonts"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LenisProvider } from "@/components/motion/lenis-provider"
import { Toaster } from "@/components/ui/toaster"
import { ServiceWorkerCleanup } from "@/components/sw-cleanup"
import { alternates, BASE_URL } from "@/lib/seo"
import { SITE_CONFIG } from "@/lib/constants"
import {
  PRICE_TIERS,
  PRECIO_TALLER,
  TALLER_HORAS,
  TALLER_PERSONAS_MAX,
  PRECIO_DIAGNOSTICO,
  DIAGNOSTICO_SEMANAS,
  GARANTIA_MULTIPLO,
  GARANTIA_UMBRAL_ANUAL,
  soles,
} from "@/data/pricing"

const baseUrl = BASE_URL

/**
 * Precio "desde" de un tier del tarifario, en el formato que pide schema.org.
 * Lee data/pricing.ts para que el OfferCatalog no sea una tercera copia de los
 * precios: si cambian allí, cambian aquí y en /precios y /pricing.md a la vez.
 */
function priceSpec(tierName: string) {
  const tier = PRICE_TIERS.find((t) => t.name === tierName)
  if (!tier) return undefined
  return [
    { "@type": "PriceSpecification", minPrice: Number(tier.penLabel.replace(/,/g, "")), priceCurrency: "PEN" },
    { "@type": "PriceSpecification", minPrice: tier.usd, priceCurrency: "USD" },
  ]
}

export const metadata: Metadata = {
  title: "Árkos | Mejora de procesos y adopción de IA para empresas en Perú",
  description:
    "Árkos, en Lima, mejora los procesos de tu empresa con automatización e IA y enseña a tu equipo a usarla. Taller, diagnóstico de procesos y software a medida.",
  metadataBase: new URL(baseUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    // OAI-SearchBot and CCBot (ChatGPT/Claude) explicit permissions
    "max-snippet": -1,
  },
  other: {
    // Bing/Windows specific
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
  // Canonical del home sin barra final — la forma que Next emite — y el
  // sitemap declara esa misma forma. Antes el sitemap la llevaba y el canonical
  // no: dos formas de la misma URL. El helper garantiza además que
  // `es-PE` y `x-default` apunten a la URL propia de cada página — antes, las
  // páginas que declaraban su propia `alternates` perdían el hreflang por el
  // shallow-merge de la metadata de Next, y las que no lo hacían apuntaban
  // todas al home.
  alternates: alternates("/"),
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo_ico/final-LOGO-2-07.ico',
        href: '/logo_ico/final-LOGO-2-07.ico',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo_ico/final-LOGO-2-08.ico',
        href: '/logo_ico/final-LOGO-2-08.ico',
      },
    ],
  },
  // `keywords` se retiró a propósito: Google la ignora desde 2009 y aquí solo
  // documentaba una estrategia que no estaba ejecutada — declaraba "agencia
  // digital Lima" sin que existiera una sola página orientada a Lima.
  // Las keywords se ganan con páginas, no con meta tags.
  authors: [{ name: "Árkos" }],
  creator: "Árkos",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: baseUrl,
    title: "Árkos | Mejora de procesos y adopción de IA para empresas en Perú",
    description:
      "Árkos, en Lima, mejora los procesos de tu empresa con automatización e IA y enseña a tu equipo a usarla. Taller, diagnóstico de procesos y software a medida.",
    siteName: "Árkos",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Árkos - Mejora de procesos y adopción de IA para empresas en Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Árkos | Mejora de procesos y adopción de IA para empresas en Perú",
    description:
      "Árkos, en Lima, mejora los procesos de tu empresa con automatización e IA y enseña a tu equipo a usarla. Taller, diagnóstico de procesos y software a medida.",
    site: "@ArkosPeru",
    creator: "@ArkosPeru",
    images: [`${baseUrl}/og-image.png`],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* La etiqueta de ícono ahora se genera a través del objeto `metadata` anterior */}
        <link rel="alternate" type="application/rss+xml" title="Blog de Árkos" href="/rss.xml" />
        <script
          type="application/ld+json"
          // Entidad principal Árkos — nodo único multi-type (Organization +
          // LocalBusiness + ProfessionalService) para que los parsers vean UNA
          // sola entidad con @id, no dos "Árkos" duplicadas.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
              "@id": `${baseUrl}/#organization`,
              name: "Árkos",
              alternateName: ["Arkos", "Arkos Soluciones Informáticas"],
              // Entidad legal inscrita en SUNAT el 10/08/2026. El RUC es el
              // identificador verificable de la empresa en Perú: ancla la
              // entidad a un registro público consultable, que es la señal
              // más fuerte que existe frente a un modelo que duda si somos
              // un negocio real o una landing. `foundingDate` sigue en 2020
              // porque esa es la operación; la S.A.C.S. es su formalización.
              legalName: SITE_CONFIG.legal.nameFull,
              taxID: SITE_CONFIG.legal.ruc,
              vatID: `PE${SITE_CONFIG.legal.ruc}`,
              identifier: {
                "@type": "PropertyValue",
                propertyID: "RUC",
                name: "RUC (SUNAT, Perú)",
                value: SITE_CONFIG.legal.ruc,
              },
              naics: "541511",
              isicV4: "6201",
              // Posicionamiento del 2026-09-23: la identidad es mejora de
              // procesos, automatización y adopción de IA; el desarrollo a
              // medida es el medio. SUNAT pasa a ser una capacidad de los
              // sistemas (ver la oferta de software a medida), no la
              // definición de la empresa.
              description:
                "Árkos es una empresa de tecnología con base en Lima, Perú, especializada en mejora de procesos, automatización y adopción de inteligencia artificial en empresas, con desarrollo de software a medida. Hace que los procesos de una empresa funcionen mejor con automatización e IA, y le enseña a su equipo a usarla. Trabaja en tres pasos: un taller de adopción de tecnología para el equipo, un diagnóstico de procesos con informe y roadmap con costos, y el desarrollo a medida de lo que haga falta (sistemas, automatizaciones, asistentes con bases de conocimiento propias, webs y apps). Equipo de nueve personas; más de 50 proyectos entregados y más de 20 sistemas en producción desde 2020. Atiende a empresas de todo el Perú y a clientes en Latinoamérica, Estados Unidos y Europa.",
              url: baseUrl,
              logo: `${baseUrl}/logo_ico/final%20-%20LOGO%202-02.png`,
              image: `${baseUrl}/og-image.png`,
              telephone: "+51 961 869 348",
              email: "gerencia@árkos.com",
              priceRange: "$$",
              // Sin `streetAddress`: la dirección exacta no es pública y no se
              // inventa. `addressLocality` sí, porque es desde donde se opera
              // (Lima) y es la señal que resuelve la entidad — hoy Clutch decía
              // Trujillo, Facebook decía Lima y el schema decía Trujillo.
              address: {
                "@type": "PostalAddress",
                addressCountry: "PE",
                addressLocality: "Lima",
                addressRegion: "Lima",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-12.0464",
                longitude: "-77.0428",
              },
              foundingDate: "2020",
              founder: { "@id": `${baseUrl}/#rodrigo-torres` },
              numberOfEmployees: { "@type": "QuantitativeValue", value: 9 },
              // Lima primero: es la ciudad que se reclama. Trujillo se mantiene
              // porque hay casos reales allí y borrarla destruiría una señal
              // local ya indexada sin ganar nada.
              areaServed: [
                { "@type": "City", name: "Lima" },
                { "@type": "City", name: "Callao" },
                { "@type": "City", name: "Trujillo" },
                { "@type": "City", name: "Arequipa" },
                { "@type": "Country", name: "Peru" },
                { "@type": "Place", name: "Latinoamérica" },
              ],
              // Horario comercial declarado: el nodo LocalBusiness lo pedía y
              // su ausencia es una señal incompleta para el pack local.
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "13:00",
                },
              ],
              knowsAbout: [
                // 2026-09-23: lo que Árkos hace primero va primero. El orden
                // no pesa en el schema, pero es lo que un modelo lee antes.
                "Mejora de procesos en empresas",
                "Automatización de Procesos",
                "Adopción de tecnología en empresas",
                "Diagnóstico de procesos",
                "Desarrollo de Software a Medida",
                "React",
                "Next.js",
                "TypeScript",
                "Diseño UX/UI",
                "Software SaaS",
                "Inteligencia Artificial",
                "Chatbots",
                "E-commerce",
                // Añadidos cuando Precio Vivo y Precio Justo entraron al
                // portafolio: hasta ahora el sitio reclamaba capacidad de IA
                // sin nada público que la respaldara. Declarar lo que no se
                // puede demostrar es justamente lo que abarata la entidad.
                "Ingeniería de Datos",
                "Machine Learning",
                "Series Temporales y Pronóstico",
                "RAG (Retrieval-Augmented Generation)",
                // Sept. 2026: la línea de adopción de IA pasa a ser servicio
                // declarado, con respaldo público (Solutec RAG, Precio Vivo,
                // formación de equipos desde 2023).
                "Adopción de IA en empresas",
                "Habilitación y formación de usuarios de negocio en IA",
                "Gobierno y uso responsable de IA",
                "Agentes de IA y tool calling",
                // Capacidad dentro del software a medida, no identidad.
                "Facturación electrónica SUNAT y libros PLE/SIRE en sistemas a medida",
              ],
              // Orden = recorrido de la oferta (2026-09-22): taller →
              // diagnóstico de procesos → desarrollo. Precios desde
              // data/pricing.ts, igual que /taller y /diagnostico.
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de Árkos",
                itemListElement: [
                  {
                    "@type": "Offer",
                    price: String(PRECIO_TALLER),
                    priceCurrency: "PEN",
                    description: "Precio por grupo.",
                    itemOffered: {
                      "@type": "Service",
                      name: "Taller de adopción de tecnología e IA para equipos",
                      description:
                        `Paso 1. Taller de ${TALLER_HORAS} horas para hasta ${TALLER_PERSONAS_MAX} personas, con la IA como camino: criterio de uso (cada modelo tiene sus fuertes) y práctica sobre el trabajo real del equipo. El equipo se lleva un mapa de sus tareas repetidas por área. Lo da Rodrigo Torres.`,
                      url: `${baseUrl}/taller`,
                    },
                  },
                  {
                    "@type": "Offer",
                    price: String(PRECIO_DIAGNOSTICO),
                    priceCurrency: "PEN",
                    description:
                      `Se descuenta íntegro del proyecto si se avanza. Garantía: si el informe no encuentra pérdidas de al menos ${GARANTIA_MULTIPLO} veces su precio al año (S/ ${soles(GARANTIA_UMBRAL_ANUAL)}), se devuelve el pago.`,
                    itemOffered: {
                      "@type": "Service",
                      name: "Diagnóstico de procesos",
                      description:
                        `Paso 2. ${DIAGNOSTICO_SEMANAS} semanas de análisis de los procesos de la empresa: dónde se pierde tiempo, plata o clientes. Entrega un informe y un roadmap priorizado con costos.`,
                      url: `${baseUrl}/diagnostico`,
                    },
                  },
                  {
                    "@type": "Offer",
                    priceSpecification: priceSpec("Integración y adopción de IA"),
                    itemOffered: {
                      "@type": "Service",
                      name: "Automatización de procesos e integración de IA",
                      description:
                        "Flujos de automatización con n8n y Make, y asistentes y agentes RAG sobre bases de conocimiento propias, conectados a los CRM y ERP que la empresa ya opera.",
                      url: `${baseUrl}/services/integracion-ia`,
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Adopción de IA y formación de equipos",
                      description:
                        "Onboarding de punta a punta, formación en el puesto con currículos distintos para usuarios de negocio y equipos técnicos, formación en cascada con grupo núcleo y segunda línea de soporte, gobierno legible para no técnicos y medición con línea base antes y después. Se cotiza por alcance.",
                      url: `${baseUrl}/services/integracion-ia`,
                    },
                  },
                  {
                    "@type": "Offer",
                    priceSpecification: priceSpec("Sistema a medida — CRM, ERP, PMS, SaaS"),
                    itemOffered: {
                      "@type": "Service",
                      name: "Desarrollo de Software a Medida",
                      description:
                        "Paso 3. Sistemas SaaS, CRMs, ERPs y plataformas empresariales construidas con React, Next.js y TypeScript desde los procesos reales de la empresa. Cuando la operación lo necesita, incluyen facturación electrónica SUNAT y libros PLE/SIRE.",
                      url: `${baseUrl}/services/software-a-medida`,
                    },
                  },
                  {
                    "@type": "Offer",
                    priceSpecification: priceSpec("Web corporativa"),
                    itemOffered: {
                      "@type": "Service",
                      name: "Desarrollo web",
                      description:
                        "Landing pages de alta conversión, sitios corporativos y plataformas web con Next.js y React, servidas con renderizado en servidor.",
                      url: `${baseUrl}/services/desarrollo-web`,
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Diseño UX/UI",
                      description:
                        "Interfaces modernas, funcionales y centradas en la experiencia del usuario, diseñadas en Figma.",
                      url: `${baseUrl}/services/diseno-ux-ui`,
                    },
                  },
                ],
              },
              // Nota: el perfil de LinkedIn PERSONAL vive en el sameAs de la
              // entidad Person (#rodrigo-torres), no aquí — un perfil solo
              // puede ser sameAs de UNA entidad. Cuando exista la LinkedIn
              // Company Page de Árkos, añadirla aquí. El QID de Wikidata se
              // retiró porque la entidad no existe (404); recrear el ítem
              // cuando haya 2+ referencias externas y actualizar.
              sameAs: [
                "https://x.com/ArkosPeru",
                "https://clutch.co/profile/rkos",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          // WebSite schema
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${baseUrl}/#website`,
              name: "Árkos",
              url: baseUrl,
              description:
                "Sitio web oficial de Árkos: mejora de procesos, automatización y adopción de IA para empresas, con desarrollo a medida. Lima, Perú.",
              inLanguage: "es-PE",
              publisher: { "@id": `${baseUrl}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${baseUrl}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          // Person schema — Rodrigo Torres (fundador, señal E-E-A-T)
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${baseUrl}/#rodrigo-torres`,
              name: "Rodrigo Torres",
              url: baseUrl,
              jobTitle: "Fundador y Gerente General",
              description:
                "Fundador y Gerente General de Árkos. Seis años dirigiendo entrega de software y acompañando a usuarios de negocio en la adopción de las plataformas que construye, dos de ellos con IA generativa en producción para clientes. Onboarding de más de 45 clientes de punta a punta, con poblaciones de usuario de 5 a más de 200 personas.",
              worksFor: { "@id": `${baseUrl}/#organization` },
              knowsLanguage: ["es", "en"],
              knowsAbout: [
                "Desarrollo de Software a Medida",
                "Adopción de IA en empresas",
                "Habilitación de usuarios de negocio",
                "IA generativa aplicada (RAG, agentes, tool calling)",
                "Gobierno y uso responsable de IA",
                "Integración fiscal peruana (SUNAT, SIRE, PLE, facturación electrónica)",
                "Next.js",
                "React",
                "TypeScript",
                "Python",
                "Diseño UX/UI",
              ],
              // Certificaciones verificables (CV de Rodrigo, sept. 2026). Sin URLs de
              // credencial hasta tenerlas: un enlace roto es peor que ninguno.
              hasCredential: [
                { "@type": "EducationalOccupationalCredential", name: "Generative AI Overview for Project Managers", credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: "Project Management Institute" }, dateCreated: "2026" },
                { "@type": "EducationalOccupationalCredential", name: "AI Fluency for Builders", credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: "Anthropic" }, dateCreated: "2026" },
                { "@type": "EducationalOccupationalCredential", name: "AI Fluency for Small Businesses", credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: "Anthropic" }, dateCreated: "2026" },
                { "@type": "EducationalOccupationalCredential", name: "Agents Course", credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: "Hugging Face" }, dateCreated: "2026" },
                { "@type": "EducationalOccupationalCredential", name: "Certified Scrum Master", credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: "Scrum Alliance" }, dateCreated: "2024" },
              ],
              sameAs: [
                "https://github.com/RodrigoFK06",
                "https://www.linkedin.com/in/rodrigo-torres-arkos",
                "https://www.instagram.com/_rodrigofk_/",
              ],
            }),
          }}
        />
      </head>
      <body className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable} font-sans antialiased`}>
        {/* El bloque de contexto para LLMs vive ahora en components/LlmContext.tsx
            y SOLO se renderiza en el home (app/page.tsx). Estaba aquí, en todas
            las páginas, y por ser el bloque de prosa más denso de cada una los
            extractores por densidad devolvían esta descripción genérica en lugar
            del contenido real de /portfolio/19 o /diagnostico. */}
        <LenisProvider>
          <ServiceWorkerCleanup />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </LenisProvider>
      </body>
    </html>
  )
}
