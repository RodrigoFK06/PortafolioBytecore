import type { Metadata } from "next"
import { alternates } from "@/lib/seo"
import React from "react"
import { projects } from "@/data/projects"

const baseUrl = "https://xn--rkos-4na.com"

// Antes: "Portfolio | Árkos" + description de 43 caracteres, sin og propio.
// Al no declarar openGraph, esta página heredaba el og:title del home, lo que
// rompe el CTR al compartir por WhatsApp — el canal principal de este negocio.
const title = "Portafolio de proyectos: software a medida, ERP y apps | Árkos"
const description =
  "28 proyectos reales de Árkos: ERP y POS para restaurantes, CRM, PMS hotelero, productos de datos con IA, apps móviles publicadas y e-commerce. Casos con cliente, stack y resultados."

export const metadata: Metadata = {
  title,
  description,
  alternates: alternates("/portfolio"),
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: `${baseUrl}/portfolio`,
    siteName: "Árkos",
    title,
    description,
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: "Portafolio de Árkos" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${baseUrl}/og-image.png`],
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* La página que lista TODO el portafolio no emitía ningún dato
          estructurado: un parser veía 28 tarjetas de texto sin saber que son
          28 obras distintas de la misma organización. El ItemList las declara
          como entidades nombradas y enlaza cada una a su ficha, que ya emite
          su propio CreativeWork — así el grafo queda cerrado: Organization →
          CollectionPage → ItemList → CreativeWork de cada caso.
          Va en el layout (server component) a propósito: page.tsx es "use
          client" por el filtro de categorías y no debe cargar este JSON. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${baseUrl}/portfolio#collection`,
            name: "Portafolio de proyectos de Árkos",
            description,
            url: `${baseUrl}/portfolio`,
            inLanguage: "es-PE",
            isPartOf: { "@id": `${baseUrl}/#website` },
            about: { "@id": `${baseUrl}/#organization` },
            publisher: { "@id": `${baseUrl}/#organization` },
            mainEntity: {
              "@type": "ItemList",
              name: "Proyectos desarrollados por Árkos",
              numberOfItems: projects.length,
              itemListOrder: "https://schema.org/ItemListUnordered",
              itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "CreativeWork",
                  "@id": `${baseUrl}/portfolio/${project.id}#case`,
                  name: project.title,
                  description: project.description,
                  url: `${baseUrl}/portfolio/${project.id}`,
                  image: `${baseUrl}${project.imageSrc}`,
                  keywords: project.tags?.join(", "),
                  creator: { "@id": `${baseUrl}/#organization` },
                  ...(project.year ? { datePublished: project.year } : {}),
                },
              })),
            },
          }),
        }}
      />
      {children}
    </>
  )
}
