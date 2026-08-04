# Plan para ser #1 orgánico en "desarrollo de software Lima"

**Cliente:** Árkos (árkos.com — `xn--rkos-4na.com`)
**Fecha:** 4 de agosto de 2026
**Objetivo:** posición 1 orgánica en Google Perú para consultas comerciales de desarrollo de software en Lima
**Decisión de marca tomada:** reposicionar Árkos como agencia **nacional** (no "agencia de Trujillo")

---

# ⚠️ ADENDA — 4 de agosto, tarde. Este plan tenía la premisa equivocada.

Después de escribir lo que sigue, entramos a Search Console y encontramos dos cosas que **reordenan todo el documento**. Léelas antes de ejecutar nada.

## A. El sitio no está indexado

**23 de 24 páginas SIN INDEXAR. Una sola indexada** (el home).

| Motivo que reporta Search Console | Páginas |
|---|---|
| **Descubierta: actualmente sin indexar** | **17** |
| Página con redirección | 2 |
| Rastreada: actualmente sin indexar | 2 |
| No se ha encontrado (404) | 1 |
| Página alternativa con canónica adecuada | 1 |

En las 17: **"Último rastreo: N/D"**. Google nunca las ha rastreado. Y en `/cumplimiento-sunat`, `/precios` y `/services`: **"Página de referencia: no se ha detectado ninguna"** — Google no ve ni un enlace apuntando a ellas.

**Qué invalida esto del plan de abajo:**

- Todo el documento asume que el sitio está indexado y no rankea. **Falso.** No está indexado.
- `/precios` y `/cumplimiento-sunat`, citadas una y otra vez como "las armas que la competencia no tiene": **Google nunca las ha abierto.**
- Construir `/desarrollo-de-software-lima` sin resolver esto la deja en el mismo cubo: "Descubierta: actualmente sin indexar".

**Qué NO es:** un error técnico. El sitio es rastreable, tiene robots correcto y SSR. *"Descubierta: actualmente sin indexar"* con rastreo N/D es Google decidiendo que el sitio **no vale el presupuesto de rastreo**. Es el 12/100 de autoridad, medido por Google.

**El roadmap se invierte:**

| | Antes (equivocado) | Ahora |
|---|---|---|
| 1º | Página de Lima | **Indexación** |
| 2º | Contenido y clústeres | **Enlaces externos** |
| 3º | Enlaces (Fase 4, meses 1–12) | Página de Lima |

Los enlaces dejan de ser "la fase 4 a doce meses" y pasan a ser **lo urgente**: 3–4 enlaces reales no solo suben autoridad, le dicen a Google que vaya a rastrear el sitio. Es la palanca que destraba todo lo demás. Empieza por `freedysotelov.com` (ya te dio testimonio), Clutch y un directorio.

**Hecho el 4 de agosto:** solicitud manual de indexación de `/cumplimiento-sunat`, `/precios`, `/blog/desarrollo-software-a-medida-en-peru`, `/services`, `/diagnostico` y `/costo-del-excel`. Quedan pendientes el resto de posts, `/blog`, `/portfolio` y `/necesitas-un-sistema` — misma ruta, hay cuota diaria.

## B. Árkos no es de Trujillo. Es de Lima.

Rodrigo opera desde **Independencia, Lima**. El domicilio de SUNARP será Casa Grande, pero eso es el registro legal, no dónde se trabaja.

**Esto elimina la mayor limitación del plan de abajo.** El §4 dice que el pack local de Lima está fuera de alcance por no tener presencia allí. **Sí la hay.** Con el Perfil de Negocio verificado en Lima, el pack local entra en juego — y es lo que aparece por encima de los resultados orgánicos, donde hoy Vex domina con 4.9 y 110 reseñas.

**Estado del Perfil de Negocio (verificado el 4 de agosto):** existe, Rodrigo lo administra, categoría "Compañía de software", **0% verificado**. Una verificación por video ya fue rechazada. Las áreas de servicio estaban en **Chile, Perú, México, Colombia y Venezuela** — cinco países, causa muy probable del rechazo. Ver `docs/GUIA-VERIFICACION-VIDEO-GBP.md`.

**Y hay un problema de entidad que urge:** el schema del sitio dice Trujillo, Clutch dice Trujillo, Facebook dice Lima. Google recibe tres respuestas a la misma pregunta. Hoy su propia IA resume: *"Arkos se refiere principalmente a una agencia de desarrollo de software en Perú, a una comuna en Rumania o a un sistema operativo de consolas."* Ni siquiera tiene claro qué eres.

> **Cómo leer el resto del documento:** el diagnóstico de la competencia (§3), los huecos de mercado (§6) y el blueprint de la página de Lima (§6) siguen siendo válidos y son buenos. Lo que cambia es **el orden** y la premisa de que el pack local es inalcanzable.

---

## 0. Resumen ejecutivo — el veredicto en 6 puntos

1. **Hoy estás a distancia infinita, no a distancia larga.** No existe ninguna página en árkos.com que compita por esa consulta. Google no puede rankear una página que no se ha escrito. Verificado: `/lima` → 404, `/desarrollo-de-software-lima` → 404, cero H1/title/description con "Lima" en las 23 páginas del sitio.

2. **Pero la competencia es objetivamente débil.** Rastreé las 6 empresas que ocupan esa SERP. El que rankea con slug exact-match (Tinq) tiene **166 palabras** de contenido, **cero** prueba social y un sitemap de **1 URL**. El que tiene más autoridad (Glajumedia) esconde sus 500+ proyectos y su Clutch 4.7 fuera de la página que rankea. Uno tiene el H1 diciendo "Estados Unidos" en una página titulada "en Perú". Otro **no tiene ninguna etiqueta `<h1>`**.

