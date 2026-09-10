# Product Marketing Context

**Document version:** v3
**Last updated:** 2026-09-10

> Contexto compartido que leen los skills de marketing (ai-seo, copywriting, etc.). Fuente: código del sitio (`data/services.ts`, `data/pricing.ts`, secciones del home, `/diagnostico`, `llms.txt`), testimonios publicados, `docs/PLAN-SEO-LIMA.md`, notas del proyecto, revisión de Rodrigo (v2) y su CV de septiembre 2026 (v3).

## Product Overview
**One-liner:** Árkos construye software a medida para pymes peruanas que se quedaron cortas con Excel (ERPs, CRMs, PMS, SaaS, webs y apps) con cumplimiento SUNAT de fábrica y precios publicados, y acompaña a las empresas a adoptar IA en su trabajo diario, con formación a los equipos y medición antes y después.
**What it does:** Diseña y desarrolla sistemas desde la operación real del cliente (entrevistas, mapa de proceso, prototipo en Figma, sprints quincenales con demos) y los entrega con código fuente, capacitación y acompañamiento. La entrada es un diagnóstico honesto que puede concluir "todavía no necesitas un sistema". Tiene dos productos propios que demuestran la capa que más repite: FacturArkos (facturación electrónica SUNAT + POS para Mypes) y RestHUB (ERP de restaurante). No es una fábrica de software: el onboarding de cada cliente lo hace Rodrigo de punta a punta, con poblaciones de 5 a más de 200 usuarios, y desde 2024 acompaña a empresas de salud, banca, transporte, logística, comercio y sector naval a incorporar IA: asistentes con bases de conocimiento propias conectados a sus CRM y ERP, automatizaciones, formación por perfil, gobierno legible y medición. Equipo de nueve personas desde 2022.
**Product category:** Empresa de software a medida en Lima, Perú, y adopción de IA en empresas (habilitación de usuarios de negocio). Estantes por los que buscan: "desarrollo de software a medida Perú", "empresa de software Lima", "ERP para restaurantes", "sistema de facturación electrónica", "CRM para servicio técnico", "PMS hotelero", "desarrollo web Lima", "adopción de IA en empresas", "capacitación en IA para equipos", "asistente RAG para empresa", "automatización con n8n".
**Product type:** Servicio (empresa boutique de nueve personas liderada por su fundador) + productos propios SaaS (FacturArkos, RestHUB) + programas de adopción y formación en IA.
**Business model:** Proyectos por alcance con precios "desde" publicados en S/ y USD (único del mercado limeño auditado que los publica). Oferta de entrada en dos niveles: llamada de diagnóstico gratis (30 min) y Diagnóstico profundo de S/ 950 (2 semanas, auditoría de operación + cumplimiento SUNAT + roadmap con costos) que se descuenta íntegro del proyecto. Los programas de adopción y formación en IA se cotizan por alcance (personas, perfiles, sistemas a conectar); la integración técnica parte de S/ 1,900. Objetivo operativo: convertir proyectos en retainers de soporte/evolución post-entrega. No ofrece pauta publicitaria (Meta/Google Ads).

| Servicio | Desde (S/) | Desde (USD) | Nota |
|---|---|---|---|
| Landing de alta conversión | 1,100 | 300 | Una sola página para captar leads |
| Web corporativa | 2,250 | 600 | Institucional, SEO y rendimiento |
| E-commerce | 3,400 | 900 | Pasarela en soles, stock, panel admin |
| Web App / MVP a medida | 4,500 | 1,200 | Next.js, React, TypeScript |
| Sistema a medida (CRM, ERP, PMS, SaaS) | 13,000 | 3,500 | Por alcance; SUNAT (CPE, PLE/SIRE) incluido |
| App móvil iOS + Android | 9,400 | 2,500 | Flutter, publicada en stores; por alcance |
| Integración y adopción de IA | 1,900 | 500 | Asistentes con datos propios, agentes, n8n / Make; adopción y formación por alcance |

Fuente única de precios: `data/pricing.ts`. Nunca inventar otro número.

