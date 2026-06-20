# GEO-AUDIT-REPORT — Árkos

- **Sitio:** https://xn--rkos-4na.com (árkos.com — IDN/punycode, intencional)
- **Negocio:** Agencia digital — desarrollo de software a medida + apps web (Next.js/React/TypeScript) + UX/UI · Trujillo, Perú · sirve LatAm
- **Fundador / Tech Lead:** Rodrigo Torres
- **Fecha:** 2026-06-20
- **Tipo detectado:** Agency
- **Herramienta:** geo-seo-claude (`/geo audit`) — 5 subagentes en paralelo

---

## GEO Score compuesto: **63 / 100**

| Categoría | Peso | Score | Aporte ponderado |
|---|---|---|---|
| AI Citability & Visibility | 25% | 74 | 18.5 |
| Brand Authority Signals | 20% | **12** | 2.4 |
| Content Quality & E-E-A-T | 20% | 71 | 14.2 |
| Technical Foundations | 15% | 86 | 12.9 |
| Structured Data | 10% | 84 | 8.4 |
| Platform Optimization | 10% | 63 | 6.3 |
| **TOTAL** | 100% | | **62.7 → 63** |

**Lectura rápida:** la base técnica/on-page de Árkos es **excelente** (SSR, robots con allowlist completa de bots AI, doble `llms.txt`, schema maduro). El techo lo impone una sola cosa: **autoridad de marca / corroboración externa casi nula (12/100)**. AI search no penaliza tu sitio — penaliza que ningún tercero confirme que Árkos existe.

---

## Hallazgos transversales (aparecen en varios subagentes)

### 🔴 1. Autoridad de marca ≈ 0 — el mayor lastre del score
Sin Wikipedia (EN/ES), sin Wikidata, sin Reddit/YouTube, sin directorios de agencias (Clutch, Sortlist, GoodFirms, agencias.marketing), LinkedIn de empresa inexistente/fino. ChatGPT, Perplexity y Gemini deciden citar por *confianza de entidad* y hoy no pueden verificar Árkos más allá de su propio dominio. **Es lo que mueve la aguja del 12/100.**

### 🔴 2. Residuo "Bytecore" en la capa AI (contradice la política de marca)
Los buscadores con resumen AI inyectan **"Árkos (formerly Bytecore)"** aunque el sitio en vivo está limpio (home + `llms.txt` verificados sin rastro). Significa que fuentes externas/cacheadas (GitHub, directorios, perfiles viejos) siguen ligando el nombre antiguo. Acción de limpieza **externa**, no de sitio.

### 🟠 3. H1 del home con palabras fusionadas — defecto REAL de markup
Confirmado en el markup en vivo: cada palabra es un `<span>` sin nodo de texto con espacio entre ellos; el espaciado es solo visual por CSS. Al quitar tags queda `"Mejoramostus procesos"` (Mejoramos+tus fusionadas). La "o" decorativa va en un `sr-only` y se reemplaza por un glifo-logo. Los parsers AI y lectores de pantalla reciben el heading principal roto. (Detectado por content=Critical, technical=Medium, platform=High, ai-visibility=Medium.)

### 🟠 4. Autoría sin entidad Person (E-E-A-T)
En el schema de los posts, `Article.author` = **Organización "Árkos"**, no **Person → Rodrigo Torres**. No existe un schema `Person` standalone del fundador, ni byline/bio visible por post. Para una agencia boutique, el tech lead nombrado es la señal de expertise más fuerte y está sin explotar. (content=High, schema=High.)

### 🟠 5. Conflicto de host canónico
`canonical`, `og:url` y todos los `<loc>` del sitemap declaran el **apex** (no-www), pero el apex hace **307 → www**. Le dices a los motores "el apex es canónico" y luego los rediriges a www. Además el redirect es **307 (temporal)**; debería ser **308 (permanente)** para consolidar señales. (technical=High.)

---

## Detalle por categoría