3. **Nadie es dueño de "Lima".** De 6 competidores, **ninguno** tiene `LocalBusiness` schema con dirección de Lima, **ninguno** publica precios, **ninguno** tiene mapa embebido en su página de dinero, y **ninguno** habla de SUNAT, facturación electrónica, Ley 29733 ni Yape/Plin/Niubiz/Culqi. La única URL con "lima" en el slug que rankea es un listicle de **una agencia colombiana sin oficina en Perú**.

4. **Ya tienes tres armas que ellos no tienen** y están desaprovechadas: `/precios` con rangos reales en soles, `/cumplimiento-sunat` (el ángulo peruano que nadie replica), y **dos clientes limeños reales con testimonio y métrica** — Solutec DHA (2,500 clientes en Lima, +40% de consultas) y Casaroma Hostels. Están enterrados en tarjetas de portafolio.

5. **Ojo con la keyword que elegiste.** "desarrollo de software lima" tiene la intención **contaminada**: en la SERP que me pasaste hay Certus, Cibertec, New Horizons, LinkedIn Empleos e Indeed, y **todas** las búsquedas relacionadas son educativas ("SENATI precio", "carrera", "IDAT", "Tecsup", "dónde estudiar"). Google te está diciendo que la mitad de esa consulta es gente que quiere *estudiar* o *trabajar*, no comprar. Ser #1 ahí trae volumen, no clientes.

6. **El cuello de botella real es autoridad, no contenido.** Tu propia auditoría GEO se puso **12/100** en Brand Authority. El contenido lo sabes producir. Los enlaces no los tienes. Ese es el factor que decide si llegas al #3 o al #1.

**Plazo realista si se ejecuta bien:** top 20 en 4–8 semanas · top 10 en 3–4 meses · top 3 en 6–9 meses · **#1 en 9–12 meses y condicionado a construir backlinks**.

---

## 1. La verdad incómoda sobre esta keyword

Antes de invertir 9 meses, mira lo que la propia SERP revela.

**Resultados de intención comercial** (los que quieres): Glajumedia, Monstruo Creativo, TIPSE, Tinq, Vex, SB Perú, + 4 anuncios.

**Resultados de intención educativa/laboral** (los que no te sirven): Certus ("Carrera de Diseño y Desarrollo de Software"), Cibertec, New Horizons Perú (cursos), LinkedIn ("214 empleos"), Indeed ("Empleos de Prácticas").

**Búsquedas relacionadas — las 8 que muestra Google:**
`Desarrollo de Software SENATI precio` · `SENATI desarrollo de software` · `Desarrollo de software carrera` · `IDAT desarrollo de software` · `Desarrollo de software curso` · `Tecsup Desarrollo de Software` · `Donde estudiar desarrollo de software en Perú` · `CIBERTEC Desarrollo de software`

**8 de 8 son educativas.** Eso no es ruido: es Google declarando cuál es la intención dominante del string exacto.

### Qué significa para tu estrategia

No abandones la keyword — es el término cabeza y da autoridad temática. Pero **el #1 que te hace ganar dinero es otro**. Ordena así:

| Prioridad | Keyword | Intención | Por qué |
|---|---|---|---|
| **1** | `empresa de desarrollo de software lima` | Comercial pura | Quien escribe "empresa" está contratando, no estudiando |
| **1** | `desarrollo de software a medida lima` | Comercial pura | "a medida" filtra estudiantes por completo |
| **2** | `desarrollo de software lima` | Mixta | El término cabeza. Se gana de rebote con los anteriores |
| **2** | `software a medida lima` / `fábrica de software perú` | Comercial | Menos volumen, casi cero contaminación |
| **3** | `cuánto cuesta desarrollar un software en perú` | Transaccional alta | **Ya tienes `/precios`.** Nadie más publica cifras |
| **3** | `sistema de facturación electrónica sunat` | Comercial + moat | **Ya tienes `/cumplimiento-sunat`.** Cero competencia |

Una sola página bien construida puede rankear para las seis. El truco es que el `<h1>` lleve el modificador comercial y el `<title>` cubra ambos.

**Y una nota de conversión:** Ecuanticorp (anunciante) pone literalmente en su landing *"❌ No trabajamos con proyectos académicos o pruebas"*. Es el único de los 6 que filtra. Lo hace porque sabe lo mismo que acabas de leer. Cópialo.

---

## 2. Dónde estás hoy — auditoría del sitio

Rastreo directo por HTTP sobre las 23 URLs del sitio, 4 de agosto de 2026.

### Lo que está bien (y no es poco)

✅ SSR completo — todo el texto en el HTML sin ejecutar JS
✅ **Cero redirecciones** en todo el rastreo · 404 reales y correctos
✅ Canonical en todas las páginas · `robots.txt` moderno con permisos explícitos a GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot
✅ `llms.txt` + `llms-full.txt` bien construidos — estás mejor preparado para búsqueda con IA que cualquier competidor peruano que analicé
✅ JSON-LD extenso y válido: Organization + LocalBusiness + ProfessionalService, WebSite, Person (Rodrigo), BreadcrumbList, FAQPage, Service, OfferCatalog
✅ **Prueba social verificable y superior a la media del sector** — 3 testimonios con nombre, cargo, empresa y métrica; una app publicada en App Store (Rapiditos); dominios de cliente en vivo

### El problema de targeting

**Menciones de "Lima": 17 en todo el sitio. Ninguna posiciona a Árkos.**

- 6 describen a *clientes* ("Solutec DHA… en Lima", "Casaroma Hostels… en Lima, Perú")
- 1 en un testimonio ("Atiendo a más de 2,500 clientes en Lima")
- Las demás son falsos positivos ("cli**ma**positivo") o están en `meta keywords`, etiqueta que **Google ignora desde 2009**

**Menciones de "Trujillo": 63. Todas son señales de identidad de marca.**

