"use client"

import AssessmentQuiz, { type QuizProfile } from "@/components/assessment-quiz"

// ── Test "¿Necesitas un sistema?" ───────────────────────────────
// Configuración sobre el motor genérico AssessmentQuiz, basada en
// la checklist del post "5 señales".

const QUESTIONS: string[] = [
  "Mi información vive en varios lugares que no se hablan: ventas en un cuaderno, clientes en WhatsApp, inventario en un Excel.",
  "Para responder “¿cómo vamos este mes?” tengo que armar el número a mano, cruzando fuentes.",
  "La operación depende de que una persona específica “se acuerde” de cómo se hacen las cosas.",
  "Cometemos los mismos errores manuales una y otra vez: facturas mal emitidas, pedidos perdidos, citas duplicadas.",
  "Pago suscripciones de software con módulos que nunca uso.",
  "Mi equipo pierde horas cada semana digitando lo mismo en dos sitios distintos.",
  "El cierre de mes con mi contador es una reconstrucción: capturas de pantalla, correos y versiones de Excel.",
  "He perdido ventas o clientes por demoras o descoordinación interna.",
  "Si mañana se duplicara mi volumen, mi forma actual de operar no aguantaría.",
  "Ya intenté resolver esto con un sistema enlatado y terminé volviendo al Excel.",
]

const OPTIONS = [
  { label: "Sí, me pasa", points: 2 },
  { label: "A veces", points: 1 },
  { label: "No", points: 0 },
] as const

const PROFILES: QuizProfile[] = [
  {
    key: "todavia-no",
    range: [0, 5],
    label: "Resultado — Todavía no",
    title: "No compres software todavía.",
    body:
      "En serio. Tu operación aún cabe en herramientas simples. Ordena tu Excel, define tu proceso a mano y vuelve cuando el volumen lo justifique — construir antes de tiempo es tan caro como construir tarde. Si quieres, te dejamos la checklist completa para revisar en unos meses.",
    ctas: [
      { kind: "internal", href: "/blog/5-senales-tu-negocio-necesita-un-sistema", label: "Leer la checklist completa" },
    ],
  },
  {
    key: "zona-gris",
    range: [6, 12],
    label: "Resultado — Zona gris",
    title: "Hay fricción real, pero quizá no pide un sistema completo.",
    body:
      "Tu operación ya muestra señales de desorden que cuestan tiempo y plata, pero parte podría resolverse ajustando lo que ya tienes. Este es exactamente el caso donde una conversación honesta de 30 minutos vale más que cualquier cotización: te decimos si es ajuste o sistema — y si es ajuste, te ahorras el sistema.",
    ctas: [{ kind: "whatsapp", label: "Agendar llamada gratis de 30 min", primary: true }],
  },
  {
    key: "ya-toca",
    range: [13, 20],
    label: "Resultado — Ya te quedó chico el Excel",
    title: "Tu operación ya pide un sistema.",
    body:
      "Con este puntaje, lo más probable es que estés pagando el desorden todos los meses: horas digitando doble, errores recurrentes y decisiones que llegan tarde. El siguiente paso con mejor retorno no es cotizar un sistema a ciegas — es un diagnóstico que ponga números a lo que se pierde y un plan priorizado para arreglarlo.",
    ctas: [
      { kind: "internal", href: "/diagnostico", label: "Ver el diagnóstico profundo", primary: true },
      { kind: "whatsapp", label: "Conversar mi resultado" },
    ],
  },
]

export default function SystemTest() {
  return (
    <AssessmentQuiz
      testName="¿Necesitas un sistema?"
      questions={QUESTIONS}
      options={OPTIONS}
      profiles={PROFILES}
    />
  )
}
