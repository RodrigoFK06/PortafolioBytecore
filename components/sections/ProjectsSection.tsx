import { motion } from "framer-motion"
import ProjectsClient from "./ProjectsClient"
import { projects } from "@/data/projects"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-muted/30">
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
              Una selección de mi trabajo reciente que muestra mis habilidades en diseño, desarrollo y animación.
            </p>
          </motion.div>
        </div>

        <ProjectsClient projects={projects} />
      </div>
    </section>
  )
}
