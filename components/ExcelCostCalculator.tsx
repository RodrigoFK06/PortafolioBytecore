"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

// ── Calculadora del costo de operar en Excel ────────────────────
// Estimación conservadora con los números del propio negocio:
// horas de digitación doble + errores manuales. No incluye ventas
// perdidas ni multas — eso se estima en el diagnóstico.

const HORAS_LABORALES_MES = 208 // 48 h/semana × 4.33
const SEMANAS_MES = 4.33

interface Field {
  key: "personas" | "horasSemana" | "sueldo" | "errores" | "costoError"
  label: string
  hint: string
  min: number
  max: number
  step: number
  prefix?: string
}

const FIELDS: Field[] = [
  {
    key: "personas",
    label: "Personas que tocan la operación diaria",
    hint: "Quienes registran ventas, pedidos, caja o inventario.",
    min: 1,
    max: 50,
    step: 1,
  },
  {
    key: "horasSemana",
    label: "Horas por persona a la semana en trabajo manual",
    hint: "Digitación doble, cuadres, armar reportes a mano, buscar información.",
    min: 0,
    max: 40,
    step: 1,
  },
  {
    key: "sueldo",
    label: "Sueldo mensual promedio de esas personas",
    hint: "Bruto aproximado, en soles.",
    min: 500,
    max: 10000,
    step: 50,
    prefix: "S/ ",
  },
  {
    key: "errores",
    label: "Errores costosos al mes",
    hint: "Facturas mal emitidas, pedidos perdidos, citas duplicadas, faltantes de caja.",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    key: "costoError",
    label: "Costo promedio de cada error",
    hint: "Entre reprocesos, anulaciones y clientes molestos.",
    min: 0,
    max: 2000,
    step: 10,
    prefix: "S/ ",
  },
]

const fmt = (n: number) =>
  new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(Math.round(n))

export default function ExcelCostCalculator() {
  const [values, setValues] = useState({
    personas: 3,
    horasSemana: 5,
    sueldo: 1500,
    errores: 4,
    costoError: 80,
  })

  const set = (key: Field["key"], raw: string) => {
    const n = Number(raw)
    setValues((v) => ({ ...v, [key]: Number.isFinite(n) ? n : 0 }))
  }

  const costoHora = values.sueldo / HORAS_LABORALES_MES
  const horasMes = values.personas * values.horasSemana * SEMANAS_MES
  const costoHoras = horasMes * costoHora
  const costoErrores = values.errores * values.costoError
  const totalMes = costoHoras + costoErrores
  const totalAnio = totalMes * 12

  const waHref = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    `Hola Rodrigo, usé la calculadora del costo del Excel: me sale ~S/ ${fmt(totalMes)} al mes (~S/ ${fmt(totalAnio)} al año) entre ${fmt(horasMes)} horas de trabajo manual y ${values.errores} errores/mes. Quiero conversar cómo reducirlo.`
  )}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="bg-card p-8 rounded-lg shadow-hairline">
        <p className="spec-label mb-6">Tus números</p>
        <div className="space-y-6">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label htmlFor={f.key} className="block text-sm font-medium text-foreground mb-1">
                {f.label}
              </label>
              <p className="text-xs text-muted-foreground mb-2">{f.hint}</p>
              <div className="flex items-center gap-3">
                <input
                  id={f.key}
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={values[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  className="flex-1 accent-[hsl(var(--brand))]"
                />
                <span className="font-mono tabular text-sm text-foreground w-24 text-right shrink-0">
                  {f.prefix ?? ""}
                  {fmt(values[f.key])}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resultado */}
      <div className="bg-card p-8 rounded-lg shadow-hairline-md ring-1 ring-brand/30 flex flex-col">
        <p className="spec-label text-brand mb-6">Lo que te cuesta cada mes</p>

        <dl className="space-y-4 mb-8">
          <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-border">
            <dt className="text-sm text-muted-foreground">
              Horas de trabajo manual{" "}
              <span className="font-mono tabular text-foreground">({fmt(horasMes)} h/mes)</span>
            </dt>
            <dd className="font-mono tabular text-lg text-foreground shrink-0">S/ {fmt(costoHoras)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-border">
            <dt className="text-sm text-muted-foreground">
              Errores manuales{" "}
              <span className="font-mono tabular text-foreground">({values.errores}/mes)</span>
            </dt>
            <dd className="font-mono tabular text-lg text-foreground shrink-0">S/ {fmt(costoErrores)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-base font-semibold text-foreground">Total mensual</dt>
            <dd className="font-mono tabular text-3xl font-medium text-brand shrink-0">
              S/ {fmt(totalMes)}
            </dd>
          </div>
        </dl>

        <div className="p-5 rounded-md bg-secondary shadow-hairline mb-8">
          <p className="spec-label mb-1">Al año</p>
          <p className="font-mono tabular text-4xl font-medium text-foreground">S/ {fmt(totalAnio)}</p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Estimación conservadora: no incluye ventas perdidas por demoras, decisiones tardías ni
            multas por errores de cumplimiento. Compárala con el costo de un sistema en{" "}
            <Link href="/precios" className="text-brand hover:underline">
              precios
            </Link>
            .
          </p>
        </div>

        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand/90 transition-colors"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Conversar mis números
          </a>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
          >
            Ver el diagnóstico
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
