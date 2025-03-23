// components/sections/ContactSection.tsx
import { Mail, Linkedin, Github, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

// CSR dinámico solo para el formulario
const ContactClient = dynamic(() => import("./ContactClient").then(mod => mod.ContactClient), {
  ssr: false,
})

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Ponte en <span className="text-primary">Contacto</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              ¿Tienes un proyecto en mente? ¿Quieres discutir cómo podemos ayudarte? ¡Nos encantaría escucharte!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 text-primary" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">rodrigoan.torresp@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Linkedin className="h-5 w-5 mr-3 mt-1 text-primary" />
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <p className="text-muted-foreground">linkedin.com/in/rodrigo-torres-bytecore/</p>
                </div>
              </div>
              <div className="flex items-start">
                <Github className="h-5 w-5 mr-3 mt-1 text-primary" />
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <p className="text-muted-foreground">github.com/RodrigoFK06</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6">Trabajemos Juntos</h3>
            <p className="text-muted-foreground mb-6">
              Estamos siempre abiertos a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión empresarial.
            </p>

            <div className="flex gap-4">
              <Button asChild className="group">
                <Link href="mailto:rodrigoan.torresp@gmail.com">
                  Enviar Email
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  href="/planesyservicios.pdf"
                  download="planesyservicios.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Descargar Planes y Servicios
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Componente del formulario cargado dinámicamente */}
          <ContactClient />
        </div>
      </div>
    </section>
  )
}
