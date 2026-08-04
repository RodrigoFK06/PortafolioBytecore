# Prompt para Claude Code — repo PortafolioBytecore (Árkos)

> Copia todo lo que hay debajo de la línea y pégalo en Claude Code, en la raíz del repo.

---

Trabajas en el repo de **Árkos** (`PortafolioBytecore`), un Next.js 15 / React 18 / TypeScript / Tailwind que sirve el sitio **https://xn--rkos-4na.com** (IDN de árkos.com). Es una agencia de desarrollo de software a medida. Fundador y tech lead: **Rodrigo Torres**.

Lee primero `docs/PLAN-SEO-LIMA.md` — es la auditoría completa y el roadmap. Este prompt ejecuta las partes de código.

## Contexto crítico que cambia las prioridades

Una auditoría con Search Console (4 ago 2026) encontró que **23 de las 24 páginas del sitio NO están indexadas**. Solo el home lo está. 17 aparecen como *"Descubierta: actualmente sin indexar"* con **último rastreo N/D** — Google nunca las ha rastreado. En varias, *"Página de referencia: no se ha detectado ninguna"*: Google no ve ni un enlace apuntando a ellas.

**Implicación:** no basta con crear páginas nuevas. Hay que darle a Google razones para gastar presupuesto de rastreo. Eso significa enlazado interno real, contenido con sustancia y eliminar todo lo que desperdicia rastreo.

**Segundo cambio importante:** Árkos operaba declarándose "agencia de Trujillo". **Rodrigo opera desde Lima** (Independencia). El sitio tiene **63 menciones de Trujillo** y ninguna orientación a Lima. Hay que reposicionar.

## Ya está hecho (no lo rehagas)

- 301 de `/projects` → `/portfolio` en `next.config.mjs`
- `notFound()` en `app/portfolio/[slug]/page.tsx` (antes soft 404 con HTTP 200)
- Las 24 fichas `/portfolio/{id}` añadidas a `app/sitemap.ts`
- Metadata + OpenGraph propios en `app/portfolio/layout.tsx`
- `meta keywords` eliminada de `app/layout.tsx`

## Tareas, en orden

### 1. Reposicionamiento geográfico: Trujillo → Lima

Objetivo: que **todas** las señales digan lo mismo. Hoy el schema dice Trujillo, el Facebook dice Lima y Clutch dice Trujillo. Google no puede resolver la entidad.

- `app/layout.tsx`, JSON-LD de la entidad principal:
  - `address` → `addressLocality: "Lima"`, `addressRegion: "Lima"`, `addressCountry: "PE"`
  - `geo` → coordenadas de Lima (aprox. `-12.0464`, `-77.0428`), no las de Trujillo
  - `areaServed` → añadir `{ "@type": "City", "name": "Lima" }` **antes** de Perú y Latinoamérica; mantener `{ "@type": "City", "name": "Trujillo" }`
  - **No inventes `streetAddress`.** La dirección exacta no va pública.
- Bloque `sr-only` con `id="llm-context"` en el `<body>`: cambia "en Trujillo, Perú" por "en Lima, Perú" y añade una frase de cobertura nacional.
- Footer (`components/footer.tsx`): "Trujillo, Perú" → "Lima, Perú".
- Hero (`components/sections/HeroSection.tsx`): el eyebrow `FIG. 01 — Agencia de software · Trujillo, Perú` → `Lima, Perú`.
- FAQ de `app/services/page.tsx` y `app/diagnostico/`: las preguntas del tipo *"¿atiende a empresas fuera de Trujillo?"* → reformular a Lima y cobertura nacional.
- `public/llms.txt` y `public/llms-full.txt`: "Ubicación: Trujillo, Perú" → Lima.

Al terminar: `grep -ri "trujillo" app components public data content` no debe devolver nada salvo menciones legítimas de **clientes** o **casos** ubicados en Trujillo. Repórtalas antes de tocarlas.

### 2. H1 del home

Dos problemas en `components/sections/HeroSection.tsx`:

