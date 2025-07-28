// Configuración general del sitio
export const SITE_CONFIG = {
  name: "ByteCore",
  title: "ByteCore - Tu Software Hecho Byte x Byte",
  description: "Somos ByteCore, una agencia digital especializada en desarrollo web, diseño UX/UI y soluciones tecnológicas innovadoras.",
  url: "https://bytecore.dev",
  creator: "@ByteCore",
  keywords: ["desarrollo web", "diseño UX/UI", "soluciones tecnológicas", "Next.js", "React", "TypeScript"],
  
  // Contacto
  contact: {
    email: "rodrigoan.torresp@gmail.com",
    phone: "+51 961 869 348",
    whatsapp: "51961869348",
    address: "Lima, Perú",
  },
  
  // Redes sociales
  social: {
    twitter: "https://twitter.com/bytecore",
    github: "https://github.com/bytecore",
    linkedin: "https://linkedin.com/company/bytecore",
    instagram: "https://instagram.com/bytecore",
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
    welcomeMessage: "¡Hola! Soy ByteBot, tu asistente de ventas de ByteCore 👋",
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