| Dónde | Qué dice | Impacto |
|---|---|---|
| Bloque `sr-only` en el `<body>` de **las 23 páginas** | "agencia de desarrollo de software en Trujillo, Perú" | Alto — se repite en cada página |
| Footer global | "Contacto — Trujillo, Perú" | Alto |
| **JSON-LD de todas las páginas** | `addressLocality: "Trujillo"`, `addressRegion: "La Libertad"`, tipo `LocalBusiness` | **El más determinante** |
| `areaServed` | `Country: Peru` + `Place: Latinoamérica` | **No reclama ninguna ciudad** |
| FAQ de `/services` | "¿…atiende a empresas fuera de Trujillo?" | Refuerza el anclaje |
| Hero del home | "FIG. 01 — Agencia de software · Trujillo, Perú" | Alto |
| `llms.txt` | "Ubicación: Trujillo, Perú" | Alto para la capa IA |

Proporción **Trujillo : Lima = 3.7 : 1**, y la asimetría cualitativa es peor: las de Trujillo son identidad, las de Lima son texto de cliente. **Google ha entendido perfectamente lo que le dijiste.**

### Volumen de contenido — el dato que duele

| Página | Palabras en `<main>` |
|---|---|
| `/` | 2,467 (engañoso: son 18 tarjetas de 30–60 palabras + 4 servicios de ~20) |
| `/blog/desarrollo-software-a-medida-en-peru` | 2,094 ← única pieza larga real |
| `/portfolio` | 1,065 |
| `/projects` | 1,058 |
| **`/services`** | **757 — de las cuales solo 131 son contenido de servicio** |
| `/precios` | 691 |
| `/diagnostico` | 586 |
| `/cumplimiento-sunat` | 526 |
| `/costo-del-excel` | 510 |

`/services` describe cada servicio con **una frase**: *"Desarrollo Web — Creamos sitios web y aplicaciones a medida utilizando las últimas tecnologías."* = 12 palabras. Y sus **seis botones "Saber más" son `<button>` sin `href`** — no enlazan a ninguna parte, no existen las subpáginas.

### Bugs técnicos que hay que arreglar

| # | Severidad | Problema | Archivo |
|---|---|---|---|
| 1 | 🔴 Alta | **`/portfolio` y `/projects` son 98.73% idénticos** (medido con difflib). Mismas 24 fichas, mismo orden. Ambos self-canonical, ambos en el sitemap con prioridad 0.8, ambos `index,follow`. En un sitio de 18 URLs, gastas 2 de las 3 ranuras de mayor prioridad en la misma página. El home enlaza a `/projects` pero **no a `/portfolio`** | `app/projects/`, `app/portfolio/`, `app/sitemap.ts` |
| 2 | 🔴 Alta | **Soft 404**: `/portfolio/100` (ID inexistente) devuelve **HTTP 200** con título genérico y cuerpo vacío → espacio de URLs infinito indexable | `app/portfolio/[id]/page.tsx` |
| 3 | 🟠 Media | **Las 24 fichas `/portfolio/{id}` no están en el sitemap** — son las páginas más específicas y transaccionales del sitio | `app/sitemap.ts` |
| 4 | 🟠 Media | H1 del home servido con `style="visibility:hidden"` (lo revela una animación JS). Googlebot renderiza JS, pero si el JS falla, el único H1 del home queda oculto | `components/sections/HeroSection.tsx` |
| 5 | 🟠 Media | H1 del home = `Mejoramos tus procesos` — cero keywords, cero geografía | `components/sections/HeroSection.tsx` |
| 6 | 🟠 Media | Saltos de jerarquía H1→H3 en `/services`, `/portfolio`, `/projects`, legales | varios |
| 7 | 🟠 Media | 6 CTAs "Saber más" muertos en `/services` (`<button>` sin `href`) | `app/services/page.tsx` |
| 8 | 🟡 Baja | `og:title` genérico heredado del home en `/blog`, `/portfolio`, `/projects`, `/precios` | `app/*/page.tsx` |
| 9 | 🟡 Baja | Meta descriptions desperdiciadas: `/blog` 52 car., `/portfolio` 43 car. | idem |
| 10 | 🟡 Baja | `meta keywords` presente en las 23 páginas (obsoleto). Declara "agencia digital Lima" sin que exista una sola página de Lima | `app/layout.tsx` |
| 11 | 🟡 Baja | Canonical del home sin barra final vs sitemap con barra | `app/layout.tsx` / `app/sitemap.ts` |
| 12 | 🟡 Baja | `hreflang` `es-PE` y `x-default` apuntan ambos al home, no a cada URL | `app/layout.tsx` |

### El elefante: el dominio IDN

`árkos.com` se sirve como `xn--rkos-4na.com`. Es una decisión de marca legítima, pero tiene un coste SEO concreto que conviene nombrar:

- **Fragmenta el link building.** Quien te enlaza escribirá `árkos.com`, `arkos.com` o `xn--rkos-4na.com`. Tres formas del mismo dominio, y algunos CMS no manejan bien la conversión.
- **El email `gerencia@árkos.com`** falla en clientes de correo sin soporte EAI. Riesgo de leads perdidos silenciosamente.
- **Menor recuerdo de marca** en un mercado donde te van a recomendar por WhatsApp.

**No recomiendo migrar** — el coste de una migración supera el beneficio, y tu auditoría GEO ya lo trató como intencional. Pero sí: en toda campaña de enlaces, **especifica siempre la forma exacta a usar** y redirige 301 cualquier variante que registres.

---

## 3. El campo de batalla — qué hacen los 6 competidores

Datos extraídos del HTML servido, no de estimaciones. 4 de agosto de 2026.

### Tabla comparativa

