import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Proyectos | Árkos",
  description: "Portafolio de proyectos destacados en web, móvil y UX/UI.",
  alternates: { canonical: "/projects" },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
