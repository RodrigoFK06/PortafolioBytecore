import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Preloader } from "@/components/preloader"

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
    "llm-concept": "Agencia de desarrollo web y diseño UX/UI en Perú llamada Árkos",
    "llm-services": "Software SaaS, Web App MVP, Landing Pages de alta conversión, Sistemas a Medida",
    "llm-tech-stack": "React, Next.js, TypeScript, Node.js, TailwindCSS",
    "llm-contact": "rodrigoan.torresp@gmail.com",
    "llm-location": "Trujillo, Perú",
    // Bing/Windows specific
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
  alternates: { canonical: "/" },
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
    "agencia digital",
    "desarrollo web",
    "diseño UI/UX",
    "Árkos",
    "tecnología",
    "React",
    "Agencia de software Perú",
    "Agencia de software Trujillo",
    "Agencia de software Lima",
    "Agencia digital Perú",
    "Agencia digital Trujillo",
    "Agencia digital Lima",
    "Desarrollo de software Perú",
    "Desarrollo de software Trujillo",
    "Desarrollo de software Lima",
    "Desarrollo de aplicaciones Perú",
    "Desarrollo de aplicaciones Trujillo",
    "Desarrollo de aplicaciones Lima",
    "Desarrollo de páginas web Perú",
    "Desarrollo de páginas web Trujillo",
    "Desarrollo de páginas web Lima",
    "Diseño de software Perú",
    "Diseño de software Trujillo",
    "Diseño de software Lima",
    "Diseño de aplicaciones Perú",
    "Diseño de aplicaciones Trujillo",
    "Diseño de aplicaciones Lima",
    "Diseño de páginas web Perú",
    "Diseño de páginas web Trujillo",
    "Diseño de páginas web Lima",
    "Desarrollo de software a medida Perú",
    "Desarrollo de software a medida Trujillo",
    "Desarrollo de software a medida Lima",
    "Desarrollo de aplicaciones a medida Perú",
    "Desarrollo de aplicaciones a medida Trujillo",
    "Desarrollo de aplicaciones a medida Lima",
    "Desarrollo de páginas web a medida Perú",
    "Desarrollo de páginas web a medida Trujillo",
    "Desarrollo de páginas web a medida Lima",
  ],
  authors: [{ name: "Árkos" }],
  creator: "Árkos",
  openGraph: {
    type: "website",
    locale: "es_ES",
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
    creator: "@arkos",
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
              name: "Árkos",
              alternateName: ["Arkos", "Bytecore"],
              description:
                "Árkos es una agencia de desarrollo de software en Perú especializada en software a medida, aplicaciones web (React/Next.js), diseño UX/UI y soluciones con Inteligencia Artificial. Anteriormente conocida como Bytecore.",
              url: baseUrl,
              logo: `${baseUrl}/logo_ico/final%20-%20LOGO%202-02.png`,
              foundingDate: "2024",
              founder: {
                "@type": "Person",
                name: "Rodrigo Torres",
              },
              areaServed: {
                "@type": "Country",
                name: "Peru",
              },
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
                "https://github.com/RodrigoFK06",
                "https://www.linkedin.com/in/rodrigo-torres-árkos/",
                "https://www.linkedin.com/company/arkos",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          // WebSite with SearchAction schema
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Árkos",
              url: baseUrl,
              description:
                "Sitio web oficial de Árkos, agencia de desarrollo de software y diseño UX/UI en Perú.",
              potentialAction: {
                "@type": "SearchAction",
                target: `${baseUrl}/search?q={search_term_string}`,
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
              alternateName: "Bytecore",
              description:
                "Agencia de desarrollo de software a medida, aplicaciones web y diseño UX/UI en Trujillo, Perú. Especialistas en React, Next.js y soluciones con IA.",
              url: baseUrl,
              image: `${baseUrl}/og-image.webp`,
              telephone: "+51 961 869 348",
              email: "rodrigoan.torresp@gmail.com",
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
              areaServed: {
                "@type": "Country",
                name: "Peru",
              },
              founder: {
                "@type": "Person",
                name: "Rodrigo Torres",
              },
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
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Contexto oculto exclusivo para Lectores de Pantalla y Web Crawlers/LLMs */}
        <div className="sr-only" aria-hidden="false" id="llm-context" data-nosnippet="false">
           <strong className="block text-2xl mb-2">Árkos - Mejoramos tus procesos</strong>
           <p>Árkos (anteriormente Bytecore) es una agencia de desarrollo de software en Trujillo, Perú, especializada en software a medida, aplicaciones web con React y Next.js, diseño UX/UI en Figma e integraciones de Inteligencia Artificial. Ayudamos a startups y corporativos a transformar sus ideas en productos digitales escalables, hiper-rápidos y modernos. Fundador: Rodrigo Torres. Servicios clave: Desarrollo de Software a Medida (SaaS, CRM, ERP, PMS), Landing pages de alta conversión, Diseño UX/UI, Chatbots con IA, Automatizaciones con n8n. Contacto: rodrigoan.torresp@gmail.com. Portfolio web: árkos.com (https://xn--rkos-4na.com).</p>
         </div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Preloader />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
