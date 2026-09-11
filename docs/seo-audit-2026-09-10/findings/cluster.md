# Arquitectura de clústeres semánticos — Árkos (xn--rkos-4na.com)

Alcance: 2 semillas, mercado peruano en español. Metodología: expansión de keywords vía SERP real (WebSearch), solapamiento por dominios coincidentes en el top de resultados, agrupación hub-and-spoke, matriz de enlazado interno.

---

## Semilla 1: "adopción de IA en empresas Perú"

### Expansión de keywords (15) y clasificación de intención

| # | Keyword | Intención | Nota SERP |
|---|---|---|---|
| 1 | adopción de IA en empresas Perú | Informacional | Dominado por medios (Infobae, El Ecosistema Startup, PQS) y estadísticas 2025-2026 |
| 2 | inteligencia artificial para empresas Perú | Informacional/Comercial | Genérica, se solapa con #3 y #9 |
| 3 | implementar IA en pymes | Informacional | El Peruano, Kunan, LDX Software, BCP Consulting, Tooldata, Diginperu |
| 4 | cómo implementar IA en mi empresa | Informacional | Mismo clúster que #3 (guías "how-to") |
| 5 | capacitación en IA para empresas | Comercial | Dominado por proveedores de training: Miss Yera (x3), Tooldata, CPIA |
| 6 | asistente RAG empresa | Comercial/Transaccional | Infira, Lienzzo, SADSIA, D-IA, Miss Yera — nicho emergente |
| 7 | automatización con n8n Perú | Transaccional | Ozofy, SentryOpen, N8N Perú (comunidad), GrowthLab — agencias chicas, poca autoridad establecida |
| 8 | gobierno de IA | Informacional | Gestión.pe, Garrigues (legal), PQS, portal gob.pe (ENIA) — ángulo regulatorio |
| 9 | beneficios de la IA para empresas | Informacional | Se solapa con #1 y #2 |
| 10 | IA generativa para negocios Perú | Informacional/Comercial | Se solapa con #2 |
| 11 | consultoría en IA Perú | Transaccional | Se solapa con #6 (Infira, SADSIA aparecen en ambos) |
| 12 | automatización de procesos con IA | Comercial | Se solapa con #7 |
| 13 | chatbot IA empresas Perú | Comercial/Transaccional | Se solapa con #6/#7 (mismos players de agentes/automatización) |
| 14 | transformación digital con IA Perú | Informacional | Se solapa con #1 |
| 15 | casos de uso de IA en empresas | Informacional | Se solapa con #1/#9 |

**Navegacionales removidas:** ninguna (todas las variantes son genéricas, sin marca).

### Solapamiento de SERP observado (dominios compartidos en top de resultados)

| Par de keywords | Dominios compartidos | Score | Acción |
|---|---|---|---|
| "adopción de IA en empresas Perú" ↔ "gobierno de IA" | pqs.pe (mismo artículo de brecha de políticas) | 1 | Interlink |
| "capacitación en IA para empresas" ↔ "asistente RAG empresa" | missyera.com, tooldata.io | 2 | Interlink |
| "asistente RAG empresa" ↔ "consultoría en IA Perú" | infira.pe, sadsia.com (temática agentes/RAG) | 2 | Mismo clúster (temático, no URL exacta) |
| "automatización con n8n Perú" ↔ "automatización de procesos con IA" / "chatbot IA empresas Perú" | Sin URL exacta compartida, pero mismo set de agencias de automatización (Ozofy, SentryOpen, GrowthLab) | 1-2 (temático) | Interlink |
| "implementar IA en pymes" ↔ "adopción de IA en empresas Perú" | Sin dominios exactos compartidos | 0-1 | Separar (post how-to vs. post de panorama/estadísticas) |

**Conclusión de clustering:** el tema se divide naturalmente en dos ejes de intención — (A) informacional/estratégico (adopción, panorama, gobierno) y (B) comercial/transaccional (servicios de integración: RAG, n8n, chatbots, capacitación, consultoría). Esto valida usar **dos hubs** ya existentes para esta semilla: `/blog/adopcion-de-ia-en-empresas` (informacional) y `/services/integracion-ia` (comercial), enlazados bidireccionalmente entre sí.

---

## Semilla 2: "desarrollo de software a medida Lima"

### Expansión de keywords (15) y clasificación de intención

