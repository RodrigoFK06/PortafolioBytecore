"use client"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
import { projects } from "@/data/projects"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { useState, useEffect } from "react"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  // Filtrar los proyectos según la categoría seleccionada
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true
    return project.category === activeFilter
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const displayedProjects = isMobile ? filteredProjects.slice(0, 10) : filteredProjects

  return (
    <main className="pt-28 md:pt-36 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mx-auto text-center mb-14">
          <p className="spec-label mb-5 flex items-center justify-center gap-3">
            Índice de proyectos
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">
            Proyectos <span className="text-brand">Destacados</span>
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Una selección de trabajo reciente: páginas web, sistemas y apps en producción.
          </p>

          <ProjectFilter onFilterChange={setActiveFilter} />
        </header>

        <StaggerGroup
          key={activeFilter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.05}
        >
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageSrc={project.imageSrc}
              link={project.link}
            />
          ))}
        </StaggerGroup>
      </div>
    </main>
  )
}