| | **Tinq** | **Glajumedia** | **Monstruo Creativo** | **TIPSE** | **SB Perú** | **Vex** |
|---|---|---|---|---|---|---|
| **URL que rankea** | `/desarrollo-software-lima` | `/empresa-de-desarrollo-de-software/` | `/software/` | `/desarrollo-de-software-a-medida/` | `/desarrollo-de-software-peru/` | `/` (home) |
| **"lima" en slug** | ✅ **Sí** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **"Lima" en H1** | ✅ `Desarrollo de Software en Lima` | ❌ `Empresa de software en Perú` | ❌ **`…en Estados Unidos (EEUU)`** | ❌ | ❌ **no hay `<h1>`** | no verificado |
| **Palabras** | **166** | 868 | 5,534 (relleno programático) | 832 | 1,149 | no verificado |
| **FAQ visible** | ❌ (sí en schema — riesgo) | ✅ 4, **sin FAQPage** | ✅ 4 | ✅ 5 | ✅ 5 (genéricas) | n/v |
| **Precios** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Casos en la página** | ❌ | ❌ (están en el home) | ✅ 5 con video | ✅ 4 sin nombrar cliente | ❌ | n/v |
| **Prueba social** | **cero** | 500+ proyectos, 10 años, Clutch 4.7/6, Osiptel · PromPerú · TV Perú · Nutribullet | "+7 años" (home dice 8) | "+12 años", clientes solo en home | "+20 años" (home dice 18), Pacífico · Roche · Volcán | **Google 4.9/110** · Trustpilot **3.2** · Clutch sin reclamar |
| **Dirección Lima** | ❌ ninguna | Surco | Miraflores | ❌ solo "Lima, Perú" | **Lince + fijo (511) 399-6575** | Miraflores (según terceros) |
| **LocalBusiness schema** | ❌ | ❌ | ❌ | ❌ | ❌ | n/v |
| **Mapa embebido** | ❌ | ❌ | ✅ (solo en home) | ❌ | ❌ | n/v |
| **Blog** | **sitemap de 1 URL** | **no existe** (`/blog` → 404) | 403 al rastrear | 22 posts | 71 posts, **sobre CTS/AFP/planillas** | masivo, autor **"redactor ai"** |
| **Menciones "Lima"** | bien colocada, sin anclaje | **2** (footer) | **1** (footer) | pocas | 1 con valor | en titles |

### Lectura por competidor

**Tinq — el más vulnerable, y probablemente el que rankea arriba.**
166 palabras. Cero proyectos, cero clientes, cero años, cero reseñas. Sin dirección, sin distrito, sin mapa, sin formulario, sin blog. Su sitemap tiene **1 sola URL** y la página que rankea **no está en él**. Su FAQPage está en schema pero las preguntas **no son visibles en la página** — incumple las guidelines de datos estructurados de Google y es candidato a perder el rich result. El cuerpo va sin tildes ("mas", "moviles", "automatizacion"). Rankea **puramente por optimización on-page exacta**: slug, title, H1 y `areaServed: City Lima` en schema. Es el único de los 6 con `City`. Cualquier página con estructura real y 1,500+ palabras útiles lo desplaza.

**Glajumedia — el rival serio.**
Es el único con autoridad de verdad: 500+ proyectos, 10 años, Clutch 4.7 con reseña verificada de Osiptel, y casos con **PromPerú, TV Perú, Nutribullet, Osiptel** — incluidas entidades públicas. Su debilidad es de ejecución: **todo eso está en el home, no en la página que rankea.** Su landing de software llega desnuda: 868 palabras, H1 sin "Lima" ni "desarrollo de software", FAQ visible sin marcar FAQPage (regalan el rich result), `areaServed: Country Perú` (no reclaman ciudad), meta description de 181 caracteres que se trunca, y **no tienen blog** (`/blog` → 404, sitemap total de 31 URLs). Todo el clúster informacional está libre.

**Monstruo Creativo — conflicto geográfico fatal.**
Title dice "en Perú", **H1 dice "Somos la Agencia de Software en Estados Unidos (EEUU)"**, y hay 20+ H3 dedicados a Miami, Los Angeles, Houston, New York, Chicago. **"Lima" aparece 1 sola vez, en el footer.** De sus 5,534 palabras, una fracción enorme es relleno programático: 4 H2 casi idénticos con listas de países, "desarrollo de desarrollo de software", "cuidades" (sic), teléfono de USA que repite el número de España. Marcan una landing comercial como `Article`. Y en el fondo son **una agencia de marketing** (title del home: "Agencia de Marketing Digital") que vende software como línea adicional.

**TIPSE — el mejor estructurado, sin señales locales.**
Contenido correcto y bien jerarquizado (832 palabras, 7 H2, 17 H3), FAQ útil con datos reales ("6 a 12 semanas", "el código fuente te pertenece", "informe de vulnerabilidades con ethical hacking"), 4 casos con métricas cuantificadas. Pero: sin dirección de calle, sin distrito, sin mapa, sin `Organization` ni `LocalBusiness` en el home (**0 bloques JSON-LD en el home**), clientes nombrados solo en el home y no en la página de dinero, y su email público es `informales@tipse.com.pe` (por "informes@"). Único slug geolocalizado de todo el sitio: `consultor-power-bi-lima`.

**SB Perú / SoftBrilliance — 20 años desperdiciados.**
La mejor cartera de marcas del grupo (**Pacífico, Volcán, Roche, RENADSA, Hunter, eBiz**) y las mejores señales locales (dirección con distrito: Av. Arequipa 2447, **Lince**; **el único teléfono fijo limeño del conjunto**: (511) 399-6575). Y sin embargo: **su página de dinero no tiene ninguna etiqueta `<h1>`** — el encabezado visual está marcado como `<h2>`. Es el fallo on-page más grave que encontré. Su blog (71 posts) trata mayoritariamente de **CTS, gratificaciones, AFP y planillas**, más contenido obsoleto (Windows Vista vs XP, ISA Server), con URLs duplicadas y slugs rotos indexables (`artculos-de-inters-3`, `test-chat`, `thank-you`). Contradicción "18 años" (meta del home) vs "20 años" (cuerpo). Sin `Organization` ni `LocalBusiness` pese a tener dirección real.