| # | Keyword | Intención | Nota SERP |
|---|---|---|---|
| 1 | desarrollo de software a medida Lima | Transaccional | Bertoni Solutions, ARSEC, PCEFACT, Wataweb, Vex Soluciones, Glajumedia |
| 2 | empresa de software Lima | Comercial/Transaccional | Solapa fuerte con #1: bertonisolutions.com, glajumedia.com, wataweb.com, vexsoluciones.com (4 dominios compartidos) |
| 3 | ERP a medida Perú | Comercial | Cosmoconsult, Latamready, Cimark, Adratechsystems, Bytepandabear, Cenesape, Alaz, Espacioerp |
| 4 | facturación electrónica SUNAT sistema | Comercial/Transaccional | Llama.pe, NubeFacT, portal SUNAT oficial, DNP Soft, Inticap, Facturantes, Keyfacil — sin solape con #1/#2 |
| 5 | CRM a medida Lima | Comercial | Simla, Sivi, Togrowagencia (solapa con #2), Adratechsystems (solapa con #3/#7), CRMPerú, Funnel |
| 6 | desarrollo de software a medida Perú | Transaccional | Variante casi duplicada de #1 — riesgo de canibalización |
| 7 | cuánto cuesta un sistema a medida | Informacional (bottom-funnel) | Altamira, BCP Consulting (solapa con #2), Websy, Grupo Hermoza, Bytepandabear (solapa con #3), Adratechsystems (solapa con #3/#5) |
| 8 | sistema de facturación electrónica Perú | Comercial | Mismo set que #4 |
| 9 | software personalizado para empresas Perú | Comercial | Solapa con #1/#2 |
| 10 | empresas de desarrollo de software Perú | Comercial (listicle) | Togrowagencia ("Las 6 mejores"), Developerperu, Infoisinfo — dominado por agregadores/listicles de terceros |
| 11 | sistema ERP Perú precio | Comercial | Mismo set que #3 |
| 12 | desarrollo de aplicaciones web Lima | Comercial | Solapa parcial con #1 |
| 13 | software a medida vs software estándar | Informacional | Comparativo, bajo volumen de competidores dedicados |
| 14 | mejor empresa de desarrollo de software Lima | Comercial | Mismo set que #10 |
| 15 | sistema de gestión empresarial Perú | Comercial | Solapa con #3/#11 |

**Navegacionales removidas:** ninguna directa a marca de competidor.

### Solapamiento de SERP observado

| Par de keywords | Dominios compartidos | Score | Acción |
|---|---|---|---|
| "desarrollo de software a medida Lima" ↔ "empresa de software Lima" | bertonisolutions.com, glajumedia.com, wataweb.com, vexsoluciones.com | 4 | **Mismo clúster** (umbral 4-6) |
| "ERP a medida Perú precio" ↔ "cuánto cuesta un sistema a medida" | bytepandabear.com, adratechsystems.com | 2 | Interlink |
| "CRM a medida Lima" ↔ "cuánto cuesta un sistema a medida" | adratechsystems.com | 1 | Interlink |
| "CRM a medida Lima" ↔ "empresa de software Lima" | togrowagencia.com | 1 | Interlink |
| "facturación electrónica SUNAT sistema" ↔ "desarrollo de software a medida Lima" | 0 dominios compartidos | 0 | Clúster separado |
| "empresas de desarrollo de software Perú" ↔ "mejor empresa de desarrollo de software Lima" | togrowagencia.com, developerperu.com (mismo tipo de listicle) | 2-3 | Mismo clúster/interlink |

**Conclusión de clustering:** la semilla se divide en **tres clústeres**: (A) página de conversión "desarrollo de software a medida" (transaccional puro, Lima + Perú), (B) costos/ERP/CRM (comercial, contenido de precios), y (C) facturación electrónica SUNAT (comercial, cero solape con A/B — vertical propia por el ángulo de cumplimiento que ya usa Árkos).

---

## Chequeo de canibalización

1. **`/desarrollo-de-software-lima` vs. `/services/software-a-medida`** — ambas páginas compiten potencialmente por la misma intención transaccional ("desarrollo de software a medida"). Recomendación: `/desarrollo-de-software-lima` se queda como landing local (testimonios, CTA, foco Lima); `/services/software-a-medida` se reposiciona como página de capacidades/servicio (alcance Perú, sin duplicar el H1/title). Enlazar cruzado, no fusionar.
2. **`/blog/desarrollo-software-a-medida-en-peru` vs. `/desarrollo-de-software-lima`** — frase casi idéntica. Recomendación: el post de blog debe pivotar a ángulo educativo ("qué es, etapas del proceso, cuándo conviene") y enlazar de forma prominente hacia la landing transaccional, en vez de competir por el mismo title/H1.
3. **"desarrollo de software a medida Lima" vs. "…Perú"** (keyword #1 y #6 de semilla 2) — mismo intento, distinto alcance geográfico. Si Árkos atiende clientes fuera de Lima, evaluar si la landing debe ampliar su alcance o si se justifica una página nacional adicional (no urgente).
4. **"empresa de software Lima" / "mejor empresa de desarrollo de software Lima" / "empresas de desarrollo de software Perú"** — sin página propia dedicada; el SERP está ocupado por listicles de terceros (Togrowagencia, Developerperu, Infoisinfo) no por competidores directos. Oportunidad, no canibalización.
5. Ningún par de keywords de la semilla 1 muestra riesgo de canibalización interna (los hubs ya existentes separan bien informacional vs. comercial).

---

## Arquitectura Hub-and-Spoke (5 clústeres)

### Clúster 1 — IA: Adopción y estrategia (informacional)
**Hub:** `/blog/adopcion-de-ia-en-empresas` (existente)
- Spokes existentes: ninguno directo; enlaza obligatoriamente a `/services/integracion-ia` y recomienda `/diagnostico` como CTA.
- Spokes faltantes:
  1. "Cómo implementar IA en tu pyme en Perú: guía paso a paso" — Informacional — **Alta**
  2. "Gobierno de IA y ENIA: qué debe cumplir tu empresa en Perú" — Informacional — **Alta** (timely: Estrategia Nacional de IA 2026-2030; refuerza el posicionamiento de cumplimiento que Árkos ya tiene con SUNAT)
  3. "Beneficios de la IA para empresas peruanas: casos de uso por sector" — Informacional — Media

### Clúster 2 — IA: Servicios de integración (comercial/transaccional)
**Hub:** `/services/integracion-ia` (existente)
- Spokes existentes: ninguno; enlaza obligatoriamente a `/blog/adopcion-de-ia-en-empresas` y a `/diagnostico`.
- Spokes faltantes:
  1. "Automatización con n8n para empresas en Perú: casos y precios" — Transaccional — **Alta**
  2. "Asistente RAG para tu empresa: qué es y cuánto cuesta implementarlo en Perú" — Comercial/Transaccional — **Alta**
  3. "Chatbot con IA para empresas en Perú: WhatsApp y web" — Comercial — Media
  4. "Capacitación en IA para empresas: cómo preparar a tu equipo" — Comercial — Media

### Clúster 3 — Software a medida (transaccional / money page)
**Hub:** `/desarrollo-de-software-lima` (existente)
- Spokes existentes: `/services/software-a-medida` (ver canibalización #1), `/blog/desarrollo-software-a-medida-en-peru` (ver canibalización #2), `/blog/5-senales-tu-negocio-necesita-un-sistema`, `/necesitas-un-sistema`, `/diagnostico`, `/portfolio/19` (RestHUB), `/portfolio/2` (Solutec).
- Spokes faltantes:
  1. "Cómo elegir una empresa de desarrollo de software a medida en Lima: checklist" — Comercial — **Alta** (SERP ocupado por listicles de terceros, sin contenido propio de Árkos)
  2. "Desarrollo de aplicaciones web a medida en Lima: cuándo elegirlo sobre un sistema completo" — Comercial — Media
  3. "Software a medida vs. software estándar: cuál conviene a tu empresa en Perú" — Informacional — Media

### Clúster 4 — Costos: ERP y CRM a medida (comercial)
**Hub:** `/precios` (existente)
- Spokes existentes: `/costo-del-excel`, `/portfolio/2` (Solutec, prueba de ERP a medida), `/diagnostico`.
- Spokes faltantes:
  1. "Cuánto cuesta un sistema a medida en Perú: guía de precios 2026" — Informacional — **Alta** (keyword muy disputada por 7+ guías de competidores; Árkos no tiene contenido propio pese a tener `/precios`)
  2. "¿Cuánto cuesta un ERP a medida en Perú? Rangos de precio 2026" — Comercial — **Alta**
  3. "CRM a medida vs. CRM en la nube: costos y cuándo conviene en Perú" — Comercial — Media

### Clúster 5 — Cumplimiento SUNAT / Facturación electrónica (comercial)
**Hub:** `/cumplimiento-sunat` (existente)
- Spokes existentes: `/portfolio/2` (Solutec), `/diagnostico`.
- Spokes faltantes:
  1. "Sistema de facturación electrónica y SUNAT: qué exige la ley y cómo cumplir con un sistema a medida" — Comercial — **Alta** (diferencia a Árkos de proveedores de solo-facturación como NubeFacT/DNP Soft)
  2. "Facturador SUNAT gratuito vs. sistema a medida con facturación integrada: pros y contras" — Informacional/Comercial — Media

---

## Matriz de enlazado interno

Leyenda: **M** = obligatorio (bidireccional spoke↔hub), **R** = recomendado (spoke↔spoke, mismo clúster), **O** = opcional (cross-cluster).

| Página | Enlaza obligatorio a | Enlaces recomendados (mismo clúster) | Enlaces opcionales (cross-cluster) |
|---|---|---|---|
| `/blog/adopcion-de-ia-en-empresas` (hub C1) | `/services/integracion-ia` (M) | spokes nuevos de C1 | `/cumplimiento-sunat` (ángulo "gobierno de IA" ↔ cumplimiento) |
| `/services/integracion-ia` (hub C2) | `/blog/adopcion-de-ia-en-empresas` (M), `/diagnostico` (M) | spokes nuevos de C2 | `/desarrollo-de-software-lima` |
| Spoke "Cómo implementar IA en tu pyme" | `/blog/adopcion-de-ia-en-empresas` (M) | "Beneficios de la IA…", `/services/integracion-ia` (R) | — |
| Spoke "Gobierno de IA y ENIA" | `/blog/adopcion-de-ia-en-empresas` (M) | — | `/cumplimiento-sunat` (O) |
| Spoke "Automatización con n8n" | `/services/integracion-ia` (M) | "Asistente RAG…", "Chatbot con IA…" (R) | — |
| Spoke "Asistente RAG para tu empresa" | `/services/integracion-ia` (M) | "Automatización con n8n…", "Capacitación en IA…" (R) | — |
| `/desarrollo-de-software-lima` (hub C3) | `/services/software-a-medida` (M), `/diagnostico` (M) | resto de spokes C3 | `/precios`, `/cumplimiento-sunat` |
| `/blog/desarrollo-software-a-medida-en-peru` | `/desarrollo-de-software-lima` (M) | `/necesitas-un-sistema`, "5 señales…" (R) | — |
| Spoke "Cómo elegir una empresa de desarrollo de software a medida en Lima" | `/desarrollo-de-software-lima` (M) | `/portfolio/19`, `/portfolio/2` (R) | — |
| `/precios` (hub C4) | `/desarrollo-de-software-lima` (M), `/diagnostico` (M) | `/costo-del-excel`, spokes nuevos C4 | — |
| Spoke "Cuánto cuesta un ERP a medida" | `/precios` (M) | "Cuánto cuesta un sistema a medida…", "CRM a medida vs. CRM en la nube" (R) | `/portfolio/2` (O) |
| `/cumplimiento-sunat` (hub C5) | `/desarrollo-de-software-lima` (M), `/diagnostico` (M) | spokes nuevos C5 | "Gobierno de IA y ENIA" (O) |
| `/diagnostico` | — (es el CTA terminal) | — | recibe enlace desde **todos** los spokes comerciales/transaccionales (M) |

Ninguna página queda huérfana: todos los spokes nuevos reciben como mínimo 1 enlace obligatorio del hub + 1-2 recomendados; los hubs existentes concentran ≥3 enlaces entrantes una vez publicados los spokes faltantes.

---

## Oportunidades priorizadas (mayor brecha de contenido vs. demanda real)

1. **"cuánto cuesta un sistema a medida" / "ERP a medida Perú precio"** — alta demanda, 7+ guías de terceros rankeando, Árkos tiene `/precios` pero sin contenido de blog que capture la búsqueda informacional previa a la conversión.
2. **"automatización con n8n Perú"** — keyword en crecimiento, SERP dominado por agencias pequeñas sin autoridad consolidada (Ozofy, SentryOpen, GrowthLab); Árkos ya tiene el servicio (`/services/integracion-ia`) pero cero contenido dedicado.
3. **"gobierno de IA" / cumplimiento ENIA** — oportunidad regulatoria de alto timing (Estrategia Nacional de IA 2026-2030 recién publicada), SERP ocupado por estudios legales y el portal del Estado, no por proveedores de software; encaja directamente con el diferencial de "cumplimiento" que Árkos ya usa para SUNAT.

```json
{"category":"Content Clusters","clusters":[{"hub":"/blog/adopcion-de-ia-en-empresas","spokes_existing":[],"spokes_missing":[{"title":"Cómo implementar IA en tu pyme en Perú: guía paso a paso","intent":"Informational","priority":"High"},{"title":"Gobierno de IA y ENIA: qué debe cumplir tu empresa en Perú","intent":"Informational","priority":"High"},{"title":"Beneficios de la IA para empresas peruanas: casos de uso por sector","intent":"Informational","priority":"Medium"}]},{"hub":"/services/integracion-ia","spokes_existing":[],"spokes_missing":[{"title":"Automatización con n8n para empresas en Perú: casos y precios","intent":"Transactional","priority":"High"},{"title":"Asistente RAG para tu empresa: qué es y cuánto cuesta implementarlo en Perú","intent":"Commercial","priority":"High"},{"title":"Chatbot con IA para empresas en Perú: WhatsApp y web","intent":"Commercial","priority":"Medium"},{"title":"Capacitación en IA para empresas: cómo preparar a tu equipo","intent":"Commercial","priority":"Medium"}]},{"hub":"/desarrollo-de-software-lima","spokes_existing":["/services/software-a-medida","/blog/desarrollo-software-a-medida-en-peru","/blog/5-senales-tu-negocio-necesita-un-sistema","/necesitas-un-sistema","/diagnostico","/portfolio/19","/portfolio/2"],"spokes_missing":[{"title":"Cómo elegir una empresa de desarrollo de software a medida en Lima: checklist","intent":"Commercial","priority":"High"},{"title":"Desarrollo de aplicaciones web a medida en Lima: cuándo elegirlo sobre un sistema completo","intent":"Commercial","priority":"Medium"},{"title":"Software a medida vs. software estándar: cuál conviene a tu empresa en Perú","intent":"Informational","priority":"Medium"}]},{"hub":"/precios","spokes_existing":["/costo-del-excel","/portfolio/2","/diagnostico"],"spokes_missing":[{"title":"Cuánto cuesta un sistema a medida en Perú: guía de precios 2026","intent":"Informational","priority":"High"},{"title":"¿Cuánto cuesta un ERP a medida en Perú? Rangos de precio 2026","intent":"Commercial","priority":"High"},{"title":"CRM a medida vs. CRM en la nube: costos y cuándo conviene en Perú","intent":"Commercial","priority":"Medium"}]},{"hub":"/cumplimiento-sunat","spokes_existing":["/portfolio/2","/diagnostico"],"spokes_missing":[{"title":"Sistema de facturación electrónica y SUNAT: qué exige la ley y cómo cumplir con un sistema a medida","intent":"Commercial","priority":"High"},{"title":"Facturador SUNAT gratuito vs. sistema a medida con facturación integrada: pros y contras","intent":"Informational","priority":"Medium"}]}],"findings":[{"title":"Canibalización potencial entre /desarrollo-de-software-lima y /services/software-a-medida","severity":"Medium","description":"Ambas páginas compiten por la intención transaccional de 'desarrollo de software a medida', sin diferenciación clara de title/H1 observada en el brief.","recommendation":"Definir /desarrollo-de-software-lima como landing local transaccional y /services/software-a-medida como página de capacidades/alcance Perú; enlazar cruzado, no fusionar."},{"title":"Canibalización potencial entre /blog/desarrollo-software-a-medida-en-peru y la landing de dinero","severity":"Medium","description":"El título del post de blog es casi idéntico a la keyword objetivo de /desarrollo-de-software-lima.","recommendation":"Reposicionar el post como contenido educativo ('qué es y cómo funciona') y reforzar el enlace obligatorio hacia la landing transaccional."},{"title":"Sin contenido propio en el clúster de precios (ERP/CRM/sistema a medida)","severity":"High","description":"'Cuánto cuesta un sistema a medida', 'ERP a medida Perú precio' y keywords relacionadas están dominadas por 7+ guías de precios de competidores; Árkos solo tiene /precios sin blog de soporte.","recommendation":"Publicar los 3 spokes faltantes del Clúster 4 y enlazarlos obligatoriamente a /precios y /diagnostico."},{"title":"Oportunidad de timing en gobierno de IA (ENIA 2026-2030)","severity":"Low","description":"El SERP de 'gobierno de IA' está ocupado por estudios legales y el portal del Estado, no por proveedores de software; ningún competidor directo de Árkos posee contenido dedicado.","recommendation":"Publicar el spoke 'Gobierno de IA y ENIA' pronto para capturar la demanda temprana y reforzar el posicionamiento de cumplimiento (enlace cruzado con /cumplimiento-sunat)."},{"title":"Vacío de contenido en intención de comparación 'mejor empresa de desarrollo de software Lima'","severity":"Medium","description":"El SERP está dominado por listicles de agencias de contenido/SEO (Togrowagencia, Developerperu, Infoisinfo), no por competidores directos de desarrollo de software.","recommendation":"Publicar el spoke 'Cómo elegir una empresa de desarrollo de software a medida en Lima: checklist' para capturar tráfico de consideración antes de que lo haga un agregador de terceros."}]}
```