## Target Audience
**Target companies:** Pymes y Mypes peruanas (Lima y Callao presencial agendado; todo el Perú y Latinoamérica en remoto) cuya operación ya no cabe en Excel, WhatsApp y cuadernos. Rubros foco: restaurantes, hotelería y alquiler vacacional, clínicas y salud, servicios técnicos a domicilio, comercio, profesionales y academia. Tamaño típico: negocio con equipo, varios canales y volumen creciente, no el emprendimiento unipersonal. Para adopción de IA, también organizaciones medianas y grandes de salud, banca, transporte, logística, comercio y sector naval, con poblaciones de usuario de hasta más de 200 personas. Clientes en Perú, Latinoamérica, Estados Unidos y Europa.
**Decision-makers:** Dueño o fundador, gerente general, gerente comercial o administrador. En clínicas, gerencia comercial o administrativa. El contador influye en todo lo que toca SUNAT.
**Primary use case:** Reemplazar una operación armada con Excel, WhatsApp, cuadernos y sistemas sueltos que no se hablan por un sistema a medida que unifique venta, operación, caja y cumplimiento.
**Jobs to be done:**
- Dejar de perder plata, tiempo o clientes por una operación que ya no escala (cierres que no cuadran, pedidos que se pierden, citas duplicadas).
- Cumplir con SUNAT sin doble digitación ni portal aparte (facturación electrónica, PLE/SIRE, datos validados).
- Verse profesional en digital sin perder la cercanía con el cliente (webs y landings que convierten).
- Saber "¿cómo vamos?" en menos de un minuto sin reconstruir la información a mano.
- Que el equipo use de verdad la IA y el sistema después de la novedad, con formación en el puesto y no solo una capacitación inicial.
**Use cases:**
- Asistente RAG para técnicos de campo (Solutec, 2026): glosario de oficio de nueve entradas curado con la dueña, detección de prácticas contradictorias entre técnicos con escalamiento a la dueña, abstención como función de primera clase en un dominio de riesgo de gas y electricidad.
- Despliegue de IA en una organización de salud: onboarding directo a un grupo núcleo de 20 usuarios que replicó a una población de más de 200, con segunda línea de soporte por tickets.
- Formación de equipos en prompting, context engineering y RAG hasta volverlo la forma de trabajo estándar (primero el propio equipo de Árkos desde 2023, luego clientes desde 2024).
- ERP de restaurante: POS, cocina (KDS), caja y contabilidad en un solo sistema (RestHUB).
- CRM para servicio técnico con cartera que vivía en chats sueltos (Solutec DHA / Solutec System).
- PMS + RMS hotelero y de alquiler vacacional con revenue management (OrquestadorADM, VR PMS).
- Plataforma de gestión hospitalaria y agendamiento con múltiples aseguradoras (Clínica Juan Pablo II).
- SaaS multi-rol con portales separados por tipo de usuario (ATELIER Clinic).
- Facturación electrónica + POS + inventario + tienda online para Mypes (FacturArkos).
- App de delivery nativa publicada en App Store y Google Play (Rapiditos).
- Landings y sitios corporativos rápidos e indexables (Solutec DHA, Ñawi, Nexora, sitio académico de Freedy Sotelo).

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Dueño / fundador (decisor y comprador financiero) | Que el negocio no dependa de su cabeza; cuánto cuesta y cuánto se ahorra; no pagar software que no usará | Creció más rápido que sus sistemas; no sabe si necesita un sistema, un ajuste o nada | Diagnóstico honesto con números, precio claro por adelantado y un sistema diseñado desde su operación, no desde una plantilla |
| Administrador / encargado de operación (usuario y champion) | Que cuadre la caja, que el pedido no se pierda, que el sistema se sienta propio | Arma cada respuesta cruzando cuaderno, WhatsApp y Excel; corrige los mismos errores manuales | Un solo sistema para vender, operar y cerrar; capacitación y soporte los primeros meses |
| Contador (influenciador técnico) | Archivos en el formato que SUNAT exige; que lo declarado cuadre con lo operado | Recibe capturas de pantalla y reconstruye el mes | Registros de ventas y compras, kardex y cierres listos para PLE/SIRE; validación RENIEC/SUNAT en el origen |
| Gerente comercial (champion en clínicas y servicios) | Captar y no perder clientes; canal digital que convierta | Cada cita era una llamada, un cuaderno y una hoja Excel distinta | Agendamiento y atención digital que el equipo siente propio; más consultas por canal digital |
| Líder de área en empresa mediana o grande (adopción de IA) | Que la IA se use de verdad y de forma segura; sustentar la mejora con números | Compró herramientas que el equipo dejó de usar a las dos semanas; no sabe qué automatizar ni qué no | Onboarding en cascada, formación por perfil, gobierno legible y línea base antes y después |

