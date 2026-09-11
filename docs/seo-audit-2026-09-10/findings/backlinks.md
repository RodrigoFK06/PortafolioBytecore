# Backlinks / Authority — xn--rkos-4na.com (árkos.com)

**Puntuación: 15/100 — confianza: BAJA (0.30)**

El dominio objetivo (punycode intencional de árkos.com) es demasiado nuevo/pequeño para tener
perfil de enlaces medible con las fuentes gratuitas disponibles. No es una puntuación de "sitio
malo", es una puntuación de "perfil de autoridad externa todavía no construido", con muy poca
certeza porque solo 2 de 7 factores del framework de scoring tienen algún dato (referring domain
count y follow/nofollow ratio), y ambos son señales mínimas (1 dominio de referencia, nofollow,
propio). Anchor text naturalness, toxic link ratio, link velocity y geographic relevance: **sin
fuente de datos, no evaluados**.

## Fuentes usadas (Tier 0 — sin Moz ni Bing Webmaster)

`claude-seo run backlinks_auth.py --check --json` confirma **Tier 0**: solo Common Crawl Web
Graph y el crawler de verificación local están disponibles. No se intentó ni se asumió acceso a
Moz o Bing.

- **Moz Link Explorer API**: no configurada. Gratis (2,500 filas/mes) en https://moz.com/products/api
  → registrarse, generar Access ID + Secret Key, y agregar `moz_api_key` a
  `C:\Users\clanp\.config\claude-seo\backlinks-api.json` o variable de entorno `MOZ_API_KEY`.
- **Bing Webmaster Tools API**: no configurada. Gratis en https://www.bing.com/webmasters
  → verificar la propiedad árkos.com en Bing Webmaster Tools, generar API key en Settings →
  API Access, y agregar `bing_api_key` al mismo archivo de config o `BING_WEBMASTER_API_KEY`.
- **DataForSEO**: no instalado (Tier 3, de pago). `./extensions/dataforseo/install.sh` si se quiere
  mayor fidelidad (peso completo de dominio, toxic ratio real, link velocity).

## Qué funciona

- El dominio ya tiene al menos un enlace externo verificado en vivo apuntando a él (ver tabla),
  demostrando que el sitio es descubrible por un crawler externo simple.
- La página principal expone `<link rel="canonical">` consistente hacia el dominio apex
  (`https://xn--rkos-4na.com`, sin www), lo cual es correcto como base para consolidar autoridad
  cuando lleguen más enlaces.
- Existe una base de repos públicos de GitHub (PrecioVivo, precio-justo, PortafolioBytecore,
  RestHUBLanding, FacturArkos) bajo el perfil RodrigoFK06 que sirven de vitrina "build-in-public"
  y son un canal de bajo esfuerzo para añadir enlaces adicionales.

## Dominios de referencia encontrados y verificados

| Fuente | Enlaza al dominio | Tipo | Ancla | Evidencia |
|---|---|---|---|---|
| github.com/RodrigoFK06/PrecioVivo (README) | **Sí** | `nofollow` (GitHub añade nofollow a UGC) | "Árkos" | `href="https://www.xn--rkos-4na.com/" rel="nofollow"` — verificado en vivo, fetch directo (confidence 0.95) |
| github.com/RodrigoFK06 (perfil) | **No** | — | — | La bio y el campo "Organization" muestran "Árkos" como texto plano, sin `<a href>`; el único enlace externo real del perfil es LinkedIn (`rel="nofollow me"`) — verificado en vivo (confidence 0.95) |
| github.com/RodrigoFK06/precio-justo (README) | No detectado | — | — | Revisado, sin href al dominio (confidence 0.85) |
| github.com/RodrigoFK06/PortafolioBytecore (README) | No detectado | — | — | Revisado, sin href al dominio (confidence 0.85) |
| github.com/RodrigoFK06/RestHUBLanding (README) | No detectado | — | — | Revisado, sin href al dominio (confidence 0.85) |
| github.com/RodrigoFK06/FacturArkos (README) | No detectado | — | — | Revisado, sin href al dominio (confidence 0.85) |

Common Crawl Web Graph (release `cc-main-2026-jan-feb-mar`, https://commoncrawl.org/web-graphs,
frecuencia trimestral): **el dominio no aparece indexado**, ni en su forma punycode
(`xn--rkos-4na.com`) ni en la forma unicode (`árkos.com`) — `in_crawl: false`, `in_rankings: false`,
sin PageRank ni harmonic centrality disponibles (confidence 0.50, ausencia consistente con dominio
nuevo/bajo volumen de crawl, no prueba definitiva de cero enlaces en la web real).

## Hallazgos

