# Auditoría SXO — árkos.com (xn--rkos-4na.com)

**SXO Gap Score: 55/100** (separado del SEO Health Score; mide ajuste entre lo que Google premia en el SERP y lo que la página ofrece)

Metodología: se renderizaron 6 páginas propias con `render_page.py --mode auto` + `parse_html.py` (title, H1/H2/H3, meta, schema, CTAs, prueba social) y se analizó Google (resultados orgánicos, no georestringidos a PE) para 8 combinaciones página↔consulta con `WebSearch`.

## Hallazgo principal

La mitad de los 8 pares página↔consulta objetivo tiene **desajuste de tipo de página**: Árkos publica páginas comerciales/consultivas bien construidas para consultas donde Google premia otro formato (listicles "mejores empresas", noticias/guías educativas sobre IA, o productos SaaS listos para comprar). El problema no es la calidad on-page — que es alta (precios reales en soles, testimonios con nombre y foto, WhatsApp pre-rellenado, schema FAQPage/LocalBusiness/Article completo) — sino que esas páginas compiten en un formato que el SERP no está premiando para esa frase exacta.

## Tabla página / consulta / tipo dominante / ajuste

| Página | Consulta objetivo | Tipo dominante en SERP | Ajuste |
|---|---|---|---|
| `/` | "empresa de software Lima" | Listicle/directorio ("Top 6/15 mejores empresas de software") + algunas homepages de agencia | **HIGH mismatch** |
| `/` | "Árkos software" | Página de marca/empresa (branded) | ALIGNED (Árkos ya aparece, posición ~2) |
| `/desarrollo-de-software-lima` | "desarrollo de software a medida Lima" | Landing comercial de agencia local (servicio + casos + FAQ) | ALIGNED |
| `/services/integracion-ia` | "adopción de IA en empresas Perú" | Noticias/informes de mercado (Infobae, medios) + guías | **CRITICAL mismatch** |
| `/services/integracion-ia` | "implementar IA en mi empresa" | Guía/how-to educativo (HP, ADEN, blogs universitarios) | **HIGH mismatch** |
| `/precios` | "cuánto cuesta un sistema a medida en Perú" | Guía de precios de agencias competidoras (tabla + factores + FAQ) | ALIGNED (mismo formato que la competencia) |
| `/diagnostico` | "necesito un sistema para mi negocio" | Producto SaaS listo (POS/ERP) + listicle comparativo "10 mejores ERP" | **CRITICAL mismatch** |
| `/blog/adopcion-de-ia-en-empresas` | "cómo capacitar a mi equipo en IA" | Guía/blog educativo (escuelas de negocio, blogs) | ALIGNED (con brecha menor de frase exacta) |

**4 de 8 pares están alineados; 4 tienen desajuste (1 crítico duro, 1 crítico de formato, 2 altos).**

## Historias de usuario (derivadas de señales del SERP)

1. *Como dueño de un restaurante que ya no puede controlar todo en Excel, quiero saber cuánto cuesta un sistema a medida en soles antes de hablar con nadie, para decidir si es viable.* (Awareness/Consideration) — evidencia: el SERP de "cuánto cuesta un sistema a medida en Perú" está dominado por guías con tabla de precios y FAQ (altamira.pe, bcpconsulting, websy.com.pe); `/precios` responde exactamente en ese formato, con rangos en S/ y USD.
2. *Como gerente de área que evalúa IA, quiero entender primero qué significa "adoptar IA" de verdad —no solo comprar una herramienta— antes de hablar con un proveedor.* (Awareness) — evidencia: el SERP de "adopción de IA en empresas Perú" lo dominan notas de prensa (Infobae: "pilotos aislados y sin gobernanza") y guías de mercado, no páginas de venta; el asset de Árkos que mejor calza con esa intención es el blog post, no `/services/integracion-ia`.
3. *Como administrador/contador, quiero verificar en minutos si mi facturación y libros electrónicos cumplen con SUNAT antes de comprometerme con un proyecto grande.* (Consideration) — evidencia: "cumplimiento SUNAT" aparece en el meta description y en un H2 de prácticamente todas las páginas auditadas, y existe una herramienta de autoevaluación ("Assessment SUNAT") enlazada desde el footer.
4. *Como dueño de pyme que busca "necesito un sistema para mi negocio", quiero comparar primero opciones ya armadas y baratas (POS, ERP) antes de considerar algo a medida, porque eso es lo primero que me muestra Google.* (Decision, pre-compra) — evidencia: el SERP de esa frase lo ocupan productos SaaS (Wally, PANCA, INVY) y un listicle "10 mejores ERP para Pymes"; `/diagnostico` no compite en ese formato de comparación de productos.
5. *Como gerente de área que ya decidió explorar IA, quiero llevar una propuesta concreta con precio y casos reales a mi jefe, no solo agendar una llamada.* (Decision) — evidencia positiva: `/services/integracion-ia` sí resuelve esto con "Proyectos donde ya lo hicimos" y el CTA "Descargar Brochure Corporativo" presente en todas las páginas.