## Problems & Pain Points
**Core problem:** La operación creció más rápido que los sistemas: la información vive en varios lugares que no se hablan, el negocio depende de que una persona "se acuerde", nadie puede responder "¿cómo vamos?" rápido, se repiten errores manuales (una factura electrónica mal emitida, un pedido perdido, una cita duplicada) y se pagan suscripciones por funciones que no se usan.
**Why alternatives fall short:**
- Sistemas enlatados: obligan a cambiar cómo se trabaja; no admiten el flujo de aprobación propio, la forma de cobrar distinta o el tipo de cliente que el sistema no contempla. Ahí empiezan los parches en Excel y los WhatsApp para coordinar lo que el sistema no coordina.
- Sistemas sin SUNAT integrado: obligan a facturar en otro lado y a cuadrar dos fuentes a mano.
- Agencias de Lima: ninguna publica precios ("depende de la complejidad"), ninguna habla de SUNAT, PLE, Ley 29733 ni pasarelas locales, y su prueba social está desconectada de la página que vende.
- Freelancers, incluidos extranjeros: igualan en React pero no integran SUNAT ni pasarelas peruanas; riesgo de perder contacto con el proveedor y quedarse sin código.
- Un Excel más: no escala. El día que hay el doble de volumen, toma el doble de tiempo.
**What it costs them:** Horas del equipo pegando información a mano, mermas y cierres de caja que no cuadran, clientes y citas perdidas, multas y riesgo frente a SUNAT, decisiones tardías por operar a ciegas. La calculadora `/costo-del-excel` lo pone en soles al mes (default de referencia S/ 788/mes).
**Emotional tension:** Miedo a que el negocio se trabe el día que falte la persona que lo tiene todo en la cabeza. Miedo a gastar varios miles de soles en software que no se necesitaba o que se construya "otra cosa". Miedo a verse frío o "corporativo de más" frente a clientes que valoran el trato cercano. Cansancio del fin de mes como "reconstrucción arqueológica".

## Competitive Landscape
**Direct:** Agencias de desarrollo de software en Lima que compiten por "desarrollo de software Lima" (auditadas el 2026-08-04 en `docs/PLAN-SEO-LIMA.md`):
- Glajumedia: el rival serio (500+ proyectos, 10 años, Clutch 4.7, casos con PromPerú, Osiptel). Falla en ejecución: sin blog, landing pobre, no reclama ciudad.
- TIPSE: bien estructurado, casos con métricas, pero sin señales locales ni schema.
- SB Perú / SoftBrilliance: gran cartera (Pacífico, Roche, Volcán), pero página de dinero sin H1, blog sobre planillas y datos contradictorios (18 vs 20 años).
- Vex Soluciones: domina el pack local (Google 4.9 con ~110 reseñas) pero Trustpilot 3.2, Clutch sin reclamar, bloquea a todos los bots (invisible para IA).
- Tinq: rankea por on-page exacto con 166 palabras y cero prueba social.
- Monstruo Creativo: agencia de marketing con H1 que dice "Estados Unidos"; relleno programático.
Ninguno de los seis publica precios, menciona SUNAT/PLE/Ley 29733/Izipay/Culqi/Yape, ni tiene LocalBusiness con dirección de Lima.
**Secondary:** Software enlatado y POS/SaaS por suscripción. En restaurantes: Toast y Square (caros para una Mipyme), Wally, Toteat, Lightspeed (POS) y Tock, SevenRooms, CoverManager, Meitre, Mesa 24/7 (reservas). Fallan cuando la operación tiene una particularidad que no admiten, cobran por módulos que no se usan y dejan SUNAT y contabilidad fuera. Freelancers de Workana y del extranjero: igualan el stack, no el cumplimiento peruano.
**Indirect:** Seguir con Excel, WhatsApp, cuaderno y contador manual. Funciona mientras el volumen es bajo y el dueño controla todo; se rompe con volumen, múltiples canales y personal numeroso. Árkos lo dice de frente: si no reconoces ninguna señal, no contrates software todavía.

