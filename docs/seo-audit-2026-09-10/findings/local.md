# Auditoría de SEO Local — árkos.com (xn--rkos-4na.com)

**Tipo de negocio:** Service Area Business (SAB) B2B — sin local abierto al público, presencial agendado en Lima y Callao, remoto para el resto del Perú y Latinoamérica.
**Vertical:** Software a medida / adopción de IA (no encaja en ninguna de las 6 verticales estándar del skill; tratado como Professional Service / Software Company).

## Puntuación Local SEO: 33/100

| Dimensión | Peso | Puntaje | Aporte |
|---|---|---|---|
| GBP Signals | 25% | 10/100 | 2.5 |
| Reviews & Reputation | 20% | 15/100 | 3.0 |
| Local On-Page SEO | 20% | 68/100 | 13.6 |
| NAP Consistency & Citations | 15% | 35/100 | 5.25 |
| Local Schema Markup | 10% | 65/100 | 6.5 |
| Local Link & Authority Signals | 10% | 20/100 | 2.0 |
| **Total** | 100% | | **32.85 ≈ 33** |

## Qué funciona

- Página de dinero dedicada `/desarrollo-de-software-lima`: H1 geo-modificado ("Desarrollo de software a medida en Lima"), title/meta bien optimizados, canonical propio, `robots: index, follow`, ~2,760 palabras, secciones de sectores, casos con clientes limeños, precios en soles, FAQ — cumple el factor #1 de visibilidad en IA/local orgánico (dedicated service pages).
- Schema `FAQPage` + `BreadcrumbList` + `Service` presentes en la página de dinero, además del bloque `Organization/LocalBusiness/ProfessionalService`.
- NAP núcleo (teléfono +51 961 869 348, RUC 20616338782, email gerencia@árkos.com, ciudad Lima) consistente entre home, `/desarrollo-de-software-lima`, `/services` (mismo bloque `Organization` reutilizado) y `llms.txt` ("Cobertura: Lima y Callao — presencial agendado y remoto").
- El domicilio fiscal privado (La Libertad) NO se publica en ningún canal auditado — correcto, cumple la restricción explícita del cliente.
- Identidad legal completa en schema (RUC, razón social, taxID/vatID, NAICS/ISIC) — refuerza confianza B2B.

## Hallazgos

**1. [Critical] No existe Google Business Profile**
Confirmado por el cliente. No se detectó embed de Maps, `*.business.site`, ni referencias a fichas de Google en home, `/desarrollo-de-software-lima` ni `/services` (grep dirigido, 0 coincidencias). Sin GBP no hay Local Pack, y la categoría primaria de GBP es el factor #1 de ranking local (Whitespark 2026) — Árkos parte en cero frente a competidores como Vex Soluciones.
*Recomendación:* crear GBP como "Service Area Business" (ocultar dirección, tildar "atiendo en la ubicación de mis clientes"), definir áreas de servicio (Lima, Callao, distritos clave, Perú). Categoría primaria candidata: "Software company"; secundarias: "Computer consultant", "Website designer". Checklist abajo.

**2. [Critical] Reputación de reseñas prácticamente nula**
Clutch (`clutch.co/profile/rkos`, único perfil en `sameAs`) con 0 reseñas según contexto entregado; sin `aggregateRating` en schema; sin widget de reseñas en el sitio. Competidor Vex Soluciones reporta 4.9/110. Sin GBP, tampoco hay velocity de reseñas (regla de 18 días).
*Recomendación:* una vez creado GBP, activar solicitud sistemática de reseñas (cadencia ≥1/mes) en Google y LinkedIn recommendations; solicitar reseñas en Clutch a clientes ya entregados (>45 clientes declarados en llms.txt).

**3. [High] Posible inconsistencia de localidad en Clutch**
Según contexto del usuario, el perfil Clutch muestra Trujillo como ubicación, mientras el resto de fuentes (schema, llms.txt) declara Lima como sede operativa. No se verificó en vivo en esta sesión (ver Limitaciones).
*Recomendación:* actualizar el perfil Clutch a Lima, Perú; si se desea mencionar Trujillo, hacerlo solo como mercado atendido, nunca como sede.

