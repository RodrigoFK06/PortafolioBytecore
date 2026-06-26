import { RevealText } from "@/components/gsap-reveal"
import ProjectsClient from "./ProjectsClient"
import { projects } from "@/data/projects"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 mb-16 md:mb-24">
        <div className="max-w-4xl relative text-left">
          
          {/* Anotación Marginal */}
          <div className="absolute -top-10 left-0 md:-left-4 font-mono text-[10px] text-brand/80 italic px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 z-20 transform -rotate-1">
             // Casos de Estudio_
          </div>

          <RevealText as="h2" className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10 mb-8 md:mb-12">
            Proyectos <br className="hidden md:block" /> <span className="text-brand">Destacados</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-foreground/70 mt-8 max-w-2xl text-base md:text-lg leading-relaxed relative z-10 md:pl-16 border-l-[2px] border-brand/30 ml-2">
              Una selección curada de trabajos recientes. Diseño que empuja límites, desarrollo ultra-rápido y experiencias que conectan directamente con el usuario final.
            </p>
          </RevealText>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        <ProjectsClient projects={projects.slice(0, 8)} />
      </div>
    </section>
  )
}
