# Cambios — reposicionamiento a Lima, hub de servicios y página de dinero

**Fecha:** 4 de agosto de 2026
**Rama:** `chore/design-sync`
**Origen:** `docs/PROMPT-CLAUDE-CODE.md` (las 7 tareas de código del `docs/PLAN-SEO-LIMA.md`)

Verificado sobre el build de producción: `pnpm type-check` limpio, `pnpm build` en verde,
57 páginas estáticas generadas.

---

## 1. Reposicionamiento geográfico: Trujillo → Lima

Todas las señales de identidad decían Trujillo mientras Rodrigo opera desde Lima. Google
recibía tres respuestas distintas (schema: Trujillo, Clutch: Trujillo, Facebook: Lima) y no
podía resolver la entidad.

| Archivo | Cambio |
|---|---|
| `app/layout.tsx` | JSON-LD: `addressLocality: "Lima"`, `addressRegion: "Lima"`, `geo` con coordenadas de Lima. `areaServed` pasa a `[City Lima, City Trujillo, Country Peru, Place Latinoamérica]` — Lima primero. Sin `streetAddress`. |
| `app/layout.tsx` | Bloque `sr-only#llm-context`: "en Lima, Perú" + frase de cobertura nacional (Lima, Callao, Trujillo, Arequipa, provincias). |
| `lib/constants.ts` | `contact.address` → `"Lima, Perú"` (lo consume el footer). |
| `components/sections/HeroSection.tsx` | Eyebrow `FIG. 01 — Agencia de software · Lima, Perú`. |
| `components/sections/AboutSection.tsx` | `meta itemProp="description"` → Lima. |
| `app/services/page.tsx` | FAQ: "¿…atiende a empresas fuera de Lima?" con cobertura nacional. |
| `app/diagnostico/page.tsx` | FAQ: "¿Funciona si estoy fuera de Lima o de Perú?". |
| `public/llms.txt`, `public/llms-full.txt`, `public/ai.txt` | Ubicación Lima + línea de cobertura explícita. |
| `lib/chatbot.ts` | Prompt del bot: ubicación Lima con cobertura. |
| `content/blog/desarrollo-software-a-medida-en-peru.md` | Las 3 menciones de "sede en Trujillo" (posicionamiento de agencia) pasan a Lima. |
| `scripts/og/og-image.html` | Eyebrow de la plantilla OG → Lima. |

### Menciones de Trujillo que se conservaron (y por qué)

Se revisaron una por una. Estas describen **casos o clientes reales ubicados allí**, no
posicionan a la agencia, y borrarlas sería falsear el historial:

- `data/projects.ts:153` — RestHUB: *"El primer piloto fue un restaurante de Trujillo"*.
- `data/projects.ts:321` — II Simposio Veterinario Internacional 2026, evento en Trujillo.
- `content/blog/sistema-registro-simposio-veterinario.md` (3 menciones) — el mismo caso.
- `content/blog/desarrollo-software-a-medida-en-peru.md:59` — el Simposio en la lista de proyectos.
- `public/llms-full.txt:150` — características del proyecto del Simposio.
- `app/layout.tsx` — `areaServed: City Trujillo` y la frase de cobertura: son **deliberadas**.
  El plan advierte de no borrar Trujillo: destruye la única señal local existente sin ganar la de Lima.

### No tocado, pendiente de tu decisión

- `public/*.html` (BombonCotizacion, CotizacionSIGIV-Helen, CotizacionFIMUNI,
  NancyCotizacion_HVAC): cotizaciones ya entregadas a clientes, con "Trujillo, Perú" en el pie.
  Son documentos históricos; reescribirlos altera algo que el cliente ya recibió.
  **TODO(rodrigo):** decidir si las plantillas futuras usan Lima (el generador vive en el mismo HTML).
- `aeo-kit/README.md`, `GEO-AUDIT-REPORT.md`, `docs/GEO-AUDIT-2026-07-19.md`: documentación
  interna y auditorías fechadas. Fuera del alcance del grep de verificación.
