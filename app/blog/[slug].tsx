// blog/[slug]/page.tsx - Ruta dinámica para cada artículo
"use client"

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import { Metadata } from "next"

interface BlogPostProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const filePath = path.join(process.cwd(), "content/blog", `${params.slug}.md`)
  if (!fs.existsSync(filePath)) {
    return { title: "Artículo no encontrado" }
  }
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data } = matter(fileContent)

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{ url: data.image || "/fondobytecore.png" }],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostProps) {
  const filePath = path.join(process.cwd(), "content/blog", `${params.slug}.md`)

  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return (
    <main className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{data.title}</h1>
      <p className="text-muted-foreground mb-6">{data.description}</p>
      <article className="prose prose-neutral dark:prose-invert">
        <Markdown>{content}</Markdown>
      </article>
    </main>
  )
}
