import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Quote } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { projects, getCategoryLabel } from "@/data/projects"
import { alternates } from "@/lib/seo"

const baseUrl = "https://xn--rkos-4na.com"

type Params = { slug: string }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: String(p.id) }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => String(p.id) === slug)
  const title = project ? `${project.title} — Caso de estudio | Árkos` : "Caso de estudio | Árkos"
  const description = project?.caseStudy?.problem || project?.description || "Caso de estudio de Árkos"
  const canonical = `/portfolio/${slug}`
  return {
    title,
    description,
    alternates: alternates(canonical),
    openGraph: project
      ? {
          title,
          description,
          type: "article",
          images: project.imageSrc ? [{ url: project.imageSrc }] : undefined,
        }
      : undefined,
  }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = projects.find((p) => String(p.id) === slug)

  // Un id inexistente debe devolver 404 real (no una página vacía con HTTP 200).
  // Devolver 200 aquí genera un espacio de URLs infinito indexable — /portfolio/100,
  // /portfolio/101… — que desperdicia crawl budget y ensucia el índice.
  if (!project) {
    notFound()
  }

  const cs = project.caseStudy
  // Degradación elegante: si no hay narrativa cargada todavía, usamos los datos
  // reales que ya existen (demo en vivo, captura, descripción, stack).
  const liveUrl = cs?.proof?.liveUrl ?? project.link
  const images = cs?.proof?.images ?? (project.imageSrc ? [project.imageSrc] : [])
  const built = cs?.built ?? project.description
  const pageUrl = `${baseUrl}/portfolio/${slug}`
  const absImage = project.imageSrc?.startsWith("http")
    ? project.imageSrc
    : `${baseUrl}${project.imageSrc}`

  // Estilos compartidos para mantener una jerarquía consistente en todo el caso.
  const eyebrow = "text-xs font-mono uppercase tracking-widest text-brand"
  const sectionLabel = `${eyebrow} mb-3`
  const bodyText = "text-base md:text-lg leading-relaxed text-foreground/85"
  const panel =
    "rounded-2xl border border-border bg-secondary"

  return (
    <main className="pt-24 md:pt-28 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8 pl-0 h-auto py-1 hover:bg-transparent">
          <Link
            href="/portfolio"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al portafolio
          </Link>
        </Button>

        {/* JSON-LD — Breadcrumb + CreativeWork (author = Rodrigo, about/creator = Árkos) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
                { "@type": "ListItem", position: 2, name: "Portfolio", item: `${baseUrl}/portfolio` },
                { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "@id": `${pageUrl}#case`,
              name: project.title,
              headline: `${project.title} — Caso de estudio`,
              description: cs?.problem || project.description,
              image: absImage,
              url: pageUrl,
              inLanguage: "es-PE",
              keywords: project.tags?.join(", "),
              author: { "@id": `${baseUrl}/#rodrigo-torres` },
              creator: { "@id": `${baseUrl}/#organization` },
              about: { "@id": `${baseUrl}/#organization` },
              ...(project.year ? { datePublished: project.year } : {}),
            }),
          }}
        />

        {/* Hero */}
        <header className="max-w-3xl">
          {project.category ? (
            <p className={`${eyebrow} mb-4`}>{getCategoryLabel(project.category)}</p>
          ) : null}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            {project.title}
          </h1>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-muted-foreground text-pretty">
            {cs?.context || project.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 mt-12 md:mt-16 pt-12 md:pt-16 border-t border-border">
          {/* Columna principal: la narrativa del caso */}
          <div className="lg:col-span-2 space-y-10 md:space-y-12">
            {cs?.problem ? (
              <section>
                <h2 className={sectionLabel}>El problema</h2>
                <p className={bodyText}>{cs.problem}</p>
              </section>
            ) : null}

            {cs?.decision ? (
              <section className={`${panel} p-6 md:p-8`}>
                <h2 className={sectionLabel}>La decisión / el criterio</h2>
                <p className="text-base md:text-lg leading-relaxed text-foreground/90 italic">
                  {cs.decision}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">— Rodrigo Torres, Árkos</p>
              </section>
            ) : null}

            <section>
              <h2 className={sectionLabel}>Qué construimos</h2>
              <p className={bodyText}>{built}</p>
            </section>

            {cs?.result ? (
              <section>
                <h2 className={sectionLabel}>El resultado</h2>
                <p className={bodyText}>{cs.result}</p>
              </section>
            ) : null}

            {cs?.proof?.testimonial ? (
              <figure className={`${panel} p-6 md:p-8`}>
                <Quote className="h-7 w-7 text-brand/60 mb-4" aria-hidden="true" />
                <blockquote className="text-base md:text-lg leading-relaxed text-foreground/90">
                  “{cs.proof.testimonial.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{cs.proof.testimonial.author}</span>
                  {cs.proof.testimonial.role ? ` · ${cs.proof.testimonial.role}` : ""}
                </figcaption>
              </figure>
            ) : null}
          </div>

          {/* Sidebar: detalles + prueba */}
          <aside className="space-y-4 lg:sticky lg:top-28 self-start">
            <div className={`${panel} p-6`}>
              <h2 className="text-base font-semibold text-foreground mb-5">Detalles del proyecto</h2>
              <dl className="space-y-4">
                {project.client || project.clientType ? (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Cliente</dt>
                    <dd className="mt-1 font-medium text-foreground">
                      {project.client || project.clientType}
                    </dd>
                  </div>
                ) : null}
                {project.location ? (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Ubicación</dt>
                    <dd className="mt-1 font-medium text-foreground">{project.location}</dd>
                  </div>
                ) : null}
                {project.year ? (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Año</dt>
                    <dd className="mt-1 font-medium text-foreground">{project.year}</dd>
                  </div>
                ) : null}
                {project.services?.length ? (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">Servicios</dt>
                    <dd>
                      <ul className="space-y-1">
                        {project.services.map((s, i) => (
                          <li key={i} className="flex gap-2 text-sm text-foreground/90">
                            <span aria-hidden="true" className="text-brand">·</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
                {project.tags?.length ? (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Stack</dt>
                    <dd className="flex flex-wrap gap-2">
                      {project.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-secondary border border-border rounded-md font-mono text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            {liveUrl ? (
              <Button
                asChild
                className="w-full rounded-lg bg-brand hover:bg-brand/90 text-brand-foreground font-medium"
              >
                <Link
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visitar sitio en vivo
                </Link>
              </Button>
            ) : null}
          </aside>
        </div>

        {/* Prueba visual */}
        {images.length ? (
          <section className="mt-16 md:mt-20">
            <h2 className={`${sectionLabel} mb-5`}>Vistazo</h2>
            <div className="space-y-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border bg-secondary"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} — captura ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 1100px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Enlace contextual para los casos de Lima. Google reportaba "página
            de referencia: no se ha detectado ninguna" en varias URLs; las
            fichas de clientes limeños son la referencia más natural hacia la
            página de Lima. */}
        {project.location?.includes("Lima") ? (
          <section className="mt-16 max-w-2xl mx-auto rounded-2xl border border-border p-6">
            <p className={bodyText}>
              {project.title} es uno de nuestros clientes en Lima.{" "}
              <Link href="/desarrollo-de-software-lima" className="text-brand font-medium hover:underline">
                Ver todos nuestros proyectos y servicios para empresas de Lima →
              </Link>
            </p>
          </section>
        ) : null}

        {/* CTA */}
        <section className="mt-20 md:mt-24 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance mb-6">
            {cs?.cta || "¿Tienes un reto parecido en tu operación?"}
          </h2>
          <Button
            asChild
            size="lg"
            className="rounded-lg px-8 bg-brand hover:bg-brand/90 text-brand-foreground font-medium"
          >
            <Link href="/#contact">Conversemos tu proyecto</Link>
          </Button>
        </section>
      </div>
    </main>
  )
}
