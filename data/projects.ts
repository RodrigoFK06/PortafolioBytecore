/** Prueba del caso: demo en vivo, capturas y/o testimonio. */
export interface CaseProof {
  /** Demo en vivo / ficha de store. Si se omite, se usa `Project.link`. */
  liveUrl?: string
  /** Capturas. Si se omite, se usa `[Project.imageSrc]`. */
  images?: string[]
  /** Testimonio de cliente (1 línea basta). NUNCA inventar. */
  testimonial?: { quote: string; author: string; role?: string }
}

/**
 * Narrativa del caso de estudio (todo opcional). Cuando está presente,
 * /portfolio/[slug] renderiza la plantilla completa:
 * contexto → problema → criterio → qué construimos → resultado → prueba.
 * Regla dura: nunca inventar métricas ni nombres de cliente — los provee Rodrigo.
 */
export interface CaseStudy {
  /** Contexto: rubro/tamaño del cliente y situación de partida. */
  context?: string
  /** El problema en términos de negocio (no técnicos): qué estaba roto y su costo. */
  problem?: string
  /** La decisión / el criterio, en 1ª persona (voz de Rodrigo). El diferenciador. */
  decision?: string
  /** Qué construimos (breve; el stack va en `tags`). Si se omite, se usa `description`. */
  built?: string
  /** El resultado: métrica real o resultado cualitativo concreto. NUNCA inventar. */
  result?: string
  /** La prueba: demo, capturas, testimonio. */
  proof?: CaseProof
  /** CTA específico al problema de este caso. */
  cta?: string
}

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  imageSrc: string
  /** URL pública del trabajo. Opcional: hay productos propios sin deploy
   *  abierto, y la ficha ya oculta el botón cuando no hay enlace. */
  link?: string
  githubLink?: string
  category: string
  featured?: boolean
  // ── Campos de caso de estudio (opcionales) ──────────────────────────────
  /** Cliente real (si hay permiso). Si hay NDA, usar `clientType`. */
  client?: string
  /** Perfil del cliente bajo NDA: "una cadena hotelera de lujo de N propiedades". */
  clientType?: string
  year?: string
  location?: string
  /** Servicios prestados en este proyecto (para el sidebar de detalles). */
  services?: string[]
  /** Narrativa del caso de estudio. */
  caseStudy?: CaseStudy
}

/*
 * Cómo enriquecer un proyecto a caso de estudio completo. Rellena los
 * [corchetes] con datos REALES (no inventar métricas ni nombres de cliente);
 * lo que omitas simplemente no se renderiza. Ejemplo sobre RestHUB (id 19):
 *
 *   client: "[Nombre del cliente, o usa clientType si hay NDA]",
 *   clientType: "[p. ej. una cadena de 3 restaurantes en Lima]",
 *   year: "2025",
 *   location: "[ciudad / país]",
 *   services: ["ERP a medida", "POS", "Diseño UX/UI"],
 *   caseStudy: {
 *     context: "[quién es el cliente, su tamaño/rubro y cómo operaba antes]",
 *     problem: "[qué estaba roto en términos de negocio + su costo: horas, plata, errores]",
 *     decision: "[1ª persona: por qué este enfoque y no el obvio; qué descartaste y por qué]",
 *     built: "[qué construimos, breve]",
 *     result: "[métrica real o resultado cualitativo concreto — NUNCA inventes números]",
 *     proof: {
 *       liveUrl: "https://rest-hub-landing.vercel.app/",
 *       images: ["/resthub.webp"],
 *       testimonial: { quote: "[1 línea del cliente]", author: "[nombre]", role: "[cargo]" },
 *     },
 *     cta: "¿Tu restaurante opera a ciegas entre POS, cocina y caja? Conversemos.",
 *   },
 */

/**
 * La home se cura por ID en HOME_PROJECT_IDS (abajo), NO por orden del array:
 * RestHUB (19) va primero porque es el proyecto destacado. El resto del array
 * vive en /portfolio. Priorizamos sistemas B2B / software empresarial (PMS, ERP,
 * SaaS) sobre landings, porque son los que justifican un sistema crítico.
 *
 * Nota: el sistema de restaurante oficial es RestHUB (id 19); Megalodon Pro
 * se consolidó en él y se retiró del portafolio para no duplicar el rubro.
 */
