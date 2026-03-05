import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import Image from "next/image"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

interface BlogPost {
  slug: string
  title: string
  description: string
  image: string
  date: string
  author: string
  tags: string[]
}

function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"))
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        image: data.image || "/og-image.webp",
        date: data.date || "",
        author: data.author || "Árkos",
        tags: data.tags || [],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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

export default function BlogIndexPage() {
  const posts = getBlogPosts()

  return (
    <main className="pt-28 pb-20">
      {/* Hero del Blog */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand mb-4">
            Blog técnico
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Casos de estudio y artículos técnicos
          </h1>
          <p className="text-lg text-foreground/60 leading-relaxed max-w-2xl">
            Compartimos cómo resolvemos problemas reales con software. Arquitectura, decisiones técnicas y lecciones aprendidas en cada proyecto.
          </p>
        </div>
      </section>

      {/* Grid de artículos */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">
            Sin artículos aún. ¡Pronto publicaremos nuestro primer caso de estudio!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1">
                  {/* Imagen */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-black/5 dark:bg-white/5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand/10 text-brand"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Título */}
                    <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-brand transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Descripción */}
                    <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3 mb-4">
                      {post.description}
                    </p>

                    {/* Footer del card */}
                    <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
                      <span className="text-xs text-foreground/40 font-medium">
                        {formatDate(post.date)}
                      </span>
                      <span className="text-xs font-semibold text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                        Leer artículo →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 mt-20">
        <div className="rounded-2xl bg-gradient-to-br from-brand/5 to-brand/10 dark:from-brand/10 dark:to-brand/5 border border-brand/10 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Tienes un proyecto similar?
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto mb-6">
            En Árkos transformamos ideas en software profesional. Si alguno de estos casos te inspiró, hablemos sobre tu proyecto.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand/90 transition-colors"
          >
            Iniciar conversación
          </Link>
        </div>
      </section>
    </main>
  )
}
