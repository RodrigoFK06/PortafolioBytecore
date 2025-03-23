"use client"

import { HeroSection } from "./sections/HeroSection"
import { AboutSection } from "./sections/AboutSection"
import { ServicesSection } from "./sections/ServicesSection"
import  TechnologiesSection  from "./sections/TechnologiesSection"
import ProjectsSection from "./sections/ProjectsSection"
import  {TestimonialsSection}  from "./sections/TestimonialsSection"
import  {ContactSection}  from "./sections/ContactSection"
import { ScrollToTop } from "./scroll-to-top"
import { WhatsAppButton } from "./wspbutton"
import { CursorFollower } from "./cursor-follower"


export default function HomeClient() {
    const testimonialsData = [
        {
          name: "Guillermo Sánchez",
          position: "Gerente comercial, Clínica Juan Pablo II",
          text: "Una agencia desarrolladora excepcional que entrega constantemente un trabajo de alta calidad. Su atención al detalle y su capacidad creativa para resolver problemas hicieron que nuestro proyecto fuera un éxito.",
        },
        {
          name: "Dharcy Villafuerte",
          position: "Trabajar con este ellos es un muy tranquilo. Para cada necesidad nueva, entienden nuestra visión de inmediato y la transforman en una plataforma web bonito y funcional que superó nuestras expectativas.",
          text: "Trabajar con ellos es muy tranquilo...",
        },
        {
          name: "Luis Rodriguez",
          position: "Gerente comercial, EcoDrive+",
          text: "La comunicación y gestión de proyectos hicieron que todo el proceso fuera fluido y sin estrés.Los recomiendo encarecidamente.",
        },
      ];
      
  return (
    <main>
      <CursorFollower />
      <ScrollToTop />
      <WhatsAppButton />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TechnologiesSection />
      <ProjectsSection />
      <TestimonialsSection testimonials={testimonialsData} />
      <ContactSection />
    </main>
  )
}
