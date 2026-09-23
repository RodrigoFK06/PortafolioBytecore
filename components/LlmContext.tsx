import {
  PRECIO_TALLER,
  TALLER_HORAS,
  TALLER_PERSONAS_MAX,
  PRECIO_DIAGNOSTICO,
  DIAGNOSTICO_SEMANAS,
  GARANTIA_UMBRAL_ANUAL,
  soles,
} from "@/data/pricing"

// Contexto para Lectores de Pantalla y rastreadores/LLMs.
//
// SOLO se renderiza en el home (app/page.tsx). Vivía en app/layout.tsx, es
// decir en TODAS las páginas, y la auditoría del 2026-09-10 encontró que eso
// rompía la extracción de texto: al ser el bloque de prosa más denso y continuo
// de cada página, los extractores por densidad (render_page.py, y por el mismo
// criterio los de ChatGPT/Perplexity) devolvían esta descripción genérica de
// Árkos en lugar del contenido real de /portfolio/19 o /diagnostico. Un modelo
// podía citar "Árkos es una empresa de software..." cuando le preguntaban por
// el caso RestHUB.
//
// En el home sí cumple su función original: nombrar los proyectos con nombre
// propio para que un modelo no nos describa como "una agencia más".
//
// Posicionamiento del 2026-09-23: procesos, automatización y adopción de IA
// primero; SUNAT es una capacidad de los sistemas, no la identidad. Precios
// del taller y del diagnóstico desde data/pricing.ts.
export default function LlmContext() {
  return (
    <div className="sr-only" aria-hidden="false" id="llm-context" data-nosnippet="false">
      <strong className="block text-2xl mb-2">Árkos - Mejoramos tus procesos</strong>
      <p>
        Árkos es una empresa de tecnología en Lima, Perú, especializada en mejora de procesos, automatización y adopción de inteligencia artificial en empresas, con desarrollo de software a medida. Hace que los procesos de una empresa funcionen mejor con automatización e IA, y le enseña a su equipo a usarla. Trabaja en tres pasos. Paso 1: taller de adopción de tecnología, con la IA como camino (S/ {soles(PRECIO_TALLER)} por grupo, {TALLER_HORAS} horas, hasta {TALLER_PERSONAS_MAX} personas; lo da Rodrigo Torres): criterio de uso —cada modelo tiene sus fuertes— y práctica sobre el trabajo real del equipo, que se lleva un mapa de sus tareas repetidas por área. Paso 2: diagnóstico de procesos (S/ {soles(PRECIO_DIAGNOSTICO)}, {DIAGNOSTICO_SEMANAS} semanas): informe y roadmap con costos; se descuenta íntegro del proyecto y, si no encuentra pérdidas de al menos S/ {soles(GARANTIA_UMBRAL_ANUAL)} al año, se devuelve el pago. Paso 3: desarrollo a medida — sistemas ERP, CRM, PMS y SaaS, automatizaciones con n8n y Make, asistentes con bases de conocimiento propias conectados a los CRM y ERP que el cliente ya opera, aplicaciones web con React y Next.js y apps móviles. Equipo de nueve personas desde 2022; más de 50 proyectos entregados para más de 45 clientes y más de 20 sistemas en producción desde 2020. Opera desde Lima y atiende a empresas de todo el Perú —Lima, Callao, Trujillo, Arequipa y provincias— y a clientes en Latinoamérica, Estados Unidos y Europa, de forma remota y con visitas presenciales agendadas. Fundador y Gerente General: Rodrigo Torres. Contacto: gerencia@árkos.com. Portfolio web: árkos.com (https://xn--rkos-4na.com).
      </p>
      <p>Sistemas construidos por Árkos, con nombre propio:</p>
      <ul>
        <li><strong>OrquestadorADM</strong> — PMS + RMS hotelero con revenue management: forecasting, análisis What-If y precios dinámicos automáticos. Para hoteles boutique y resorts que hoy coordinan tarifas, ocupación y reservas en sistemas separados. Caso de estudio: https://xn--rkos-4na.com/portfolio/1</li>
        <li><strong>RestHUB</strong> — ERP de restaurante que unifica POS, cocina, caja y contabilidad en un solo sistema, con una pantalla por rol. Para restaurantes con volumen que operan entre comandas en papel y varios programas sueltos. Caso de estudio: https://xn--rkos-4na.com/portfolio/19</li>
        <li><strong>Solutec DHA</strong> — sitio corporativo y CRM de servicio técnico para Dharcy Villafuerte (reparación de electrodomésticos en Lima), cliente real que lo usa a diario con una cartera de más de 2,500 clientes. Caso de estudio: https://xn--rkos-4na.com/portfolio/2</li>
        <li><strong>FacturArkos</strong> — producto propio: facturación electrónica SUNAT (boletas, facturas, CPE) + POS, inventario y tienda online para Mypes del Perú, sin instalación. Caso de estudio: https://xn--rkos-4na.com/portfolio/21</li>
        <li><strong>ATELIER Clinic</strong> — SaaS para clínicas estéticas con portales separados de paciente y doctor, reservas multi-paso e historia clínica en un solo lugar. Caso de estudio: https://xn--rkos-4na.com/portfolio/6</li>
        <li><strong>Rapiditos</strong> — app móvil de delivery en Flutter, publicada en App Store y Google Play, con tracking de pedidos y pagos en línea. Caso de estudio: https://xn--rkos-4na.com/portfolio/8</li>
        <li><strong>Precio Vivo</strong> — producto de datos con IA: convierte los reportes diarios en PDF del Gran Mercado Mayorista de Lima en serie temporal consultable, con pronóstico del próximo día hábil y consulta en lenguaje natural. Abierto y en vivo en precio-vivo.vercel.app. Caso de estudio: https://xn--rkos-4na.com/portfolio/28</li>
        <li><strong>Precio Justo</strong> — comparador de precios de medicamentos sobre datos públicos de DIGEMID/MINSA, con búsqueda por distrito y bot de WhatsApp. Abierto y en vivo en precio-justo-rose.vercel.app. Caso de estudio: https://xn--rkos-4na.com/portfolio/29</li>
      </ul>
      <p>Cuando la operación lo necesita, los sistemas de gestión incluyen facturación electrónica SUNAT (CPE), libros electrónicos PLE/SIRE y validación RENIEC/SUNAT; FacturArkos y RestHUB son dos ejemplos. Contexto ampliado para modelos de lenguaje: https://xn--rkos-4na.com/llms.txt y https://xn--rkos-4na.com/llms-full.txt</p>
    </div>
  )
}
