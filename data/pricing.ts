// ── Tarifario de Árkos — FUENTE ÚNICA ───────────────────────────────────
//
// Estos rangos vivían duplicados en /precios, en la página de Lima y (con
// otros números) en el brochure. Tres copias del mismo dato es exactamente
// cómo dos de los competidores auditados perdieron credibilidad: SB Perú
// declara 18 años en una plantilla y 20 en otra; Monstruo Creativo, 7 en una
// página y 8 en otra.
//
// Si un precio cambia, cambia AQUÍ y en ningún otro sitio.

export interface PriceTier {
  name: string
  /** Precio "desde" en USD, para el schema Offer */
  usd: number
  usdLabel: string
  penLabel: string
  note: string
  /** true = se cotiza por alcance; el "desde" es solo el piso */
  quote?: boolean
}

export const PRICE_TIERS: PriceTier[] = [
  {
    name: "Landing de alta conversión",
    usd: 300,
    usdLabel: "300",
    penLabel: "1,100",
    note: "Una sola página, pensada para captar leads y convertir.",
  },
  {
    name: "Web corporativa",
    usd: 600,
    usdLabel: "600",
    penLabel: "2,250",
    note: "Sitio institucional hiper-optimizado para SEO y rendimiento.",
  },
  {
    name: "E-commerce",
    usd: 900,
    usdLabel: "900",
    penLabel: "3,400",
    note: "Tienda con pasarela de pago en soles, control de stock y panel admin.",
  },
  {
    name: "Web App / MVP a medida",
    usd: 1200,
    usdLabel: "1,200",
    penLabel: "4,500",
    note: "Aplicación web full-stack con Next.js, React y TypeScript.",
  },
  {
    name: "Sistema a medida — CRM, ERP, PMS, SaaS",
    usd: 3500,
    usdLabel: "3,500",
    penLabel: "13,000",
    note: "Cotización personalizada según módulos y alcance. Cumplimiento SUNAT (facturación electrónica, PLE/SIRE) incluido de fábrica.",
    quote: true,
  },
  {
    name: "App móvil (iOS + Android)",
    usd: 2500,
    usdLabel: "2,500",
    penLabel: "9,400",
    note: "Flutter, publicada en App Store y Google Play. Cotización según alcance.",
    quote: true,
  },
  {
    name: "Integración de IA y automatización",
    usd: 500,
    usdLabel: "500",
    penLabel: "1,900",
    note: "Chatbots, agentes de ventas y automatizaciones con n8n / Make.",
  },
]

export const PRICE_FOOTNOTE =
  "Precios “desde”, referenciales a 2026. Tipo de cambio aproximado S/ 3.75 = USD 1. Los sistemas a medida y apps móviles se cotizan por alcance."

/**
 * Servicios creativos: diseño gráfico, audiovisual y producción.
 *
 * No llevan precio publicado — se cotizan por alcance, igual que en el resto
 * del sitio se cotizan los sistemas grandes. Deliberadamente NO incluyen
 * pauta publicitaria (Meta / Facebook Ads): todavía no es un servicio de
 * Árkos y no se anuncia lo que no se presta.
 */
export const CREATIVE_SERVICES = [
  {
    num: "16",
    title: "Diseño Gráfico",
    desc: "Flyers, piezas para redes sociales, catálogos, brochures, papelería y material impreso. Diseño coherente con tu identidad, entregado en los formatos que cada canal necesita.",
  },
  {
    num: "17",
    title: "Identidad y Piezas de Marca",
    desc: "Logotipo, paleta, tipografía y aplicaciones básicas de marca. Cuando el proyecto es digital, la identidad se define antes de diseñar pantallas: construir una interfaz sobre una marca que va a cambiar es trabajo que se hace dos veces.",
  },
  {
    num: "18",
    title: "Producción Audiovisual",
    desc: "Video corporativo, edición, motion graphics y piezas cortas para redes. Desde la grabación hasta la entrega final, con las versiones y relaciones de aspecto que cada plataforma pide.",
  },
  {
    num: "19",
    title: "Contenido Digital",
    desc: "Producción continua de piezas para tus canales: parrilla de contenidos, plantillas editables y adaptaciones por formato, para que tu equipo publique sin depender de un diseñador cada vez.",
  },
] as const