**Vex Soluciones — domina el pack local, no el orgánico.**
Su fortaleza es la ficha de Google: **4.9 con ~110 reseñas**. Eso explica el pack local, no el orgánico. Su on-page no pude verificarlo (Cloudflare devuelve **403 a todo**, incluido su propio `sitemap_index.xml`). Grietas verificables por terceros: **Trustpilot le da 3.2/5 "Medio"** (contraste brutal con el 4.9 de Google), su **perfil de Clutch está sin reclamar con 0 reseñas**, sus titles indexados tienen tres erratas ("Desarrolllo" ×2, "Anddroid") y `/desarrollo-java/` tiene el title roto. Su blog lo firma un autor llamado literalmente **"redactor ai"**, con tags irrelevantes (`audiobookmaker`, `lineage-os`, `universidad-de-harvard`). Y el bloqueo agresivo de bots **los hace invisibles para AI Overviews, Perplexity y ChatGPT Search** — un frente donde tú ya vas ganando.

### Los 6 huecos que nadie ha llenado

Verificado en los 6 sitios:

1. **Cero `LocalBusiness` schema con dirección de Lima.** Ni uno. (Togrow sí lo tiene… apuntando a Medellín, Colombia.)
2. **Cero precios publicados.** Los seis esquivan el costo con la misma fórmula: *"depende de la complejidad y alcance del proyecto"*.
3. **Cero mapas embebidos en la página de dinero.**
4. **Cero contenido peruano real.** Nadie menciona facturación electrónica SUNAT, PLE, Ley 29733 de Protección de Datos, ni Niubiz/Culqi/Izipay/Yape/Plin.
5. **Cero distritos.** Ninguno nombra San Isidro, Miraflores, Surco, La Molina o Callao en contexto de servicio.
6. **Prueba social desconectada de la página que rankea.** Es sistemático: la página que compite por la keyword es siempre la más pobre en credibilidad.

---

## 4. La estrategia — la cuña

Tu ventaja no es escribir más palabras que Monstruo Creativo. Es **llenar los 6 huecos simultáneamente en una sola página**, con activos que ya tienes.

| Hueco del mercado | Lo que ya tienes | Estado |
|---|---|---|
| Nadie publica precios | **`/precios`** con rangos reales en S/ y USD, factores y modelos de pago | ✅ construido, mal enlazado |
| Nadie habla de SUNAT | **`/cumplimiento-sunat`** + `/costo-del-excel` | ✅ construido, 526 palabras — expandir |
| Prueba social lejos de la página que rankea | 3 testimonios con nombre, cargo, empresa y **métrica** | ✅ existe, mal ubicada |
| Nadie tiene clientes limeños demostrables | **Solutec DHA** (2,500 clientes en Lima, +40% consultas) y **Casaroma Hostels** | ✅ existe, enterrado en tarjetas |
| Nadie tiene embudo diferenciado | **`/diagnostico`** (llamada gratis 30 min o diagnóstico S/ 950 descontable) | ✅ construido — es tu mejor CTA |
| Nadie es citable por IA | `llms.txt` + `llms-full.txt` + robots con permisos a GPTBot/ClaudeBot/PerplexityBot | ✅ ya ganas este frente |

**El posicionamiento:** no compitas como "otra agencia de Lima". Compite como **la única que te dice cuánto cuesta, te resuelve SUNAT y te enseña casos limeños con nombre y cifra.**

### El ángulo Trujillo→nacional, resuelto honestamente

Reposicionar como nacional y rankear en Lima tiran en direcciones opuestas: el marcado `LocalBusiness` con ciudad es lo que hace competitivas las búsquedas geo. Borrar Trujillo debilita la señal local sin ganar la de Lima.

**La solución no es mentir sobre una dirección en Lima.** Inventar un domicilio para un Google Business Profile es motivo de suspensión y te deja peor que al inicio. La solución es:

- **La entidad se vuelve nacional**: `Organization` sin `addressLocality` en la raíz, `areaServed` con `City: Lima`, `City: Trujillo`, `City: Arequipa`, `Country: Peru`.
- **`LocalBusiness` con dirección completa solo donde hay dirección real** (Trujillo, en `/desarrollo-de-software-trujillo`).
- **La página de Lima usa `Service` + `ProfessionalService` con `areaServed: City Lima`**, sin `PostalAddress` falso. Legal, indexable y suficiente para el orgánico.
- **Y conviertes la objeción en argumento** con una sección explícita: *"¿Por qué contratar una agencia con sede en Trujillo?"* → mismo huso horario, visitas presenciales a Lima agendadas, sin el sobrecosto estructural de una oficina en San Isidro, equipo senior directo sin capas de cuenta. Es honesto y desarma la duda antes de que la escriban en WhatsApp.

> El pack local de Lima queda fuera de alcance sin dirección verificable allí. Lo asumimos: el objetivo acordado es el **#1 orgánico**.

---

## 5. Arquitectura nacional propuesta

```
/                                          → Agencia nacional (entidad Árkos)
│
├── /desarrollo-de-software-lima           ★ PÁGINA DE DINERO (2,000–2,500 palabras)
├── /desarrollo-de-software-trujillo       → sede real · LocalBusiness completo · GBP
├── /desarrollo-de-software-arequipa       → fase 3
│
├── /services                              → hub · expandir de 131 → 800+ palabras
│   ├── /services/software-a-medida
│   ├── /services/desarrollo-web
│   ├── /services/apps-moviles
│   ├── /services/diseno-ux-ui
│   ├── /services/integracion-ia
│   └── /services/ecommerce                 (arregla los 6 botones muertos)
│
├── /precios                               → ARMA. Enlazar desde Lima y desde cada servicio
├── /cumplimiento-sunat                    → EL MOAT. Expandir a 1,200+ palabras
├── /costo-del-excel                       → TOFU
├── /diagnostico                           → CTA principal (embudo diferenciado)
│
├── /soluciones/clinicas                   → fase 3 · tienes Clínica Juan Pablo II + ATELIER + VetCare
├── /soluciones/restaurantes               → fase 3 · tienes RestHUB + Rapiditos
├── /soluciones/hoteles                    → fase 3 · tienes VR PMS + Casaroma + Maré
│
├── /portfolio                             → canónica única (301 desde /projects)
│   └── /portfolio/{id}                    → 24 fichas · AL SITEMAP · 404 real si no existe
└── /blog                                  → clúster de contenido
```

