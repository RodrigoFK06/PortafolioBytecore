import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassStatsGrid } from "@/components/glass-stat-card"
import Timeline from "@/components/Timeline"

export function AboutSection() {
  const aboutStats = [
    { value: 285, suffix: "%", label: "Aumento Promedio de Ventas", gradient: "mint" as const },
    { value: 50, suffix: "+", label: "Negocios Transformados", gradient: "blue" as const },
    { value: 2.5, suffix: "M", label: "Soles Generados", gradient: "cyan" as const },
    { value: 100, suffix: "%", label: "Clientes que Nos Recomiendan", gradient: "teal" as const }
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Transformamos{" "}
              <span className="bg-gradient-to-r from-mint-400 to-teal-500 dark:from-mint-200 dark:to-teal-300 bg-clip-text text-transparent">
                Negocios
              </span>{" "}
              con Tecnología
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              No somos solo otra agencia digital. Somos{" "}
              <strong className="bg-gradient-to-r from-mint-400 to-teal-500 dark:from-mint-200 dark:to-teal-300 bg-clip-text text-transparent">
                multiplicadores de resultados
              </strong>. 
              Cada línea de código, cada diseño y cada estrategia está pensada para{" "}
              <strong>generar ROI real</strong> 
              y transformar tu negocio en una máquina de generar ingresos las 24/7.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <Timeline />

          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Nuestra Metodología de Éxito</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Durante los últimos 4 años, hemos perfeccionado una metodología que combina{" "}
                <strong className="text-teal-600 dark:text-teal-400">estrategia comercial</strong>, 
                diseño centrado en conversión y tecnología de punta. No solo entregamos sitios web bonitos, 
                <strong className="bg-gradient-to-r from-mint-400 to-teal-500 dark:from-mint-200 dark:to-teal-300 bg-clip-text text-transparent">
                  {" "}entregamos sistemas que venden
                </strong>.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nuestro enfoque data-driven nos permite identificar exactamente qué necesita tu negocio para crecer. 
                Cada proyecto incluye análisis de mercado, optimización para conversiones y métricas de seguimiento 
                que garantizan que tu inversión genere{" "}
                <strong className="bg-gradient-to-r from-mint-400 to-teal-500 dark:from-mint-200 dark:to-teal-300 bg-clip-text text-transparent">
                  retornos medibles
                </strong>.
              </p>
            </motion.div>

            <GlassStatsGrid stats={aboutStats} className="mb-8" />

            <div className="flex gap-4">
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button variant="outline" size="icon" asChild>
                  <Link
                    href="https://github.com/RodrigoFK06"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button variant="outline" size="icon" asChild>
                  <Link
                    href="https://www.linkedin.com/in/rodrigo-torres-bytecore"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button variant="outline" size="icon" asChild>
                  <Link href="mailto:rodrigoan.torresp@gmail.com" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
