# Auditoría de Sitemap — xn--rkos-4na.com (árkos.com)

**Puntuación: 84/100**

## Qué funciona

- `sitemap.xml` es XML válido (`urlset`), declarado en `robots.txt` (`Sitemap: https://xn--rkos-4na.com/sitemap.xml`) y responde 200.
- Contiene exactamente **53 URLs únicas**, tal como se esperaba (~53). Sin duplicados (`sort | uniq -d` vacío).
- Sin duplicados de forma (no hay variantes `www.`, ni mezcla con/sin barra final).
- Uso de `lastmod` **correcto por diseño**: presente solo en las 7 entradas `/blog/*` (formato W3C Datetime válido, `YYYY-MM-DDT00:00:00.000Z`) y ausente en las 46 páginas estáticas/portafolio. Es la práctica recomendada: declarar `lastmod` solo donde hay una fecha de cambio de contenido real y confiable, en vez de poner una fecha genérica en páginas que no cambian.
- Cobertura verificada por crawl: los enlaces internos renderizados en HTML crudo (SSR, `is_spa=False`) de `/` (home), `/portfolio` (28/28 fichas) y `/blog` (7/7 posts) coinciden exactamente con las URLs del sitemap. No se detectaron páginas enlazadas y ausentes del sitemap en estas tres páginas de entrada.
- `/portfolio/16` responde 404 de forma consistente (no está enlazado en ningún lado ni en el sitemap) — no hay hueco de cobertura ahí, es un ID retirado correctamente.
- Exclusiones intencionales confirmadas como correctas:
  - `/estudio/fine-dining` → 200 pero `<meta name="robots" content="noindex, nofollow, nocache">`: bien excluida del sitemap (consistente noindex + fuera de sitemap).
  - `/pricing.md` → 200, `Content-Type: text/markdown`: recurso alterno para agentes/IA (no es una página HTML de navegación), correcto no incluirlo en el sitemap XML.
  - `/rss.xml` → 200, `Content-Type: application/rss+xml`: es un feed, no una página; correcto excluirlo del sitemap.
- 28 fichas de portafolio están por debajo del umbral de 30 páginas que activa la advertencia de contenido programático delgado (location-page gate no aplica todavía).
- 50.000 URLs / 50MB: muy por debajo del límite (53 URLs, 7KB) — no hay riesgo de partición con sitemap index.

## Hallazgos

### Medium — `/search` es indexable pero no está en el sitemap
`/search` responde 200 con `<meta name="robots" content="index, follow, max-snippet:-1">`, es decir, Google puede indexarla, pero no aparece en `sitemap.xml`. Hay una inconsistencia de intención: o es una página que se quiere posicionar (debería ir en el sitemap) o es una página de resultados de búsqueda interna sin valor único para SERP (debería llevar `noindex`).
**Recomendación:** decidir intención. Si no aporta contenido único, cambiar su `meta robots` a `noindex, follow`. Si se quiere indexar, agregarla al sitemap.

### Medium — `lastmod` de `/blog/adopcion-de-ia-en-empresas` coincide con la fecha de hoy (2026-09-10)
Es la única entrada cuyo `lastmod` es igual a la fecha de ejecución de esta auditoría. Puede ser una actualización real del día, pero también puede ser síntoma de que el campo se genera dinámicamente con "ahora" en vez de reflejar el último cambio significativo del contenido (lo cual dañaría la confianza de Google en el resto de las fechas `lastmod` del sitio).
**Recomendación:** confirmar en el CMS/repo si el post fue editado hoy de verdad. Si el `lastmod` se calcula como `new Date()` al momento del build/request en vez de la fecha real del último commit/edición de contenido, corregirlo para que derive de metadata real (frontmatter, `updated_at` de base de datos, etc.).

### Info — `changefreq` y `priority` presentes en las 53 URLs
Google ignora ambas etiquetas desde hace años (confirmado por Google); Bing les da peso marginal. No es dañino, pero infla el archivo sin beneficio de crawl budget.
**Recomendación:** opcional quitarlas para simplificar el generador de sitemap; no es urgente.

## No evaluado (no se llegó a comprobar en esta pasada)

- **Muestreo sistemático de códigos de estado/redirecciones de las 53 URLs del sitemap** (se pidió muestrear hasta 25 con espera de 1s): no se ejecutó ese barrido completo; solo se verificaron puntualmente `/portfolio/16`, `/pricing.md`, `/rss.xml`, `/search` y `/estudio/fine-dining`. No hay evidencia de 4xx/5xx dentro del sitemap, pero tampoco confirmación exhaustiva.
- **Duplicado apex/www**: no se probó si `www.xn--rkos-4na.com` existe y si redirige (301) al apex o genera contenido duplicado.
- **% de contenido único real entre fichas de portafolio**: se confirmó que las 28 URLs enlazadas coinciden con el sitemap, pero no se comparó el contenido (texto único vs. plantilla) ficha por ficha para calcular el porcentaje de unicidad exigido por el quality gate (60%+ a partir de 30 páginas). Con 28 páginas el gate formal no se activa, pero si el sitio crece a 30+ fichas de portafolio, este análisis de unicidad sí será obligatorio antes de aprobar.
- **Encabezados HTTP completos (caching, canonical por URL) de cada entrada del sitemap**: no verificado uno por uno.

```json
{"category":"Sitemap","score":84,"what_works":["sitemap.xml es XML válido (urlset), declarado en robots.txt y responde 200","53 URLs únicas, coincide con lo esperado (~53), sin duplicados ni variantes www/barra final","lastmod solo en los 7 posts de /blog con formato W3C válido; ausente en las 46 páginas estáticas/portafolio por diseño (práctica correcta)","Cobertura de enlaces internos de /, /portfolio (28/28) y /blog (7/7) coincide exactamente con el sitemap, sin páginas huérfanas detectadas","/portfolio/16 (404) correctamente fuera del sitemap","/estudio/fine-dining (noindex), /pricing.md (text/markdown) y /rss.xml (feed) correctamente excluidos del sitemap","28 fichas de portafolio por debajo del umbral de 30 que activa el quality gate de contenido delgado","Muy por debajo del límite de 50.000 URLs / 50MB"],"findings":[{"title":"/search es indexable (meta robots index,follow) pero no está en el sitemap","severity":"Medium","description":"/search responde 200 con meta robots index, follow, max-snippet:-1, pero no aparece en sitemap.xml. Hay ambigüedad entre indexar la búsqueda interna y excluirla del sitemap.","recommendation":"Si /search no aporta contenido único por query, cambiar su meta robots a noindex, follow. Si se desea indexar, añadirla al sitemap."},{"title":"lastmod de /blog/adopcion-de-ia-en-empresas coincide con la fecha de ejecución de la auditoría","severity":"Medium","description":"Es la única entrada con lastmod = fecha de hoy (2026-09-10T00:00:00.000Z). Podría ser una edición real o un lastmod generado dinámicamente con 'ahora' en vez de la fecha real del último cambio de contenido.","recommendation":"Confirmar en el CMS/repo si hubo edición real hoy. Si el campo se calcula como new Date() en build/request, cambiarlo para que derive de metadata real (frontmatter o updated_at)."},{"title":"changefreq y priority presentes en las 53 URLs","severity":"Info","description":"Ambas etiquetas son ignoradas por Google (confirmado oficialmente); Bing les da peso marginal. No dañan pero no aportan valor.","recommendation":"Opcional: remover changefreq y priority del generador de sitemap para simplificar el archivo."}]}
```
