# Auditoría SEO completa — árkos.com

- **Sitio:** https://xn--rkos-4na.com (árkos.com; el punycode es intencional y es el host canónico)
- **Fecha:** 2026-09-10, después del deploy del reposicionamiento (commit `d3d46df`)
- **Tipo de negocio detectado:** Agencia de software (portafolio, casos, servicios) con señales de servicio local B2B (teléfono, Lima, LocalBusiness) y de publisher (blog con autor). Sin e-commerce.
- **Herramienta:** plugin `claude-seo` 2.2.5, 12 especialistas en paralelo (técnico, contenido ×2, schema, sitemap, performance, visual, GEO, local, backlinks, clúster, SXO). Sin credenciales de Google, Moz ni Bing: performance con datos de laboratorio e histórico; backlinks solo con Common Crawl y verificación en vivo.
- **Páginas analizadas:** home renderizada con Playwright; 12 páginas clave muestreadas por los especialistas; sitemap de 53 URLs validado.
- **Correcciones del orquestador:** se descartaron tres falsos positivos de los especialistas tras verificación directa: "cero srcset" (Next emite `srcSet` y el grep era sensible a mayúsculas: 28 de 29 imágenes del home sí lo llevan), "fecha 2026-01-01 de publicación" (es el valor por defecto de la herramienta de render, no existe en el HTML) y "atribución de testimonios ausente" (nombre, cargo y empresa están en texto plano en el HTML; el extractor los separó de la cita).

---

## Resumen ejecutivo

**SEO Health Score: 78 / 100**

La base técnica y de datos para IA está por encima de lo habitual en su categoría: SSR completo, robots abierto a los rastreadores de IA, sitemap limpio, redirecciones 308 de un salto, cabeceras de seguridad, cuatro archivos legibles por máquina coherentes entre sí y un grafo de entidad con RUC y credenciales del fundador. Lo que frena al sitio son tres cosas distintas: un bloque de contexto oculto que contamina lo que los extractores leen en las páginas internas, la ausencia casi total de autoridad externa (sin Google Business Profile, sin reseñas, un solo backlink y nofollow), y una mitad de las páginas que compite contra el tipo de resultado equivocado en Google.

| Categoría | Score | Peso | Ponderado |
|---|---|---|---|
| Technical SEO | 88 | 22% | 19.4 |
| Content Quality | 76 (home 74 · 4 páginas clave 77) | 23% | 17.5 |
| On-Page SEO | 83 | 20% | 16.6 |
| Schema / Structured Data | 80 | 10% | 8.0 |
| Performance (CWV) | 58 (laboratorio + histórico; PSI con rate limit hoy) | 10% | 5.8 |
| AI Search Readiness | 76 | 10% | 7.6 |
| Images | 65 | 5% | 3.3 |
| **SEO Health Score** | | | **78** |

Fuera de la fórmula, como contexto: Local SEO 33, Backlinks 15 (confianza baja), SXO 55, Visual/UX 85, Sitemap 84.

### Top 5 problemas

1. **El bloque `#llm-context` del layout raíz secuestra la extracción de texto en las páginas internas.** Para `/portfolio/19` y `/diagnostico` el extractor (modo raw y Playwright) devuelve la descripción genérica de Árkos en lugar del contenido real, porque el `div.sr-only` es el bloque de prosa más denso de la página. Un motor de IA puede citar "Árkos es una empresa de software..." cuando le preguntan por RestHUB.
2. **Sin Google Business Profile y sin reseñas.** Clutch con 0 reseñas; el competidor que domina el pack local tiene 4.9 con ~110. Sin GBP tampoco hay huella en el Knowledge Graph, que es lo que hunde Gemini.
3. **LCP móvil ~4.6 s por el H1 cinético** (`opacity:0` hasta que corre JS y cargan cuatro fuentes). Cifra de julio; hoy no se pudo remedir por rate limit de PageSpeed. Es una decisión de diseño pendiente, no deuda accidental.
4. **Desajuste de intención en dos páginas de dinero.** "Necesito un sistema para mi negocio" muestra productos SaaS listos, no consultoría, y `/diagnostico` compite ahí; "adopción de IA en empresas Perú" muestra noticias y guías, y `/services/integracion-ia` compite con una página de venta.
5. **`www` responde 200 sin redirigir al apex.** Es el espejo del crítico de julio (entonces el apex redirigía a www). Hoy hay dos hosts servidos; el único backlink externo verificado apunta a `www`.

