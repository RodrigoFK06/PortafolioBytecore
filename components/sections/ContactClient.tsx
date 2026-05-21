// components/sections/ContactClient.tsx
"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { SITE_CONFIG } from "@/lib/constants"

export function ContactClient() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="group bg-black/[0.04] dark:bg-white/[0.03] backdrop-blur-[12px] p-8 md:p-10 rounded-2xl border border-black/10 dark:border-white/10 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] overflow-hidden h-full flex flex-col relative z-10"
    >
      {/* Chiseled Light border on hover */}
      <div className="absolute inset-0 border border-black/0 dark:border-white/0 group-hover:border-black/10 dark:group-hover:border-white/10 rounded-2xl transition-colors pointer-events-none opacity-0 group-hover:opacity-100 z-20" style={{ background: "linear-gradient(135deg, rgba(150,150,150,0.15) 0%, rgba(150,150,150,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2 text-foreground">Cuéntanos sobre tu proyecto</h3>
        <p className="text-foreground/75 text-sm mb-6">
          Te respondemos en menos de 24 horas hábiles. Sin presupuestos automáticos: cada cotización la armamos a partir de tu caso.
        </p>

        {/* Atajo a WhatsApp como ruta alternativa al formulario */}
        <a
          href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent("Hola Árkos, quiero conversar sobre un proyecto.")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir a Árkos directamente por WhatsApp (abre en una nueva pestaña)"
          className="group/wa mb-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/30 hover:border-[#25D366]/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">¿Prefieres WhatsApp?</p>
              <p className="text-xs text-foreground/65 leading-tight mt-0.5">Escríbenos directo, sin formulario.</p>
            </div>
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#1faa55] group-hover/wa:translate-x-1 transition-transform shrink-0">
            Abrir →
          </span>
        </a>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-black/[0.08] dark:border-white/[0.08]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-50 dark:bg-[#050505] px-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              O envía el formulario
            </span>
          </div>
        </div>

        <ContactForm />
      </div>
    </motion.div>
  )
}
