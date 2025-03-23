"use client"

import  CursorFollower  from "@/components/cursor-follower"
import { motion } from "framer-motion"

export default function TermsAndConditionsPage() {
  return (
    <main className="pt-24 pb-16">
      <CursorFollower />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Términos y <span className="text-primary">Condiciones</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Bienvenido a Bytecore. Al acceder y utilizar nuestros servicios, aceptas los siguientes términos y condiciones que rigen el uso de nuestro sitio web y nuestros servicios.
            </p>
          </motion.div>
        </div>

        <div className="prose mx-auto">
          <h3 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h3>
          <p>
            Al acceder a este sitio web y utilizar nuestros servicios, aceptas los términos y condiciones establecidos en este documento. Si no estás de acuerdo con cualquiera de estos términos, te pedimos que no utilices nuestros servicios.
          </p>

          <h3 className="text-2xl font-semibold mb-4">2. Uso del Sitio Web</h3>
          <p>
            El sitio web de Bytecore está destinado a ser utilizado para fines legales y conforme a las leyes aplicables. No se permitirá el uso del sitio para actividades ilícitas, fraudulentas o que infrinjan los derechos de propiedad intelectual de terceros.
          </p>

          <h3 className="text-2xl font-semibold mb-4">3. Propiedad Intelectual</h3>
          <p>
            Todos los derechos de propiedad intelectual sobre el contenido de este sitio web, incluidos, entre otros, los textos, gráficos, logotipos, imágenes y software, son propiedad exclusiva de Bytecore o de sus respectivos propietarios. El uso no autorizado de cualquier material contenido en este sitio está prohibido.
          </p>

          <h3 className="text-2xl font-semibold mb-4">4. Modificaciones del Servicio</h3>
          <p>
            Bytecore se reserva el derecho de modificar, actualizar o interrumpir temporalmente los servicios ofrecidos en el sitio web, sin previo aviso y sin que esto implique alguna responsabilidad.
          </p>

          <h3 className="text-2xl font-semibold mb-4">5. Responsabilidad Limitada</h3>
          <p>
            Bytecore no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que pueda surgir del uso o la incapacidad para utilizar este sitio web o sus servicios.
          </p>

          <h3 className="text-2xl font-semibold mb-4">6. Enlaces Externos</h3>
          <p>
            Nuestro sitio web puede contener enlaces a sitios de terceros. No somos responsables del contenido o de las prácticas de privacidad de estos sitios externos.
          </p>

          <h3 className="text-2xl font-semibold mb-4">7. Modificación de los Términos y Condiciones</h3>
          <p>
            Bytecore puede modificar estos términos y condiciones en cualquier momento. Las modificaciones se publicarán en este mismo documento, y su entrada en vigor será inmediata tras su publicación. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.
          </p>

          <h3 className="text-2xl font-semibold mb-4">8. Ley Aplicable</h3>
          <p>
            Estos términos y condiciones se rigen por las leyes del país donde Bytecore está registrado. Cualquier disputa será resuelta en los tribunales competentes de la jurisdicción correspondiente.
          </p>
        </div>
      </div>
    </main>
  )
}
