"use client"

import Link from "next/link"
import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, Layout, Monitor, Palette, Boxes } from "lucide-react"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"
import ServiceModal from "@/components/ServiceModal"

interface ServiceCardProps {
  icon: LucideIcon
  index: number
  title: string
  description: string
  detailedDescription?: string
}

function ServiceCard({ icon: Icon, index, title, description, detailedDescription }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="relative h-full flex flex-col">
      <div
        className={`relative p-8 rounded-lg bg-card shadow-hairline hover:shadow-hairline-md transition-shadow duration-300 h-full flex flex-col ${
          isModalOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="spec-label">SVC. {String(index).padStart(2, "0")}</span>
          <div className="w-12 h-12 rounded-md bg-secondary flex items-center justify-center">
            <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold mb-3 text-foreground">{title}</h3>

        <p className="text-muted-foreground mb-8 flex-grow leading-relaxed text-sm md:text-base">
          {description}
        </p>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="group/btn mt-auto inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand transition-colors self-start"
        >
          Saber más
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
        </button>
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
    <section id="services" className="py-20 md:py-32 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <header className="mb-14 md:mb-20">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 03 — Servicios
          </p>
          <KineticText
            as="h2"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground max-w-4xl"
          >
            Nuestros <span className="text-brand">Servicios</span>
          </KineticText>
          <Reveal effect="fade" delay={0.15}>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
              No vendemos tecnología por moda. Ayudamos a restaurantes, hoteles, clínicas y pymes a
              dejar de operar a ciegas — con web, diseño, e-commerce y software a la medida de su
              operación. Lo técnico es el medio; lo que importa es que tu negocio funcione mejor.
            </p>
          </Reveal>
        </header>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
          <ServiceCard
            icon={Layout}
            index={1}
            title="Desarrollo Web"
            description="Sitios y plataformas que cargan rápido, se ven impecables en celular y traen clientes reales. Tu equipo puede actualizarlos sin pedirle ayuda a nadie."
            detailedDescription="Construimos landing pages, sitios corporativos y plataformas SaaS con Next.js y React. Listos para que Google los encuentre, rápidos en cualquier conexión, y pensados para conseguir agendamientos, ventas o consultas según tu negocio."
          />
          <ServiceCard
            icon={Palette}
            index={2}
            title="Diseño UI/UX"
            description="Interfaces claras donde tu cliente sabe en tres segundos qué tiene que hacer. Diseño que vende sin perder la identidad de tu marca."
            detailedDescription="Diseñamos en Figma con foco en conversión: jerarquía visual clara, flujos cortos, animaciones que guían en lugar de distraer. Investigamos cómo se mueve tu cliente real antes de dibujar un solo botón."
          />
          <ServiceCard
            icon={Monitor}
            index={3}
            title="E-Commerce"
            description="Tiendas online listas para vender desde el día uno. Pasarelas en soles, factura electrónica, control de stock e integración con tu courier."
            detailedDescription="Tiendas con Izipay, Culqi, MercadoPago y Stripe integradas. Catálogo administrable, carrito que no se cae, integración con tu sistema contable y métricas de venta en tiempo real."
          />
          <ServiceCard
            icon={Boxes}
            index={4}
            title="Software a Medida"
            description="Sistemas, ERPs y dashboards hechos para tu operación: agendamiento de citas, gestión hotelera, restaurantes, talleres, clínicas. Lo que un Excel ya no resuelve."
            detailedDescription="Diseñamos software a medida cuando los sistemas genéricos no encajan: PMS hoteleros, ERPs para restaurantes, sistemas de gestión clínica, paneles administrativos y dashboards. Pensados desde la operación real de tu equipo, con módulos que crecen contigo."
          />
        </StaggerGroup>

        <div className="mt-16 md:mt-24 text-center md:text-right">
          <Reveal effect="fade">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
            >
              Conversemos sobre tu proyecto
              <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
