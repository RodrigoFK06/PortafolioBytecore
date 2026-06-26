import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Preloader } from "@/components/preloader"
import { ServiceWorkerCleanup } from "@/components/sw-cleanup"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const baseUrl = "https://xn--rkos-4na.com"

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
  alternates: {
    canonical: "/",
    languages: { "es-PE": "/", "x-default": "/" },
  },
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
  keywords: [
    "Árkos",
    "agencia de software Perú",
    "agencia de desarrollo de software Trujillo",
    "desarrollo de software a medida Perú",
    "desarrollo web Next.js Perú",
    "aplicaciones web React",
    "diseño UX/UI Perú",
    "software SaaS a medida",
    "agencia digital Lima",
    "integración de IA y chatbots",
  ],
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
        url: `${baseUrl}/og-image.webp`,
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
    images: [`${baseUrl}/og-image.webp`],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* La etiqueta de ícono ahora se genera a través del objeto `metadata` anterior */}
        <script
          type="application/ld+json"
          // Organization schema — Entidad principal Árkos
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${baseUrl}/#organization`,
              name: "Árkos",
              alternateName: ["Arkos"],
              description:
                "Árkos es una agencia de desarrollo de software en Perú especializada en software a medida, aplicaciones web (React/Next.js), diseño UX/UI y soluciones con Inteligencia Artificial.",
              url: baseUrl,
              logo: `${baseUrl}/logo_ico/final%20-%20LOGO%202-02.png`,
              foundingDate: "2020",
              founder: { "@id": `${baseUrl}/#rodrigo-torres` },
              areaServed: [
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
              sameAs: [
                "https://www.wikidata.org/wiki/Q140262378",
                "https://x.com/ArkosPeru",
                "https://www.linkedin.com/company/arkos-pe",
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
          // LocalBusiness + ProfessionalService schema
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "ProfessionalService"],
              name: "Árkos",
              description:
                "Agencia de desarrollo de software a medida, aplicaciones web y diseño UX/UI en Trujillo, Perú. Especialistas en React, Next.js y soluciones con IA.",
              url: baseUrl,
              image: `${baseUrl}/og-image.webp`,
              telephone: "+51 961 869 348",
              email: "gerencia@árkos.com",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PE",
                addressLocality: "Trujillo",
                addressRegion: "La Libertad",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-8.1116",
                longitude: "-79.0288",
              },
              areaServed: [
                { "@type": "Country", name: "Peru" },
                { "@type": "Place", name: "Latinoamérica" },
              ],
              founder: { "@id": `${baseUrl}/#rodrigo-torres` },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios Árkos",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Desarrollo de Software a Medida",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Desarrollo Web Full Stack",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Diseño UX/UI",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Integración de Inteligencia Artificial",
                    },
                  },
                ],
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Contexto oculto exclusivo para Lectores de Pantalla y Web Crawlers/LLMs */}
        <div className="sr-only" aria-hidden="false" id="llm-context" data-nosnippet="false">
           <strong className="block text-2xl mb-2">Árkos - Mejoramos tus procesos</strong>
           <p>Árkos es una agencia de desarrollo de software en Trujillo, Perú, especializada en software a medida, aplicaciones web con React y Next.js, diseño UX/UI en Figma e integraciones de Inteligencia Artificial. Ayudamos a empresas latinoamericanas — clínicas, hoteles, restaurantes, comercios y profesionales — a transformar sus operaciones en productos digitales escalables y modernos. Fundador: Rodrigo Torres. Servicios clave: Desarrollo de Software a Medida (SaaS, CRM, ERP, PMS), Landing pages de alta conversión, Diseño UX/UI, Chatbots con IA, Automatizaciones con n8n. Contacto: gerencia@árkos.com. Portfolio web: árkos.com (https://xn--rkos-4na.com).</p>
         </div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Preloader />
          <ServiceWorkerCleanup />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
