"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

function HeroWord({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-2">
      <span className={`hero-word inline-block ${className}`} style={{ transform: "translateY(110%)" }}>
        {children}
      </span>
    </span>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      // 1. Tagline — slide in from left
      tl.fromTo(
        taglineRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.3
      )

      // 2. Headline words — slide up from below the overflow wrapper
      const words = headlineRef.current?.querySelectorAll(".hero-word")
      if (words?.length) {
        tl.to(
          words,
          {
            y: 0,
            duration: 1.1,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.5
        )
      }

      // 3. Description — slide up
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.2
      )

      // 4. CTAs — stagger in
      const buttons = ctaRef.current?.querySelectorAll(":scope > *")
      if (buttons?.length) {
        tl.fromTo(
          buttons,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
          1.5
        )
      }

      // 5. Scroll indicator
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        2.0
      )

      // Scroll indicator bounce (infinite)
      gsap.to(".scroll-dot", {
        y: 8,
        duration: 0.75,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 hero-mesh-gradient opacity-30 dark:opacity-20" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Tagline */}
          <h2
            ref={taglineRef}
            className="text-sm md:text-base font-medium text-brand tracking-widest uppercase mb-6"
            style={{ opacity: 0 }}
          >
            Agencia Digital
          </h2>

          {/* Headline — each word in an overflow wrapper */}
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[1] mb-8"
          >
            <HeroWord>Tu</HeroWord>{" "}
            <HeroWord>Software</HeroWord>
            <br />
            <HeroWord>Hecho</HeroWord>{" "}
            <HeroWord className="text-brand">
              Byte
              <span className="text-foreground/30 mx-1 md:mx-2 text-3xl md:text-5xl lg:text-6xl align-middle font-light">
                ×
              </span>
              Byte
            </HeroWord>
          </h1>

          {/* Description */}
          <h3
            ref={descRef}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
            style={{ opacity: 0 }}
          >
            Somos Árkos, una agencia digital especializada en desarrollo web,
            diseño UX/UI y soluciones tecnológicas innovadoras.
          </h3>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group" style={{ opacity: 0 }}>
              <Link href="#projects" className="flex items-center">
                Ver Proyectos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="group" style={{ opacity: 0 }}>
              <Link href="#contact" className="flex items-center">
                Contáctanos
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 inset-x-0 flex justify-center z-10"
        style={{ opacity: 0 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center items-start p-1">
          <div className="scroll-dot w-1 h-2 bg-foreground/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
