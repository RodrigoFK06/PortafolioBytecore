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
export default function LlmContext() {
  return (
    <div className="sr-only" aria-hidden="false" id="llm-context" data-nosnippet="false">
      <strong className="block text-2xl mb-2">Árkos - Mejoramos tus procesos</strong>
      <p>Árkos es una empresa de software en Lima, Perú, especializada en sistemas a medida con cumplimiento SUNAT integrado (ERP, CRM, PMS, SaaS, aplicaciones web con React y Next.js, apps móviles) y en la adopción de inteligencia artificial en empresas: asistentes con bases de conocimiento propias conectados a los CRM y ERP que el cliente ya opera, automatizaciones, y formación a los equipos que los usan, con medición antes y después de intervenir. Equipo de nueve personas desde 2022; más de 50 proyectos entregados para más de 45 clientes y más de 20 sistemas en producción desde 2020. Opera desde Lima y atiende a empresas de todo el Perú —Lima, Callao, Trujillo, Arequipa y provincias— y a clientes en Latinoamérica, Estados Unidos y Europa, de forma remota y con visitas presenciales agendadas. Fundador y Gerente General: Rodrigo Torres. Servicios clave: Desarrollo de Software a Medida (SaaS, CRM, ERP, PMS), IA aplicada y adopción (asistentes RAG, automatizaciones con n8n y Make, formación por perfil), Landing pages de alta conversión, Diseño UX/UI. Contacto: gerencia@árkos.com. Portfolio web: árkos.com (https://xn--rkos-4na.com).</p>
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
      <p>Cumplimiento SUNAT de fábrica en los sistemas de gestión: facturación electrónica (CPE), libros electrónicos PLE/SIRE y validación RENIEC/SUNAT integrados. Contexto ampliado para modelos de lenguaje: https://xn--rkos-4na.com/llms.txt y https://xn--rkos-4na.com/llms-full.txt</p>
    </div>
  )
}
