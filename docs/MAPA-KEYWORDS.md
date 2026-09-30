# Mapa de keywords por URL — árkos.com

30-sep-2026. Medido contra producción (36 URLs del sitemap) y los enlaces internos en vivo.

**Regla del mapa:** la home es la entidad ("mejora de procesos y adopción de IA", decisión del 30-sep; el título no se toca). Cada término tiene **un solo dueño comercial**; lo informacional vive en el blog y enlaza al dueño con un ancla que nombra el término.

Fuente de semillas: `docs/keywords-arkos.xlsx` (4-ago). Es anterior al giro "procesos primero" del 23-sep y no trae el clúster de procesos/automatización/adopción: las semillas nuevas van al final.

## Los cuatro términos

| Término | Dueño comercial | Apoyo informacional | Quién compite hoy | Cambio |
|---|---|---|---|---|
| **Mejora de procesos** | `/` (entidad) y `/diagnostico` (comercial: diagnóstico de procesos) | `/costo-del-excel`, `/necesitas-un-sistema`, `/blog/5-senales-tu-negocio-necesita-un-sistema` | Nadie, pero `/diagnostico` se titula "Diagnóstico de **sistemas**": el término solo está en la home | Título de `/diagnostico` → "Diagnóstico de procesos y sistemas para tu empresa \| Árkos" (`app/diagnostico/page.tsx:23,28`) |
| **Adopción de IA** | `/taller` (formación) | `/blog/adopcion-de-ia-en-empresas` | `/services/integracion-ia` ("Integración y **adopción de IA para empresas en Perú**") casi calca el título de la home; `/services` también lo lleva. El blog tiene solo 2 enlaces internos | Sacar "adopción" de los títulos de `/services/integracion-ia` y `/services` |
| **Automatización** | `/services/integracion-ia` | `/blog/adopcion-de-ia-en-empresas` (sección qué no automatizar) | Ningún título lo dice. Las 43 anclas hacia el servicio (desde 35 páginas) lo nombran "IA aplicada y adopción" | `metaTitle` → "Automatización de procesos e integración de IA en Perú \| Árkos"; `navTitle` → "Automatización e IA" (`data/services.ts:372,375`, arrastra footer y listas) |
| **Software a medida** | `/services/software-a-medida` (Perú) y `/desarrollo-de-software-lima` (Lima) | `/precios` (costo), `/blog/desarrollo-software-a-medida-en-peru` (qué es) | El blog guía sale **8.º en "desarrollo de software lima"** (captura del 30-sep, sin personalizar), no la página de Lima, aunque esta recibe enlaces de 35 páginas y aquel de 1. Blog y servicio comparten cabeza de título | **Ninguno por ahora.** Lo que posiciona no se toca. Mirar en Search Console → Rendimiento → esa consulta → pestaña Páginas si alternan dos URLs; solo entonces actuar |

Título de `/services` → "Servicios: software a medida, automatización e IA en Perú \| Árkos" (`app/services/page.tsx:8,17`).

### Antes → después esperado (títulos en vivo)

- Títulos con "adopción de IA": **4** (home, `/services`, `/services/integracion-ia`, blog) → **2** (home, blog) + `/taller`.
- Títulos con "automatización": **0** → **2**.
- Títulos con "procesos": **1** (home) → **3**.
- Nombre del servicio en las 43 anclas internas hacia `/services/integracion-ia`: "IA aplicada y adopción" → "Automatización e IA".

## Todas las URLs

