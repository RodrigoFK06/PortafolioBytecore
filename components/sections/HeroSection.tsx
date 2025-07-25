import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "@/components/animated-text"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import clsx from "clsx"

const HeroClient = dynamic(() => import("./HeroClient"), { ssr: false })

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Valores por defecto para evitar hydration mismatch
  const textColor = mounted 
    ? (theme === "light" ? "text-gray-900" : "text-white")
    : "text-gray-900" // Default fallback

  const descriptionColor = mounted
    ? (theme === "light" ? "text-gray-800" : "text-white/90")
    : "text-gray-800" // Default fallback

  const primaryButtonClass = mounted
    ? (theme === "light"
        ? "bg-gray-800/60 border-blue-500/20 text-white"
        : "bg-white/60 border-blue-500/50 text-gray-900")
    : "bg-gray-800/60 border-blue-500/20 text-white" // Default fallback

  const secondaryButtonClass = mounted
    ? (theme === "light"
        ? "border-gray-900 text-gray-900 hover:bg-gray-100/10"
        : "border-white text-white hover:bg-white/10")
    : "border-gray-900 text-gray-900 hover:bg-gray-100/10" // Default fallback

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 🎨 Fondo animado y motion (solo cliente) */}
      <HeroClient />

      {/* 📌 Contenido SSR con clases condicionales */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center items-center h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={clsx(
            "text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-center",
            textColor
          )}>
            <AnimatedText
              text={
                <>
                  Tu Software Hecho{" "}
                  <div className="inline-flex flex-wrap gap-2 md:gap-4 justify-center items-center">
                    <span className="glass-effect px-3 py-1 md:px-4 md:py-2 md:pb-4">Byte</span>
                    <span className="inline-block text-xl md:text-2xl lg:text-3xl">x</span>
                    <span className="glass-effect px-3 py-1 md:px-4 md:py-2 md:pb-4">Byte</span>
                  </div>
                </>
              }
            />
          </h1>

          <p className={clsx(
            "my-10 text-lg md:text-xl mb-8 max-w-2xl mx-auto transition-colors",
            descriptionColor
          )}>
            Somos ByteCore, una agencia digital especializada en desarrollo web, diseño UX/UI y soluciones tecnológicas innovadoras.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className={clsx(
                "group relative p-4 rounded-xl border shadow-lg transition-all duration-300 hover:scale-105",
                primaryButtonClass
              )}
            >
              <Link href="#projects" className="flex items-center">
                Ver Proyectos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className={clsx(
                "group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-105",
                secondaryButtonClass
              )}
            >
              <Link href="#contact" className="flex items-center">
                Contáctanos
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 🔽 Indicador de scroll */}
      <div className="absolute bottom-10 inset-x-0 flex justify-center z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  )
}
