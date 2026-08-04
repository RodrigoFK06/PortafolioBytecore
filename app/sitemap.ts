import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { projects } from "@/data/projects"
import { SERVICES } from "@/data/services"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xn--rkos-4na.com"

  // Sin lastModified en páginas estáticas: un lastmod que cambia en cada
  // build sin cambio real de contenido hace que Google desconfíe del
  // sitemap completo. Los posts sí llevan su fecha real (frontmatter).
  //
  // Nota: /projects ya NO va aquí — redirige 301 a /portfolio (ver
  // next.config.mjs). Una URL que redirige no debe declararse en el sitemap.
  const staticItems: MetadataRoute.Sitemap = [
    // Sin barra final: es la forma exacta que Next emite en el canonical del
    // home. El sitemap la declaraba con barra y el canonical sin ella — dos
    // formas de la misma URL para Google.
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    // La página de dinero: es la que debe rankear por "desarrollo de software
    // a medida en Lima" y la que sostiene todo el enlazado interno nuevo.
    { url: `${baseUrl}/desarrollo-de-software-lima`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    // El hub sube de 0.6 a 0.8: dejó de ser una página de 131 palabras con seis
    // botones muertos y ahora es el padre de seis subpáginas reales.
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/diagnostico`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/necesitas-un-sistema`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/cumplimiento-sunat`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/costo-del-excel`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/precios`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/terminosycondiciones`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/politicadeprivacidad`, changeFrequency: "yearly", priority: 0.4 },
  ]

  // Las seis subpáginas de servicio (600–900 palabras cada una). Antes no
  // existían: los "Saber más" del hub eran <button> sin href.
  const serviceItems: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Las fichas de caso son las páginas más específicas y transaccionales del
  // sitio (cliente, sector, stack, métricas) y estaban FUERA del sitemap pese
  // a ser indexables y estar enlazadas desde el home.
  const portfolioItems: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/portfolio/${p.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const blogDir = path.join(process.cwd(), "content/blog")
  const blogItems: MetadataRoute.Sitemap = fs.existsSync(blogDir)
    ? fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const slug = f.replace(/\.md$/, "")
        // lastModified real desde el frontmatter (updated/date), no la fecha de build
        let lastModified: Date | undefined
        try {
          const { data } = matter(fs.readFileSync(path.join(blogDir, f), "utf-8"))
          const rawDate = data.updated || data.date
          if (rawDate) {
            const d = new Date(rawDate)
            if (!isNaN(d.getTime())) lastModified = d
          }
        } catch {
          // frontmatter ilegible → se omite lastModified para esta entrada
        }
        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }
      })
    : []

  return [...staticItems, ...serviceItems, ...portfolioItems, ...blogItems]
}
