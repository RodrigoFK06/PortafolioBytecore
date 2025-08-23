import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Portfolio | ByteCore",
  description: "Selección de proyectos y trabajos recientes.",
  alternates: { canonical: "/portfolio" },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "/" },
              { "@type": "ListItem", position: 2, name: "Portfolio", item: "/portfolio" },
            ],
          }),
        }}
      />
      {children}
    </>
  )}
