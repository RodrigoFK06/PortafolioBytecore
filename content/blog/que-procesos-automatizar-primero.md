---
title: "Qué procesos automatizar primero en tu empresa (y cuáles todavía no)"
seoTitle: "Qué procesos automatizar primero en una empresa"
description: "Cómo elegir el primer proceso que conviene automatizar en una pyme peruana: cuatro preguntas, cuánto te cuesta hoy en soles y qué no tocar todavía. Con cifras de PRODUCE e INEI."
image: "/blog-cover-que-automatizar-primero.png"
date: "2026-10-19"
author: "Rodrigo Torres"
tags: ["Automatización", "Procesos", "PYMEs", "Criterio", "Perú"]
---

Conviene automatizar primero el proceso que se repite muchas veces por semana, sigue reglas que se pueden escribir, consume horas de personas y hoy deja errores que se pueden contar. No el más vistoso ni el que trae la herramienta de moda. Y si ese proceso todavía no está definido, primero se ordena: automatizar un desorden solo lo hace fallar más rápido.

Lo digo desde el lado de quien construye los sistemas. En Árkos casi nunca empezamos por la herramienta: empezamos por mirar dónde se va el tiempo del equipo. Esta guía es el método que usamos para elegir el primer proceso, con números que puedes sacar tú mismo en una semana.

## ¿Por qué esta pregunta pesa más en una pyme peruana?

