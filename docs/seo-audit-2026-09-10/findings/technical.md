# Auditoría SEO Técnico y On-Page — árkos.com (xn--rkos-4na.com)

Fecha: 2026-09-10. Dominio: `https://xn--rkos-4na.com` (punycode intencional de árkos.com, declarado como canónico en todo el sitio; no se reporta como error). Stack: Next.js SSR sobre Vercel, es-PE.

Herramientas usadas: `sitemap_discovery.py`, `render_page.py --mode auto --json` (11 páginas + home ya pre-renderizada), `fetch_page.py` (robots.txt, sitemap.xml, pricing.md, llms.txt, chequeos de redirección www/http//projects). Todas las respuestas fueron fetch crudo (`mode_used: raw`, `is_spa: false`); Playwright no se activó porque no se detectó shell de SPA.

**Puntuación Technical SEO: 88/100**
**Puntuación On-Page SEO: 83/100**

---

## Qué funciona bien

- **robots.txt** permite explícitamente `Allow: /` para `*` y además declara por nombre a los bots de IA relevantes (GPTBot, ChatGPT-User, OAI-SearchBot, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot, Amazonbot, CCBot, Claude-User, Perplexity-User, Meta-ExternalAgent, Applebot-Extended) y declara `Sitemap: https://xn--rkos-4na.com/sitemap.xml`.
- **Sitemap** validado por `sitemap_discovery.py`: encontrado vía robots.txt, `status_code 200`, `kind: urlset`, `valid: true`. Contiene exactamente 53 `<loc>` (coincide con lo esperado), todas en `https://xn--rkos-4na.com/...` (ninguna en `www.` ni `http://`).
- **Redirecciones de host limpias y de un solo salto**: `http://xn--rkos-4na.com` → `https://xn--rkos-4na.com/` con `308` (permanente, un hop). `/projects` → `/portfolio` con `308` (un hop, sin cadenas).
- **Indexabilidad consistente**: en las 11 páginas verificadas (`/`, `/services`, `/services/integracion-ia`, `/services/software-a-medida`, `/precios`, `/diagnostico`, `/desarrollo-de-software-lima`, `/portfolio`, `/portfolio/19`, `/blog`, `/blog/adopcion-de-ia-en-empresas`), todas devuelven `status_code 200`, `<meta name="robots" content="index, follow, max-snippet:-1">`, y `<link rel="canonical">` auto-referencial correcto (apex, sin querystring).
- **Hreflang consistente**: en las 11 páginas aparecen exactamente `es-PE` y `x-default`, ambos apuntando a la URL apex correspondiente — implementación simple y correcta para un sitio monolingüe.
- **Cero dependencia de JavaScript para el contenido**: en las 11 páginas + home, `render_page.py` reporta `is_spa: false` y `mode_used: raw` — el HTML servido por SSR ya trae título, meta description, H1/H2, texto de cuerpo y JSON-LD sin necesidad de ejecutar JS. Esto es un punto fuerte fundamental para crawlers tradicionales y agentes de IA con fetch simple.
- **Cabeceras de seguridad** consistentes en las 11 páginas: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` presente.
- **Datos estructurados** en home: 3 bloques JSON-LD válidos (`sitemap_discovery`/`render_page` los reporta como `valid: true`) con tipos `LocalBusiness/Organization/ProfessionalService/Offer/OfferCatalog/GeoCoordinates/PostalAddress`, `WebSite` con `SearchAction`, y `Person` (fundador) con `EducationalOccupationalCredential`.
- **Archivos AEO propios**: `/pricing.md` y `/llms.txt` responden `200`, en texto plano bien estructurado (precios, servicios, entidad legal, RUC, proyectos, enlaces a artículos del blog), listos para consumo por agentes/LLMs.
- **Títulos y meta descriptions únicos**: no se detectaron duplicados entre las 11 páginas muestreadas.
- **Un solo H1 por página** en las 11 páginas revisadas, con jerarquía H2 coherente temáticamente en cada una.

---

## Hallazgos

### Medium

**1. El subdominio `www` no redirige al apex (solo se apoya en `rel=canonical`)**
- Evidencia: `GET https://www.xn--rkos-4na.com` → `status_code: 200`, `redirect_chain: []` (sin redirección). El HTML servido en `www` sí trae `<link rel="canonical" href="https://xn--rkos-4na.com"/>` correcto, y las cabeceras (`Server: Vercel`, HSTS con `includeSubDomains`) confirman que es el mismo despliegue.
- Riesgo: se depende 100% de que el canonical esté presente en cada respuesta para evitar contenido duplicado por host; cualquier página futura sin ese tag (o un fetch de un bot que ignore canonicals) queda expuesta en dos hosts servidos con 200.
- Recomendación: agregar una redirección 301/308 a nivel de host en Vercel (`www.xn--rkos-4na.com` → `xn--rkos-4na.com`) para no depender únicamente de la señal de canonical.

**2. Content-Security-Policy solo en modo `Report-Only`, no se aplica**
- Evidencia: cabecera presente es `Content-Security-Policy-Report-Only: default-src 'self'; ...` en las 11 páginas; no existe una cabecera `Content-Security-Policy` (sin `-Report-Only`) que bloquee activamente.
- Riesgo: no es un hallazgo de indexabilidad, pero es relevante para la sección de seguridad del reporte técnico: la política está definida pero no protege en producción (permite XSS/inyección no bloqueada mientras solo se reporta).
- Recomendación: promover el CSP de `Report-Only` a aplicado una vez validado que no rompe funcionalidad (especialmente `script-src 'unsafe-inline' 'unsafe-eval'`, que ya es permisivo).

**3. Meta description excesivamente larga en `/portfolio/19`**
- Evidencia textual: 317 caracteres — `"Vivían a ciegas: comandas y registros en papel, caja que no cuadraba y casi ningún control de las finanzas. El software que lo arregla existe, pero la competencia cobraba del orden de S/ 2,000 al mes — inviable para un restaurante independiente. La trampa: o sigues en papel, o pagas precios enterprise que te ahogan."`
- Riesgo: más del doble de la longitud recomendada (~150-160 caracteres); Google truncará o reescribirá el snippet, perdiendo el control del mensaje en SERP.
- Recomendación: recortar a ~150-160 caracteres manteniendo el gancho principal (problema + resultado), mover el resto al cuerpo del caso de estudio.

### Low

**4. Título largo en `/blog/adopcion-de-ia-en-empresas`**
- Evidencia: 100 caracteres — `"Adopción de IA en empresas: cómo lograr que tu equipo la use de verdad (y cómo medirlo) | Blog Árkos"`.
- Recomendación: acortar a ≤60-65 caracteres (ej. quitar el paréntesis final o el sufijo "| Blog Árkos") para evitar truncamiento en SERP.

**5. Varias meta descriptions superan el rango recomendado (~150-160 caracteres)**
- Evidencia: `/diagnostico` 218 caracteres, `/precios` 200 caracteres, `/blog/adopcion-de-ia-en-empresas` 192 caracteres, `/blog` 154 (límite), `/portfolio` 181.
- Recomendación: revisar y recortar donde exceda ~160 caracteres; no es crítico (Google puede reescribir el snippet igual) pero reduce el control del mensaje mostrado.

**6. Concatenación de texto sin espacio en encabezados clave (afecta extracción de texto plano)**
- Evidencia textual (HTML crudo del H1 de home): `<h1 ... aria-label="Mejoramos tus procesos" style="opacity:0">Mejoramos<br/><span>tus<!-- --> <span class="text-brand">pr<span class="sr-only">o</span>...cesos</span></span></h1>`. El `aria-label` sí trae el texto correcto para lectores de pantalla, pero un `strip-tags` simple del H1 produce `"Mejoramostus procesos"` (sin espacio entre "Mejoramos" y "tus" porque el `<br/>` no inserta espacio en la extracción de texto plano).
- Evidencia adicional: en `/portfolio`, el único H2 se extrae como `"Todos los proyectos28"` (el contador de proyectos "28" queda pegado al texto del heading sin separador).
- Riesgo: bajo para Google (renderiza visualmente y usa el DOM), pero afecta a crawlers/agentes que hacen extracción de texto plano sin CSS, y a la calidad del texto indexado del H1 principal del sitio.
- Recomendación: insertar un espacio explícito (` `) en el markup en vez de depender del `<br/>`, y separar el contador de `/portfolio` del texto del heading (ej. `<h2>Todos los proyectos <span>(28)</span></h2>`).

**7. `lastmod` ausente en la mayoría de URLs del sitemap**
- Evidencia: de 53 `<loc>`, solo 7 tienen `<lastmod>` (todas son posts de `/blog/...`); el resto (home, `/services/*`, `/portfolio/*`, `/precios`, `/diagnostico`, etc.) no declara `lastmod`. `<priority>` y `<changefreq>` sí están presentes en las 53 (señal de bajo peso para Google, pero no dañina).
- Recomendación: agregar `lastmod` real (fecha de última modificación de contenido) a todas las URLs para ayudar a priorizar el recrawl, especialmente en páginas de alto valor (`/`, `/precios`, `/services/*`).

### Info

- `/pricing.md` y `/llms.txt` no están listados en `sitemap.xml` — esperable, son archivos de consumo para agentes/IA, no páginas HTML indexables; no se reporta como error.
- La declaración de sitemap en robots.txt fue validada activamente por `sitemap_discovery.py` (no es un hallazgo "stale"): `found` y `checked` confirman `status_code 200` y `valid: true` para `https://xn--rkos-4na.com/sitemap.xml`.

---

## No evaluado (fuera del alcance de esta pasada)

- **Core Web Vitals con valores medidos** (LCP/INP/CLS reales): no se ejecutó `preload_check.py`, `lcp_subparts.py` ni `pagespeed_check.py` en esta pasada; corresponde al agente de performance. Única señal indirecta detectada por inspección de fuente: el H1 del home tiene `style="opacity:0"` (animación de entrada tipo "kinetic text" vía GSAP/JS) — si el H1 fuera el elemento LCP, su aparición visual depende de que la animación de opacidad se complete, lo cual el agente de performance debería medir directamente en campo/lab en vez de inferirse aquí.
- **Auditoría completa de enlazado interno** (grafo de enlaces, distribución de anchor text, profundidad de clics): no se corrió `parse_html.py` por página; solo se observaron enlaces cruzados mencionados en `llms.txt` (blog → `/diagnostico`, `/precios`, etc.).
- **Mobile-friendliness detallado** (tamaño de touch targets, overflow horizontal): solo se confirmó `<meta name="viewport" content="width=device-width, initial-scale=1"/>` en home; no se revisó CSS de touch targets en las demás páginas.
- **Validación de `/llms-full.txt`** (referenciado desde `/llms.txt` pero no se hizo fetch para confirmar `status 200`).
- **JSON-LD en páginas internas** (`/portfolio/19`, `/blog/adopcion-de-ia-en-empresas`, etc.): solo se validó structured data en home; no se confirmó si los casos de estudio/posts traen `Article`/`BlogPosting`/`CreativeWork`.
- **IndexNow** (Bing/Yandex/Naver): no se probó `indexnow_submit.py` ni se buscó la clave de verificación en el sitio.
- Capturas de pantalla / verificación visual mobile: el directorio `screenshots/` del scratchpad está vacío, no se generó ninguna.

---

```json
{
  "category": "Technical SEO",
  "score": 88,
  "onpage_score": 83,
  "what_works": [
    "robots.txt permite explícitamente a los bots de IA principales (GPTBot, ChatGPT-User, OAI-SearchBot, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot, Amazonbot, CCBot, Claude-User, Perplexity-User, Meta-ExternalAgent, Applebot-Extended) y declara el sitemap",
    "Sitemap validado (status 200, urlset válido) con exactamente 53 URLs, todas en el host apex canónico, sin entradas en www o http",
    "Redirecciones http->https y /projects->/portfolio son 308 de un solo salto, sin cadenas",
    "11 páginas muestreadas devuelven 200, robots meta index/follow, y canonical auto-referencial correcto",
    "hreflang es-PE + x-default consistente en todas las páginas muestreadas",
    "Contenido 100% servido por SSR (is_spa=false, mode_used=raw en las 12 páginas fetcheadas): sin dependencia de JavaScript para indexar título, meta, H1/H2, texto y JSON-LD",
    "Cabeceras de seguridad consistentes: HSTS con preload, X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin",
    "JSON-LD válido en home (LocalBusiness/Organization/ProfessionalService, WebSite+SearchAction, Person)",
    "/pricing.md y /llms.txt responden 200 con contenido AEO bien estructurado",
    "Títulos y meta descriptions únicos entre las páginas muestreadas, un solo H1 por página con jerarquía H2 coherente"
  ],
  "findings": [
    {
      "title": "www no redirige al apex (solo canonical)",
      "severity": "Medium",
      "description": "https://www.xn--rkos-4na.com responde 200 sin redirect_chain; solo el <link rel=canonical> apunta al apex. Ambos hosts quedan servidos con 200.",
      "recommendation": "Configurar redirección 301/308 a nivel de host en Vercel de www a apex, sin depender únicamente del canonical."
    },
    {
      "title": "CSP solo en Report-Only, no aplicado",
      "severity": "Medium",
      "description": "La cabecera activa es Content-Security-Policy-Report-Only en las 11 páginas revisadas; no existe una CSP bloqueante en producción.",
      "recommendation": "Promover la política a Content-Security-Policy aplicada tras validar que no rompe scripts/estilos inline existentes."
    },
    {
      "title": "Meta description de 317 caracteres en /portfolio/19",
      "severity": "Medium",
      "description": "La meta description del caso de estudio RestHUB tiene 317 caracteres, más del doble del máximo recomendado (~150-160).",
      "recommendation": "Recortar a ~150-160 caracteres conservando problema y resultado principal; mover el resto al cuerpo del caso."
    },
    {
      "title": "Título de 100 caracteres en /blog/adopcion-de-ia-en-empresas",
      "severity": "Low",
      "description": "El <title> mide 100 caracteres, muy por encima del límite visual típico de SERP (~60-65 caracteres).",
      "recommendation": "Acortar el título eliminando el paréntesis final o el sufijo de marca."
    },
    {
      "title": "Varias meta descriptions superan ~160 caracteres",
      "severity": "Low",
      "description": "/diagnostico (218), /precios (200), /blog/adopcion-de-ia-en-empresas (192) y /portfolio (181) exceden el rango recomendado.",
      "recommendation": "Recortar a 150-160 caracteres donde sea posible sin perder el mensaje clave."
    },
    {
      "title": "Texto de encabezados concatenado sin espacio en la extracción de texto plano",
      "severity": "Low",
      "description": "El H1 del home se extrae como 'Mejoramostus procesos' (el <br/> no genera espacio al despojar tags) aunque el aria-label sí dice 'Mejoramos tus procesos'; el H2 único de /portfolio se extrae como 'Todos los proyectos28' (contador pegado al texto).",
      "recommendation": "Insertar un espacio explícito en el markup del H1 en vez de depender del <br/>, y separar visual y semánticamente el contador de proyectos del texto del H2 en /portfolio."
    },
    {
      "title": "lastmod ausente en 46 de 53 URLs del sitemap",
      "severity": "Low",
      "description": "Solo las 7 URLs de /blog/... declaran <lastmod>; el resto del sitemap (home, /services/*, /portfolio/*, /precios, /diagnostico, etc.) no lo incluye.",
      "recommendation": "Agregar lastmod real a todas las entradas del sitemap para ayudar a priorizar el recrawl."
    }
  ]
}
```
