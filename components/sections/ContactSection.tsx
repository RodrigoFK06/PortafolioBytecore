// components/sections/ContactSection.tsx
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

import { RevealText } from "@/components/gsap-reveal"
import { SITE_CONFIG } from "@/lib/constants"

// CSR dinámico solo para el formulario
const ContactClient = dynamic(() => import("./ContactClient").then(mod => mod.ContactClient), {
  ssr: false,
})

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 mb-16 md:mb-24">
        <div className="max-w-4xl relative text-left">

          {/* Anotación Marginal */}

          <RevealText as="h2" className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10 mb-8 md:mb-12">
            Conversemos <br className="hidden md:block" /> <span className="text-brand">tu proyecto</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-foreground/80 mt-8 max-w-2xl text-base md:text-lg leading-relaxed relative z-10 md:pl-16 border-l-[2px] border-brand/30 ml-2">
              Cuéntanos qué necesitas, sin formalidades. Una clínica que quiere agendar mejor, una tienda que necesita vender online, un hotel que pide un PMS a medida. Te respondemos en menos de 24 horas hábiles.
            </p>
          </RevealText>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">Contacto directo</h3>
            <div className="space-y-6 mb-12">
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-start group" aria-label="Enviar email a Árkos">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mr-4 group-hover:bg-brand/10 transition-colors duration-300">
                   <Mail className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                <div className="pt-1 flex flex-col justify-center">
                  <h4 className="font-mono text-xs tracking-widest text-foreground/60 uppercase mb-1">Email</h4>
                  <p className="text-foreground/90 font-medium group-hover:text-brand transition-colors break-all">{SITE_CONFIG.contact.email}</p>
                </div>
              </a>

              <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-start group" aria-label="Escribir por WhatsApp a Árkos (abre en una nueva pestaña)">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mr-4 group-hover:bg-brand/10 transition-colors duration-300">
                   <Phone className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                <div className="pt-1 flex flex-col justify-center">
                  <h4 className="font-mono text-xs tracking-widest text-foreground/60 uppercase mb-1">WhatsApp</h4>
                  <p className="text-foreground/90 font-medium group-hover:text-brand transition-colors">{SITE_CONFIG.contact.phone}</p>
                </div>
              </a>

              <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-start group" aria-label="Visitar el LinkedIn de Árkos (abre en una nueva pestaña)">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mr-4 group-hover:bg-brand/10 transition-colors duration-300">
                   <Linkedin className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                <div className="pt-1 flex flex-col justify-center">
                  <h4 className="font-mono text-xs tracking-widest text-foreground/60 uppercase mb-1">LinkedIn</h4>
                  <p className="text-foreground/90 font-medium group-hover:text-brand transition-colors">LinkedIn de Árkos</p>
                </div>
              </a>

              <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="flex items-start group" aria-label="Visitar el GitHub de Árkos (abre en una nueva pestaña)">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mr-4 group-hover:bg-brand/10 transition-colors duration-300">
                   <Github className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                <div className="pt-1 flex flex-col justify-center">
                  <h4 className="font-mono text-xs tracking-widest text-foreground/60 uppercase mb-1">GitHub</h4>
                  <p className="text-foreground/90 font-medium group-hover:text-brand transition-colors">GitHub de Árkos</p>
                </div>
              </a>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mr-4">
                   <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                <div className="pt-1 flex flex-col justify-center">
                  <h4 className="font-mono text-xs tracking-widest text-foreground/60 uppercase mb-1">Ubicación</h4>
                  <p className="text-foreground/90 font-medium">{SITE_CONFIG.contact.address}</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand/5 border border-brand/15">
              <h3 className="text-lg font-bold mb-2 text-foreground">¿Prefieres una llamada?</h3>
              <p className="text-foreground/75 text-sm leading-relaxed">
                Si tu proyecto necesita conversación, agendamos una reunión sin compromiso de 30 minutos. Sin tecnicismos, contándonos qué necesitas y en cuánto tiempo.
              </p>
            </div>
          </motion.div>

          {/* Componente del formulario cargado dinámicamente */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative group">
             <ContactClient />
          </div>
        </div>
      </div>
    </section>
  )
}
