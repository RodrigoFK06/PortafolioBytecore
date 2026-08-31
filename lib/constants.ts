// Configuración general del sitio
export const SITE_CONFIG = {
  name: "Árkos",
  title: "Árkos - Mejoramos tus procesos",
  description: "Somos Árkos, una agencia digital especializada en desarrollo web, diseño UX/UI y soluciones tecnológicas innovadoras.",
  url: "https://xn--rkos-4na.com",
  creator: "@Árkos",
  keywords: ["desarrollo web", "diseño UX/UI", "soluciones tecnológicas", "Next.js", "React", "TypeScript"],

  // Contacto
  contact: {
    // Email público de Árkos. SMTP (autenticación) corre por Gmail vía
    // CONTACT_EMAIL / SMTP_USER en .env.local; el From: debe configurarse
    // como alias para que llegue como gerencia@árkos.com.
    email: "gerencia@árkos.com",
    phone: "+51 961 869 348",
    whatsapp: "51961869348",
    address: "Lima, Perú",
  },

  // Entidad legal (SUNAT, inscrita el 10/08/2026). Se muestra en el pie y es
  // la fuente única del RUC: el mismo número vive en `taxID`/`identifier` del
  // schema en app/layout.tsx, y si se duplicara a mano los dos se separarían.
  // Importa que sea visible y no solo JSON-LD: un dato que el usuario puede
  // leer en la página respalda la afirmación del schema en vez de solo
  // declararla, y en Perú responde el "¿emiten factura?" antes de que lo
  // pregunten. No se publica el domicilio fiscal: es un domicilio particular.
  legal: {
    name: "Arkos Soluciones Informáticas S.A.C.S.",
    nameFull:
      "ARKOS SOLUCIONES INFORMATICAS SOCIEDAD POR ACCIONES CERRADA SIMPLIFICADA",
    ruc: "20616338782",
  },

  // Redes sociales
  social: {
    twitter: "https://twitter.com/arkos",
    github: "https://github.com/RodrigoFK06",
    linkedin: "https://www.linkedin.com/in/rodrigo-torres-arkos",
    instagram: "https://instagram.com/arkos",
  },

  // Sistema de correos (variables de entorno)
  email: {
    // Las credenciales SMTP se configuran en .env.local
    // SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_SECURE
    // CONTACT_EMAIL - email donde llegan los mensajes de contacto
    apiEndpoint: "/api/contact",
  },

  // Chatbot con Gemini AI
  chatbot: {
    apiEndpoint: "/api/chatbot",
    enabled: true,
    welcomeMessage: "¡Hola! Soy ArkBot, tu asistente de ventas de Árkos 👋",
    model: "gemini-2.0-flash-exp",
    features: {
      leadQualification: true,
      quotationGeneration: true,
      appointmentScheduling: true,
      crmIntegration: true,
      realTimeAnalytics: true
    },
    ui: {
      primaryColor: "from-blue-600 to-purple-600",
      accentColor: "blue-600",
      borderRadius: "rounded-xl",
      maxWidth: "380px",
      maxHeight: "520px"
    }
  }
} as const

// Configuración de breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  ease: {
    default: "easeInOut",
    spring: "spring",
  }
} as const

// Configuración de performance
export const PERFORMANCE_CONFIG = {
  debounceDelay: 300,
  throttleDelay: 100,
  imageOptimization: {
    quality: 85,
    formats: ['webp', 'avif'],
  }
} as const
