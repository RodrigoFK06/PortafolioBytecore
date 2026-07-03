"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm, useWatch, type Control } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingSpinner } from "@/components/ui/loading"
import { cn } from "@/lib/utils"
import {
  fineDiningSurveySchema,
  type FineDiningSurveyData,
  FD_OPTIONS,
} from "@/lib/fine-dining-survey"

type Ctrl = Control<FineDiningSurveyData>
type FieldName = keyof FineDiningSurveyData

function RequiredMark() {
  return <span className="text-brand ml-0.5" aria-hidden="true">*</span>
}

// Preguntas que cuentan para la barra de progreso.
const QUESTION_KEYS: FieldName[] = [
  "s1_ritmo_real", "s1_metricas", "s1_maridaje_orq", "s1_reglas",
  "s2_otros_no_resuelto", "s2_pain", "s2_lo_dificil",
  "s3_conoces", "s3_presentar", "s3_contactos",
  "s4_seguir", "s4_optimizar",
  "cierre_libre",
]

const textareaCls =
  "min-h-[92px] rounded-lg border-black/10 dark:border-white/10 bg-transparent text-[15px] leading-relaxed resize-y focus-visible:ring-brand/60 focus-visible:ring-offset-0 focus-visible:border-brand/50 transition-colors"

const inputCls =
  "h-11 rounded-lg border-black/10 dark:border-white/10 bg-transparent focus-visible:ring-brand/60 focus-visible:ring-offset-0 focus-visible:border-brand/50"

const cardCls =
  "rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm shadow-sm"

// Tarjeta de una sola pregunta (estilo Google Forms).
const qCardBase =
  "rounded-xl border bg-white/70 dark:bg-white/[0.025] shadow-sm px-5 py-5 sm:px-6 transition-colors"

function QCard({ accent, children }: { accent?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        qCardBase,
        accent
          ? "border-brand/30 bg-brand/[0.035] dark:bg-brand/[0.06]"
          : "border-black/[0.07] dark:border-white/[0.08]",
      )}
    >
      {children}
    </div>
  )
}

const qLabelCls = "text-[15px] font-semibold text-foreground leading-snug block"

// --- Componentes de campo (a nivel de módulo: identidad estable, sin remontar) ---

function OpenField({
  control, name, label, placeholder, required, rows,
}: {
  control: Ctrl
  name: FieldName
  label: string
  placeholder?: string
  required?: boolean
  rows?: number
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <QCard accent={required}>
          <FormItem className="space-y-3">
            <FormLabel className={qLabelCls}>
              {label}{required && <RequiredMark />}
            </FormLabel>
            <FormControl>
              <Textarea rows={rows ?? 3} placeholder={placeholder} className={textareaCls} {...field} value={(field.value as string) ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        </QCard>
      )}
    />
  )
}

function ChoiceField({
  control, name, label, options,
}: {
  control: Ctrl
  name: FieldName
  label: string
  options: readonly { value: string; label: string }[]
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <QCard>
          <FormItem className="space-y-3.5">
            <FormLabel className={qLabelCls}>{label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={(field.value as string) ?? ""}
                className="grid gap-1.5"
              >
                {options.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`${name}-${opt.value}`}
                    className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 cursor-pointer transition-colors duration-150 hover:bg-brand/[0.05] has-[[data-state=checked]]:border-brand/50 has-[[data-state=checked]]:bg-brand/[0.08] font-normal"
                  >
                    <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
                    <span className="text-sm text-foreground/85 group-has-[[data-state=checked]]:text-foreground group-has-[[data-state=checked]]:font-medium">
                      {opt.label}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </QCard>
      )}
    />
  )
}

