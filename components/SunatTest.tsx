"use client"

import AssessmentQuiz, { type QuizProfile } from "@/components/assessment-quiz"

// ── Assessment "¿Cómo está tu cumplimiento SUNAT?" ──────────────
// Mide fricción y riesgo operativo alrededor del cumplimiento:
// doble digitación, PLE/SIRE a mano, datos sin validar, cierres
// que no cuadran. Configuración sobre AssessmentQuiz.

const QUESTIONS: string[] = [
  "Emito los comprobantes electrónicos en un portal o app aparte, y luego digito la venta otra vez en mi control interno (Excel u otro sistema).",
  "Mi registro de ventas y compras para el PLE/SIRE se arma a mano cada mes: Excel, capturas y correos con el contador.",
  "He encontrado diferencias entre lo que declaré y lo que mi control interno dice que vendí.",
  "Registro clientes o proveedores sin validar su RUC o DNI contra SUNAT/RENIEC — a veces con datos mal escritos.",
  "Las notas de crédito y anulaciones se llevan aparte, y alguna se ha perdido en el camino.",
  "Juntar lo que me pide el contador (detalle de ventas, cierres de caja, kardex) me toma días cada mes.",
  "Si SUNAT me pidiera sustentar un periodo completo, reconstruirlo me tomaría semanas.",
  "Facturo con más de una herramienta según el local o el canal (tienda, delivery, web), y consolidar es manual.",
]

const OPTIONS = [
  { label: "Sí, me pasa", points: 2 },
  { label: "A veces", points: 1 },
  { label: "No", points: 0 },
] as const

const PROFILES: QuizProfile[] = [
  {
    key: "ordenado",
    range: [0, 4],
    label: "Resultado — Ordenado",
    title: "Tu cumplimiento se ve sano.",
    body:
      "Emites, registras y cierras sin fricción visible — eso ya te pone por delante de la mayoría. El único riesgo es crecer: más volumen, más locales o más canales suelen romper procesos que hoy funcionan a mano. Si eso está en tu horizonte, vale una conversación preventiva; si no, sigue así.",
    ctas: [{ kind: "internal", href: "/#cumplimiento", label: "Ver cómo integramos cumplimiento" }],
  },
  {
    key: "friccion",
    range: [5, 10],
    label: "Resultado — Fricción operativa",
    title: "Cumples, pero estás pagando un impuesto oculto.",
    body:
      "Declaras a tiempo — a costa de horas de digitación doble, cuadres manuales y un cierre de mes que depende de heroísmos. Ese costo es invisible en el estado de resultados pero se paga todos los meses. Una conversación de 30 minutos alcanza para ver cuánta de esa fricción se elimina integrando la emisión, el registro y el control en un solo lugar.",
    ctas: [{ kind: "whatsapp", label: "Agendar llamada gratis de 30 min", primary: true }],
  },
  {
    key: "riesgo",
    range: [11, 16],
    label: "Resultado — Riesgo real",
    title: "Hay huecos que pueden costarte multas.",
    body:
      "Diferencias entre lo declarado y lo vendido, documentos que se pierden, periodos difíciles de sustentar: ese perfil no es solo ineficiencia — es exposición ante SUNAT. El diagnóstico profundo incluye justamente una auditoría de cumplimiento: dónde están los huecos, qué riesgo representan y cómo se cierran integrando la operación.",
    ctas: [
      { kind: "internal", href: "/diagnostico", label: "Ver el diagnóstico profundo", primary: true },
      { kind: "whatsapp", label: "Conversar mi resultado" },
    ],
  },
]

export default function SunatTest() {
  return (
    <AssessmentQuiz
      testName="¿Cómo está tu cumplimiento SUNAT?"
      questions={QUESTIONS}
      options={OPTIONS}
      profiles={PROFILES}
    />
  )
}
