// lib/fine-dining-survey.ts
// Fuente única de verdad del cuestionario "Tu mirada experta sobre el fine dining".
// Comparten este archivo: el componente cliente (render + validación) y la API/correo
// (validación + formateo del email), para que labels y opciones nunca se desincronicen.
//
// ENFOQUE (ver documento interno de RestHUB): el destinatario es un operador que YA
// tiene su fine dining afinado (Piedra / Mateo es el caso semilla). NO es un cliente de
// venta: es design partner y puente. Por eso el cuestionario NO re-pregunta lo que ya
// diagnosticamos (pago adelantado, maridaje, alergias, si un sistema conectado le sirve).
// Persigue tres cosas: (1) aprender el vertical de un experto, (2) perfilar el dolor de
// los restaurantes "imperfectos" que aún no están ordenados, (3) conseguir referidos.
import { z } from "zod"

// --- Opciones de campos de selección ---
export const FD_OPTIONS = {
  // Áreas donde se traban los restaurantes que NO lo tienen resuelto (multi-selección).
  pain: [
    { value: "bodega", label: "Inventario de bodega (vinos y licores)" },
    { value: "cocina_tiempos", label: "Coordinación de la cocina por tiempos" },
    { value: "caja", label: "Cuadrar la caja y los cierres" },
    { value: "sistemas", label: "Sistemas sueltos que no se hablan entre sí" },
    { value: "personal", label: "Control de personal y roles" },
    { value: "sunat", label: "Facturación / boletas SUNAT" },
    { value: "reservas", label: "Reservas y no-shows" },
    { value: "mermas", label: "Food cost y mermas" },
    { value: "comensal", label: "Recordar preferencias / historial del comensal" },
  ],
  conoces: [
    { value: "si", label: "Sí" },
    { value: "no", label: "No" },
  ],
  presentar: [
    { value: "si", label: "Sí, con gusto" },
    { value: "tal-vez", label: "Tal vez, según el caso" },
    { value: "no", label: "Prefiero que no" },
  ],
  seguir: [
    { value: "si", label: "Sí, me interesa" },
    { value: "tal-vez", label: "Tal vez más adelante" },
    { value: "no", label: "Por ahora no" },
  ],
} as const

// Nombre del restaurante al que se personaliza el cuestionario (editable por query ?r=).
export const FD_DEFAULT_RESTAURANT = "Piedra"

const optionValues = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [string, ...string[]]

// --- Esquema de validación (compartido cliente ↔ servidor) ---
// Solo dos preguntas son obligatorias (las dos más valiosas: cómo se opera de verdad
// y qué no tienen resuelto los demás). El resto es opcional.
export const fineDiningSurveySchema = z.object({
  // Identidad (opcional, para atribuir la respuesta)
  respondent: z.string().max(120).optional().or(z.literal("")),
  role: z.string().max(120).optional().or(z.literal("")),
  restaurant: z.string().max(120).optional().or(z.literal("")),

  // Sección 1 — Cómo se opera de verdad un menú degustación (aprender el vertical)
  s1_ritmo_real: z.string().min(4, { message: "Cuéntanos aunque sea en una línea." }).max(2000),
  s1_maridaje_orq: z.string().max(2000).optional().or(z.literal("")),
  s1_alergias: z.string().max(2000).optional().or(z.literal("")),
  s1_metricas: z.string().max(2000).optional().or(z.literal("")),
  s1_magia: z.string().max(2000).optional().or(z.literal("")),
  s1_descartado: z.string().max(2000).optional().or(z.literal("")),
  s1_reglas: z.string().max(2000).optional().or(z.literal("")),

  // Sección 2 — Dónde se traban los que aún no lo tienen resuelto (perfilar imperfectos)
  s2_otros_no_resuelto: z.string().min(4, { message: "Esta es clave: dinos aunque sea una." }).max(2000),
  s2_pain: z.array(z.enum(optionValues(FD_OPTIONS.pain))).optional().default([]),
  s2_lo_dificil: z.string().max(2000).optional().or(z.literal("")),

  // Sección 3 — El puente (referidos)
  s3_conoces: z.enum(optionValues(FD_OPTIONS.conoces)).optional().or(z.literal("")),
  s3_presentar: z.enum(optionValues(FD_OPTIONS.presentar)).optional().or(z.literal("")),
  s3_contactos: z.string().max(1500).optional().or(z.literal("")),

  // Sección 4 — Seguir aprendiendo juntos (design partner, sin compromiso)
  s4_seguir: z.enum(optionValues(FD_OPTIONS.seguir)).optional().or(z.literal("")),
  s4_optimizar: z.string().max(2000).optional().or(z.literal("")),

  // Cierre
  cierre_libre: z.string().max(2000).optional().or(z.literal("")),

  // Honeypot anti-spam (debe llegar vacío)
  website: z.string().max(0).optional().or(z.literal("")),
})

