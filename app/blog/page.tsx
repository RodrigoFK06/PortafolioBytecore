import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export default function BlogIndexPage() {
  const items = fs.existsSync(BLOG_DIR)
    ? fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".md"))
        .map((file) => {
          const slug = file.replace(/\.md$/, "")
          const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"))
          return { slug, title: data.title || slug, description: data.description || "" }
        })
    : []

  return (
    <main className="pt-24 pb-16 container mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-6">
        {items.map((i) => (
          <li key={i.slug} className="bg-card border rounded p-4">
            <Link className="text-brand hover:underline" href={`/blog/${i.slug}`}>
              {i.title}
            </Link>
            {i.description && <p className="text-muted-foreground">{i.description}</p>}
          </li>
        ))}
        {items.length === 0 && <p className="text-muted-foreground">Sin artículos aún.</p>}
      </ul>
    </main>
  )
}
