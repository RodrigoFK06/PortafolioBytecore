import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

type Params = { slug: string }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: String(p.id) }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => String(p.id) === slug)
  const title = project ? `${project.title} | Portfolio | ByteCore` : "Proyecto | Portfolio | ByteCore"
  const description = project?.description || "Detalle del proyecto del portfolio de ByteCore"
  const canonical = `/portfolio/${slug}`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: project
      ? {
          title,
          description,
          images: project.imageSrc ? [{ url: project.imageSrc }] : undefined,
        }
      : undefined,
  }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = projects.find((p) => String(p.id) === slug) || {
    title: "Proyecto",
    category: "",
    description: "",
    client: "",
    location: "",
    year: "",
    services: [] as string[],
    images: ["/placeholder.svg?height=800&width=1200"],
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent">
          <Link href="/portfolio" className="flex items-center text-muted hover:text-text">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Portfolio
          </Link>
        </Button>

  <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "/" },
                { "@type": "ListItem", position: 2, name: "Portfolio", item: "/portfolio" },
                { "@type": "ListItem", position: 3, name: project.title, item: `/portfolio/${slug}` },
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
              name: project.title,
              description: project.description,
              url: `/portfolio/${slug}`,
              image: "imageSrc" in project ? (project as any).imageSrc : undefined,
            }),
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">{project.title}</h1>
            {"category" in project && project.category ? (
              <p className="text-muted mb-8">{(project as any).category}</p>
            ) : null}
            <p className="text-text mb-8 leading-relaxed">{project.description}</p>
          </div>

          <div className="bg-surface-1 border border-border p-6">
            <h2 className="text-xl font-medium mb-6">Detalles del proyecto</h2>
            <div className="space-y-4">
              {"client" in project && (project as any).client ? (
                <div>
                  <p className="text-sm text-muted">Cliente</p>
                  <p className="font-medium">{(project as any).client}</p>
                </div>
              ) : null}
              {"location" in project && (project as any).location ? (
                <div>
                  <p className="text-sm text-muted">Ubicación</p>
                  <p className="font-medium">{(project as any).location}</p>
                </div>
              ) : null}
              {"year" in project && (project as any).year ? (
                <div>
                  <p className="text-sm text-muted">Año</p>
                  <p className="font-medium">{(project as any).year}</p>
                </div>
              ) : null}
              {"services" in project && Array.isArray((project as any).services) && (project as any).services.length > 0 ? (
                <div>
                  <p className="text-sm text-muted">Servicios</p>
                  <ul className="list-disc list-inside">
                    {(project as any).services.map((service: string, index: number) => (
                      <li key={index} className="font-medium">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-12">
          {(project as any).images?.map((image: string, index: number) => (
            <div key={index} className="relative h-[600px] w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${project.title} - Imagen ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-light mb-8">¿Interesado en trabajar con nosotros?</h2>
          <Button asChild size="lg" className="rounded-none px-8 bg-brand hover:bg-brand/90 text-background">
            <Link href="#contact">Contáctanos</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

