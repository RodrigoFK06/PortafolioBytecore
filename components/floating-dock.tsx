"use client"

import { useState, useEffect } from "react"
import { MessageCircle, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SITE_CONFIG } from "@/lib/constants"

export default function FloatingDock() {
  const [isVisible, setIsVisible] = useState(false)

  // Efecto para mostrar/ocultar el dock según scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola, estoy interesado en contratar los servicios de Árkos. ¿Podemos conversar más sobre mi proyecto?"
    );
    const url = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  // Compacto y pegado al borde: la píldora anterior (≈72×145 px, a 32 px del
  // borde) invadía el contenido. En escritorio cabe en el margen lateral de las
  // secciones (48 px en el peor ancho); en móvil queda solo WhatsApp, y
  // "volver arriba" se oculta.
  return (
    <div className="fixed bottom-4 right-3 lg:bottom-6 lg:right-2 z-[9999] flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Scroll to Top */}
      <Button
        size="icon"
        onClick={scrollToTop}
        className="hidden lg:inline-flex w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm shadow-hairline-md hover:bg-secondary text-muted-foreground hover:text-foreground border-none transition-all duration-300"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-4 h-4" aria-hidden="true" />
      </Button>

      {/* WhatsApp */}
      <Button
        size="icon"
        onClick={openWhatsApp}
        className="group relative w-11 h-11 lg:w-10 lg:h-10 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white border-none shadow-hairline-md transition-all duration-300"
        aria-label="Escríbenos por WhatsApp"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        <span className="absolute right-full mr-4 bg-background/90 text-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border">
          Escríbenos por WhatsApp
        </span>
      </Button>
    </div>
  )
}
