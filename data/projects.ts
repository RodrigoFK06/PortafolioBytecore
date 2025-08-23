export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  imageSrc: string
  link: string
  githubLink?: string
  category: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: "EcoDrive+",
    description:
      "Plataforma que transforma cada viaje en una oportunidad, ofreciendo recompensas, regalos y beneficios exclusivos para conductores, con el objetivo de mejorar la calidad de vida de las familias peruanas.",
    tags: ["React", "Next.js", "MySQL", "PHP", "Tailwind CSS"],
    imageSrc: "/ecodriveplus.webp",
    link: "https://www.ecodriveplus.com/",
    //githubLink: "https://github.com/bytecore/ecodriveplus",
    category: "web",
  },
  {
    id: 2,
    title: "Vigo Tulich Servicios Generales",
    description:
      "Empresa especializada en estructuras metálicas, carpintería metálica, drywall y servicios para minería, destacando por su experiencia en el sector industrial y su enfoque en diseños modernos y funcionales.",
    tags: ["Astro", "Tailwind CSS"],
    imageSrc: "/vigotulich.webp",
    link: "https://www.vigotulich.site/",
    //githubLink: "https://github.com/bytecore/vigotulich",
    category: "web",
  },
  {
    id: 3,
    title: "Encrypted Escape Room",
    description:
      "Experiencia de escape room en línea que desafía a los jugadores a resolver enigmas y descifrar códigos en un tiempo limitado, ofreciendo diversas salas temáticas con niveles de dificultad variados.",
    tags: ["React", "Next.js", "MySQL", "CodeIgniter", "Tailwind CSS"],
    imageSrc: "/encrypted.webp",
    link: "https://kevin-escape-room.vercel.app/",
    //githubLink: "https://github.com/bytecore/kevin-escape-room",
    category: "web",
  },
  {
    id: 4,
    title: "Casaroma Hostels",
    description:
      "Alojamiento acogedor en Lima, Perú, fundado por una familia de viajeros, ofreciendo habitaciones cómodas y un ambiente que invita a compartir experiencias con otros viajeros.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    imageSrc: "/casaromahotel.webp",
    link: "https://casaromahostels.com/",
    //githubLink: "https://github.com/bytecore/casaroma-hostels",
    category: "web",
  },
  {
    id: 5,
    title: "ReLu Coffee",
    description:
      "Empresa que combina la pasión por el café con la tecnología, ofreciendo cafés gourmet y cafeteras automáticas de alto rendimiento para hogares, oficinas y negocios.",
    tags: ["Astro", "Tailwind CSS"],
    imageSrc: "/relucoffee.webp",
    link: "https://www.relucoffee.com/",
    //githubLink: "https://github.com/bytecore/relu-coffee",
    category: "web",
  },
  {
    id: 6,
    title: "Mantenimiento y Reparación JK",
    description:
      "Servicios especializados en mantenimiento y reparación de electrodomésticos, ofreciendo soluciones rápidas y eficientes para garantizar el funcionamiento óptimo de los equipos en el hogar.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    imageSrc: "/mantenimientojk.webp",
    link: "https://xn--mantenimientoyreparacinjk-cqc.com/",
    //githubLink: "https://github.com/bytecore/mantenimiento-jk",
    category: "web",
  },
  {
    id: 7,
    title: "Agencia. Landing Page",
    description:
      "Landing page para una agencia de diseño web, destacando sus servicios, proyectos y equipo. Incluye secciones de testimonios, portafolio y un formulario de contacto.",
    tags: ["React", "Next.js", "Tailwind CSS"],
    imageSrc: "/agencialandingpage.jpeg",
    link: "https://landing-page-place-holder.vercel.app/",
    //githubLink: "https://github.com/bytecore/sistema-hospitalario", // Enlace al repositorio en GitHub
    category: "web",
  },
  {
    id: 8,
    title: "Rapiditos | Aplicación móvil para delivery",
    description:
      "Aplicación móvil para la gestión de pedidos de delivery, permitiendo a los usuarios realizar pedidos de manera rápida y sencilla. Incluye funcionalidades como seguimiento de pedidos, gestión de menús y pagos en línea.",
    tags: ["Flutter", "Firebase", "Dart", "Spring Boot", "Docker"],
    imageSrc: "/rapiditosvz.png",
    link: "https://apps.apple.com/pe/app/rapiditos-vz/id6748567718",
    //githubLink: "https://github.com/bytecore/sistema-hospitalario", // Enlace al repositorio en GitHub
    category: "mobile",
  },
  {
    id: 9,
    title: "Tu sonrisa perfecta landing page",
    description:
      "Diseño de una landing page para una clínica dental, enfocada en resaltar los servicios ofrecidos y facilitar la captación de nuevos pacientes.",
    tags: ["Next.js", "Tailwind CSS", "React"],
    imageSrc: "/sonrisaperfectalanding.jpeg",
    link: "https://clinica-dental-landing-ten.vercel.app/",
    //githubLink: "https://github.com/bytecore/mantenimiento-jk",
    category: "ui",
  }
];

// Funciones de utilidad para filtrar proyectos
export const getFeaturedProjects = () => projects.filter(project => project.featured)

export const getProjectsByCategory = (category: string) => 
  category === "all" ? projects : projects.filter(project => project.category === category)

export const getProjectById = (id: number) => projects.find(project => project.id === id)

// Categorías disponibles
export const projectCategories = [
  { id: "all", label: "Todos" },
  { id: "web", label: "Desarrollo Web" },
  { id: "ui", label: "UX/UI Design" },
  { id: "mobile", label: "Móvil" },
] as const
