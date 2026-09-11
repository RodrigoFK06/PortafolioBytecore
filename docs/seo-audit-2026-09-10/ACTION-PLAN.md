# Plan de acción — árkos.com (auditoría SEO del 2026-09-10)

Cada ítem lleva: **Observación** (primer principio), **Depende de / desbloquea**, **Cómo sabremos que falló** (falsación) e **Indicador adelantado** (sin re-auditar).

## Fase 1 — Código, esta semana (una tarde de trabajo)

1. **`#llm-context` solo en el home** (C1). Mover el `div.sr-only` de `app/layout.tsx` a `app/page.tsx`.
   Observación: el extractor elige el bloque de prosa más denso; en páginas internas ese bloque es el contexto global, no el contenido. Desbloquea: citabilidad real de casos y diagnóstico. Falla si: `render_page.py /portfolio/19` sigue devolviendo "Árkos es una empresa…" (entonces la causa es otra sección global). Indicador: el `extracted_text` de `/portfolio/19` empieza por RestHUB.
2. **`www` → apex 308** (H1). Vercel → Settings → Domains → `www.árkos.com` como redirect al apex. Alternativa en `next.config.mjs` con condición `has: [{type: "host", value: "www.xn--rkos-4na.com"}]`.
   Falla si: `curl -I https://www.xn--rkos-4na.com/` no devuelve 308 + `Location` al apex. Indicador: GSC deja de mostrar URLs `www` como "duplicada, canónica elegida por el usuario".
3. **`noindex, follow` en `/search`** (M1) y quitar `changefreq`/`priority` del sitemap (opcional).
4. **`sizes` en tarjetas de portafolio** (H2): `project-card.tsx` con `sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"`.
   Falla si: el HTML del home sigue pidiendo `w=3840` en tarjetas. Indicador: peso transferido del home en móvil baja de forma visible en DevTools.
5. **Schema** (M3): `priceCurrency: "PEN"` con `penLabel` en `/precios`; `priceSpecification` en los `Offer` del catálogo de home y `/services` leyendo `data/pricing.ts`; `BreadcrumbList` en `/precios`, `/diagnostico`, `/portfolio`, `/necesitas-un-sistema`; `provider: { "@id": ".../#organization" }` en `/precios`; `areaServed` con Callao y Arequipa; `openingHoursSpecification`.
   Falla si: el validador de Schema.org marca errores o Search Console reporta "elementos no válidos".
6. **Longitudes** (M4): meta description de `/portfolio/19` a ≤160; `seoTitle` opcional en el frontmatter del blog y usarlo en `<title>`; título del post de IA: "Adopción de IA en empresas: cómo capacitar a tu equipo y medir el uso". Recortar `/diagnostico`, `/precios`, `/portfolio`.
7. **Texto del H1** (Low): espacio antes del `<br/>` en `HeroSection.tsx`; contador de `/portfolio` en su propio `<span>` con espacio.
8. **`lastmod` real para páginas clave** (M6): mapa `LAST_UPDATED` en `app/sitemap.ts` con fechas de edición real (hoy: 2026-09-10 para `/`, `/services/integracion-ia`, `/precios`, `/diagnostico`, `/services`), actualizado solo cuando cambie el contenido.
9. **Area de toque del enlace "Diagnóstico"** (M13) y **logo único** (Low).

## Fase 2 — Tareas externas de Rodrigo, semanas 2–3

1. **Google Business Profile** como negocio de área de servicio sin dirección pública (C2): categoría "Empresa de software", área Lima y Callao, teléfono, web apex, descripción con "Árkos, empresa de software a medida y adopción de IA en Lima, Perú", verificación por video (guía en `docs/GUIA-VERIFICACION-VIDEO-GBP.md`), 3 Posts iniciales, y su URL al `sameAs`.
   Falla si: a los 60 días de creado y con 3+ reseñas, "Árkos software Lima" no muestra la ficha. Indicador: impresiones de la ficha en el panel de GBP.
2. **Reseñas en Clutch** (C2): pedir a Guillermo, Dharcy y Freedy, que ya son públicos en el sitio; corregir la ciudad del perfil (Trujillo → Lima).
3. **LinkedIn Company Page** y añadirla al `sameAs` de Organization (H3, M15).
4. **GitHub** (H3): campo *website* del perfil con el apex; READMEs de PrecioVivo, precio-justo y FacturArkos con enlace al apex (no a `www`).
5. **API keys gratuitas** para el plugin: Google API key (PageSpeed + CrUX, sin cuota compartida) en `~/.config/claude-seo/google-api.json`; Bing Webmaster API key y Moz API (2,500 filas/mes) en `backlinks-api.json`. Sin esto, performance y backlinks seguirán a ciegas.
6. **Search Console**: solicitar indexación de `/`, `/services/integracion-ia`, `/blog/adopcion-de-ia-en-empresas`, `/precios`; revisar el informe de páginas duplicadas tras el fix de `www`.
7. **Decisión de diseño sobre el H1** (C3): elegir entre (a) H1 visible por defecto y animar solo con `.js`, (b) split por palabras en móvil, (c) aceptar el LCP. Falla si, elegida (a) o (b), PSI móvil sigue con LCP > 2.5 s.

## Fase 3 — Contenido y autoridad, mes 2 (del plan de clústeres)

Orden por oportunidad y por ausencia de competidores directos:

1. "Cuánto cuesta un sistema a medida en Perú: guía de precios 2026" → hub `/precios` (H4).
2. "Cómo elegir una empresa de desarrollo de software a medida en Lima: checklist" → hub `/desarrollo-de-software-lima` (H6).
3. "Automatización con n8n para empresas en Perú: casos y precios" → hub `/services/integracion-ia`.
4. "Sistema de facturación electrónica y SUNAT: qué exige la ley" → hub `/cumplimiento-sunat`.
5. "Gobierno de IA y ENIA 2026–2030: qué debe cumplir tu empresa" → hub `/blog/adopcion-de-ia-en-empresas` (timing con la Estrategia Nacional de IA).
6. Sección de distritos en `/desarrollo-de-software-lima` (H5); testimonios en `/precios`, `/diagnostico` y `/services/integracion-ia` (M7); H2 en forma de pregunta en el home (M5); ampliar `/portfolio/19` y `/diagnostico` (M10); periodo de medición en el chip de "78 %" (M8); frase de sede en `llms-full.txt` y `ai.txt` (M9).
   Falla si: a los 90 días ningún spoke tiene impresiones en GSC para su keyword objetivo. Indicador: impresiones y posición media por spoke en GSC, semana a semana.

## Fase 4 — Monitoreo continuo

- `claude-seo run drift_compare.py https://xn--rkos-4na.com` mensual contra el baseline creado hoy.
- PSI móvil y desktop del home con API key propia; objetivo LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
- Chequeo manual de visibilidad en IA: 10 consultas × 3 plataformas × 3–5 corridas; registrar tasa de cita con n.
- Re-auditoría completa a los 30 días (`/seo audit`) y comparación GEO (`/geo compare`).

## Dependencias

- C1 antes que cualquier medición de citabilidad: sin ese fix los números de las páginas internas no significan nada.
- El fix de `www` antes de pedir enlaces externos: cada enlace nuevo debe apuntar al host que va a quedar.
- GBP y LinkedIn Company Page antes de actualizar `sameAs`: no declarar perfiles que no existen.
- Las API keys antes de la re-auditoría de 30 días: si no, performance y backlinks repiten "no medido".