**4. [High] Cero menciones de distritos de Lima/Callao**
Grep dirigido en home, `/desarrollo-de-software-lima` y `/services` no encontró San Isidro, Miraflores, Surco, San Borja, La Molina ni Cercado de Lima. Solo aparecen "Callao" y "Trujillo" a nivel de ciudad. Para un SAB que agenda reuniones presenciales en Lima/Callao, nombrar los distritos corporativos reales refuerza relevancia local y especificidad geográfica (factor citado en visibilidad IA).
*Recomendación:* añadir bloque "Distritos donde atendemos presencialmente" (San Isidro, Miraflores, Surco, San Borja, Callao) con 1-2 líneas de contexto cada uno, evitando doorway pages puras.

**5. [Medium] `geo` del schema apunta a coordenadas genéricas del centro de Lima**
`-12.0464, -77.0428` no corresponde a ninguna oficina real; para un SAB sin domicilio público, Google recomienda omitir `geo` en vez de simular precisión inexistente.
*Recomendación:* eliminar la propiedad `geo` del bloque `LocalBusiness` o documentar explícitamente que es una referencia de ciudad, no de oficina.

**6. [Medium] `areaServed` del schema no coincide con el copy visible**
El schema lista `Lima, Trujillo, Peru, Latinoamérica`; el copy de la página menciona "Lima, Callao, Trujillo, Arequipa y provincias". Callao y Arequipa faltan en el schema.
*Recomendación:* igualar el array `areaServed` al copy (agregar Callao como City al menos, dado que es la zona presencial secundaria declarada).

**7. [Medium] `sameAs` de la Organization muy delgado**
Solo incluye X/Twitter y Clutch. No hay LinkedIn Company Page (solo el LinkedIn personal del fundador en el nodo `Person`), ni Facebook, ni GitHub de la organización, ni GBP (no existe).
*Recomendación:* crear/enlazar LinkedIn Company Page de Árkos y añadirla a `sameAs`; es la citación de autoridad B2B más relevante en Perú y hoy no existe.

**8. [Low] Falta `openingHoursSpecification`**
Opcional para un SAB de agenda, pero ayuda a comunicar disponibilidad comercial.
*Recomendación:* agregar horario comercial (ej. lunes-viernes 9:00-18:00 hora Lima) o documentar como omisión intencional.

**9. [Info] Sin embeds de Maps ni enlaces sociales detectados en el HTML**
Grep dirigido no encontró `maps.google`, `goo.gl/maps`, `g.page`, `*.business.site`, `linkedin.com/company` ni `facebook.com` en home/`/desarrollo-de-software-lima`/`/services`. Consistente con ausencia de GBP; refuerza la necesidad de citaciones alternativas mientras no exista ficha.

## Checklist: creación de GBP para un SAB sin dirección pública

1. Elegir tipo de perfil "Área de servicio" (Service Area Business) — NO marcar "Los clientes visitan mi negocio".
2. Ocultar la dirección física (usarla solo internamente para verificación si Google la exige; nunca mostrarla, y menos aún el domicilio fiscal de La Libertad).
3. Definir áreas de servicio por distrito/ciudad, priorizando Lima y Callao (donde hay presencial agendado), y luego Perú/Latinoamérica en general.
4. Categoría primaria: "Software company" (la que más pesa en ranking); secundarias: "Computer consultant", "Website designer".
5. Teléfono: +51 961 869 348 (idéntico al del sitio); web: https://árkos.com.
6. Verificación: por video/llamada (estándar para SAB sin dirección visible) o por código postal si Google lo solicita.
7. Completar descripción del negocio, horario de atención (coherente con el punto 8 de arriba), y servicios (mapear 1:1 con `hasOfferCatalog` del schema).
8. Subir evidencia fotográfica de trabajo (capturas de producto, equipo, oficina si existe) — no depende de un local físico.
9. Activar Posts desde el día uno y mantener cadencia (mín. quincenal) para señal de actividad.
10. Plan de reseñas: solicitar a los >45 clientes ya entregados, con cadencia sostenida para evitar el "cliff" de 3 semanas sin reseñas (regla de 18 días).

## No evaluado (limitaciones de esta corrida)

