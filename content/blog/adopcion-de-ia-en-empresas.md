---
title: "Adopción de IA en empresas: cómo lograr que tu equipo la use de verdad (y cómo medirlo)"
seoTitle: "Adopción de IA en empresas: cómo capacitar a tu equipo"
description: "Por qué la IA se abandona a las dos semanas, cómo capacitar a tu equipo por perfil y en cascada, qué no automatizar y cómo medir el uso sostenido. Desde casos reales en Perú."
image: "/blog-cover-adopcion-ia.png"
date: "2026-09-10"
author: "Rodrigo Torres"
tags: ["IA", "Adopción", "Criterio", "PYMEs", "Formación", "Medición"]
---

La adopción de IA en una empresa es el proceso por el cual un equipo pasa de probar una herramienta a usarla de forma sostenida en su trabajo diario, con reglas claras sobre qué puede decidir y qué no, y con resultados medidos antes y después. No es instalar un chatbot. Instalar es un día; adoptar son meses.

Llevo tres años metiendo IA en el trabajo diario de mi propio equipo y dos acompañando a clientes de salud, banca, transporte, logística, comercio y sector naval a hacer lo mismo. Lo que sigue es lo que he visto funcionar y, sobre todo, lo que he visto fallar.

## ¿Por qué la mayoría de las implementaciones de IA se abandonan a las dos semanas?

Porque se compra la herramienta antes de entender el trabajo. La empresa contrata licencias, hace una capacitación de dos horas y a las dos semanas la gente volvió a lo de antes. La herramienta no era mala. Lo que faltó fue todo lo demás.

Los cuatro motivos que se repiten:

1. **Nadie descubrió los casos de uso con quien hace el trabajo.** Se asumió que "redactar correos" era el problema, cuando el problema real era buscar información que vive en cinco lugares.
2. **La formación fue genérica.** El mismo taller para la gerente comercial y para el desarrollador. Ninguno de los dos salió sabiendo qué hacer el lunes.
3. **Se automatizó un proceso roto.** Si el flujo estaba mal definido, la IA solo lo hizo fallar más rápido.
4. **No se midió nada.** Sin línea base no hay forma de saber si mejoró, así que la iniciativa murió por falta de evidencia.

## ¿Qué significa adoptar IA (y qué no)?

Adoptar IA significa que, semanas después de la formación y sin que nadie lo recuerde, el equipo sigue usando el asistente para resolver tareas concretas, sabe cuándo no confiar en él y existe un documento legible que dice qué decide el sistema y qué decide una persona.

No significa tener licencias activas. No significa que la gente "reporte" que lo usa. Y no significa haber desplegado un chatbot en la web. Esas tres cosas se ven bien en una presentación y no cambian la operación.

## Cómo hacer que tu equipo use la IA de verdad: seis pasos

Este es el método que aplico, en el orden en que lo aplico.

1. **Descubrir los casos de uso con los dueños del negocio.** Antes de hablar de modelos, una sesión con quien toma las decisiones y otra con quien hace el trabajo. Salen tres o cuatro tareas concretas, repetitivas y con alto volumen. Esas son las candidatas; el resto se descarta por ahora.
2. **Identificar las barreras de proceso antes de automatizar.** Si una tarea depende de que alguien "se acuerde", primero se define el proceso. La IA se aplica sobre un flujo que ya funciona a mano, aunque sea lento.
3. **Formar por perfil, no a todos igual.** Un usuario de negocio necesita saber qué pedirle al asistente, cómo verificar la respuesta y cuándo escalar. Un equipo técnico necesita prompt engineering, context engineering, cómo se construye un sistema RAG y cómo se evalúa. Son dos currículos distintos.
4. **Formar en el puesto, sobre casos reales.** Nada de ejemplos inventados. La persona trae su tarea de hoy, la resuelve con el asistente y recibe retroalimentación después de cada caso. Así se forma criterio, no solo destreza.
5. **Formar en cascada cuando el equipo es grande.** Se forma directamente a un grupo núcleo, que replica hacia el resto, y se deja una segunda línea de soporte por tickets y consultas durante la adopción. En una organización de salud formé directamente a 20 usuarios que llevaron la herramienta a una población de más de 200 personas.
6. **Medir antes, medir después.** Línea base levantada antes de intervenir y la misma medición repetida después. Es la única forma de sustentar cualquier mejora.

| Perfil | Qué necesita aprender | Cómo se forma |
|---|---|---|
| Usuarios de negocio | Qué pedir, cómo verificar, cuándo escalar a una persona | En el puesto, con sus casos reales y retroalimentación |
| Equipos técnicos | Prompting, context engineering, construcción y evaluación de sistemas RAG | Casos de trabajo reales, revisión de código y de evaluaciones |
| Grupo núcleo (organizaciones grandes) | Todo lo anterior más cómo replicar y dar soporte | Formación directa y segunda línea de soporte durante la adopción |

## ¿Cómo se mide si la adopción funcionó?

Se mide comparando la misma variable antes y después de intervenir, y distinguiendo el uso que la gente reporta del uso sostenido sin recordatorio. Si nadie levantó una línea base, no hay mejora que sustentar; hay una anécdota.

En la práctica uso cuatro instrumentos:

