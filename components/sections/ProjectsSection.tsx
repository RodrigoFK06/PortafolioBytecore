import { KineticText } from "@/components/motion/kinetic-text"
import ProjectsClient from "./ProjectsClient"
import { getHomeProjects } from "@/data/projects"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-14 md:mb-20">
        <header className="max-w-4xl">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 06 — Casos
          </p>
          <KineticText
            as="h2"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Proyectos <span className="text-brand">Destacados</span>
          </KineticText>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            Una selección curada de trabajos recientes. Diseño que empuja límites, desarrollo
            ultra-rápido y experiencias que conectan directamente con el usuario final.
          </p>
        </header>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <ProjectsClient projects={getHomeProjects()} />
      </div>
    </section>
  )
}
