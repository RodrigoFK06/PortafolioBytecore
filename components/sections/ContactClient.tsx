// components/sections/ContactClient.tsx
"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"

export function ContactClient() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="group bg-black/[0.02] dark:bg-white/[0.01] backdrop-blur-[12px] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] overflow-hidden h-full flex flex-col relative z-10"
    >
      {/* Chiseled Light border on hover */}
      <div className="absolute inset-0 border border-black/0 dark:border-white/0 group-hover:border-black/10 dark:group-hover:border-white/10 rounded-2xl transition-colors pointer-events-none opacity-0 group-hover:opacity-100 z-20" style={{ background: "linear-gradient(135deg, rgba(150,150,150,0.15) 0%, rgba(150,150,150,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />

      <h3 className="text-2xl font-bold mb-8 text-foreground relative z-10">Envíanos un Mensaje</h3>
      <div className="relative z-10">
         <ContactForm />
      </div>
    </motion.div>
  )
}
