"use client"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilter } from "@/components/project-filter"
import { projects } from "@/data/projects"
import { CursorFollower } from "@/components/cursor-follower"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react";

export default function ProjectsPage() {
   const [activeFilter, setActiveFilter] = useState("all");
  
    // Filtrar los proyectos según la categoría seleccionada
    const filteredProjects = projects.filter((project) => {
      if (activeFilter === "all") return true;
      return project.category === activeFilter;
    });
  
    const handleFilterChange = (filterId: string) => {
      setActiveFilter(filterId);
      
    };
    const [isMobile, setIsMobile] = useState(false);
  
    // Efecto para detectar pantalla móvil
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      // Verificar al cargar
      checkMobile();
  
      // Configurar listener para redimensionamiento
      window.addEventListener("resize", checkMobile);
  
      // Limpiar
      return () => window.removeEventListener("resize", checkMobile);
    }, []);
  
    // Determinar cuántos proyectos mostrar
    const displayedProjects = isMobile
      ? filteredProjects.slice(0, 10)
      : filteredProjects;
  return (
    <main className="pt-24 pb-16">
      <CursorFollower />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Proyectos <span className="text-primary">Destacados</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Una selección de mi trabajo reciente que muestra mis habilidades
                en diseño, desarrollo y animación.
              </p>
            </motion.div>

            <ProjectFilter onFilterChange={handleFilterChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
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

          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
          </div>
        </div>
    </main>
  )
}

