import { NextRequest, NextResponse } from "next/server"

// CORS para /api/contact
// Configura CORS_ALLOWED_ORIGINS en .env como lista separada por comas
// Ej: CORS_ALLOWED_ORIGINS=https://tuweb.com,https://admin.tuweb.com,http://localhost:3000
export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url)

  // Solo aplicar a la API de contacto
  if (!pathname.startsWith("/api/contact")) {
    return NextResponse.next()
  }

  const origin = req.headers.get("origin") || ""
  const allowedEnv = process.env.CORS_ALLOWED_ORIGINS || "*" // se puede restringir luego
  const allowedOrigins = allowedEnv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  const allowAll = allowedOrigins.includes("*")
  const res = req.method === "OPTIONS" ? new NextResponse(null, { status: 204 }) : NextResponse.next()

  // Access-Control-Allow-Origin
  if (allowAll) {
    res.headers.set("Access-Control-Allow-Origin", "*")
  } else if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin)
  }

  // Vary para caches/proxies
  res.headers.set("Vary", "Origin")

  // Métodos y headers permitidos
  res.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
  res.headers.set(
    "Access-Control-Allow-Headers",
    req.headers.get("access-control-request-headers") || "Content-Type, x-api-key"
  )

  // Si en el futuro necesitas cookies o auth cross-site:
  // res.headers.set("Access-Control-Allow-Credentials", "true")

  // Preflight
  if (req.method === "OPTIONS") {
    // Max-Age opcional para cachear la preflight
    res.headers.set("Access-Control-Max-Age", "86400")
    return res
  }

  return res
}

export const config = {
  matcher: ["/api/contact/:path*"],
}
