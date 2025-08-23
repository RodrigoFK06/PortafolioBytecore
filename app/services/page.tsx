import  CursorFollower  from "@/components/cursor-follower";
export const metadata = {
  title: "Servicios | ByteCore",
  description: "Desarrollo web, UI/UX, e‑commerce y más.",
  alternates: { canonical: "/services" },
}
import { ServiceCard } from "@/components/service-card";

export default function ServicesPage() {
  return (
    <main className="pt-24 pb-16">
      <CursorFollower />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Nuestros <span className="text-brand">Servicios</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            En ByteCore ofrecemos una gama completa de servicios digitales, cada uno entregado con el mismo compromiso inquebrantable de excelencia y atención al detalle.
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
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "¿Cuánto tarda un proyecto web?",
                acceptedAnswer: { "@type": "Answer", text: "Entre 3 y 8 semanas según alcance." }
              },
              {
                "@type": "Question",
                name: "¿Ofrecen mantenimiento?",
                acceptedAnswer: { "@type": "Answer", text: "Sí, planes mensuales con SLA." }
              }
            ]
          }),
        }}
      />
    </main>
  );
}
