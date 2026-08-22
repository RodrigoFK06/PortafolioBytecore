// blog/[slug]/page.tsx - Ruta dinámica para cada artículo (Server Component)
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { alternates } from "@/lib/seo"
import { formatDate } from "@/lib/utils"

const BLOG_DIR = path.join(process.cwd(), "content/blog")
const baseUrl = "https://xn--rkos-4na.com"

export async function generateStaticParams() {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))
  return files.map((file) => ({ slug: file.replace(/\.md$/, "") }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    return { title: "Artículo no encontrado" }
  }
  const { data } = matter(fs.readFileSync(filePath, "utf-8"))
  return {
    title: `${data.title} | Blog Árkos`,
    description: data.description,
    alternates: alternates(`/blog/${slug}`),
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{ url: data.image || "/og-image.png" }],
      type: "article",
      publishedTime: data.date,
      authors: [data.author || "Árkos"],
      tags: data.tags,
    },
  }
}


// Extrae pares pregunta/respuesta de la sección "## Preguntas frecuentes"
// del markdown (formato: **¿Pregunta?** seguida de su párrafo de respuesta).
function extractFaqs(md: string): { q: string; a: string }[] {
  const section = md.split(/^##\s+Preguntas frecuentes\s*$/m)[1]
  if (!section) return []
  const chunk = section.split(/^##\s+/m)[0]
  const faqs: { q: string; a: string }[] = []
  const re = /\*\*(.+?)\*\*\s*\n([\s\S]+?)(?=\n\s*\n\*\*|$)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(chunk)) !== null) {
    const q = m[1].trim()
    const a = m[2].replace(/\s+/g, " ").replace(/\[([^\]]+)\]\([^\)]*\)/g, "$1").trim()
    if (q && a) faqs.push({ q, a })
  }
  return faqs
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return notFound()

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"))
  const tags = data.tags || []
  const faqs = extractFaqs(content)

  return (
    <main className="pt-28 pb-20">
      {/* Header del artículo */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl mb-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-foreground/40 mb-8">
          <Link href="/" className="hover:text-brand transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground/60 truncate max-w-[200px]">{data.title}</span>
        </nav>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand/10 text-brand"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Título */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
          {data.title}
        </h1>

        {/* Descripción */}
        <p className="text-lg text-foreground/60 leading-relaxed mb-6">
          {data.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-foreground/40 pb-8 border-b border-border">
          <span className="font-medium">{data.author && data.author !== "Árkos" ? data.author : "Rodrigo Torres"}</span>
          <span>·</span>
          <time dateTime={data.date}>{formatDate(data.date)}</time>
          {data.updated && data.updated !== data.date && (
            <>
              <span>·</span>
              <span className="italic">
                Actualizado el <time dateTime={data.updated}>{formatDate(data.updated)}</time>
              </span>
            </>
          )}
        </div>
      </header>

      {/* Imagen hero del artículo */}
      {data.image && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl mb-12">
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-secondary">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 896px"
            />
          </div>
        </div>
      )}

      {/* Contenido del artículo */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
        <div className="prose prose-lg prose-neutral max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
          prose-p:leading-relaxed prose-p:text-foreground/80
          prose-li:text-foreground/80
          prose-strong:text-foreground
          prose-a:text-brand prose-a:no-underline hover:prose-a:underline
          prose-code:text-brand prose-code:bg-brand/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
          prose-table:text-sm
          prose-th:bg-secondary prose-th:px-4 prose-th:py-2
          prose-td:px-4 prose-td:py-2
          prose-blockquote:border-brand prose-blockquote:bg-brand/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
          prose-hr:border-border
          prose-img:rounded-xl
        ">
          <Markdown>{content}</Markdown>
        </div>
      </article>

      {/* Author box — señal E-E-A-T visible: quién escribe y sus perfiles */}
      <aside className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl mt-16">
        <div className="flex items-start gap-5 p-6 rounded-lg bg-secondary shadow-hairline">
          <div className="relative w-16 h-16 rounded-md overflow-hidden shadow-hairline shrink-0">
            <Image
              src="/rodrigo-torres.webp"
              alt="Rodrigo Torres, fundador de Árkos"
              fill
              sizes="64px"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div>
            <p className="font-semibold text-foreground">Rodrigo Torres</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">
              Fundador de Árkos. Construye ERPs, PMS hoteleros y apps en producción para pymes de
              Perú y Latinoamérica — con cumplimiento SUNAT integrado de fábrica.
            </p>
            <div className="flex gap-4 mt-2 text-sm">
              <a
                href="https://www.linkedin.com/in/rodrigo-torres-arkos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/RodrigoFK06"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Footer del artículo */}
      <footer className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl mt-10 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/blog"
            className="text-sm font-medium text-foreground/60 hover:text-brand transition-colors"
          >
            ← Volver al blog
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors"
          >
            ¿Tienes un proyecto similar? Hablemos
          </Link>
        </div>
      </footer>

      {/* Schema.org Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data.title,
            description: data.description,
            image: data.image ? `${baseUrl}${data.image}` : `${baseUrl}/og-image.png`,
            datePublished: data.date,
            dateModified: data.updated || data.date,
            author:
              data.author && data.author !== "Árkos" && data.author !== "Rodrigo Torres"
                ? { "@type": "Person", name: data.author }
                : { "@type": "Person", "@id": `${baseUrl}/#rodrigo-torres`, name: "Rodrigo Torres" },
            publisher: {
              "@type": "Organization",
              "@id": `${baseUrl}/#organization`,
              name: "Árkos",
              url: baseUrl,
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo_ico/final%20-%20LOGO%202-02.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${baseUrl}/blog/${slug}`,
            },
            keywords: tags.join(", "),
            inLanguage: "es-PE",
          }),
        }}
      />

      {/* FAQPage — solo si el post tiene sección "Preguntas frecuentes" visible */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
    </main>
  )
}