### AI Citability & Visibility — 74/100
**Fortalezas:** acceso de crawlers 100% abierto y verificado (`index, follow, max-snippet:-1`, sin `X-Robots-Tag`, sin noindex); contenido SSR; `llms.txt` + `llms-full.txt` spec-compliant (ejecución top-decil); el post `desarrollo-software-a-medida-en-peru` (~2,098 palabras) es citation-ready (answer-first, lista de decisión, caso real, FAQ).
**Issues:** [High] autoridad de marca casi nula · [High] residuo "Bytecore" en AI · [Med] H1 no semántico · [Med] stats sin fuente y contadores que renderizan "0" en SSR · [Low] post Megalodon más fino y sin FAQ · [Low] email inconsistente.

### Brand Authority Signals — 12/100
Cero corroboración de terceros. Wikipedia API: sin entidad (EN `[]`, ES sin match). Sin Reddit, sin YouTube, sin LinkedIn de empresa. Esperable para marca pequeña (2020), pero es **el cuello de botella** del audit.

### Content Quality & E-E-A-T — 71/100
**Fortalezas:** experiencia de primera mano real (Megalodon Pro: tiempo de toma de pedidos −60%, cierre de caja 45→5 min; Rapiditos en App Store), voz humana auténtica (no suena a AI genérico), long-form bien estructurado (~3,200 palabras la guía), NAP/dirección en schema, fundador nombrado.
**Issues:** [Critical] H1 fusionado · [High] `Article.author` = Organización, no Person · [High] cero citas externas en el contenido · [Med] casos sin testimonio/quote de cliente ni timeline; métricas sin fuente verificable · [Med] sin fecha "actualizado"; contadores "0" en markup estático · [Low] ruido menor en copy del hero.