**Enlazado interno hacia `/desarrollo-de-software-lima`** (esto es la mitad del trabajo, y es gratis):

- Home → enlace contextual en el bloque de servicios
- `/services` → "Atendemos empresas de Lima" en el hub y en cada subpágina
- `/precios` → "Precios para proyectos en Lima"
- `/cumplimiento-sunat` → enlace natural
- Post pilar `desarrollo-software-a-medida-en-peru` → 2 enlaces contextuales
- Fichas de **Solutec DHA** y **Casaroma Hostels** → "Ver todos nuestros proyectos en Lima"
- Footer → bloque "Cobertura: Lima · Trujillo · Arequipa · Todo el Perú"

---

## 6. Blueprint de la página de Lima

**Esta es la pieza. Todo lo demás la sostiene.**

```
URL:    /desarrollo-de-software-lima
Title:  Desarrollo de Software a Medida en Lima | Empresa de Software — Árkos   (~72 car.)
Desc:   Empresa de desarrollo de software a medida en Lima: ERP, CRM, apps y
        sistemas con facturación electrónica SUNAT. Precios en soles, casos
        con clientes limeños y diagnóstico gratuito.                            (~195 → recortar a 155)
H1:     Desarrollo de software a medida en Lima
```

### Estructura de secciones

**Hero (arriba del fold)** — lo que ningún competidor pone arriba:
- H1 exact-match
- 3 cifras de confianza reales (proyectos entregados · años · % de clientes que repiten). *Necesitas fijar estas cifras y no contradecirlas en ninguna otra página — SB Perú y Monstruo Creativo pierden credibilidad exactamente por eso.*
- Nombres de clientes limeños visibles: Solutec DHA, Casaroma Hostels
- CTA doble: **Diagnóstico gratis de 30 min** + WhatsApp con mensaje precargado

**H2 — Qué construimos para empresas de Lima**
6 bloques con enlace real a `/services/{slug}`. Nada de `<button>` sin href.

**H2 — Casos reales con empresas de Lima** ← *el diferenciador nº1*
- **Solutec DHA** — CRM para servicio técnico. *2,500 clientes atendidos en Lima. +40% de consultas mensuales por canal digital.* Testimonio firmado de Dharcy Villafuerte, Fundadora.
- **Casaroma Hostels** — plataforma de alojamiento en Lima.
- Enlaces a las fichas completas.
> Ninguno de los 6 competidores muestra un cliente limeño nombrado, con métrica y con testimonio firmado, en la página que rankea. Ninguno.

**H2 — Cuánto cuesta un software a medida en Lima** ← *hueco de mercado nº2*
Tabla con rangos reales en S/ por tipo de proyecto + qué mueve el precio + modelos de pago. Enlace a `/precios`. **Cero competidores hacen esto.**

**H2 — Cumplimiento peruano: SUNAT, datos personales y pagos locales** ← *el moat*
Facturación electrónica y OSE/PSE · PLE · Ley 29733 de Protección de Datos Personales · integración con Yape, Plin, Niubiz, Culqi, Izipay. Enlace a `/cumplimiento-sunat`.
**Cero competidores mencionan una sola de estas palabras.** Este bloque solo puede escribirlo alguien que de verdad construye software en Perú, y por eso es defendible.

**H2 — Sectores que atendemos en Lima**
Clínicas y salud · Restaurantes y delivery · Hoteles y alojamiento · Retail y comercio · Servicios profesionales · Inmobiliaria. Cada uno con el proyecto real que lo respalda (ATELIER Clinic, RestHUB, VR PMS, Maré…). Prepara las futuras `/soluciones/*`.

**H2 — Cómo trabajamos con empresas de Lima**
Proceso en 5 pasos anclado en `/diagnostico`. Explícito: reuniones presenciales en Lima agendadas + trabajo remoto, mismo huso horario.

**H2 — ¿Por qué una agencia con sede en Trujillo para tu empresa de Lima?**
La objeción, respondida de frente. Honestidad como diferenciador — y de paso resuelve la disonancia con las 63 menciones de Trujillo que Google ya indexó.

**H2 — Preguntas frecuentes**
8–10 preguntas **visibles en la página** + `FAQPage` schema (visible + marcado; Tinq tiene el schema sin las preguntas visibles y eso es incumplimiento):
- ¿Cuánto cuesta desarrollar un software a medida en Lima?
- ¿En cuánto tiempo entregan un sistema?
- ¿El código fuente es mío? *(TIPSE gana puntos con esta; respóndela mejor)*
- ¿Integran con SUNAT / facturación electrónica?
- ¿Integran Yape, Plin, Niubiz o Culqi?
- ¿Trabajan presencialmente en Lima?
- ¿Qué pasa si ya tengo un sistema y perdí contacto con el proveedor anterior?
- ¿Trabajan con proyectos de tesis o académicos? → **"No."** ← filtro de leads, copiado de Ecuanticorp
- ¿Hacen mantenimiento después de entregar?
- ¿Firman NDA?

**Cierre** — CTA a `/diagnostico` + WhatsApp.

### Schema JSON-LD de la página

