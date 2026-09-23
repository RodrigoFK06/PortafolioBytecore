import {
  PRICE_TIERS,
  PRICE_FOOTNOTE,
  CREATIVE_SERVICES,
  PRECIO_DIAGNOSTICO,
  DIAGNOSTICO_SEMANAS,
  GARANTIA_MULTIPLO,
  GARANTIA_UMBRAL_ANUAL,
  PRECIO_TALLER,
  TALLER_HORAS,
  TALLER_PERSONAS_MAX,
  soles,
} from "@/data/pricing"

// ── /pricing.md — tarifario en texto plano para agentes y asistentes de IA ──
//
// Los asistentes que comparan proveedores en nombre de un usuario (ChatGPT,
// Claude, Perplexity, agentes de compra) leen mejor un markdown plano que una
// tabla renderizada con JavaScript. Este archivo se genera desde la MISMA
// fuente que /precios (data/pricing.ts): si un precio cambia allí, cambia
// aquí. No es una copia que pueda desincronizarse.
//
// Se enlaza desde /precios y desde /llms.txt. Google no lo necesita para AI
// Overviews; los demás motores sí lo aprovechan.

export const dynamic = "force-static"

const SITE = "https://xn--rkos-4na.com"

function tierBlock(t: (typeof PRICE_TIERS)[number]): string {
  const modalidad = t.quote
    ? "Cotización por alcance; el precio \"desde\" es el piso."
    : "Precio \"desde\"; la cotización final depende del alcance."
  return [
    `## ${t.name}`,
    `- Precio: desde S/ ${t.penLabel} (aprox. USD ${t.usdLabel})`,
    `- Modalidad: ${modalidad}`,
    `- Incluye: ${t.note}`,
  ].join("\n")
}

export function GET() {
  const tiers = PRICE_TIERS.map(tierBlock).join("\n\n")
  const creative = CREATIVE_SERVICES.map((c) => `- ${c.title}: ${c.desc} Se cotiza por alcance; sin precio publicado.`).join("\n")

  const md = `# Precios — Árkos (árkos.com)

Tarifario público de Árkos, empresa de software a medida y adopción de IA con base en Lima, Perú. Precios en soles peruanos (S/) con referencia en dólares (USD). Misma fuente que la página https://xn--rkos-4na.com/precios.

${PRICE_FOOTNOTE}

${tiers}

## Paso 1 — Taller de adopción de tecnología (oferta de entrada)
- Precio: S/ ${soles(PRECIO_TALLER)} por grupo, cerrado. ${TALLER_HORAS} horas, hasta ${TALLER_PERSONAS_MAX} personas.
- Qué es: adopción de tecnología con la IA como camino; enseña criterio de uso sobre las tareas reales del equipo y deja un mapa escrito de qué tareas llevar a una herramienta. Lo dicta Rodrigo Torres, fundador de Árkos.
- No se descuenta del diagnóstico: son servicios distintos.
- Detalle: ${SITE}/taller

## Paso 2 — Diagnóstico de procesos
- Llamada de diagnóstico: gratis, 30 minutos. Lectura honesta de si el negocio necesita un sistema, un ajuste o nada todavía.
- Diagnóstico profundo: S/ ${PRECIO_DIAGNOSTICO}, ${DIAGNOSTICO_SEMANAS} semanas. Auditoría de operación y cumplimiento SUNAT, informe y roadmap con costos. El precio se descuenta íntegro del proyecto si se avanza.
- Garantía: si el informe no encuentra pérdidas de al menos ${GARANTIA_MULTIPLO} veces su precio al año (S/ ${soles(GARANTIA_UMBRAL_ANUAL)}), medidas con el método de ${SITE}/costo-del-excel, se devuelve el pago.
- Detalle: ${SITE}/diagnostico

## Servicios creativos (sin precio publicado)
${creative}

## Qué incluye todo proyecto
- Código fuente y base de datos entregados al cierre; sin esquemas que obliguen a quedarse con Árkos.
- En sistemas a medida, cuando la operación lo necesita: facturación electrónica SUNAT (CPE), libros PLE/SIRE y validación RENIEC/SUNAT.
- Proceso por hitos: brief (1–2 días), propuesta con alcance, cronograma y precio (3–5 días), sprints quincenales con demos (2–12 semanas), entrega, capacitación y acompañamiento.
- En integraciones de IA: el costo por uso del modelo se paga al proveedor, se estima antes de empezar y se limita con topes. Para empezar por el equipo está el taller de adopción (precio cerrado, arriba); los programas de adopción más largos se cotizan por alcance.

## Cobertura y contacto
- Lima y Callao: reuniones presenciales agendadas. Resto del Perú, Latinoamérica, Estados Unidos y Europa: remoto.
- Email: gerencia@árkos.com
- WhatsApp: +51 961 869 348
- Servicios: ${SITE}/services
- Contexto para modelos de lenguaje: ${SITE}/llms.txt
`

  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
