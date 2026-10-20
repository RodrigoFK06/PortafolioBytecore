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

  return (
    <div className="fixed bottom-6 md:bottom-8 right-4 md:right-8 z-[9999] flex flex-col items-center gap-2 p-2 bg-background/90 backdrop-blur-sm rounded-full shadow-hairline-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Scroll to Top */}
      <Button
        size="icon"
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-transparent hover:bg-secondary text-muted-foreground hover:text-foreground border-none transition-all duration-300"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>

      <div className="w-8 h-[1px] bg-border my-1" />

      {/* WhatsApp */}
      <Button
        size="icon"
        onClick={openWhatsApp}
        className="group relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white border-none transition-all duration-300"
        aria-label="Escríbenos por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-background/90 text-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border">
          Escríbenos por WhatsApp
        </span>
      </Button>
    </div>
  )
}
