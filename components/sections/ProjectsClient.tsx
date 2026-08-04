"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
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
  link: string
  category: string
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const filteredProjects = projects.filter((project) =>
    activeFilter === "all" ? true : project.category === activeFilter
  )

  const displayedProjects = isMobile ? filteredProjects.slice(0, 3) : filteredProjects

  return (
    <>
      <ProjectFilter onFilterChange={setActiveFilter} />

      <StaggerGroup
        key={activeFilter}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        stagger={0.06}
        from="start"
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

      <div className="mt-14 text-center">
        <Reveal effect="fade">
          <Link
            // /projects redirige 301 a /portfolio: enlazar a la URL redirigida
            // gastaba un salto de rastreo en cada visita de Googlebot desde el
            // home, que es la única página que Google rastreaba.
            href="/portfolio"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
          >
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </>
  )
}
