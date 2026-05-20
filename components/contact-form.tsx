"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingSpinner } from "@/components/ui/loading"
import { SITE_CONFIG } from "@/lib/constants"

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no puede exceder 50 caracteres." })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: "El nombre solo puede contener letras y espacios." }),
  email: z.string()
    .email({ message: "Por favor, introduce un email válido." })
    .max(100, { message: "El email no puede exceder 100 caracteres." }),
  company: z.string()
    .max(50, { message: "El nombre de la empresa no puede exceder 50 caracteres." })
    .optional(),
  subject: z.string()
    .min(5, { message: "El asunto debe tener al menos 5 caracteres." })
    .max(100, { message: "El asunto no puede exceder 100 caracteres." }),
  message: z.string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres." })
    .max(1000, { message: "El mensaje no puede exceder 1000 caracteres." }),
  consent: z.boolean().refine((value) => value === true, {
    message: "Necesitamos tu consentimiento para procesar el mensaje.",
  }),
})

type FormValues = z.infer<typeof formSchema>

function RequiredMark() {
  return (
    <span className="text-brand ml-0.5" aria-hidden="true">*</span>
  )
}

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      consent: false,
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      const response = await fetch(SITE_CONFIG.email.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company || '',
          subject: values.subject,
          message: values.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "¡Mensaje enviado!",
          description: result.message || "Gracias por escribirnos. Te respondemos en menos de 24 horas hábiles.",
        })
        form.reset()
        setSubmitted(true)
      } else {
        throw new Error(result.message || 'Error al enviar el mensaje')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'

      toast({
        title: "Error",
        description: errorMessage.includes('Demasiadas solicitudes')
          ? errorMessage
          : "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 rounded-2xl bg-brand/5 border border-brand/20 text-center"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand/15 text-brand mb-4 text-2xl" aria-hidden="true">✓</div>
        <h4 className="text-xl font-bold text-foreground mb-2">Mensaje recibido</h4>
        <p className="text-foreground/75 leading-relaxed mb-6">
          Gracias por escribirnos. Te respondemos en menos de 24 horas hábiles al correo que indicaste.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Enviar otro mensaje
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre<RequiredMark /></FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" aria-required="true" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email<RequiredMark /></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@email.com" aria-required="true" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de tu empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asunto<RequiredMark /></FormLabel>
              <FormControl>
                <Input placeholder="Ej: Plataforma de agendamiento para mi clínica" aria-required="true" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje<RequiredMark /></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntanos brevemente qué necesitas, en qué etapa estás y para cuándo te gustaría tenerlo."
                  rows={5}
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.02] p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-required="true"
                  className="mt-0.5"
                />
              </FormControl>
              <div className="space-y-1 leading-snug">
                <FormLabel className="text-sm font-medium text-foreground cursor-pointer">
                  Acepto el tratamiento de mis datos<RequiredMark />
                </FormLabel>
                <p className="text-xs text-foreground/65 leading-relaxed">
                  Usamos tus datos únicamente para responder esta consulta. No compartimos con terceros ni enviamos publicidad sin consentimiento. Más detalles en nuestra{" "}
                  <Link href="/politicadeprivacidad" className="text-brand hover:underline">Política de Privacidad</Link>.
                </p>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <p className="text-xs font-mono text-foreground/55">
          <span className="text-brand" aria-hidden="true">*</span> Campos obligatorios · Te respondemos en menos de 24 horas hábiles
        </p>

        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Enviando...
              </span>
            ) : (
              "Solicitar propuesta"
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}
