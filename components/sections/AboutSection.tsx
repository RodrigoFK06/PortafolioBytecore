"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import Timeline from "@/components/Timeline"
import { RevealText, RevealBlock, StaggerReveal } from "@/components/gsap-reveal"

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500" itemScope itemType="https://schema.org/Organization">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />

      <meta itemProp="name" content="Árkos" />
      <meta itemProp="description" content="Agencia digital especialista en desarrollo web y diseño UX/UI en Perú." />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
        {/* Layout asimétrico */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Columna Izquierda: Titulares y Timeline */}
          <div className="w-full lg:w-1/2 relative space-y-12 md:space-y-16">
            <div className="relative">
               {/* Anotación Marginal */}
               <div className="absolute -top-10 -left-4 font-mono text-[10px] text-brand/80 italic px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 z-20 transform -rotate-2">
                 // Archivo Base_
               </div>
               
               <RevealText as="h2" className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10">
                 Sobre <br/><span className="text-brand">Nosotros</span>
               </RevealText>
            </div>

            <RevealBlock direction="left" className="relative z-10">
              <Timeline />
            </RevealBlock>
          </div>

          {/* Columna Derecha: Descripción, Estadísticas tipo Archival, Redes */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 md:space-y-12 lg:mt-32">
            
            <RevealBlock direction="right">
              {/* Glassmorphism Card */}
              <div className="p-8 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative transition-colors">
                <div className="absolute inset-0 rounded-2xl border border-black/10 dark:border-white/10 pointer-events-none transition-colors" style={{ background: "linear-gradient(135deg, rgba(150,150,150,0.15) 0%, rgba(150,150,150,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />
                <h3 className="text-2xl font-bold mb-6 text-foreground relative z-10">Nuestra Historia</h3>
                <p className="text-foreground/80 mb-6 leading-relaxed relative z-10">
                  Fundada con la visión de transformar el panorama digital, Árkos ha evolucionado hasta convertirse
                  en una agencia destacada en desarrollo web y diseño UI/UX. Nuestro equipo multidisciplinario combina
                  experiencia técnica con creatividad para ofrecer soluciones digitales que destacan en el mercado.
                </p>
                <p className="text-foreground/80 leading-relaxed relative z-10">
                  Nos apasiona crear experiencias digitales accesibles, intuitivas y visualmente atractivas que conectan
                  marcas con sus audiencias. Nuestro enfoque colaborativo nos permite entender profundamente las
                  necesidades de cada cliente para desarrollar soluciones personalizadas que generan resultados tangibles.
                </p>
              </div>
            </RevealBlock>

            {/* Archival Index - Stats */}
            <div className="border-t border-black/10 dark:border-white/10 flex flex-col transition-colors">
              <StaggerReveal className="flex flex-col">
                {[
                  { label: "Años de Experiencia", value: 4, to: 4, prefix: "" },
                  { label: "Proyectos Completados", value: 40, to: 40, prefix: "+" },
                  { label: "Clientes Satisfechos", value: 30, to: 30, prefix: "+" },
                  { label: "Premios Ganados", value: 9, to: 9, prefix: "" }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-black/10 dark:border-white/10 group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-crosshair px-2">
                     <span className="font-mono text-xs uppercase tracking-widest text-foreground/60 group-hover:text-brand transition-colors">
                        [INDEX_0{i+1}] {stat.label}
                     </span>
                     <div className="font-mono text-xl text-foreground group-hover:text-brand transition-colors flex items-end">
                       <AnimatedCounter from={0} to={stat.to} duration={2} />{stat.prefix}
                     </div>
                  </div>
                ))}
              </StaggerReveal>
            </div>

            {/* Social Buttons - Magnetic / Glassmorphism */}
            <div className="flex gap-4 pt-4">
               {[
                 { href: "https://github.com/RodrigoFK06", icon: Github, label: "GitHub" },
                 { href: "https://www.linkedin.com/in/rodrigo-torres-arkos", icon: Linkedin, label: "LinkedIn" },
                 { href: "mailto:rodrigoan.torresp@gmail.com", icon: Mail, label: "Email" }
               ].map((social, i) => (
                 <Button key={i} variant="outline" size="icon" asChild className="group rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-[12px] border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                   <Link href={social.href} target={social.href.startsWith('http') ? "_blank" : "_self"} rel={social.href.startsWith('http') ? "noopener noreferrer" : ""} aria-label={social.label}>
                     <social.icon className="h-5 w-5 opacity-70 group-hover:opacity-100 group-hover:text-brand transition-all" />
                   </Link>
                 </Button>
               ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

