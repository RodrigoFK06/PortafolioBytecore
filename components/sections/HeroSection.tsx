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
    <span className="inline-block overflow-hidden pb-[0.25em] -mb-[0.25em] pr-[0.25em] -mr-[0.25em]">
      <span className={`hero-word inline-block pr-[0.1em] ${className}`} style={{ transform: "translateY(110%)" }}>
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
  const noteRef = useRef<HTMLDivElement>(null)
  const proofRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      // 0. Marginal note
      tl.fromTo(
        noteRef.current,
        { y: -10, opacity: 0, rotation: -6 },
        { y: 0, opacity: 1, rotation: -2, duration: 1 },
        0.2
      )

      // 1. Tagline — slide in from left
      tl.fromTo(
        taglineRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.4
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
          0.6
        )
      }

      // 3. Description — slide in from right (+ glass reveal)
      tl.fromTo(
        descRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        1.3
      )

      // 4. CTAs — stagger in
      const buttons = ctaRef.current?.querySelectorAll(":scope > *")
      if (buttons?.length) {
        tl.fromTo(
          buttons,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
          1.6
        )
      }

      // 5. Social proof strip
      tl.fromTo(
        proofRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        2.0
      )

      // 6. Scroll indicator
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        2.4
      )

      // Scroll indicator bounce (infinite)
      gsap.to(".scroll-dot", {
        y: 8,
        duration: 0.75,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Logo spin (infinite)
      gsap.to(".logo-spin", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-500"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.06] dark:opacity-[0.04] bg-noise" />

      {/* Animated Organic Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-brand/30 dark:bg-brand/50 rounded-full blur-[100px] animate-orb-1 opacity-70" />
        <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] bg-purple-500/30 dark:bg-purple-600/50 rounded-full blur-[120px] animate-orb-2 opacity-60" />
        <div className="absolute bottom-[20%] left-[30%] w-[45vw] h-[45vw] bg-blue-500/20 dark:bg-blue-600/40 rounded-full blur-[130px] animate-orb-3 opacity-60" />
        <div className="absolute top-[40%] right-[30%] w-[30vw] h-[30vw] bg-indigo-500/20 dark:bg-indigo-500/40 rounded-full blur-[90px] animate-orb-4 opacity-50" />
      </div>

      {/* Grid overlay - Reduced opacity for subtle effect */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 pt-32 md:pt-40 pb-20 lg:pb-0 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto relative text-left w-full">
          
          {/* Anotación Marginal (Human-First text) */}
          <div 
            ref={noteRef}
            className="absolute -top-16 left-4 md:-top-12 md:left-12 font-mono text-[10px] md:text-sm text-brand/80 italic px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 z-20"
            style={{ opacity: 0 }}
            aria-hidden="true"
          >
            // Iteración v2.4 — Diseño a mano
          </div>

          {/* Tagline */}
          <h2
            ref={taglineRef}
            className="text-sm md:text-base font-bold text-brand tracking-[0.2em] uppercase mb-8 ml-2 md:ml-12"
            style={{ opacity: 0 }}
          >
            Agencia Digital
          </h2>

          {/* Headline — Left Aligned, overlapping */}
          <h1
            ref={headlineRef}
            className="text-[3rem] sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-black tracking-tighter leading-[0.9] mb-8 md:mb-12 relative z-10 w-full"
          >
            <HeroWord>Mejoramos</HeroWord>
            <br />
            <span className="ml-0 md:ml-[1.5em] inline-block">
               <HeroWord>tus</HeroWord>{" "}
               <HeroWord className="text-brand relative">
                 pr
                 <span className="sr-only">o</span>
                 <span
                   aria-hidden="true"
                   className="inline-block align-baseline mx-[0.05em] w-[0.75em] h-[0.75em] relative logo-spin origin-center translate-y-[0.1em]"
                 >
                   <img
                     src="/logo_ico/final - LOGO 2-071.svg"
                     alt=""
                     aria-hidden="true"
                     className="absolute inset-0 w-full h-full object-contain dark:hidden"
                   />
                   <img
                     src="/logo_ico/final - LOGO 2-081.svg"
                     alt=""
                     aria-hidden="true"
                     className="absolute inset-0 w-full h-full object-contain hidden dark:block"
                   />
                 </span>
                 cesos
               </HeroWord>
            </span>
          </h1>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-12 mt-4 lg:-mt-8 w-full relative z-20 mb-10 md:mb-12 lg:mb-16">
            {/* CTAs - Shifted left */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 ml-0 md:ml-2 lg:ml-12 order-2 lg:order-1 self-start lg:self-end w-full sm:w-auto">
              <Button asChild size="lg" className="group rounded-xl relative overflow-hidden bg-brand text-brand-foreground hover:bg-brand/90 w-full sm:w-auto" style={{ opacity: 0 }}>
                <Link href="#projects" className="flex items-center justify-center">
                  <span className="relative z-10 flex items-center">
                    Ver Proyectos
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="group rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-[12px] border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-colors w-full sm:w-auto" style={{ opacity: 0 }}>
                <Link href="#contact" className="flex items-center justify-center">
                  Contáctanos
                </Link>
              </Button>
            </div>

            {/* Description - Glassmorphism Card on the right */}
            <div
              ref={descRef}
              className="w-full lg:w-[45%] xl:w-[40%] text-base md:text-lg text-foreground/80 leading-relaxed font-normal p-6 md:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative order-1 lg:order-2 transition-colors"
              style={{ opacity: 0 }}
            >
              <div className="absolute inset-0 rounded-2xl border border-black/10 dark:border-white/10 pointer-events-none transition-colors" style={{ background: "linear-gradient(135deg, rgba(150,150,150,0.15) 0%, rgba(150,150,150,0) 100%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px"}} />
              <p className="relative z-10">
                Somos <strong className="text-foreground">Árkos</strong>, una agencia digital especializada en traducir tus procesos empresariales
                en soluciones web rápidas, software a medida y un diseño UI/UX de alto rendimiento.
              </p>
            </div>
          </div>

          {/* Social proof strip - prueba arriba del fold */}
          <div
            ref={proofRef}
            className="w-full relative z-20 mb-16 md:mb-24 lg:mb-28 ml-0 md:ml-2 lg:ml-12"
            style={{ opacity: 0 }}
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs md:text-sm text-foreground/75 max-w-4xl">
              <span className="font-mono uppercase tracking-widest text-brand text-[10px] md:text-xs shrink-0">
                Sistemas en producción
              </span>
              <span className="hidden md:block w-px h-4 bg-foreground/15" aria-hidden="true" />
              <span>
                <strong className="text-foreground font-bold">78%</strong> de citas digitales <span className="text-foreground/55">— Clínica Juan Pablo II</span>
              </span>
              <span className="hidden md:block w-px h-4 bg-foreground/15" aria-hidden="true" />
              <a
                href="https://apps.apple.com/pe/app/rapiditos-vz/id6748567718"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors"
              >
                <strong className="text-foreground font-bold">Rapiditos</strong> en App Store <span className="text-foreground/55">— delivery activo</span>
              </a>
              <span className="hidden md:block w-px h-4 bg-foreground/15" aria-hidden="true" />
              <span>
                <strong className="text-foreground font-bold">+40</strong> proyectos desplegados
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile, overlapping risk */}
      <div
        ref={scrollRef}
        className="hidden md:block absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10"
        style={{ opacity: 0 }}
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-md hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer text-foreground/70 dark:text-white/70">
           <div className="scroll-dot w-6 h-6 flex flex-col items-center justify-center">
              <ArrowRight className="w-4 h-4 rotate-90" />
           </div>
        </div>
      </div>
    </section>
  )
}
