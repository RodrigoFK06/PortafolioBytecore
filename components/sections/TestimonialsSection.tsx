import { motion } from "framer-motion"
import { Star, TrendingUp, DollarSign, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Testimonial {
  name: string
  position: string
  text: string
  result?: string
  roi?: string
  impact?: string
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const businessTestimonials = [
    {
      name: "Luis Rodriguez",
      position: "Gerente Comercial, EcoDrive+",
      text: "ByteCore no solo nos entregó una app, nos entregó un sistema que multiplicó nuestras ventas por 4. En 6 meses pasamos de 100 a 400+ usuarios activos pagando.",
      result: "+320% usuarios",
      roi: "ROI 450%",
      impact: "🚀"
    },
    {
      name: "María Vigo",
      position: "Directora, Vigo Tulich Construcción",
      text: "Antes recibíamos 2-3 consultas al mes. Después del sitio web que nos hicieron, recibimos 15-20 consultas semanales. Nuestro negocio se transformó completamente.",
      result: "+200% consultas",
      roi: "ROI 280%",
      impact: "📈"
    },
    {
      name: "Carlos Mendoza",
      position: "Propietario, Casa Roma Hotel",
      text: "La inversión se pagó sola en 4 meses. El sistema de reservas automatizado nos permite generar ingresos 24/7 sin intervención manual. Genial.",
      result: "+180% reservas",
      roi: "Break-even 4 meses",
      impact: "💰"
    }
  ]

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Resultados Reales de Clientes Reales
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
              Historias de <span className="text-green-600">Éxito Comprobado</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed dark:text-white/90">
              No son solo testimonios, son <strong className="text-green-600">casos de éxito medibles</strong>. 
              Cada cliente tiene números concretos que demuestran el ROI real de trabajar con nosotros.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {businessTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="p-8 rounded-xl border border-green-500/20 shadow-lg transform hover:scale-105 transition-all duration-300
                bg-gradient-to-b from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 backdrop-blur-lg hover:shadow-green-500/20"
            >
              <div className="flex flex-col h-full relative">
                {/* Business Impact Badge */}
                <div className="text-4xl mb-4 text-center">{testimonial.impact}</div>
                
                {/* Results Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-sm font-bold text-green-600">{testimonial.result}</div>
                    <div className="text-xs text-muted-foreground">Crecimiento</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-sm font-bold text-blue-600">{testimonial.roi}</div>
                    <div className="text-xs text-muted-foreground">Retorno</div>
                  </div>
                </div>

                {/* Stars */}
                <div className="mb-4 text-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>

                {/* Testimonial */}
                <p className="text-muted-foreground italic mb-6 flex-grow dark:text-white text-center">
                  "{testimonial.text}"
                </p>
                
                {/* Client Info */}
                <div className="text-center border-t pt-4">
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