## Puntuación por persona (Relevancia / Claridad / Confianza / Acción, 25 pts c/u)

| Persona | Relevancia | Claridad | Confianza | Acción | Total |
|---|---|---|---|---|---|
| **Dueño de pyme** (restaurante/servicio técnico) | 15/25 — pierde relevancia si llega por "necesito un sistema" esperando un producto listo | 20/25 — lenguaje sin jerga, ejemplos concretos (RestHUB, FacturArkos) | 18/25 — testimonios reales solo en home, no en `/precios` ni `/diagnostico` | 20/25 — WhatsApp pre-rellenado, dos niveles de diagnóstico claros | **73/100** |
| **Gerente de área** evaluando adopción de IA | 17/25 — la página comercial se adelanta a vender donde el SERP aún espera contenido educativo | 21/25 — six-step framework claro en el blog, entregables claros en el service page | 16/25 — buena credencial del fundador (schema EducationalOccupationalCredential) pero sin logos de empresas medianas reconocibles | 19/25 — brochure descargable resuelve bien la etapa de "llevar propuesta al jefe" | **73/100** |
| **Contador/administrador** (preocupado por SUNAT) | 23/25 — SUNAT mencionado de forma consistente en casi toda página auditada | 22/25 — ejemplos específicos (boletas, libros electrónicos, validación de identidad) | 20/25 — caso de estudio dedicado (FacturArkos) + herramienta de autoevaluación | 18/25 — el Assessment SUNAT es una acción de bajo compromiso ideal, pero ninguna consulta objetivo del set lo tiene como página de aterrizaje dedicada | **83/100** |

El contador/administrador es la persona mejor servida —irónicamente sin tener un par página↔consulta dedicado en el set analizado—. Las recomendaciones deben priorizarse primero para **dueño de pyme** y **gerente de área** (empatados en 73/100, ambos con Relevancia como el sub-score más débil, es decir: el problema no es el contenido sino a qué consulta se lo está apuntando).

## Hallazgos con severidad

### 1. CRITICAL — `/diagnostico` apunta a una consulta con intención de "producto listo", no de consultoría a medida
**Evidencia:** el SERP de "necesito un sistema para mi negocio" está ocupado por POS/ERP SaaS comprables directo (Wally, PANCA Negocios S/119/mes, INVY) y un listicle comparativo "10 mejores ERP para Pymes" (comparasoftware.pe). `/diagnostico` ofrece una llamada de 30 min gratis o un diagnóstico pagado de S/950 — un formato de consultoría que no compite estructuralmente contra fichas de producto y comparativas.
**Recomendación:** no forzar `/diagnostico` contra esta frase. Crear contenido comparativo tipo "Sistema a medida vs. software listo (POS/ERP): cuál te conviene" que capture esa intención híbrida y enlace desde ahí al diagnóstico, o retargetear `/diagnostico` a consultas de intención más consultiva ("diagnóstico de sistema para mi negocio Perú").

### 2. CRITICAL/HIGH — `/services/integracion-ia` compite con precio contra un SERP 100% informativo/noticioso
**Evidencia:** tanto "adopción de IA en empresas Perú" (dominado por Infobae, Cadena Láser, Tooldata) como "implementar IA en mi empresa" (HP, ADEN Business Magazine, blogs universitarios) muestran SERPs de noticias y guías educativas, no páginas de venta con precio ("Desde S/ 1,900" ya en el H1/meta description). Mientras tanto, Árkos ya tiene el asset correcto —el blog post `/blog/adopcion-de-ia-en-empresas`— pero está emparejado solo con "cómo capacitar a mi equipo en IA".
**Recomendación:** reasignar estas dos consultas informativas al blog (ampliarlo o crear una segunda pieza tipo "qué es adoptar IA de verdad en una empresa peruana"), dejando `/services/integracion-ia` para consultas ya transaccionales ("contratar implementación de IA para empresa", "precio integración IA empresa Perú").

