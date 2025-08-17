import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Target, DollarSign, Zap, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
              Soluciones que <span className="text-green-600">Multiplican Ventas</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              No ofrecemos servicios, ofrecemos <strong className="text-green-600">sistemas de crecimiento</strong>. 
              Cada solución está diseñada para generar ROI real y convertir tu presencia digital 
              en una <strong>máquina de hacer dinero 24/7</strong>.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sitios Web que Venden */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mb-6 text-green-600">
                <TrendingUp className="h-12 w-12" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold">Sitios Web que Venden</h3>
                <Badge className="bg-green-100 text-green-800 text-xs">+285% ROI</Badge>
              </div>
              <p className="text-muted-foreground mb-6 flex-grow">
                No creamos sitios web bonitos, creamos <strong className="text-green-600">máquinas de conversión</strong>. 
                Cada pixel está optimizado para generar leads, cerrar ventas y maximizar ingresos automáticamente.
              </p>
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-green-600" />
                  <span>Optimización para conversiones</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span>Velocidad de carga premium</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  <span>Analytics y seguimiento incluido</span>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-auto border-green-600 text-green-600 hover:bg-green-50">
                <Link href="/services#web-development">
                  🚀 Multiplicar Mis Ventas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* E-Commerce Optimizado */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mb-6 text-blue-600">
                <DollarSign className="h-12 w-12" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold">E-Commerce que Factura</h3>
                <Badge className="bg-blue-100 text-blue-800 text-xs">+320% Ventas</Badge>
              </div>
              <p className="text-muted-foreground mb-6 flex-grow">
                Tiendas online que venden mientras duermes. Integración con IA, automatización de marketing 
                y optimización constante para <strong className="text-blue-600">maximizar cada venta</strong>.
              </p>
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Funnel de ventas optimizado</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>Checkout en 1 click</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span>Upselling automático</span>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                <Link href="/services#ecommerce">
                  💰 Crear Mi Tienda
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Automatización y IA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mb-6 text-purple-600">
                <Users className="h-12 w-12" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold">Automatización con IA</h3>
                <Badge className="bg-purple-100 text-purple-800 text-xs">24/7</Badge>
              </div>
              <p className="text-muted-foreground mb-6 flex-grow">
                Chatbots inteligentes, automatización de marketing y sistemas que trabajan por ti las 24 horas. 
                <strong className="text-purple-600">Tu negocio nunca duerme</strong>, y tus ventas tampoco.
              </p>
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span>Chatbot con IA avanzada</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span>Email marketing automatizado</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span>Scoring de leads automático</span>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-auto border-purple-600 text-purple-600 hover:bg-purple-50">
                <Link href="/services#automation">
                  🤖 Automatizar Mi Negocio
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
              className="group relative bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl shadow-lg hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            >
              <Link href="/services" className="text-white flex items-center">
                🚀 Ver Todas las Soluciones de Crecimiento
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          <p className="text-sm text-muted-foreground mt-4">
            ✅ Consulta estratégica gratuita incluida • ✅ Análisis de ROI personalizado • ✅ Plan de crecimiento en 30 min
          </p>
        </div>
      </div>
    </section>
  );
}
