"use client"

import { useRef, useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/motion"
import { KineticText } from "@/components/motion/kinetic-text"
import { Reveal } from "@/components/motion/reveal"

import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTypescript,
  SiTailwindcss,
  SiFlutter,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiSpringboot,
  SiCodeigniter,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiPrisma,
  SiDocker,
  SiVercel,
  SiKubernetes,
  SiGit,
} from "react-icons/si"
import { TbApi, TbRefresh, TbDatabase, TbBrandAws } from "react-icons/tb"
import type { IconType } from "react-icons"

interface TechItem {
  name: string
  Icon: IconType
}

const technologies: TechItem[] = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Angular", Icon: SiAngular },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Flutter", Icon: SiFlutter },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "Laravel", Icon: SiLaravel },
  { name: "Spring Boot", Icon: SiSpringboot },
  { name: "CodeIgniter", Icon: SiCodeigniter },
  { name: "GraphQL", Icon: SiGraphql },
  { name: "REST APIs", Icon: TbApi },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MySQL", Icon: SiMysql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Prisma", Icon: SiPrisma },
  { name: "SQL Server", Icon: TbDatabase },
  { name: "AWS", Icon: TbBrandAws },
  { name: "Docker", Icon: SiDocker },
  { name: "Vercel", Icon: SiVercel },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "Git", Icon: SiGit },
  { name: "CI/CD", Icon: TbRefresh },
]

function TechChip({ tech }: { tech: TechItem }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 rounded-md bg-card shadow-hairline hover:shadow-hairline-md transition-shadow duration-300 shrink-0 group">
      <tech.Icon className="w-6 h-6 text-muted-foreground group-hover:text-brand transition-colors duration-300" aria-hidden="true" />
      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap group-hover:text-foreground transition-colors duration-300 font-mono tracking-wide">
        {tech.name}
      </span>
    </div>
  )
}

function Marquee({ items, speed }: { items: TechItem[]; speed: number }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useGSAP(
    () => {
      if (!trackRef.current || !sectionRef.current || !ready) return

      // Respeta la preferencia del sistema
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) return

      const track = trackRef.current
      const children = track.children
      const itemCount = items.length
      let oneSetWidth = 0

      for (let i = 0; i < itemCount; i++) {
        const child = children[i] as HTMLElement
        if (child) {
          oneSetWidth += child.offsetWidth + 16
        }
      }

      if (oneSetWidth <= 0) return

      const tween = gsap.to(track, {
        x: -oneSetWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const val = parseFloat(x)
            return `${((val % oneSetWidth) - oneSetWidth) % oneSetWidth}px`
          },
        },
      })
      tweenRef.current = tween

      // Pausar cuando el marquee no está en viewport
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => tween.resume(),
        onEnterBack: () => tween.resume(),
        onLeave: () => tween.pause(),
        onLeaveBack: () => tween.pause(),
      })

      return () => {
        trigger.kill()
        tween.kill()
      }
    },
    { scope: sectionRef, dependencies: [ready] }
  )

  const duplicated = [...items, ...items]

  return (
    <div ref={sectionRef} className="overflow-hidden" aria-hidden="true">
      <div ref={trackRef} className="flex gap-4 w-max">
        {duplicated.map((tech, i) => (
          <TechChip key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  )
}

export default function TechnologiesSection() {
  return (
    <section id="technologies" className="py-20 md:py-32 bg-background relative overflow-hidden border-t border-border">

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 mb-16 md:mb-24">
        <header className="max-w-4xl">
          <p className="spec-label mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[hsl(var(--border-strong))]" aria-hidden="true" />
            FIG. 05 — Stack
          </p>
          <KineticText
            as="h2"
            mode="rise"
            by="words"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Nuestras <span className="text-brand">Tecnologías</span>
          </KineticText>
          <Reveal effect="fade" delay={0.15}>
            <p className="text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
              Herramientas con las que trabajamos a diario. Elegimos cada una según el problema, no por moda: si tu proyecto necesita Laravel o CodeIgniter, no te vamos a empujar a Next.js solo porque suena bien.
            </p>
          </Reveal>
        </header>
      </div>

      {/* Lista accesible para lectores de pantalla */}
      <ul className="sr-only">
        {technologies.map((tech) => (
          <li key={tech.name}>{tech.name}</li>
        ))}
      </ul>

      {/* Una sola fila de marquee */}
      <Marquee items={technologies} speed={60} />
    </section>
  )
}
