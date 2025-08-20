// middleware.ts
import { NextRequest, NextResponse } from "next/server"

// CORS para /api/contact
// CORS_ALLOWED_ORIGINS en .env como lista separada por comas
export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url)
  if (!pathname.startsWith("/api/contact")) return NextResponse.next()

  const origin = req.headers.get("origin") || ""
  const allowedEnv = process.env.CORS_ALLOWED_ORIGINS || "*"
  const allowedOrigins = allowedEnv.split(",").map((s) => s.trim()).filter(Boolean)
  const allowAll = allowedOrigins.includes("*")

  const res = req.method === "OPTIONS" ? new NextResponse(null, { status: 204 }) : NextResponse.next()

  if (allowAll) {
    res.headers.set("Access-Control-Allow-Origin", "*")
  } else if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin)
  }

  res.headers.set("Vary", "Origin")
  res.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
  res.headers.set("Access-Control-Allow-Headers",
    req.headers.get("access-control-request-headers") || "Content-Type, x-api-key"
  )

  if (req.method === "OPTIONS") {
    res.headers.set("Access-Control-Max-Age", "86400")
    return res
  }

  return res
}

export const config = { matcher: ["/api/contact/:path*"] }
