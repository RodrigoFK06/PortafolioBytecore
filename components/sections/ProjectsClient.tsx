"use client"

import { ProjectCard } from "@/components/project-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { Reveal } from "@/components/motion/reveal"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  imageSrc: string
  /** Opcional: hay productos propios sin deploy público. */
  link?: string
  category: string
}

/**
 * Tarjetas que sobran para cerrar la última fila de la grilla se ocultan en esa
 * grilla (2 columnas en tablet, 3 en escritorio). Siguen en el carrusel móvil y
 * en /portfolio. Así la sección funciona con cualquier lista de destacados sin
 * dejar una tarjeta huérfana.
 */
function gridTrimClass(i: number, n: number) {
  const cls: string[] = []
  if (n > 2 && i >= n - (n % 2)) cls.push("md:max-lg:hidden")
  if (n > 3 && i >= n - (n % 3)) cls.push("lg:hidden")
  return cls.join(" ")
}

// Los filtros por categoría viven solo en /portfolio: con 9 destacados, cada
// filtro de la home quedaba con dos o tres tarjetas. Antes, además, en móvil se
// recortaba la lista a 3 con JS después de hidratar; ahora todo es CSS (no hay
// salto de altura que obligue a recalcular ScrollTrigger).
export default function ProjectsClient({ projects }: { projects: Project[] }) {
  return (
    <>
      {/* Móvil: carrusel horizontal con la siguiente tarjeta asomando.
          Desde md: grilla de 2 y de 3 columnas. */}
      <div
        role="region"
        aria-label="Proyectos destacados"
        tabIndex={0}
        className="-mx-4 sm:-mx-6 md:mx-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <StaggerGroup
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 sm:px-6 md:px-0 pb-2 md:pb-0"
          stagger={0.06}
          from="start"
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`w-[82%] sm:w-[60%] md:w-auto shrink-0 snap-start ${gridTrimClass(i, projects.length)}`}
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageSrc={project.imageSrc}
                link={project.link}
              />
            </div>
          ))}
        </StaggerGroup>
      </div>
      <p className="md:hidden mt-3 text-xs text-muted-foreground font-mono tracking-wide">
        Desliza para ver los {projects.length} proyectos →
      </p>

      <div className="mt-12 md:mt-14 text-center">
        <Reveal effect="fade">
          <Link
            // /projects redirige 301 a /portfolio: enlazar a la URL redirigida
            // gastaba un salto de rastreo en cada visita de Googlebot desde el
            // home, que es la única página que Google rastreaba.
            href="/portfolio"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </>
  )
}
