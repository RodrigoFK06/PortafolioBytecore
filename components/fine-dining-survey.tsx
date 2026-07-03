"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingSpinner } from "@/components/ui/loading"
import {
  fineDiningSurveySchema,
  type FineDiningSurveyData,
  FD_OPTIONS,
  FD_SCALE,
} from "@/lib/fine-dining-survey"

function RequiredMark() {
  return <span className="text-brand ml-0.5" aria-hidden="true">*</span>
}

// Cabecera de sección
function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-baseline gap-3 pt-2">
      <span className="font-mono text-sm text-brand">{String(index).padStart(2, "0")}</span>
      <h2 className="text-lg sm:text-xl font-bold text-foreground">{title}</h2>
    </div>
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
      respondent: "",
      role: "",
      restaurant,
      s1_dificil: "",
      s1_magia: "",
      s1_descartado: "",
      s1_manual: "",
      s2_ritmo: "",
      s2_ritmo_otro: "",
      s2_maridaje: "",
      s2_pago: "",
      s2_alergias: "",
      s2_menu_cambio: "",
      s3_desperdicio: "",
      s3_silos: "",
      s3_silos_comentario: "",
      s3_conectar: "",
      s3_falta: "",
      s4_conoces: "",
      s4_presentar: "",
      s4_contactos: "",
      cierre_libre: "",
      website: "",
    },
  })

  async function onSubmit(values: FineDiningSurveyData) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
      <div
        role="status"
        aria-live="polite"
        className="p-8 sm:p-10 rounded-2xl bg-brand/5 border border-brand/20 text-center"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand/15 text-brand mb-4 text-2xl" aria-hidden="true">✓</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Gracias, de verdad.</h3>
        <p className="text-foreground/75 leading-relaxed max-w-md mx-auto">
          Tu mirada es exactamente lo que necesitábamos para diseñar algo que sirva de verdad en un fine dining.
          Si dejaste una puerta abierta para presentarnos a otros colegas, te escribiremos pronto.
        </p>
      </div>
    )
  }

  // Helper de campo abierto (Textarea)
  const OpenField = ({
    name,
    label,
    placeholder,
    required,
    rows = 3,
  }: {
    name: keyof FineDiningSurveyData
    label: string
    placeholder?: string
    required?: boolean
    rows?: number
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium text-foreground/90 leading-snug">
            {label}
            {required && <RequiredMark />}
          </FormLabel>
          <FormControl>
            <Textarea rows={rows} placeholder={placeholder} {...field} value={(field.value as string) ?? ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  // Helper de opción múltiple (radios verticales)
  const ChoiceField = ({
    name,
    label,
    options,
  }: {
    name: keyof FineDiningSurveyData
    label: string
    options: readonly { value: string; label: string }[]
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium text-foreground/90 leading-snug">{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={(field.value as string) ?? ""}
              className="grid gap-2 pt-1"
            >
              {options.map((opt) => (
                <Label
                  key={opt.value}
                  htmlFor={`${name}-${opt.value}`}
                  className="flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-4 py-3 cursor-pointer transition-colors hover:border-brand/40 has-[[data-state=checked]]:border-brand has-[[data-state=checked]]:bg-brand/5 font-normal"
                >
                  <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
                  <span className="text-sm text-foreground/85">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  // Helper de escala Likert 1–5 (horizontal)
  const ScaleField = ({
    name,
    label,
  }: {
    name: keyof FineDiningSurveyData
    label: string
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium text-foreground/90 leading-snug">{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={(field.value as string) ?? ""}
              className="flex flex-wrap gap-2 pt-1"
            >
              {FD_SCALE.map((opt) => (
                <Label
                  key={opt.value}
                  htmlFor={`${name}-${opt.value}`}
                  className="flex flex-1 min-w-[6rem] flex-col items-center gap-1 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-2 py-3 text-center cursor-pointer transition-colors hover:border-brand/40 has-[[data-state=checked]]:border-brand has-[[data-state=checked]]:bg-brand/5 font-normal"
                >
                  <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} className="sr-only" />
                  <span className="text-lg font-bold text-foreground/80">{opt.value}</span>
                  <span className="text-[11px] leading-tight text-foreground/55">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-12" noValidate>
        {/* Honeypot anti-spam (oculto) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          {...form.register("website")}
        />

        {/* Identidad */}
        <section className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="respondent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu nombre (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Cómo te llamamos" {...field} value={(field.value as string) ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu rol (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Chef, gerente, sommelier…" {...field} value={(field.value as string) ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Sección 1 */}
        <section className="space-y-6">
          <SectionHeading index={1} title="Tu mirada del sector" />
          <OpenField
            name="s1_dificil"
            label="En tu experiencia, ¿qué es lo más difícil de operar bien en un restaurante de menú degustación?"
            placeholder="Lo primero que se te venga a la cabeza."
            required
          />
          <OpenField
            name="s1_magia"
            label="Si pudieras resolver mágicamente un solo problema operativo del fine dining, ¿cuál sería?"
          />
          <OpenField
            name="s1_descartado"
            label="¿Qué software o herramientas evaluaste y descartaste antes de quedarte con lo que usas hoy? ¿Por qué no te convencieron?"
          />
          <OpenField
            name="s1_manual"
            label="¿Hay algo que hoy resuelves a mano, en Excel o Notion, que te gustaría que un sistema hiciera solo?"
          />
        </section>

        {/* Sección 2 */}
        <section className="space-y-6">
          <SectionHeading index={2} title="Cómo funciona por dentro" />
          <ChoiceField
            name="s2_ritmo"
            label="¿Cómo coordinan hoy salón y cocina el ritmo de los tiempos?"
            options={FD_OPTIONS.ritmo}
          />
          {form.watch("s2_ritmo") === "otro" && (
            <OpenField name="s2_ritmo_otro" label="Cuéntanos cómo lo hacen (otro)" rows={2} />
          )}
          <ChoiceField
            name="s2_maridaje"
            label="El maridaje y las bebidas extra, ¿se cobran aparte al final o van incluidos en el menú?"
            options={FD_OPTIONS.maridaje}
          />
          <ChoiceField
            name="s2_pago"
            label="¿Cobran el 100% del menú por adelantado, un depósito parcial, o al final?"
            options={FD_OPTIONS.pago}
          />
          <OpenField
            name="s2_alergias"
            label="¿Cómo manejan las alergias/restricciones desde que el cliente reserva hasta que llega a la cocina?"
            rows={2}
          />
          <ChoiceField
            name="s2_menu_cambio"
            label="¿Cada cuánto cambian el menú?"
            options={FD_OPTIONS.menuCambio}
          />
        </section>

        {/* Sección 3 */}
        <section className="space-y-6">
          <SectionHeading index={3} title="Validá nuestra lectura" />
          <ScaleField
            name="s3_desperdicio"
            label="“Saber con anticipación cuántos comensales vienen permite comprar y preparar casi sin desperdicio.” ¿De acuerdo?"
          />
          <ChoiceField
            name="s3_silos"
            label="“El mayor lío del sector es que reservas, punto de venta y contabilidad viven en sistemas separados que no se hablan.” ¿Coincide con lo que ves?"
            options={FD_OPTIONS.silos}
          />
          <OpenField
            name="s3_silos_comentario"
            label="¿Quieres agregar algo sobre eso? (opcional)"
            rows={2}
          />
          <ScaleField
            name="s3_conectar"
            label="“Un sistema que conecte reserva → cocina → facturación en un solo lugar sería valioso para un fine dining.” ¿De acuerdo?"
          />
          <OpenField
            name="s3_falta"
            label="La más importante: ¿Qué le falta a esta idea? ¿Qué estamos pasando por alto?"
            placeholder="Sé tan crudo como quieras. Esto es lo que más nos ayuda."
            required
            rows={4}
          />
        </section>

        {/* Sección 4 */}
        <section className="space-y-6">
          <SectionHeading index={4} title="El puente" />
          <ChoiceField
            name="s4_conoces"
            label="¿Conoces otros restaurantes de tu estilo (menú degustación / alto ticket) que NO tengan tan resuelta su operación como ustedes?"
            options={FD_OPTIONS.conoces}
          />
          <ChoiceField
            name="s4_presentar"
            label="Si es así, ¿estarías dispuesto a presentarnos?"
            options={FD_OPTIONS.presentar}
          />
          <OpenField
            name="s4_contactos"
            label="(Opcional) Nombres o contactos que se te ocurran"
            rows={2}
          />
        </section>

        {/* Cierre */}
        <section className="space-y-6">
          <SectionHeading index={5} title="Cierre" />
          <OpenField
            name="cierre_libre"
            label="Espacio libre para lo que quieras agregar o para cualquier idea que te haya quedado dando vueltas."
            rows={4}
          />
        </section>

        <div className="border-t border-black/10 dark:border-white/10 pt-6 space-y-4">
          <p className="text-xs font-mono text-foreground/55">
            <span className="text-brand" aria-hidden="true">*</span> Solo estas dos son obligatorias · El resto, lo que quieras responder
          </p>
          <motion.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto">
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
