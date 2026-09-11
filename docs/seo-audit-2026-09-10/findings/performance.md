# Performance (Core Web Vitals) — xn--rkos-4na.com (árkos.com)

**Fecha de auditoría:** 2026-09-10
**Método:** Datos de laboratorio únicamente. La API de PageSpeed Insights devolvió `429 PSI rate limit exceeded (240 QPM / 25,000 QPD)` en ambos intentos (home, mobile+desktop) y no se insistió según instrucción. No hay credenciales de CrUX configuradas (`lcp_subparts.py` → "Google API key not configured"), por lo que tampoco hay datos de campo (28 días de usuarios reales). Se usó en su lugar: contexto histórico de julio 2026 ya conocido (Lighthouse desktop 98 / mobile 68-75, LCP móvil ~4.6s), `render_page.py` (home, ya renderizado), `preload_check.py` (4 páginas), y análisis estático del HTML crudo (curl) para recursos, fuentes, imágenes y scripts.

## Puntuación: 58/100 — Performance (CWV)

Desktop es sólido (98 en julio). Mobile es el punto débil: LCP ~4.6s (Poor, >4.0s) por una decisión de diseño consciente (H1 cinético oculto con `opacity:0` hasta que corren JS + 4 fuentes woff2). No se pudo remedir hoy por el rate limit de PSI, así que la puntuación pondera el histórico conocido + los hallazgos estáticos nuevos (DOM grande en home, cero `fetchpriority=high`, cero Speculation Rules).

## Tabla de métricas por página y dispositivo

| Página | Dispositivo | LCP | INP | CLS | TBT | TTFB |
|---|---|---|---|---|---|---|
| `/` | Mobile | ~4.6s (Poor) — dato previo jul-2026, no remedido hoy | no medido | no medido | no medido | ~0.32s (curl sin throttling, no es TTFB de Lighthouse) |
| `/` | Desktop | no medido hoy (Lighthouse Perf score previo: 98) | no medido | no medido | no medido | ~0.32s (curl sin throttling) |
| `/services/integracion-ia` | Mobile | no medido | no medido | no medido | no medido | ~0.35s (curl) |
| `/services/integracion-ia` | Desktop | no medido | no medido | no medido | no medido | ~0.35s (curl) |
| `/blog/adopcion-de-ia-en-empresas` | Mobile | no medido | no medido | no medido | no medido | ~0.30s (curl) |
| `/blog/adopcion-de-ia-en-empresas` | Desktop | no medido | no medido | no medido | no medido | ~0.30s (curl) |
| `/precios` | Mobile | no medido | no medido | no medido | no medido | ~0.35s (curl) |
| `/precios` | Desktop | no medido | no medido | no medido | no medido | ~0.35s (curl) |

Nota: la columna TTFB es una medición informal con `curl` (una sola petición, sin el throttling "Slow 4G" que usa Lighthouse mobile), útil solo como proxy de que el servidor responde rápido — no sustituye TTFB de campo (CrUX) ni de laboratorio (PSI).

## Qué funciona

- **Sin scripts de terceros detectados** en el HTML de ninguna de las 4 páginas (0 coincidencias de GTM/GA/Clarity/Hotjar/Facebook Pixel) — no hay contención de main thread por terceros, un problema común de INP que aquí no aplica.
- **Fuentes autohospedadas vía `next/font`** (4 archivos `.woff2` en `/_next/static/media/`) con `<link rel="preload" as="font">` — evita el round-trip extra a Google Fonts y ya están precargadas.
- **TTFB del servidor bajo** en las 4 páginas (~300-350ms sin throttling), consistente con SSR/edge de Next.js.
- **`preload_check.py` puntuó 50/100 en las 4 páginas** con señales base presentes (6-8 `preload` hints, sin `Cache-Control: no-store` que bloquee bfcache, sin listeners `unload`/`beforeunload`).
- Desktop histórico (Lighthouse 98, jul-2026) indica que el problema es específico de mobile, no del código en general.

## Hallazgos

