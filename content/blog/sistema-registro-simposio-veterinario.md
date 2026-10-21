---
title: "Cómo creamos el sistema de registro para un simposio veterinario internacional"
description: "Caso de estudio de la landing y el sistema de registro del II Simposio Veterinario Internacional 2026 en Trujillo: cuenta regresiva, agenda, inscripción y qué hicimos con el sitio cuando terminó el evento."
image: "/simposio.png"
date: "2026-01-15"
author: "Rodrigo Torres"
tags: ["Next.js", "React", "Landing Page", "Eventos", "Caso de Estudio"]
---

## El reto: llenar un evento académico con una web propia

El Círculo de Estudios Claude Bourgelat organizaba el **II Simposio Veterinario Internacional 2026** en Trujillo: cuatro días, del 4 al 7 de junio de 2026, con dos días de conferencias en el Hotel Costa del Sol, talleres prácticos antes y después, ponentes nacionales e internacionales y certificado de participación.

La edición anterior se había promocionado por WhatsApp y redes sociales, sin una web propia, y el resultado fueron inscripciones desordenadas y pocas visitas convertidas en inscritos. Esta vez necesitaban un sitio que explicara el evento y llevara al visitante hasta la inscripción.

## Lo que construimos

### Stack

- **Framework:** Next.js + React
- **Estilos:** Tailwind CSS
- **Prototipado:** v0
- **Despliegue:** Vercel

### El diseño: académico, con la fecha siempre a la vista

La paleta parte de un azul oscuro, que se asocia a lo académico, con acentos en verde azulado para que no se vea anticuada. Los títulos van en serif, que también remite a lo académico, y el texto en sans-serif, que se lee mejor en pantalla.

### La portada

Mientras las inscripciones estuvieron abiertas, la portada tenía cuatro piezas:

1. **El logo del evento y la fecha**, grandes
2. **La sede:** Trujillo, Perú
3. **Una cuenta regresiva** en días, horas, minutos y segundos
4. **El botón de inscripción**

En un evento con fecha fija, la cuenta regresiva le recuerda al visitante que el plazo se acaba.

### Las cifras del evento

Debajo de la portada, una franja con la cantidad de ponentes internacionales, los días del evento y los talleres prácticos, con números que se animan al aparecer.

### Sobre el evento

Un texto corto que presenta los temas del simposio: cirugía abdominal, ecografía e investigación clínica veterinaria. Sirve para el SEO y para que un profesional decida si le vale la pena dedicarle esos días.

### Cuatro razones para asistir

Cuatro tarjetas: ponencias magistrales con especialistas internacionales, talleres prácticos, encuentro con colegas del sector y certificado de participación. Cada una con un ícono y una línea que dice qué se lleva el asistente.

### Patrocinadores

Una franja pequeña con los logos de las marcas e instituciones que respaldaban el evento. A un veterinario que duda, ver nombres que conoce le da confianza.

### WhatsApp siempre a mano

Un botón flotante de WhatsApp en todas las pantallas. El público veterinario en Perú consulta más por WhatsApp que por formulario, así que las consultas tenían que entrar por ahí.

## Después del evento

El simposio se realizó el 5 y 6 de junio de 2026, con talleres el 4 y el 7. Muchos sitios de eventos quedan abandonados al día siguiente, con la cuenta regresiva en cero y un botón de inscripción que ya no lleva a nada. Aquí se cerró la inscripción y la portada pasó a decir «Edición 2026 realizada». Hoy el sitio muestra el programa tal como se dictó, con sus 15 ponencias, los ponentes, la sede, lo que dijeron los asistentes de la primera edición y un enlace a las próximas ediciones.

## Lo que aprendimos sobre sitios de eventos

### 1. La cuenta regresiva tiene que ser real

Una cuenta regresiva que no lleva a nada frustra. La nuestra estaba atada a la fecha real del evento y desaparecía sola el día del inicio.

### 2. En un evento académico, el diseño tiene que verse serio

Los veterinarios esperan seriedad. Un diseño que parezca de startup los aleja; la serif, una paleta sobria y la información ordenada como un programa académico dan confianza.

### 3. El botón de inscripción tiene que estar siempre a la vista

Tiene que verse sin hacer scroll. Lo pusimos en la portada, en la barra de navegación fija y al final de cada sección.

### 4. El sitio no termina con el evento

Cuando el evento acaba, se cierra la inscripción y la web pasa a ser el registro de la edición. La próxima convocatoria arranca con un sitio que ya tiene programa, ponentes y opiniones que mostrar.

## Tecnologías

- **Framework:** Next.js, React
- **Estilos:** Tailwind CSS
- **Prototipado:** v0
- **Animaciones:** CSS keyframes (cuenta regresiva)
- **Despliegue:** Vercel

---

*¿Organizas un evento profesional y necesitas que la gente se inscriba? En **Árkos** hacemos la web y el sistema de inscripción. [Hablemos](https://xn--rkos-4na.com/#contact).*