### Top 5 quick wins

1. Renderizar el bloque `#llm-context` solo en el home (hoy está en el layout de todas las páginas).
2. Redirección 308 `www` → apex en Vercel (Settings → Domains) y `noindex` en `/search`.
3. `sizes` correcto en las tarjetas del portafolio: hoy piden 3840 px para un hueco de 403 × 192 (repite el hallazgo de julio).
4. `priceCurrency` a PEN en `/precios`, `priceSpecification` en los catálogos de home y `/services`, y `BreadcrumbList` en las cuatro páginas que no lo tienen.
5. Recortar la meta description de `/portfolio/19` (317 caracteres) y el título del post de adopción de IA (100 caracteres), incorporando la frase "capacitar a tu equipo".

---

## Qué funciona (no tocar)

- `robots.txt` permite explícitamente a GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended y Bingbot. El "robots blocked" de auditorías anteriores era un falso positivo por el IDN.
- SSR total: `is_spa:false` en las 12 páginas; el texto de entidad, precios y casos está en el HTML crudo.
- Sitemap válido con exactamente 53 URLs, todas en el host apex, sin duplicados www/barra, sin huérfanas: la cobertura de enlaces internos de home, `/portfolio` (28/28) y `/blog` (7/7) coincide con el sitemap.
- http→https y `/projects`→`/portfolio` en 308 de un salto. Canonical autorreferencial, `robots` meta y hreflang es-PE/x-default consistentes en las 11 páginas muestreadas.
- HSTS, X-Frame-Options y X-Content-Type-Options presentes.
- `/llms.txt`, `/llms-full.txt`, `/ai.txt` y `/pricing.md` responden 200 con content-type correcto y sus cifras y precios coinciden entre sí y con el `PriceSpecification` de `/precios`.
- Entidad única Organization/LocalBusiness/ProfessionalService con `@id`, RUC en `taxID`/`identifier`, `numberOfEmployees`, `founder` → Person con `hasCredential`; WebSite con SearchAction; Article + FAQPage en posts; todo SSR y sin tipos deprecados.
- Cero scripts de terceros; fuentes autoalojadas y precargadas; TTFB ~300–350 ms; bfcache sin bloqueos.
- H1 y CTA visibles sin scroll en las 5 páginas capturadas (1440 y 390 px); sin overflow horizontal; alt text descriptivo en el 100 % de las imágenes evaluadas; WhatsApp prellenado visible sin scroll en `/diagnostico` móvil.
- Contenido con autoría en primera persona, cronología verificable, testimonios con nombre, cargo, empresa y enlace, cifras propias (Solutec 650 órdenes/mes, RestHUB 45→5 min, Precio Vivo 165 casos y resultado negativo publicado), precios en soles, RUC y razón social.

---

## Hallazgos por severidad

### Critical

| # | Hallazgo | Evidencia | Fix |
|---|---|---|---|
| C1 | Bloque `sr-only#llm-context` global contamina la extracción de texto | `render_page.py` (raw y Playwright) devuelve el texto de entidad del home para `/portfolio/19` y `/diagnostico`; el contenido real existe pero pierde por densidad de texto | Mover el bloque de `app/layout.tsx` a `app/page.tsx` (solo home). Verificación: `claude-seo run render_page.py https://xn--rkos-4na.com/portfolio/19 --json` debe empezar por el caso RestHUB |
| C2 | Sin Google Business Profile ni reseñas | Confirmado por el cliente; Clutch 0 reseñas; sin `AggregateRating` (correcto no inventarlo) | Crear GBP como negocio de área de servicio sin dirección pública (checklist en `findings/local.md`); 3–5 reseñas en Clutch con clientes ya públicos |
| C3 | LCP móvil ~4.6 s (Poor) en home | H1 con `style="opacity:0"` hasta JS + 4 woff2; julio: desktop 98, móvil 68–75; hoy PSI devolvió 429 | Decisión de diseño: H1 visible por defecto y animar solo cuando JS ya cargó (clase `.js` en `<html>`), o dividir por palabras en móvil. Medir con PSI tras obtener API key |
| C4 | Desajuste de intención en `/diagnostico` y `/services/integracion-ia` | SERP de "necesito un sistema para mi negocio": fichas SaaS (Wally, PANCA) y listicles; SERP de "adopción de IA en empresas Perú": noticias y guías | Apuntar `/necesitas-un-sistema` (herramienta informativa) a la primera consulta; crear spokes informativos del clúster de IA y dejar el servicio para consultas comerciales ("empresa de integración de IA Lima", "automatización n8n precio") |

