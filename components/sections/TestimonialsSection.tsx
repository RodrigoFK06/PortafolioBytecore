import { motion } from "framer-motion"

interface Testimonial {
  name: string
  position: string
  text: string
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
              Testimonios <span className="text-brand">de Clientes</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed dark:text-white/90">
              Lo que dicen los clientes y colegas sobre trabajar conmigo.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="p-8 rounded-xl border border-blue-500/20 shadow-lg transform hover:scale-105 transition-all duration-300
                bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 backdrop-blur-lg"
            >
              <div className="flex flex-col h-full relative">
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-lg blur-2xl opacity-0 pointer-events-none"
                  style={{ x: "0", y: "0", opacity: 0.5 }}
                />

                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-white-400 text-lg">★</span>
                  ))}
                </div>

                <p className="text-muted-foreground italic mb-6 flex-grow dark:text-white">
                  "{testimonial.text}"
                </p>
                <div>
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
