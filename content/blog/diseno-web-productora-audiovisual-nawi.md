---
title: "Diseño web para productora audiovisual: el caso de Ñawi Producciones"
description: "Cómo hicimos la web de Ñawi Producciones, una productora audiovisual peruana de cine documental: fondo oscuro, video de portada, su canal de YouTube como portafolio y Next.js."
image: "/nawi.png"
date: "2026-01-10"
author: "Rodrigo Torres"
tags: ["Next.js", "React", "Diseño Web", "UX/UI", "Caso de Estudio"]
---

## El brief: una productora que no quiere parecer una agencia genérica

Ñawi Producciones es una productora audiovisual peruana, con base en Lima y Trujillo, centrada en el cine documental. Su manifiesto lo dice así: filman para conservar la memoria y fortalecer la identidad cultural a través de relatos comunitarios. También hacen video institucional y piezas de marca, pero siempre con una historia detrás, no spots.

Cuando nos contactaron, tenían claro lo que **no** querían: una web genérica de agencia, con sliders de fotos de stock y textos corporativos vacíos. Querían algo que se sintiera como **entrar a una sala de cine**.

## La dirección de diseño: una sala de cine

El sitio es **solo oscuro**, sin modo claro, porque el cine se ve a oscuras. De ahí sale lo demás:

- **Fondo casi negro** (#0a0a0a), como una sala con las luces apagadas
- **Titulares grandes en negrita**, que ocupan buena parte de la pantalla
- **Degradados de rosa a naranja** en los titulares, los mismos colores del logo
- **Pocas cosas por pantalla**, con bastante aire entre secciones

### La portada

La portada es un titular, **"VISIÓN CREATIVA EN CADA HISTORIA"**, sobre un video a pantalla completa. No hay carrusel. Debajo, dos botones:
- **Ver canal**, que lleva a su YouTube, donde está su portafolio
- **Hablemos**, que baja al formulario de contacto

Pusimos YouTube como primer botón porque el portafolio de una productora son sus videos, y donde mejor se ven es en su canal.

### Próximo lanzamiento

Una sección para su próximo documental, **AYARANGA, tierra añorada**, con un botón para ver el video. Cada vez que tienen un proyecto nuevo, esta sección cambia, así que la web no se queda congelada en el día en que se publicó.

### Manifiesto

En vez de un "Sobre nosotros", Ñawi tiene un **manifiesto**: por qué filman y qué buscan con lo que filman. Le habla al cliente que elige productora por lo que esta cree, y no solo por el equipo que tiene.

### Servicios

Seis tarjetas, cada una con un ícono y una línea de explicación:
1. **Dirección y fotografía**
2. **Producción integral**
3. **Arte y color**
4. **Postproducción**
5. **Sonido**
6. **Piezas de marca**

### Proceso de trabajo

Cuatro pasos que le dicen al cliente qué esperar:
1. **Exploración:** tratamiento, referencias y scouting
2. **Preproducción y producción:** plan de rodaje, equipo y logística
3. **Postproducción:** edición, color y sonido
4. **Entrega:** másteres para cine y digital, y piezas derivadas para campaña

## Decisiones técnicas

### Next.js, aunque hoy sea una sola página

Hoy es una landing, pero elegimos Next.js pensando en lo que Ñawi podría sumar después: un blog de detrás de cámaras, un sistema de cotizaciones o una galería privada para clientes. Todo eso entra en el mismo proyecto sin reescribirlo.

### Imágenes para pantallas de alta resolución

Quien contrata a una productora suele mirar la web en pantallas de alta resolución. Las imágenes pasan por `next/image` y se sirven en WebP o AVIF, en el tamaño que pide cada pantalla, incluidas las Retina y 4K.

## El resultado

El cliente lo resumió así: *"Cuando entras a la web, sientes que estás en uno de nuestros documentales."* Era justo lo que buscábamos.

## Tecnologías

- **Framework:** Next.js, React, TypeScript
- **Estilos:** Tailwind CSS (solo modo oscuro)
- **Imágenes:** next/image, WebP, AVIF
- **Video:** YouTube
- **Despliegue:** Vercel

---

*¿Tu web se parece a la de cualquier otra empresa de tu rubro? En **Árkos** diseñamos y construimos sitios a partir de lo que tu negocio hace distinto. [Conversemos](https://xn--rkos-4na.com/#contact).*
