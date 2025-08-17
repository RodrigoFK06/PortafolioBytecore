import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "@/components/animated-text"
import { GlassStatsGrid } from "@/components/glass-stat-card"
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

  // Estadísticas con nuevo sistema visual
  const heroStats = [
    { value: 285, suffix: "%", label: "Aumento Promedio", gradient: "mint" as const },
    { value: 50, suffix: "+", label: "Negocios Transformados", gradient: "blue" as const },
    { value: 100, suffix: "%", label: "Clientes Satisfechos", gradient: "cyan" as const }
  ]

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
                  No Solo Hacemos Webs,{" "}
                  <span className="bg-gradient-to-r from-mint-400 to-teal-500 dark:from-mint-200 dark:to-teal-300 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_100%]">
                    Multiplicamos Ventas
                  </span>
                </>
              }
            />
          </h1>

          <p className={clsx(
            "my-10 text-lg md:text-xl mb-8 max-w-3xl mx-auto transition-colors",
            descriptionColor
          )}>
            <strong>Transformamos negocios con tecnología inteligente.</strong> Nuestros clientes promedian{" "}
            <span className="bg-gradient-to-r from-mint-400 to-teal-500 dark:from-mint-200 dark:to-teal-300 bg-clip-text text-transparent font-bold">
              +285% de aumento en ventas
            </span>{" "}
            en los primeros 6 meses. ¿Listo para ser el próximo?
          </p>

          {/* Stats con glassmorphism */}
          <GlassStatsGrid stats={heroStats} className="mb-12" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="group relative p-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-mint hover:shadow-mint-400/50 text-white border-0"
            >
              <Link href="#projects" className="flex items-center">
                🚀 Ver Casos de Éxito
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-105 bg-glass-light dark:bg-glass-dark backdrop-blur-md border-mint-400/30 dark:border-mint-300/20 text-mint-600 dark:text-mint-300 hover:bg-mint-50/50 dark:hover:bg-mint-900/20"
            >
              <Link href="#contact" className="flex items-center">
                📞 Consulta Gratuita
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
