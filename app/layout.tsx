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

const baseUrl = BASE_URL

export const metadata: Metadata = {
  title: "Árkos | Agencia de Desarrollo Web y Software en Perú",
  description:
    "Árkos es una agencia digital en Perú especializada en desarrollo de software a medida, páginas web, diseño UI/UX y soluciones tecnológicas innovadoras.",
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
    title: "Árkos | Agencia de Desarrollo Web y Software en Perú",
    description:
      "Árkos es una agencia digital en Perú especializada en desarrollo de software a medida, páginas web, diseño UI/UX y soluciones tecnológicas innovadoras.",
    siteName: "Árkos",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Árkos - Agencia Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Árkos | Agencia de Desarrollo Web y Software en Perú",
    description:
      "Árkos es una agencia digital en Perú especializada en desarrollo de software a medida, páginas web, diseño UI/UX y soluciones tecnológicas innovadoras.",
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
              alternateName: ["Arkos"],
              description:
                "Árkos es una agencia de desarrollo de software con base en Lima, Perú, especializada en software a medida, aplicaciones web (React/Next.js), diseño UX/UI y soluciones con Inteligencia Artificial. Atiende a empresas de todo el Perú.",
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
              // Lima primero: es la ciudad que se reclama. Trujillo se mantiene
              // porque hay casos reales allí y borrarla destruiría una señal
              // local ya indexada sin ganar nada.
              areaServed: [
                { "@type": "City", name: "Lima" },
                { "@type": "City", name: "Trujillo" },
                { "@type": "Country", name: "Peru" },
                { "@type": "Place", name: "Latinoamérica" },
              ],
              knowsAbout: [
                "Desarrollo de Software a Medida",
                "React",
                "Next.js",
                "TypeScript",
                "Diseño UX/UI",
                "Software SaaS",
                "Inteligencia Artificial",
                "Chatbots",
                "Automatización de Procesos",
                "E-commerce",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de Árkos",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Desarrollo de Software a Medida",
                      description:
                        "Sistemas SaaS, CRMs, ERPs, y plataformas empresariales complejas construidas con React, Next.js y TypeScript.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Desarrollo Web Full Stack",
                      description:
                        "Landing pages de alta conversión, e-commerce y sitios corporativos hiper-optimizados con JAMStack.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Diseño UX/UI",
                      description:
                        "Interfaces modernas, funcionales y centradas en la experiencia del usuario, diseñadas en Figma.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Integración de Inteligencia Artificial",
                      description:
                        "Chatbots, agentes de ventas automatizados y flujos de automatización con n8n/Make para optimización de procesos empresariales.",
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
                "Sitio web oficial de Árkos, agencia de desarrollo de software y diseño UX/UI en Perú.",
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
              jobTitle: "Founder & Tech Lead",
              worksFor: { "@id": `${baseUrl}/#organization` },
              knowsAbout: [
                "Desarrollo de Software a Medida",
                "Next.js",
                "React",
                "TypeScript",
                "Diseño UX/UI",
                "Inteligencia Artificial",
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
        {/* Contexto oculto exclusivo para Lectores de Pantalla y Web Crawlers/LLMs */}
        <div className="sr-only" aria-hidden="false" id="llm-context" data-nosnippet="false">
           <strong className="block text-2xl mb-2">Árkos - Mejoramos tus procesos</strong>
           <p>Árkos es una agencia de desarrollo de software en Lima, Perú, especializada en software a medida, aplicaciones web con React y Next.js, diseño UX/UI en Figma e integraciones de Inteligencia Artificial. Opera desde Lima y atiende a empresas de todo el Perú —Lima, Callao, Trujillo, Arequipa y provincias— además de clientes en el resto de Latinoamérica, de forma remota y con visitas presenciales agendadas. Ayudamos a clínicas, hoteles, restaurantes, comercios y profesionales a transformar sus operaciones en productos digitales escalables y modernos. Fundador: Rodrigo Torres. Servicios clave: Desarrollo de Software a Medida (SaaS, CRM, ERP, PMS), Landing pages de alta conversión, Diseño UX/UI, Chatbots con IA, Automatizaciones con n8n. Contacto: gerencia@árkos.com. Portfolio web: árkos.com (https://xn--rkos-4na.com).</p>
         </div>

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
