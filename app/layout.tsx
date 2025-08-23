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
  metadataBase: new URL(baseUrl),
  alternates: { canonical: "/" },
  keywords: [
    "agencia digital",
    "desarrollo web",
    "diseño UI/UX",
    "ByteCore",
    "tecnología",
    "React",
    "Agencia de software Perú",
    "Agencia de software Trujillo",
    "Agencia de software Lima",
    "Agencia digital Perú",
    "Agencia digital Trujillo",
    "Agencia digital Lima",
    "Desarrollo de software Perú",
    "Desarrollo de software Trujillo",
    "Desarrollo de software Lima",
    "Desarrollo de aplicaciones Perú",
    "Desarrollo de aplicaciones Trujillo",
    "Desarrollo de aplicaciones Lima",
    "Desarrollo de páginas web Perú",
    "Desarrollo de páginas web Trujillo",
    "Desarrollo de páginas web Lima",
    "Diseño de software Perú",
    "Diseño de software Trujillo",
    "Diseño de software Lima",
    "Diseño de aplicaciones Perú",
    "Diseño de aplicaciones Trujillo",
    "Diseño de aplicaciones Lima",
    "Diseño de páginas web Perú",
    "Diseño de páginas web Trujillo",
    "Diseño de páginas web Lima",
    "Desarrollo de software a medida Perú",
    "Desarrollo de software a medida Trujillo",
    "Desarrollo de software a medida Lima",
    "Desarrollo de aplicaciones a medida Perú",
    "Desarrollo de aplicaciones a medida Trujillo",
    "Desarrollo de aplicaciones a medida Lima",
    "Desarrollo de páginas web a medida Perú",
    "Desarrollo de páginas web a medida Trujillo",
    "Desarrollo de páginas web a medida Lima",
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
        <script
          type="application/ld+json"
          // Organization schema
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ByteCore",
              url: baseUrl,
              logo: `${baseUrl}/logoblanco.webp`,
              sameAs: [
                "https://github.com/RodrigoFK06",
                "https://www.linkedin.com/in/rodrigo-torres-bytecore/"
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          // WebSite with SearchAction schema
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: baseUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${baseUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
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
