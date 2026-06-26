"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, Layout, Monitor, Palette, Boxes } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealText, StaggerReveal } from "@/components/gsap-reveal"
import { motion } from "framer-motion"
import ServiceModal from "@/components/ServiceModal"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  detailedDescription?: string
  offset?: boolean
}

function ServiceCard({ icon: Icon, title, description, detailedDescription, offset = false }: ServiceCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      className={`relative group cursor-crosshair h-full flex flex-col ${offset ? 'lg:mt-12' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`relative p-8 md:p-10 rounded-2xl transition-all duration-500 overflow-hidden h-full flex flex-col ${
          isModalOpen
            ? 'opacity-0 scale-95 pointer-events-none backdrop-blur-none bg-transparent border-transparent'
            : 'opacity-100 scale-100 bg-black/[0.04] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.05] border border-black/10 dark:border-white/10 hover:border-black/15 dark:hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]'
        }`}
      >
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
           <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand/20 group-hover:scale-110 transition-all duration-500">
             <Icon className="h-7 w-7 text-brand" aria-hidden="true" />
           </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 text-foreground relative z-10 group-hover:text-brand transition-colors">{title}</h3>

        <p className="text-foreground/80 mb-8 flex-grow relative z-10 leading-relaxed text-sm md:text-base">
          {description}
        </p>

        <div className="mt-auto relative z-10">
          <Button asChild variant="outline" className="w-full sm:w-auto bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground group/btn rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer">
            <div onClick={() => setIsModalOpen(true)}>
              <span className="flex items-center">
                Saber más
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
              </span>
            </div>
          </Button>
        </div>

      </div>

      <ServiceModal
        title={title}
        description={detailedDescription || description}
        icon={<Icon className="w-12 h-12 text-brand" />}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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

          <RevealText as="h2" className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10 max-w-4xl">
            Nuestros <br className="hidden md:block" /> <span className="text-brand">Servicios</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-foreground/80 mt-8 md:mt-12 max-w-2xl text-base md:text-lg leading-relaxed relative z-10 md:pl-16 border-l-[2px] border-brand/30 ml-2">
              No vendemos tecnología por moda. Ayudamos a restaurantes, hoteles, clínicas y pymes a dejar de operar a ciegas — con web, diseño, e-commerce y software a la medida de su operación. Lo técnico es el medio; lo que importa es que tu negocio funcione mejor.
            </p>
          </RevealText>
        </div>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10" stagger={0.1}>
          <ServiceCard
            icon={Layout}
            title="Desarrollo Web"
            description="Sitios y plataformas que cargan rápido, se ven impecables en celular y traen clientes reales. Tu equipo puede actualizarlos sin pedirle ayuda a nadie."
            detailedDescription="Construimos landing pages, sitios corporativos y plataformas SaaS con Next.js y React. Listos para que Google los encuentre, rápidos en cualquier conexión, y pensados para conseguir agendamientos, ventas o consultas según tu negocio."
          />
          <ServiceCard
            icon={Palette}
            title="Diseño UI/UX"
            description="Interfaces claras donde tu cliente sabe en tres segundos qué tiene que hacer. Diseño que vende sin perder la identidad de tu marca."
            detailedDescription="Diseñamos en Figma con foco en conversión: jerarquía visual clara, flujos cortos, animaciones que guían en lugar de distraer. Investigamos cómo se mueve tu cliente real antes de dibujar un solo botón."          />
          <ServiceCard
            icon={Monitor}
            title="E-Commerce"
            description="Tiendas online listas para vender desde el día uno. Pasarelas en soles, factura electrónica, control de stock e integración con tu courier."
            detailedDescription="Tiendas con Izipay, Culqi, MercadoPago y Stripe integradas. Catálogo administrable, carrito que no se cae, integración con tu sistema contable y métricas de venta en tiempo real."
          />
          <ServiceCard
            icon={Boxes}
            title="Software a Medida"
            description="Sistemas, ERPs y dashboards hechos para tu operación: agendamiento de citas, gestión hotelera, restaurantes, talleres, clínicas. Lo que un Excel ya no resuelve."
            detailedDescription="Diseñamos software a medida cuando los sistemas genéricos no encajan: PMS hoteleros, ERPs para restaurantes, sistemas de gestión clínica, paneles administrativos y dashboards. Pensados desde la operación real de tu equipo, con módulos que crecen contigo."          />
        </StaggerReveal>

        <div className="mt-20 md:mt-32 text-center md:text-right relative z-10">
          <RevealText delay={0.4}>
             <Button asChild size="lg" className="group rounded-xl relative overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground hover:bg-black/10 dark:hover:bg-white/10 font-bold uppercase tracking-[0.2em] text-xs px-8 py-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors">
                <Link href="#contact" className="flex items-center">
                  <span className="relative z-10 flex items-center">
                    Conversemos sobre tu proyecto
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
