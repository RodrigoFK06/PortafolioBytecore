"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  id: number
  title: string
  description: string
  tags: string[]
  imageSrc: string
  link?: string
  githubLink?: string
  /** @deprecated la entrada la orquesta el StaggerGroup padre */
  delay?: number
}

export function ProjectCard({
  id,
  title,
  description,
  tags = [],
  imageSrc,
  link,
  githubLink,
}: ProjectCardProps) {
  return (
    <div className="group relative bg-card p-2 rounded-lg shadow-hairline hover:shadow-hairline-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden rounded-md">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={`Captura de pantalla del proyecto: ${title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4 md:p-6 flex-grow flex flex-col">
        <h3 className="font-display text-xl font-bold mb-2 text-foreground group-hover:text-brand transition-colors">
          {title || "Untitled Project"}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base mb-6 flex-grow leading-relaxed line-clamp-3">
          {description || "No description available"}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-1 bg-secondary rounded text-muted-foreground font-mono tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/portfolio/${id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-foreground shadow-hairline hover:shadow-hairline-md hover:bg-secondary transition-all"
          >
            Ver caso
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {link && (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              title="Visitar sitio en vivo"
              aria-label={`Visitar el sitio de ${title} en una pestaña nueva`}
              className="shrink-0 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground shadow-hairline hover:text-brand hover:shadow-hairline-md transition-all"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
          {githubLink && (
            <Link
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver código en GitHub"
              aria-label={`Ver el código de ${title} en GitHub`}
              className="shrink-0 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground shadow-hairline hover:text-brand hover:shadow-hairline-md transition-all"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
