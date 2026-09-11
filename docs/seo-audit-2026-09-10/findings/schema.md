# Auditoría de Schema / Structured Data — xn--rkos-4na.com (árkos.com)

**Puntuación: 80/100**

Sitio Next.js con SSR real (todas las páginas se sirvieron en `mode_used: raw`, sin necesidad de renderizar con Playwright): el JSON-LD vive en el HTML inicial, no se inyecta solo en cliente. Todas las páginas auditadas devolvieron `status_code 200` y bloques JSON-LD `valid: true`.

Páginas revisadas: `/`, `/services`, `/services/integracion-ia`, `/precios`, `/diagnostico`, `/desarrollo-de-software-lima`, `/portfolio`, `/portfolio/19`, `/blog/adopcion-de-ia-en-empresas`, `/necesitas-un-sistema`.

## Qué funciona

- **Entidad única multi-tipo bien formada y reutilizada en todas las páginas**: `@type: ["Organization","LocalBusiness","ProfessionalService"]` con `@id: https://xn--rkos-4na.com/#organization`, presente de forma idéntica en las 10 páginas (verificado por tipo en cada una).
- **Cumplimiento fiscal peruano correcto**: `taxID` y `vatID` con el RUC real (20616338782), más `identifier` como `PropertyValue` (`propertyID: "RUC"`). Esto es infrecuente y valioso para negocio local.
- **`numberOfEmployees`** como `QuantitativeValue` (9), `foundingDate` (2020), `areaServed` con `City` (Lima, Trujillo), `Country` (Peru) y `Place` (Latinoamérica).
- **`founder` referenciado por `@id`** hacia un nodo `Person` (Rodrigo Torres) completo: `jobTitle`, `worksFor` (referencia de vuelta a la Organization), `knowsAbout`, y sobre todo `hasCredential` con 5 `EducationalOccupationalCredential` reales, cada uno con `recognizedBy` (PMI, Anthropic, Hugging Face, Scrum Alliance) y `dateCreated`. Señal de E-E-A-T sólida.
- **`WebSite` + `SearchAction`** presente y bien formado sitewide, con `@id`, `inLanguage: es-PE` y `publisher` referenciado por `@id`.
- **`OfferCatalog`/`Service`** en home y en `/services`, con `Service` propios con `@id`, `serviceType`, `provider` referenciado y `areaServed` (`City` + `containedInPlace`).
- **`PriceSpecification` real (no placeholder)** en `/precios`: 7 `Offer` con `minPrice`/`priceCurrency` numéricos reales, coherentes con el copy visible.
- **`FAQPage`** implementado en al menos 6 páginas (`/services`, `/precios`, y por tipo detectado en `/services/integracion-ia`, `/diagnostico`, `/desarrollo-de-software-lima`, `/blog/...`, `/necesitas-un-sistema`), con preguntas y respuestas completas, sin texto placeholder.
- **`BreadcrumbList`** presente en `/services`, `/portfolio/19`, `/blog/adopcion-de-ia-en-empresas` (y por tipo en `/services/integracion-ia`, `/desarrollo-de-software-lima`).
- **`ItemList`/`CreativeWork`/`CollectionPage`** en `/portfolio` para listar casos de estudio.
- Todos los bloques usan `@context: "https://schema.org"` (https, no http) y JSON-LD (no Microdata/RDFa detectado). No se encontró `HowTo`, `SpecialAnnouncement` ni otros tipos deprecados.

## Hallazgos

### 1. `priceCurrency` en USD, no en PEN — Medium
Los 7 `Offer` de `/precios` declaran `"priceCurrency": "USD"`, mientras el negocio muestra precios primarios en soles (S/) al usuario y factura con SUNAT en PEN.

```json
{
  "@type": "Offer",
  "itemOffered": { "@type": "Service", "name": "Landing de alta conversión" },
  "priceSpecification": { "@type": "PriceSpecification", "minPrice": 300, "priceCurrency": "USD" }
}
```
El FAQ de la misma página sí muestra la cifra en soles: *"desde S/ 1,100 (USD 300)"*.

**Recomendación**: usar `priceCurrency: "PEN"` con el `minPrice` en soles (1100, 2250, 3400, 4500, 13000, 9500 aprox., según los montos ya publicados en el FAQ) como moneda principal, dado que el negocio y la mayoría del público objetivo están en Perú. Si se quiere conservar USD para audiencia internacional, usar dos `Offer` (uno PEN, uno USD) en vez de reemplazar.

### 2. `OfferCatalog` de `/services` y home sin `priceSpecification` — Medium
Los `Offer` dentro de `hasOfferCatalog` (home) y del catálogo de `/services` no incluyen `priceSpecification`; el precio solo aparece como texto libre dentro de `description` (ej. *"Desde S/ 1,900"*).

```json
{
  "@type": "Offer",
  "itemOffered": {
    "@type": "Service",
    "name": "Integración de IA y automatización",
    "description": "... Desde S/ 1,900.",
    "url": "https://xn--rkos-4na.com/services/integracion-ia"
  }
}
```