export type FineDiningSurveyData = z.infer<typeof fineDiningSurveySchema>

// --- Definición de secciones para formatear el correo en orden legible ---
type FieldKind = "text" | "option" | "multi"
type FieldDef = { id: keyof FineDiningSurveyData; label: string; kind: FieldKind; options?: readonly { value: string; label: string }[] }

export const FD_EMAIL_SECTIONS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "Sección 1 — Cómo se opera de verdad un menú degustación",
    fields: [
      { id: "s1_ritmo_real", label: "La cocina por tiempos: ¿cómo se coordina de verdad el ritmo entre cocina y salón, y dónde se rompe?", kind: "text" },
      { id: "s1_maridaje_orq", label: "Maridaje y upselling de bebidas: ¿cómo se orquesta sin romper el ritmo del menú?", kind: "text" },
      { id: "s1_alergias", label: "Cómo manejan las alergias/restricciones desde la reserva hasta la cocina", kind: "text" },
      { id: "s1_metricas", label: "Más allá de la venta del día, ¿qué números/señales mira para saber si le va bien?", kind: "text" },
      { id: "s1_magia", label: "Si pudiera resolver mágicamente un solo problema operativo, ¿cuál sería?", kind: "text" },
      { id: "s1_descartado", label: "Qué software/herramientas evaluó y descartó, y por qué no le convencieron", kind: "text" },
      { id: "s1_reglas", label: "Las 2-3 reglas del sector que casi nadie entiende al principio", kind: "text" },
    ],
  },
  {
    title: "Sección 2 — Dónde se traban los que aún NO lo tienen resuelto",
    fields: [
      { id: "s2_otros_no_resuelto", label: "Qué cosas que él ya resolvió ve que OTROS restaurantes de menú degustación todavía NO tienen resueltas", kind: "text" },
      { id: "s2_pain", label: "En qué se les va la vida a los restaurantes parecidos que la pasan mal", kind: "multi", options: FD_OPTIONS.pain },
      { id: "s2_lo_dificil", label: "Qué le costó dominar a él que cree que a la mayoría se le escapa", kind: "text" },
    ],
  },
  {
    title: "Sección 3 — El puente (referidos)",
    fields: [
      { id: "s3_conoces", label: "¿Conoce restaurantes de alto ticket peleando con bodega, cocina por tiempos o sistemas dispersos?", kind: "option", options: FD_OPTIONS.conoces },
      { id: "s3_presentar", label: "¿Estaría dispuesto a presentarnos?", kind: "option", options: FD_OPTIONS.presentar },
      { id: "s3_contactos", label: "Nombres o contactos que se le ocurran", kind: "text" },
    ],
  },
  {
    title: "Sección 4 — Seguir aprendiendo juntos (design partner)",
    fields: [
      { id: "s4_seguir", label: "¿Le interesa seguir intercambiando ideas de optimización, sin compromiso comercial?", kind: "option", options: FD_OPTIONS.seguir },
      { id: "s4_optimizar", label: "Algo de su propia operación que le gustaría repensar u optimizar, aunque hoy funcione", kind: "text" },
    ],
  },
  {
    title: "Cierre",
    fields: [
      { id: "cierre_libre", label: "Espacio libre para lo que quiera agregar", kind: "text" },
    ],
  },
]

// Resuelve el valor almacenado a una etiqueta legible para el correo.
export function resolveAnswer(field: FieldDef, raw: unknown): string {
  if (field.kind === "multi") {
    const arr = Array.isArray(raw) ? (raw as string[]) : []
    if (!arr.length) return ""
    return arr.map((v) => field.options?.find((o) => o.value === v)?.label ?? v).join(", ")
  }
  const value = typeof raw === "string" ? raw.trim() : ""
  if (!value) return ""
  if (field.kind === "option") {
    return field.options?.find((o) => o.value === value)?.label ?? value
  }
  return value
}