### High

| # | Hallazgo | Evidencia | Fix |
|---|---|---|---|
| H1 | `www.xn--rkos-4na.com` sirve 200 sin redirigir | `curl -I` → `HTTP/1.1 200 OK` sin `Location`; solo el canonical apunta al apex | Vercel → Domains: `www` como redirect 308 al apex |
| H2 | Tarjetas de portafolio piden 3840 px para 403 × 192 | ~23 `<img>` con `w=3840` en `/_next/image`; hallazgo repetido desde julio | `sizes="(max-width: 768px) 100vw, 33vw"` en `project-card.tsx` |
| H3 | Autoridad externa casi nula | Common Crawl no indexa el dominio; 1 backlink verificado (README de PrecioVivo, nofollow, hacia `www`); perfil GitHub menciona Árkos sin enlace | Campo *website* del perfil GitHub y READMEs de PrecioVivo/precio-justo/FacturArkos con enlace al apex; LinkedIn Company Page; Clutch; sitios de clientes (Clínica Juan Pablo II, Freedy Sotelo, ReLu) |
| H4 | Sin contenido propio en el clúster de precios | "Cuánto cuesta un sistema a medida", "ERP a medida Perú precio": 7+ guías de competidores; Árkos solo tiene `/precios` (comercial) | Spoke "Cuánto cuesta un sistema a medida en Perú: guía de precios 2026" enlazado a `/precios` |
| H5 | Página de Lima sin distritos; Clutch dice Trujillo | Cero menciones de San Isidro, Miraflores, Surco, San Borja, La Molina, Callao en contexto de servicio; Clutch no verificado en vivo | Sección de cobertura por distrito en `/desarrollo-de-software-lima`; corregir la ciudad en Clutch |
| H6 | Home compite contra listicles por "empresa de software Lima" | SERP dominado por "Top 6/15 mejores empresas de software" y agregadores | Spoke "Cómo elegir una empresa de desarrollo de software a medida en Lima: checklist" (no hay competidores directos en ese SERP) |

### Medium

