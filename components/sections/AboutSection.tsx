"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import Timeline from "@/components/Timeline"
import { RevealText, RevealBlock, StaggerReveal } from "@/components/gsap-reveal"

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <RevealText as="h2" className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">
            Sobre <span className="text-brand">Nosotros</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              ByteCore es una agencia digital comprometida con la creación de experiencias web excepcionales,
              combinando diseño innovador con desarrollo técnico de alta calidad.
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <RevealBlock direction="left">
            <Timeline />
          </RevealBlock>

          <div>
            <RevealBlock direction="right">
              <h3 className="text-2xl font-bold mb-6">Nuestra Historia</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Fundada con la visión de transformar el panorama digital, ByteCore ha evolucionado hasta convertirse
                en una agencia destacada en desarrollo web y diseño UI/UX. Nuestro equipo multidisciplinario combina
                experiencia técnica con creatividad para ofrecer soluciones digitales que destacan en el mercado.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nos apasiona crear experiencias digitales accesibles, intuitivas y visualmente atractivas que conectan
                marcas con sus audiencias. Nuestro enfoque colaborativo nos permite entender profundamente las
                necesidades de cada cliente para desarrollar soluciones personalizadas que generan resultados
                tangibles.
              </p>
            </RevealBlock>

            <StaggerReveal className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <h4 className="text-3xl font-bold text-brand mb-2">
                  <AnimatedCounter from={0} to={4} duration={2} />+
                </h4>
                <p className="text-sm text-muted-foreground">Años de Experiencia</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-brand mb-2">
                  <AnimatedCounter from={0} to={40} duration={2} />+
                </h4>
                <p className="text-sm text-muted-foreground">Proyectos Completados</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-brand mb-2">
                  <AnimatedCounter from={0} to={30} duration={2} />+
                </h4>
                <p className="text-sm text-muted-foreground">Clientes Satisfechos</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-brand mb-2">
                  <AnimatedCounter from={0} to={9} duration={2} />+
                </h4>
                <p className="text-sm text-muted-foreground">Premios Ganados</p>
              </div>
            </StaggerReveal>

            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild className="hover:-translate-y-0.5 transition-transform">
                <Link
                  href="https://github.com/RodrigoFK06"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="hover:-translate-y-0.5 transition-transform">
                <Link
                  href="https://www.linkedin.com/in/rodrigo-torres-bytecore"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="hover:-translate-y-0.5 transition-transform">
                <Link href="mailto:rodrigoan.torresp@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
