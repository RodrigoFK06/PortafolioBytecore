# Auditoría GEO/AEO — árkos.com (xn--rkos-4na.com)

Estado: **parcial** (ver sección "No evaluado"). Fecha de auditoría: 2026-09-10.

## AI Search Readiness: 76/100 (parcial, no incluye platform readiness)

| Sub-puntuación | Score | Nota |
|---|---|---|
| Crawler access | 95/100 | robots.txt totalmente abierto |
| Machine-readable files | 90/100 | llms.txt/llms-full.txt/ai.txt/pricing.md OK, falta RSL 1.0 |
| Citability | 55/100 | parcial — solo home auditada a fondo |
| Entity / brand | 70/100 | schema rico, gaps en sameAs y consistencia de sede |
| Platform readiness (Google AIO, ChatGPT, Perplexity, Gemini, Claude) | **no evaluado** | no se probaron queries en vivo ni MCP DataForSEO |

El score global (76) es un **promedio ponderado solo de las 4 dimensiones evaluadas** (crawler 20%, files 20%, citability 25%, entity 20%, sobre 85% de peso total, renormalizado). No incorpora platform readiness por falta de evidencia.

## Qué funciona

- **robots.txt sin ningún Disallow**: `Allow: /` para `*`, y explícitamente para GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Amazonbot, CCBot, Claude-User, Perplexity-User, Meta-ExternalAgent, Applebot-Extended, bingbot, Googlebot. Declara `Sitemap: https://xn--rkos-4na.com/sitemap.xml`. **Esto confirma que el "robots blocked" reportado por otra herramienta era un falso positivo** — probablemente esa herramienta no manejó bien el punycode del dominio (`xn--rkos-4na.com`), no un bloqueo real.
- Homepage se sirve **pre-renderizada (SSR)**: `is_spa: False`, `mode_used: raw`, headers `X-Nextjs-Prerender: 1`, `Server: Vercel`. El HTML crudo (sin ejecutar JS) ya trae la descripción de la entidad, precios y enlaces a llms.txt — favorable para crawlers de IA que no ejecutan JavaScript.
- **Los 4 archivos legibles por agentes existen y responden 200** con content-type correcto:
  - `/llms.txt` (text/plain, ~11.2 KB) — resumen + FAQs + enlaces.
  - `/llms-full.txt` (text/plain, ~25.4 KB) — versión exhaustiva.
  - `/ai.txt` (text/plain, ~6.3 KB) — "system prompt" canónico de la entidad.
  - `/pricing.md` (text/markdown, ~4.5 KB) — tarifario en texto plano.
  - La home enlaza a llms.txt y llms-full.txt en su propio texto visible ("Contexto ampliado para modelos de lenguaje: ...").
- **Coherencia numérica verificada** entre `/pricing.md` y el schema `PriceSpecification` de `/precios`: los 7 precios "desde" en USD coinciden exactamente (300/600/900/1200/3500/2500/500 USD ↔ landing, web corporativa, e-commerce, web app/MVP, sistema a medida, app móvil, integración IA). Sin contradicciones detectadas entre home, ai.txt, llms.txt y pricing.md en cifras de equipo (9 personas), trayectoria (+50 proyectos, +45 clientes, +20 sistemas en producción) ni fundación (2020).
- Schema **Organization/LocalBusiness/ProfessionalService** en home con `legalName`, `taxID`/`vatID` (RUC 20616338782), `foundingDate`, `numberOfEmployees`, `hasOfferCatalog`. Schema **Person** para Rodrigo Torres (`jobTitle`, `hasCredential` con 5 certificaciones fechadas, `sameAs` a GitHub/LinkedIn/Instagram). FAQPage presente en `/precios`, `/services`, `/services/integracion-ia` (Info: no se asume beneficio confirmado de citación por tener FAQPage).

## Hallazgos

### 1. [Medium] Inconsistencia de sede: Lima vs. La Libertad/Trujillo
El schema `PostalAddress` de Organization solo declara `addressLocality: "Lima"` / `addressRegion: "Lima"`; `areaServed` incluye una `City: "Trujillo"` sin aclarar relación con el domicilio legal. Tanto `ai.txt` como `llms.txt` fijan la frase canónica "Ubicación: Lima, Perú" sin matices. Si el domicilio fiscal registrado en SUNAT corresponde a La Libertad (no a Lima), un modelo que cruce estos textos con el RUC público puede generar respuestas contradictorias sobre dónde está realmente Árkos.
**Recomendación:** decidir el enunciado público único (p. ej. "sede operativa en Lima, domicilio fiscal en La Libertad" o viceversa) y que schema, ai.txt y llms.txt digan exactamente lo mismo, en vez de presentar Lima como hecho no calificado.

