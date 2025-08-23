import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Proyectos | ByteCore",
  description: "Portafolio de proyectos destacados en web, móvil y UX/UI.",
  alternates: { canonical: "/projects" },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
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
              { "@type": "ListItem", position: 2, name: "Proyectos", item: "/projects" },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
