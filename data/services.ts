// ── Catálogo de servicios de Árkos ──────────────────────────────────────
// Fuente única para el hub /services y las seis subpáginas /services/{slug}.
//
// Antes, /services describía cada servicio con UNA frase (131 palabras de
// contenido real en toda la página) y sus seis botones "Saber más" eran
// <button> sin href: no llevaban a ninguna parte y las subpáginas no existían.
//
// Regla dura al editar este archivo: NO inventar cifras, clientes ni métricas.
// Todo dato numérico de aquí sale de /precios, de data/projects.ts o de los
// testimonios firmados del home. Lo que falte va como TODO(rodrigo).

export interface ServiceSection {
  h2: string
  paragraphs: string[]
  bullets?: string[]
}

export interface ServiceCase {
  /** id del proyecto en data/projects.ts → /portfolio/{id} */
  id: number
  title: string
  note: string
}

export interface ServiceContent {
  slug: string
  /** Título corto para tarjetas y navegación */
  navTitle: string
  /** Nombre del icono de lucide-react (ver components/service-card.tsx) */
  icon: string
  /** H1 de la subpágina */
  h1: string
  metaTitle: string
  metaDescription: string
  /** `serviceType` del schema Service */
  serviceType: string
  /** Descripción de una línea para la tarjeta del hub */
  summary: string
  /** Párrafo de entrada de la subpágina */
  lead: string
  sections: ServiceSection[]
  deliverables: string[]
  stack: string[]
  cases: ServiceCase[]
  /** Precio "desde" — debe coincidir con /precios. Nunca inventar otro. */
  priceFrom: { pen: string; usd: string; what: string }
  faqs: { q: string; a: string }[]
}