function CheckboxField({
  control, name, label, hint, options,
}: {
  control: Ctrl
  name: FieldName
  label: string
  hint?: string
  options: readonly { value: string; label: string }[]
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected: string[] = Array.isArray(field.value) ? field.value : []
        const toggle = (v: string) =>
          field.onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v])
        return (
          <QCard>
            <FormItem className="space-y-3.5">
              <div>
                <FormLabel className={qLabelCls}>{label}</FormLabel>
                {hint && <p className="text-[13px] text-foreground/50 mt-1">{hint}</p>}
              </div>
              <div className="grid gap-1.5">
                {options.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`${name}-${opt.value}`}
                    className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 cursor-pointer transition-colors duration-150 hover:bg-brand/[0.05] has-[[data-state=checked]]:border-brand/50 has-[[data-state=checked]]:bg-brand/[0.08] font-normal"
                  >
                    <Checkbox
                      id={`${name}-${opt.value}`}
                      checked={selected.includes(opt.value)}
                      onCheckedChange={() => toggle(opt.value)}
                    />
                    <span className="text-sm text-foreground/85 group-has-[[data-state=checked]]:text-foreground group-has-[[data-state=checked]]:font-medium">
                      {opt.label}
                    </span>
                  </Label>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          </QCard>
        )
      }}
    />
  )
}

// Encabezado de sección (no es tarjeta: separa grupos de preguntas).
function Section({
  index, title, subtitle, children,
}: {
  index: number
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 px-1 pt-4">
        <span className="shrink-0 grid place-items-center h-8 w-8 rounded-lg bg-brand/10 text-brand font-mono text-xs font-bold ring-1 ring-brand/20">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">{title}</h2>
          <p className="text-[13px] text-foreground/55 leading-tight">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.section>
  )
}

