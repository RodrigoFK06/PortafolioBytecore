import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const baseUrl = "https://portafolio-bytecore.vercel.app"

export const metadata: Metadata = {
  title: "ByteCore | Agencia Digital de Desarrollo y Diseño",
  description:
    "ByteCore es una agencia digital especializada en desarrollo web, diseño UI/UX y soluciones tecnológicas innovadoras para empresas.",
  keywords: [
    "agencia digital",
    "desarrollo web",
    "diseño UI/UX",
    "ByteCore",
    "tecnología",
    "React",
    "Next.js",
  ],
  authors: [{ name: "ByteCore" }],
  creator: "ByteCore",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: baseUrl,
    title: "ByteCore | Agencia Digital de Desarrollo y Diseño",
    description:
      "ByteCore es una agencia digital especializada en desarrollo web, diseño UI/UX y soluciones tecnológicas innovadoras para empresas.",
    siteName: "ByteCore",
    images: [
      {
        url: `${baseUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "ByteCore - Agencia Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByteCore | Agencia Digital de Desarrollo y Diseño",
    description:
      "ByteCore es una agencia digital especializada en desarrollo web, diseño UI/UX y soluciones tecnológicas innovadoras para empresas.",
    creator: "@bytecore",
    images: [`${baseUrl}/og-image.webp`],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