### 2. [Medium] Headings no están en formato pregunta
Los H2 capturados en home son declarativos, no interrogativos: "Sobre Nosotros", "Nuestros Servicios", "Cumplimiento SUNAT de fábrica", "Nuestras Tecnologías", "Proyectos Destacados", "Quién construye esto", "Lo que dicen nuestros clientes", "Cómo trabajamos", "Conversemos tu proyecto". Los encabezados en forma de pregunta ("¿Qué es Árkos?", "¿Cuánto cuesta un sistema a medida en Perú?") se citan con más frecuencia en AI Overviews y answer engines.
**Recomendación:** convertir encabezados clave de `/`, `/precios` y `/diagnostico` a forma de pregunta donde sea natural, manteniendo una respuesta directa de 40-60 palabras justo debajo.

### 3. [Medium] Cobertura de `lastmod` incompleta en sitemap.xml
Solo 7 de 53 URLs del sitemap tienen `<lastmod>` (los posts de blog). Páginas de alta prioridad recién tocadas en el reposicionamiento — `/precios` (prioridad 0.9), `/diagnostico` (0.9), `/desarrollo-de-software-lima` (0.9), `/services/integracion-ia` — no tienen `lastmod`, lo que debilita la señal de frescura para que los crawlers de IA prioricen el re-rastreo justo después del despliegue de hoy.
**Recomendación:** añadir `lastmod` a todas las URLs del sitemap, priorizando las páginas actualizadas el 2026-09-10.

### 4. [Low] `sameAs` de Organization incompleto y con una inconsistencia interna
El schema Organization solo lista `sameAs: ["https://x.com/ArkosPeru", "https://clutch.co/profile/rkos"]`. `ai.txt`, por separado, menciona un LinkedIn de empresa (`https://www.linkedin.com/company/arkos`) que no está en el `sameAs` del schema — una fuente lo sabe y la otra no. Tampoco hay GitHub de organización, Wikipedia/Wikidata, YouTube, Reddit ni Google Business Profile referenciados en ningún archivo/schema rastreado.
**Recomendación:** agregar el LinkedIn de empresa al `sameAs` de Organization; priorizar reclamar/publicar un Google Business Profile (un LocalBusiness sin GBP detrás es una señal local débil para Google AI Overviews).

### 5. [Low] RSL 1.0 no implementado
No se encontró bloque de licenciamiento RSL 1.0 (ni las cadenas "RSL", "license"/"licencia") en `llms.txt` ni `llms-full.txt`, ni declaración de licencia en `robots.txt`. No es bloqueante hoy (estándar emergente) pero es un gap de cara al futuro si Árkos quiere declarar explícitamente uso permitido para entrenamiento vs. citación.
**Recomendación:** evaluar añadir un bloque RSL 1.0 o cabecera `Content-Usage` cuando el estándar madure más en adopción por crawlers.

### 6. [Info] Colisión de nombre con "ArkOS" (sistema operativo) no verificada en esta pasada
Existe un sistema operativo conocido llamado ArkOS (retro-gaming). No se encontró contenido de desambiguación explícita en las páginas/archivos rastreados, pero tampoco se probó cómo lo resuelven hoy los motores de IA en vivo.
**Recomendación:** verificar con búsquedas reales cómo desambiguan "Árkos" los distintos motores y, si hay confusión, añadir texto de desambiguación explícito.

## No evaluado (no inventado)

