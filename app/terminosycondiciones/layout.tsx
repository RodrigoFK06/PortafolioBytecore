import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Términos y Condiciones | ByteCore",
  description: "Términos de uso y condiciones del servicio.",
  alternates: { canonical: "/terminosycondiciones" },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
