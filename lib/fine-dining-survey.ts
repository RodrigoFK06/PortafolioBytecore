// lib/fine-dining-survey.ts
// Fuente única de verdad del cuestionario "Tu mirada experta sobre el fine dining".
// Comparten este archivo: el componente cliente (render + validación) y la API/correo
// (validación + formateo del email), para que labels y opciones nunca se desincronicen.
import { z } from "zod"

// --- Opciones de campos de selección ---
export const FD_OPTIONS = {
  ritmo: [
    { value: "viva-voz", label: "A viva voz" },
    { value: "papel", label: "Papel / comandas" },
    { value: "sistema", label: "Algún sistema o software" },
    { value: "otro", label: "Otro" },
  ],
  maridaje: [
    { value: "aparte", label: "Se cobran aparte al final" },
    { value: "incluido", label: "Van incluidos en el menú" },
    { value: "depende", label: "Depende / ofrecemos ambas opciones" },
  ],
  pago: [
    { value: "adelantado", label: "100% del menú por adelantado" },
    { value: "deposito", label: "Un depósito parcial al reservar" },
    { value: "final", label: "Se cobra todo al final" },
  ],
  menuCambio: [
    { value: "semana", label: "Cada semana" },
    { value: "mes", label: "Cada mes" },
    { value: "temporada", label: "Por temporada" },
    { value: "fijo", label: "Es fijo" },
  ],
  silos: [
    { value: "coincide", label: "Sí, coincide con lo que veo" },
    { value: "parcial", label: "Parcialmente / a veces" },
    { value: "no", label: "No, no lo veo así" },
  ],
  conoces: [
    { value: "si", label: "Sí" },
    { value: "no", label: "No" },
  ],
  presentar: [
    { value: "si", label: "Sí" },
    { value: "tal-vez", label: "Tal vez" },
    { value: "no", label: "No" },
  ],
} as const

// Escala Likert 1–5 usada en las preguntas de validación (Sección 3).
export const FD_SCALE = [
  { value: "1", label: "Muy en desacuerdo" },
  { value: "2", label: "En desacuerdo" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "De acuerdo" },
  { value: "5", label: "Muy de acuerdo" },
] as const

// Nombre del restaurante al que se personaliza el cuestionario (editable por query ?r=).
export const FD_DEFAULT_RESTAURANT = "Piedra"

const optionValues = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [string, ...string[]]

// --- Esquema de validación (compartido cliente ↔ servidor) ---
// Solo dos preguntas son obligatorias (la de apertura y "la más importante"),
// para respetar la promesa de "pocas preguntas, la mayoría rápidas".
export const fineDiningSurveySchema = z.object({
  // Identidad (opcional, para atribuir la respuesta)
  respondent: z.string().max(120).optional().or(z.literal("")),
  role: z.string().max(120).optional().or(z.literal("")),
  restaurant: z.string().max(120).optional().or(z.literal("")),

  // Sección 1 — Tu mirada del sector
  s1_dificil: z.string().min(4, { message: "Cuéntanos aunque sea en una línea." }).max(2000),
  s1_magia: z.string().max(2000).optional().or(z.literal("")),
  s1_descartado: z.string().max(2000).optional().or(z.literal("")),
  s1_manual: z.string().max(2000).optional().or(z.literal("")),

  // Sección 2 — Cómo funciona por dentro
  s2_ritmo: z.enum(optionValues(FD_OPTIONS.ritmo)).optional().or(z.literal("")),
  s2_ritmo_otro: z.string().max(300).optional().or(z.literal("")),
  s2_maridaje: z.enum(optionValues(FD_OPTIONS.maridaje)).optional().or(z.literal("")),
  s2_pago: z.enum(optionValues(FD_OPTIONS.pago)).optional().or(z.literal("")),
  s2_alergias: z.string().max(1000).optional().or(z.literal("")),
  s2_menu_cambio: z.enum(optionValues(FD_OPTIONS.menuCambio)).optional().or(z.literal("")),

  // Sección 3 — Validá nuestra lectura
  s3_desperdicio: z.enum(optionValues(FD_SCALE)).optional().or(z.literal("")),
  s3_silos: z.enum(optionValues(FD_OPTIONS.silos)).optional().or(z.literal("")),
  s3_silos_comentario: z.string().max(1000).optional().or(z.literal("")),
  s3_conectar: z.enum(optionValues(FD_SCALE)).optional().or(z.literal("")),
  s3_falta: z.string().min(4, { message: "Esta es la más importante: dinos aunque sea una idea." }).max(2000),

  // Sección 4 — El puente
  s4_conoces: z.enum(optionValues(FD_OPTIONS.conoces)).optional().or(z.literal("")),
  s4_presentar: z.enum(optionValues(FD_OPTIONS.presentar)).optional().or(z.literal("")),
  s4_contactos: z.string().max(1500).optional().or(z.literal("")),

  // Cierre
  cierre_libre: z.string().max(2000).optional().or(z.literal("")),

  // Honeypot anti-spam (debe llegar vacío)
  website: z.string().max(0).optional().or(z.literal("")),
})

