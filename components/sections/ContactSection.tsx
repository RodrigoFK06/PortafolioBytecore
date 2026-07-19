// components/sections/ContactSection.tsx
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react"
import dynamic from "next/dynamic"

import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"
import { SITE_CONFIG } from "@/lib/constants"

// CSR dinámico solo para el formulario
const ContactClient = dynamic(() => import("./ContactClient").then(mod => mod.ContactClient), {
  ssr: false,
})

const DIRECT_CHANNELS = [
  {
    href: (c: typeof SITE_CONFIG) => `mailto:${c.contact.email}`,
    icon: Mail,
    label: "Email",
    value: (c: typeof SITE_CONFIG) => c.contact.email,
    aria: "Enviar email a Árkos",
    external: false,
  },
  {
    href: (c: typeof SITE_CONFIG) => `https://wa.me/${c.contact.whatsapp}`,
    icon: Phone,
    label: "WhatsApp",
    value: (c: typeof SITE_CONFIG) => c.contact.phone,
    aria: "Escribir por WhatsApp a Árkos (abre en una nueva pestaña)",
    external: true,
  },
  {
    href: (c: typeof SITE_CONFIG) => c.social.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    value: () => "LinkedIn de Árkos",
    aria: "Visitar el LinkedIn de Árkos (abre en una nueva pestaña)",
    external: true,
  },
  {
    href: (c: typeof SITE_CONFIG) => c.social.github,
    icon: Github,
    label: "GitHub",
    value: () => "GitHub de Árkos",
    aria: "Visitar el GitHub de Árkos (abre en una nueva pestaña)",
    external: true,
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <header className="max-w-4xl mb-14 md:mb-20">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 09 — Contacto
          </p>
          <KineticText
            as="h2"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Conversemos <span className="text-brand">tu proyecto</span>
          </KineticText>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
            Cuéntanos qué necesitas, sin formalidades. Una clínica que quiere agendar mejor, una
            tienda que necesita vender online, un hotel que pide un PMS a medida. Te respondemos en
            menos de 24 horas hábiles.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl">
          <div className="w-full lg:w-1/2">
            <Reveal effect="rise">
              <h3 className="font-display text-2xl font-bold mb-6 text-foreground">Contacto directo</h3>
              <div className="space-y-5 mb-10">
                {DIRECT_CHANNELS.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href(SITE_CONFIG)}
                    {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-start group"
                    aria-label={ch.aria}
                  >
                    <div className="w-11 h-11 rounded-md shadow-hairline flex items-center justify-center mr-4 group-hover:shadow-hairline-md transition-all">
                      <ch.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                    </div>
                    <div className="pt-0.5 flex flex-col justify-center">
                      <h4 className="spec-label mb-0.5">{ch.label}</h4>
                      <p className="text-foreground font-medium group-hover:text-brand transition-colors break-all">
                        {ch.value(SITE_CONFIG)}
                      </p>
                    </div>
                  </a>
                ))}

                <div className="flex items-start">
                  <div className="w-11 h-11 rounded-md shadow-hairline flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                  <div className="pt-0.5 flex flex-col justify-center">
                    <h4 className="spec-label mb-0.5">Ubicación</h4>
                    <p className="text-foreground font-medium">{SITE_CONFIG.contact.address}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-secondary shadow-hairline">
                <h3 className="font-display text-lg font-bold mb-2 text-foreground">¿Prefieres una llamada?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Si tu proyecto necesita conversación, agendamos una reunión sin compromiso de 30
                  minutos. Sin tecnicismos, contándonos qué necesitas y en cuánto tiempo.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Componente del formulario cargado dinámicamente */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <ContactClient />
          </div>
        </div>
      </div>
    </section>
  )
}
