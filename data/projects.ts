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

/**
 * Orden curado: los primeros 9 proyectos son los que se muestran en la home.
 * Priorizamos sistemas B2B / software empresarial (PMS, ERP, SaaS) sobre
 * landings y proyectos de marca, porque son los que justifican que una empresa
 * nos confíe un sistema crítico. Las landings y proyectos más livianos viven
 * en /portfolio detrás de "Ver todos los proyectos".
 */
export const projects: Project[] = [
  {
    id: 1,
    title: "OrquestadorADM",
    description:
      "Sistema integral de gestión hotelera (PMS + RMS) para hoteles de lujo y resorts. Revenue Management avanzado con forecasting, análisis What-If, precios dinámicos automáticos y analítica diaria. Reemplaza varios sistemas independientes por una sola operación coordinada.",
    tags: ["React", "Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    imageSrc: "/LoginOrquestador.jpeg",
    link: "https://orquestador-adm.vercel.app",
    category: "web",
  },
  {
    id: 6,
    title: "ATELIER Clinic",
    description:
      "Plataforma SaaS para clínicas estéticas con portales separados para pacientes y doctores. Sistema de reservas multi-paso, dashboard médico en tiempo real y diseño inspirado en el lujo discreto. Resuelve el problema de coordinar agendas, historia clínica y comunicación con paciente desde un solo lugar.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    imageSrc: "/atelier.png",
    link: "https://atelier-seven-beta.vercel.app/",
    category: "web",
  },
  {
    id: 16,
    title: "Megalodon Pro",
    description:
      "Sistema integral de gestión para restaurantes: ventas, inventario, cocina y RRHH desde un panel centralizado. Pensado para cadenas y restaurantes que necesitan dejar de operar con hojas Excel y tener visibilidad en tiempo real de cada local.",
    tags: ["React", "Next.js", "Dashboard", "POS"],
    imageSrc: "/v0-app.png",
    link: "https://megalodon-blue.vercel.app/",
    category: "web",
  },
  {
    id: 19,
    title: "RestHUB",
    description:
      "ERP integral para restaurantes que unifica POS, cocina, caja y contabilidad en un solo sistema. Cada rol opera con su propia pantalla optimizada, sin módulos extra ni costuras, con una landing premium pensada para Latinoamérica.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "ERP"],
    imageSrc: "/resthub.png",
    link: "https://rest-hub-landing.vercel.app/",
    category: "web",
  },
  {
    id: 11,
    title: "VR PMS",
    description:
      "Property Management System para empresas que operan alquileres vacacionales. Control de reservas, huéspedes y rendimiento de propiedades desde un panel intuitivo. Diseñado para operadores que manejan múltiples unidades distribuidas y necesitan ver la ocupación en un solo dashboard.",
    tags: ["Next.js", "React", "Tailwind CSS", "Lucide React"],
    imageSrc: "/vr-pms.png",
    link: "https://overbookingsol.vercel.app/",
    category: "web",
  },
  {
    id: 8,
    title: "Rapiditos | App móvil de delivery",
    description:
      "Aplicación móvil para la gestión de pedidos de delivery, publicada en App Store y Google Play. Seguimiento de pedidos en tiempo real, gestión de menús, pagos en línea y comunicación con repartidor. Stack nativo con Flutter sobre backend Spring Boot.",
    tags: ["Flutter", "Firebase", "Dart", "Spring Boot", "Docker"],
    imageSrc: "/rapiditosvz.png",
    link: "https://apps.apple.com/pe/app/rapiditos-vz/id6748567718",
    category: "mobile",
  },
  {
    id: 12,
    title: "Solutec System",
    description:
      "Sistema integral de gestión de clientes con registro, filtrado y exportación de datos detallados. Reemplaza el seguimiento manual en Excel por un CRM ligero pero estructurado, pensado para PYMEs que recién empiezan a sistematizar su cartera.",
    tags: ["React", "Material UI", "Frontend", "ERP"],
    imageSrc: "/solutec.png",
    link: "https://front-dharcy.vercel.app/",
    category: "web",
  },
  {
    id: 20,
    title: "VetCare",
    description:
      "Clínica veterinaria integral con atención especializada, emergencias 24/7, servicios, adopción, tienda y blog. Sitio diseñado para captar agendamiento de citas con un tono cálido y profesional centrado en el bienestar de las mascotas.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    imageSrc: "/vetcare.png",
    link: "https://veterinaria-web-tan.vercel.app/",
    category: "web",
  },
  {
    id: 10,
    title: "EcoDrive+",
    description:
      "Plataforma que transforma cada viaje en una oportunidad, con recompensas, regalos y beneficios exclusivos para conductores. Pensada para mejorar la calidad de vida de las familias peruanas mediante un sistema de puntos canjeables.",
    tags: ["React", "Next.js", "MySQL", "PHP", "Tailwind CSS"],
    imageSrc: "/ecodriveplus.webp",
    link: "https://ecodrive-two.vercel.app/",
    category: "web",
  },
  // ↓ Proyectos secundarios — visibles en /portfolio pero no en la home
  {
    id: 17,
    title: "Copperline Garage",
    description:
      "Landing page premium para un taller automotriz de alto rendimiento en Buenos Aires. Diagnóstico computarizado OBD2 (200+ canales), performance & ECU remapping con dinamómetro propio, y proceso de atención transparente con presupuesto aprobado antes de intervenir el vehículo.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    imageSrc: "/copperline-garage.png",
    link: "https://automotriz-lyart.vercel.app/",
    category: "web",
  },
  {
    id: 3,
    title: "Encrypted Escape Room",
    description:
      "Experiencia de escape room en línea con enigmas y códigos a resolver en tiempo limitado, ofreciendo diversas salas temáticas con niveles de dificultad variados.",
    tags: ["React", "Next.js", "MySQL", "CodeIgniter", "Tailwind CSS"],
    imageSrc: "/encrypted.webp",
    link: "https://kevin-escape-room.vercel.app/",
    category: "web",
  },
  {
    id: 13,
    title: "Kinetic Black",
    description:
      "Landing page premium para una marca de suplementación de élite. Creatina monohidrato de grado farmacéutico con diseño oscuro de alto impacto, animaciones de onboarding, contadores animados y secciones de características, testimonios y CTA.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    imageSrc: "/kinetickblack.jpeg",
    link: "https://kinetic-black.vercel.app/",
    category: "web",
  },
  {
    id: 14,
    title: "Ñawi",
    description:
      "Productora audiovisual dedicada al cine documental que busca conservar la memoria y fortalecer la identidad cultural a través de relatos comunitarios.",
    tags: ["Next.js", "React", "Tailwind CSS", "Audiovisual"],
    imageSrc: "/nawi.png",
    link: "https://nawi-lac.vercel.app/",
    category: "web",
  },
  {
    id: 18,
    title: "Dr. Ing. Freedy Sotelo Valer",
    description:
      "Sitio personal editorial de alto contraste. Incluye galería, sección de propuestas y proyectos, preguntas frecuentes y módulo de descarga de materiales, con foco en tipografía y jerarquía visual sobre fondos oscuros.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    imageSrc: "/freedy-sotelo.png",
    link: "https://freedy-sotelo.vercel.app/",
    category: "web",
  },
  {
    id: 15,
    title: "II Simposio Veterinario Internacional 2026",
    description:
      "Sistema de registro y landing page para el Segundo Simposio Veterinario Internacional 2026, facilitando la inscripción y el acceso a la agenda para profesionales veterinarios en Trujillo.",
    tags: ["Next.js", "Tailwind CSS", "React", "v0"],
    imageSrc: "/simposio.png",
    link: "https://v0-veterinary-symposium-registratio.vercel.app/",
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
    category: "web",
  },
  {
    id: 9,
    title: "Tu sonrisa perfecta landing page",
    description:
      "Diseño de una landing page para una clínica dental, enfocada en resaltar los servicios ofrecidos y facilitar la captación de nuevos pacientes.",
    tags: ["Next.js", "Tailwind CSS", "React"],
    imageSrc: "/sonrisaperfectalanding.jpeg",
    link: "https://clinica-dental-landing-ten.vercel.app/",
    category: "ui",
  },
  {
    id: 7,
    title: "Agencia. Landing Page",
    description:
      "Landing page para una agencia de diseño web, destacando sus servicios, proyectos y equipo. Incluye secciones de testimonios, portafolio y un formulario de contacto.",
    tags: ["React", "Next.js", "Tailwind CSS"],
    imageSrc: "/agencialandingpage.jpeg",
    link: "https://landing-page-place-holder.vercel.app/",
    category: "web",
  },
  {
    id: 2,
    title: "Solutec DHA",
    description:
      "Landing page premium para Solutec DHA (servicio técnico a domicilio liderado por Dharcy Villafuerte), especializada en reparación de electrodomésticos en Lima (refrigeradoras, lavadoras, cocinas, termas). Tono cálido y conversacional con conversaciones reales de WhatsApp, galería de trabajos, formulario de diagnóstico sin compromiso y CTAs directos a contacto.",
    tags: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
    imageSrc: "/solutecdha.png",
    link: "https://www.solutecdha.com",
    category: "web",
  },
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