- **Externos, y son lo que de verdad cierra la incoherencia:** Clutch todavía dice Trujillo,
  y el Perfil de Negocio de Google necesita quedar en Lima. Sin eso, el schema nuevo compite
  contra dos fuentes que dicen lo contrario.

---

## 2. H1 del home

**Arreglado (código):** `components/motion/kinetic-text.tsx` servía el elemento con
`style="visibility:hidden"` y esperaba que GSAP lo revelara. El H1 del home es el único de la
página: un fallo de JS lo dejaba invisible.

- Ahora se sirve con `opacity: 0` — el elemento existe y ocupa su caja para los parsers.
- Se añadió la clase `.kinetic-text` con una animación de seguridad en `app/globals.css`
  (`kinetic-failsafe`, delay 1.6 s, `forwards`): las declaraciones de `@keyframes` ganan sobre
  el estilo inline, así que el texto se revela **aunque GSAP nunca corra**. A los 1.6 s la
  entrada real ya terminó, de modo que no pelean.
- Verificado en el HTML servido: `<h1 class="kinetic-text …" style="opacity:0">`, sin `visibility`.

**Texto — decisión final: el H1 se queda como estaba, `Mejoramos tus procesos`.**

Se probó la opción A (añadir `con software a medida` como segunda línea dentro del `<h1>`) y se
**revirtió**: rompía la escala tipográfica del hero. La categoría y la geografía viven ahora en el
eyebrow, que ya existía en el diseño y ya era visible — `FIG. 01 — Software a medida · Lima, Perú`.

Se descartó explícitamente meterlas con `sr-only`: texto oculto con keywords dentro de un H1 es
justo lo que Google penaliza, y sería incoherente hacerlo en el mismo trabajo en el que dejamos
de servir ese H1 con `visibility:hidden`. La categoría, además, ya aparece visible en el párrafo
inmediatamente debajo del H1 ("…en software a medida: sistemas web, ERPs y apps"), en el `<title>`
y en la meta description.

Las tres opciones que había sobre la mesa y por qué gana A:

| # | Propuesta | Veredicto |
|---|---|---|
| **A** | Mejoramos tus procesos con software a medida | Probada y revertida: en el hero, a `lg:text-[8.5rem]`, la segunda línea rompe la composición. La idea era buena en el papel y mala en pantalla. |
| **B** | Software a medida que mejora tus procesos | Pone la keyword al inicio, que pesa más, pero degrada el eslogan a subordinada y obliga a revisar cuatro soportes más. El beneficio marginal no paga ese coste. |
| **C** | Mejoramos tus procesos. Software a medida en Lima. | Descartada: `/desarrollo-de-software-lima` ya lleva ese H1 casi exacto. Dos páginas peleando por la misma consulta es canibalización, y la que perdería sería la que sí tiene 2,355 palabras de contenido local. |

Verificado en el HTML servido: un solo `<h1>`, `aria-label="Mejoramos tus procesos"`,
`style="opacity:0"` (ya no `visibility:hidden`) y el eyebrow con la categoría y la ciudad.

---

## 3. `/services`: de 131 palabras a un hub real

- **`data/services.ts` (nuevo):** fuente única de los seis servicios — H1, metadatos, secciones,
  entregables, stack, casos reales y FAQ propias.
- **`app/services/page.tsx` reescrito:** **1,613 palabras** en el `<main>` (antes 757, de las
  cuales solo 131 eran contenido de servicio). Secciones nuevas: cómo saber cuál necesitas,
  cumplimiento peruano, proceso en 5 pasos, precios y cobertura.
- **Los seis `<button>` sin `href` son ahora `<Link>` reales.** Ese era el bug #7 de la auditoría.
- **`app/services/[slug]/page.tsx` (nuevo):** las seis subpáginas, con `dynamicParams = false`
  (cualquier otro slug devuelve 404 real, verificado).

