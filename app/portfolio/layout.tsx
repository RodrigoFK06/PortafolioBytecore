import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Portfolio | Árkos",
  description: "Selección de proyectos y trabajos recientes.",
  alternates: { canonical: "/portfolio" },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
