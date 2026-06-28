"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
import { projects } from "@/data/projects"

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Nuestro <span className="text-brand">Portafolio</span>
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Una selección de proyectos reales de Árkos: software a medida, aplicaciones web, e-commerce y diseño UX/UI para PYMEs de Perú y Latinoamérica.
          </p>

          <ProjectFilter onFilterChange={setActiveFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageSrc={project.imageSrc}
                link={project.link}
                githubLink={project.githubLink}
                delay={0.1 * (index + 1)}
              />
            ))}
        </div>
      </div>
    </main>
  )
}

