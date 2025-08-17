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
    title: "EcoDrive+ - ROI 450%",
    description:
      "De startup a líder del mercado: Transformamos su idea en una plataforma que generó +320% más usuarios y S/ 2.5M en valor de mercado. Ahora es referente en su industria.",
    tags: ["React", "Next.js", "MySQL", "PHP", "Tailwind CSS"],
    imageSrc: "/ecodriveplus.webp",
    link: "https://www.ecodriveplus.com/",
    category: "web",
    featured: true
  },
  {
    id: 2,
    title: "Vigo Tulich - +200% Consultas",
    description:
      "Empresa tradicional convertida en líder digital: Su nueva presencia web generó 200% más consultas mensuales y les permitió competir con las grandes constructoras de Lima.",
    tags: ["Astro", "Tailwind CSS"],
    imageSrc: "/vigotulich.webp",
    link: "https://www.vigotulich.site/",
    category: "web",
    featured: true
  },
  {
    id: 3,
    title: "Encrypted Games - Ingresos 24/7",
    description:
      "De idea a negocio rentable: Creamos una experiencia que genera ingresos pasivos las 24 horas. Break-even en 2 meses, ahora es un modelo de negocio escalable.",
    tags: ["React", "Next.js", "MySQL", "CodeIgniter", "Tailwind CSS"],
    imageSrc: "/encrypted.webp",
    link: "https://kevin-escape-room.vercel.app/",
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
    title: "Sistema de Gestión Hospitalaria",
    description:
      "Plataforma integral para la gestión hospitalaria, permitiendo la administración eficiente de pacientes, empleados, traslados y otros recursos del hospital. Facilita la gestión de registros médicos, programación de citas, seguimiento de pacientes, y la gestión de inventarios de productos farmacéuticos, todo dentro de una interfaz moderna y fácil de usar.",
    tags: ["React", "Next.js", "MySQL", "Spring Boot", "Docker"],
    imageSrc: "/dashboardhms.jpeg",
    link: "https://portafolio-bytecore.vercel.app/projects", 
    //githubLink: "https://github.com/bytecore/sistema-hospitalario", // Enlace al repositorio en GitHub
    category: "web",
  },
  {
    id: 8,
    title: "Aplicación móvil para gestión de producción y venta de bebidas",
    description:
      "Plataforma integral para la gestión hospitalaria, permitiendo la administración eficiente de pacientes, empleados, traslados y otros recursos del hospital. Facilita la gestión de registros médicos, programación de citas, seguimiento de pacientes, y la gestión de inventarios de productos farmacéuticos, todo dentro de una interfaz moderna y fácil de usar.",
    tags: ["Flutter", "Firebase", "Dart", "Spring Boot", "Docker"],
    imageSrc: "/unumiskii.jpg",
    link: "https://portafolio-bytecore.vercel.app/projects",
    //githubLink: "https://github.com/bytecore/sistema-hospitalario", // Enlace al repositorio en GitHub
    category: "mobile",
  },
  {
    id: 9,
    title: "Maquetado y diseño de módulo de administración",
    description:
      "Diseño creado con el fin de mantener el estilo de la marca y la funcionalidad de la plataforma, con una interfaz moderna y fácil de usar.",
    tags: ["Figma", "Adobe XD", "Adobe Illustrator"],
    imageSrc: "/uxui.png",
    link: "https://portafolio-bytecore.vercel.app/projects",
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