- **Línea base.** Cuánto tarda hoy la tarea, cuántos errores tiene, cuántas veces se hace. Se mide antes de tocar nada.
- **Uso sostenido frente a uso reportado.** En una encuesta todo el mundo "usa la IA". El dato que importa es cuántos la siguen usando a las seis semanas sin que nadie se lo recuerde.
- **Casos de prueba etiquetados a mano.** Para un asistente que responde preguntas, un conjunto de preguntas con su respuesta correcta, revisadas por una persona del negocio. Las métricas se reportan con intervalo de confianza, no con un solo número.
- **Umbrales que bloquean el despliegue.** Si el asistente no supera el umbral acordado en los casos de prueba, no sale a producción. Así de simple.

Dos ejemplos propios. En el asistente que construimos para los técnicos de campo de [Solutec](/portfolio/2), un servicio de reparación de electrodomésticos, el problema no era el modelo sino el vocabulario: términos que aparecían 88 veces en las notas de los técnicos no figuraban ni una vez en los manuales del fabricante. Un glosario de oficio de nueve entradas, curado a mano y revisable por la dueña del negocio, subió el desempeño de la búsqueda de 1 de 5 a 4 de 5 casos de prueba.

En [Precio Vivo](/portfolio/28), nuestro producto abierto de precios agrícolas, instalé una compuerta de descarte de hipótesis que descartó mi propia hipótesis de partida: el error del modelo empeoró de 0,1667 a 0,1680. Ese resultado negativo está publicado dentro del sitio, junto con la evaluación sobre 165 casos de prueba. Publicar lo que no funcionó es parte de medir en serio.

## ¿Qué no se debe automatizar con IA?

No se automatiza ninguna decisión donde un error no admite revisión humana, ni ninguna donde la responsabilidad debe recaer en una persona. En esos puntos el sistema presenta la información y escala; no decide por su cuenta.

Esto se llama gobierno, y para que sirva tiene que estar escrito en un lenguaje que entienda quien no es técnico. Lo que dejo documentado en cada proyecto:

- **Control de acceso aplicado en la recuperación de documentos**, no pedido al modelo por prompt. Si una persona no puede ver un documento, el asistente tampoco puede usarlo para responderle.
- **Trazabilidad de qué fuente produjo qué respuesta.** Cada respuesta se puede rastrear al documento que la originó.
- **Redacción de datos personales antes de enviar nada al modelo**, con un evaluador que detecta fugas y también sobre-redacción, conforme a la Ley 29733 de Protección de Datos Personales.
- **Abstención como función de primera clase.** Un asistente que dice "no lo sé, te comunico con alguien" es preferible a uno que improvisa. En el caso de Solutec, donde hay riesgo de gas y electricidad, cuando dos técnicos se contradicen el sistema presenta ambas versiones con fecha y jerarquía de fuente y escala la decisión a la dueña, en lugar de elegir una.
- **Quién aprueba qué.** Un documento corto, legible, que diga dónde una persona debe aprobar antes de que algo ocurra.

## ¿Cuánto cuesta adoptar IA en una pyme peruana?

En Árkos la integración técnica de un asistente o una automatización parte de S/ 1,900 (USD 500), y el programa de adopción se cotiza por alcance: número de personas, perfiles a formar y sistemas a conectar. A eso se suma el costo por uso del modelo, que se paga al proveedor, se estima antes de empezar y se limita con topes. Los rangos completos están en [la página de precios](/precios) y el detalle del servicio en [IA aplicada y adopción](/services/integracion-ia).

Lo que no cobro es la primera conversación. Si no sabes si tu equipo necesita esto, o si lo que tienes es un proceso que hay que ordenar antes, [empieza por un diagnóstico](/diagnostico): 30 minutos y una lectura honesta, incluida la respuesta "todavía no".

## Preguntas frecuentes

**¿Cuánto tiempo toma que un equipo adopte la IA?**
Depende del tamaño y del punto de partida, pero la señal que importa aparece entre la cuarta y la octava semana: si la gente sigue usando el asistente sin que nadie se lo recuerde, la adopción ocurrió. Por eso no medimos al terminar la capacitación, sino semanas después.

**¿Sirve la misma formación para gerentes y para desarrolladores?**
No. Un usuario de negocio necesita saber qué pedir, cómo verificar y cuándo escalar. Un equipo técnico necesita prompt engineering, context engineering, construcción de sistemas RAG y evaluación. Formar a todos igual es la forma más rápida de que nadie salga sabiendo qué hacer el lunes.

**¿La IA va a usar los datos de mi empresa para entrenarse?**
No, si la integración se configura para eso. En Árkos los datos de la operación no se usan en entrenamiento, los datos personales se redactan antes de salir del sistema y el acceso a documentos se controla en la recuperación, conforme a la Ley 29733.

**¿Qué pasa si el asistente no sabe la respuesta?**
Debe decirlo y derivar a una persona. La abstención se diseña como función, no como falla. Un asistente que improvisa en un dominio con riesgo hace más daño que no tener asistente.

**¿Cómo sé si valió la pena la inversión?**
Porque hay una línea base medida antes de intervenir y la misma medición repetida después, con la distinción entre uso reportado y uso sostenido. Si no hay línea base, no hay forma honesta de responder esa pregunta, y en Árkos la levantamos siempre antes de empezar.
