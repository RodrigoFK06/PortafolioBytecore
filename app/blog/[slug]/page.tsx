// blog/[slug]/page.tsx - Ruta dinámica para cada artículo (Server Component)
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

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
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{ url: data.image || "/og-image.webp" }],
      type: "article",
      publishedTime: data.date,
      authors: [data.author || "Árkos"],
      tags: data.tags,
    },
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return notFound()

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"))
  const tags = data.tags || []

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
        <div className="flex items-center gap-4 text-sm text-foreground/40 pb-8 border-b border-black/5 dark:border-white/10">
          <span className="font-medium">{data.author || "Árkos"}</span>
          <span>·</span>
          <time>{formatDate(data.date)}</time>
        </div>
      </header>

      {/* Imagen hero del artículo */}
      {data.image && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl mb-12">
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5">
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
        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-black/5 prose-h2:dark:border-white/10 prose-h2:pb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
          prose-p:leading-relaxed prose-p:text-foreground/80
          prose-li:text-foreground/80
          prose-strong:text-foreground
          prose-a:text-brand prose-a:no-underline hover:prose-a:underline
          prose-code:text-brand prose-code:bg-brand/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
          prose-table:text-sm
          prose-th:bg-black/5 prose-th:dark:bg-white/5 prose-th:px-4 prose-th:py-2
          prose-td:px-4 prose-td:py-2
          prose-blockquote:border-brand prose-blockquote:bg-brand/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
          prose-hr:border-black/10 prose-hr:dark:border-white/10
          prose-img:rounded-xl
        ">
          <Markdown>{content}</Markdown>
        </div>
      </article>

      {/* Footer del artículo */}
      <footer className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl mt-16 pt-8 border-t border-black/5 dark:border-white/10">
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
            image: data.image ? `${baseUrl}${data.image}` : `${baseUrl}/og-image.webp`,
            datePublished: data.date,
            author: {
              "@type": "Organization",
              name: data.author || "Árkos",
              url: baseUrl,
            },
            publisher: {
              "@type": "Organization",
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
          }),
        }}
      />
    </main>
  )
}
