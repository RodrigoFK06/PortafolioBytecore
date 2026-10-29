import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const siteUrl = "https://xn--rkos-4na.com"

export async function GET() {
  const blogDir = path.join(process.cwd(), "content/blog")
  const items = fs.existsSync(blogDir)
    ? fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "")
        const raw = fs.readFileSync(path.join(blogDir, file), "utf8")
        const { data, content } = matter(raw)
        const published = data.date ? new Date(data.date) : new Date()
        return {
          slug,
          title: data.title || slug,
          date: published.toUTCString(),
          timestamp: published.getTime(),
          description: data.description || content.slice(0, 160),
        }
      })
      .sort((a, b) => b.timestamp - a.timestamp)
    : []

  const lastBuildDate = items[0]?.date ?? new Date().toUTCString()

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Árkos Blog</title>
    <link>${siteUrl}</link>
    <description>Entradas del blog de Árkos</description>
    <language>es-PE</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items
      .map(
        (i) => `
    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${siteUrl}/blog/${i.slug}</link>
      <guid>${siteUrl}/blog/${i.slug}</guid>
      <pubDate>${i.date}</pubDate>
      <description>${escapeXml(i.description)}</description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  })
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
