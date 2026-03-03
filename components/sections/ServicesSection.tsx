"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight, Layout, Monitor, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealText, StaggerReveal } from "@/components/gsap-reveal"
import { motion } from "framer-motion"

// Card with Flashlight effect specific for the Home Page layout
function ServiceCard({ icon: Icon, title, description, href, offset = false }: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClient) return;
    const { left, top } = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - left, y: e.clientY - top })
  }

  return (
    <div 
      className={`relative group cursor-crosshair h-full flex flex-col ${offset ? 'lg:mt-16' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div className="relative bg-black/[0.02] dark:bg-white/[0.01] backdrop-blur-[12px] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 transition-all duration-500 overflow-hidden h-full flex flex-col">
        {/* Flashlight */}
        {isClient && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--brand) / 0.15), transparent 40%)`,
            }}
          />
        )}
        
        <div className="mb-8 relative z-10 font-mono text-xs text-brand tracking-[0.2em] uppercase flex items-center justify-between">
           <span className="opacity-70">[SVC_MOD]</span>
           <Icon className="h-6 w-6 opacity-80 group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-foreground relative z-10 group-hover:text-brand transition-colors">{title}</h3>
        
        <p className="text-foreground/70 mb-8 flex-grow relative z-10 leading-relaxed text-sm md:text-base">
          {description}
        </p>
        
        <div className="mt-auto relative z-10">
          <Button asChild variant="outline" className="w-full sm:w-auto bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground group/btn rounded-xl backdrop-blur-md transition-all duration-300">
            <Link href={href}>
              <span className="flex items-center">
                Saber más
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
              </span>
            </Link>
          </Button>
        </div>

        {/* Chiseled Light border on hover */}
        <div className="absolute inset-0 border border-black/0 dark:border-white/0 group-hover:border-black/10 dark:group-hover:border-white/10 rounded-2xl transition-colors pointer-events-none opacity-0 group-hover:opacity-100 z-20" style={{ background: "linear-gradient(135deg, rgba(150,150,150,0.15) 0%, rgba(150,150,150,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />
      </div>
    </div>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />
      
      {/* Background Glow subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col mb-16 md:mb-24 relative">
          {/* Anotación Marginal */}
          <div className="absolute -top-8 left-0 md:-left-8 font-mono text-[10px] text-brand/80 italic px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 z-20 transform -rotate-3">
             // Módulos de Operación_
          </div>
          
          <RevealText as="h2" className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10 max-w-4xl">
            Nuestros <br className="hidden md:block" /> <span className="text-brand">Servicios</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-foreground/70 mt-8 md:mt-12 max-w-2xl text-base md:text-lg leading-relaxed relative z-10 md:pl-16 border-l-[2px] border-brand/30 ml-2">
              Arquitectura digital, interfaces táctiles y plataformas de comercio ultra-rápidas, diseñadas para dominar en un ecosistema saturado y diferenciarse del ruido generado por plantillas.
            </p>
          </RevealText>
        </div>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10" stagger={0.15}>
          <ServiceCard
            icon={Layout}
            title="Desarrollo Web"
            description="Software radical. Construimos aplicaciones web con arquitecturas edge-first para cargas instantáneas, escalabilidad total y SEO perfecto."
            href="/services#web-development"
          />
          <ServiceCard
            icon={Palette}
            title="Diseño UI/UX"
            description="Interfaces humanas. Abandonamos los flujos genéricos por micro-interacciones viscerales que sumergen al usuario y lo obligan a quedarse."
            href="/services#ui-ux-design"
            offset={true}
          />
          <ServiceCard
            icon={Monitor}
            title="E-Commerce"
            description="Máquinas de conversión. Pasarelas fluidas, carga paralela y arquitectura asimétrica para transacciones ultra veloces y sin fricción."
            href="/services#ecommerce"
          />
        </StaggerReveal>

        <div className="mt-20 md:mt-32 text-center md:text-right relative z-10">
          <RevealText delay={0.4}>
             <Button asChild size="lg" className="group rounded-xl relative overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground hover:bg-black/10 dark:hover:bg-white/10 font-bold uppercase tracking-[0.2em] text-xs px-8 py-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors">
                <Link href="/services" className="flex items-center">
                  <span className="relative z-10 flex items-center">
                    Explorar Stack Completo
                    <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-3 text-brand" />
                  </span>
                </Link>
              </Button>
          </RevealText>
        </div>
      </div>
    </section>
  )
}

