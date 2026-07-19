// components/sections/ContactClient.tsx
"use client"

import { MessageCircle } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { SITE_CONFIG } from "@/lib/constants"
import { Reveal } from "@/components/motion/reveal"

export function ContactClient() {
  return (
    <Reveal effect="rise" className="h-full">
      <div className="bg-card p-8 md:p-10 rounded-lg shadow-hairline h-full flex flex-col">
        <h3 className="font-display text-2xl font-bold mb-2 text-foreground">Cuéntanos sobre tu proyecto</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Te respondemos en menos de 24 horas hábiles. Sin presupuestos automáticos: cada
          cotización la armamos a partir de tu caso.
        </p>

        {/* Atajo a WhatsApp como ruta alternativa al formulario */}
        <a
          href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent("Hola Árkos, quiero conversar sobre un proyecto.")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir a Árkos directamente por WhatsApp (abre en una nueva pestaña)"
          className="group/wa mb-6 flex items-center justify-between gap-4 p-4 rounded-md bg-[#25D366]/10 hover:bg-[#25D366]/15 shadow-hairline transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">¿Prefieres WhatsApp?</p>
              <p className="text-xs text-muted-foreground leading-tight mt-0.5">Escríbenos directo, sin formulario.</p>
            </div>
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#1a8a48] group-hover/wa:translate-x-1 transition-transform shrink-0">
            Abrir →
          </span>
        </a>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-3 spec-label">O envía el formulario</span>
          </div>
        </div>

        <ContactForm />
      </div>
    </Reveal>
  )
}