| Subpágina | Palabras |
|---|---|
| `/services/software-a-medida` | 1,177 |
| `/services/integracion-ia` | 974 |
| `/services/desarrollo-web` | 961 |
| `/services/ecommerce` | 924 |
| `/services/apps-moviles` | 908 |
| `/services/diseno-ux-ui` | 903 |

Cada una lleva metadata propia (title, description, canonical, OpenGraph, Twitter), `@graph` con
`Service` (`areaServed: City Lima` + `Country Perú`), `FAQPage`, `BreadcrumbList` y `WebPage`,
breadcrumb visible, y enlaces de vuelta al hub, a `/precios`, a `/diagnostico` y a las fichas de
portafolio de los proyectos que respaldan el servicio.

Todo el contenido sale de lo que ya existía en el repo. **Cero cifras nuevas.**

---

## 4. `/desarrollo-de-software-lima` — la pieza principal

**2,356 palabras** (objetivo: 2,000–2,500). Ocho secciones según el blueprint del §6:

1. Hero con 3 cifras, clientes limeños enlazados y CTA doble (`/diagnostico` + WhatsApp con
   mensaje precargado).
2. Qué construimos — 6 bloques con `<Link>` real a `/services/{slug}`.
3. Casos reales con empresas de Lima — Solutec DHA (2,500 clientes, +40% de consultas,
   testimonio firmado de Dharcy Villafuerte), Casaroma Hostels y el Dr. Ing. Freedy Sotelo (UNTELS).
4. Cuánto cuesta — tabla de rangos en S/ idéntica a `/precios`, con enlace.
5. Cumplimiento peruano — CPE, OSE/PSE, PLE/SIRE, RENIEC, Ley 29733, pagos locales.
6. Sectores que atendemos en Lima — 6, cada uno anclado a un proyecto real del portafolio.
7. Cómo trabajamos — proceso en 5 pasos anclado en `/diagnostico`.
8. FAQ **visible** de 10 preguntas, incluida *"¿Trabajan con proyectos de tesis o
   académicos?" → "No."* (filtro de leads).

Schema: `@graph` con `Service` (`areaServed: City Lima` + `AdministrativeArea Callao`,
`hasOfferCatalog` generado desde `data/services.ts`), `FAQPage`, `BreadcrumbList` con URLs
absolutas y `WebPage` con `author` apuntando por `@id` a `#rodrigo-torres`.

**Reglas duras, verificadas sobre el build:**
- Sin `PostalAddress` de Lima. `areaServed: City Lima` es la única señal geográfica.
- El `FAQPage` se genera del **mismo array** que el FAQ visible: coinciden palabra por palabra
  por construcción. Comprobado con un script sobre el HTML: 0 preguntas del schema ausentes del DOM.

### Las tres cifras del hero — decisión tomada

El blueprint pedía *proyectos entregados · años · % de clientes que repiten*. El tercero no
existe en ningún sitio del repo, y ese dato no se inventa. El criterio que apliqué en su lugar:
**solo números que el visitante pueda comprobar él mismo y que ya estén declarados en otra parte
del sitio**, de forma que no puedan contradecirse entre páginas.

| Cifra | Etiqueta | De dónde sale |
|---|---|---|
| **+50** | Proyectos desplegados | Ya lo declara el hero del home. |
| **24** | Casos publicados con demo en vivo | Literal: las 24 fichas de `/portfolio`, todas con enlace en vivo. |
| **2020** | Operando desde | `foundingDate` del JSON-LD de la entidad. |

Que "24 publicados" sea menor que "+50 desplegados" es correcto y además juega a favor: el resto
está bajo NDA, y decirlo así es más creíble que redondear hacia arriba. Es exactamente lo
contrario de lo que hacen SB Perú (18 años en una plantilla, 20 en otra) y Monstruo Creativo
(7 en una página, 8 en otra).

**Lo único que queda para ti:** si en algún momento mides la retención de clientes, añádela como
cuarta cifra. El `TODO(rodrigo)` está sobre la constante `TRUST`. No bloquea nada.

---

## 5. Enlazado interno

Google reportaba *"página de referencia: no se ha detectado ninguna"* en varias URLs. Enlaces
contextuales nuevos hacia `/desarrollo-de-software-lima`:

