import { ServiceCard } from "@/components/service-card";
import Link from "next/link";

export const metadata = {
  title: "Servicios de desarrollo de software a medida en Perú | Árkos",
  description:
    "Desarrollo web, software a medida (ERP, CRM, SaaS), diseño UX/UI, e-commerce, apps móviles e integración de IA para PYMEs de Perú y Latinoamérica.",
  alternates: { canonical: "/services" },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "¿Dónde está ubicada Árkos y atiende a empresas fuera de Trujillo?",
    a: "Árkos es una agencia de desarrollo de software a medida con sede en Trujillo, Perú, fundada en 2020 por Rodrigo Torres. Trabaja principalmente en Perú y con toda Latinoamérica de forma remota, atendiendo a PYMEs de clínicas, hoteles, restaurantes, comercios y servicios técnicos en cualquier ciudad. Contacto: gerencia@árkos.com, WhatsApp +51 961 869 348.",
  },
  {
    q: "¿Por qué contratar software a medida en lugar de un sistema enlatado o una plantilla?",
    a: "El software a medida se construye desde tu operación real, no desde una plantilla genérica que te obliga a adaptar tu negocio al sistema. Árkos diseña ERPs, CRMs y PMS cuando los sistemas enlatados no encajan, como RestHUB (ERP para restaurantes) o VR PMS para alquileres vacacionales, alternativa económica a Guesty u Hostaway.",
  },
  {
    q: "¿Conviene un software a medida si mi PYME es pequeña y recién empieza?",
    a: "Sí. Árkos se especializa en PYMEs latinoamericanas y construye desde lo esencial según tu operación, evitando pagar por módulos que nunca usarás. Casos como Solutec System (CRM de servicio técnico) o ATELIER Clinic (SaaS para clínicas) nacieron resolviendo necesidades concretas. Los proyectos parten desde S/ 1,100 (USD 300) según el alcance.",
  },
  {
    q: "¿Qué tecnologías y stack usa Árkos para desarrollar?",
    a: "Árkos desarrolla con React, Next.js, TypeScript y Tailwind CSS en frontend; Node.js, Laravel, CodeIgniter y Spring Boot en backend; y Supabase, Firebase, MySQL y MongoDB como bases de datos. Para móvil usa Flutter y Dart, y para IA integra Gemini y GPT con automatizaciones en n8n y Make. Diseño UX/UI en Figma.",
  },
  {
    q: "¿El sistema funcionará rápido y aparecerá en Google y en buscadores con IA?",
    a: "Sí. Árkos construye con rendimiento y SEO/GEO nativos: arquitectura JAMStack, optimización de Core Web Vitals y preparación para buscadores y modelos de lenguaje. Sitios como Ñawi Producciones o ReLu Coffee se entregan rápidos en cualquier conexión, con imágenes optimizadas WebP/AVIF y foco en conversión, jerarquía visual y carga ágil.",
  },
  {
    q: "¿Pueden integrar inteligencia artificial, como un chatbot o automatizaciones, en mi negocio?",
    a: "Sí. La integración de IA es parte central de las soluciones de Árkos: chatbots y agentes de ventas inteligentes con Gemini o GPT, y flujos de automatización con n8n y Make para optimizar procesos empresariales. La IA se incorpora dentro del sistema a medida, conectada a tu operación real, no como un agregado genérico aislado.",
  },
  {
    q: "¿Cuánto tarda en desarrollarse un proyecto con Árkos?",
    a: "El plazo depende del alcance: una landing de alta conversión no toma lo mismo que un ERP con varios módulos como RestHUB o un PMS como OrquestadorADM. Un proyecto web típico toma de 3 a 8 semanas según el alcance; un sistema a medida toma más, en función de su complejidad.",
  },
  {
    q: "¿Cómo es el proceso de trabajo desde que los contacto hasta la entrega?",
    a: "Árkos parte de investigación de usuario real (entrevistas, personas, journey maps), luego wireframes y prototipos en Figma, y desarrolla con React, Next.js y TypeScript. El propósito es mejorar tus procesos, no solo escribir código. El primer paso es escribir a gerencia@árkos.com o al WhatsApp +51 961 869 348.",
  },
  {
    q: "¿Árkos hace tiendas online con pagos en soles y factura electrónica?",
    a: "Sí. Árkos desarrolla e-commerce listo para vender con pasarelas de pago en soles (Izipay, Culqi, MercadoPago y Stripe), factura electrónica, control de stock, integración con courier, catálogo administrable y métricas en tiempo real. Un ejemplo es ReLu Coffee, e-commerce de café gourmet y cafeteras, construido para vender sin fricción.",
  },
  {
    q: "¿Tienen experiencia en mi sector y proyectos reales?",
    a: "Sí. Árkos ha desarrollado para varios rubros: restaurantes (RestHUB), hotelería y alquiler vacacional (VR PMS, OrquestadorADM), clínicas estéticas (ATELIER Clinic), servicio técnico (Solutec System y su landing Solutec DHA), delivery (Rapiditos, en App Store y Google Play) y audiovisual (Ñawi Producciones).",
  },
];

export default function ServicesPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Nuestros <span className="text-brand">Servicios</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            En Árkos ofrecemos una gama completa de servicios digitales, cada uno entregado con el mismo compromiso inquebrantable de excelencia y atención al detalle.
          </p>
        </div>

        {/* Tarjetas de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard title="Desarrollo Web" description="Creamos sitios web y aplicaciones a medida utilizando las últimas tecnologías." icon="Code" />
          <ServiceCard title="Diseño UI/UX" description="Diseñamos interfaces intuitivas y atractivas centradas en el usuario." icon="Palette" />
          <ServiceCard title="E-Commerce" description="Desarrollamos tiendas online personalizadas y optimizadas para conversión." icon="Monitor" />
          <ServiceCard title="Aplicaciones Móviles" description="Creamos aplicaciones nativas y multiplataforma con excelente UX." icon="Box" />
          <ServiceCard title="Desarrollo Backend" description="Construimos APIs robustas, bases de datos optimizadas y sistemas escalables." icon="Database" />
          <ServiceCard title="Consultoría Digital" description="Proporcionamos asesoramiento estratégico y técnico en tecnología digital." icon="MessageSquare" />
        </div>

        {/* Enlace a precios */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-muted-foreground">
            ¿Buscas precios?{" "}
            <Link href="/precios" className="text-brand font-medium hover:underline">
              Mira cuánto cuesta cada tipo de proyecto →
            </Link>
          </p>
        </div>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight text-center">
            Preguntas <span className="text-brand">frecuentes</span>
          </h2>
          <div className="divide-y divide-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer font-medium list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-brand transition-transform group-open:rotate-45 text-xl leading-none shrink-0">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </main>
  );
}
