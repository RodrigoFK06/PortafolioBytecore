// middleware.ts
import { NextRequest, NextResponse } from "next/server"

// El sitio se sirve en un único host indexable: el apex.
// Todo lo demás (el alias de producción portafolio-bytecore.vercel.app y los
// despliegues de preview) devuelve el mismo HTML byte a byte, con el mismo
// title y el mismo <meta name="robots" content="index, follow">. El canonical
// apunta al apex, pero el canonical es una pista, no una orden: mientras haya
// dos hosts indexables con el mismo sitio, las señales se reparten.
// Se resuelve con cabecera, no con redirect: los previews también son
// *.vercel.app y una redirección al apex los rompería como vía de prueba.
// El alias de producción sí redirige al apex (next.config.mjs); aquí solo
// llega por /api/, y ahí la cabecera sigue sirviendo.
// Nota: la cabecera Host nunca trae 'árkos.com' con tilde, siempre punycode.
const HOST_INDEXABLE = "xn--rkos-4na.com"

// CORS para /api/contact
// CORS_ALLOWED_ORIGINS en .env como lista separada por comas
export function middleware(req: NextRequest) {
  // El host puede llegar con puerto (dev, :3000); se compara solo el nombre.
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase()
  const noindex = host !== HOST_INDEXABLE

  const marcar = (res: NextResponse) => {
    if (noindex) res.headers.set("X-Robots-Tag", "noindex, nofollow")
    return res
  }

  const { pathname } = new URL(req.url)
  if (!pathname.startsWith("/api/contact")) return marcar(NextResponse.next())

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
    return marcar(res)
  }

  return marcar(res)
}

// Antes solo ['/api/contact/:path*']. Ahora todas las rutas HTML, excluyendo
// estáticos y assets: el noindex tiene que viajar en cada página del gemelo.
//
// El punto va como clase [.], no como \. : en una cadena de TypeScript la barra
// invertida de "\." se pierde al evaluarla ("\." === "."), así que el matcher
// llegaba a Next con un punto comodín que casaba cualquier carácter. Efecto
// medido en producción el 28-sep: /diagnostico acaba en "ico" y quedaba fuera
// del middleware, o sea seguía indexable en el gemelo. [.] no depende de
// escapes y expresa lo que se quería: un punto literal antes de la extensión.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon[.]ico|.*[.](?:png|jpg|jpeg|svg|webp|pdf|xml|txt|ico)$).*)",
  ],
}
