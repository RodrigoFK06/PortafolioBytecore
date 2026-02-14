"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { RevealText } from "@/components/gsap-reveal"

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
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiPrisma,
  SiAmazonwebservices,
  SiDocker,
  SiVercel,
  SiKubernetes,
  SiGit,
} from "react-icons/si"
import { TbApi, TbRefresh, TbDatabase } from "react-icons/tb"
import type { IconType } from "react-icons"

gsap.registerPlugin(ScrollTrigger)

interface TechItem {
  name: string
  Icon: IconType
}

const rows: TechItem[][] = [
  [
    { name: "React", Icon: SiReact },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "Angular", Icon: SiAngular },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Tailwind CSS", Icon: SiTailwindcss },
    { name: "Flutter", Icon: SiFlutter },
    { name: "PostgreSQL", Icon: SiPostgresql },
    { name: "MongoDB", Icon: SiMongodb },
  ],
  [
    { name: "Node.js", Icon: SiNodedotjs },
    { name: "Express", Icon: SiExpress },
    { name: "Laravel", Icon: SiLaravel },
    { name: "Spring Boot", Icon: SiSpringboot },
    { name: "GraphQL", Icon: SiGraphql },
    { name: "REST APIs", Icon: TbApi },
    { name: "AWS", Icon: SiAmazonwebservices },
    { name: "Docker", Icon: SiDocker },
  ],
  [
    { name: "MySQL", Icon: SiMysql },
    { name: "Firebase", Icon: SiFirebase },
    { name: "Prisma", Icon: SiPrisma },
    { name: "SQL Server", Icon: TbDatabase },
    { name: "Vercel", Icon: SiVercel },
    { name: "CI/CD", Icon: TbRefresh },
    { name: "Kubernetes", Icon: SiKubernetes },
    { name: "Git", Icon: SiGit },
  ],
]

function TechChip({ tech }: { tech: TechItem }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 border border-border bg-card rounded-md hover:border-brand/40 transition-colors duration-200 shrink-0">
      <tech.Icon className="w-5 h-5 text-foreground/70" />
      <span className="text-sm font-medium text-foreground/80 whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  )
}

function MarqueeRow({
  items,
  speed,
  reverse = false,
}: {
  items: TechItem[]
  speed: number
  reverse?: boolean
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  // Wait for layout to be painted before measuring
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useGSAP(
    () => {
      if (!trackRef.current || !ready) return

      const track = trackRef.current
      // Get the total width of one set of items (first half)
      const children = track.children
      const itemCount = items.length
      let oneSetWidth = 0

      for (let i = 0; i < itemCount; i++) {
        const child = children[i] as HTMLElement
        if (child) {
          oneSetWidth += child.offsetWidth + 16 // 16 = gap-4 (1rem)
        }
      }

      if (oneSetWidth <= 0) return

      // Set initial position for reverse
      if (reverse) {
        gsap.set(track, { x: -oneSetWidth })
      }

      gsap.to(track, {
        x: reverse ? 0 : -oneSetWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const val = parseFloat(x)
            if (reverse) {
              // Going right: when reaches 0, wrap to -oneSetWidth
              return `${((val % oneSetWidth) + oneSetWidth) % oneSetWidth - oneSetWidth}px`
            } else {
              // Going left: when reaches -oneSetWidth, wrap to 0
              return `${((val % oneSetWidth) - oneSetWidth) % oneSetWidth}px`
            }
          },
        },
      })
    },
    { scope: trackRef, dependencies: [ready] }
  )

  // Triple the items for seamless wrapping on wide screens
  const allItems = [...items, ...items, ...items]

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-4 w-max"
      >
        {allItems.map((tech, i) => (
          <TechChip key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  )
}

export default function TechnologiesSection() {
  return (
    <section id="technologies" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText as="h2" className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">
            Nuestras <span className="text-brand">Tecnologías</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Utilizamos las tecnologías más avanzadas para crear soluciones
              digitales robustas, escalables y de alto rendimiento.
            </p>
          </RevealText>
        </div>
      </div>

      {/* Marquee rows — full-bleed, seamless infinite loop */}
      <div className="space-y-4">
        <MarqueeRow items={rows[0]} speed={25} />
        <MarqueeRow items={rows[1]} speed={30} reverse />
        <MarqueeRow items={rows[2]} speed={20} />
      </div>
    </section>
  )
}