| # | Hallazgo | Fix |
|---|---|---|
| M1 | `/search` indexable, fuera del sitemap y con el mismo `<title>` que el home | `robots: noindex, follow` en `app/search` |
| M2 | CSP solo en Report-Only | Pasar a bloqueante cuando se revisen los reportes |
| M3 | Schema: `priceCurrency` USD en `/precios`; Offers de catálogo sin `priceSpecification`; `BreadcrumbList` ausente en `/precios`, `/diagnostico`, `/portfolio`, `/necesitas-un-sistema`; `provider` inline en `/precios` | Usar `penLabel` con PEN; añadir `priceSpecification` desde `data/pricing.ts`; breadcrumbs; `provider: {"@id": ".../#organization"}` |
| M4 | Meta descriptions largas: `/portfolio/19` 317, `/diagnostico` 218, `/precios` 200, post de IA 192, `/portfolio` 181; título del post 100 caracteres | Recortar a 150–160; `seoTitle` en el frontmatter del post: "Adopción de IA en empresas: cómo capacitar a tu equipo y medir el uso" |
| M5 | H2 del home declarativos ("Sobre Nosotros", "Nuestros Servicios") | Reformular 3–4 H2 como preguntas que la gente busca, sin tocar el H1 |
| M6 | `lastmod` en 7/53 URLs (por diseño, para evitar timestamps de build) | Mapa manual de fechas reales para `/`, `/precios`, `/diagnostico`, `/services/*`, `/desarrollo-de-software-lima`, actualizado solo en ediciones reales |
| M7 | Prueba social solo en el home | Bloque de testimonio con nombre y métrica en `/precios`, `/diagnostico` y `/services/integracion-ia` |
| M8 | Métrica "78 % de citas digitales" sin periodo ni método | Añadir periodo de medición junto al chip ("primeros 6 meses", según el cliente) |
| M9 | Sede: schema y archivos dicen Lima; la constitución legal es en La Libertad | Una frase en `llms-full.txt` y `ai.txt`: "constituida en La Libertad, opera desde Lima"; nunca publicar la dirección fiscal |
| M10 | `/portfolio/19` delgado y sin prueba de cliente visible; `/diagnostico` por debajo de 800 palabras | Ampliar el caso RestHUB con las cifras ya confirmadas (5 locales, 500 transacciones/día, COFIDE) y la sección de proceso; `/diagnostico` con ejemplo de entregable |
| M11 | Canibalización potencial: `/desarrollo-de-software-lima` vs `/services/software-a-medida`; post "desarrollo-software-a-medida-en-peru" vs la landing | Diferenciar: landing = Lima + transaccional; servicio = qué incluye y precio; post = guía nacional. No fusionar |
| M12 | Imágenes: fuentes PNG/JPG (13 PNG, 4 JPG, 4 WebP nativos); logo pedido dos veces | Convertir fuentes a WebP/AVIF; reutilizar el logo del header |
| M13 | Enlace "Diagnóstico" del header con área de toque 76 × 20 px | `min-height: 44px` y padding vertical |
| M14 | DOM del home ~1,560 nodos | Revisar la sección de tarjetas (23 proyectos) y el índice de stats; lazy-render bajo el fold |
| M15 | `areaServed` del schema no incluye Callao ni Arequipa que sí menciona el copy; `sameAs` sin LinkedIn de empresa | Alinear `areaServed`; añadir la Company Page cuando exista |

### Low

- H1 del home se extrae como "Mejoramostus procesos" (el `<br/>` no genera espacio) y el H2 de `/portfolio` como "Todos los proyectos28": añadir un espacio antes del `<br/>` y separar el contador con un `<span>` y espacio.
- `changefreq`/`priority` en las 53 URLs: Google las ignora; opcional retirarlas.
- Sin `preconnect`: irrelevante hoy porque todo es same-origin.
- Sin `openingHoursSpecification` en LocalBusiness: añadir horario de atención comercial.
- RSL 1.0 no implementado en llms.txt/robots: opcional.
- Ventana de ~150–300 ms con el H1 invisible durante la animación: en las capturas finales siempre aparece completo.
- FAQPage (Info): Google retiró el rich result en mayo de 2026; no quitar ni añadir por SERP; sigue siendo útil como estructura visible.
- Colisión de nombre con "ArkOS" (SO retro) y con Arkano, Arkeia y arkos-studio en consultas de cola larga: "Árkos software" ya resuelve en posición ~2; mantener la co-ocurrencia "Árkos, empresa de software en Lima, Perú" en todo perfil externo.

---

## Categorías en detalle

### Technical SEO (88) y On-Page (83)
Fundamentos sólidos (ver "Qué funciona"). Lo abierto es de configuración, no de arquitectura: el host `www` duplicado, la CSP en Report-Only y la limpieza de longitudes de título y descripción. El sitemap omite `lastmod` en estáticas a propósito; el coste es que las páginas recién actualizadas no señalan frescura. Detalle en `findings/technical.md` y `findings/sitemap.md`.

### Content Quality (76)
Home 74; `/services/integracion-ia` 82, post de adopción de IA 85, `/portfolio/19` 66, `/diagnostico` 74. Fortalezas: primera persona, cifras propias verificables, transparencia (resultado negativo publicado), FAQ visible, coherencia de cifras con el home. Debilidades: el bloque `#llm-context` (C1), el caso RestHUB delgado, `/diagnostico` corto, y la métrica del testimonio sin periodo. El "byline ausente" que reportó el segundo pase no se pudo confirmar porque el extractor devolvía el texto del home; el author box existe desde julio y debe verificarse tras corregir C1. Detalle en `findings/content.md` y `findings/content-2.md`.