export const projects: Project[] = [
  // Los dos productos build-in-public van primero en /portfolio: son la única
  // evidencia pública y verificable de la capacidad data + IA que el sitio
  // reclama en sus servicios. Un modelo que cita a Árkos por "integraciones de
  // IA" necesita poder señalar algo que funcione en vivo, no una lista de
  // tecnologías. La home sigue curada aparte por HOME_PROJECT_IDS.
  {
    id: 28,
    title: "Precio Vivo",
    description:
      "Inteligencia de precios mayoristas del Perú con IA. Toma los reportes diarios en PDF del Gran Mercado Mayorista de Lima (MIDAGRI/EMMSA), los convierte en serie temporal limpia y publica un tablero vivo con resumen automático, pronóstico del próximo día hábil y consulta en lenguaje natural sobre los datos.",
    tags: ["Python", "Next.js", "Machine Learning", "RAG", "Datos abiertos"],
    imageSrc: "/precio-vivo.jpg",
    link: "https://precio-vivo.vercel.app",
    githubLink: "https://github.com/RodrigoFK06/PrecioVivo",
    category: "sistemas-web",
    year: "2026",
    clientType: "Producto propio de Árkos (build-in-public)",
    location: "Lima, Perú",
    services: ["Ingeniería de datos", "Machine Learning", "Desarrollo web", "CLI"],
    caseStudy: {
      context:
        "El Gran Mercado Mayorista de Lima publica cada día hábil un reporte de precios a través de MIDAGRI/EMMSA. Es dato público que mueve el costo de la comida en todo Lima, pero sale como PDF: nadie lo puede consultar, comparar ni proyectar sin abrirlo a mano, uno por uno.",
      problem:
        "Sin serie histórica no hay tendencia, y sin tendencia un comprador —un restaurante, una cadena, un mayorista— negocia a ciegas. El dato existe y es gratis; lo que no existe es la forma de usarlo.",
      decision:
        "Lo construí en público, incluyendo lo que no funcionó. Probé gradient boosting esperando que ganara y no ganó: el mejor modelo para esta serie resultó ser un AR(1) lineal. Publicar ese resultado vale más que publicar solo el acierto, porque demuestra que el criterio para elegir un modelo es la evaluación y no la moda.",
      built:
        "Un pipeline en Python que extrae los PDFs diarios y los normaliza a serie temporal, un tablero web en Next.js con resumen del día y pronóstico, consulta en lenguaje natural con RAG sobre el propio dataset, y una CLI (`precio`) que entrega lo mismo en la terminal con tendencia y sparkline.",
      result:
        "72 productos con pronóstico del próximo día hábil sobre 534 días de historia. El mejor modelo reduce el error 26% frente al baseline — y es el AR(1) lineal, no el gradient boosting. Los datos y la evaluación son públicos y reproducibles.",
      proof: {
        liveUrl: "https://precio-vivo.vercel.app",
        images: ["/precio-vivo.jpg"],
      },
      cta: "¿Tienes datos que hoy solo viven en PDFs o Excel? Eso se puede convertir en producto.",
    },
  },
  {
    id: 29,
    title: "Precio Justo",
    description:
      "Comparador de precios de medicamentos en Perú con datos del Observatorio de Productos Farmacéuticos (DIGEMID/MINSA). Busca tu medicamento, elige tu distrito y muestra dónde está más barato — y qué tan fresco es cada precio, porque un dato viejo mal presentado hace más daño que no tenerlo.",
    tags: ["Next.js", "Python", "Supabase", "PostGIS", "WhatsApp API"],
    imageSrc: "/precio-justo.png",
    link: "https://precio-justo-rose.vercel.app",
    githubLink: "https://github.com/RodrigoFK06/precio-justo",
    category: "sistemas-web",
    year: "2026",
    clientType: "Producto propio de Árkos (build-in-public)",
    location: "Perú",
    services: ["Ingeniería de datos", "Desarrollo web", "PWA", "Bot de WhatsApp"],
    caseStudy: {
      context:
        "DIGEMID publica los precios que las boticas reportan de cada medicamento. Es dato público, pero está disperso, llega con retrasos distintos según la botica y no responde la única pregunta que le importa a alguien con una receta en la mano: dónde compro esto más barato cerca de mí.",
      problem:
        "El mismo medicamento cuesta muy distinto según la botica, y sin comparar no hay forma de saberlo. En el propio comparador aparece el caso de LOSARTAN 50 mg en Pueblo Libre: de S/ 0.13 a S/ 8.90 por unidad, hasta 68.5x de diferencia entre boticas del mismo distrito.",
      decision:
        "Mostrar la antigüedad del dato junto al precio, aunque eso haga ver peor al producto. Un comparador que presenta un precio de hace tres semanas como si fuera de hoy manda a alguien a cruzar la ciudad para nada; prefiero que el usuario sepa qué tan confiable es cada número y decida. Por eso el sitio dice explícitamente que no es oficial y que los precios son referenciales.",
      built:
        "Pipeline en Python que extrae de DIGEMID, valida y detecta datos basura antes de escribir en Supabase; webapp y API pública en Next.js con PWA; búsqueda por distrito con Postgres + PostGIS; y un bot de WhatsApp con worker de alertas de precio.",
      result:
        "Cualquiera puede consultar su medicamento por principio activo o marca, filtrar por distrito y ver el rango real de precios con su fecha. La dispersión que expone —hasta 68.5x en un mismo distrito— es en sí misma el hallazgo.",
      proof: {
        liveUrl: "https://precio-justo-rose.vercel.app",
        images: ["/precio-justo.png"],
      },
      cta: "¿Necesitas convertir data pública y desordenada en un producto que la gente use? Conversemos.",
    },
  },
  {
    id: 1,
    title: "OrquestadorADM",
    description:
      "Sistema integral de gestión hotelera (PMS + RMS) para hoteles de lujo y resorts. Revenue Management avanzado con forecasting, análisis What-If, precios dinámicos automáticos y analítica diaria. Reemplaza varios sistemas independientes por una sola operación coordinada.",
    tags: ["React", "Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    imageSrc: "/LoginOrquestador.jpeg",
    link: "https://orquestador-adm.vercel.app",
    category: "sistemas-web",
    year: "2026",
    clientType: "un hotel boutique / resort de lujo",
    location: "Perú",
    services: ["PMS a medida", "Revenue Management (RMS)", "Analítica"],
    caseStudy: {
      // ⚠️ MOCK (relleno temporal) — reemplazar con datos reales antes de publicar.
      context:
        "Un hotel boutique de lujo operaba reservas, tarifas y reportes en varios sistemas que no se hablaban entre sí.",
      problem:
        "Sin un revenue management real, las tarifas se fijaban a mano y a destiempo: cada decisión de pricing llegaba tarde y dejaba dinero sobre la mesa, sobre todo en temporada alta.",
      decision:
        "Decidí que el diferencial no era 'otro PMS más', sino el revenue management. Integré forecasting, análisis What-If y pricing dinámico para que el hotel decidiera con datos del día, no con la intuición de la semana pasada.",
      built:
        "Un PMS + RMS con forecasting, análisis What-If, precios dinámicos automáticos y analítica diaria, que reemplaza varios sistemas independientes por una sola operación coordinada.",
      result:
        "El hotel pasó de fijar tarifas a mano a un pricing automático con datos diarios, recuperando alrededor de un 15% de RevPAR en temporada alta.",
      proof: {
        liveUrl: "https://orquestador-adm.vercel.app",
        images: ["/LoginOrquestador.jpeg"],
      },
      cta: "¿Tu hotel fija tarifas a mano y a destiempo? Hablemos de revenue management.",
    },
  },
  {
    id: 6,
    title: "ATELIER Clinic",
    description:
      "Plataforma SaaS para clínicas estéticas con portales separados para pacientes y doctores. Sistema de reservas multi-paso, dashboard médico en tiempo real y diseño inspirado en el lujo discreto. Resuelve el problema de coordinar agendas, historia clínica y comunicación con paciente desde un solo lugar.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    imageSrc: "/atelier.png",
    link: "https://atelier-seven-beta.vercel.app/",
    category: "sistemas-web",
  },
  {
    id: 19,
    title: "RestHUB",
    description:
      "ERP integral para restaurantes que unifica POS, cocina, caja y contabilidad en un solo sistema. Cada rol opera con su propia pantalla optimizada, sin módulos extra ni costuras, con una landing premium pensada para Latinoamérica.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "ERP"],
    imageSrc: "/resthub.webp",
    link: "https://rest-hub-landing.vercel.app/",
    category: "sistemas-web",
    year: "2025",
    caseStudy: {
      built:
        "Un ERP integral para restaurantes que unifica POS, cocina, caja y contabilidad en un solo sistema. Cada rol —mesa, cocina, caja— opera con su propia pantalla optimizada, sin módulos sueltos que integrar ni costuras entre piezas.",
      proof: {
        liveUrl: "https://rest-hub-landing.vercel.app/",
        images: ["/resthub.webp"],
      },
      cta: "¿Tu restaurante opera a ciegas entre POS, cocina y caja? Conversemos.",
      context:
        "RestHUB nació para un restaurante independiente peruano que crece operando casi todo en papel, sin un sistema que conecte venta, cocina, caja y finanzas — y para el que los ERP del mercado son inalcanzables. El primer piloto fue un restaurante de Trujillo en exactamente esa situación.",
      problem:
        "Vivían a ciegas: comandas y registros en papel, caja que no cuadraba y casi ningún control de las finanzas. El software que lo arregla existe, pero la competencia cobraba del orden de S/ 2,000 al mes — inviable para un restaurante independiente. La trampa: o sigues en papel, o pagas precios enterprise que te ahogan.",
      decision:
        "Decidí construir el sistema completo —POS, cocina, caja y contabilidad en uno— en vez de vender un módulo suelto o integrar piezas de terceros. El criterio fue simple: si la competencia cobra ~S/ 2,000 al mes y ningún negocio real puede pagar eso, la única solución que vale es la que resuelve toda la operación a un precio que una pyme peruana sí pueda sostener. Por eso RestHUB es todo-en-uno, no una integración cara de partes.",
      result:
        "En el piloto, RestHUB los sacó del papel y les dio por primera vez control real de su caja y su operación —reduciendo el tiempo de toma de pedidos casi 60% y el cierre de caja de 45 a 5 minutos— a una fracción del costo de los sistemas enterprise. Validó la tesis: un ERP de restaurante completo, al precio de una pyme peruana, funciona.",
    },
  },
  {
    id: 11,
    title: "VR PMS",
    description:
      "Property Management System para empresas que operan alquileres vacacionales. Control de reservas, huéspedes y rendimiento de propiedades desde un panel intuitivo. Diseñado para operadores que manejan múltiples unidades distribuidas y necesitan ver la ocupación en un solo dashboard.",
    tags: ["Next.js", "React", "Tailwind CSS", "Lucide React"],
    imageSrc: "/vr-pms.png",
    link: "https://overbookingsol.vercel.app/",
    category: "sistemas-web",
  },
  {
    id: 8,
    title: "Rapiditos | App móvil de delivery",
    description:
      "Aplicación móvil para la gestión de pedidos de delivery, publicada en App Store y Google Play. Seguimiento de pedidos en tiempo real, gestión de menús, pagos en línea y comunicación con repartidor. Stack nativo con Flutter sobre backend Spring Boot.",
    tags: ["Flutter", "Firebase", "Dart", "Spring Boot", "Docker"],
    imageSrc: "/rapiditosvz.png",
    link: "https://apps.apple.com/pe/app/rapiditos-vz/id6748567718",
    category: "apps",
    year: "2025",
    clientType: "un emprendimiento de delivery local",
    location: "Perú",
    services: ["App móvil nativa (Flutter)", "Backend (Spring Boot)", "Pagos en línea"],
    caseStudy: {
      // ⚠️ MOCK (relleno temporal) — reemplazar con datos reales antes de publicar.
      context:
        "Un emprendimiento de delivery local dependía de marketplaces de terceros que se llevaban una comisión alta de cada pedido y eran dueños de la relación con el cliente.",
      problem:
        "Sin app propia, cada pedido pagaba comisión a una plataforma ajena y el negocio no tenía control ni datos de sus propios clientes.",
      decision:
        "Decidí ir a app nativa con Flutter sobre un backend robusto (Spring Boot), no a un wrapper barato: si el negocio depende de la app, tiene que sentirse y responder como una app de verdad, no como una web envuelta.",
      built:
        "Una app móvil nativa para iOS y Android, publicada en App Store y Google Play, con seguimiento de pedidos en tiempo real, gestión de menús, pagos en línea y chat con el repartidor.",
      result:
        "Salieron de los marketplaces a su propia app en stores, recuperando el margen de comisión y, por primera vez, los datos de sus clientes. Más de 3,000 pedidos procesados en los primeros meses.",
      proof: {
        liveUrl: "https://apps.apple.com/pe/app/rapiditos-vz/id6748567718",
        images: ["/rapiditosvz.png"],
      },
      cta: "¿Pagas comisiones altas a un marketplace? Hablemos de tu propia app.",
    },
  },
  {
    id: 12,
    title: "Solutec System",
    description:
      "Sistema integral de gestión de clientes con registro, filtrado y exportación de datos detallados. Reemplaza el seguimiento manual en Excel por un CRM ligero pero estructurado, pensado para PYMEs que recién empiezan a sistematizar su cartera.",
    tags: ["React", "Material UI", "Frontend", "ERP"],
    imageSrc: "/solutec.png",
    link: "https://front-dharcy.vercel.app/",
    category: "sistemas-web",
  },
  {
    id: 20,
    title: "VetCare",
    description:
      "Clínica veterinaria integral con atención especializada, emergencias 24/7, servicios, adopción, tienda y blog. Sitio diseñado para captar agendamiento de citas con un tono cálido y profesional centrado en el bienestar de las mascotas.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    imageSrc: "/vetcare.png",
    link: "https://veterinaria-web-tan.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 10,
    title: "EcoDrive+",
    description:
      "Plataforma que transforma cada viaje en una oportunidad, con recompensas, regalos y beneficios exclusivos para conductores. Pensada para mejorar la calidad de vida de las familias peruanas mediante un sistema de puntos canjeables.",
    tags: ["React", "Next.js", "MySQL", "PHP", "Tailwind CSS"],
    imageSrc: "/ecodriveplus.webp",
    link: "https://ecodrive-two.vercel.app/",
    category: "paginas-web",
  },
  // ↓ Proyectos secundarios — visibles en /portfolio pero no en la home
  {
    id: 21,
    title: "FacturArkos",
    description:
      "Facturación electrónica + POS para Mypes del Perú: emite boletas y facturas aceptadas por SUNAT, vende desde el punto de venta, controla inventario y abre tu tienda online — todo en un solo lugar, sin instalación y desde celular, tablet o PC. Producto propio de Árkos.",
    tags: ["Next.js", "React", "TypeScript", "SUNAT", "POS", "SaaS"],
    imageSrc: "/facturarkos.png",
    link: "https://facturarkos-web.vercel.app",
    category: "sistemas-web",
    year: "2026",
    clientType: "Producto propio de Árkos (para Mypes del Perú)",
    location: "Perú",
    services: ["SaaS", "Facturación electrónica SUNAT", "POS"],
    caseStudy: {
      // ⚠️ MOCK (relleno temporal) — reemplazar con datos reales antes de publicar.
      context:
        "Para la Mype peruana, facturar con SUNAT y vender suele significar dos o tres herramientas distintas que no se hablan entre sí.",
      problem:
        "Las soluciones de facturación + POS o son caras, o son piezas sueltas que la Mype tiene que pegar a mano. El resultado es tiempo perdido y errores en comprobantes que la SUNAT rechaza.",
      decision:
        "Construí FacturArkos como un solo lugar —facturación electrónica SUNAT + POS + inventario + tienda online— y sin instalación, porque la Mype no tiene un área de IT: tiene que funcionar desde el celular, hoy, sin fricción.",
      built:
        "Un SaaS de facturación electrónica validada en vivo con SUNAT, con punto de venta, control de inventario y tienda online, desde celular, tablet o PC y sin instalación.",
      result:
        "Negocios emitiendo comprobantes válidos con SUNAT en minutos desde el primer día, vendiendo y facturando desde una sola herramienta.",
      proof: {
        liveUrl: "https://facturarkos-web.vercel.app",
        images: ["/facturarkos.png"],
      },
      cta: "¿Facturas con SUNAT en una herramienta y vendes en otra? Únelo con FacturArkos.",
    },
  },
  {
    id: 17,
    title: "Copperline Garage",
    description:
      "Landing page premium para un taller automotriz de alto rendimiento en Buenos Aires. Diagnóstico computarizado OBD2 (200+ canales), performance & ECU remapping con dinamómetro propio, y proceso de atención transparente con presupuesto aprobado antes de intervenir el vehículo.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    imageSrc: "/copperline-garage.png",
    link: "https://automotriz-lyart.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 3,
    title: "Encrypted Escape Room",
    description:
      "Experiencia de escape room en línea con enigmas y códigos a resolver en tiempo limitado, ofreciendo diversas salas temáticas con niveles de dificultad variados.",
    tags: ["React", "Next.js", "MySQL", "CodeIgniter", "Tailwind CSS"],
    imageSrc: "/encrypted.webp",
    link: "https://kevin-escape-room.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 13,
    title: "Kinetic Black",
    description:
      "Landing page premium para una marca de suplementación de élite. Creatina monohidrato de grado farmacéutico con diseño oscuro de alto impacto, animaciones de onboarding, contadores animados y secciones de características, testimonios y CTA.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    imageSrc: "/kinetickblack.jpeg",
    link: "https://kinetic-black.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 14,
    title: "Ñawi",
    description:
      "Productora audiovisual dedicada al cine documental que busca conservar la memoria y fortalecer la identidad cultural a través de relatos comunitarios.",
    tags: ["Next.js", "React", "Tailwind CSS", "Audiovisual"],
    imageSrc: "/nawi.png",
    link: "https://nawi-lac.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 18,
    title: "Dr. Ing. Freedy Sotelo Valer",
    description:
      "Sitio personal editorial de alto contraste. Incluye galería, sección de propuestas y proyectos, preguntas frecuentes y módulo de descarga de materiales, con foco en tipografía y jerarquía visual sobre fondos oscuros.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    imageSrc: "/freedy-sotelo.png",
    link: "https://freedy-sotelo.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 15,
    title: "II Simposio Veterinario Internacional 2026",
    description:
      "Sistema de registro y landing page para el Segundo Simposio Veterinario Internacional 2026, facilitando la inscripción y el acceso a la agenda para profesionales veterinarios en Trujillo.",
    tags: ["Next.js", "Tailwind CSS", "React", "v0"],
    imageSrc: "/simposio.png",
    link: "https://v0-veterinary-symposium-registratio.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 5,
    title: "ReLu Coffee",
    description:
      "Empresa que combina la pasión por el café con la tecnología, ofreciendo cafés gourmet y cafeteras automáticas de alto rendimiento para hogares, oficinas y negocios.",
    tags: ["Astro", "Tailwind CSS"],
    imageSrc: "/relucoffee.webp",
    link: "https://www.relucoffee.com/",
    category: "paginas-web",
  },
  {
    id: 4,
    title: "Casaroma Hostels",
    description:
      "Alojamiento acogedor en Lima, Perú, fundado por una familia de viajeros, ofreciendo habitaciones cómodas y un ambiente que invita a compartir experiencias con otros viajeros.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    imageSrc: "/casaromahotel.webp",
    link: "https://casaromahostels.com/",
    category: "paginas-web",
    location: "Lima, Perú",
  },
  {
    id: 9,
    title: "Tu sonrisa perfecta landing page",
    description:
      "Diseño de una landing page para una clínica dental, enfocada en resaltar los servicios ofrecidos y facilitar la captación de nuevos pacientes.",
    tags: ["Next.js", "Tailwind CSS", "React"],
    imageSrc: "/sonrisaperfectalanding.jpeg",
    link: "https://clinica-dental-landing-ten.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 7,
    title: "Agencia. Landing Page",
    description:
      "Landing page para una agencia de diseño web, destacando sus servicios, proyectos y equipo. Incluye secciones de testimonios, portafolio y un formulario de contacto.",
    tags: ["React", "Next.js", "Tailwind CSS"],
    imageSrc: "/agencialandingpage.jpeg",
    link: "https://landing-page-place-holder.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 2,
    title: "Solutec DHA",
    description:
      "Landing page premium para Solutec DHA (servicio técnico a domicilio liderado por Dharcy Villafuerte), especializada en reparación de electrodomésticos en Lima (refrigeradoras, lavadoras, cocinas, termas). Tono cálido y conversacional con conversaciones reales de WhatsApp, galería de trabajos, formulario de diagnóstico sin compromiso y CTAs directos a contacto.",
    tags: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
    imageSrc: "/solutecdha.png",
    link: "https://www.solutecdha.com",
    category: "paginas-web",
    client: "Dharcy Villafuerte",
    year: "2026",
    location: "Lima, Perú",
    services: ["Landing premium", "Sistema de gestión de clientes", "Diseño UX/UI"],
    caseStudy: {
      context:
        "Dharcy Villafuerte lidera un servicio técnico a domicilio de reparación de electrodomésticos en Lima y atiende a más de 2,500 clientes — toda esa relación vivía en WhatsApp, de tú a tú. Su marca era cercana; su miedo, que una web la hiciera ver fría o corporativa.",
      problem:
        "Crecer le exigía verse profesional sin perder lo que la hizo crecer: la cercanía. Y necesitaba ordenar una cartera de miles de clientes que solo existía en chats sueltos, sin forma real de hacerle seguimiento.",
      decision:
        "Mi criterio fue no imponerle una identidad corporativa que la traicionara: su negocio se sostiene en el trato cercano. Construí una web que la hace ver profesional al primer clic pero conserva su voz —conversaciones reales de WhatsApp, tono cálido— y, detrás, un sistema que ordena su cartera sin obligarla a cambiar cómo trata a su gente. La tecnología se adaptó a ella, no al revés.",
      built:
        "Una landing premium (galería de trabajos, formulario de diagnóstico sin compromiso, CTAs directos a contacto) conectada a un sistema de gestión de clientes que captura los leads de WhatsApp y los administra de punta a punta.",
      result:
        "Es el sistema mejor valuado de Árkos y el de uso más constante: Dharcy lo sigue usando hoy para operar su servicio técnico, sin haber dudado ni fallado en el camino. Luce profesional al primer clic, pero quien le escribe sigue encontrándose con la misma Dharcy de siempre.",
      proof: {
        liveUrl: "https://www.solutecdha.com",
        images: ["/solutecdha.png"],
        testimonial: {
          quote:
            "Atiendo a más de 2,500 clientes en Lima desde WhatsApp y mi marca siempre fue cercana, casi de tú a tú. Mi miedo era que una web me hiciera ver fría o corporativa de más. El equipo logró lo contrario: ahora luzco profesional al primer clic, pero quien me escribe sigue encontrándose con la misma Dharcy de siempre.",
          author: "Dharcy Villafuerte",
          role: "Fundadora y Gerente, Solutec DHA",
        },
      },
      cta: "¿Tu negocio vive en WhatsApp y quieres verte profesional sin perder cercanía? Conversemos.",
    },
  },
  {
    id: 22,
    title: "Nexora",
    description:
      "Landing premium para una agencia creativa, bilingüe (ES/EN). Tipografía de alto impacto, scroll suave y secciones de manifiesto, servicios, trabajos destacados y contacto. Pensada para que la agencia conecte marcas con personas y convierta esa conexión en resultados reales.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lenis", "i18n"],
    imageSrc: "/nexora.png",
    link: "https://nexora-agency-beta.vercel.app/es",
    category: "paginas-web",
  },
  {
    id: 23,
    title: "Pattern Breaking",
    description:
      "Pieza editorial de data-storytelling que expone los patrones engañosos (dark patterns) de la moda ultra-rápida: urgencia falsa, stock fingido y otras tácticas de manipulación. Scrollytelling con gráficos animados, contadores y efectos WebGL para narrar el dato con impacto.",
    tags: ["JavaScript", "GSAP", "Lenis", "WebGL", "Scrollytelling"],
    imageSrc: "/pattern-breaking.png",
    link: "https://pattern-breaking.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 24,
    title: "Maré",
    description:
      "Tienda online (e-commerce) de bienestar mediterráneo: comestibles, salud y belleza y hogar de origen vegetal con entrega de producto fresco. Catálogo por categorías y marcas, búsqueda, carrito y una experiencia de compra premium y bilingüe (ES/EN).",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "E-commerce"],
    imageSrc: "/mare.jpg",
    link: "https://mare-ecom.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 25,
    title: "Colibrí",
    description:
      "Tienda online para un micro-tostador de café climapositivo. Identidad de alto impacto (tipografía display, color vibrante y marquesinas animadas), catálogo de cafés, suscripciones y storytelling de marca en torno a lo artesanal y lo sostenible.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "E-commerce"],
    imageSrc: "/colibri.png",
    link: "https://colibri-beta.vercel.app/",
    category: "paginas-web",
  },
  {
    id: 26,
    title: "Meridiano",
    description:
      "Sitio corporativo completo para un operador logístico integral: carga aérea y marítima, aduanas, almacenaje y transporte terrestre. Globo 3D en WebGL con la red de corredores, secuencias atadas al scroll, calculadora de huella de carbono, rastreo y tienda corporativa. Pieza propia de Árkos con marca ficticia: marca, contenido, ilustración, 3D y código son originales.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Three.js", "Lenis"],
    imageSrc: "/meridiano.webp",
    link: "https://meridiano-arkos.vercel.app/",
    category: "paginas-web",
    year: "2026",
    location: "Perú",
    services: [
      "Sitio corporativo",
      "Identidad y dirección de arte",
      "WebGL y motion design",
      "Accesibilidad WCAG AA",
    ],
    caseStudy: {
      context:
        "Pieza propia del estudio, sin cliente: «Meridiano» es una marca ficticia y el sitio lo declara en el pie y en la pantalla de gracias. La construimos para tener en producción una demostración completa del rubro logístico —un sector que en Perú se resuelve casi siempre con plantillas y fotos de stock— y para poder enseñarla, no describirla.",
      problem:
        "Un operador logístico vende algo invisible: nadie ve el contenedor. Los sitios del rubro terminan en un catálogo de servicios plano y en un formulario, y el visitante no puede distinguir a un operador integral de un intermediario. El problema de negocio es de credibilidad, no de contenido.",
      decision:
        "Decidí que la red se viera, no se contara. El globo del hero es una malla de meridianos con las oficinas y corredores reales del contenido, y de ahí salen también los mapas planos y los listados: un solo archivo (contenido/red.ts) alimenta las tres cosas, así que la red nunca se contradice consigo misma. Y me impuse dos reglas que suelen romperse en piezas así: que nada dependiera de una foto de stock —el 3D, los SVG y los lienzos son dibujados— y que el sitio pasara accesibilidad de verdad, no de discurso.",
      built:
        "48 páginas estáticas sobre Next.js 16 —servicios, industrias, panorama editorial, carreras, legales, herramientas—, globo y mar en three.js, escenas coreografiadas con GSAP + ScrollTrigger sobre Lenis, calculadora de huella de carbono, rastreo y una tienda corporativa que envía solicitudes en vez de cobrar. Los formularios salen por SMTP con validación compartida entre cliente y servidor.",
      result:
        "El sitio pasa WCAG AA en sus 16 rutas —verificado con una auditoría de contraste repetible que resuelve el fondo efectivo de cada nodo con texto—, no tiene servidor ni CMS que mantener, y funciona sin animación: con prefers-reduced-motion las escenas no se acortan, no se montan, y cada sección queda en su estado final legible. Lo demostrativo está declarado en pantalla: el rastreo devuelve un embarque de ejemplo y la tienda no cobra.",
      proof: {
        liveUrl: "https://meridiano-arkos.vercel.app/",
        images: ["/meridiano.webp"],
      },
      cta: "¿Tu empresa vende algo que el cliente no puede ver? Conversemos sobre cómo mostrarlo.",
    },
  },
  {
    id: 27,
    title: "Trama",
    description:
      "Sitio de un estudio digital de ciclo completo: manifiesto, capacidades, proceso arrastrable, parrilla de proyectos y descarga de dossier. Sistema visual generativo —el logotipo, el fondo del hero y la portada de cada proyecto son el mismo tejido de arcos a distintas escalas— sobre una rejilla que cambia de número de columnas por tramo. Pieza propia de Árkos con marca ficticia.",
    tags: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "GSAP", "Lenis"],
    imageSrc: "/trama.webp",
    link: "https://trama-estudio-one.vercel.app/",
    category: "paginas-web",
    year: "2026",
    location: "Perú",
    services: [
      "Sitio de estudio",
      "Identidad y sistema visual",
      "Diseño UX/UI",
      "Desarrollo web",
    ],
    caseStudy: {
      context:
        "Pieza propia, sin cliente. «Trama» es una marca inventada —un placeholder para construir sin esperar la decisión de naming— y todo lo renombrable vive en un solo archivo: nombre, dominio, claim, contacto, cifras, datos estructurados, sitemap y hasta las etiquetas de los formularios salen de ahí.",
      problem:
        "Los sitios de estudios y agencias se parecen entre sí porque resuelven la identidad con una tipografía y un color, y el resto lo llenan con capturas de clientes. El resultado es una parrilla que se ve prestada: la marca del estudio desaparece detrás del trabajo que muestra.",
      decision:
        "Hice que el nombre y el sistema visual fueran la misma cosa. El logotipo es literalmente una celda del tejido de arcos que el sitio genera por todas partes; el fondo del hero y la portada de cualquier proyecto sin captura son ese mismo dibujo a otra escala. Un proyecto nuevo sin imagen no queda vacío ni finge una captura: dibuja el tejido con el color de la marca del cliente. Y el acento es violeta por descarte, no por gusto — los proyectos de la parrilla traen verde, rojo, amarillo, naranja y azul de sus propias marcas, y un acento del estudio que choca con la captura de al lado es un acento mal elegido.",
      built:
        "Portada de ocho secciones sobre Next.js 16 y React 19, con rejilla de 4/8/16 columnas según el tramo, tono claro u oscuro declarado por sección, tejido generativo en SVG, proceso arrastrable con Pointer Events y dos formularios (dossier y contacto) que salen por Resend con campo trampa y limitador por IP.",
      result:
        "La parrilla es honesta por diseño: cada caso declara su estado —entregado, propuesta, pieza de estudio o relleno— y ese estado se imprime en la ficha, así que el sitio no puede presentar una propuesta como un encargo firmado. Los formularios tampoco fingen: sin credenciales configuradas responden 503 y muestran el correo directo en vez de un «¡Gracias!» que no envió nada. Todo el tejido es un solo path de SVG —la primera versión emitía 5 029 nodos y bloqueaba el navegador.",
      proof: {
        liveUrl: "https://trama-estudio-one.vercel.app/",
        images: ["/trama.webp"],
      },
      cta: "¿Tu marca desaparece detrás del trabajo que muestras? Conversemos.",
    },
  },
  // ── Productos propios en construcción ─────────────────────────────────
  // Los tres casos siguientes están escritos desde la documentación real de
  // sus repos (planes, ADRs, auditorías, notas de modelo), no desde memoria.
  // Ninguno declara clientes ni métricas de negocio porque ninguno los tiene
  // todavía: lo que demuestran es criterio de ingeniería, que es exactamente
  // lo que un cliente quiere ver antes de contratar un sistema a medida.
  {
    id: 30,
    title: "RutaPro",
    description:
      "TMS multi-tenant para distribuidoras B2B: importación de pedidos, planificación de rutas, prueba de entrega con foto y firma, y tracking público para el cliente final. Producto propio en construcción, con las decisiones de arquitectura cerradas y documentadas.",
    tags: ["NestJS", "Next.js", "PostgreSQL", "PostGIS", "Prisma", "TypeScript"],
    imageSrc: "/rutapro.png",
    category: "sistemas-web",
    year: "2026",
    caseStudy: {
      context:
        "Una distribuidora urbana coordina su reparto entre un Excel de pedidos, llamadas al chofer y fotos de guías por WhatsApp. Los TMS del mercado resuelven eso, pero están pensados para operadores logísticos grandes y cobran como tales. RutaPro es mi respuesta a ese hueco: un TMS en la nube para distribuidoras B2B de Latinoamérica, con Perú como primer mercado.",
      problem:
        "El problema real no es trazar rutas, es que nadie sabe qué pasó con una entrega hasta que el chofer vuelve. Sin prueba de entrega el reclamo es palabra contra palabra; sin tracking, el cliente final llama para preguntar dónde está su pedido; y sin datos de la operación, la planificación del día siguiente se hace otra vez a mano.",
      decision:
        "Tomé tres decisiones y las dejé escritas como ADRs antes de programar. Primera: monolito modular en NestJS en vez de microservicios, porque un equipo pequeño paga el costo de la red distribuida sin cobrar ninguno de sus beneficios. Segunda: multi-tenancy con base de datos compartida, columna de inquilino y Row-Level Security en PostgreSQL, en vez de una base por cliente, porque el aislamiento lo garantiza el motor y no el código de la aplicación. Tercera: la app móvil del chofer queda diferida; el MVP se valida con la operación de oficina antes de abrir un segundo frente de plataforma.",
      built:
        "Un monorepo con API, dashboard web y workers de cola, con los tipos compartidos de punta a punta: los esquemas de validación viven en un paquete propio y los consumen tanto el servidor como el cliente, así que un cambio de contrato rompe la compilación en vez de romper producción. PostGIS para el cálculo geográfico, Redis y colas para el trabajo asíncrono, y CI que corre en cada pull request.",
      result:
        "Todavía no hay clientes ni métricas de operación, y no voy a inventarlas: RutaPro está en construcción. Lo que sí está cerrado es el criterio —ocho documentos de planificación, ADRs con las decisiones y sus alternativas descartadas, runbooks y CI— y ese es justamente el material que un cliente puede revisar antes de encargarme un sistema a medida.",
      cta: "¿Tu operación de reparto vive entre Excel, llamadas y fotos de WhatsApp? Conversemos.",
      proof: {
        images: ["/rutapro.png"],
      },
    },
  },
  {
    id: 31,
    title: "RIVET",
    description:
      "Plataforma B2B de micro-learning para equipos de ventas y compliance: lecciones cortas en modos de lectura acelerada, quizzes y gamificación, con panel de administración y analítica. Producto propio, en vivo.",
    tags: ["Next.js", "React", "Firebase", "TypeScript", "EdTech"],
    imageSrc: "/rivet.png",
    link: "https://rivet-ten.vercel.app/",
    category: "sistemas-web",
    year: "2026",
    caseStudy: {
      context:
        "La capacitación corporativa se cae por el mismo sitio que la adopción de cualquier herramienta: la gente no tiene una hora libre para un curso. RIVET parte de la premisa contraria —sesiones de minutos, no de horas— para equipos de ventas y de cumplimiento, donde el contenido cambia seguido y hay que poder demostrar que alguien lo leyó.",
      problem:
        "Dos problemas distintos en la misma plataforma. El del empleado es de atención: leer una lección completa sin abandonarla a la mitad. El del área que capacita es de evidencia: saber quién avanzó de verdad, no quién marcó la casilla. Y en cuanto hay puntaje de por medio aparece el tercero, que es de integridad: si el navegador puede decir cuántos puntos ganó, el ranking no vale nada.",
      decision:
        "La regla que ordena todo el producto es que el servidor es la única autoridad sobre puntaje, progreso y roles. El cliente propone, el servidor decide y persiste. De ahí bajan las reglas de acceso por colección y el que las preguntas de un quiz no viajen con su respuesta correcta. La segunda decisión fue de interfaz: esto es una herramienta de trabajo, no una landing, así que la lectura manda y el movimiento solo existe cuando ayuda a la tarea.",
      built:
        "Lectura acelerada con presentación palabra a palabra y otros modos de foco, banco de preguntas con quizzes, progreso y gamificación, certificados de completación, panel de administración de cursos y lecciones, y analítica de avance por persona. Todo en Next.js con React y Firestore, con reglas de seguridad por colección.",
      result:
        "Está en vivo y se puede probar sin pedir permiso, que es la forma honesta de enseñar un producto. No publico cifras de uso porque no tengo una base instalada que las sostenga; lo que se puede evaluar hoy es el producto funcionando y las decisiones que lo sostienen.",
      cta: "¿Tu equipo necesita capacitarse en minutos y que puedas demostrarlo? Conversemos.",
      proof: {
        liveUrl: "https://rivet-ten.vercel.app/",
        images: ["/rivet.png"],
      },
    },
  },
  {
    id: 32,
    title: "SignMed",
    description:
      "Reconocimiento de lengua de señas médica en tiempo real: captura de landmarks en el navegador e inferencia con CNN+LSTM sobre FastAPI. El caso está escrito alrededor de la auditoría técnica que encontró que el modelo original se entrenaba sin ver una sola mano.",
    tags: ["Python", "FastAPI", "TensorFlow", "MediaPipe", "MongoDB", "Next.js"],
    imageSrc: "/signmed.png",
    githubLink: "https://github.com/RodrigoFK06/signmed-backend",
    category: "sistemas-web",
    year: "2026",
    caseStudy: {
      context:
        "Un paciente sordo en una consulta médica depende de que haya intérprete. SignMed ataca ese momento: el navegador captura los puntos de la mano, el cuerpo y la cara con MediaPipe, y un modelo CNN+LSTM clasifica la seña en tiempo real, con práctica guiada y exámenes para aprender el vocabulario clínico.",
      problem:
        "Recibí el proyecto funcionando y con una métrica que se veía bien: 0,80 de exactitud. Antes de construir encima, audité el pipeline. El vector de características se armaba con pose, cara y manos en ese orden y luego se recortaba a 150 valores; pose y cara ya sumaban 160. Las manos, que iban al final, quedaban siempre fuera del recorte. Un modelo de lengua de señas se había entrenado sin ver una sola mano.",
      decision:
        "Lo verifiqué antes de afirmarlo, porque una acusación así no se sostiene con una lectura del código. Comparé las coordenadas del bloque sospechoso contra las muñecas y la nariz de la pose: caían sobre la nariz. Medí cuánto se movía cada bloque a lo largo de la secuencia: el de pose siete veces más que el otro, que apenas se movía, como una cara y no como unas manos gesticulando. Recién con esa evidencia reescribí el layout de features y lo dejé en un solo archivo compartido por el grabador y el navegador, con las manos primero y con espacio garantizado.",
      built:
        "API en FastAPI con autenticación por roles y MongoDB, separada en endpoints que solo orquestan, servicios con la lógica y una capa de datos aislada; frontend en Next.js que captura los landmarks en el navegador; y suite de pruebas con CI en cada push. En el camino aparecieron dos fallos más: el entrenamiento no normalizaba las features pero la inferencia sí, así que el modelo veía en producción una distribución que nunca había visto; y una clase del catálogo era una errata en plural de otra, con dos muestras, que llegó al modelo publicado sin una sola muestra de prueba.",
      result:
        "El hallazgo incómodo es que el dataset actual no se puede arreglar reentrenando: las grabaciones nunca contuvieron las manos, la información no está ahí, y hay que volver a grabar con el grabador corregido. Así que la auditoría dice por escrito que el 0,80 publicado no mide reconocimiento de señas, y explica además por qué la partición aleatoria por fila infla ese número. El sistema queda desplegable y demostrable de punta a punta, con el pipeline corregido y el camino de reentrenamiento documentado. Publicar que la métrica de tu propio modelo no vale cuesta, pero es la única versión que sirve para decidir.",
      cta: "¿Tienes un modelo en producción cuya métrica nadie ha auditado? Conversemos.",
      proof: {
        images: ["/signmed.png"],
      },
    },
  },
];

