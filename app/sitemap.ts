import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xn--rkos-4na.com"

  // Sin lastModified en páginas estáticas: un lastmod que cambia en cada
  // build sin cambio real de contenido hace que Google desconfíe del
  // sitemap completo. Los posts sí llevan su fecha real (frontmatter).
  const staticItems: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/diagnostico`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/necesitas-un-sistema`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/cumplimiento-sunat`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/costo-del-excel`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/precios`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/terminosycondiciones`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/politicadeprivacidad`, changeFrequency: "yearly", priority: 0.4 },
  ]

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

  return [...staticItems, ...blogItems]
}