## Differentiation
**Key differentiators:**
- Precios publicados en S/ y USD, con factores y modelos de pago. Nadie más en Lima lo hace.
- Cumplimiento SUNAT de fábrica: facturación electrónica (CPE) con OSE/PSE, libros PLE y SIRE, validación RENIEC/SUNAT, Ley 29733. Con FacturArkos como prueba viva.
- Diagnóstico honesto que puede concluir "todavía no": filtro de asesor, no de vendedor. El profundo (S/ 950) se descuenta íntegro del proyecto.
- Casos con nombre, cargo, empresa y cifra, y clientes limeños demostrables (Solutec DHA con más de 2,500 clientes en Lima).
- Código fuente y base de datos entregados al cierre; sin esquemas que obliguen a quedarse.
- Rodrigo Torres al frente: criterio visible en primera persona, no un "equipo multidisciplinario" anónimo. Hace el onboarding de cada cliente de punta a punta; equipo de nueve personas detrás.
- Adopción medida, no instalada: línea base antes de intervenir y la misma medición después; uso sostenido frente a uso reportado; casos de prueba etiquetados a mano; métricas con intervalo de confianza; umbrales que bloquean el despliegue. Publica resultados negativos (Precio Vivo).
- Gobierno de IA legible para no técnicos: control de acceso en la recuperación y no por prompt, trazabilidad de fuente, redacción de datos personales, y por escrito qué no se automatiza y dónde aprueba una persona.
- Formación por perfil, en el puesto y en cascada: currículos distintos para gente de negocio y equipos técnicos; grupo núcleo más segunda línea de soporte.
- Ya citable por IA: llms.txt, llms-full.txt, robots abiertos a GPTBot/ClaudeBot/PerplexityBot, schema de entidad única.
**How we do it differently:** Se parte de la operación, no de una plantilla: entrevistas con quien usa el sistema, mapa del proceso actual y prototipo navegable en Figma antes de la primera línea de código. Brief (1–2 días) → Propuesta con alcance, cronograma y precio (3–5 días) → Sprints quincenales con demos funcionales (2–12 semanas) → Entrega, capacitación y acompañamiento los primeros meses.
**Why that's better:** El cliente ve avance real y corrige el rumbo temprano en lugar de descubrir al final que se construyó otra cosa. Todo cuadra desde el primer día porque el cumplimiento no es un módulo aparte. Y sabe cuánto cuesta antes de la primera reunión.
**Why customers choose us:** "Entendió esa complejidad sin que tuviéramos que traducirla." Verse profesional sin perder cercanía. Un proveedor que resuelve lo peruano (SUNAT, RENIEC, Izipay, Culqi, Yape, Plin) que un freelancer extranjero no puede.

## Objections
| Objection | Response |
|-----------|----------|
| ¿Por qué el diagnóstico profundo es pagado? | Es trabajo real con entregable real: dos semanas de análisis y un roadmap que vale por sí mismo, construyas con nosotros o no. Los S/ 950 se descuentan íntegros del proyecto si avanzamos. |
| ¿Y si la conclusión es que NO necesito un sistema? | Te lo decimos tal cual, por escrito, con lo que sí deberías hacer (ordenar tu Excel, definir un proceso, esperar más volumen). Te ahorras varios miles de soles. |
| ¿Cuánto cuesta un ERP/CRM a medida en Perú? | Desde S/ 13,000 (USD 3,500), cotizado por módulos y alcance, con SUNAT incluido. Rangos completos en `/precios`. |
| ¿El código fuente es mío? | Sí. Al cierre entregamos código fuente y base de datos. No trabajamos con esquemas que te obliguen a quedarte con nosotros. |
| ¿Funciona si estoy fuera de Lima o de Perú? | Sí. Entrevistas y cierre por videollamada, revisión remota. Presencial agendado en Lima y Callao. |
| Ya tengo un sistema y perdí contacto con el proveedor anterior | Es un escenario frecuente. Empezamos por auditar qué hay: a qué datos se puede acceder, qué se puede migrar y qué conviene rehacer. En algunos casos la salida más barata es recuperar y mantener lo existente, no reescribirlo; te decimos cuál de las dos aplica antes de cotizar. |
| ¿El chatbot con IA va a inventar respuestas? | El riesgo existe y se controla acotando el asistente a tus datos, definiendo qué temas no debe responder y derivando a una persona cuando no tiene la información. Un asistente que dice «no lo sé, te comunico con alguien» es preferible a uno que improvisa. |
| ¿Mis datos se usan para entrenar el modelo? | Configuramos la integración para que los datos de tu operación no se usen en entrenamiento, y filtramos los datos personales antes de enviarlos al modelo, conforme a la Ley 29733. |
| ¿Necesito una app o me basta con una web? | Se responde en el diagnóstico; muchas veces basta una web app. Hay una app real en stores para ver antes de contratar (Rapiditos). |