### 1. LCP móvil en home ~4.6s (Poor) por diseño: H1 oculto hasta JS + 4 fuentes — **Critical**
**Evidencia:** en `homepage-render.json` (raw HTML) el elemento LCP candidato es texto: `<h1 class="kinetic-text ..." style="opacity:0">Mejoramos<br/>...`. El texto permanece invisible hasta que corre el JS de animación cinética y cargan las 4 fuentes `woff2` precargadas. Esto coincide con el LCP móvil ~4.6s reportado en julio. Esto ya es un gotcha conocido (ver memoria: hack de `gsap-reveal`).
**Recomendación:** pintar el H1 visible por defecto (sin `opacity:0` bloqueante) y mover el efecto cinético a una animación no destructiva del LCP (p. ej. clip-path o transform sobre texto ya visible, en vez de opacity 0→1 gateado por fuentes). Si se mantiene el efecto, degradar a texto estático visible cuando `prefers-reduced-motion` o en la primera carga, y no depender de 4 pesos de fuente para pintar el H1.

### 2. Gap desktop (98) vs mobile (68-75) sin remedir hoy — **High**
**Evidencia:** cifras de julio 2026 (contexto de la tarea), no confirmadas hoy porque PSI devolvió 429 en ambos intentos.
**Recomendación:** priorizar la corrección del hallazgo #1 (causa raíz más probable del gap) y volver a correr `pagespeed_check.py` cuando el rate limit se libere (o con API key propia) para confirmar si el score mobile mejoró.

### 3. DOM del home cerca/por encima del umbral de 1,500 elementos — **Medium**
**Evidencia:** conteo estático de tags de apertura en `raw/page_.html` ≈ 1,560 elementos, frente a ≈ 340-433 en `/services`, `/blog` y `/precios`. Es un proxy estático (no runtime), pero está en el rango que la guía marca como "DOM excesivo" y puede afectar INP en interacciones sobre el home.
**Recomendación:** diferir/lazy-render secciones below-the-fold del home (testimonios, proyectos destacados, tecnologías) y confirmar el conteo real con el panel Elements de DevTools.

### 4. Cero `fetchpriority="high"` y cero Speculation Rules en las 4 páginas — **Medium**
**Evidencia:** `preload_check.py` reportó `fetchpriority_high: 0` y `speculation_rules.inline_blocks: 0` / `header_present: false` en `/`, `/services/integracion-ia`, `/blog/adopcion-de-ia-en-empresas` y `/precios`.
**Recomendación:** en el home, dado que el LCP es texto (no imagen), esta recomendación automática de "precargar imagen hero" no aplica directamente — la prioridad real es el hallazgo #1. En las demás páginas, si tienen imagen de héroe, añadir `fetchpriority="high"` a esa imagen. Agregar `<script type="speculationrules">` con prefetch a las rutas top (`/precios`, `/services/integracion-ia`) para navegaciones internas casi instantáneas.

### 5. Cero `srcset` en imágenes de las 4 páginas — **Medium**
**Evidencia:** `grep -o 'srcset='` devolvió 0 coincidencias en las 4 páginas pese a ser un sitio Next.js, lo que sugiere que las imágenes no pasan por `next/image` (sin variantes responsive/AVIF-WebP automáticas). En `/blog/adopcion-de-ia-en-empresas` solo 2 de 4 `<img>` tienen `width`/`height` confirmados por regex estático (riesgo de CLS en las otras 2, a verificar manualmente).
**Recomendación:** migrar imágenes de contenido a `next/image` (o añadir `width`/`height`/`sizes` explícitos manualmente) para obtener formatos modernos y reservar espacio de layout.

### 6. Sin `<link rel="preconnect">` en ninguna página — **Low**
**Evidencia:** 0 coincidencias de `rel="preconnect"` en las 4 páginas. Impacto limitado porque scripts y fuentes son same-origin (`_next/static/...`), pero si se añaden dominios externos (analytics, mapas, iframes) en el futuro, faltará ese hint.
**Recomendación:** monitorear si se agregan orígenes de terceros y añadir preconnect en ese momento; no es urgente hoy.

## No evaluado

- **INP, CLS y TBT reales** en ninguna página/dispositivo: requieren Lighthouse/PSI o campo CrUX, ambos no disponibles hoy (rate limit 429 / sin API key).
- **LCP real de `/services/integracion-ia`, `/blog/adopcion-de-ia-en-empresas` y `/precios`**: no se confirmó cuál es el elemento LCP de cada una ni su tiempo.
- **Datos de campo CrUX (p75, 28 días)** y **LCP subparts** (TTFB/delay/render-delay): sin API key configurada.
- **TBT y peso real de JS ejecutado**: solo se contaron 21 chunks JS first-party en el home vía HTML estático; no se midió bytes transferidos ni tiempo de ejecución en main thread.
- **Agentic Browsing category** (Lighthouse 13.4.1): no evaluada, fuera del alcance de esta pasada.