- **Home** — párrafo en el bloque de servicios (`ServicesSection.tsx`), con enlace al hub y a Lima.
- **Home** — cada una de las 4 tarjetas de servicio gana un `Ver el servicio completo →` a su
  subpágina real (antes solo abrían un modal).
- **`/services`** — sección "Dónde atendemos".
- **Las 6 subpáginas** — sección "¿Dónde atendemos?".
- **`/precios`** — sección nueva "Precios para proyectos en Lima".
- **`/cumplimiento-sunat`** — cierre del bloque de contexto.
- **Post pilar** `desarrollo-software-a-medida-en-peru.md` — 2 enlaces contextuales.
- **Fichas de portafolio** — bloque condicional en `/portfolio/[slug]` que aparece cuando
  `project.location` contiene "Lima": hoy Solutec DHA y Casaroma Hostels (se le añadió
  `location: "Lima, Perú"`, que su propia descripción ya declaraba).
- **Footer** — bloque "Cobertura: **Lima** · Trujillo · Todo el Perú".
- **Footer** — los 4 enlaces de servicios apuntaban los 4 a `/services`; ahora van a su subpágina.

También: `components/sections/ProjectsClient.tsx` enlazaba a `/projects`, que redirige 301.
El home era la única página que Google rastreaba y gastaba ese salto en cada visita. Ahora
apunta directo a `/portfolio`.

**Sitemap:** `/desarrollo-de-software-lima` con prioridad **0.9**, las 6 subpáginas con 0.7, y
`/services` sube de 0.6 a 0.8. Total: 48 URLs (antes 18), sin `/projects`.

---

## 6. Limpieza técnica

- **`app/blog/layout.tsx`** — la description tenía 52 caracteres y `/blog` heredaba el
  `og:title` genérico del home. Reescrita, con OpenGraph y Twitter propios.
- **Saltos H1 → H3:**
  - `/services` — resuelto en la reescritura (H2 antes del grid de tarjetas).
  - `/portfolio` — H2 nuevo antes del grid, con el contador de proyectos.
  - `/terminosycondiciones` y `/politicadeprivacidad` — las 8 y 9 secciones numeradas pasan de
    `<h3>` a `<h2>` (mismas clases: sin cambio visual).
- **Canonical del home** — Next emite `https://xn--rkos-4na.com` sin barra final; el sitemap la
  declaraba **con** barra. Se unificó a la forma sin barra en el sitemap y en los breadcrumbs
  JSON-LD, vía `absUrl()`.
- **`hreflang`** — era el bug más silencioso. Next hace *shallow merge* de la metadata: cualquier
  página que declarara `alternates: { canonical }` **perdía** el `languages` del layout raíz, y las
  que no lo declaraban heredaban un `es-PE`/`x-default` apuntando al home. Nuevo helper
  `lib/seo.ts` → `alternates(path)`, aplicado en las 13 rutas. Verificado en el build: cada página
  apunta a su propia URL.
- **`app/projects/`** — borrada (`git rm -r`). Redirigía 301 desde hacía tiempo; el redirect en
  `next.config.mjs` se mantiene. Verificado que nada la importa.

---

## 7. IndexNow

**`scripts/indexnow.mjs` (nuevo)** + `pnpm indexnow` en `package.json`.

Lee las URLs del sitemap de producción y las envía por POST a `https://api.indexnow.org/indexnow`
con `host`, `key`, `keyLocation` y `urlList`. Extras:

- `--dry-run` para ver qué enviaría sin enviarlo (probado contra el sitemap en vivo).
- `--url=…` (repetible) para notificar URLs sueltas.
- Valida que todas las URLs sean del host correcto — IndexNow rechaza el lote entero si una no lo es.
- Exit code 1 si el endpoint falla, para que rompa en CI.