**Anti-persona:** El negocio pequeño, ordenado y de bajo volumen cuya operación ya está resuelta y barata: pocas mesas o clientes, un POS que le gusta, contador propio, CRM manual que le alcanza (el caso Piedra | Cocina Libre: venderle un ERP es "venderle un camión a quien lleva una mochila"). También quien no reconoce ninguna de las 5 señales, quien busca pauta publicitaria (no se ofrece) y quien quiere la plantilla más barata sin un problema de operación detrás. A estos se les dice "todavía no" y se les pide feedback o referidos, no venta.

## Switching Dynamics
**Push:** El Excel ya no escala; los cierres de caja no cuadran; errores recurrentes con facturas electrónicas, pedidos y citas; pagar suscripciones por módulos que no se usan; el proveedor anterior desapareció; el equipo pierde horas pegando información a mano.
**Pull:** Precio claro antes de hablar; casos con nombre y cifra del mismo rubro; SUNAT resuelto de fábrica; un diagnóstico que puede decir "no"; ver productos propios funcionando (FacturArkos, RestHUB, Rapiditos en stores); trato directo con el fundador.
**Habit:** "Más o menos funciona": la persona que se acuerda de todo, el contador que reconstruye el mes, el POS que ya conocen, Excel y WhatsApp como sistema de facto.
**Anxiety:** Gastar en software que no se necesitaba; que se construya otra cosa; quedar atado a un proveedor; verse frío o corporativo frente a clientes que valoran la cercanía; el tiempo de implementación y la capacitación del equipo; cumplimiento SUNAT prometido y no probado (por eso Árkos no promete funciones no probadas en vivo).

## Customer Language
**How they describe the problem:**
- "Antes cada cita era una llamada, un cuaderno y una hoja Excel distinta." (Guillermo Sánchez, Clínica Juan Pablo II)
- "Mi miedo era que una web me hiciera ver fría o corporativa de más." (Dharcy Villafuerte, Solutec DHA)
- "Ventas en un cuaderno, clientes en WhatsApp, inventario en un Excel, caja en otro."
- "Déjame revisar y te digo." (operar a ciegas)
- "Se quedaron cortos con Excel."
**How they describe us:**
- "Árkos entendió esa complejidad sin que tuviéramos que traducirla, y construyó una plataforma que el equipo médico y administrativo siente propia."
- "Ahora luzco profesional al primer clic, pero quien me escribe sigue encontrándose con la misma Dharcy de siempre."
- "El resultado no es una página: es una credencial." (Dr. Ing. Freedy Sotelo Valer)
**Words to use:** operación, sistema, cuadra / no cuadra, cierre de caja, software a medida, SUNAT de fábrica, facturación electrónica, honesto, criterio, "todavía no", pyme / Mype, soles, desde la operación real, código fuente tuyo, en producción, adopción, uso sostenido, línea base, formación en el puesto, habilitación, "reportamos solo lo que podemos verificar".
**Words to avoid:** "Bytecore" (nombre viejo; nunca, ni como "antes Bytecore"); "fábrica de software" / "software factory" como descripción propia (Árkos se define en contra de eso); "transformación digital", "soluciones innovadoras", "equipo multidisciplinario", "experiencias digitales que conectan marcas" (copy genérico heredado, ya retirado del About el 2026-09-10: no reintroducir); "IA" como promesa vaga sin medición; vender el stack como argumento ("No vendo Next.js"); "Trujillo" como sede (Árkos opera desde Lima); métricas o clientes inventados; "Desarrollador Full Stack" como título; prometer SUNAT productivo o mermas automáticas si no están probados en vivo.
**Glossary:**
| Term | Meaning |
|------|---------|
| CPE | Comprobante de Pago Electrónico (boletas, facturas, notas) validado por SUNAT |
| OSE / PSE | Operador / Proveedor de Servicios Electrónicos que valida CPE |
| PLE / SIRE | Libros electrónicos y Sistema Integrado de Registros Electrónicos de SUNAT |
| RENIEC | Registro de identidad; validación de DNI de clientes y proveedores |
| Ley 29733 | Ley de Protección de Datos Personales del Perú |
| Mype / pyme | Micro, pequeña y mediana empresa |
| ERP / CRM / PMS / RMS / KDS | Gestión integral / clientes / propiedades hoteleras / revenue management / pantalla de cocina |
| RestHUB | ERP de restaurante de Árkos (generalización del piloto "Megalodon Pro") |
| FacturArkos | Producto propio: facturación electrónica SUNAT + POS + inventario + tienda para Mypes |
| Diagnóstico profundo | Auditoría pagada de 2 semanas (S/ 950) descontable del proyecto |
| S.A.C.S. | Sociedad por Acciones Cerrada Simplificada (forma legal de Árkos) |
| RAG | Recuperación de documentos propios para que el modelo responda con la información de la empresa, con trazabilidad de fuente |
| Context engineering | Diseño de las instrucciones, habilidades y contexto que recibe un asistente de IA |
| Uso sostenido | Uso que se mantiene sin recordatorio semanas después del onboarding; se distingue del uso reportado |
| Línea base | Medición previa a intervenir, repetida después con el mismo método |

