"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, Layout, Palette, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBar } from "@/components/skill-bar"
import { ContactForm } from "@/components/contact-form"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedText } from "@/components/animated-text"
import { CursorFollower } from "@/components/cursor-follower"
import { ProjectFilter } from "@/components/project-filter"
import { ScrollToTop } from "@/components/scroll-to-top"
import { projects } from "@/data/projects"
import HeroCanvas from "@/components/HeroCanvas"
import Timeline from "@/components/Timeline"

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main className="relative">
      <CursorFollower />
      <ScrollToTop />

      {/* Hero Section */}
      <section
        ref={ref}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 🎨 Fondo Animado */}
        <div className="absolute inset-0 w-full h-full">
          <HeroCanvas />
        </div>

        {/* 📌 Contenido Centrado */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center items-center h-screen">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 md:mt-0 flex justify-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight text-center">
                <AnimatedText text={
                  <>
                    Tu Software Hecho{" "}
                    <span className="inline-flex flex-wrap gap-2 md:gap-4 justify-center items-center">
                      <span className="glass-effect px-3 py-1 md:px-4 md:py-2">Byte</span>
                      <span className="inline-block text-xl md:text-2xl lg:text-3xl">x</span>
                      <span className="glass-effect px-3 py-1 md:px-4 md:py-2">Byte</span>
                    </span>
                  </>
                } />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="my-10"
            >
              <p className="my-10 text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Somos ByteCore, una agencia digital especializada en desarrollo web, diseño UI/UX y soluciones
                tecnológicas innovadoras.
              </p>
            </motion.div>

            {/* 🏆 Botones de Acción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="group">
                <Link href="#projects">
                  Ver Proyectos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="#contact">Contáctanos</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* 🔽 Indicador de Scroll */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>


      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Sobre <span className="text-primary">Nosotros</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                ByteCore es una agencia digital comprometida con la creación de experiencias web excepcionales,
                combinando diseño innovador con desarrollo técnico de alta calidad.
              </p>
            </motion.div>
          </div>

          {/* Grid con Timeline + Historia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Timeline en la izquierda */}
            <Timeline />

            <div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6">Nuestra Historia</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Fundada con la visión de transformar el panorama digital, ByteCore ha evolucionado hasta convertirse
                  en una agencia líder en desarrollo web y diseño UI/UX. Nuestro equipo multidisciplinario combina
                  experiencia técnica con creatividad para ofrecer soluciones digitales que destacan en el mercado.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Nos apasiona crear experiencias digitales accesibles, intuitivas y visualmente atractivas que conectan
                  marcas con sus audiencias. Nuestro enfoque colaborativo nos permite entender profundamente las
                  necesidades de cada cliente para desarrollar soluciones personalizadas que generan resultados
                  tangibles.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter from={0} to={5} duration={2} />+
                  </h4>
                  <p className="text-sm text-muted-foreground">Años de Experiencia</p>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter from={0} to={50} duration={2} />+
                  </h4>
                  <p className="text-sm text-muted-foreground">Proyectos Completados</p>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter from={0} to={30} duration={2} />+
                  </h4>
                  <p className="text-sm text-muted-foreground">Clientes Satisfechos</p>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter from={0} to={15} duration={2} />+
                  </h4>
                  <p className="text-sm text-muted-foreground">Premios Ganados</p>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button variant="outline" size="icon" asChild>
                    <Link
                      href="https://github.com/bytecore"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button variant="outline" size="icon" asChild>
                    <Link
                      href="https://linkedin.com/company/bytecore"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="mailto:info@bytecore.com" aria-label="Email">
                      <Mail className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Nuestros <span className="text-primary">Servicios</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Ofrecemos soluciones digitales completas para ayudar a tu empresa a destacar en el mundo digital.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col">
                <div className="mb-6 text-primary">
                  <Layout className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold mb-4">Desarrollo Web</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Creamos sitios web y aplicaciones a medida utilizando las últimas tecnologías como React, Next.js y
                  Node.js, garantizando rendimiento, escalabilidad y experiencias de usuario excepcionales.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/services#web-development">
                    Saber más
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col">
                <div className="mb-6 text-primary">
                  <Palette className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold mb-4">Diseño UI/UX</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Diseñamos interfaces intuitivas y atractivas centradas en el usuario, mejorando la usabilidad y
                  creando experiencias digitales memorables que conectan con tu audiencia.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/services#ui-ux-design">
                    Saber más
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-card p-8 border border-border rounded-lg h-full flex flex-col">
                <div className="mb-6 text-primary">
                  <Monitor className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold mb-4">E-Commerce</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Desarrollamos tiendas online personalizadas y optimizadas para conversión, integrando pasarelas de
                  pago seguras y funcionalidades avanzadas para impulsar tus ventas en línea.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/services#ecommerce">
                    Saber más
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <Button asChild className="group">
                <Link href="/services" className="flex items-center">
                  Ver todos los servicios
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Nuestras <span className="text-primary">Tecnologías</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Utilizamos las tecnologías más avanzadas para crear soluciones digitales robustas, escalables y de alto
                rendimiento.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <SkillBar name="React / Next.js" percentage={95} delay={0.1} />
              <SkillBar name="JavaScript / TypeScript" percentage={90} delay={0.2} />
              <SkillBar name="Node.js / Express" percentage={85} delay={0.3} />
              <SkillBar name="Tailwind CSS" percentage={90} delay={0.4} />
            </div>
            <div className="space-y-6">
              <SkillBar name="UI/UX Design" percentage={85} delay={0.5} />
              <SkillBar name="Bases de Datos (SQL/NoSQL)" percentage={80} delay={0.6} />
              <SkillBar name="AWS / Vercel / Netlify" percentage={75} delay={0.7} />
              <SkillBar name="WordPress / Shopify" percentage={85} delay={0.8} />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Featured <span className="text-primary">Projects</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                A selection of my recent work showcasing my skills in design, development, and animation.
              </p>
            </motion.div>

            <ProjectFilter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageSrc={project.imageSrc}
                link={project.link}
                githubLink={project.githubLink}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <Button asChild variant="outline" className="group">
                <Link href="/projects" className="flex items-center">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Client <span className="text-primary">Testimonials</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                What clients and colleagues have to say about working with me.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-8 rounded-lg shadow-sm border"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 flex-grow">
                  "An exceptional developer who consistently delivers high-quality work. Their attention to detail and
                  creative problem-solving skills made our project a success."
                </p>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">CEO, TechStart Inc.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-8 rounded-lg shadow-sm border"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 flex-grow">
                  "Working with this developer was a pleasure. They understood our vision immediately and transformed it
                  into a beautiful, functional website that exceeded our expectations."
                </p>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Marketing Director, Innovate Solutions</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card p-8 rounded-lg shadow-sm border"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 flex-grow">
                  "Not only is their technical skill impressive, but their communication and project management made the
                  entire process smooth and stress-free. I highly recommend their services."
                </p>
                <div>
                  <p className="font-semibold">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Founder, Design Collective</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Ponte en <span className="text-primary">Contacto</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground mb-8 leading-relaxed">
                ¿Tienes un proyecto en mente? ¿Quieres discutir cómo podemos ayudarte? ¡Nos encantaría escucharte!
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-1 text-primary" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">info@bytecore.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Linkedin className="h-5 w-5 mr-3 mt-1 text-primary" />
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <p className="text-muted-foreground">linkedin.com/company/bytecore</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Github className="h-5 w-5 mr-3 mt-1 text-primary" />
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <p className="text-muted-foreground">github.com/bytecore</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6">Trabajemos Juntos</h3>
              <p className="text-muted-foreground mb-6">
                Estamos siempre abiertos a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de
                tu visión empresarial.
              </p>

              <div className="flex gap-4">
                <Button asChild className="group">
                  <Link href="mailto:info@bytecore.com">
                    Enviar Email
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/brochure.pdf" target="_blank" rel="noopener noreferrer">
                    Descargar Brochure
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-card p-8 rounded-lg shadow-sm border"
            >
              <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