**Expectativa correcta, y está escrita en la cabecera del script:** IndexNow alimenta **Bing,
Yandex y Seznam. Google no participa.** El valor está en que Bing es la fuente de ChatGPT Search,
donde Árkos ya va por delante (llms.txt, robots abierto a GPTBot/ClaudeBot/PerplexityBot) y donde
Vex es invisible por devolver 403 desde Cloudflare. Para Google sigue haciendo falta Search
Console → Inspeccionar URL → Solicitar indexación.

Ejecútalo **después** de desplegar: hoy lee el sitemap en vivo, que todavía tiene 18 URLs.

---

## Verificación ejecutada

| Comprobación | Resultado |
|---|---|
| `pnpm type-check` | ✅ limpio |
| `pnpm build` | ✅ 57 páginas estáticas |
| Exactamente un `<h1>` por página | ✅ 48/48 páginas HTML |
| FAQ del schema = FAQ visible, palabra por palabra | ✅ 0 discrepancias en las 8 páginas con `FAQPage` nuevo |
| `Service` + `FAQPage` + `BreadcrumbList` en la página de Lima | ✅ presentes en el `@graph` |
| `/portfolio/999` | ✅ **404** |
| `/services/no-existe` | ✅ **404** |
| `/projects` | ✅ 308 → `/portfolio` |
| Sitemap: Lima + 6 subpáginas + 24 fichas, sin `/projects` | ✅ 48 URLs |
| `hreflang` por URL propia | ✅ verificado en el HTML del build |
| `grep -ri "trujillo" app components public data content` | ✅ solo casos/clientes reales (listados arriba) |

**No verificado localmente:** el Rich Results Test de Google sobre
`/desarrollo-de-software-lima` — requiere que la URL esté publicada. Pásalo después del despliegue.

---

## Decisiones tomadas (ya implementadas, no requieren acción)

| Punto | Decisión | Criterio |
|---|---|---|
| H1 del home | **Sin cambios**: `Mejoramos tus procesos`. La categoría va al eyebrow: `FIG. 01 — Software a medida · Lima, Perú` | La opción A se probó y rompía el hero. El eyebrow ya era visible y estaba diseñado para ese texto. No se usa `sr-only`: keywords ocultas son penalizables. |
| Cifras del hero de Lima | **+50 proyectos · 24 casos publicados · desde 2020** | Los tres son verificables por el visitante y ya están declarados en otra parte del sitio. El % de retención no existe en el repo y no se inventa. |
| `apps-moviles` → mantenimiento | **"Plan de mantenimiento opcional, definido al cierre del proyecto"** | No inventa una política nueva: es literalmente lo que ya dicen el paso 05 del proceso en `/services` y la FAQ de mantenimiento de la página de Lima. |
| `diseno-ux-ui` → identidad de marca | **No entra en el alcance**, y se dice de frente: se diseña sobre la identidad existente; si no la hay, se resuelve antes de dibujar pantallas | El portafolio no tiene un solo proyecto de identidad de marca. Prometerlo sería vender algo que no hay evidencia de que se haga. |
| Cotizaciones en `public/*.html` | **No se tocan** | Son documentos ya entregados a clientes, no están indexados y no aportan nada al SEO. Reescribir un PDF que alguien ya recibió es peor que dejarlo. La próxima cotización que generes sí debería decir Lima. |

## Lo único que sigue en tu cancha

Nada de esto es código y por eso no lo pude cerrar yo:

1. **Clutch dice Trujillo.** El schema del sitio ya dice Lima. Mientras las dos fuentes se
   contradigan, Google sigue sin poder resolver la entidad y buena parte del §1 rinde a medias.
   Es el arreglo más barato que queda.
2. **El Perfil de Negocio de Google**, con las áreas de servicio en Lima (ver
   `docs/GUIA-VERIFICACION-VIDEO-GBP.md`).
3. **Los enlaces externos.** El cuello de botella medido es autoridad, no contenido: 12/100. Todo
   lo de arriba sube el techo, pero es un enlace de `freedysotelov.com` lo que le dice a Google
   que vuelva a rastrear el sitio.
4. **Retención de clientes**, si algún día la mides → cuarta cifra del hero de Lima.