## Brand Voice
**Tone:** Directo, honesto y concreto. Profesional pero cercano; en los casos de estudio y en el home habla Rodrigo en primera persona ("Construyo software vertical para pymes de Latinoamérica. No vendo Next.js: resuelvo operaciones que ya no entran en un Excel").
**Style:** Frases cortas con verbo; ejemplos de operación real (cuaderno, WhatsApp, cierre de caja) en vez de abstracciones; cifras solo cuando son reales y verificadas; publica resultados negativos si los hay; se adapta al nivel técnico del lector; siempre en español peruano (soles, SUNAT, Yape). Estética visual tipo plano técnico: etiquetas "FIG. 01", tipografía Cabinet/Switzer, cobalto, light-only.
**Personality:** Honesto, criterioso, concreto, cercano, riguroso.

## Proof Points
**Metrics:**
- RestHUB (piloto): toma de pedidos −60%, cierre de caja de 45 a 5 minutos. [Métricas reales del piloto; no mencionar que ese restaurante cerró.]
- Clínica Juan Pablo II: 78% de citas gestionadas digitalmente. (Confirmado con el cliente.)
- Solutec DHA: +40% de consultas mensuales por canal digital; atiende a más de 2,500 clientes en Lima. (Confirmado con la clienta.)
- Sitio de Freedy Sotelo: carga en menos de 1.2 s. (Confirmado con el cliente.)
- Trayectoria: más de 50 proyectos entregados desde 2020, de los cuales más de 20 sistemas siguen en producción hoy; +45 clientes en Perú, Latinoamérica, Estados Unidos y Europa; equipo de 9 personas desde 2022; 6 años. Usar siempre las dos cifras juntas y con esa distinción (entregados vs. en producción), nunca una sola suelta. Diez plataformas con uso verificado hoy por seguimiento directo con el cliente.
- Solutec (servicio técnico, Dharcy): sistema en producción con mantenimiento continuo por más de dos años; 650 órdenes al mes, 15 usuarios activos, cierre de orden 45% más rápido. Asistente RAG 2026: glosario de oficio de 9 entradas subió la búsqueda por texto de 1 de 5 a 4 de 5 casos de prueba; gobierno documentado en 7 archivos para lectura no técnica.
- RestHUB: 5 locales en operación y 500 transacciones diarias; capacitación directa a sala y caja en la puesta en marcha; superó el primer filtro de COFIDE Launchpad 2026. Piloto original: pedidos −60%, cierre de caja de 45 a 5 minutos.
- All White Vacations (operación turística internacional, gestión de overbooking y revenue): 4,000 reservas anuales, incidencias −43%. Aún no nombrado en el sitio; corresponde al caso VR PMS.
- Despliegue de IA en organización de salud: 20 usuarios núcleo replicaron a más de 200, con segunda línea de soporte.
- Precio Vivo: pipeline diario automático en AWS sin intervención manual; evaluación sobre 165 casos de prueba con intervalos de confianza; la hipótesis inicial empeoró el error de 0,1667 a 0,1680 y ese resultado negativo está publicado en el sitio.
- OrquestadorADM (cliente bajo NDA): panel What-If predictivo de 17 parámetros y dashboard ejecutivo de KPIs, sustentado ante el cliente.
- LearnLux (cofundada): SaaS EdTech de lectura rápida con usuarios en más de 20 departamentos del Perú.
- Desarrollo de equipo: un socio comercial formado en el puesto hoy lleva cuentas completas de forma autónoma; un integrante pasó de uso improvisado de IA a vender y entregar proyectos propios.
- Credenciales de Rodrigo: PMI Generative AI Overview for Project Managers (2026); Anthropic AI Fluency for Builders, AI Fluency for Small Businesses, AI Capabilities and Limitations, Claude Code 101 (2026); Hugging Face Agents Course y AI Agents Fundamentals (2026); Scrum Alliance Certified Scrum Master (2024); Microsoft Learn Service Adoption Specialist y habilitación de Microsoft 365 Copilot. Inglés C1 por EF SET 64/100 (2026-08-13; lectura C1, escucha B2; oral intermedio, no evaluado). Estudiante de último ciclo de Ingeniería de Sistemas Computacionales, UPN; egreso proyectado en diciembre de 2026.
- Sitio: Lighthouse desktop 98; GEO score 58/100 (jul 2026), fuerte en citabilidad y técnico, débil en autoridad de marca externa.
**Customers:** Clínica Juan Pablo II (Pucallpa), Solutec DHA (Lima), Dr. Ing. Freedy Sotelo Valer (UNTELS), Ñawi Producciones, II Simposio Veterinario Internacional 2026, Casaroma Hostels, Rapiditos (app en App Store y Google Play). Productos propios: FacturArkos, RestHUB, OrquestadorADM, VR PMS, ATELIER Clinic. Abiertos y en vivo: Precio Vivo, Precio Justo.
**Testimonials:**
> "Árkos entendió esa complejidad sin que tuviéramos que traducirla, y construyó una plataforma que el equipo médico y administrativo siente propia. Hoy agendamos con calma, sin perder pacientes en el camino." — Guillermo Sánchez, Gerente Comercial, Clínica Juan Pablo II
> "Mi miedo era que una web me hiciera ver fría o corporativa de más. El equipo logró lo contrario: ahora luzco profesional al primer clic, pero quien me escribe sigue encontrándose con la misma Dharcy de siempre." — Dharcy Villafuerte, Fundadora y Gerente, Solutec DHA
> "Árkos tradujo años de docencia, investigación y gestión universitaria en una arquitectura web clara, ordenada y rigurosa. El resultado no es una página: es una credencial." — Dr. Ing. Freedy Sotelo Valer, Ex Decano de Facultad, UNTELS
**Value themes:**
| Theme | Proof |
|-------|-------|
| Software desde la operación real | Testimonio de Clínica Juan Pablo II; proceso Brief → Propuesta → Sprints → Entrega |
| Cumplimiento SUNAT de fábrica | FacturArkos en producción; sección "Cumplimiento" del home; assessment `/cumplimiento-sunat` |
| Transparencia de precios | `/precios` con rangos en S/ y USD; único entre 6 competidores auditados |
| Honestidad como asesor | Diagnóstico que puede concluir "todavía no"; post "5 señales"; test `/necesitas-un-sistema` |
| Empresa real y verificable | ARKOS SOLUCIONES INFORMATICAS S.A.C.S., RUC 20616338782 (SUNAT), fundada en 2020 |
| Producto publicado | Rapiditos en App Store y Google Play; Precio Vivo y Precio Justo con código abierto |
| Adopción medida | Salud: 20 usuarios núcleo → más de 200; Solutec RAG 1/5 → 4/5 en casos de prueba; Precio Vivo con resultado negativo publicado |
| Criterio y gobierno de IA | 7 archivos de gobierno legibles para no técnicos en Solutec RAG; abstención y escalamiento a la dueña; certificaciones de Anthropic, PMI y Hugging Face |