- Se sirve con `style="visibility:hidden"` esperando que una animación JS lo revele. Si el JS falla, el único H1 del home queda oculto. **Cámbialo a `opacity`/`transform`**, que animan igual sin ocultar el elemento para los parsers.
- Dice `Mejoramos tus procesos` — cero keywords, cero geografía. Propón **3 alternativas** que mantengan la fuerza de marca pero incluyan la categoría (ej. *"Mejoramos tus procesos con software a medida"*). **No lo cambies sin que Rodrigo elija.** Preséntaselas y espera.

### 3. `/services`: de 131 palabras a un hub real

Hoy `app/services/page.tsx` tiene ~757 palabras de las cuales solo **131 son contenido de servicio** — cada servicio se describe con una frase. Y los seis botones "Saber más" son `<button>` **sin `href`**: no enlazan a ninguna parte y no existen las subpáginas.

- Amplía el hub a 800+ palabras de contenido real.
- Crea las 6 subpáginas, 600–900 palabras cada una:
  - `/services/software-a-medida`
  - `/services/desarrollo-web`
  - `/services/apps-moviles`
  - `/services/diseno-ux-ui`
  - `/services/integracion-ia`
  - `/services/ecommerce`
- Convierte los 6 `<button>` en `<Link href>` reales a esas rutas.
- Cada subpágina: metadata propia (title, description, canonical, OpenGraph), schema `Service` con `areaServed: City Lima` + `Country Perú`, y enlace de vuelta al hub y a `/precios`.
- Añádelas a `app/sitemap.ts`.

Contenido: sácalo de lo que ya existe en el repo (`data/projects.ts`, `content/blog/`, `/precios`). **No inventes cifras, clientes ni métricas.** Si necesitas un dato que no está, déjalo marcado como `TODO(rodrigo)`.

### 4. La página de Lima — la pieza principal

Crea `/desarrollo-de-software-lima`. Sigue el blueprint de `docs/PLAN-SEO-LIMA.md` §6. Resumen:

```
Title: Desarrollo de Software a Medida en Lima | Empresa de Software — Árkos
H1:    Desarrollo de software a medida en Lima
Largo: 2.000–2.500 palabras reales
```

Secciones (H2), en este orden:

1. Hero — 3 cifras de confianza (pídeselas a Rodrigo, no las inventes), clientes limeños visibles, CTA doble a `/diagnostico` y WhatsApp con mensaje precargado
2. Qué construimos para empresas de Lima — 6 bloques con `<Link>` real a `/services/{slug}`
3. **Casos reales con empresas de Lima** — usa **Solutec DHA** (2.500 clientes en Lima, +40% consultas, testimonio de Dharcy Villafuerte) y **Casaroma Hostels**. Los datos están en `data/projects.ts` y en los testimonios del home
4. Cuánto cuesta un software a medida en Lima — rangos en S/, enlace a `/precios`
5. Cumplimiento peruano — SUNAT, OSE/PSE, PLE, Ley 29733, Yape/Plin/Niubiz/Culqi. Enlace a `/cumplimiento-sunat`
6. Sectores que atendemos en Lima — cada uno anclado a un proyecto real del portafolio
7. Cómo trabajamos — proceso en 5 pasos anclado en `/diagnostico`
8. FAQ **visible** de 8–10 preguntas + schema `FAQPage`

Schema de la página: `@graph` con `Service` (`areaServed: City Lima` + `AdministrativeArea Callao`), `FAQPage`, `BreadcrumbList` con URLs **absolutas**, y `WebPage` con `author` apuntando por `@id` a `#rodrigo-torres`.

**Reglas duras:**
- El FAQ del schema debe coincidir **palabra por palabra** con el FAQ visible. Marcar `FAQPage` sin preguntas visibles incumple las guidelines de Google.
- **No pongas `PostalAddress` de Lima.** `areaServed: City Lima` es la señal correcta.
- Incluye la pregunta *"¿Trabajan con proyectos de tesis o académicos?" → "No."* Es filtro de leads: la SERP de esta keyword está contaminada de tráfico estudiantil.

