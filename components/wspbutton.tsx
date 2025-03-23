"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, estoy interesado en contratar tus servicios de desarrollo web. ¿Podemos conversar más?");
    const url = `https://wa.me/51961869348?text=${message}`;
    window.open(url, "_blank");
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-24 right-8 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            size="icon"
            onClick={openWhatsApp}
            aria-label="Contactar por WhatsApp"
            className="rounded-full shadow-md bg-green-500 text-white"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