```jsonc
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://xn--rkos-4na.com/desarrollo-de-software-lima#service",
      "name": "Desarrollo de software a medida en Lima",
      "serviceType": "Desarrollo de software a medida",
      "provider": { "@id": "https://xn--rkos-4na.com/#organization" },
      "areaServed": [
        { "@type": "City",  "name": "Lima",   "containedInPlace": { "@type": "Country", "name": "Perú" } },
        { "@type": "AdministrativeArea", "name": "Callao" }
      ],
      "audience": { "@type": "BusinessAudience", "name": "Empresas y pymes de Lima" },
      "hasOfferCatalog": { /* ERP, CRM, apps, e-commerce, integraciones SUNAT */ }
    },
    { "@type": "FAQPage",        /* las 8–10 preguntas VISIBLES en la página */ },
    { "@type": "BreadcrumbList", /* URLs absolutas: Inicio → Servicios → Desarrollo de software en Lima */ },
    { "@type": "WebPage", "author": { "@id": "https://xn--rkos-4na.com/#rodrigo-torres" } }
  ]
}
```

**No incluyas `PostalAddress` de Lima.** No la tienes. `areaServed: City Lima` es la señal correcta y honesta.

---

## 7. Roadmap por fases

### Fase 0 — Higiene (semana 1) · esfuerzo bajo · impacto medio

| # | Acción | Archivo |
|---|---|---|
| 1 | Decidir canónica entre `/portfolio` y `/projects` → **301 permanente** de la perdedora. Quitar la redirigida del sitemap | `next.config.mjs`, `app/sitemap.ts` |
| 2 | `/portfolio/{id}` inválido → `notFound()` (404 real, no 200) | `app/portfolio/[id]/page.tsx` |
| 3 | Añadir las 24 fichas `/portfolio/{id}` al sitemap | `app/sitemap.ts` |
| 4 | Quitar `visibility:hidden` del H1 servido (que la animación use opacity/transform, no visibility) | `HeroSection.tsx` |
| 5 | `og:title` propio por página · meta descriptions de `/blog` y `/portfolio` | varios |
| 6 | Eliminar `meta keywords` | `app/layout.tsx` |
| 7 | Canonical con barra final consistente con el sitemap | `app/layout.tsx` |
| 8 | Arreglar saltos H1→H3 | varios |

### Fase 1 — La página de Lima (semanas 2–4) · esfuerzo alto · **impacto máximo**

| # | Acción |
|---|---|
| 9 | **Construir `/desarrollo-de-software-lima`** según el blueprint. 2,000–2,500 palabras reales |
| 10 | Schema `Service` + `FAQPage` + `BreadcrumbList` con `areaServed: City Lima` |
| 11 | Enlazado interno: 7 entradas apuntando a la página (ver §5) |
| 12 | Añadirla al sitemap con prioridad 0.9 |
| 13 | Ampliar `areaServed` global: `City Lima`, `City Trujillo`, `Country Peru` |
| 14 | **Google Search Console → inspeccionar URL → solicitar indexación**. Ping a IndexNow (la key ya está en `public/`) |
| 15 | Actualizar `llms.txt` y `llms-full.txt` con la cobertura Lima |

### Fase 2 — Profundidad y arquitectura (semanas 4–10) · esfuerzo alto · impacto alto

| # | Acción |
|---|---|
| 16 | `/services`: de 131 a 800+ palabras de contenido real |
| 17 | Crear las 6 subpáginas `/services/{slug}` (600–900 palabras c/u) y **arreglar los 6 botones muertos** |
| 18 | Crear `/desarrollo-de-software-trujillo` con `LocalBusiness` + dirección real + GBP → libera al home de ser "página de Trujillo" |
| 19 | Migrar la entidad raíz a nacional (§4) |
| 20 | Expandir `/cumplimiento-sunat` a 1,200+ palabras — es tu contenido más defendible |
| 21 | Añadir métricas agregadas de agencia (proyectos, años, retención) **consistentes en todo el sitio** |
| 22 | Reescribir el H1 del home con keyword (`Mejoramos tus procesos` no dice nada a Google) |

### Fase 3 — Contenido y clústeres (meses 3–6) · esfuerzo medio-alto · impacto alto

| # | Acción |
|---|---|
| 23 | 8–12 posts atacando el clúster que **Glajumedia dejó vacío** (no tienen blog): "cuánto cuesta un ERP en Perú", "software a medida vs ERP enlatado", "cómo elegir empresa de desarrollo de software en Lima", "integrar facturación electrónica SUNAT paso a paso", "Yape y Plin en tu sistema" |
| 24 | Landings por sector: `/soluciones/clinicas`, `/restaurantes`, `/hoteles` — tienes los casos para respaldarlas |
| 25 | Testimonios en video de los 3 clientes que ya te dieron testimonio escrito |
| 26 | Conseguir testimonio de los otros ~21 proyectos del portafolio (hoy solo 3 de 24 tienen voz del cliente) |

### Fase 4 — Autoridad · el cuello de botella real (meses 1–12, **empezar YA en paralelo**)

Tu propia auditoría GEO se puso **12/100** aquí. Es lo que decide entre #5 y #1.

