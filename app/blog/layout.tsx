import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Blog | ByteCore",
  description: "Artículos y guías sobre desarrollo, UX/UI y tecnología.",
  alternates: { canonical: "/blog" },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
              { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
