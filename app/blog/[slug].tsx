// blog/[slug]/page.tsx - Ruta dinámica para cada artículo (Server Component)
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import type { Metadata } from "next"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export async function generateStaticParams() {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))
  return files.map((file) => ({ slug: file.replace(/\.md$/, "") }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const filePath = path.join(BLOG_DIR, `${params.slug}.md`)
  if (!fs.existsSync(filePath)) {
    return { title: "Artículo no encontrado" }
  }
  const { data } = matter(fs.readFileSync(filePath, "utf-8"))
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{ url: data.image || "/og-image.webp" }],
      type: "article",
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(BLOG_DIR, `${params.slug}.md`)
  if (!fs.existsSync(filePath)) return notFound()

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"))

  return (
    <main className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand">{data.title}</h1>
      <p className="text-muted-foreground mb-6">{data.description}</p>
      <article className="prose prose-neutral dark:prose-invert">
        <Markdown>{content}</Markdown>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data.title,
            description: data.description,
            image: data.image || "/og-image.webp",
            mainEntityOfPage: { "@type": "WebPage", "@id": `/blog/${params.slug}` },
          }),
        }}
      />
    </main>
  )
}