En el Perú, el 99.1 % de las empresas formales son micro y pequeñas: 2,326,126 de 2,346,592 al cierre de 2024, según el [Ministerio de la Producción](https://www.gob.pe/institucion/produce/noticias/1168972-produce-peru-cerro-el-2024-con-2-34-millones-de-empresas-formales). El 43.8 % de ellas está en Lima, y el 85.8 % se dedica a comercio o servicios. Son empresas donde cada persona hace de todo y donde una hora perdida copiando datos es una hora que no se vende.

La brecha no está en los equipos. Según el [INEI](https://cdn.www.gob.pe/uploads/document/file/9555617/7820458-peru-tecnologias-de-informacion-y-comunicacion-en-las-empresas-2023.pdf), en 2023 el 91.8 % de las empresas con ventas desde 50 UIT usaba computadora y el 90.6 % usaba internet, pero solo el 9.6 % tenía un ERP y el 4.8 % un CRM. Computadoras sobran. Lo que falta es que la información pase de un paso al siguiente sin que alguien la vuelva a escribir.

## ¿Qué significa automatizar un proceso?

Automatizar un proceso es lograr que un paso que hoy hace una persona a mano —copiar, avisar, cuadrar, calcular— ocurra solo, cada vez, con las mismas reglas y dejando registro. Puede ser un flujo en n8n o Make que conecta las herramientas que ya usas, una función dentro de tu sistema actual o un sistema a medida cuando las piezas no alcanzan.

Lo que no es: comprar una licencia y esperar que la gente cambie sola. Eso es instalar, y ya escribí sobre [cómo lograr que tu equipo adopte la IA de verdad](/blog/adopcion-de-ia-en-empresas), que es lo que decide si una herramienta sirve.

## Las cuatro preguntas para elegir el primer proceso

Haz la lista de las tareas que se repiten en tu negocio y pásale a cada una estas cuatro preguntas. El primer candidato es el que contesta «sí» a las cuatro.

### 1. ¿Se repite muchas veces por semana?

La frecuencia manda. Automatizar algo que pasa dos veces al mes casi nunca se paga: el ahorro es chico y el flujo se rompe sin que nadie lo note. Un registro que se hace cincuenta veces al día, en cambio, devuelve la inversión rápido.

### 2. ¿Sigue reglas que podrías escribir en una hoja?

Si puedes explicarle el paso a alguien nuevo con «si pasa esto, haz aquello», se puede automatizar. Si la respuesta es «depende, yo ya sé», todavía no: primero hay que sacar ese criterio de la cabeza de quien lo tiene y ponerlo por escrito.

### 3. ¿Le cuesta horas a personas?

No minutos sueltos: horas a la semana, sumadas entre todos los que lo hacen. La digitación doble —pasar el pedido del WhatsApp al Excel y del Excel al sistema de facturación— es el caso más común.

### 4. ¿Hoy deja errores que puedes contar?

Facturas con datos mal copiados, pedidos que se pierden, una caja que no cuadra. Si el error tiene costo y se repite, automatizar el paso lo corta en la fuente. Si no puedes contar los errores, empieza por ahí: contarlos ya es medir.

## ¿Cuánto te cuesta hoy un proceso manual?

Antes de automatizar nada, pon el proceso en soles. La cuenta tiene tres partes:

- **Horas al mes** = personas × horas semanales × 4.33.
- **Costo por hora** = sueldo mensual ÷ 208 horas laborales.
- **Costo de los errores** = errores al mes × lo que cuesta cada uno.

Un ejemplo con números redondos. Dos personas que ganan la remuneración mínima —S/ 1,230 desde el 1 de octubre de 2026, según el [Decreto Supremo 015-2026-TR](https://busquedas.elperuano.pe/dispositivo/EX/2559163-1)— pasan 5 horas semanales cada una copiando pedidos. Son 43 horas al mes a S/ 5.91 la hora: unos S/ 256 al mes solo en tiempo. Si además se cuelan 4 errores al mes de S/ 80 cada uno, son S/ 320 más. El proceso cuesta unos S/ 576 al mes, cerca de S/ 6,900 al año, y eso sin contar cargas sociales ni ventas perdidas.

La [calculadora del costo del Excel](/costo-del-excel) hace esta misma cuenta con tus números, sin registro. Ese monto es tu techo: si automatizar un proceso cuesta más de lo que ahorra en un año, no es el primer candidato.

## Procesos que suelen pagar primero

En comercio y servicios, los primeros candidatos casi siempre son estos:

- **Registro doble de pedidos o ventas.** El pedido llega por WhatsApp o en papel y alguien lo vuelve a escribir en el Excel, en la caja o en el sistema de facturación.
- **Cierre y cuadre de caja.** Sumar ventas, separar efectivo, Yape, tarjeta y transferencias, y buscar la diferencia. En el piloto de [RestHUB](/portfolio), el sistema para restaurantes que construimos, el cierre de caja pasó de 45 a 5 minutos.
- **Conciliación de pagos.** Cruzar los abonos del banco o de la billetera con lo que se vendió o se facturó.
- **Confirmaciones y recordatorios.** Citas, reservas, entregas y cobros pendientes que hoy alguien avisa uno por uno.
- **Reportes armados a mano.** El resumen de cada lunes que alguien copia de tres lugares distintos.
- **Consultas que se repiten.** Las mismas veinte preguntas sobre precios, horarios o el estado de un pedido, que se pueden responder con tus datos y pasar a una persona cuando hace falta.

Ninguno es vistoso. Por eso funcionan: tienen volumen, reglas claras y un costo que se mide antes y después.

## ¿Qué todavía no conviene automatizar?

- **Un proceso que nadie ha definido.** Si cada persona lo hace distinto, primero se acuerda una forma y se escribe.
- **Lo que ocurre pocas veces al mes.** El ahorro no paga el mantenimiento.
- **Decisiones que piden criterio y no admiten revisión.** Aprobar un crédito, responder un reclamo delicado. Ahí la automatización prepara la información y decide una persona.
- **Un proceso que va a cambiar pronto.** Si en tres meses cambias de proveedor, de local o de forma de cobrar, espera.
- **Cuando las excepciones son la regla.** Si la mitad de los casos «son especiales», el flujo automático fallará la mitad de las veces.

## Un orden para empezar sin romper nada

1. **Lista** las tareas que se repiten y quién las hace.
2. **Mide una semana** cuántas veces ocurre cada una, cuánto tarda y cuántos errores deja. Esa es tu línea base.
3. **Pasa las cuatro preguntas** y quédate con el proceso que contesta «sí» a todas y cuesta más en soles.
4. **Ordénalo antes de tocarlo:** escribe los pasos, las reglas y quién es el dueño.
5. **Automatiza solo ese.** Uno, con registro de cada ejecución, para saber dónde falló cuando falle.
6. **Vuelve a medir con los mismos números** y recién entonces elige el siguiente.

El paso 4 es el que casi todos se saltan, y a veces es el que más ahorra: un proceso escrito y con dueño ya resuelve parte del problema antes de escribir una línea de código.

## ¿Con qué herramienta se automatiza?

- **Una hoja de cálculo bien hecha** alcanza cuando el volumen es bajo y la usa una sola persona. No todo pide un sistema: el [test de 3 minutos](/necesitas-un-sistema) te dice si ya lo necesitas.
- **n8n o Make** sirven cuando el problema es conectar herramientas que ya tienes: formulario, hoja, correo, WhatsApp, facturación. Es el trabajo de [automatización de procesos e integración de IA](/services/integracion-ia). Si tu empresa está en Lima, empezamos con una reunión presencial: así trabajamos la [automatización de procesos para empresas en Lima](/automatizacion-de-procesos-lima).
- **Un sistema a medida** conviene cuando ninguna pieza encaja con tu operación y terminas adaptando el negocio al software. Para eso está el [desarrollo de software a medida en Lima](/desarrollo-de-software-lima).

## Preguntas frecuentes

### ¿Qué proceso conviene automatizar primero en una pyme?

El que se repite muchas veces por semana, sigue reglas claras, consume horas de personas y deja errores que se pueden contar. En comercio y servicios suelen ser el registro doble de pedidos, el cierre de caja, la conciliación de pagos y los recordatorios a clientes.

### ¿Cuánto cuesta automatizar un proceso en Perú?

Depende del proceso y de las herramientas que ya tengas. En Árkos, una automatización o un asistente con IA parte de S/ 1,900 (USD 500). Antes de invertir, calcula cuánto te cuesta hoy el proceso manual: si al año pierdes menos de lo que cuesta automatizarlo, no es el primer candidato.

### ¿Hace falta un sistema a medida para automatizar?

No siempre. Muchas automatizaciones se resuelven conectando las herramientas que ya usas con n8n o Make. El software a medida conviene cuando ninguna herramienta encaja con cómo trabaja tu negocio.

### ¿Se puede automatizar un proceso que no está documentado?

Se puede, pero sale caro: el flujo copia las inconsistencias y falla en cada excepción. Primero se escribe cómo se hace el proceso, con sus reglas y su responsable, y después se automatiza.

### ¿Cómo sé si la automatización funcionó?

Midiendo lo mismo antes y después: veces por semana, horas dedicadas y errores al mes. Si no tomaste la línea base antes de empezar, no vas a poder demostrar el ahorro.

## Por dónde empezar

Si quieres hacer este ejercicio con tu equipo, el [taller de adopción de tecnología](/taller) dura 4 horas y termina con el mapa de procesos de tu negocio. Si prefieres que lo hagamos con tus números reales, el [diagnóstico de procesos](/diagnostico) toma dos semanas, cuesta S/ 950 y tiene garantía: si no encuentra pérdidas de al menos tres veces su precio al año, te devolvemos el pago.

## Fuentes

- Ministerio de la Producción, [«PRODUCE: Perú cerró el 2024 con 2.34 millones de empresas formales»](https://www.gob.pe/institucion/produce/noticias/1168972-produce-peru-cerro-el-2024-con-2-34-millones-de-empresas-formales), 17 de mayo de 2025.
- INEI, [*Perú: Tecnologías de Información y Comunicación en las Empresas, 2023*](https://cdn.www.gob.pe/uploads/document/file/9555617/7820458-peru-tecnologias-de-informacion-y-comunicacion-en-las-empresas-2023.pdf), publicado el 5 de marzo de 2026 (Encuesta Económica Anual 2024).
- *El Peruano*, [Decreto Supremo 015-2026-TR](https://busquedas.elperuano.pe/dispositivo/EX/2559163-1), que incrementa la remuneración mínima vital, 28 de septiembre de 2026.