export type FineDiningSurveyData = z.infer<typeof fineDiningSurveySchema>

// --- Definición de secciones para formatear el correo en orden legible ---
type FieldKind = "text" | "option" | "scale"
type FieldDef = { id: keyof FineDiningSurveyData; label: string; kind: FieldKind; options?: readonly { value: string; label: string }[] }

export const FD_EMAIL_SECTIONS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "Sección 1 — Tu mirada del sector",
    fields: [
      { id: "s1_dificil", label: "¿Qué es lo más difícil de operar bien en un restaurante de menú degustación?", kind: "text" },
      { id: "s1_magia", label: "Si pudieras resolver mágicamente un solo problema operativo, ¿cuál sería?", kind: "text" },
      { id: "s1_descartado", label: "¿Qué software/herramientas evaluaste y descartaste, y por qué?", kind: "text" },
      { id: "s1_manual", label: "¿Qué resuelves hoy a mano/Excel/Notion que te gustaría que un sistema hiciera solo?", kind: "text" },
    ],
  },
  {
    title: "Sección 2 — Cómo funciona por dentro",
    fields: [
      { id: "s2_ritmo", label: "¿Cómo coordinan hoy salón y cocina el ritmo de los tiempos?", kind: "option", options: FD_OPTIONS.ritmo },
      { id: "s2_ritmo_otro", label: "Ritmo — detalle (otro)", kind: "text" },
      { id: "s2_maridaje", label: "El maridaje y las bebidas extra, ¿se cobran aparte o van incluidos?", kind: "option", options: FD_OPTIONS.maridaje },
      { id: "s2_pago", label: "¿Cobran el 100% por adelantado, un depósito parcial, o al final?", kind: "option", options: FD_OPTIONS.pago },
      { id: "s2_alergias", label: "¿Cómo manejan alergias/restricciones desde la reserva hasta la cocina?", kind: "text" },
      { id: "s2_menu_cambio", label: "¿Cada cuánto cambian el menú?", kind: "option", options: FD_OPTIONS.menuCambio },
    ],
  },
  {
    title: "Sección 3 — Validá nuestra lectura",
    fields: [
      { id: "s3_desperdicio", label: "\"Saber con anticipación cuántos comensales vienen permite comprar/preparar casi sin desperdicio.\"", kind: "scale", options: FD_SCALE },
      { id: "s3_silos", label: "\"El mayor lío es que reservas, POS y contabilidad viven en sistemas separados que no se hablan.\"", kind: "option", options: FD_OPTIONS.silos },
      { id: "s3_silos_comentario", label: "Comentario sobre los sistemas separados", kind: "text" },
      { id: "s3_conectar", label: "\"Un sistema que conecte reserva → cocina → facturación en un solo lugar sería valioso.\"", kind: "scale", options: FD_SCALE },
      { id: "s3_falta", label: "La más importante: ¿Qué le falta a esta idea? ¿Qué estamos pasando por alto?", kind: "text" },
    ],
  },
  {
    title: "Sección 4 — El puente",
    fields: [
      { id: "s4_conoces", label: "¿Conoces otros restaurantes de tu estilo que NO tengan tan resuelta su operación?", kind: "option", options: FD_OPTIONS.conoces },
      { id: "s4_presentar", label: "¿Estarías dispuesto a presentarnos?", kind: "option", options: FD_OPTIONS.presentar },
      { id: "s4_contactos", label: "Nombres o contactos que se te ocurran", kind: "text" },
    ],
  },
  {
    title: "Cierre",
    fields: [
      { id: "cierre_libre", label: "Espacio libre para lo que quieras agregar", kind: "text" },
    ],
  },
]

// Resuelve el valor almacenado a una etiqueta legible para el correo.
export function resolveAnswer(field: FieldDef, raw: unknown): string {
  const value = typeof raw === "string" ? raw.trim() : ""
  if (!value) return ""
  if (field.kind === "option") {
    return field.options?.find((o) => o.value === value)?.label ?? value
  }
  if (field.kind === "scale") {
    const opt = field.options?.find((o) => o.value === value)
    return opt ? `${value}/5 — ${opt.label}` : value
  }
  return value
}
