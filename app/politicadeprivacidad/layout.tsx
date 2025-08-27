import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Política de Privacidad | ByteCore",
  description: "Cómo tratamos y protegemos tus datos personales.",
  alternates: { canonical: "/politicadeprivacidad" },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