```json
{"category":"Performance (CWV)","score":58,"metrics":{"note":"lab data only; PSI returned 429 rate-limit on both attempts, no CrUX API key configured","home_lcp_mobile_prior_jul2026":"~4.6s (Poor)","home_lighthouse_desktop_prior_jul2026":98,"home_lighthouse_mobile_prior_jul2026":"68-75","ttfb_curl_unthrottled":{"/":"0.32s","/services/integracion-ia":"0.35s","/blog/adopcion-de-ia-en-empresas":"0.30s","/precios":"0.35s"},"home_dom_elements_approx":1560,"other_pages_dom_elements_approx":"340-433","fetchpriority_high_count":0,"speculation_rules_present":false,"third_party_scripts_detected":0,"srcset_attributes_found":0},"what_works":["Sin scripts de terceros detectados en las 4 páginas (0 GTM/GA/Clarity/Hotjar/FB Pixel)","Fuentes self-hosted via next/font con preload (4 woff2), sin dependencia de Google Fonts","TTFB de servidor bajo (~300-350ms sin throttling) en las 4 páginas","preload_check.py score 50/100 en las 4 páginas: sin Cache-Control no-store, sin listeners unload/beforeunload que bloqueen bfcache","Lighthouse desktop histórico 98 (jul-2026) indica que el código base es rápido en desktop"],"findings":[{"title":"LCP móvil ~4.6s (Poor) en home: H1 oculto con opacity:0 hasta JS + 4 fuentes","severity":"Critical","description":"El H1 kinetic-text del home se renderiza en el HTML pero con style=opacity:0, visible solo tras ejecutar la animación JS y cargar 4 archivos woff2 precargados. Coincide con el LCP móvil ~4.6s reportado en julio 2026.","recommendation":"Pintar el H1 visible por defecto y mover el efecto cinético a una técnica no bloqueante del LCP (clip-path/transform en vez de opacity 0→1 gateado por fuentes); considerar prefers-reduced-motion como fallback estático."},{"title":"Gap Lighthouse desktop (98) vs mobile (68-75) sin confirmar hoy","severity":"High","description":"Cifras de julio 2026 no remedidas hoy porque PageSpeed Insights devolvió 429 rate-limit en ambos intentos sobre el home.","recommendation":"Corregir el hallazgo del LCP móvil (causa raíz probable) y re-ejecutar pagespeed_check.py cuando el rate limit se libere o con API key propia."},{"title":"DOM del home ≈1,560 elementos, cerca/sobre el umbral de 1,500","severity":"Medium","description":"Conteo estático de tags de apertura en el HTML crudo del home es ~1,560, muy por encima de /services, /blog y /precios (340-433). Proxy estático, no runtime.","recommendation":"Lazy-render secciones below-the-fold del home (testimonios, proyectos, tecnologías) y confirmar con DevTools el conteo real de nodos."},{"title":"Cero fetchpriority=high y cero Speculation Rules en las 4 páginas","severity":"Medium","description":"preload_check.py reportó fetchpriority_high:0 y speculation_rules ausentes en /, /services/integracion-ia, /blog/adopcion-de-ia-en-empresas y /precios.","recommendation":"Añadir fetchpriority=high a la imagen hero real de cada página (si existe) y agregar speculationrules con prefetch a rutas top como /precios."},{"title":"Cero srcset en imágenes de las 4 páginas; posible ausencia de next/image","severity":"Medium","description":"0 coincidencias de srcset= en el HTML de las 4 páginas pese a ser un sitio Next.js. En /blog/adopcion-de-ia-en-empresas solo 2 de 4 <img> tienen width/height confirmados por regex estático.","recommendation":"Migrar imágenes de contenido a next/image o añadir width/height/sizes explícitos para evitar CLS y servir formatos modernos (AVIF/WebP)."},{"title":"Sin <link rel=preconnect> en ninguna página","severity":"Low","description":"0 coincidencias de rel=preconnect en las 4 páginas; impacto limitado hoy porque scripts y fuentes son same-origin.","recommendation":"Agregar preconnect si en el futuro se suman orígenes de terceros (analytics, mapas, iframes)."}]}
```
