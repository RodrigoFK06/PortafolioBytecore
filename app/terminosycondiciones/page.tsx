"use client"
import { motion } from "framer-motion"

export default function TermsAndConditionsPage() {
  return (
    <main className="relative min-h-screen pt-32 md:pt-40 pb-24 overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />

      {/* Animated Organic Orbs Background (Subtle for reading) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]">
        <div className="absolute top-[5%] left-[10%] w-[30vw] h-[30vw] bg-brand/10 dark:bg-brand/20 rounded-full blur-[100px] animate-orb-1 opacity-50" />
        <div className="absolute top-[10%] right-[15%] w-[25vw] h-[25vw] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] animate-orb-2 opacity-40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Términos y <span className="text-brand">Condiciones</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Bienvenido a Árkos. Al acceder y utilizar nuestros servicios, aceptas los siguientes términos y condiciones que rigen el uso de nuestro sitio web y nuestros servicios.
            </p>
          </motion.div>
        </div>

        {/* Glassmorphism Document Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors overflow-hidden"
        >
          {/* Inner border gradient */}
          <div className="absolute inset-0 rounded-3xl border border-black/10 dark:border-white/10 pointer-events-none transition-colors" style={{ background: "linear-gradient(135deg, rgba(150,150,150,0.15) 0%, rgba(150,150,150,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />
          
          <div className="prose prose-slate dark:prose-invert prose-headings:text-foreground prose-a:text-brand hover:prose-a:text-brand/80 prose-p:leading-relaxed prose-li:marker:text-brand max-w-none relative z-10">
          <h3 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h3>
          <p>
            Al acceder a este sitio web y utilizar nuestros servicios, aceptas los términos y condiciones establecidos en este documento. Si no estás de acuerdo con cualquiera de estos términos, te pedimos que no utilices nuestros servicios.
          </p>

          <h3 className="text-2xl font-semibold mb-4">2. Uso del Sitio Web</h3>
          <p>
            El sitio web de Árkos está destinado a ser utilizado para fines legales y conforme a las leyes aplicables. No se permitirá el uso del sitio para actividades ilícitas, fraudulentas o que infrinjan los derechos de propiedad intelectual de terceros.
          </p>

          <h3 className="text-2xl font-semibold mb-4">3. Propiedad Intelectual</h3>
          <p>
            Todos los derechos de propiedad intelectual sobre el contenido de este sitio web, incluidos, entre otros, los textos, gráficos, logotipos, imágenes y software, son propiedad exclusiva de Árkos o de sus respectivos propietarios. El uso no autorizado de cualquier material contenido en este sitio está prohibido.
          </p>

          <h3 className="text-2xl font-semibold mb-4">4. Modificaciones del Servicio</h3>
          <p>
            Árkos se reserva el derecho de modificar, actualizar o interrumpir temporalmente los servicios ofrecidos en el sitio web, sin previo aviso y sin que esto implique alguna responsabilidad.
          </p>

          <h3 className="text-2xl font-semibold mb-4">5. Responsabilidad Limitada</h3>
          <p>
            Árkos no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que pueda surgir del uso o la incapacidad para utilizar este sitio web o sus servicios.
          </p>

          <h3 className="text-2xl font-semibold mb-4">6. Enlaces Externos</h3>
          <p>
            Nuestro sitio web puede contener enlaces a sitios de terceros. No somos responsables del contenido o de las prácticas de privacidad de estos sitios externos.
          </p>

          <h3 className="text-2xl font-semibold mb-4">7. Modificación de los Términos y Condiciones</h3>
          <p>
            Árkos puede modificar estos términos y condiciones en cualquier momento. Las modificaciones se publicarán en este mismo documento, y su entrada en vigor será inmediata tras su publicación. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.
          </p>

          <h3 className="text-2xl font-semibold mb-4">8. Ley Aplicable</h3>
          <p>
            Estos términos y condiciones se rigen por las leyes del país donde Árkos está registrado. Cualquier disputa será resuelta en los tribunales competentes de la jurisdicción correspondiente.
          </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