### 5. Enlazado interno hacia la página de Lima

Google reporta *"página de referencia: no se ha detectado ninguna"* en varias URLs. El enlazado interno es lo que arregla eso. Añade enlaces contextuales desde:

- Home (bloque de servicios)
- `/services` (hub y las 6 subpáginas)
- `/precios`
- `/cumplimiento-sunat`
- El post pilar `content/blog/desarrollo-software-a-medida-en-peru.md` (2 enlaces contextuales)
- Las fichas de portafolio de Solutec DHA y Casaroma Hostels
- Footer: bloque "Cobertura: Lima · Trujillo · Todo el Perú"

Y añade la página al sitemap con prioridad **0.9**.

### 6. Limpieza pendiente

- `app/blog/layout.tsx`: meta description de 52 caracteres, sin keywords y sin OpenGraph propio. Reescríbela.
- Saltos de jerarquía **H1 → H3** (sin H2 intermedio) en `/services`, `/portfolio`, `/terminosycondiciones`, `/politicadeprivacidad`.
- Canonical del home: se declara sin barra final pero el sitemap la lleva. Unifica.
- `hreflang`: hoy `es-PE` y `x-default` apuntan ambos al home en todas las páginas. Debe apuntar a la URL propia de cada página.
- La carpeta `app/projects/` ya no se usa (redirige). Bórrala y verifica que nada la importe.

### 7. Automatizar el ping de IndexNow

La key ya existe en `public/4f43091e445d8f1cf0e123e3bd025184.txt` pero **nunca se notifica a los buscadores**. Crea `scripts/indexnow.mjs` que lea las URLs del sitemap y las envíe por POST a `https://api.indexnow.org/indexnow` con el cuerpo JSON:

```json
{ "host": "xn--rkos-4na.com",
  "key": "4f43091e445d8f1cf0e123e3bd025184",
  "keyLocation": "https://xn--rkos-4na.com/4f43091e445d8f1cf0e123e3bd025184.txt",
  "urlList": ["..."] }
```

Añádelo como script de npm (`"indexnow": "node scripts/indexnow.mjs"`) para ejecutarlo tras cada despliegue. Ojo con la expectativa: **IndexNow alimenta Bing, Yandex y Seznam — Google no participa.** El valor real es que Bing alimenta a ChatGPT Search, donde Árkos ya tiene ventaja (`llms.txt`, robots abierto a los bots de IA) y donde su competidor más fuerte, Vex, es invisible por bloquear crawlers con Cloudflare.

## Qué NO hacer

- **No inventes datos.** Ni clientes, ni métricas, ni años de experiencia, ni número de proyectos. Si falta un dato, `TODO(rodrigo)`. La auditoría detectó que dos competidores pierden credibilidad justo por declarar cifras contradictorias entre páginas.
- **No borres las menciones de Trujillo de casos o clientes reales** que sí ocurrieron allí. Solo las que posicionan a la agencia.
- **No cambies el H1 del home** sin que Rodrigo elija entre tus propuestas.
- **No toques el dominio ni el `baseUrl`.** El IDN es intencional.
- **No añadas `FAQPage` sin FAQ visible.**
- **No inventes una dirección física.**

## Verificación antes de terminar

```bash
pnpm type-check
pnpm build
```

Y comprueba sobre el build:

- Exactamente **un** `<h1>` por página
- El JSON-LD de `/desarrollo-de-software-lima` valida en Rich Results Test (`Service`, `FAQPage`, `BreadcrumbList`)
- Las preguntas del `FAQPage` coinciden literalmente con el DOM visible
- `curl -I .../portfolio/999` → **404**, no 200
- El sitemap incluye: la página de Lima, las 6 subpáginas de servicios, las 24 fichas de portafolio; y **no** incluye `/projects`
- `grep -ri "trujillo"` solo devuelve menciones de clientes/casos

Al final, escribe en `docs/CAMBIOS.md` un resumen de lo hecho, lo que quedó en `TODO(rodrigo)` y lo que necesita decisión suya.