### 3. HIGH — Homepage no puede ganarle a un listicle en una consulta de categoría genérica
**Evidencia:** "empresa de software Lima" está dominado por artículos tipo "Top 6/15 mejores empresas de software en Lima" (togrowagencia, itoeste) y agregadores, no por homepages individuales de proveedor.
**Recomendación:** no esperar que `/` rankee #1 ahí; jugar a aparecer *dentro* de esos listicles (RP digital / outreach) en vez de competir de frente con la homepage.

### 4. MEDIUM — Prueba social verificable (nombre + foto + métrica) vive solo en la home
**Evidencia:** `/precios`, `/diagnostico`, `/services/integracion-ia` y el blog no muestran testimonios con foto en el cuerpo (0 imágenes `/testimonials/` detectadas); `/desarrollo-de-software-lima` sí tiene 2 citas textuales de clientes pero sin foto. Home sí tiene testimonio con foto + métrica ("78% de citas gestionadas digitalmente", Clínica Juan Pablo II).
**Recomendación:** insertar 1 testimonio con foto relevante al tema de cada página (ej. cita de un cliente PYME en `/diagnostico`, cita de un cliente que mide ROI de IA en `/services/integracion-ia`), ya que gran parte del tráfico de búsqueda entra directo a la subpágina, no a la home.

### 5. MEDIUM — Brecha de frase exacta en el blog de adopción de IA
**Evidencia:** el H1/title del blog es "Adopción de IA en empresas: cómo lograr que tu equipo la use de verdad (y cómo medirlo)"; la consulta objetivo es "cómo capacitar a mi equipo en IA", y aunque el contenido sí cubre formación (H2 "Cómo hacer que tu equipo use la IA de verdad: seis pasos"), la frase "capacitar a tu equipo" no aparece en H1 ni en ningún H2.
**Recomendación:** agregar un H2/sección explícita "Cómo capacitar a tu equipo en IA" (aunque sea reformulando el paso de formación existente) para cerrar el gap de coincidencia de frase sin duplicar contenido.

### 6. LOW — Falta schema Review/AggregateRating pese a tener testimonios reales
**Evidencia:** los 6 bloques de `structured_data` revisados cubren LocalBusiness, ProfessionalService, FAQPage, Article, BreadcrumbList y credenciales del fundador (Person + EducationalOccupationalCredential), pero ningún tipo `Review` o `AggregateRating`.
**Recomendación:** de baja prioridad para B2B, pero fácil de sumar sobre los testimonios ya existentes en home si se busca reforzar rich results.

### 7. INFO — Namespace de marca compartido en el SERP
**Evidencia:** "Árkos software Peru" comparte resultados con "Arkano Software" (LinkedIn/X), "ArkOS" (SourceForge), "Arkeia Software" (Wikipedia) y "arkos-studio.vercel.app" (herramientas de IA para arquitectos, proyecto de terceros según memoria del usuario). La consulta exacta "Árkos software" ya resuelve bien (posición ~2), pero variantes de cola larga podrían diluirse.
**Recomendación:** monitorear, no accionar de inmediato; reforzar señales de entidad única (ya cubierto en auditoría GEO previa).

## Lo que ya funciona (no tocar)

- Precios reales en soles con rangos "desde" (S/ 1,100–13,000+), coincidiendo con el formato exacto que usan las guías que dominan esa SERP.
- Testimonios reales con nombre, foto y métrica de negocio en la home (ej. 78% de citas gestionadas digitalmente, Clínica Juan Pablo II).
- CTA de WhatsApp pre-rellenado (`wa.me/51961869348?text=...`) en vez de formularios genéricos — encaja con el hábito de contacto dominante en Perú.
- Mención consistente de cumplimiento SUNAT en meta description/H2 de casi todas las páginas + herramienta de autoevaluación "Assessment SUNAT".
- Schema técnico completo y consistente entre páginas: LocalBusiness/ProfessionalService, FAQPage por página, Article+Person en el blog, BreadcrumbList, credencial del fundador (señal E-E-A-T).
- `/desarrollo-de-software-lima` está bien construida contra el tipo de página que domina su consulta (landing local + casos + FAQ + precio).

## Limitaciones