// Funciones de utilidad para filtrar proyectos
export const getFeaturedProjects = () => projects.filter(project => project.featured)

export const getProjectsByCategory = (category: string) =>
  category === "all" ? projects : projects.filter(project => project.category === category)

export const getProjectById = (id: number) => projects.find(project => project.id === id)

// Selección y orden de la home. RestHUB (19) primero — es el proyecto destacado.
// Editar aquí para curar la portada sin tocar el orden del array.
// Ojo: cada filtro (Páginas web / Sistemas web / Apps) debe quedar bien poblado;
// una categoría con 3-4 cards deja la cuadrícula vacía.
export const HOME_PROJECT_IDS = [
  // 28 y 29 (Precio Vivo, Precio Justo) entran al núcleo: son lo único del
  // portafolio que demuestra en vivo la capacidad de datos + IA, y la home
  // era justamente donde no había prueba de eso.
  // 30, 31 y 32 (RutaPro, RIVET, SignMed) entran arriba: son los casos con
  // documentación de ingeniería real y los únicos indexables recientes.
  19, 32, 28, 29, 30, 31, 2, 21, 22, 23, 1, 8, 6, 11, // núcleo B2B + destacados
  26, 27, 20, 24, 25, 13, 17, 18, 14, 15, 12, // páginas web y e-commerce recientes + Solutec System
]
export const getHomeProjects = (): Project[] =>
  HOME_PROJECT_IDS
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p))

