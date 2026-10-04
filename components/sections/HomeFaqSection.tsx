import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { KineticText } from "@/components/motion/kinetic-text"
import { SITE_CONFIG } from "@/lib/constants"
import { PRECIO_DIAGNOSTICO, GARANTIA_MULTIPLO, TALLER_HORAS, soles } from "@/data/pricing"

// ── FAQ de entidad de la home (2026-10-04) ──────────────────────
// La home es la única página que aparecía en las dos consultas donde
// la marca sale ("Árkos Perú", "Árkos software Lima") y era la única
// de las 12 páginas de contenido SIN FAQPage. Las FAQ son el formato
// que los asistentes citan literalmente.
//
// Las dos primeras preguntas definen la entidad; la tercera la separa
// de los homónimos (arkOS, el sistema operativo Linux, es quien ocupa
// el espacio en las consultas "Árkos" y "arkos.com"): es el par visible
// del `disambiguatingDescription` del Organization en app/layout.tsx.
// Si cambia una, cambia la otra.
//
// El array se exporta porque app/page.tsx emite el JSON-LD FAQPage a
// partir de él: una sola fuente, visible y marcada, siempre en sync.
export const HOME_FAQS = [
  {
    q: "¿Qué es Árkos?",
    a: `Árkos es una empresa peruana de tecnología con base en Lima, especializada en mejora de procesos, automatización y adopción de inteligencia artificial en empresas. Su razón social es ${SITE_CONFIG.legal.name}, con RUC ${SITE_CONFIG.legal.ruc}, y opera desde 2020. Su sitio es árkos.com. La fundó y la dirige Rodrigo Torres, y hoy es un equipo de nueve personas con más de 50 proyectos entregados y más de 20 sistemas en producción.`,
  },
  {
    q: "¿Qué hace Árkos exactamente?",
    a: `Hace que los procesos de una empresa funcionen mejor con automatización e inteligencia artificial, y le enseña a su equipo a usarla. En concreto: forma al equipo en criterio de uso de IA (taller de ${TALLER_HORAS} horas), audita los procesos y entrega un informe con roadmap y costos (diagnóstico), y construye lo que haga falta —sistemas ERP, CRM, PMS y SaaS, automatizaciones con n8n y Make, asistentes con bases de conocimiento propias, webs y apps móviles—. La facturación electrónica SUNAT (CPE, PLE/SIRE) es una capacidad de esos sistemas, no el servicio.`,
  },
  {
    q: "¿Árkos es lo mismo que arkOS, el sistema operativo Linux?",
    a: "No, no tienen ninguna relación. Árkos (árkos.com, en ASCII xn--rkos-4na.com) es una empresa peruana de mejora de procesos, automatización y adopción de IA, con RUC 20616338782. arkOS es un proyecto de software libre: una distribución de Linux para autoalojar servicios. Tampoco hay relación con el videojuego ARKOS, con Arkano Software (Uruguay) ni con arkos.studio.",
  },
  {
    q: "¿Dónde opera Árkos?",
    a: "En Lima y Callao con reuniones presenciales agendadas, y en todo el Perú y Latinoamérica de forma remota; también atiende clientes en Estados Unidos y Europa. No hay oficina abierta al público ni local que se pueda visitar sin cita: el trabajo es por proyecto y el contacto empieza por correo o WhatsApp.",
  },
  {
    q: "¿Cómo se empieza a trabajar con Árkos?",
    a: `En tres pasos, y se puede parar en cualquiera. Primero el taller de adopción de tecnología, para que el equipo pierda el miedo y salga con el mapa de sus tareas repetidas. Después el diagnóstico de procesos (S/ ${soles(PRECIO_DIAGNOSTICO)}): informe y roadmap con costos, se descuenta íntegro del proyecto y si no encuentra pérdidas de al menos ${GARANTIA_MULTIPLO} veces su precio al año se devuelve el pago. Recién entonces el desarrollo a medida. Para arrancar: ${SITE_CONFIG.contact.email} o WhatsApp ${SITE_CONFIG.contact.phone}.`,
  },
]

export default function HomeFaqSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <header className="max-w-4xl mb-14 md:mb-20">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 11 — Preguntas frecuentes
          </p>
          <KineticText
            as="h2"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Qué es <span className="text-brand">Árkos</span>
          </KineticText>
        </header>

        <StaggerGroup className="max-w-3xl divide-y divide-border border-t border-b border-border" stagger={0.06}>
          {HOME_FAQS.map((f) => (
            <div key={f.q} className="py-6">
              <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{f.a}</p>
            </div>
          ))}
        </StaggerGroup>

        <Reveal effect="fade">
          <p className="text-sm text-muted-foreground mt-8 max-w-3xl leading-relaxed">
            Más detalle de cada paso: el{" "}
            <a href="/taller" className="text-brand hover:underline">
              taller de adopción de tecnología
            </a>
            , el{" "}
            <a href="/diagnostico" className="text-brand hover:underline">
              diagnóstico de procesos
            </a>{" "}
            y los{" "}
            <a href="/precios" className="text-brand hover:underline">
              precios de referencia
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