### Schema / Structured Data (80)
Implementación poco común para una pyme. Lo abierto: moneda del `PriceSpecification`, `priceSpecification` en los catálogos, breadcrumbs en cuatro páginas, `provider` inline en `/precios`, `sameAs` corto. Sin `AggregateRating`, correctamente, hasta que existan reseñas reales. Detalle en `findings/schema.md` (JSON-LD crudo en `jsonld/`).

### Performance (58, laboratorio e histórico)
No hay medición de campo (sin CrUX) y PageSpeed devolvió 429 en tres intentos, así que la cifra se apoya en julio (desktop 98, móvil 68–75, LCP móvil ~4.6 s) y en diagnósticos estáticos de hoy (TTFB ~300 ms, sin terceros, DOM ~1,560 nodos en home, sin `fetchpriority`). La palanca es una sola y es de diseño: el H1 oculto hasta JS. Detalle en `findings/performance.md`.

### AI Search Readiness (76)
Crawler access 95 · archivos machine-readable 90 · citabilidad 55 (parcial) · entidad 70 · plataformas no evaluadas aquí (las cubre la auditoría GEO paralela). Lo que baja la citabilidad es la forma de los H2 y el bloque `#llm-context`; lo que baja la entidad es la sede y el `sameAs`. Detalle en `findings/geo.md`.

### Images (65) y Visual/UX (85)
El único problema de peso es el `sizes` de las tarjetas. Detalle y 20 capturas en `findings/visual.md` y `screenshots/`.

### Local SEO (33), Backlinks (15) y SXO (55)
Las tres categorías fuera de la fórmula del Health Score, y las tres son las que más mueven el negocio: sin GBP no hay pack local ni Knowledge Graph; sin enlaces no hay autoridad; y con la mitad de las páginas compitiendo contra el tipo de resultado equivocado, una página bien hecha no rankea. Detalle en `findings/local.md`, `findings/backlinks.md`, `findings/sxo.md` y el plan de clústeres en `findings/cluster.md`.

---

## Síntesis (PERCEIVE → ANALYZE → VALIDATE → ACT)

**Percibir.** El sitio nuevo ya está indexable, extraíble y coherente; los especialistas coinciden en que la ejecución on-page es fuerte. **Analizar.** Los tres frenos son independientes entre sí: uno es un bug de extracción (C1) que se arregla en el código en minutos, otro es autoridad externa (C2, H3, H5) que solo Rodrigo puede construir, y el tercero es estratégico (C4, H4, H6): el sitio tiene páginas comerciales para consultas que Google responde con contenido informativo. **Validar.** Cada recomendación de este informe lleva su prueba de falsación en `ACTION-PLAN.md`: si tras el fix el extractor sigue devolviendo el texto del home, la causa era otra; si tras 60 días de GBP y reseñas Gemini no mejora, la entidad tiene otro bloqueo. **Actuar.** Primero código (una tarde), luego tareas externas (una semana de Rodrigo), luego contenido por clústeres (mes 2).

---

## Anexo: páginas muestreadas

| URL | Notas |
|---|---|
| / | Home renderizada; H1 cinético; 29 imágenes; DOM ~1,560 |
| /services, /services/integracion-ia, /services/software-a-medida | Metadata y schema correctos; catálogo sin `priceSpecification` |
| /precios | `priceCurrency` USD; sin breadcrumbs; enlaza a `/pricing.md` |
| /diagnostico | < 800 palabras; sin breadcrumbs; extracción contaminada por C1 |
| /desarrollo-de-software-lima | ~2,760 palabras; sin distritos |
| /portfolio, /portfolio/19, /portfolio/2 | Tarjetas a 3840 px; caso RestHUB delgado; extracción contaminada por C1 |
| /blog, /blog/adopcion-de-ia-en-empresas, /blog/5-senales… | Article + FAQPage; título del post de 100 caracteres |
| /search | Indexable, fuera del sitemap, título duplicado |
| /llms.txt, /llms-full.txt, /ai.txt, /pricing.md | 200, coherentes |
| /robots.txt, /sitemap.xml, /rss.xml | Correctos |

Artefactos: `findings/*.md`, `screenshots/`, `homepage-render.json`, `sitemap-discovery.json`, `audit-data.json`. Baseline de drift creado hoy (`claude-seo run drift_compare.py https://xn--rkos-4na.com` para la próxima comparación).
