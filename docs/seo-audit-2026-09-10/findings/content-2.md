# Content Quality — Pase 2 (árkos.com / xn--rkos-4na.com)

Páginas cubiertas: `/services/integracion-ia`, `/blog/adopcion-de-ia-en-empresas`, `/portfolio/19` (RestHUB), `/diagnostico`.
Método: `render_page.py --mode auto` (4 páginas) + re-render forzado `--mode always` para 2 páginas donde el `extracted_text` resultó incorrecto (ver Hallazgo Crítico) + inspección directa del HTML fuente.

## Puntuaciones

| Página | Score |
|---|---|
| /services/integracion-ia | 82/100 |
| /blog/adopcion-de-ia-en-empresas | 85/100 |
| /portfolio/19 (RestHUB) | 66/100 |
| /diagnostico | 74/100 |
| **Global (estas 4 páginas)** | **77/100** |

## Qué funciona

- **Cifras propias y falsables en vez de relleno genérico**: Solutec 650 órdenes/mes y 15 usuarios activos, grupo núcleo de 20 usuarios → 200 personas, Precio Vivo 165 casos de prueba con intervalos de confianza, error del modelo 0,1667→0,1680 (resultado negativo publicado), glosario de 9 entradas que subió la búsqueda de 1/5 a 4/5 casos, RestHUB 45→5 min y ~60% en toma de pedidos. Es exactamente la especificidad que el QRG de sept. 2025 usa para distinguir contenido genuino de relleno de IA.
- **Voz de primera persona fuerte en el blog** ("Llevo tres años...", "el método que aplico") con opiniones defendibles ("si el flujo estaba mal definido, la IA solo lo hizo fallar más rápido").
- **Transparencia**: publicar un resultado negativo propio (Precio Vivo) es una señal de Trustworthiness poco común.
- **FAQ en forma de pregunta** en 3 de 4 páginas (services: 8, blog: 5, diagnostico: 4), cubriendo objeciones comerciales reales (precio, alucinación, Ley 29733, remoto).
- **Coherencia numérica con el home**: S/ 1,900 integración, S/ 950 diagnóstico, 30 min llamada gratis, equipo de 9, +50 entregados, +20 en producción — sin contradicciones entre estas 4 páginas.
- **Auto-descalificación de leads** en /diagnostico ("No es para ti si…") — señal de honestidad poco frecuente en páginas de venta.
- **JSON-LD `Person`** con credencial "Certified Scrum Master" (Scrum Alliance, 2024) y `sameAs` a GitHub/LinkedIn/Instagram, presente en el HTML — señal de expertise machine-readable, aunque invisible para el usuario humano.

## Hallazgos

### 1. [Critical] El extractor de contenido devuelve el bloque genérico de organización en vez del contenido real de /portfolio/19 y /diagnostico
Tanto en modo `auto` como forzando Playwright (`--mode always`), `extracted_text` para ambas URLs devolvió el mismo texto ("Árkos - Mejoramos tus procesos... Equipo de nueve personas desde 2022...") que es idéntico al del home. Confirmé con `<title>` y canonical correctos (`RestHUB — Caso de estudio | Árkos`, `Diagnóstico de sistemas para tu negocio | Árkos`) y con conteo de keywords específicas presentes en el HTML crudo (RestHUB×24, "45 a 5"×2, "S/ 950"×6, "30 minutos"×10) que el contenido específico sí existe en el DOM. Inspección directa localizó el texto genérico en:
`<div class="sr-only" aria-hidden="false" id="llm-context" data-nosnippet="false">` — un bloque diseñado a propósito como contexto para LLMs (screen-reader-only, explícitamente `data-nosnippet="false"` para no excluirlo de snippets). Al ser un párrafo largo y continuo, supera en densidad de texto al contenido real de cada página, que está fragmentado en líneas cortas (títulos de tarjeta, cifras sueltas). Heurísticas de extracción basadas en densidad de texto (trafilatura y similares, usadas por varios crawlers/asistentes de IA) pueden preferir ese bloque genérico sobre el contenido específico.
**Riesgo**: un AI Overview, ChatGPT o Perplexity que cite estas URLs podría responder con la descripción genérica de Árkos en vez de los hechos específicos de RestHUB o del diagnóstico.
**Recomendación**: mover el bloque `#llm-context` después del contenido principal en el DOM, reducir su densidad relativa por página, o envolver el contenido real de cada página en prosa continua dentro de `<main>`/`<article>` para que gane la heurística de extracción de terceros.

