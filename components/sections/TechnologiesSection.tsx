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
    <div className="flex items-center gap-3 px-6 py-4 border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[12px] rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 shrink-0 group shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <tech.Icon className="w-5 h-5 text-foreground/70 group-hover:text-brand transition-colors duration-300" />
      <span className="text-sm font-medium text-foreground/80 whitespace-nowrap group-hover:text-foreground transition-colors duration-300 font-mono tracking-wide">
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
    <section id="technologies" className="py-16 md:py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 mb-16 md:mb-24">
        <div className="max-w-4xl relative text-left">
          
          {/* Anotación Marginal */}
          <div className="absolute -top-10 left-0 md:-left-4 font-mono text-[10px] text-brand/80 italic px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 z-20 transform -rotate-2">
             // Stack Tecnológico_
          </div>

          <RevealText as="h2" className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-left relative z-10 mb-8 md:mb-12">
            Nuestras <br className="hidden md:block" /> <span className="text-brand">Tecnologías</span>
          </RevealText>

          <RevealText delay={0.2}>
            <p className="text-foreground/70 mt-8 max-w-2xl text-base md:text-lg leading-relaxed relative z-10 md:pl-16 border-l-[2px] border-brand/30 ml-2">
              Utilizamos herramientas de alto rendimiento para crear soluciones
              digitales robustas y arquitecturas que escalan, desatando el verdadero poder del ecosistema moderno.
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
