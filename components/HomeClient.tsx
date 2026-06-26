"use client"

import dynamic from "next/dynamic"
import { HeroSection } from "./sections/HeroSection"
import { AboutSection } from "./sections/AboutSection"
import { ServicesSection } from "./sections/ServicesSection"
import TechnologiesSection from "./sections/TechnologiesSection"
import ProjectsSection from "./sections/ProjectsSection"
import FounderSection from "./sections/FounderSection"
import ProcessSection from "./sections/ProcessSection"
import ContactSection from "./sections/ContactSection"
import TestimonialsSection, { type Testimonial } from "./sections/TestimonialsSection"

// 🔹 Estas secciones se renderizan en el servidor (SSR) para que su contenido
//    —proyectos, testimonios, proceso y datos de contacto— exista en el HTML
//    inicial y sea indexable por buscadores y citable por motores de IA (AEO).
//    Solo el dock flotante (UI puramente de cliente) se carga de forma diferida.
const FloatingDock = dynamic(() => import("./floating-dock"), { ssr: false })


export default function HomeClient() {
  const testimonialsData: Testimonial[] = [
    {
      name: "Guillermo Sánchez",
      position: "Gerente Comercial",
      company: "Clínica Juan Pablo II",
      link: "https://clinicajuanpabloii.com.pe",
      logo: "/testimonials/guillermo-clinica-juan-pablo-ii.png",
      logoBg: "white",
      project: "Plataforma de gestión hospitalaria y agendamiento de citas",
      text: "Operamos emergencias 24 horas en Pucallpa y coordinamos con varias aseguradoras a la vez; antes cada cita era una llamada, un cuaderno y una hoja Excel distinta. Árkos entendió esa complejidad sin que tuviéramos que traducirla, y construyó una plataforma que el equipo médico y administrativo siente propia. Hoy agendamos con calma, sin perder pacientes en el camino.",
      // TODO: validar con cliente
      metric: "78% de citas gestionadas digitalmente",
    },
    {
      name: "Dharcy Villafuerte",
      position: "Fundadora y Gerente",
      company: "Solutec DHA",
      link: "https://solutecdha.com",
      logo: "/testimonials/dharcy-solutec-dha.webp",
      logoBg: "white",
      project: "Sitio web corporativo y vitrina de servicios técnicos",
      text: "Atiendo a más de 2,500 clientes en Lima desde WhatsApp y mi marca siempre fue cercana, casi de tú a tú. Mi miedo era que una web me hiciera ver fría o corporativa de más. El equipo logró lo contrario: ahora luzco profesional al primer clic, pero quien me escribe sigue encontrándose con la misma Dharcy de siempre.",
      // TODO: validar con cliente
      metric: "+40% de consultas mensuales por canal digital",
    },
    {
      name: "Dr. Ing. Freedy Sotelo Valer",
      position: "Ex Decano de Facultad — UNTELS",
      company: "freedysotelov.com",
      link: "https://freedysotelov.com",
      logo: "/testimonials/freedy-untels.png",
      logoBg: "dark",
      project: "Sitio personal académico y portafolio profesional",
      text: "Mi trayectoria académica e ingenieril requería una presencia digital tan sobria como el contenido que respalda. Árkos tradujo años de docencia, investigación y gestión universitaria en una arquitectura web clara, ordenada y rigurosa. El resultado no es una página: es una credencial.",
      // TODO: validar con cliente
      metric: "Carga del sitio en menos de 1.2s",
    },
  ]

  return (
    <main>
      <FloatingDock />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TechnologiesSection />
      <ProjectsSection />
      <FounderSection />
      <TestimonialsSection testimonials={testimonialsData} />
      <ProcessSection />
      <ContactSection />
    </main>
  )
}