### 2. [High] Voz en primera persona en el blog sin byline visible
El blog usa "yo/mi" repetidamente pero el `extracted_text` no imprime "Rodrigo Torres" en ningún punto del cuerpo visible; el nombre solo existe en JSON-LD `Person`, no renderizado como texto. Un lector no puede confirmar quién habla sin salir de la página.
**Recomendación**: byline visible arriba del H1 (nombre, cargo, foto) y bio corta al final con enlace a LinkedIn/GitHub.

### 3. [Medium] Fechas de publicación/actualización sospechosas de ser placeholder
`render_page.py` devolvió `2026-01-01` idéntico para services, portfolio/19 y diagnóstico, y exactamente "hoy" (`2026-09-10`, fecha de esta auditoría) para el blog. El patrón (tres fechas idénticas + una igual al día del rastreo) sugiere que no hay `datePublished`/`dateModified` real en meta/JSON-LD y el valor es un fallback del pipeline. No confirmé el `<head>` de cada página por límite de presupuesto — ver "No evaluado".
**Recomendación**: verificar `article:published_time`/`dateModified` reales y mostrar fecha visible al lector, sobre todo en el blog.

### 4. [Medium] /portfolio/19 (RestHUB): contenido delgado y sin prueba externa
Cuerpo real ≈331 palabras (sin nav/footer), sin sección FAQ (a diferencia de /services y /diagnostico), y sin nombre verificable del cliente piloto ni cita textual suya — solo "un restaurante de Trujillo" y una cita atribuida a Rodrigo Torres (interna, no del cliente).
**Recomendación**: sumar 3-4 FAQ específicas del caso ("¿cuánto cuesta un ERP de restaurante como RestHUB?") y una cita o evidencia (captura, testimonio con cargo) del cliente piloto.

### 5. [Medium] /diagnostico por debajo del piso orientativo de 800 palabras
Cuerpo real ≈599 palabras. El contenido es denso y específico (no relleno), pero queda corto frente al piso de referencia para páginas de servicio/conversión.
**Recomendación**: sumar un caso breve o cita de un diagnóstico ya realizado para profundizar sin inflar con relleno.

### 6. [Medium] /services/integracion-ia: sin byline ni credenciales visibles
El texto usa voz plural de empresa ("integramos", "acompañamos") con autoridad implícita pero sin firma ni referencia visible a Rodrigo Torres, pese a afirmaciones de experiencia directa ("Llevamos tres años haciéndolo con nuestro propio equipo").
**Recomendación**: línea visible cerca del H1 tipo "Servicio dirigido por Rodrigo Torres — 3 años implementando IA en producción", enlazada a su perfil.

### 7. [Low] Encabezados mayormente declarativos fuera del bloque FAQ
En /services, los H2 son en su mayoría afirmaciones ("Gobierno, datos y costos") salvo "¿Dónde atendemos?" y el FAQ. En /portfolio/19 los H2 son etiquetas narrativas (El problema, La decisión), esperable para un caso de estudio pero sin formato pregunta.
**Recomendación**: reformular 2-3 H2 clave como preguntas para mejorar extracción por AI Overviews/Perplexity.

### 8. [Low] CTA del blog enterrado dentro de una respuesta FAQ
"Lo que no cobro es la primera conversación..." aparece dentro de la respuesta a "¿Cuánto cuesta adoptar IA en una pyme peruana?" en vez de un bloque de CTA independiente al cierre del artículo.
**Recomendación**: agregar CTA final explícito (botón) separado del FAQ.

### 9. [Low] /diagnostico sin autoría del ejecutor del servicio pagado
No se nombra quién realiza las entrevistas del diagnóstico profundo (S/ 950). Nombrarlo reforzaría expertise/trust en un producto pagado.

### 10. [Info] Primer párrafo no siempre extraíble como respuesta directa de una frase
El blog tiene apertura definicional ideal para citación de IA. /services y /diagnostico abren con prosa persuasiva fuerte pero sin una frase-resumen extraíble de una sola línea justo tras el H1.

## No evaluado

