import type { Metadata } from "next"
import { alternates } from "@/lib/seo"
import React from "react"

const baseUrl = "https://xn--rkos-4na.com"

// Antes: "Portfolio | Árkos" + description de 43 caracteres, sin og propio.
// Al no declarar openGraph, esta página heredaba el og:title del home, lo que
// rompe el CTR al compartir por WhatsApp — el canal principal de este negocio.
const title = "Portafolio de proyectos: software a medida, ERP y apps | Árkos"
const description =
  "24 proyectos reales de Árkos: ERP y POS para restaurantes, CRM, PMS hotelero, apps móviles publicadas y e-commerce. Casos con cliente, stack y resultados."

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
      {children}
    </>
  )
}