### Technical Foundations — 86/100
**Fortalezas:** SSR confirmado (`X-Nextjs-Prerender: 1`); robots ejemplar; indexabilidad limpia (canonicals self-ref, sin noindex accidental); meta/OG/Twitter completos; baseline de seguridad (HTTPS+HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`); URLs limpias y planas (los slugs concatenados en español son válidos y estables — **no vale la pena cambiarlos**).
**Issues:** [High] conflicto host canónico apex-vs-www · [High] redirect 307 (debería 308); robots.txt y sitemap.xml también 307 antes de resolver · [Med] sitemap sin `lastmod` en 8 de 14 URLs (todas devuelven 200) · [Med] texto de headings concatenado en HTML crudo · [Low] sin CSP ni Permissions-Policy; HSTS sin `includeSubDomains`/`preload`; `Referrer-Policy` mejorable a `strict-origin-when-cross-origin`. CWV inferido: riesgo BAJO (Vercel CDN, prerender, `next/image`); validar con CrUX/PageSpeed.

### Structured Data — 84/100
**Detectado:** Organization, WebSite+SearchAction, LocalBusiness+ProfessionalService, BreadcrumbList, Article, FAQPage, Service — todos SSR y válidos.
**Issues:** [High] `Article.author` = Organización (debe ser Person→Rodrigo) · [High] sin entidad `Person` standalone · [High] Article sin `dateModified` · [Med] `item` de BreadcrumbList en URLs **relativas** (Google exige absolutas) · [Med→corregido] `SearchAction`: la ruta `/search?q=` **sí existe y funciona** (falso positivo del audit); se mejoró a formato `EntryPoint` · [Med] email `gerencia@` (schema) vs `hola@` (copy) · [Low] `sameAs` ampliable (Instagram/X, futura Wikidata).

### Platform Optimization — 63/100
| Plataforma | Readiness | Brecha principal |
|---|---|---|
| Google AI Overviews | Alta (78) | profundidad de FAQ por query (es-LatAm) |
| Bing Copilot | Media-Alta (68) | sin IndexNow / verificación Bing Webmaster |
| Google Gemini | Media (60) | fuera del Knowledge Graph; sin YouTube/GBP |
| ChatGPT (SearchGPT) | Media (58) | sin Wikipedia/Wikidata |
| Perplexity | Baja-Media (52) | sin Reddit/foros/reviews |

**Issue de locale:** `og:locale` = `es_ES` pero el mercado es Perú → debe ser `es_PE`; falta `hreflang`.

---

## Plan de acción priorizado

### ⚡ Quick wins en código (este repo — bajo esfuerzo, impacto alto/medio)
1. **H1 del home:** insertar nodos de texto con espacio real entre los `<span>` de cada palabra (o `aria-label="Mejoramos tus procesos"` en el `<h1>`). Aplica también a H2 (`Sobre Nosotros`, `Nuestros Servicios`).
2. **Locale:** `og:locale` → `es_PE` y agregar `hreflang="es-PE"`.
3. **Host canónico:** decidir www vs apex y alinear `canonical` + `og:url` + `<loc>` del sitemap al host que sirve el redirect; cambiar **307 → 308** en `vercel.json`/Next config.
4. **Schema Article:** añadir `dateModified`; cambiar `author` a `Person` (Rodrigo Torres) por `@id`; añadir bloque `Person` standalone (home + posts).
5. **BreadcrumbList:** URLs `item` absolutas; incluir el propio post como posición final.
6. **SearchAction:** ✅ la ruta `/search` ya existe y procesa `?q=`; se mejoró el schema a formato `EntryPoint` (era un falso positivo, no había que eliminarlo).
7. **Email canónico:** unificar `hola@` vs `gerencia@` en schema y copy.
8. **Sitemap:** `lastmod` en las 14 entradas.
9. **Contadores/stats:** renderizar los números reales en SSR (no "0"); citar fuente de "78%", "+50 proyectos".
10. **Headers:** CSP + Permissions-Policy; HSTS `includeSubDomains; preload`; `Referrer-Policy: strict-origin-when-cross-origin`.

### 🎯 Alto impacto estratégico (off-site — mueve el 12/100 de autoridad)
11. **Eliminar el rastro "Bytecore"** en GitHub, directorios, listados y perfiles cacheados para que la capa AI deje de inyectar "formerly Bytecore".
12. **Corroboración de entidad:** crear **ítem en Wikidata** (organización, fundador Rodrigo Torres, Trujillo, inception 2020) y listar en **Clutch / Sortlist / GoodFirms / agencias.marketing**; completar **LinkedIn de empresa**. Desbloquea ChatGPT + Perplexity + Gemini a la vez.
13. **Señales de comunidad:** 3–5 menciones/respuestas genuinas en Reddit (r/PERU, r/devsarg), Quora, y una review en Clutch → lift directo en Perplexity.
14. **Autoría visible:** byline + bio + link de Rodrigo Torres por post (refuerza el schema Person).
15. **Profundidad de FAQ** en `/services` y `/precios` y por post (5–8 Q&A es-PE como "¿cuánto cuesta un ERP en Perú?", "agencia Next.js Trujillo").
16. **Citas externas** (2–4 por post: docs, estándares, datos de industria) para Trust/Authoritativeness.
17. **YouTube** (2–3 demos de proyectos) + **Google Business Profile** para señales del ecosistema Gemini/Google.

---

## JSON-LD listo para pegar (gaps prioritarios)

### 1 — Person (entidad del fundador, E-E-A-T). Home + /blog/*
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://xn--rkos-4na.com/#rodrigo-torres",
  "name": "Rodrigo Torres",
  "url": "https://xn--rkos-4na.com",
  "jobTitle": "Founder & Tech Lead",
  "worksFor": { "@type": "Organization", "name": "Árkos", "url": "https://xn--rkos-4na.com" },
  "knowsAbout": ["Desarrollo de Software a Medida","Next.js","React","TypeScript","Diseño UX/UI","Inteligencia Artificial"],
  "sameAs": [
    "https://github.com/RodrigoFK06",
    "https://www.linkedin.com/in/rodrigo-torres-arkos"
  ]
}
```

### 2 — Article corregido (author Person + dateModified). Reemplaza el Article actual por post
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Megalodon Pro: cómo construimos un ERP completo para restaurantes con Next.js",
  "description": "Caso de estudio técnico sobre Megalodon Pro...",
  "image": "https://xn--rkos-4na.com/v0-app.png",
  "datePublished": "2026-02-20",
  "dateModified": "2026-02-20",
  "author": { "@type": "Person", "@id": "https://xn--rkos-4na.com/#rodrigo-torres", "name": "Rodrigo Torres", "url": "https://xn--rkos-4na.com" },
  "publisher": {
    "@type": "Organization", "name": "Árkos", "url": "https://xn--rkos-4na.com",
    "logo": { "@type": "ImageObject", "url": "https://xn--rkos-4na.com/logo_ico/final%20-%20LOGO%202-02.png" }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://xn--rkos-4na.com/blog/megalodon-pro-erp-restaurantes-nextjs" },
  "keywords": "Next.js, React, ERP, POS, Caso de Estudio, SaaS"
}
```

### 3 — BreadcrumbList con URLs absolutas
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://xn--rkos-4na.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://xn--rkos-4na.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Megalodon Pro ERP", "item": "https://xn--rkos-4na.com/blog/megalodon-pro-erp-restaurantes-nextjs" }
  ]
}
```

---

## Correcciones aplicadas en código (2026-06-20)

Fixes ya implementados en este repo (build ✅ y verificados contra el HTML renderizado):

| Fix | Archivo |
|---|---|
| H1 con espacios reales + `aria-label="Mejoramos tus procesos"` | `components/sections/HeroSection.tsx` |
| `og:locale` `es_ES` → `es_PE` + hreflang `es-PE`/`x-default` | `app/layout.tsx` |
| Entidad `Person` (Rodrigo Torres) con `@id`; `founder` enlazado por `@id`; `@id` en Organization/WebSite | `app/layout.tsx` |
| `SearchAction` mejorado a `EntryPoint` (la ruta `/search` existe — falso positivo) | `app/layout.tsx` |
| Email unificado a `gerencia@árkos.com` (sr-only LLM context) | `app/layout.tsx` |
| Headers: HSTS `includeSubDomains; preload`, `Referrer-Policy` strict-origin, `Permissions-Policy`, CSP en **Report-Only** | `next.config.mjs` |
| `lastModified` en las 8 URLs estáticas | `app/sitemap.ts` |
| Article `author`→`Person` (Rodrigo) + `dateModified`; BreadcrumbList con URLs absolutas | `app/blog/[slug]/page.tsx`, `app/blog/layout.tsx` |
| Contadores de stats: SSR renderiza el número real (6/50+/45+/8+), ya no "0" | `components/animated-counter.tsx` |
| Byline visible = "Rodrigo Torres" (consistente con schema author) + "Actualizado el…" cuando hay `updated` | `app/blog/[slug]/page.tsx` |
| `width`/`height` en imgs decorativas del hero | `components/sections/HeroSection.tsx` |
| `sameAs` Org: **Wikidata Q140262378** + X `@ArkosPeru` + LinkedIn `arkos-pe` + Clutch · `sameAs` Person: GitHub + LinkedIn + Instagram · `twitter:site`/`creator` `@ArkosPeru` | `app/layout.tsx` |
| IndexNow habilitado (key file en raíz del dominio) | `public/4f43091e445d8f1cf0e123e3bd025184.txt` |

**Verificado:** `npm run type-check` y `npm run build` pasan; H1 extrae `"Mejoramos tus procesos"`, 4 bloques JSON-LD (Organization/WebSite+SearchAction/LocalBusiness/Person), `og:locale=es_PE`.

### Pendiente (NO es código)
- **Vercel dashboard:** alinear host canónico — el apex hace `307 → www` mientras el código declara el apex como canónico. Definir host primario y dejar el redirect en **308 permanente**.
- **CSP enforcing:** revisar el Report-Only en consola y promover a `Content-Security-Policy`.
- **Off-site (lo que mueve el 12/100):** ✅ Wikidata/Clutch/LinkedIn-empresa creados y ya enlazados en `sameAs`. Pendiente: **limpiar rastro "Bytecore"** en fuentes externas (GitHub viejo, directorios, perfiles cacheados) y señales de comunidad (Reddit/reviews/Quora).
- **Bing Webmaster:** verificar (recomendado: importar desde Google Search Console = sin token ni código; o método HTML meta `msvalidate.01`).
- **IndexNow ping:** la key ya está; falta notificar a los buscadores en cada publish (`https://api.indexnow.org/indexnow?url=<URL>&key=4f43091e445d8f1cf0e123e3bd025184`).

---

## Nota metodológica
Audit ejecutado con 5 subagentes especializados (geo-ai-visibility, geo-platform-analysis, geo-technical, geo-content, geo-schema) sobre el sitio en vivo. El host IDN `xn--rkos-4na.com` se trató como intencional (no se marcó como error). La marca se reporta siempre como **Árkos** (nunca el nombre antiguo).