- Las búsquedas se ejecutaron vía `WebSearch` sin geolocalización forzada a Perú (`gl=pe`); el SERP real visto desde Lima puede variar en 1-2 posiciones o incluir Local Pack/Ads no capturados aquí.
- No se verificaron directamente Featured Snippets, PAA ni AI Overview reales de Google (se infirió el formato dominante a partir de los títulos/resúmenes de resultados, no de una captura de SERP en vivo).
- Auditoría limitada a 6 páginas y 8 búsquedas por presupuesto de tiempo; no se revisaron otras páginas del sitio (portfolio individual, /services hub, otros posts del blog) que podrían tener sus propios desajustes.
- No se midió comportamiento real de usuario (CTR, scroll, heatmaps); los hallazgos de prueba social/CTA son inferencias de estructura HTML, no de datos de analítica.

```json
{"category":"SXO","score":55,"what_works":["Precios reales en soles con rangos \"desde\" (S/ 1,100-13,000+), mismo formato que las guías que dominan el SERP de precios","Testimonios reales con nombre, foto y métrica de negocio en la home","CTA de WhatsApp pre-rellenado en vez de formularios genéricos","Cumplimiento SUNAT mencionado de forma consistente + herramienta de autoevaluación Assessment SUNAT","Schema completo y consistente: LocalBusiness/ProfessionalService, FAQPage, Article+Person, BreadcrumbList, credencial del fundador","/desarrollo-de-software-lima bien alineada con el tipo de página dominante en su consulta"],"findings":[{"title":"/diagnostico apunta a una consulta de intención \"producto listo\" (POS/ERP SaaS), no de consultoría a medida","severity":"Critical","description":"El SERP de \"necesito un sistema para mi negocio\" está dominado por fichas de producto SaaS comprables (Wally, PANCA S/119/mes, INVY) y un listicle comparativo \"10 mejores ERP para Pymes\". /diagnostico ofrece una llamada de 30 min gratis o un diagnóstico pagado de S/950, un formato consultivo que no compite contra fichas de producto ni comparativas.","recommendation":"No forzar /diagnostico contra esta frase; crear contenido comparativo (\"sistema a medida vs. software listo\") o retargetear /diagnostico a consultas más consultivas."},{"title":"/services/integracion-ia compite con precio contra un SERP informativo/noticioso","severity":"Critical","description":"\"adopción de IA en empresas Perú\" e \"implementar IA en mi empresa\" muestran SERPs de noticias y guías educativas, no páginas de venta. /services/integracion-ia lidera con precio (\"Desde S/ 1,900\") en el H1/meta, mientras el asset que mejor calza -el blog post- está emparejado solo con otra consulta.","recommendation":"Reasignar estas consultas informativas al blog (ampliarlo o crear pieza educativa nueva) y dejar /services/integracion-ia para consultas ya transaccionales."},{"title":"La homepage no puede ganarle a un listicle en una consulta de categoría genérica","severity":"High","description":"\"empresa de software Lima\" está dominado por artículos \"Top 6/15 mejores empresas de software\" y agregadores, no por homepages individuales de proveedor.","recommendation":"No esperar ranking #1 de / en esa frase; buscar aparecer dentro de esos listicles vía outreach/RP digital en vez de competir de frente."},{"title":"Prueba social verificable (nombre+foto+métrica) vive solo en la home","severity":"Medium","description":"/precios, /diagnostico, /services/integracion-ia y el blog no muestran testimonios con foto en el cuerpo; gran parte del tráfico de búsqueda entra directo a la subpágina, no a la home.","recommendation":"Insertar 1 testimonio con foto relevante al tema en cada página de aterrizaje directo."},{"title":"Brecha de frase exacta en el blog de adopción de IA","severity":"Medium","description":"El H1/title del blog no usa la frase \"capacitar a tu equipo\" pese a que el contenido (six-step framework) sí resuelve esa intención.","recommendation":"Agregar un H2 explícito \"Cómo capacitar a tu equipo en IA\" reformulando el paso de formación ya existente."},{"title":"Falta schema Review/AggregateRating pese a tener testimonios reales","severity":"Low","description":"Los bloques de structured_data cubren LocalBusiness, FAQPage, Article y credenciales del fundador, pero ningún tipo Review o AggregateRating.","recommendation":"Baja prioridad para B2B; fácil de sumar sobre los testimonios ya existentes en home."},{"title":"Namespace de marca compartido en el SERP (Arkano, ArkOS, Arkeia, arkos-studio)","severity":"Info","description":"La consulta exacta \"Árkos software\" ya resuelve bien (posición ~2), pero variantes de cola larga comparten SERP con marcas homónimas no relacionadas.","recommendation":"Monitorear; reforzar señales de entidad única ya cubiertas en la auditoría GEO previa."}]}
```
