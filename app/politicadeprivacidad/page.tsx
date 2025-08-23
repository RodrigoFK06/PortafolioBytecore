"use client"

import { motion } from "framer-motion"
import  CursorFollower  from "@/components/cursor-follower"

export default function PrivacyPolicyPage() {
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
              Políticas de <span className="text-brand">Privacidad</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Bienvenido a Bytecore. En esta página te explicamos cómo manejamos tu información personal y tus derechos relacionados con nuestra política de privacidad.
            </p>
          </motion.div>
        </div>

        <div className="prose mx-auto">
          <h3 className="text-2xl font-semibold mb-4">1. Información Recopilada</h3>
          <p>
            Recopilamos información personal que nos proporcionas al interactuar con nuestros servicios, como nombre, dirección de correo electrónico, información de contacto y datos de pago. También podemos recopilar información técnica de tu dispositivo, como la dirección IP y la actividad de navegación.
          </p>

          <h3 className="text-2xl font-semibold mb-4">2. Uso de la Información</h3>
          <p>
            Utilizamos tu información para proporcionarte nuestros servicios, personalizar tu experiencia, mejorar nuestros productos, y mantenerte informado sobre actualizaciones y promociones. También podemos utilizar la información para fines de análisis y estadísticas.
          </p>

          <h3 className="text-2xl font-semibold mb-4">3. Seguridad de los Datos</h3>
          <p>
            Tomamos medidas de seguridad razonables para proteger tu información personal contra accesos no autorizados, alteraciones o divulgaciones. Sin embargo, no podemos garantizar la seguridad absoluta de la información transmitida a través de internet.
          </p>

          <h3 className="text-2xl font-semibold mb-4">4. Compartir Información con Terceros</h3>
          <p>
            No compartimos tu información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios (por ejemplo, procesadores de pago) o cuando lo exija la ley.
          </p>

          <h3 className="text-2xl font-semibold mb-4">5. Cookies</h3>
          <p>
            Utilizamos cookies y tecnologías similares para mejorar la funcionalidad del sitio web y hacer que tu experiencia sea más eficiente. Puedes controlar el uso de cookies desde tu navegador.
          </p>

          <h3 className="text-2xl font-semibold mb-4">6. Enlaces Externos</h3>
          <p>
            Nuestro sitio web puede contener enlaces a otros sitios web. No somos responsables de las políticas de privacidad de esos sitios y te recomendamos revisar sus políticas antes de proporcionarles tu información.
          </p>

          <h3 className="text-2xl font-semibold mb-4">7. Modificación de la Política</h3>
          <p>
            Bytecore puede actualizar esta política de privacidad en cualquier momento. Las modificaciones se publicarán en esta página, y estarán en vigor tan pronto como se publiquen.
          </p>

          <h3 className="text-2xl font-semibold mb-4">8. Derechos del Usuario</h3>
          <p>
            Tienes derecho a acceder, corregir o eliminar tu información personal. Si deseas ejercer cualquiera de estos derechos, por favor contacta con nosotros a través de nuestro formulario de contacto o enviando un correo electrónico a <strong>privacidad@bytecore.com</strong>.
          </p>

          <h3 className="text-2xl font-semibold mb-4">9. Contacto</h3>
          <p>
            Si tienes preguntas sobre nuestra política de privacidad o cómo tratamos tus datos, por favor contáctanos a través de nuestro correo electrónico: <strong>privacidad@bytecore.com</strong>.
          </p>
        </div>
      </div>
    </main>
  )
}