## Goals
**Business goal:** Generar leads calificados de pymes para sistemas a medida (ticket desde S/ 13,000) y webs, posicionando a Árkos y a Rodrigo Torres como asesor de referencia en software para pymes peruanas, y convertir proyectos en retainers. Abrir la adopción de IA en empresas (asistentes RAG, automatización, formación por perfil) como segunda línea de ingresos, hacia organizaciones medianas y grandes. Ser #1 orgánico y citado por IA para "desarrollo de software a medida Lima/Perú" y aparecer para "adopción de IA en empresas Perú".
**Conversion action:** Reservar la llamada de diagnóstico gratis (WhatsApp +51 961 869 348 o `/diagnostico`). Micro-conversiones: completar el test "¿Necesitas un sistema?", el assessment SUNAT o la calculadora del costo del Excel y dejar nombre + email.
**Current metrics:** GEO 58/100 (2026-07-19); Lighthouse desktop 98, móvil ~68–75; Clutch con perfil y 0 reseñas; sin Google Business Profile. Tráfico y tasa de conversión no se registran en este documento por decisión de Rodrigo. Benchmark objetivo de la oferta de entrada pagada: ~35% de conversión a proyecto.

## Notas internas (no publicar)
- Identidad: nombre comercial Árkos; razón social ARKOS SOLUCIONES INFORMATICAS S.A.C.S.; RUC 20616338782 activo desde el 10/08/2026; inicio de actividades 01/09/2026. Domicilio fiscal en La Libertad, pero la operación y todo el posicionamiento son "Lima, Perú". Lectura honesta si alguien cruza: constituida en La Libertad, opera desde Lima. Nunca publicar la dirección fiscal. Aún no es emisor electrónico ni afiliada al PLE: cuidado con la ironía al vender cumplimiento SUNAT.
- Dominio IDN: árkos.com = `xn--rkos-4na.com`. Correo gerencia@árkos.com; confirmar que recibe desde Gmail/Outlook o publicar alias ASCII.
- Colisión de entidad con "ArkOS" (sistema operativo retro): en perfiles externos escribir siempre "Árkos, agencia de desarrollo de software en Lima, Perú".
- Regla dura: nunca inventar métricas ni nombres de cliente. Tres casos del portafolio (OrquestadorADM, Rapiditos, FacturArkos) tienen datos marcados `// MOCK` pendientes de reemplazo.
- Pattern Breaking en el portafolio es obra mayormente de Driftime; no usarlo como caso propio hasta rehacer el copy.
- Canales reales en el sitio: GitHub, LinkedIn, email. Instagram y Twitter no se muestran; no incluirlos en piezas.
- Ortografía del cliente: el CV de Rodrigo escribe "Solutech"; el sitio usa "Solutec" (Solutec DHA, Solutec System). En el sitio se mantiene "Solutec" hasta que Rodrigo unifique.
- All White Vacations aparece en el CV como cliente de gestión de overbooking y revenue (4,000 reservas/año, −43% incidencias) y corresponde al caso VR PMS; no se ha publicado ese nombre en el sitio todavía.
- OrquestadorADM tiene cliente bajo NDA: se puede citar el producto y el panel What-If de 17 parámetros, no el nombre del cliente.
- Nada de esto reemplaza aún los datos `// MOCK` de los casos de OrquestadorADM, Rapiditos y FacturArkos en `/portfolio`; sigue pendiente.

## Changelog
*Newest first. One line per revision: what changed and why.*
- v3 (2026-09-10) — Reposicionamiento con el CV de Rodrigo: de "agencia de software" a empresa de software a medida más adopción de IA y habilitación de usuarios de negocio; nueva persona (líder de área), diferenciadores de adopción medida y gobierno legible, proof points nuevos (Solutec 650 órdenes/mes, RestHUB 5 locales, salud 20→200, Precio Vivo 165 casos, certificaciones), glosario de IA y objetivo de segunda línea de ingresos. Los skills generan desde ahora contra este posicionamiento.
- v2 (2026-09-10) — Revisión de Rodrigo: métricas de los tres testimonios confirmadas; cifra de trayectoria unificada (+50 entregados, +20 en producción); dos FAQ (proveedor anterior, chatbot IA) con el texto exacto del sitio; se decide no registrar tráfico ni conversión aquí.
- v1 (2026-09-09) — Initial context. Borrador automático desde el código del sitio, llms.txt, testimonios, plan SEO de Lima y notas del proyecto.
