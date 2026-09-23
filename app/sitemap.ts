import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { projects, isIndexableCase } from "@/data/projects"
import { SERVICES } from "@/data/services"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xn--rkos-4na.com"

  // Sin lastModified automático: un lastmod que cambia en cada build sin
  // cambio real de contenido hace que Google desconfíe del sitemap completo.
  // Los posts llevan su fecha real (frontmatter) y las páginas de abajo llevan
  // la fecha de su última edición REAL, mantenida a mano.
  //
  // Regla al editar: si cambias el contenido de una de estas páginas, actualiza
  // su fecha aquí. Si solo tocas estilos o refactorizas, NO la toques.
  const LAST_UPDATED: Record<string, string> = {
    "": "2026-09-10", // reposicionamiento: hero, About, fundador, timeline
    "/services": "2026-09-10",
    "/services/integracion-ia": "2026-09-10", // "IA aplicada y adopción"
    "/precios": "2026-09-23", // nota de IA apunta al taller
    "/taller": "2026-09-23",
    "/diagnostico": "2026-09-23", // paso 2 + garantía 3x
    "/desarrollo-de-software-lima": "2026-08-04",
    "/cumplimiento-sunat": "2026-07-19",
    "/costo-del-excel": "2026-07-19",
    "/necesitas-un-sistema": "2026-07-19",
    "/portfolio": "2026-06-28",
  }
  const lastModOf = (path: string) => {
    const d = LAST_UPDATED[path]
    return d ? { lastModified: new Date(d) } : {}
  }

  // Nota: /projects ya NO va aquí — redirige 301 a /portfolio (ver
  // next.config.mjs). Una URL que redirige no debe declararse en el sitemap.
  const staticItems: MetadataRoute.Sitemap = [
    // Sin barra final: es la forma exacta que Next emite en el canonical del
    // home. El sitemap la declaraba con barra y el canonical sin ella — dos
    // formas de la misma URL para Google.
    { url: baseUrl, changeFrequency: "weekly", priority: 1, ...lastModOf("") },
    // La página de dinero: es la que debe rankear por "desarrollo de software
    // a medida en Lima" y la que sostiene todo el enlazado interno nuevo.
    { url: `${baseUrl}/desarrollo-de-software-lima`, changeFrequency: "monthly", priority: 0.9, ...lastModOf("/desarrollo-de-software-lima") },
    { url: `${baseUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8, ...lastModOf("/portfolio") },
    // El hub sube de 0.6 a 0.8: dejó de ser una página de 131 palabras con seis
    // botones muertos y ahora es el padre de seis subpáginas reales.
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.8, ...lastModOf("/services") },
    // Orden de la oferta: taller (entrada) → diagnóstico → desarrollo.
    { url: `${baseUrl}/taller`, changeFrequency: "monthly", priority: 0.9, ...lastModOf("/taller") },
    { url: `${baseUrl}/diagnostico`, changeFrequency: "monthly", priority: 0.9, ...lastModOf("/diagnostico") },
    { url: `${baseUrl}/necesitas-un-sistema`, changeFrequency: "monthly", priority: 0.7, ...lastModOf("/necesitas-un-sistema") },
    { url: `${baseUrl}/cumplimiento-sunat`, changeFrequency: "monthly", priority: 0.7, ...lastModOf("/cumplimiento-sunat") },
    { url: `${baseUrl}/costo-del-excel`, changeFrequency: "monthly", priority: 0.7, ...lastModOf("/costo-del-excel") },
    { url: `${baseUrl}/precios`, changeFrequency: "monthly", priority: 0.8, ...lastModOf("/precios") },
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
    ...lastModOf(`/services/${s.slug}`),
  }))

  // Solo las fichas con caso de estudio real. Las otras 22 se sirven con
  // `noindex` (ver INDEXABLE_CASE_IDS en data/projects.ts) y declarar en el
  // sitemap una URL que pide no ser indexada es una contradicción que resta
  // confianza al sitemap completo. Siguen visibles y enlazadas desde
  // /portfolio, que es el hub indexable.
  const portfolioItems: MetadataRoute.Sitemap = projects
    .filter((p) => isIndexableCase(p.id))
    .map((p) => ({
      url: `${baseUrl}/portfolio/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
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
