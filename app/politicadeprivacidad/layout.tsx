import type { Metadata } from "next"
import React from "react"
import { alternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Política de Privacidad | Árkos",
  description: "Cómo tratamos y protegemos tus datos personales.",
  alternates: alternates("/politicadeprivacidad"),
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
