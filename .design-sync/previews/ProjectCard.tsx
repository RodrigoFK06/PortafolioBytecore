import { ProjectCard } from "arkos-portfolio"

// Content is taken verbatim from data/projects.ts so the card shows the real
// shape of an Árkos portfolio entry — long Spanish descriptions, stack tags,
// and the `line-clamp-3` truncation that only shows up with real copy length.
//
// imageSrc is an inline data URI: the bundle ships no images, and a repo path
// like "/resthub.webp" 404s inside a preview card and in every rendered design.
const SHOT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400">
       <rect width="640" height="400" fill="#f7f7f7"/>
       <rect x="0" y="0" width="640" height="44" fill="#ffffff"/>
       <rect x="16" y="16" width="120" height="12" rx="6" fill="#e5e5e5"/>
       <rect x="32" y="88" width="300" height="22" rx="4" fill="#1f45ff"/>
       <rect x="32" y="128" width="420" height="10" rx="5" fill="#e0e0e0"/>
       <rect x="32" y="148" width="380" height="10" rx="5" fill="#e8e8e8"/>
       <rect x="32" y="200" width="180" height="120" rx="8" fill="#ededed"/>
       <rect x="228" y="200" width="180" height="120" rx="8" fill="#ededed"/>
       <rect x="424" y="200" width="180" height="120" rx="8" fill="#ededed"/>
     </svg>`,
  )

export const Completa = () => (
  <div className="max-w-sm">
    <ProjectCard
      id={19}
      title="RestHUB"
      description="ERP integral para restaurantes que unifica POS, cocina, caja y contabilidad en un solo sistema. Cada rol opera con su propia pantalla optimizada, sin módulos extra ni costuras, con una landing premium pensada para Latinoamérica."
      tags={["Next.js", "React", "Tailwind CSS", "TypeScript", "ERP"]}
      imageSrc={SHOT}
      link="https://rest-hub-landing.vercel.app/"
      githubLink="https://github.com/RodrigoFK06"
    />
  </div>
)

export const SinEnlacesExternos = () => (
  <div className="max-w-sm">
    <ProjectCard
      id={6}
      title="ATELIER Clinic"
      description="Plataforma SaaS para clínicas estéticas con portales separados para pacientes y doctores. Sistema de reservas multi-paso, dashboard médico en tiempo real y diseño inspirado en el lujo discreto."
      tags={["Next.js", "React", "TypeScript", "Supabase"]}
      imageSrc={SHOT}
    />
  </div>
)

export const Rejilla = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ProjectCard
      id={1}
      title="OrquestadorADM"
      description="Sistema integral de gestión hotelera (PMS + RMS) para hoteles de lujo y resorts. Revenue Management avanzado con forecasting, análisis What-If y precios dinámicos automáticos."
      tags={["React", "Next.js", "PostgreSQL", "TypeScript"]}
      imageSrc={SHOT}
      link="https://orquestador-adm.vercel.app"
    />
    <ProjectCard
      id={8}
      title="Rapiditos | App móvil de delivery"
      description="Aplicación móvil para la gestión de pedidos de delivery, publicada en App Store y Google Play. Seguimiento en tiempo real, gestión de menús y pagos en línea."
      tags={["Flutter", "Firebase", "Dart", "Spring Boot"]}
      imageSrc={SHOT}
      link="https://apps.apple.com/pe/app/rapiditos-vz/id6748567718"
    />
  </div>
)
