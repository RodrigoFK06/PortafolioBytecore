import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://xn--rkos-4na.com"
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "bingbot",
        allow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
