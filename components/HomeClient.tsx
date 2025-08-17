"use client"

import dynamic from "next/dynamic"
import { HeroSection } from "./sections/HeroSection"
import { AboutSection } from "./sections/AboutSection"
import { ServicesSection } from "./sections/ServicesSection"
import TechnologiesSection from "./sections/TechnologiesSection"
import { BusinessImpactBanner } from "./business-impact-banner"

// 🔹 Dynamic imports para mejorar rendimiento y evitar enviar JS innecesario al cliente
const ProjectsSection = dynamic(() => import("./sections/ProjectsSection"), { ssr: false })
const TestimonialsSection = dynamic(() => import("./sections/TestimonialsSection"), { ssr: false })
const ContactSection = dynamic(() => import("./sections/ContactSection"), { ssr: false })
const CursorFollower = dynamic(() => import("./cursor-follower"), { ssr: false })
const ScrollToTop = dynamic(() => import("./scroll-to-top"), { ssr: false })
const WhatsAppButton = dynamic(() => import("./wspbutton"), { ssr: false })
const ChatbotButton = dynamic(() => import("./ChatbotButton"), { ssr: false })


export default function HomeClient() {
  const testimonialsData = [
    {
      name: "Guillermo Sánchez",
      position: "Gerente comercial, Clínica Juan Pablo II",
      text: "Una agencia desarrolladora excepcional que entrega constantemente un trabajo de alta calidad. Su atención al detalle y su capacidad creativa para resolver problemas hicieron que nuestro proyecto fuera un éxito.",
    },
    {
      name: "Dharcy Villafuerte",
      position: "Fundadora y Gerente, Solutec DHA",
      text: "Trabajar con ellos es muy tranquilo. Para cada necesidad nueva, entienden nuestra visión de inmediato y la transforman en una plataforma web bonita y funcional que superó nuestras expectativas.",
    },
    {
      name: "Luis Rodriguez",
      position: "Gerente comercial, EcoDrive+",
      text: "La comunicación y gestión de proyectos hicieron que todo el proceso fuera fluido y sin estrés. Los recomiendo encarecidamente.",
    },
  ]

  return (
    <main>
      <CursorFollower />
      <ScrollToTop />
      <ChatbotButton />
      <WhatsAppButton />
      <HeroSection />
      <BusinessImpactBanner />
      <AboutSection />
      <ServicesSection />
      <TechnologiesSection />
      <ProjectsSection />
      <TestimonialsSection testimonials={testimonialsData} />
      <ContactSection />
    </main>
  )
}