| Severidad | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|
| High | El perfil de GitHub (autoridad de dominio muy alta) no enlaza al sitio, solo lo menciona como texto | Bio/Organization sin `<a href>` al dominio; único link real es LinkedIn nofollow | Agregar `https://árkos.com` al campo "Website" del perfil (Settings → Public profile) y al "About" (homepage) de cada repo público. Aunque GitHub añade nofollow a estos campos, aporta descubrimiento por crawlers y señal de entidad/identidad (`rel=me`) |
| High | Common Crawl no tiene indexado el dominio en ninguna forma | `in_crawl: false` para ambas variantes, release trimestral actual | Enviar sitemap a Google Search Console y Bing Webmaster Tools para acelerar indexación/descubrimiento; volver a chequear en el próximo release de CC (trimestral) |
| Medium | El único backlink externo verificado es nofollow y proviene de un repo del propio autor (PrecioVivo), no de un tercero independiente | `rel="nofollow"` en el href de PrecioVivo README | Priorizar enlaces de terceros genuinos: casos de éxito de clientes, directorios, notas de prensa — ver oportunidades abajo |
| Medium | El enlace verificado apunta a `www.xn--rkos-4na.com`, mientras la home solo declara canónica la forma apex sin www; `www` responde 200 directo sin redirigir a la apex | `curl -I https://www.xn--rkos-4na.com/` → `200 OK` sin `Location`; canonical de la home = apex sin www | Configurar redirect 301 `www` → apex en Vercel para no fragmentar la autoridad entre dos hosts que Google puede tratar como separados |
| Info | Existe una colisión de entidad con "ArkOS" (sistema operativo retro de código abierto) | Mencionado como riesgo conocido del proyecto | Al prospectar enlaces/menciones de marca (Google Alerts, búsquedas de "Arkos"), filtrar explícitamente por el dominio árkos.com o el RUC 20616338782 para no mezclar métricas con el proyecto de software libre |

## Oportunidades de enlaces (no verificadas — recomendación, no dato medido)

Se identificaron candidatos por contexto del proyecto, pero por instrucción del coordinador no se
verificó si ya enlazan o no; quedan como pendiente de outreach, no como hallazgo confirmado:

- **Deploys de demo en Vercel** mencionados en los README de GitHub (precio-vivo.vercel.app,
  precio-justo-rose.vercel.app, facturarkos.vercel.app, portafolio-bytecore.vercel.app,
  rest-hub-landing.vercel.app) y `orquestador-adm.vercel.app`: agregar un footer "Hecho por Árkos"
  con enlace en cada uno.
- **Sitios de clientes** (clinicajuanpabloii.com.pe, freedysotelov.com, relucoffee.com): pedir
  enlace tipo "desarrollado por Árkos" en el footer o página de créditos, práctica estándar de
  agencias.
- **Directorios B2B relevantes para Perú/LatAm** (aún no se confirmó presencia actual): Clutch
  (clutch.co/profile/rkos — existencia no verificada en esta corrida), GoodFirms, Crunchbase,
  LinkedIn Company Page, Google Business Profile (ya identificado como pendiente en auditorías GEO
  previas), directorio de la Cámara de Comercio de Lima.

## No evaluado (sin datos — no se inventa)

- **Moz** (DA/PA, Spam Score, conteo de referring domains, anchor text, top pages): sin API key.
- **Bing Webmaster** (enlaces entrantes): sin API key.
- **DataForSEO**: extensión no instalada (Tier 3).
- **Clutch.co/profile/rkos**: no se confirmó su existencia ni contenido en esta corrida.
- **LinkedIn** (perfil personal y página de empresa): no se pudo rastrear (requiere sesión).
- **Deploys de Vercel y sitios de clientes** listados arriba: no se verificó si ya enlazan al dominio.
- **Anchor text naturalness, toxic link ratio, link velocity trend, geographic relevance**: sin
  fuente disponible en Tier 0.

```json
{"category":"Backlinks","score":15,"confidence":"low","what_works":["Al menos un backlink externo verificado en vivo (GitHub README de PrecioVivo)","Canonical tag consistente hacia el dominio apex","Base de repos publicos GitHub como canal de bajo esfuerzo para mas enlaces"],"findings":[{"title":"Perfil de GitHub no enlaza al sitio, solo lo menciona en texto","severity":"High","description":"La bio y el campo Organization del perfil github.com/RodrigoFK06 muestran 'Arkos' como texto plano sin <a href>; el unico enlace externo real es LinkedIn con rel=nofollow me.","recommendation":"Agregar https://arkos.com al campo Website del perfil de GitHub y al About de cada repo publico."},{"title":"Dominio no indexado en Common Crawl","severity":"High","description":"Ni xn--rkos-4na.com ni arkos.com (unicode) aparecen en el Web Graph de Common Crawl (release cc-main-2026-jan-feb-mar); sin PageRank ni harmonic centrality.","recommendation":"Enviar sitemap a Google Search Console y Bing Webmaster Tools; reintentar el chequeo de Common Crawl en el proximo release trimestral."},{"title":"Unico backlink verificado es nofollow y autorreferencial","severity":"Medium","description":"El enlace confirmado en el README de PrecioVivo (repo propio del mismo autor) usa rel=nofollow, por lo que no aporta una senal de autoridad de terceros independiente.","recommendation":"Priorizar backlinks de terceros: casos de clientes, directorios B2B, notas de prensa."},{"title":"www no redirige a la forma canonica apex","severity":"Medium","description":"www.xn--rkos-4na.com responde 200 OK directo sin redirect, mientras la home declara canonical solo hacia la forma apex sin www; el unico backlink externo apunta a la variante www.","recommendation":"Configurar redirect 301 www -> apex en Vercel para consolidar autoridad de enlace en un solo host."},{"title":"Colision de entidad con ArkOS (sistema operativo retro)","severity":"Info","description":"Existe un proyecto de software libre llamado ArkOS que puede contaminar busquedas de menciones/backlinks de marca.","recommendation":"Filtrar prospeccion de enlaces por dominio arkos.com o RUC 20616338782, no solo por el nombre 'Arkos'."}]}
```
