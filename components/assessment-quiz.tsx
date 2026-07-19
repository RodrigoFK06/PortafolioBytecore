"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, MessageCircle, RotateCcw } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

// ── AssessmentQuiz — motor genérico de self-assessments ─────────
// Un solo motor para los lead magnets interactivos (test "¿Necesitas
// un sistema?", assessment SUNAT, ...). El resultado es honesto por
// diseño: el perfil "todavía no" es parte de la propuesta de valor.
// La captura de lead es opcional y usa el endpoint de contacto
// existente (llega como lead calificado con su puntaje).

export interface QuizCta {
  kind: "internal" | "whatsapp"
  /** kind=internal: ruta destino. kind=whatsapp: se construye con waMessage */
  href?: string
  label: string
  primary?: boolean
}

export interface QuizProfile {
  key: string
  range: [number, number]
  label: string
  title: string
  body: string
  ctas: QuizCta[]
}

interface AssessmentQuizProps {
  /** Identificador humano del test (va en el asunto del lead y el WhatsApp) */
  testName: string
  questions: string[]
  options: ReadonlyArray<{ label: string; points: number }>
  profiles: QuizProfile[]
  /** Activa el mini-form de captura de lead en la pantalla de resultado */
  leadCapture?: boolean
}

export default function AssessmentQuiz({
  testName,
  questions,
  options,
  profiles,
  leadCapture = true,
}: AssessmentQuizProps) {
  const [answers, setAnswers] = useState<number[]>([])
  const [current, setCurrent] = useState(0)

  const maxPoints = Math.max(...options.map((o) => o.points))
  const maxScore = questions.length * maxPoints
  const done = answers.length === questions.length && current >= questions.length
  const score = answers.reduce((a, b) => a + b, 0)
  const profile =
    profiles.find((p) => score >= p.range[0] && score <= p.range[1]) ?? profiles[profiles.length - 1]
  const profileShort = profile.label.replace(/^Resultado — /, "")

  const answer = (points: number) => {
    const next = [...answers]
    next[current] = points
    setAnswers(next)
    setCurrent(current + 1)
  }

  const reset = () => {
    setAnswers([])
    setCurrent(0)
  }

  const waHref = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    `Hola Rodrigo, hice el test "${testName}" y salí ${score}/${maxScore} (${profileShort}). Me gustaría conversarlo.`
  )}`

  if (done) {
    return (
      <div className="bg-card p-8 md:p-12 rounded-lg shadow-hairline-md" role="status" aria-live="polite">
        <div className="flex items-center justify-between mb-8">
          <p className="spec-label text-brand">{profile.label}</p>
          <p className="font-mono tabular text-2xl font-medium text-foreground">
            {score}
            <span className="text-muted-foreground text-base">/{maxScore}</span>
          </p>
        </div>

        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden mb-8" aria-hidden="true">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
            style={{ width: `${(score / maxScore) * 100}%` }}
          />
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{profile.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-prose">{profile.body}</p>

        <div className="flex flex-wrap gap-3 mb-2">
          {profile.ctas.map((cta) =>
            cta.kind === "whatsapp" ? (
              <a
                key={cta.label}
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  cta.primary
                    ? "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
                    : "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
                }
              >
                <MessageCircle className={`h-4 w-4 ${cta.primary ? "" : "text-brand"}`} aria-hidden="true" />
                {cta.label}
              </a>
            ) : (
              <Link
                key={cta.label}
                href={cta.href ?? "/"}
                className={
                  cta.primary
                    ? "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
                    : "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
                }
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )
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

        {leadCapture && (
          <LeadCaptureForm testName={testName} score={score} maxScore={maxScore} profileShort={profileShort} />
        )}
      </div>
    )
  }

  return (
    <div className="bg-card p-8 md:p-12 rounded-lg shadow-hairline-md">
      <div className="flex items-center justify-between mb-3">
        <p className="spec-label">
          Pregunta <span className="tabular">{String(current + 1).padStart(2, "0")}</span> / {questions.length}
        </p>
        {current > 0 && (
          <button
            type="button"
            onClick={() => setCurrent(current - 1)}
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
          style={{ width: `${(current / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug mb-10 min-h-[4.5rem]">
        {questions[current]}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => (
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

// ── Captura de lead sobre el endpoint de contacto existente ─────
function LeadCaptureForm({
  testName,
  score,
  maxScore,
  profileShort,
}: {
  testName: string
  score: number
  maxScore: number
  profileShort: string
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent || status === "sending") return
    setStatus("sending")
    try {
      const res = await fetch(SITE_CONFIG.email.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: `Lead del test: ${testName} — ${score}/${maxScore}`,
          message: `Resultado del self-assessment "${testName}": ${score}/${maxScore} (${profileShort}). El prospecto pidió una lectura de su caso por correo.`,
        }),
      })
      const result = await res.json()
      setStatus(result.success ? "sent" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-8 pt-8 border-t border-border flex items-start gap-3" role="status">
        <Check className="h-5 w-5 text-brand mt-0.5 shrink-0" aria-hidden="true" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Listo, <span className="text-foreground font-medium">{name.split(" ")[0]}</span>. Te
          escribimos en menos de 24 horas hábiles con una lectura honesta de tu resultado.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="mt-8 pt-8 border-t border-border">
      <p className="text-sm text-foreground font-medium mb-1.5">
        ¿Quieres una lectura de tu resultado?
      </p>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        Déjanos tu correo y te escribimos en menos de 24 horas hábiles — una opinión honesta de tu
        caso, no una secuencia de ventas.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          type="text"
          required
          minLength={2}
          maxLength={50}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          aria-label="Tu nombre"
          className="flex-1 px-4 py-2.5 rounded-md bg-background shadow-hairline text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="email"
          required
          maxLength={100}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          aria-label="Tu correo"
          className="flex-1 px-4 py-2.5 rounded-md bg-background shadow-hairline text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={!consent || status === "sending"}
          className="px-6 py-2.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {status === "sending" ? "Enviando…" : "Recibir lectura"}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-[hsl(var(--brand))]"
        />
        <span>
          Acepto que usen mis datos solo para responder esta consulta —{" "}
          <Link href="/politicadeprivacidad" className="text-brand hover:underline">
            política de privacidad
          </Link>
          .
        </span>
      </label>
      {status === "error" && (
        <p className="mt-2 text-xs text-destructive">
          No pudimos enviar tus datos. Inténtalo de nuevo o escríbenos por WhatsApp.
        </p>
      )}
    </form>
  )
}
