import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portafolio-bytecore.vercel.app"

  const staticItems: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.6 },
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
          return {
            url: `${baseUrl}/blog/${slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.6,
          }
        })
    : []

  return [...staticItems, ...blogItems]
}
