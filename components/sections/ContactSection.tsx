// components/sections/ContactSection.tsx
import { Mail, Linkedin, Github, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

import { RevealText } from "@/components/gsap-reveal"

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
          <div className="absolute -top-10 left-0 md:-left-4 font-mono text-[10px] text-brand/80 italic px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 z-20 transform -rotate-1">
             // Terminal de Acceso_
          </div>

          <RevealText as="h2" className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10 mb-8 md:mb-12">
            Iniciar <br className="hidden md:block" /> <span className="text-brand">Protocolo</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-foreground/70 mt-8 max-w-2xl text-base md:text-lg leading-relaxed relative z-10 md:pl-16 border-l-[2px] border-brand/30 ml-2">
              ¿Listo para romper lo convencional? Establezcamos un canal directo. Discutamos cómo nuestra ingeniería puede escalar tu visión de forma implacable.
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
            <h3 className="text-2xl font-bold mb-6 text-foreground">Coordenadas</h3>
            <div className="space-y-6 mb-12">
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mr-4 group-hover:bg-brand/10 transition-colors duration-300">
                   <Mail className="h-5 w-5 text-brand" />
                </div>
                <div className="pt-1 flex flex-col justify-center">
                  <h4 className="font-mono text-xs tracking-widest text-foreground/50 uppercase mb-1">Email</h4>
                  <p className="text-foreground/80 font-medium">rodrigoan.torresp@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mr-4 group-hover:bg-brand/10 transition-colors duration-300">
                   <Linkedin className="h-5 w-5 text-brand" />
                </div>
                <div className="pt-1 flex flex-col justify-center">
                  <h4 className="font-mono text-xs tracking-widest text-foreground/50 uppercase mb-1">LinkedIn</h4>
                  <p className="text-foreground/80 font-medium">linkedin.com/in/rodrigo-torres-bytecore/</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mr-4 group-hover:bg-brand/10 transition-colors duration-300">
                   <Github className="h-5 w-5 text-brand" />
                </div>
                <div className="pt-1 flex flex-col justify-center">
                  <h4 className="font-mono text-xs tracking-widest text-foreground/50 uppercase mb-1">GitHub</h4>
                  <p className="text-foreground/80 font-medium">github.com/RodrigoFK06</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-foreground">Briefing Rápido</h3>
            <p className="text-foreground/70 mb-8 leading-relaxed max-w-sm">
              ¿No tienes tiempo para formularios? Envíanos un email directo o descarga nuestros planes para enviar a tu equipo técnico.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="group rounded-xl w-full sm:w-auto h-12 bg-foreground text-background hover:bg-foreground/90 font-medium">
                <Link href="mailto:rodrigoan.torresp@gmail.com">
                  Enviar Mensaje Directo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="group rounded-xl w-full sm:w-auto h-12 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-md shadow-none font-medium">
                <Link
                  href="/planesyservicios.pdf"
                  download="planesyservicios.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentación Técnica
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
