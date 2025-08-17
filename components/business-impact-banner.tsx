"use client"

import { motion } from "framer-motion"
import { AnimatedCounter } from "./animated-counter"
import { GlassStatsGrid } from "./glass-stat-card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Award, Star, Building } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BusinessImpactBanner() {
  const stats = [
    {
      value: 285,
      suffix: "%",
      label: "Aumento Promedio de Ventas",
      gradient: "mint" as const
    },
    {
      value: 50,
      suffix: "+",
      label: "Negocios Transformados", 
      gradient: "blue" as const
    },
    {
      value: 2.5,
      suffix: "M",
      label: "Soles Generados",
      gradient: "cyan" as const
    },
    {
      value: 100,
      suffix: "%",
      label: "Clientes Satisfechos",
      gradient: "teal" as const
    }
  ]

  const successStories = [
    {
      company: "EcoDrive+",
      industry: "Transporte",
      result: "+320% usuarios",
      roi: "ROI 450%",
      impact: "🚀"
    },
    {
      company: "Vigo Tulich",
      industry: "Construcción", 
      result: "+200% consultas",
      roi: "ROI 280%",
      impact: "📈"
    },
    {
      company: "Casa Roma",
      industry: "Turismo",
      result: "+180% reservas",
      roi: "Break-even 4 meses",
      impact: "💰"
    },
    {
      company: "Encrypted Games",
      industry: "Gaming",
      result: "Ingresos 24/7",
      roi: "Break-even 2 meses",
      impact: "🎯"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-green-50/50 to-blue-50/50 dark:from-primary/10 dark:via-green-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Resultados Reales, Números Comprobados
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            No Solo Hacemos <span className="text-green-600">Tecnología</span>
            <br />
            <span className="text-2xl md:text-3xl text-primary">Multiplicamos Resultados</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada proyecto que entregamos está diseñado para <strong>generar ROI real</strong>. 
            Nuestros clientes no obtienen solo un sitio web, obtienen una <strong className="text-green-600">máquina de hacer dinero</strong>.
          </p>
        </motion.div>

        {/* Stats Grid con nuevo sistema glassmorphism */}
        <GlassStatsGrid stats={stats} className="mb-16" />

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Casos de Éxito Recientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-card p-6 rounded-xl border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-3xl mb-3 text-center">{story.impact}</div>
                <div className="flex items-center gap-2 mb-3">
                  <Building className="w-4 h-4 text-primary" />
                  <span className="font-bold">{story.company}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-3">{story.industry}</div>
                <div className="text-sm font-medium text-green-600 mb-2">{story.result}</div>
                <div className="text-sm text-primary font-bold bg-primary/10 px-2 py-1 rounded text-center">
                  {story.roi}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-2xl border"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Tu Negocio Podría Ser el Próximo Caso de Éxito?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Agenda una <strong>consultoría estratégica gratuita</strong> y descubre exactamente 
            cómo podemos multiplicar tus ventas en los próximos 90 días.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-mint hover:shadow-mint-400/50 text-white px-8 border-0">
              🚀 Quiero Multiplicar Mis Ventas
            </Button>
            <Button size="lg" variant="outline" className="border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 px-8">
              📞 Consulta Gratuita (30 min)
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            ✅ Sin compromiso • ✅ Análisis de tu negocio incluido • ✅ Plan de acción personalizado
          </p>
        </motion.div>
      </div>
    </section>
  )
}