**Recomendación**: agregar `priceSpecification` (`minPrice` + `priceCurrency: "PEN"`) a estos `Offer`, replicando el patrón ya usado en `/precios`, para consistencia entre páginas.

### 3. `provider` inline sin `@id` en `/precios` — Low
El `Service` de `/precios` referencia al proveedor como un nodo `Organization` duplicado en vez de apuntar a la entidad principal por `@id`, a diferencia del resto de páginas.

```json
"provider": { "@type": "Organization", "name": "Árkos", "url": "https://xn--rkos-4na.com" }
```
En `/services`, en cambio, el patrón correcto es `"provider": {"@id": "https://xn--rkos-4na.com/#organization"}`.

**Recomendación**: reemplazar por `{"@id": "https://xn--rkos-4na.com/#organization"}` para evitar un nodo Organization huérfano (sin RUC ni demás propiedades) en el grafo de entidad.

### 4. `BreadcrumbList` ausente en varias páginas — Medium
No se detectó `BreadcrumbList` (por tipo) en `/precios`, `/diagnostico`, `/portfolio` (nivel raíz) ni `/necesitas-un-sistema`, mientras sí está en `/services`, `/services/integracion-ia`, `/desarrollo-de-software-lima`, `/portfolio/19` y el blog.

**Recomendación**: añadir `BreadcrumbList` a las páginas faltantes para señalización de jerarquía consistente en todo el sitio.

### 5. `SearchAction` con endpoint `/search` no verificado — Medium
`WebSite.potentialAction` apunta a `https://xn--rkos-4na.com/search?q={search_term_string}`.

```json
"potentialAction": {
  "@type": "SearchAction",
  "target": { "@type": "EntryPoint", "urlTemplate": "https://xn--rkos-4na.com/search?q={search_term_string}" },
  "query-input": "required name=search_term_string"
}
```
No se visitó `/search` en esta auditoría (fuera de las 10 páginas asignadas), por lo que no se confirmó que exista o funcione.

**Recomendación**: verificar que `/search` responda con resultados reales; si no existe, quitar `potentialAction` o construir el endpoint antes de que Google lo intente usar.

### 6. `sameAs` limitado en la entidad Organization — Low
`Organization` solo declara `sameAs: ["https://x.com/ArkosPeru", "https://clutch.co/profile/rkos"]`. Falta LinkedIn de empresa y Google Business Profile (el nodo `Person` de Rodrigo sí tiene LinkedIn/GitHub/Instagram, pero no la Organization).

**Recomendación**: agregar `sameAs` con la página de LinkedIn de la empresa y el perfil de Google Business Profile de Árkos, solo si existen y están activos (no usar placeholders).

### 7. `FAQPage` sin beneficio de rich result en Google — Info
`FAQPage` está implementado ampliamente (`/services`, `/precios` y por tipo en `/services/integracion-ia`, `/diagnostico`, `/desarrollo-de-software-lima`, blog, `/necesitas-un-sistema`). Desde mayo de 2026 Google retiró el rich result de FAQ para todos los sitios, no solo gobierno/salud. No genera SERP feature.

**Recomendación**: no es necesario quitarlo (el contenido es real y útil, y podría aportar en visibilidad AI/GEO, aunque ese beneficio no está confirmado). No priorizar más inversión en esta marca esperando resultado visual en Google.

### 8. `AggregateRating`/`Review` ausente — Info
No se detectó `AggregateRating` ni `Review` en ninguna página revisada, y no se confirmó en esta auditoría si existen reseñas reales (p. ej. en Clutch, enlazado vía `sameAs`) que podrían respaldar ese markup.

**Recomendación**: agregar `AggregateRating`/`Review` únicamente si hay reseñas reales verificables (Clutch, Google) con conteo y puntaje reales; nunca con datos inventados.

## No evaluado

Por límite de alcance de esta pasada, lo siguiente **no se validó a nivel de propiedad individual** (solo se detectaron los `@type` presentes vía resumen, sin inspeccionar cada campo):
- `/services/integracion-ia`: bloque con `BreadcrumbList`, `BusinessAudience`, `FAQPage`, `Offer`, `PriceSpecification`, `Service`, `WebPage` — no se verificaron fechas, moneda del `PriceSpecification` ni completitud de `BreadcrumbList`.
- `/diagnostico`: bloques `FAQPage` y `Service`/`Offer` — no se inspeccionaron propiedades individuales.
- `/desarrollo-de-software-lima`: bloque con `AdministrativeArea`, `BreadcrumbList`, `BusinessAudience`, `FAQPage`, `OfferCatalog`, `PriceSpecification`, `Service`, `WebPage` — no se verificó a nivel de propiedad.
- `/portfolio` y `/portfolio/19`: `CollectionPage`/`ItemList`/`CreativeWork` — no se verificó si cada `CreativeWork` del portafolio tiene `url`, `image`, `dateCreated` o `about` completos.
- `/blog/adopcion-de-ia-en-empresas`: bloque `Article`/`ImageObject`/`Organization`/`Person`/`WebPage` — no se confirmó presencia de `datePublished`/`dateModified` en formato ISO 8601 ni `author` con `@id` propio.
- `/necesitas-un-sistema`: bloque `WebApplication`/`Offer` — no se verificó si el `Offer` tiene `priceSpecification` o si es gratuito.
- No se ejecutó el validador de Google Rich Results Test ni el validador oficial de Schema.org; la revisión fue manual sobre el JSON extraído.
- No se confirmó la existencia/funcionamiento real de `/search`.
- No se verificó si existen perfiles reales de LinkedIn empresa o Google Business Profile para completar `sameAs` de la Organization.