- No se hizo fetch en vivo de `clutch.co/profile/rkos`, LinkedIn, GitHub org ni Facebook en esta sesión: los datos de Clutch (Trujillo, 0 reseñas) y del competidor Vex Soluciones (4.9/110) provienen del contexto entregado por el orquestador/usuario, no de verificación directa.
- No se ejecutó `gbp_deprecation_lint.py` (CTAs de chat GBP obsoletos, enlaces `*.business.site`) por límite de llamadas impuesto en esta corrida.
- No se cargó `skills/seo/references/local-schema-types.md` para contrastar el subtype exacto recomendado por vertical software/professional service.
- No se verificó posición real en el pack local ni SERP (no hay DataForSEO disponible en este entorno).
- No se auditaron citaciones Tier-1 específicas de Perú (Páginas Amarillas Perú, cámaras de comercio, directorios sectoriales de software) más allá de Clutch.
- No se muestrearon todas las páginas del sitio para consistencia del bloque `Organization`; solo home, `/desarrollo-de-software-lima` y `/services`.

```json
{"category":"Local SEO","score":33,"what_works":["Página de dinero dedicada /desarrollo-de-software-lima con H1 geo-modificado, ~2760 palabras, FAQPage+BreadcrumbList+Service schema y casos locales","NAP núcleo (teléfono, RUC, email, ciudad Lima) consistente entre home, /desarrollo-de-software-lima, /services y llms.txt","Domicilio fiscal privado (La Libertad) correctamente no publicado en ningún canal","Identidad legal completa en schema (RUC, razón social, taxID/vatID) que refuerza confianza B2B"],"findings":[{"title":"No existe Google Business Profile","severity":"Critical","description":"Confirmado por el cliente; sin embeds de Maps ni referencias a fichas de Google en el HTML de home/local-page/services. Sin GBP no hay Local Pack y se pierde el factor #1 de ranking local.","recommendation":"Crear GBP tipo Service Area Business, dirección oculta, áreas de servicio Lima/Callao/Perú, categoría primaria 'Software company'."},{"title":"Reputación de reseñas prácticamente nula","severity":"Critical","description":"Clutch con 0 reseñas, sin aggregateRating en schema, sin widget de reseñas visible; competidor Vex Soluciones tiene 4.9/110.","recommendation":"Activar solicitud sistemática de reseñas en GBP (tras crearlo), Clutch y LinkedIn, con cadencia mensual para evitar el cliff de 18 días."},{"title":"Posible inconsistencia de localidad en Clutch","severity":"High","description":"Según contexto entregado, el perfil Clutch muestra Trujillo mientras el resto de fuentes declara Lima como sede; no verificado en vivo en esta sesión.","recommendation":"Actualizar el perfil Clutch a Lima, Perú, coherente con schema y llms.txt."},{"title":"Cero menciones de distritos de Lima/Callao","severity":"High","description":"Grep dirigido en home, /desarrollo-de-software-lima y /services no encontró San Isidro, Miraflores, Surco, San Borja ni La Molina.","recommendation":"Añadir bloque de distritos donde se atiende presencialmente (San Isidro, Miraflores, Surco, Callao) en la página de dinero."},{"title":"Coordenadas geo genéricas sin oficina real","severity":"Medium","description":"El schema Organization incluye geo (-12.0464,-77.0428) apuntando al centro de Lima, sin vínculo a un domicilio real.","recommendation":"Eliminar la propiedad geo del bloque LocalBusiness, ya que no hay dirección pública que la respalde."},{"title":"areaServed del schema incompleto frente al copy","severity":"Medium","description":"El schema lista Lima, Trujillo, Peru, Latinoamérica; el copy visible menciona además Callao y Arequipa.","recommendation":"Igualar el array areaServed al copy, agregando Callao como City como mínimo."},{"title":"sameAs de la Organization muy delgado","severity":"Medium","description":"Solo incluye X/Twitter y Clutch; no hay LinkedIn Company Page, Facebook ni GitHub de la organización en el nodo Organization.","recommendation":"Crear y enlazar LinkedIn Company Page de Árkos en sameAs, la citación de autoridad B2B más relevante en Perú."},{"title":"Falta openingHoursSpecification","severity":"Low","description":"El bloque LocalBusiness no declara horario de atención comercial.","recommendation":"Agregar horario comercial o documentar la omisión como decisión intencional para un SAB con agenda."}]}
```
