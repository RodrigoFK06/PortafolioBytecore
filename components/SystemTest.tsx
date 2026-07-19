"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, MessageCircle, RotateCcw } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

// ── Test "¿Necesitas un sistema?" ───────────────────────────────
// Self-assessment de 10 preguntas basado en la checklist del post
// "5 señales". Resultado honesto por perfil — incluida la respuesta
// "todavía no": el filtro es parte de la propuesta de valor.

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

const MAX_SCORE = QUESTIONS.length * 2

interface Profile {
  key: string
  range: [number, number]
  label: string
  title: string
  body: string
  cta: "none" | "gratis" | "profundo"
}

const PROFILES: Profile[] = [
  {
    key: "todavia-no",
    range: [0, 5],
    label: "Resultado — Todavía no",
    title: "No compres software todavía.",
    body:
      "En serio. Tu operación aún cabe en herramientas simples. Ordena tu Excel, define tu proceso a mano y vuelve cuando el volumen lo justifique — construir antes de tiempo es tan caro como construir tarde. Si quieres, te dejamos la checklist completa para revisar en unos meses.",
    cta: "none",
  },
  {
    key: "zona-gris",
    range: [6, 12],
    label: "Resultado — Zona gris",
    title: "Hay fricción real, pero quizá no pide un sistema completo.",
    body:
      "Tu operación ya muestra señales de desorden que cuestan tiempo y plata, pero parte podría resolverse ajustando lo que ya tienes. Este es exactamente el caso donde una conversación honesta de 30 minutos vale más que cualquier cotización: te decimos si es ajuste o sistema — y si es ajuste, te ahorras el sistema.",
    cta: "gratis",
  },
  {
    key: "ya-toca",
    range: [13, 20],
    label: "Resultado — Ya te quedó chico el Excel",
    title: "Tu operación ya pide un sistema.",
    body:
      "Con este puntaje, lo más probable es que estés pagando el desorden todos los meses: horas digitando doble, errores recurrentes y decisiones que llegan tarde. El siguiente paso con mejor retorno no es cotizar un sistema a ciegas — es un diagnóstico que ponga números a lo que se pierde y un plan priorizado para arreglarlo.",
    cta: "profundo",
  },
]

export default function SystemTest() {
  const [answers, setAnswers] = useState<number[]>([])
  const [current, setCurrent] = useState(0)

  const done = answers.length === QUESTIONS.length && current >= QUESTIONS.length
  const score = answers.reduce((a, b) => a + b, 0)
  const profile = PROFILES.find((p) => score >= p.range[0] && score <= p.range[1]) ?? PROFILES[1]

  const answer = (points: number) => {
    const next = [...answers]
    next[current] = points
    setAnswers(next)
    setCurrent(current + 1)
  }

  const back = () => {
    if (current > 0) setCurrent(current - 1)
  }

  const reset = () => {
    setAnswers([])
    setCurrent(0)
  }

  const waResultado = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    `Hola Rodrigo, hice el test "¿Necesitas un sistema?" y salí ${score}/${MAX_SCORE} (${profile.label.replace("Resultado — ", "")}). Me gustaría conversarlo.`
  )}`

  if (done) {
    return (
      <div className="bg-card p-8 md:p-12 rounded-lg shadow-hairline-md" role="status" aria-live="polite">
        <div className="flex items-center justify-between mb-8">
          <p className="spec-label text-brand">{profile.label}</p>
          <p className="font-mono tabular text-2xl font-medium text-foreground">
            {score}<span className="text-muted-foreground text-base">/{MAX_SCORE}</span>
          </p>
        </div>

        {/* Barra de puntaje */}
        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden mb-8" aria-hidden="true">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
            style={{ width: `${(score / MAX_SCORE) * 100}%` }}
          />
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{profile.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-prose">{profile.body}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          {profile.cta === "none" && (
            <Link
              href="/blog/5-senales-tu-negocio-necesita-un-sistema"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
            >
              Leer la checklist completa
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
          {profile.cta === "gratis" && (
            <a
              href={waResultado}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Agendar llamada gratis de 30 min
            </a>
          )}
          {profile.cta === "profundo" && (
            <>
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
              >
                Ver el diagnóstico profundo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={waResultado}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
              >
                <MessageCircle className="h-4 w-4 text-brand" aria-hidden="true" />
                Conversar mi resultado
              </a>
            </>
          )}
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Repetir
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card p-8 md:p-12 rounded-lg shadow-hairline-md">
      {/* Progreso */}
      <div className="flex items-center justify-between mb-3">
        <p className="spec-label">
          Pregunta <span className="tabular">{String(current + 1).padStart(2, "0")}</span> / {QUESTIONS.length}
        </p>
        {current > 0 && (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Anterior
          </button>
        )}
      </div>
      <div className="h-1 w-full rounded-full bg-secondary overflow-hidden mb-10" aria-hidden="true">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-300 ease-out"
          style={{ width: `${(current / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug mb-10 min-h-[4.5rem]">
        {QUESTIONS[current]}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => answer(opt.points)}
            className="px-6 py-4 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary hover:text-brand transition-all"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