- No se confirmó directamente en el `<head>` de cada página si existe `article:published_time`/`dateModified` real en meta o JSON-LD Article; la sospecha de placeholder (hallazgo #3) se basa en el patrón de valores devueltos por el renderer, no en inspección del `<head>` completo.
- No se aplicó una métrica formal de legibilidad (Flesch/Szigriszt); la evaluación de legibilidad en español es cualitativa.
- No se verificó si el bloque oculto `#llm-context` que causó el hallazgo #1 está presente en todas las páginas del sitio o solo en estas cuatro (se confirmó su existencia únicamente inspeccionando el HTML de /portfolio/19).
- No se ejecutó `content_quality.py` como script separado del plugin; el análisis se hizo leyendo `extracted_text`/HTML directamente por límite de presupuesto de llamadas.

```json
{"category":"Content Quality (pass 2)","score":77,"pages":{"/services/integracion-ia":82,"/blog/adopcion-de-ia-en-empresas":85,"/portfolio/19":66,"/diagnostico":74},"what_works":["Cifras propias y falsables (Solutec 650 órdenes/mes, Precio Vivo 165 casos, RestHUB 45→5 min, glosario 9 entradas 1/5→4/5)","Voz de primera persona con opiniones defendibles en el blog","Transparencia: resultado negativo propio publicado (Precio Vivo)","FAQ en forma de pregunta en services, blog y diagnostico","Coherencia numérica total con el home (S/1,900, S/950, equipo de 9, +50, +20)","Auto-descalificación de leads en /diagnostico","JSON-LD Person con credencial verificable (Scrum Alliance) y sameAs a perfiles"],"findings":[{"title":"Extractor de contenido devuelve el bloque genérico de organización en vez del contenido real en /portfolio/19 y /diagnostico","severity":"Critical","description":"extracted_text (modo auto y forzado con Playwright) es idéntico al home para ambas URLs; el texto real vive en el DOM pero un div oculto id=llm-context, data-nosnippet=false, con prosa densa gana la heurística de extracción por densidad de texto frente al contenido real fragmentado en líneas cortas.","recommendation":"Mover #llm-context después del contenido principal, reducir su densidad relativa por página o envolver el contenido real en prosa continua dentro de main/article."},{"title":"Blog en primera persona sin byline visible","severity":"High","description":"Uso repetido de yo/mi sin que el nombre Rodrigo Torres aparezca en el texto visible; el nombre solo existe en JSON-LD Person no renderizado.","recommendation":"Añadir byline visible (nombre, cargo, foto) arriba del H1 y bio corta al final con enlaces a LinkedIn/GitHub."},{"title":"Fechas de publicación sospechosas de ser placeholder","severity":"Medium","description":"2026-01-01 idéntico en 3 páginas y 2026-09-10 (fecha del día de rastreo) en el blog; patrón sugiere fallback del renderer, no metadata real.","recommendation":"Verificar article:published_time/dateModified reales y mostrar fecha visible al lector."},{"title":"/portfolio/19 (RestHUB): contenido delgado y sin prueba externa","severity":"Medium","description":"≈331 palabras de cuerpo real, sin FAQ, sin nombre ni cita textual del cliente piloto (solo un restaurante de Trujillo).","recommendation":"Sumar FAQ específicas del caso y una cita o evidencia verificable del cliente piloto."},{"title":"/diagnostico por debajo del piso orientativo de 800 palabras","severity":"Medium","description":"≈599 palabras de cuerpo real; contenido denso pero corto frente al piso de referencia para páginas de servicio.","recommendation":"Sumar un caso breve o cita de un diagnóstico ya realizado."},{"title":"/services/integracion-ia sin byline ni credenciales visibles","severity":"Medium","description":"Voz plural de empresa con autoridad implícita pero sin firma visible pese a afirmar experiencia directa de tres años.","recommendation":"Añadir línea visible de autoría/credenciales cerca del H1, enlazada al perfil de Rodrigo Torres."},{"title":"Encabezados mayormente declarativos fuera del FAQ","severity":"Low","description":"H2 de /services y /portfolio/19 son en su mayoría afirmaciones o etiquetas narrativas, no preguntas.","recommendation":"Reformular 2-3 H2 clave como preguntas para mejorar extracción por AI Overviews/Perplexity."},{"title":"CTA del blog enterrado dentro de una respuesta FAQ","severity":"Low","description":"El CTA de la primera conversación gratuita aparece dentro de una respuesta FAQ en vez de un bloque independiente al cierre.","recommendation":"Agregar CTA final explícito y visualmente separado del FAQ."},{"title":"/diagnostico sin autoría de quien ejecuta el servicio pagado","severity":"Low","description":"No se nombra quién realiza las entrevistas del diagnóstico profundo de S/950.","recommendation":"Nombrar al responsable del diagnóstico para reforzar expertise/trust en un producto pagado."},{"title":"Primer párrafo no siempre extraíble como respuesta directa","severity":"Info","description":"/services y /diagnostico abren con prosa persuasiva sin una frase-resumen de una sola línea tras el H1; el blog sí tiene apertura definicional ideal.","recommendation":"Añadir frase-resumen extraíble de una línea justo tras el H1 en services y diagnostico."}]}
```
