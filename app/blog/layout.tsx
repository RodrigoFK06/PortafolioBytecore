import type { Metadata } from "next"
import React from "react"
import { alternates, absUrl, BASE_URL } from "@/lib/seo"

// La description anterior tenía 52 caracteres ("Artículos y guías sobre
// desarrollo, UX/UI y tecnología."), sin keywords y sin OpenGraph propio: /blog
// heredaba el og:title genérico del home. Reescrita para describir lo que el
// blog realmente cubre, y con OG y Twitter propios.
export const metadata: Metadata = {
  title: "Blog de desarrollo de software y sistemas para pymes del Perú | Árkos",
  description:
    "Guías sobre desarrollo de software a medida, ERPs y CRMs, cumplimiento SUNAT, precios en soles y casos reales de sistemas construidos para pymes peruanas.",
  alternates: alternates("/blog"),
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: absUrl("/blog"),
    siteName: "Árkos",
    title: "Blog de desarrollo de software y sistemas para pymes del Perú | Árkos",
    description:
      "Software a medida, ERPs y CRMs, cumplimiento SUNAT y casos reales de sistemas construidos para pymes peruanas.",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Blog de Árkos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de desarrollo de software y sistemas para pymes del Perú | Árkos",
    description:
      "Software a medida, ERPs y CRMs, cumplimiento SUNAT y casos reales de sistemas para pymes peruanas.",
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="alternate" type="application/rss+xml" title="Árkos Blog RSS" href="/rss.xml" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: absUrl("/") },
              { "@type": "ListItem", position: 2, name: "Blog", item: absUrl("/blog") },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
