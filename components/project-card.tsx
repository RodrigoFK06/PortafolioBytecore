"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  id: number
  title: string
  description: string
  tags: string[]
  imageSrc: string
  link?: string
  githubLink?: string
  delay?: number
}

export function ProjectCard({
  id,
  title,
  description,
  tags = [], // Provide default empty array
  imageSrc,
  link,
  githubLink,
  delay = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group relative bg-black/[0.04] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.05] p-2 rounded-2xl border border-black/10 dark:border-white/10 hover:border-black/15 dark:hover:border-white/20 transition-all duration-500 h-full flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] overflow-hidden"
      >

        <div className="relative h-48 w-full overflow-hidden rounded-xl">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={`Captura de pantalla del proyecto: ${title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4 md:p-6 flex-grow flex flex-col relative z-10">
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-brand transition-colors">{title || "Untitled Project"}</h3>
          <p className="text-foreground/70 text-sm md:text-base mb-6 flex-grow leading-relaxed line-clamp-3">{description || "No description available"}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags &&
              tags.map((tag, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md text-foreground/80 font-mono tracking-wider">
                  {tag}
                </span>
              ))}
          </div>
          <div className="flex gap-2 mt-auto relative z-10">
            <Button asChild size="sm" variant="outline" className="flex-1 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground rounded-xl backdrop-blur-sm transition-all shadow-none">
              <Link
                href={`/portfolio/${id}`}
                className="flex items-center justify-center font-medium"
              >
                Ver caso
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {link && (
              <Button
                asChild
                size="sm"
                variant="outline"
                title="Visitar sitio en vivo"
                className="shrink-0 w-10 px-0 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground rounded-xl backdrop-blur-sm transition-all shadow-none"
              >
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar el sitio de ${title} en una pestaña nueva`}
                  className="flex items-center justify-center"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {githubLink && (
              <Button
                asChild
                size="sm"
                variant="outline"
                title="Ver código en GitHub"
                className="shrink-0 w-10 px-0 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground rounded-xl backdrop-blur-sm transition-all shadow-none"
              >
                <Link
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver el código de ${title} en GitHub`}
                  className="flex items-center justify-center"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
