import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layout, Monitor, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Nuestros <span className="text-primary">Servicios</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Ofrecemos soluciones digitales completas para ayudar a tu empresa a destacar en el mundo digital.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Desarrollo Web */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col">
              <div className="mb-6 text-primary">
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
          </motion.div>

          {/* Diseño UI/UX */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col">
              <div className="mb-6 text-primary">
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
          </motion.div>

          {/* E-Commerce */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col">
              <div className="mb-6 text-primary">
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
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="group relative bg-gray-800/60 backdrop-blur-md p-4 rounded-xl border border-blue-500/20 shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
            >
              <Link href="/services" className="text-white flex items-center">
                Ver todos los servicios
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