- **Citability pasaje a pasaje** (longitud óptima 134-167 palabras, respuesta directa en 40-60 palabras iniciales por sección, estadísticas con fuente) en `/services/integracion-ia`, `/blog/adopcion-de-ia-en-empresas`, `/diagnostico`, `/precios`, `/desarrollo-de-software-lima`: las páginas fueron descargadas (200 OK, SSR confirmado, `extracted_text` disponible) pero no se completó el conteo de palabras por bloque.
- **Platform readiness en vivo**: Google AI Overviews, ChatGPT search (Bing), Perplexity, Gemini, Claude — no se ejecutaron consultas reales ni herramientas MCP de DataForSEO en esta pasada.
- **Verificación externa de menciones de marca**: validez y actividad real del perfil de Clutch, existencia/actividad del LinkedIn de empresa, GitHub de organización, entidad en Wikipedia/Wikidata, menciones en YouTube/Reddit, existencia de Google Business Profile — no se consultó vía WebSearch/WebFetch en esta pasada.
- **Impacto real de la colisión "Árkos" vs. "ArkOS"** en respuestas de motores de IA — no probado con consultas en vivo.
- **Headers/robots a nivel de página individual** más allá de la home — robots.txt aplica sitio-wide y no tiene reglas por ruta, pero no se inspeccionaron headers de `/precios`, `/diagnostico`, etc. en esta pasada.

```json
{"category":"AI Search Readiness","score":76,"subscores":{"crawler_access":95,"machine_readable_files":90,"citability":55,"entity_brand":70,"platform_readiness":null},"what_works":["robots.txt permite explícitamente a GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, CCBot, Amazonbot, Claude-User, Perplexity-User, Meta-ExternalAgent y Applebot-Extended sin ningún Disallow; el 'robots blocked' previo era falso positivo por el IDN","Home se sirve SSR (is_spa=False, mode_used=raw) con la descripción de entidad y precios ya en el HTML crudo","/llms.txt, /llms-full.txt, /ai.txt y /pricing.md existen, responden 200 con content-type correcto y están enlazados desde la home","Precios en pricing.md coinciden exactamente con PriceSpecification (schema) de /precios en las 7 categorías de servicio","Schema Organization/LocalBusiness/ProfessionalService con RUC, legalName, hasOfferCatalog, y schema Person para el fundador con credenciales fechadas y sameAs"],"findings":[{"title":"Inconsistencia de sede: Lima vs. La Libertad/Trujillo","severity":"Medium","description":"El schema PostalAddress solo declara addressLocality Lima; areaServed incluye Trujillo sin aclarar la relación con el domicilio legal. ai.txt y llms.txt fijan 'Ubicación: Lima, Perú' sin matices, lo que puede chocar con el domicilio fiscal SUNAT si este está en La Libertad.","recommendation":"Fijar un enunciado único de sede y hacerlo consistente en schema, ai.txt y llms.txt."},{"title":"Headings no están en formato pregunta","severity":"Medium","description":"Los H2 de la home son declarativos (Sobre Nosotros, Nuestros Servicios, etc.), no interrogativos, lo que reduce la extracción directa en AI Overviews y answer engines.","recommendation":"Convertir encabezados clave a forma de pregunta con respuesta directa de 40-60 palabras debajo."},{"title":"Cobertura de lastmod incompleta en sitemap.xml","severity":"Medium","description":"Solo 7 de 53 URLs tienen lastmod (los posts de blog); páginas prioritarias recién actualizadas (/precios, /diagnostico, /desarrollo-de-software-lima, /services/integracion-ia) no lo tienen.","recommendation":"Añadir lastmod a todas las URLs del sitemap, priorizando las tocadas el 2026-09-10."},{"title":"sameAs de Organization incompleto e inconsistente con ai.txt","severity":"Low","description":"Organization.sameAs solo tiene X y Clutch; ai.txt menciona un LinkedIn de empresa que no aparece en el schema. No hay GitHub de organización, Wikipedia, YouTube, Reddit ni GBP referenciados.","recommendation":"Agregar LinkedIn de empresa al sameAs y priorizar reclamar un Google Business Profile."},{"title":"RSL 1.0 no implementado","severity":"Low","description":"No se encontró bloque de licenciamiento RSL 1.0 ni referencias a licencia en llms.txt, llms-full.txt o robots.txt.","recommendation":"Evaluar añadir un bloque RSL 1.0 o cabecera Content-Usage a futuro."},{"title":"Colisión de nombre con ArkOS (sistema operativo) sin verificar en vivo","severity":"Info","description":"Existe un OS conocido llamado ArkOS; no se probó cómo lo resuelven hoy los motores de IA ni se halló desambiguación explícita en el sitio.","recommendation":"Probar consultas reales y, si hay confusión, añadir texto de desambiguación."}]}
```
