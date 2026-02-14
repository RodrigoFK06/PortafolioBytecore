"use client"

import Link from "next/link"
import { ArrowRight, Layout, Monitor, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealText, StaggerReveal } from "@/components/gsap-reveal"

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <RevealText as="h2" className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">
            Nuestros <span className="text-brand">Servicios</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Ofrecemos soluciones digitales completas para ayudar a tu empresa a destacar en el mundo digital.
            </p>
          </RevealText>
        </div>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12}>
          {/* Desarrollo Web */}
          <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col">
            <div className="mb-6 text-brand">
              <Layout className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold mb-4">Desarrollo Web</h3>
            <p className="text-muted-foreground mb-6 flex-grow">
              Creamos sitios web y aplicaciones a medida utilizando las últimas tecnologías como React, Next.js y
              Node.js, garantizando rendimiento, escalabilidad y experiencias de usuario excepcionales.
            </p>
            <Button asChild variant="outline" className="mt-auto">
              <Link href="/services#web-development">
                Saber más
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Diseño UI/UX */}
          <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col">
            <div className="mb-6 text-brand">
              <Palette className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold mb-4">Diseño UI/UX</h3>
            <p className="text-muted-foreground mb-6 flex-grow">
              Diseñamos interfaces intuitivas y atractivas centradas en el usuario, mejorando la usabilidad y
              creando experiencias digitales memorables que conectan con tu audiencia.
            </p>
            <Button asChild variant="outline" className="mt-auto">
              <Link href="/services#ui-ux-design">
                Saber más
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* E-Commerce */}
          <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col">
            <div className="mb-6 text-brand">
              <Monitor className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold mb-4">E-Commerce</h3>
            <p className="text-muted-foreground mb-6 flex-grow">
              Desarrollamos tiendas online personalizadas y optimizadas para conversión, integrando pasarelas de
              pago seguras y funcionalidades avanzadas para impulsar tus ventas en línea.
            </p>
            <Button asChild variant="outline" className="mt-auto">
              <Link href="/services#ecommerce">
                Saber más
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </StaggerReveal>

        <div className="mt-16 text-center">
          <RevealText delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/services" className="flex items-center">
                  Ver todos los servicios
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  )
}
