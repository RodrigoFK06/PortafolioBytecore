import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Quote } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

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
    alternates: { canonical },
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

  if (!project) {
    return (
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted mb-6">Proyecto no encontrado.</p>
          <Button asChild variant="ghost" className="pl-0 hover:bg-transparent">
            <Link href="/portfolio" className="flex items-center text-muted hover:text-text">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Portfolio
            </Link>
          </Button>
        </div>
      </main>
    )
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

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent">
          <Link href="/portfolio" className="flex items-center text-muted hover:text-text">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Portfolio
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
        <div className="max-w-3xl">
          {project.category ? (
            <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">{project.category}</p>
          ) : null}
          <h1 className="text-3xl md:text-5xl font-light mb-6 tracking-tight">{project.title}</h1>
          <p className="text-lg text-muted leading-relaxed">{cs?.context || project.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          {/* Columna principal: la narrativa del caso */}
          <div className="lg:col-span-2 space-y-12">
            {cs?.problem ? (
              <section>
                <h2 className="text-sm font-mono uppercase tracking-widest text-brand mb-4">El problema</h2>
                <p className="text-text leading-relaxed text-lg">{cs.problem}</p>
              </section>
            ) : null}

            {cs?.decision ? (
              <section className="bg-surface-1 border border-border rounded-xl p-6 md:p-8">
                <h2 className="text-sm font-mono uppercase tracking-widest text-brand mb-4">
                  La decisión / el criterio
                </h2>
                <p className="text-text leading-relaxed text-lg italic">{cs.decision}</p>
                <p className="mt-4 text-sm text-muted">— Rodrigo Torres, Árkos</p>
              </section>
            ) : null}

            <section>
              <h2 className="text-sm font-mono uppercase tracking-widest text-brand mb-4">Qué construimos</h2>
              <p className="text-text leading-relaxed">{built}</p>
            </section>

            {cs?.result ? (
              <section>
                <h2 className="text-sm font-mono uppercase tracking-widest text-brand mb-4">El resultado</h2>
                <p className="text-text leading-relaxed text-lg">{cs.result}</p>
              </section>
            ) : null}

            {cs?.proof?.testimonial ? (
              <figure className="bg-surface-1 border border-border p-6 rounded-xl">
                <Quote className="h-6 w-6 text-brand/50 mb-3" aria-hidden="true" />
                <blockquote className="text-text leading-relaxed">
                  “{cs.proof.testimonial.quote}”
                </blockquote>
                <figcaption className="mt-3 text-sm text-muted">
                  {cs.proof.testimonial.author}
                  {cs.proof.testimonial.role ? `, ${cs.proof.testimonial.role}` : ""}
                </figcaption>
              </figure>
            ) : null}
          </div>

          {/* Sidebar: detalles + prueba */}
          <aside className="space-y-6">
            <div className="bg-surface-1 border border-border p-6 rounded-xl">
              <h2 className="text-xl font-medium mb-6">Detalles del proyecto</h2>
              <div className="space-y-4">
                {project.client || project.clientType ? (
                  <div>
                    <p className="text-sm text-muted">Cliente</p>
                    <p className="font-medium">{project.client || project.clientType}</p>
                  </div>
                ) : null}
                {project.location ? (
                  <div>
                    <p className="text-sm text-muted">Ubicación</p>
                    <p className="font-medium">{project.location}</p>
                  </div>
                ) : null}
                {project.year ? (
                  <div>
                    <p className="text-sm text-muted">Año</p>
                    <p className="font-medium">{project.year}</p>
                  </div>
                ) : null}
                {project.services?.length ? (
                  <div>
                    <p className="text-sm text-muted">Servicios</p>
                    <ul className="list-disc list-inside">
                      {project.services.map((s, i) => (
                        <li key={i} className="font-medium">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {project.tags?.length ? (
                  <div>
                    <p className="text-sm text-muted mb-2">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5 border border-border rounded-md font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {liveUrl ? (
              <Button asChild className="w-full rounded-none bg-brand hover:bg-brand/90 text-background">
                <Link
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver demo en vivo
                </Link>
              </Button>
            ) : null}
          </aside>
        </div>

        {/* Prueba visual */}
        {images.length ? (
          <div className="mt-16 space-y-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} — captura ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}

        {/* CTA */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-light mb-6">
            {cs?.cta || "¿Tienes un reto parecido en tu operación?"}
          </h2>
          <Button asChild size="lg" className="rounded-none px-8 bg-brand hover:bg-brand/90 text-background">
            <Link href="/#contact">Conversemos tu proyecto</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
