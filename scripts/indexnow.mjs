#!/usr/bin/env node
/**
 * Ping de IndexNow para árkos.com.
 *
 * La key ya existía en `public/4f43091e445d8f1cf0e123e3bd025184.txt` desde hace
 * meses, pero nunca se notificaba a nadie: tener la key sin hacer el ping no
 * hace absolutamente nada.
 *
 * Expectativa correcta: **IndexNow alimenta Bing, Yandex y Seznam. Google no
 * participa.** El valor real es que Bing es la fuente de ChatGPT Search, un
 * frente donde Árkos ya va por delante (llms.txt, robots abierto a GPTBot /
 * ClaudeBot / PerplexityBot) y donde su competidor más fuerte, Vex, es
 * invisible por devolver 403 a los rastreadores desde Cloudflare.
 *
 * Uso:
 *   pnpm indexnow                     → lee el sitemap de producción
 *   pnpm indexnow --dry-run           → imprime lo que enviaría y sale
 *   pnpm indexnow --url=https://…     → notifica solo esas URLs (repetible)
 *   pnpm indexnow --sitemap=https://… → usa otro sitemap
 *
 * Devuelve exit code 1 si el endpoint responde con error, para que falle en CI.
 */

const HOST = "xn--rkos-4na.com"
const KEY = "4f43091e445d8f1cf0e123e3bd025184"
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const DEFAULT_SITEMAP = `https://${HOST}/sitemap.xml`
const ENDPOINT = "https://api.indexnow.org/indexnow"

// IndexNow acepta hasta 10 000 URLs por petición; el sitio está muy por debajo,
// pero el troceado evita una sorpresa el día que el blog crezca.
const BATCH_SIZE = 10000

function parseArgs(argv) {
  const urls = []
  let sitemap = DEFAULT_SITEMAP
  let dryRun = false

  for (const arg of argv) {
    if (arg === "--dry-run") dryRun = true
    else if (arg.startsWith("--url=")) urls.push(arg.slice("--url=".length))
    else if (arg.startsWith("--sitemap=")) sitemap = arg.slice("--sitemap=".length)
    else if (arg === "--help" || arg === "-h") {
      console.log("Uso: node scripts/indexnow.mjs [--dry-run] [--url=…] [--sitemap=…]")
      process.exit(0)
    } else {
      console.error(`Argumento no reconocido: ${arg}`)
      process.exit(1)
    }
  }

  return { urls, sitemap, dryRun }
}

async function readSitemap(sitemapUrl) {
  const res = await fetch(sitemapUrl, { headers: { "user-agent": "arkos-indexnow/1.0" } })
  if (!res.ok) {
    throw new Error(`No se pudo leer el sitemap (${res.status} ${res.statusText}): ${sitemapUrl}`)
  }

  const xml = await res.text()
  // Parseo deliberadamente simple: el sitemap lo genera Next (app/sitemap.ts),
  // así que la forma es conocida y estable. No merece una dependencia.
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])

  if (urls.length === 0) {
    throw new Error(`El sitemap no contiene ninguna <loc>: ${sitemapUrl}`)
  }
  return urls
}

/** IndexNow rechaza el lote completo si una sola URL es de otro host. */
function assertSameHost(urls) {
  const ajenas = urls.filter((u) => {
    try {
      return new URL(u).hostname !== HOST
    } catch {
      return true
    }
  })
  if (ajenas.length > 0) {
    throw new Error(
      `Hay ${ajenas.length} URL(s) que no pertenecen a ${HOST} y harían fallar el lote entero:\n` +
        ajenas.map((u) => `  · ${u}`).join("\n")
    )
  }
}

async function submit(urlList) {
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  })

  const text = await res.text().catch(() => "")
  return { status: res.status, ok: res.ok, text: text.trim() }
}

async function main() {
  const { urls: manualUrls, sitemap, dryRun } = parseArgs(process.argv.slice(2))

  const urls = manualUrls.length > 0 ? manualUrls : await readSitemap(sitemap)
  assertSameHost(urls)

  const fuente = manualUrls.length > 0 ? "argumentos --url" : sitemap
  console.log(`IndexNow · ${urls.length} URL(s) desde ${fuente}`)

  if (dryRun) {
    for (const u of urls) console.log(`  ${u}`)
    console.log("\n--dry-run: no se envió nada.")
    return
  }

  let fallos = 0
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const lote = urls.slice(i, i + BATCH_SIZE)
    const { status, ok, text } = await submit(lote)

    // 200 = aceptado · 202 = aceptado, key pendiente de validar.
    if (ok) {
      console.log(`  ✓ ${lote.length} URL(s) — HTTP ${status}${text ? ` · ${text}` : ""}`)
    } else {
      fallos++
      console.error(`  ✗ ${lote.length} URL(s) — HTTP ${status}${text ? ` · ${text}` : ""}`)
      if (status === 403) {
        console.error(`    403 suele significar que ${KEY_LOCATION} no es accesible públicamente.`)
      }
    }
  }

  if (fallos > 0) process.exit(1)

  console.log("\nListo. Recuerda: esto notifica a Bing, Yandex y Seznam — Google no participa.")
  console.log("Para Google sigue haciendo falta Search Console → Inspeccionar URL → Solicitar indexación.")
}

main().catch((err) => {
  console.error(`IndexNow falló: ${err.message}`)
  process.exit(1)
})
