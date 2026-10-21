"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, Layout, Monitor, Palette, Boxes } from "lucide-react"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"

interface ServiceCardProps {
  icon: LucideIcon
  index: number
  title: string
  description: string
  /** Subpágina real del servicio. El home era la única entrada a /services. */
  href: string
}

function ServiceCard({ icon: Icon, index, title, description, href }: ServiceCardProps) {
  return (
    <div className="relative h-full flex flex-col">
      <div className="relative p-8 rounded-lg bg-card shadow-hairline hover:shadow-hairline-md transition-shadow duration-300 h-full flex flex-col">
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

        {/* Un solo enlace por tarjeta: antes convivían "Saber más" (un modal con
            un resumen) y "Ver el servicio completo"; la subpágina ya tiene el
            detalle, así que queda solo el enlace real, con el nombre del
            servicio en el texto. */}
        <Link
          href={href}
          className="group/btn mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold text-foreground hover:text-brand transition-colors"
        >
          Ver el servicio completo<span className="sr-only"> de {title}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
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
            href="/services/desarrollo-web"
            title="Desarrollo Web"
            description="Sitios y plataformas que cargan rápido, se ven impecables en celular y traen clientes reales. Tu equipo puede actualizarlos sin pedirle ayuda a nadie."
          />
          <ServiceCard
            icon={Palette}
            index={2}
            href="/services/diseno-ux-ui"
            title="Diseño UI/UX"
            description="Interfaces claras donde tu cliente sabe en tres segundos qué tiene que hacer. Diseño que vende sin perder la identidad de tu marca."
          />
          <ServiceCard
            icon={Monitor}
            index={3}
            href="/services/ecommerce"
            title="E-Commerce"
            description="Tiendas online listas para vender desde el día uno. Pasarelas en soles, factura electrónica, control de stock e integración con tu courier."
          />
          <ServiceCard
            icon={Boxes}
            index={4}
            href="/services/software-a-medida"
            title="Software a Medida"
            description="Sistemas, ERPs y dashboards hechos para tu operación: agendamiento de citas, gestión hotelera, restaurantes, talleres, clínicas. Lo que un Excel ya no resuelve."
          />
        </StaggerGroup>

        {/* Enlazado interno: el home era la única página que Google rastreaba,
            así que es la mejor rampa hacia el hub y hacia la página de Lima. */}
        <div className="mt-14 max-w-2xl">
          <Reveal effect="fade">
            <p className="text-muted-foreground leading-relaxed">
              Cada servicio tiene su página con el detalle, el precio «desde» y los proyectos donde
              ya lo hicimos:{" "}
              <Link href="/services" className="text-brand font-medium hover:underline">
                ver todos los servicios
              </Link>
              . Si tu empresa está en la capital, empieza por{" "}
              <Link href="/desarrollo-de-software-lima" className="text-brand font-medium hover:underline">
                desarrollo de software a medida en Lima
              </Link>
              : ahí están los casos limeños, los rangos de precio en soles y el detalle de
              cumplimiento SUNAT.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-16 text-center md:text-right">
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