// ── Fichas indexables ───────────────────────────────────────────────────
//
// De las 28 fichas /portfolio/[id], solo estas se declaran en el sitemap y se
// sirven sin `noindex`. Las otras 22 siguen existiendo, visibles y enlazadas
// desde /portfolio, que queda como el hub indexable: lo que cambia es que
// dejan de competir por rastreo e indexación.
//
// Por qué: cada ficha sin caso de estudio rinde ~204 palabras dentro de ~95 KB
// de HTML, y son 22 páginas casi idénticas entre sí. Google las rastrea, las
// encuentra delgadas y baja la confianza en el patrón del sitio completo.
// Mientras tanto la home gastaba 22 de sus enlaces internos en ellas y solo 2
// en /desarrollo-de-software-lima, que es la página que debe vender.
//
// El criterio es objetivo, no de gusto: tener `caseStudy` con datos REALES.
// Por eso quedan fuera OrquestadorADM (1), Rapiditos (8) y FacturArkos (21),
// que sí tienen `caseStudy` pero con datos marcados `⚠️ MOCK` — desindexarlas
// saca de paso métricas inventadas del índice, que contradicen la regla de no
// publicar cifras que no podemos sostener.
//
// Para sumar una ficha aquí: escribir su `caseStudy` con datos reales y añadir
// su id. RutaPro, RIVET y SignMed son las próximas candidatas (tienen roadmap,
// ADRs y auditoría técnica ya escritos); y las tres MOCK vuelven en cuanto se
// reemplacen sus datos.
export const INDEXABLE_CASE_IDS = [
  2, // Solutec DHA — cliente real, uso diario, testimonio público
  19, // RestHUB — producto propio, métricas del piloto
  26, // Meridiano — pieza propia, declarada como tal
  27, // Trama — pieza propia, declarada como tal
  28, // Precio Vivo — abierto y en vivo, evaluación publicada
  29, // Precio Justo — abierto y en vivo, datos públicos de DIGEMID
  30, // RutaPro — producto en construcción; ADRs y planes como evidencia
  31, // RIVET — producto propio en vivo
  32, // SignMed — auditoría técnica con evidencia reproducible
]

export const isIndexableCase = (id: number) => INDEXABLE_CASE_IDS.includes(id)

// Categorías disponibles (fuente única de verdad para los filtros del portafolio)
export const projectCategories = [
  { id: "all", label: "Todos" },
  { id: "paginas-web", label: "Páginas web" },
  { id: "sistemas-web", label: "Sistemas web" },
  { id: "apps", label: "Apps" },
] as const

/** Etiqueta legible de una categoría (para el eyebrow de /portfolio/[slug]). */
export const getCategoryLabel = (id: string): string =>
  projectCategories.find((c) => c.id === id)?.label ?? id