```json
{
  "category": "Schema / Structured Data",
  "score": 80,
  "what_works": [
    "Entidad Organization/LocalBusiness/ProfessionalService única con @id, reutilizada de forma consistente en las 10 páginas auditadas",
    "RUC/taxID/vatID reales y correctos, con identifier PropertyValue dedicado (poco común y valioso para negocio local)",
    "numberOfEmployees, foundingDate y areaServed (Lima, Trujillo, Peru, Latinoamérica) presentes con datos reales",
    "founder referenciado por @id hacia un Person completo con hasCredential (5 credenciales reales con recognizedBy y dateCreated)",
    "WebSite + SearchAction bien formado y consistente en todas las páginas",
    "OfferCatalog/Service con @id, provider referenciado y areaServed en home y /services",
    "PriceSpecification con minPrice/priceCurrency reales (no placeholder) en /precios",
    "FAQPage con contenido real y completo en al menos 6 páginas",
    "BreadcrumbList presente en varias páginas clave",
    "ItemList/CreativeWork/CollectionPage para el portafolio",
    "Todo en JSON-LD, @context https, sin tipos deprecados (HowTo, SpecialAnnouncement, etc.)"
  ],
  "findings": [
    {
      "title": "priceCurrency en USD en vez de PEN en /precios",
      "severity": "Medium",
      "description": "Los 7 Offer de /precios usan priceCurrency USD aunque el negocio y el copy visible muestran precios primarios en soles (S/).",
      "recommendation": "Usar priceCurrency PEN con los montos en soles ya publicados en el FAQ como moneda principal; opcionalmente añadir un segundo Offer en USD para audiencia internacional."
    },
    {
      "title": "OfferCatalog de home y /services sin priceSpecification",
      "severity": "Medium",
      "description": "Los Offer dentro de hasOfferCatalog (home) y del catálogo de /services no tienen priceSpecification estructurado; el precio solo aparece como texto libre en description.",
      "recommendation": "Agregar priceSpecification (minPrice + priceCurrency PEN) a estos Offer, replicando el patrón ya usado en /precios."
    },
    {
      "title": "provider inline sin @id en /precios",
      "severity": "Low",
      "description": "El Service de /precios recrea un nodo Organization inline en vez de referenciar la entidad principal por @id, a diferencia del resto de páginas.",
      "recommendation": "Reemplazar por {\"@id\": \"https://xn--rkos-4na.com/#organization\"} para evitar un nodo Organization huérfano en el grafo de entidad."
    },
    {
      "title": "BreadcrumbList ausente en /precios, /diagnostico, /portfolio y /necesitas-un-sistema",
      "severity": "Medium",
      "description": "BreadcrumbList no se detectó por tipo en estas páginas, mientras sí está presente en /services, /services/integracion-ia, /desarrollo-de-software-lima, /portfolio/19 y el blog.",
      "recommendation": "Añadir BreadcrumbList a las páginas faltantes para consistencia de jerarquía en todo el sitio."
    },
    {
      "title": "SearchAction apunta a /search sin verificar que exista",
      "severity": "Medium",
      "description": "WebSite.potentialAction referencia https://xn--rkos-4na.com/search?q={search_term_string}, endpoint que no se visitó en esta auditoría.",
      "recommendation": "Confirmar que /search devuelve resultados reales; si no existe, quitar potentialAction o construir el endpoint."
    },
    {
      "title": "sameAs limitado en la entidad Organization",
      "severity": "Low",
      "description": "Organization solo declara sameAs a X/Twitter y Clutch; no incluye LinkedIn de empresa ni Google Business Profile, a diferencia del Person que sí tiene LinkedIn/GitHub/Instagram.",
      "recommendation": "Agregar sameAs con LinkedIn de empresa y Google Business Profile de Árkos si existen, sin usar placeholders."
    },
    {
      "title": "FAQPage sin beneficio de rich result en Google",
      "severity": "Info",
      "description": "FAQPage está implementado en al menos 6 páginas; desde mayo 2026 Google retiró el rich result de FAQ para todos los sitios.",
      "recommendation": "No es necesario quitarlo; el beneficio SERP ya no existe y el eventual beneficio AI/GEO no está confirmado, así que no priorizar más inversión ahí."
    },
    {
      "title": "Sin AggregateRating/Review",
      "severity": "Info",
      "description": "No se detectó AggregateRating ni Review en ninguna página, y no se confirmó si existen reseñas reales que lo respalden.",
      "recommendation": "Agregar AggregateRating/Review solo si hay reseñas reales verificables (Clutch, Google), nunca con datos inventados."
    }
  ]
}
```