export const SERVICES: ServiceContent[] = [
  // ────────────────────────────────────────────────────────────────────
  {
    slug: "software-a-medida",
    navTitle: "Software a medida",
    icon: "Database",
    h1: "Desarrollo de software a medida: ERP, CRM, PMS y SaaS",
    metaTitle: "Desarrollo de software a medida en Perú: ERP, CRM y SaaS | Árkos",
    metaDescription:
      "Desarrollamos ERPs, CRMs, PMS y SaaS a medida para empresas peruanas, con cumplimiento SUNAT de fábrica. Desde S/ 13,000. Casos reales y precios publicados.",
    serviceType: "Desarrollo de software a medida",
    summary:
      "ERPs, CRMs, PMS y sistemas SaaS construidos desde tu operación real, con facturación electrónica SUNAT integrada de fábrica.",
    lead:
      "El software a medida no es un lujo: es lo que ocurre cuando tu operación deja de caber en un Excel y ningún sistema enlatado del mercado encaja sin obligarte a cambiar cómo trabajas. En Árkos construimos ERPs, CRMs, PMS y plataformas SaaS diseñadas desde la operación real de tu equipo, con React, Next.js y TypeScript, y con cumplimiento peruano incorporado desde el primer sprint.",
    sections: [
      {
        h2: "Cuándo conviene un sistema a medida (y cuándo no)",
        paragraphs: [
          "Un sistema enlatado es la opción correcta cuando tu proceso es estándar y el software del mercado ya lo modela bien. El problema aparece cuando tu operación tiene una particularidad que el enlatado no admite: un flujo de aprobación propio, una forma de cobrar distinta, un tipo de cliente que el sistema no contempla. Ahí empiezan los parches en Excel, los WhatsApp para coordinar lo que el sistema no coordina y las horas de tu equipo pegando información a mano.",
          "Nuestro criterio es directo: si el enlatado te sirve, te lo decimos y no te vendemos nada. Por eso la puerta de entrada es un diagnóstico, no una propuesta. Si el diagnóstico concluye que lo tuyo se arregla ordenando el Excel o definiendo un proceso, te lo entregamos por escrito y te habrás ahorrado varios miles de soles en software que no necesitabas.",
        ],
        bullets: [
          "Tu equipo dedica horas a copiar datos entre herramientas que no se hablan.",
          "Nadie sabe con certeza cuánto se vendió ayer sin abrir tres archivos.",
          "El sistema que usas cobra por módulos que jamás vas a utilizar.",
          "Cada cliente nuevo obliga a inventar un procedimiento manual.",
        ],
      },
      {
        h2: "Qué construimos",
        paragraphs: [
          "ERPs que unifican venta, operación, caja y contabilidad en un solo sistema, como RestHUB para restaurantes independientes. CRMs que ordenan una cartera que hoy vive en chats sueltos, como Solutec System. PMS hoteleros con gestión de reservas, huéspedes y rendimiento por propiedad, como OrquestadorADM y VR PMS. Plataformas SaaS multi-rol con portales separados por tipo de usuario, como ATELIER Clinic, que separa el portal del paciente del portal del médico.",
          "Cada sistema se diseña por roles: la pantalla de caja no es la pantalla de cocina, y la del administrador no es la del operario. Eso reduce el entrenamiento necesario y el error humano, que es donde una implantación de software se muere en la práctica.",
        ],
      },
      {
        h2: "Cumplimiento peruano de fábrica",
        paragraphs: [
          "Un sistema de gestión que no emite comprobantes válidos obliga a tu equipo a facturar en otro lado y a cuadrar dos fuentes a mano. Por eso el cumplimiento no es un módulo que se vende aparte: va incorporado desde el diseño. Trabajamos facturación electrónica (CPE) con OSE/PSE, libros electrónicos PLE y SIRE, validación de datos contra RENIEC y SUNAT, y la protección de datos personales que exige la Ley 29733.",
          "FacturArkos, nuestro producto propio de facturación electrónica y punto de venta para Mypes, existe precisamente porque construimos esa capa una y otra vez. Puedes verlo funcionando antes de contratarnos.",
        ],
      },
      {
        h2: "Cómo trabajamos",
        paragraphs: [
          "Partimos de tu operación, no de una plantilla: entrevistas con quien de verdad usa el sistema, mapa del proceso actual y prototipo navegable en Figma antes de escribir la primera línea de código. Desarrollamos por hitos, con entregas revisables, para que veas avance real y puedas corregir el rumbo temprano en lugar de descubrir al final que se construyó otra cosa.",
          "Al entregar, el código y los datos son tuyos. Definimos contigo si quieres mantenimiento continuo o si tu equipo se hace cargo; ambas opciones son legítimas y ninguna te deja secuestrado.",
        ],
      },
    ],
    deliverables: [
      "Mapa del proceso actual y del proceso propuesto",
      "Prototipo navegable en Figma antes de desarrollar",
      "Sistema desplegado, con roles y permisos por tipo de usuario",
      "Facturación electrónica SUNAT y libros PLE/SIRE si el sistema los requiere",
      "Manual de uso y capacitación al equipo",
      "Código fuente y base de datos entregados al cliente",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Spring Boot", "PostgreSQL", "Supabase", "Firebase"],
    cases: [
      { id: 19, title: "RestHUB", note: "ERP de restaurante: POS, cocina, caja y contabilidad en un solo sistema. En el piloto redujo el cierre de caja de 45 a 5 minutos." },
      { id: 6, title: "ATELIER Clinic", note: "SaaS para clínicas estéticas con portales separados de paciente y doctor, reservas multi-paso y dashboard médico." },
      { id: 21, title: "FacturArkos", note: "Facturación electrónica SUNAT + POS + inventario + tienda online para Mypes, sin instalación." },
      { id: 1, title: "OrquestadorADM", note: "PMS + RMS hotelero con forecasting, análisis What-If y precios dinámicos." },
    ],
    priceFrom: { pen: "13,000", usd: "3,500", what: "un sistema a medida (ERP, CRM, PMS o SaaS)" },
    faqs: [
      {
        q: "¿Cuánto cuesta un ERP o CRM a medida en Perú?",
        a: "Un sistema a medida parte de S/ 13,000 (USD 3,500) y se cotiza por alcance según los módulos que necesites. Publicamos todos los rangos en la página de precios; el número final depende de las integraciones, los roles de usuario y si hay que migrar datos de un sistema anterior.",
      },
      {
        q: "¿El código fuente es mío?",
        a: "Sí. Al cierre del proyecto te entregamos el código fuente y la base de datos. No trabajamos con esquemas que te obliguen a quedarte con nosotros para poder seguir usando tu propio sistema.",
      },
      {
        q: "¿Integran facturación electrónica con SUNAT?",
        a: "Sí, y va incluida de fábrica en los sistemas que la requieren: comprobantes de pago electrónicos vía OSE/PSE, libros electrónicos PLE y SIRE, y validación de datos contra RENIEC y SUNAT.",
      },
      {
        q: "¿Qué pasa si ya tengo un sistema y perdí contacto con el proveedor anterior?",
        a: "Es un escenario frecuente. Empezamos por auditar qué hay: a qué datos se puede acceder, qué se puede migrar y qué conviene rehacer. En algunos casos la salida más barata es recuperar y mantener lo existente, no reescribirlo; te decimos cuál de las dos aplica antes de cotizar.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  {
    slug: "desarrollo-web",
    navTitle: "Desarrollo web",
    icon: "Code",
    h1: "Desarrollo web: sitios y plataformas que cargan rápido y convierten",
    metaTitle: "Desarrollo web profesional en Perú con Next.js y React | Árkos",
    metaDescription:
      "Landings, webs corporativas y plataformas web con Next.js y React: rápidas, indexables y pensadas para convertir. Desde S/ 1,100. Casos y precios publicados.",
    serviceType: "Desarrollo web",
    summary:
      "Landings, sitios corporativos y plataformas web con Next.js y React: rápidos en cualquier conexión, indexables y orientados a conversión.",
    lead:
      "Una web no es un folleto digital: es el primer sistema con el que tu cliente interactúa. Construimos landings de alta conversión, sitios corporativos y plataformas web con Next.js, React y TypeScript, servidos con renderizado en servidor para que Google y los buscadores con IA lean todo el contenido sin ejecutar JavaScript.",
    sections: [
      {
        h2: "Rendimiento y visibilidad, no efectos por moda",
        paragraphs: [
          "En Perú una parte importante del tráfico llega por celular y con conexión irregular. Por eso optimizamos Core Web Vitals desde el diseño: imágenes en WebP y AVIF con tamaños servidos por dispositivo, fuentes autoalojadas, arquitectura JAMStack y renderizado en servidor. El resultado es un sitio que carga rápido de verdad, no uno que solo puntúa bien en una prueba de laboratorio.",
          "La visibilidad se construye igual: HTML semántico, un solo H1 por página, jerarquía de encabezados correcta, datos estructurados en JSON-LD, canónicas coherentes y sitemap real. Y como cada vez más gente pregunta a ChatGPT o Perplexity en lugar de buscar, dejamos el sitio citable por modelos de lenguaje: robots.txt con permisos explícitos a los rastreadores de IA y archivos llms.txt con los datos de la empresa.",
        ],
      },
      {
        h2: "Qué tipo de web necesitas",
        paragraphs: [
          "Una landing de alta conversión es una sola página con un objetivo: que quien llegue haga una acción concreta. Sirve para campañas, para un producto puntual o para validar una oferta antes de invertir más. Una web corporativa es el sitio institucional completo, pensado para posicionar por múltiples términos y sostener la credibilidad de la marca en el tiempo. Una plataforma web ya es software: tiene usuarios, sesiones, roles y datos que cambian.",
          "La diferencia importa porque el precio y el plazo cambian con ella. Si no tienes claro cuál te toca, la llamada de diagnóstico de 30 minutos resuelve esa pregunta sin costo.",
        ],
        bullets: [
          "Landing de alta conversión: una página, un objetivo, foco en captar contactos.",
          "Web corporativa: institucional, multi-página, optimizada para posicionamiento.",
          "Plataforma web: usuarios, roles, datos y lógica de negocio.",
        ],
      },
      {
        h2: "Administrable por tu equipo",
        paragraphs: [
          "Un sitio que obliga a llamar al desarrollador para cambiar un precio es un sitio que envejece. Dejamos administrable lo que de verdad cambia —textos, imágenes, publicaciones, catálogo— y fijo lo que no debería tocarse sin criterio, para que nadie rompa el diseño por accidente.",
          "También entregamos analítica configurada y los eventos de conversión que importan a tu negocio: contactos, agendamientos o ventas. Sin eso, cualquier conversación posterior sobre si la web funciona es una opinión.",
        ],
      },
    ],
    deliverables: [
      "Diseño responsive verificado en móvil, tablet y escritorio",
      "SEO técnico: metadatos, canónicas, sitemap, datos estructurados JSON-LD",
      "Optimización de Core Web Vitals e imágenes en WebP/AVIF",
      "Panel o sistema de contenidos para lo que cambia con frecuencia",
      "Analítica y eventos de conversión configurados",
      "Despliegue, dominio y certificado SSL en producción",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Astro", "Vercel"],
    cases: [
      { id: 18, title: "Dr. Ing. Freedy Sotelo Valer", note: "Sitio personal académico de alto contraste. Su testimonio destaca una carga por debajo de 1.2 segundos." },
      { id: 14, title: "Ñawi", note: "Sitio para una productora de cine documental centrado en memoria e identidad cultural." },
      { id: 22, title: "Nexora", note: "Landing premium bilingüe (ES/EN) para una agencia creativa, con scroll suave y tipografía de alto impacto." },
      { id: 15, title: "II Simposio Veterinario Internacional 2026", note: "Landing y sistema de registro para un evento académico de cuatro días, con countdown en vivo y agenda interactiva." },
    ],
    priceFrom: { pen: "1,100", usd: "300", what: "una landing de alta conversión" },
    faqs: [
      {
        q: "¿Cuánto cuesta una página web profesional en Perú?",
        a: "Una landing de alta conversión parte de S/ 1,100 (USD 300) y una web corporativa optimizada para posicionamiento desde S/ 2,250 (USD 600). El rango completo está publicado en la página de precios.",
      },
      {
        q: "¿En cuánto tiempo está lista?",
        a: "Un proyecto web típico toma de 3 a 8 semanas según el alcance. El plazo depende sobre todo de la rapidez con que se cierren contenidos y aprobaciones: la parte técnica rara vez es el cuello de botella.",
      },
      {
        q: "¿Puedo actualizar la web yo mismo?",
        a: "Sí. Dejamos administrable lo que cambia con frecuencia —textos, imágenes, publicaciones, catálogo— y entregamos una capacitación corta para que tu equipo lo maneje sin depender de nosotros.",
      },
      {
        q: "¿La web va a aparecer en Google?",
        a: "Construimos con SEO técnico correcto desde el inicio: renderizado en servidor, encabezados jerárquicos, datos estructurados y sitemap. Aparecer y posicionar, sin embargo, también depende de contenido y de autoridad; no prometemos posiciones y desconfía de quien lo haga.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  {
    slug: "apps-moviles",
    navTitle: "Apps móviles",
    icon: "Box",
    h1: "Desarrollo de aplicaciones móviles para iOS y Android",
    metaTitle: "Desarrollo de apps móviles iOS y Android en Perú | Árkos",
    metaDescription:
      "Apps móviles nativas con Flutter para iOS y Android, publicadas en App Store y Google Play. Desde S/ 9,400. Caso real: Rapiditos, app de delivery en producción.",
    serviceType: "Desarrollo de aplicaciones móviles",
    summary:
      "Apps para iOS y Android con Flutter, publicadas en App Store y Google Play, sobre un backend propio que tú controlas.",
    lead:
      "Una app tiene sentido cuando el uso es recurrente y el móvil es el canal natural: pedidos, seguimiento en tiempo real, notificaciones, uso en campo sin conexión estable. Desarrollamos aplicaciones con Flutter para iOS y Android desde una sola base de código, sobre un backend propio, y nos encargamos de la publicación en ambas tiendas.",
    sections: [
      {
        h2: "Cuándo una app, cuándo una web móvil",
        paragraphs: [
          "No toda idea necesita una app. Si tu usuario va a entrar una vez al mes, una web bien hecha en el celular cumple mejor y cuesta bastante menos: no exige descarga, no ocupa espacio y no depende de la aprobación de dos tiendas. La app se justifica cuando necesitas notificaciones push, cámara o GPS de forma intensiva, funcionamiento sin conexión, o cuando la presencia en la tienda es parte de la credibilidad del negocio.",
          "Te decimos cuál de las dos te toca antes de cotizar. Es la conversación que más dinero ahorra en este servicio.",
        ],
      },
      {
        h2: "Flutter, y por qué no un envoltorio barato",
        paragraphs: [
          "Trabajamos con Flutter y Dart: una sola base de código para iOS y Android, con rendimiento y sensación de app nativa. La alternativa barata es envolver una web en un contenedor, y se nota de inmediato en la fluidez y en los gestos. Cuando el negocio depende de la app, esa diferencia es la que decide si el usuario la conserva o la desinstala.",
          "El backend lo construimos aparte y es tuyo: en Rapiditos, por ejemplo, la app va sobre Spring Boot con Firebase. Eso te deja libre para cambiar de app sin rehacer el sistema entero, y para conectar la misma información a un panel web.",
        ],
      },
      {
        h2: "Publicación en tiendas y ciclo de vida",
        paragraphs: [
          "Publicar es un proceso con reglas propias: cuentas de desarrollador, fichas de tienda, capturas, política de privacidad, revisión de Apple y de Google, y sus rechazos. Nos hacemos cargo de ese trámite y lo dejamos documentado para que tu equipo pueda publicar futuras versiones.",
          "Una app viva necesita mantenimiento: cada año hay cambios de versiones de sistema operativo y de requisitos de las tiendas. Lo dejamos explícito en la propuesta en lugar de descubrirlo cuando la app deja de aceptarse.",
        ],
        bullets: [
          "Cuentas de desarrollador de Apple y Google (con costo anual propio de cada tienda).",
          "Ficha de tienda: textos, capturas, icono y clasificación de contenido.",
          "Política de privacidad y declaración de datos recopilados.",
          "Proceso de actualización documentado para tu equipo.",
        ],
      },
    ],
    deliverables: [
      "App para iOS y Android desde una sola base de código Flutter",
      "Backend propio con API documentada",
      "Notificaciones push y analítica de uso",
      "Publicación en App Store y Google Play",
      "Código fuente entregado al cliente",
      "Plan de mantenimiento opcional, definido al cierre del proyecto",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Spring Boot", "Docker"],
    cases: [
      { id: 8, title: "Rapiditos", note: "App de delivery publicada en App Store y Google Play: seguimiento de pedidos en tiempo real, gestión de menús, pagos en línea y comunicación con el repartidor." },
    ],
    priceFrom: { pen: "9,400", usd: "2,500", what: "una app móvil para iOS y Android" },
    faqs: [
      {
        q: "¿Cuánto cuesta desarrollar una app móvil en Perú?",
        a: "Una app para iOS y Android parte de S/ 9,400 (USD 2,500) y se cotiza por alcance. El precio depende del número de pantallas, de si necesita backend propio y de integraciones como pagos, mapas o notificaciones.",
      },
      {
        q: "¿La app se publica en App Store y Google Play?",
        a: "Sí. Nos encargamos del proceso de publicación en ambas tiendas. Las cuentas de desarrollador de Apple y Google tienen un costo anual propio que asume el cliente y que queda a su nombre.",
      },
      {
        q: "¿Puedo ver una app suya funcionando antes de contratar?",
        a: "Sí. Rapiditos está publicada y descargable en la App Store, así que puedes probarla sin intermediarios.",
      },
      {
        q: "¿Necesito una app o me basta con una web?",
        a: "Depende de la frecuencia de uso y de si necesitas notificaciones push, cámara, GPS o funcionamiento sin conexión. Si tu usuario entra una vez al mes, una web móvil bien hecha suele cumplir mejor y cuesta menos. Lo resolvemos en la llamada de diagnóstico.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  {
    slug: "diseno-ux-ui",
    navTitle: "Diseño UX/UI",
    icon: "Palette",
    h1: "Diseño UX/UI: interfaces que se entienden en tres segundos",
    metaTitle: "Diseño UX/UI para web y software en Perú | Árkos",
    metaDescription:
      "Diseño UX/UI en Figma: investigación con usuarios reales, arquitectura de información, prototipo navegable y sistema de diseño. Para webs, sistemas y apps.",
    serviceType: "Diseño UX/UI",
    summary:
      "Investigación, arquitectura de información, prototipo en Figma y sistema de diseño. Interfaces claras que reducen soporte y aumentan conversión.",
    lead:
      "El diseño no es la capa bonita que se pone al final: es la decisión de qué ve el usuario primero, qué puede hacer sin pensar y qué se le esconde hasta que lo necesita. Diseñamos en Figma partiendo de cómo trabaja tu usuario real, y entregamos un prototipo navegable antes de que se escriba una línea de código.",
    sections: [
      {
        h2: "Del usuario real, no de una plantilla",
        paragraphs: [
          "Empezamos escuchando a quien va a usar el sistema todos los días: entrevistas cortas, observación del proceso actual y un mapa del recorrido con sus puntos de fricción. Ese trabajo aparece luego en decisiones concretas: cuántos pasos tiene un formulario, qué se muestra por defecto, qué se agrupa junto.",
          "En software de gestión, la diferencia se mide en tiempo de entrenamiento y en errores de captura. En una web comercial, se mide en cuántos visitantes hacen lo que la página quiere que hagan. En ambos casos el diseño se juzga por resultado, no por gusto.",
        ],
      },
      {
        h2: "Prototipo antes de código",
        paragraphs: [
          "Entregamos un prototipo navegable en Figma: pantallas reales, con contenido real, que puedes recorrer y hacer probar a tu equipo. Corregir ahí cuesta minutos; corregirlo cuando ya está programado cuesta días. Es el punto del proyecto donde más dinero se ahorra y el que más se salta la industria.",
          "Del prototipo sale también un sistema de diseño: tipografía, escala de espaciado, colores con contraste verificado, componentes y estados. Eso mantiene la coherencia cuando el producto crece y evita que cada pantalla nueva parezca de otro producto.",
        ],
        bullets: [
          "Arquitectura de información y flujos por tipo de usuario",
          "Wireframes de baja fidelidad para validar estructura",
          "Prototipo navegable de alta fidelidad en Figma",
          "Sistema de diseño con componentes, estados y tokens",
        ],
      },
      {
        h2: "Accesibilidad y diseño responsive",
        paragraphs: [
          "Diseñamos con contraste suficiente, tamaños de texto legibles, áreas de toque adecuadas para el pulgar y navegación por teclado. No es solo cumplimiento: es el mismo trabajo que hace usable una interfaz para alguien con la pantalla al sol, con una mano ocupada o con prisa.",
          "Y diseñamos móvil primero, porque en la práctica la mayoría de tus usuarios va a llegar desde un celular. La versión de escritorio se deriva de esa, no al revés.",
        ],
      },
    ],
    deliverables: [
      "Investigación con usuarios reales y mapa del recorrido actual",
      "Arquitectura de información y flujos por rol",
      "Wireframes y prototipo navegable en Figma",
      "Sistema de diseño: tipografía, color, espaciado, componentes y estados",
      "Especificaciones de interacción para el equipo de desarrollo",
      "Revisión de accesibilidad: contraste, tamaños y navegación por teclado",
    ],
    stack: ["Figma", "Tailwind CSS", "GSAP", "Lenis"],
    cases: [
      { id: 2, title: "Solutec DHA", note: "El reto era verse profesional sin perder la cercanía que hizo crecer el negocio. El diseño conservó su voz —conversaciones reales de WhatsApp, tono cálido— dentro de una landing premium." },
      { id: 13, title: "Kinetic Black", note: "Landing de alto impacto para una marca de suplementación, con onboarding animado y jerarquía visual construida sobre fondo oscuro." },
      { id: 23, title: "Pattern Breaking", note: "Pieza editorial de data-storytelling con scrollytelling, gráficos animados y efectos WebGL al servicio del dato." },
    ],
    priceFrom: { pen: "1,100", usd: "300", what: "un proyecto con diseño UX/UI a medida" },
    faqs: [
      {
        q: "¿Puedo contratar solo el diseño, sin el desarrollo?",
        a: "Sí. Entregamos el prototipo en Figma y el sistema de diseño documentado para que lo implemente tu equipo o el proveedor que elijas. Los archivos son tuyos.",
      },
      {
        q: "¿Cuánto dura la fase de diseño?",
        a: "En un proyecto web típico, el diseño ocupa las primeras semanas del plazo total de 3 a 8 semanas. En un sistema a medida es más larga, porque hay más flujos y más roles que resolver antes de programar.",
      },
      {
        q: "¿Trabajan sobre un diseño que ya tengo?",
        a: "Sí. Podemos partir de tu identidad de marca o de pantallas existentes, auditarlas y evolucionarlas en lugar de empezar de cero. Cuando eso es lo más razonable, lo decimos.",
      },
      {
        q: "¿Incluye el diseño del logo y la identidad de marca?",
        a: "Se cotiza aparte, pero sí lo hacemos: logotipo, paleta, tipografía y aplicaciones básicas de marca. Si tu proyecto es digital y todavía no tienes identidad definida, la resolvemos antes de diseñar pantallas — construir una interfaz sobre una marca que va a cambiar es trabajo que se hace dos veces. También producimos las piezas gráficas del día a día: flyers, contenido para redes, catálogos y material audiovisual.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  {
    slug: "integracion-ia",
    navTitle: "Integración de IA",
    icon: "MessageSquare",
    h1: "Integración de inteligencia artificial y automatización de procesos",
    metaTitle: "Integración de IA y automatización para empresas en Perú | Árkos",
    metaDescription:
      "Chatbots, agentes de ventas y automatizaciones con n8n y Make conectados a tu operación real. Desde S/ 1,900. IA dentro de tu sistema, no como un agregado suelto.",
    serviceType: "Integración de inteligencia artificial",
    summary:
      "Chatbots, agentes de ventas y flujos automatizados con n8n y Make, conectados a tu operación real y no como un widget suelto.",
    lead:
      "La IA solo sirve si está conectada a tus datos. Un chatbot que no sabe tus precios, tu stock ni tus horarios genera más trabajo del que ahorra. Integramos modelos como Gemini y GPT dentro de tu sistema, con acceso a tu información real, y automatizamos con n8n y Make los pasos manuales que hoy consumen el tiempo de tu equipo.",
    sections: [
      {
        h2: "Dónde la IA paga y dónde no",
        paragraphs: [
          "Paga en tareas repetitivas, de alto volumen y con tolerancia al error revisable: responder las mismas veinte preguntas de siempre, clasificar y derivar consultas entrantes, extraer datos de documentos, redactar borradores que una persona aprueba. No paga cuando el proceso es de bajo volumen —automatizar algo que ocurre dos veces al mes cuesta más de lo que ahorra— ni cuando un error no admite revisión humana.",
          "Antes de proponer nada medimos dónde se va el tiempo hoy. Si el cuello de botella es un proceso mal definido, automatizarlo solo produce caos más rápido.",
        ],
      },
      {
        h2: "Chatbots y agentes conectados a tu operación",
        paragraphs: [
          "Construimos asistentes que responden con tus datos: catálogo, precios, disponibilidad, estado de un pedido o de una cita. Se integran donde ya está tu cliente —tu web o WhatsApp— y saben cuándo dejar de responder y pasar la conversación a una persona, que es la parte que casi nadie implementa y la que evita que el bot arruine una venta.",
          "El propio sitio de Árkos corre un asistente de este tipo. Puedes probarlo antes de contratarnos: es la forma más honesta de mostrar el servicio.",
        ],
        bullets: [
          "Respuestas basadas en tus datos reales, no en texto genérico.",
          "Calificación de contactos entrantes y derivación a una persona.",
          "Registro de cada conversación en tu sistema o CRM.",
          "Límites explícitos: qué no debe responder nunca el asistente.",
        ],
      },
      {
        h2: "Automatización de flujos con n8n y Make",
        paragraphs: [
          "Buena parte de lo que parece un problema de IA es en realidad un problema de integración: datos que alguien copia de un formulario a una hoja, de la hoja al correo y del correo al sistema. Ese trayecto se automatiza con n8n o Make, se documenta y queda funcionando sin que nadie tenga que acordarse.",
          "Dejamos los flujos documentados y con registro de ejecución, para que cuando algo falle se sepa dónde falló. Una automatización opaca es una bomba de tiempo.",
        ],
      },
      {
        h2: "Datos, costos y límites",
        paragraphs: [
          "Definimos desde el inicio qué información puede ver el modelo y cuál no, en línea con la Ley 29733 de Protección de Datos Personales. Los datos sensibles se filtran antes de salir de tu sistema.",
          "Y dejamos claro el costo recurrente: los modelos se pagan por uso, así que estimamos el consumo esperado y ponemos topes. Que un asistente funcione no debe significar una factura sorpresa a fin de mes.",
        ],
      },
    ],
    deliverables: [
      "Diagnóstico de qué procesos conviene automatizar y cuáles no",
      "Asistente o agente conectado a tus datos reales",
      "Flujos automatizados en n8n o Make, documentados",
      "Reglas de derivación a persona y límites de respuesta",
      "Estimación del costo recurrente por uso del modelo",
    ],
    stack: ["Gemini", "GPT", "n8n", "Make", "Next.js API Routes", "Webhooks"],
    cases: [
      { id: 21, title: "FacturArkos", note: "Producto propio donde la automatización de comprobantes y su validación con SUNAT sustituyen el trabajo manual de emisión." },
      { id: 12, title: "Solutec System", note: "CRM que captura los contactos entrantes de WhatsApp y los administra de punta a punta, en lugar de perderlos en el chat." },
    ],
    priceFrom: { pen: "1,900", usd: "500", what: "una integración de IA o automatización" },
    faqs: [
      {
        q: "¿Cuánto cuesta integrar un chatbot con IA?",
        a: "Una integración de IA o automatización parte de S/ 1,900 (USD 500). A eso se suma el costo por uso del modelo, que se paga al proveedor y se estima antes de empezar.",
      },
      {
        q: "¿El chatbot va a inventar respuestas?",
        a: "El riesgo existe y se controla acotando el asistente a tus datos, definiendo qué temas no debe responder y derivando a una persona cuando no tiene la información. Un asistente que dice «no lo sé, te comunico con alguien» es preferible a uno que improvisa.",
      },
      {
        q: "¿Mis datos se usan para entrenar el modelo?",
        a: "Configuramos la integración para que los datos de tu operación no se usen en entrenamiento, y filtramos los datos personales antes de enviarlos al modelo, conforme a la Ley 29733.",
      },
      {
        q: "¿Puede conectarse a WhatsApp?",
        a: "Sí, es el canal más pedido en Perú porque es donde ya están tus clientes. La integración con la API de WhatsApp Business tiene requisitos y costos propios de la plataforma que revisamos contigo antes de cotizar.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  {
    slug: "ecommerce",
    navTitle: "E-commerce",
    icon: "Monitor",
    h1: "Desarrollo de tiendas online con pagos en soles y factura electrónica",
    metaTitle: "Desarrollo de e-commerce en Perú con pagos en soles | Árkos",
    metaDescription:
      "Tiendas online con Izipay, Culqi, MercadoPago y Yape, factura electrónica SUNAT, control de stock e integración con courier. Desde S/ 3,400.",
    serviceType: "Desarrollo de comercio electrónico",
    summary:
      "Tiendas online listas para vender: pasarelas en soles, factura electrónica SUNAT, control de stock e integración con courier.",
    lead:
      "Vender en línea en Perú tiene requisitos que ninguna plantilla internacional resuelve sola: cobrar en soles con los medios que la gente usa, emitir un comprobante que SUNAT acepte y coordinar la entrega con un courier local. Construimos tiendas que cubren ese circuito completo, desde el catálogo hasta el comprobante.",
    sections: [
      {
        h2: "Cobrar como se cobra en Perú",
        paragraphs: [
          "Integramos pasarelas locales —Izipay, Culqi, MercadoPago— y Stripe para cobros internacionales, además de los medios que tu comprador ya tiene en el celular, como Yape y Plin. Cada pasarela tiene su propio proceso de afiliación, sus comisiones y sus tiempos de liquidación; te ayudamos a elegir en función de tu ticket promedio y tu volumen, no del que a nosotros nos resulte más cómodo integrar.",
          "El pago contra entrega sigue pesando en muchos rubros peruanos. Si es tu caso, se contempla como método desde el diseño del flujo, con su propia lógica de confirmación.",
        ],
      },
      {
        h2: "Comprobante electrónico y stock",
        paragraphs: [
          "Cada venta debe terminar en una boleta o factura válida ante SUNAT, emitida automáticamente y enviada al comprador. Cuando eso no está integrado, alguien de tu equipo termina emitiendo comprobantes a mano al final del día y cuadrando dos sistemas que no coinciden.",
          "El control de stock funciona en el mismo circuito: el inventario descuenta al confirmarse el pago, no antes, para no bloquear producto por carritos abandonados. Si vendes también en tienda física, ese stock debe ser uno solo, y ahí es donde el e-commerce se conecta con el punto de venta.",
        ],
        bullets: [
          "Emisión automática de boleta o factura electrónica al cerrar la venta.",
          "Stock único entre canal online y punto de venta físico.",
          "Alertas de inventario bajo y control de productos con variantes.",
          "Integración con courier y seguimiento del envío para el comprador.",
        ],
      },
      {
        h2: "Conversión: el catálogo es la tienda",
        paragraphs: [
          "La mayoría de las ventas perdidas no se pierden en el pago, sino antes: buscador que no encuentra, fotos que no muestran el producto, costo de envío que aparece recién al final. Trabajamos la ficha de producto, la búsqueda y los filtros, y mostramos el costo de envío lo antes posible, porque la sorpresa en el último paso es la principal causa de carrito abandonado.",
          "Y medimos: qué se busca sin resultados, dónde se abandona el proceso, qué producto se ve mucho y se compra poco. Sin esos datos, optimizar la tienda es adivinar.",
        ],
      },
    ],
    deliverables: [
      "Catálogo administrable con categorías, variantes e imágenes optimizadas",
      "Pasarela de pago en soles integrada y probada en producción",
      "Emisión automática de comprobante electrónico SUNAT",
      "Control de stock y alertas de inventario",
      "Integración con courier y seguimiento de envío",
      "Analítica de ventas y embudo de conversión",
    ],
    stack: ["Next.js", "React", "TypeScript", "Astro", "Izipay", "Culqi", "MercadoPago", "Stripe"],
    cases: [
      { id: 5, title: "ReLu Coffee", note: "E-commerce de café gourmet y cafeteras automáticas para hogares, oficinas y negocios." },
      { id: 24, title: "Maré", note: "Tienda de bienestar mediterráneo con catálogo por categorías y marcas, búsqueda, carrito y experiencia bilingüe." },
      { id: 25, title: "Colibrí", note: "Tienda para un micro-tostador de café climapositivo, con catálogo, suscripciones y storytelling de marca." },
    ],
    priceFrom: { pen: "3,400", usd: "900", what: "una tienda online" },
    faqs: [
      {
        q: "¿Cuánto cuesta una tienda online en Perú?",
        a: "Un e-commerce con pasarela de pago en soles, control de stock y panel administrable parte de S/ 3,400 (USD 900). El precio sube con el tamaño del catálogo, las variantes de producto y las integraciones con courier o con tu sistema contable.",
      },
      {
        q: "¿Integran Yape, Plin, Izipay o Culqi?",
        a: "Sí. Integramos las pasarelas locales —Izipay, Culqi, MercadoPago— y Stripe para cobros internacionales, además de los medios de pago móvil que tu comprador ya usa. Cada pasarela tiene su propia afiliación y comisiones, que revisamos contigo antes de elegir.",
      },
      {
        q: "¿La tienda emite boleta o factura electrónica?",
        a: "Sí, se emite automáticamente al cerrar la venta y se envía al comprador. Es la diferencia entre una tienda que funciona sola y una donde alguien termina emitiendo comprobantes a mano cada noche.",
      },
      {
        q: "¿Puedo vender también desde una tienda física con el mismo stock?",
        a: "Sí. Es el escenario que conecta el e-commerce con un punto de venta: un solo inventario para ambos canales. FacturArkos, nuestro producto propio, resuelve esa combinación para Mypes.",
      },
    ],
  },
]

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug)
