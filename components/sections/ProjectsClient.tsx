"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            imageSrc={project.imageSrc}
            link={project.link}
            delay={0.1 * (index + 1)}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="group relative bg-gray-800/60 backdrop-blur-md p-4 rounded-xl border border-blue-500/20 shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
          >
            <Link href="/projects" className="text-white flex items-center">
              Ver todos los proyectos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  )
}
