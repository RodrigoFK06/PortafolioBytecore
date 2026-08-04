import type { Metadata } from "next"
import React from "react"
import { alternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Árkos",
  description: "Términos de uso y condiciones del servicio.",
  alternates: alternates("/terminosycondiciones"),
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