// Progreso aislado: sólo este componente se re-renderiza al escribir (useWatch).
function ProgressTracker({ control }: { control: Ctrl }) {
  const values = useWatch({ control })
  const answered = QUESTION_KEYS.filter((k) => {
    const v = values[k]
    if (Array.isArray(v)) return v.length > 0
    return typeof v === "string" && v.trim() !== ""
  }).length
  const pct = Math.round((answered / QUESTION_KEYS.length) * 100)

  return (
    <>
      {/* Línea fija tipo "reading progress" */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <motion.div
          className="h-full bg-brand shadow-[0_0_10px_hsl(var(--brand))]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        />
      </div>

      {/* Contador al inicio del formulario */}
      <div className="rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] px-5 py-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-foreground/60">Tu progreso</span>
          <span className="text-xs font-mono text-brand">{answered}/{QUESTION_KEYS.length} respondidas</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-black/[0.08] dark:bg-white/[0.08] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-brand"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
      </div>
    </>
  )
}

type Props = { restaurant: string }

export function FineDiningSurvey({ restaurant }: Props) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FineDiningSurveyData>({
    resolver: zodResolver(fineDiningSurveySchema),
    defaultValues: {
      respondent: "", role: "", restaurant,
      s1_ritmo_real: "", s1_metricas: "", s1_maridaje_orq: "", s1_reglas: "",
      s2_otros_no_resuelto: "", s2_pain: [], s2_lo_dificil: "",
      s3_conoces: "", s3_presentar: "", s3_contactos: "",
      s4_seguir: "", s4_optimizar: "",
      cierre_libre: "", website: "",
    },
  })
  const control = form.control

  async function onSubmit(v: FineDiningSurveyData) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      })
      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        throw new Error(result.message || "Error al enviar")
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido"
      toast({
        title: "No se pudo enviar",
        description: msg.includes("Demasiados") ? msg : "Hubo un problema al enviar tus respuestas. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function onInvalid() {
    toast({
      title: "Faltan un par de respuestas",
      description: "Solo dos preguntas son obligatorias (marcadas con *). Revísalas y envía de nuevo.",
      variant: "destructive",
    })
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        aria-live="polite"
        className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-brand/5 border border-brand/20 text-center"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand text-brand-foreground mb-5 shadow-lg shadow-brand/25" aria-hidden="true">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Gracias, de verdad.</h3>
          <p className="text-foreground/70 leading-relaxed max-w-md mx-auto">
            Lo que nos compartiste es justo lo que necesitábamos para entender el sector de verdad.
            Si dejaste una puerta abierta para presentarnos a otros colegas, te escribiremos pronto.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6" noValidate>
        {/* Honeypot */}
        <input
          type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          {...form.register("website")}
        />

        <ProgressTracker control={control} />

        {/* Identidad */}
        <QCard>
          <p className="text-sm text-foreground/60 mb-4">Para saber a quién agradecerle <span className="text-foreground/40">(opcional)</span>.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="respondent"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[13px] font-medium text-foreground/80">Tu nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Cómo te llamamos" className={inputCls} {...field} value={(field.value as string) ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[13px] font-medium text-foreground/80">Tu rol</FormLabel>
                  <FormControl>
                    <Input placeholder="Chef, dueño, gerente…" className={inputCls} {...field} value={(field.value as string) ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </QCard>

        {/* Sección 1 — aprender el vertical */}
        <Section index={1} title="Cómo se opera de verdad" subtitle="Enséñanos el sector desde tu experiencia.">
          <OpenField control={control} name="s1_ritmo_real" label="La cocina por tiempos de un menú de varios pasos: ¿cómo se coordina de verdad el ritmo entre cocina y salón para que todo salga clavado? ¿Dónde se rompe cuando se rompe?" placeholder="Lo que solo se aprende operándolo." required rows={4} />
          <OpenField control={control} name="s1_metricas" label="Más allá de la venta del día, ¿qué números o señales miras para saber si al restaurante le está yendo bien?" />
          <OpenField control={control} name="s1_maridaje_orq" label="El maridaje y el upselling de bebidas a lo largo de la experiencia, ¿cómo se orquesta bien sin romper el ritmo del menú?" />
          <OpenField control={control} name="s1_reglas" label="Si le enseñaras a alguien que recién abre un fine dining, ¿cuáles son las 2-3 reglas que casi nadie entiende al principio?" />
        </Section>

        {/* Sección 2 — perfilar a los imperfectos */}
        <Section index={2} title="Dónde se traban los demás" subtitle="Lo que tú ya resolviste y otros todavía no.">
          <OpenField control={control} name="s2_otros_no_resuelto" label="Tú tienes tu operación muy afinada. ¿Qué cosas que tú ya resolviste ves que OTROS restaurantes de menú degustación todavía NO tienen resueltas?" placeholder="Aquí está el oro. Sé tan específico como puedas." required rows={4} />
          <CheckboxField control={control} name="s2_pain" label="Cuando piensas en restaurantes parecidos al tuyo que la pasan mal operativamente, ¿en qué se les va la vida?" hint="Marca todas las que apliquen." options={FD_OPTIONS.pain} />
          <OpenField control={control} name="s2_lo_dificil" label="¿Qué te costó a ti dominar que crees que a la mayoría todavía se le escapa?" />
        </Section>

        {/* Sección 3 — el puente */}
        <Section index={3} title="El puente" subtitle="Llegar a más colegas que sí lo necesitan.">
          <ChoiceField control={control} name="s3_conoces" label="¿Conoces restaurantes de menú degustación o alto ticket que estén peleando con su inventario de bodega, la coordinación de cocina o tener sus sistemas dispersos?" options={FD_OPTIONS.conoces} />
          <ChoiceField control={control} name="s3_presentar" label="¿Estarías dispuesto a presentarnos?" options={FD_OPTIONS.presentar} />
          <OpenField control={control} name="s3_contactos" label="(Opcional) Nombres o contactos que se te ocurran" rows={2} />
        </Section>

        {/* Sección 4 — design partner */}
        <Section index={4} title="Seguir aprendiendo juntos" subtitle="Un intercambio de ideas, sin venderte nada.">
          <ChoiceField control={control} name="s4_seguir" label="Nos encantaría seguir aprendiendo del sector contigo, intercambiando ideas de optimización sin ningún compromiso comercial. ¿Te haría sentido?" options={FD_OPTIONS.seguir} />
          <OpenField control={control} name="s4_optimizar" label="¿Hay algo de tu propia operación que te gustaría repensar u optimizar, aunque hoy funcione bien?" />
        </Section>

        {/* Cierre */}
        <Section index={5} title="Cierre" subtitle="La palabra final es tuya.">
          <OpenField control={control} name="cierre_libre" label="Espacio libre para lo que quieras agregar o para cualquier idea que te haya quedado dando vueltas." rows={4} />
        </Section>

        {/* Enviar */}
        <div className={cn(cardCls, "p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5")}>
          <p className="text-xs font-mono text-foreground/55 leading-relaxed">
            <span className="text-brand" aria-hidden="true">*</span> Solo dos preguntas son obligatorias.<br className="hidden sm:block" /> El resto, lo que quieras responder.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="shrink-0">
            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto px-8 shadow-lg shadow-brand/20">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Enviando…
                </span>
              ) : (
                "Enviar mis respuestas"
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </Form>
  )
}