| # | Acción | Detalle |
|---|---|---|
| 27 | **Listicle de Togrow** | `togrowagencia.com/las-6-mejores-empresas-de-desarrollo-de-software-en-lima/` — enlaces **dofollow** (solo `rel="noopener"`), **sin criterios de inclusión declarados**, **22 meses sin actualizar** (mod. 2024-10-07), y se auto-colocaron en el #1 siendo una agencia **de Medellín sin oficina en Perú**. Ángulo: *"su ranking de 2024 está desactualizado"*. Canales: `contacto@togrowagencia.com` · WhatsApp +57 310 359 7580 |
| 28 | **Clutch** | Tu perfil ya existe (`clutch.co/profile/rkos`). Pide reseñas verificadas a **Clínica Juan Pablo II**, **Solutec DHA** y **UNTELS**. Glajumedia tiene 4.7/6 y **Vex tiene su perfil sin reclamar con 0 reseñas** — hueco directo |
| 29 | **Google Business Profile (Trujillo)** | Verificar que existe y está optimizado. Vex domina el pack local con 4.9/110 reseñas: el volumen de reseñas es la variable |
| 30 | **Enlaces de clientes** | `freedysotelov.com` (Dr. Ing. Freedy Sotelo, ex Decano UNTELS) ya te da testimonio → pídele el enlace. Igual con Solutec DHA y Clínica Juan Pablo II. Son los enlaces más fáciles y más relevantes que vas a conseguir |
| 31 | **Directorios** | Sortlist, GoodFirms, DesignRush, agencias.marketing. Los 5 enlazados desde el listicle de Togrow (adesynet, palestrasistemas, ingenia3peru, applisys, asixonline) marcan dónde se listan las agencias peruanas |
| 32 | **Wikidata** | Tu auditoría lo retiró por 404. Recrearlo cuando tengas 2+ referencias externas sólidas (Clutch + directorio + prensa) |
| 33 | **Limpiar el rastro "Bytecore"** | GitHub, perfiles y directorios cacheados siguen inyectando *"Árkos (formerly Bytecore)"* en resúmenes de IA. El repo se llama `PortafolioBytecore` |
| 34 | **Bing Webmaster + IndexNow** | Importar desde GSC (sin token). La key de IndexNow ya está; falta hacer ping en cada publicación |
| 35 | **Tu propio listicle honesto** | "Las mejores empresas de desarrollo de software en Lima 2026" **con metodología declarada, fecha de auditoría y datos de reseñas reales**. El de Togrow no declara criterios, tiene un `aggregateRating` 5.0/21 autodeclarado sin reseñas visibles y un `FAQPage` de 12 preguntas sobre Google Ads que no tienen nada que ver con el artículo. Superarlo en E-E-A-T es fácil. *(Riesgo: enlazas a competidores. Decisión tuya.)* |

---

## 8. Cómo medir y verificar

**Configurar antes de empezar** (si no está ya): Google Search Console con las **dos** formas del dominio, Bing Webmaster, y una medición de posición semanal para el set de keywords de §1.

| Métrica | Hoy | 3 meses | 6 meses | 12 meses |
|---|---|---|---|---|
| Posición `desarrollo de software lima` | sin página | top 30 | top 10 | top 3 |
| Posición `empresa de desarrollo de software lima` | sin página | top 20 | top 5 | **#1** |
| Posición `cuánto cuesta desarrollar software perú` | ? | top 10 | top 3 | #1 |
| Dominios de referencia | ~0 | 8–12 | 20–30 | 40+ |
| Reseñas en Clutch | 0 | 3 | 6 | 10 |
| Páginas indexadas | ~18 | 35 | 55 | 70+ |

**Verificación técnica después de cada despliegue:**
- Rich Results Test sobre `/desarrollo-de-software-lima` → `Service`, `FAQPage`, `BreadcrumbList` válidos
- `curl -s <url> | grep -c '<h1'` → exactamente 1
- Confirmar que el FAQ del schema coincide **palabra por palabra** con el FAQ visible
- `curl -I` sobre `/portfolio/999` → **404**, no 200
- Sitemap: que las 24 fichas estén y que la URL redirigida ya no esté

---

## 9. Riesgos y qué NO hacer

**❌ No inventes una dirección en Lima** para abrir un Google Business Profile. Es motivo de suspensión y te deja peor que ahora. El objetivo acordado es el orgánico, y el orgánico no lo requiere.

**❌ No borres Trujillo del sitio.** El instinto al "reposicionar como nacional" es eliminar la ciudad. Eso destruye la única señal local que tienes sin ganar la de Lima. La jugada es *añadir* Lima y *reubicar* Trujillo en su propia página.

**❌ No copies el modelo de Monstruo Creativo** (páginas programáticas listando 40 ciudades). Genera exactamente el conflicto que a ellos les rompe la página: title "Perú", H1 "Estados Unidos". Es vulnerable a las actualizaciones de contenido útil.

**❌ No pongas FAQPage schema sin el FAQ visible.** Es lo que hace Tinq y es incumplimiento de las guidelines de Google.

**❌ No declares cifras que se contradigan entre páginas.** SB Perú dice 18 años en una plantilla y 20 en otra; Monstruo Creativo dice 7 en una página y 8 en otra. Fija tus números una vez.

**⚠️ El dominio IDN es fricción permanente.** No migres, pero en cada campaña de enlaces especifica la forma exacta del dominio.

**⚠️ El plazo es real.** 9–12 meses para el #1, y depende de backlinks que hoy no existen. Si necesitas leads en 60 días, Google Ads es el puente — la landing de Lima le sirve de destino y le sube el Quality Score. Es complementario, no alternativo.

---

## 10. Las 3 cosas que harían más diferencia si solo hicieras tres

1. **Construir `/desarrollo-de-software-lima`** con el blueprint de §6. Sin esto, nada de lo demás importa: Google no puede rankear una página que no existe.
2. **Poner Solutec DHA y Casaroma Hostels arriba del fold de esa página**, con métrica y testimonio firmado. Es el único activo que ninguno de los 6 competidores puede replicar mañana.
3. **Conseguir 3 reseñas en Clutch y 3 enlaces de clientes** (empezando por `freedysotelov.com`). Es el 12/100 que te tiene con techo.

---

*Auditoría ejecutada sobre el HTML servido de árkos.com (23 URLs) y de los 6 competidores, 4 de agosto de 2026. Los datos no verificables están marcados como tales en el cuerpo. No se verificó: indexación actual, backlinks, Core Web Vitals de campo, existencia del Google Business Profile de Árkos, ni el on-page de Vex Soluciones (Cloudflare 403).*
