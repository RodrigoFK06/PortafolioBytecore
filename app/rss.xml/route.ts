import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const siteUrl = "https://portafolio-bytecore.vercel.app"

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
          return {
            slug,
            title: data.title || slug,
            date: data.date ? new Date(data.date).toUTCString() : new Date().toUTCString(),
            description: data.description || content.slice(0, 160),
          }
        })
    : []

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>ByteCore Blog</title>
    <link>${siteUrl}</link>
    <description>Entradas del blog de ByteCore</description>
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