| URL | Intención principal | Término del grafo |
|---|---|---|
| `/` | Árkos: mejora de procesos y adopción de IA en Perú (marca) | entidad |
| `/taller` | taller / capacitación de IA para equipos de empresa | adopción de IA |
| `/diagnostico` | diagnóstico de procesos y sistemas para empresa | mejora de procesos |
| `/services` | servicios de desarrollo de software en Perú (hub) | todos |
| `/services/integracion-ia` | automatización de procesos e integración de IA | automatización |
| `/services/software-a-medida` | software a medida Perú, ERP/CRM a medida | software a medida |
| `/desarrollo-de-software-lima` | desarrollo de software / empresa de software Lima | software a medida (local) |
| `/precios` | cuánto cuesta el software a medida en Perú | software a medida (costo) |
| `/services/desarrollo-web` | desarrollo web Perú | capacidad |
| `/services/apps-moviles` | desarrollo de apps iOS/Android Perú | capacidad |
| `/services/diseno-ux-ui` | diseño UX/UI Perú | capacidad |
| `/services/ecommerce` | tienda online Perú con pagos locales y SUNAT | capacidad |
| `/facturarkos` | facturación electrónica SUNAT y POS para mypes | producto |
| `/cumplimiento-sunat` | autoevaluación de cumplimiento SUNAT | herramienta |
| `/costo-del-excel` | cuánto cuesta operar con Excel | mejora de procesos (informacional) |
| `/necesitas-un-sistema` | ¿mi negocio necesita un sistema? | mejora de procesos (informacional) |
| `/portfolio` | proyectos / casos de Árkos | prueba |
| `/portfolio/19` RestHUB | ERP y POS para restaurantes (caso) | prueba · software a medida |
| `/portfolio/2` Solutec DHA | CRM para servicio técnico (caso) | prueba · software a medida |
| `/portfolio/28` Precio Vivo | datos de precios de alimentos (caso) | prueba |
| `/portfolio/29` Precio Justo | comparador de precios de medicamentos (caso) | prueba |
| `/portfolio/26` Meridiano | web para operador logístico (caso) | prueba · capacidad web |
| `/portfolio/27` Trama | web para estudio creativo (caso) | prueba · capacidad web |
| `/portfolio/30` RutaPro | ruteo y prueba de entrega (caso) | prueba · automatización |
| `/portfolio/31` RIVET | plataforma de formación interna (caso) | prueba · adopción |
| `/portfolio/32` SignMed | modelo de ML auditado (caso) | prueba · IA |
| `/blog` | índice del blog | — |
| `/blog/desarrollo-software-a-medida-en-peru` | qué es el software a medida en Perú (guía) | software a medida (informacional) |
| `/blog/adopcion-de-ia-en-empresas` | cómo lograr que el equipo adopte la IA | adopción de IA (informacional) |
| `/blog/5-senales-tu-negocio-necesita-un-sistema` | señales de que necesito un sistema | mejora de procesos (informacional) |
| `/blog/como-disenamos-pms-alquileres-vacacionales` | PMS para alquiler vacacional (caso) | prueba |
| `/blog/solutec-system-crm-gestion-clientes-react` | CRM de servicio técnico (caso) | prueba; duplica `/portfolio/2` |
| `/blog/diseno-web-productora-audiovisual-nawi` | web para productora audiovisual (caso) | prueba · capacidad web |
| `/blog/sistema-registro-simposio-veterinario` | sistema de registro de eventos (caso) | prueba |
| `/terminosycondiciones`, `/politicadeprivacidad` | legal | — |

Hueco conocido, fuera de este mapa: los casos se titulan "X — Caso de estudio" sin industria. Van con las páginas por industria, que solo se crean donde hay un caso real detrás.

## Semillas nuevas (clúster procesos/IA, para Keyword Planner)

mejora de procesos empresas peru · consultoria de procesos lima · diagnostico de procesos empresa · automatizacion de procesos peru · automatizacion con n8n peru · automatizar procesos con ia · capacitacion en ia para empresas peru · taller de ia para empresas lima · adopcion de ia en empresas · como implementar ia en mi empresa

## Lo que este mapa no hace

- No cambia el título de la home.
- No toca el blog guía de software a medida.
- No crea páginas por ciudad ni por industria sin experiencia real detrás.
