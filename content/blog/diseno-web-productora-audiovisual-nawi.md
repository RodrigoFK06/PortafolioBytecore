---
title: "Diseño web para productora audiovisual: el caso de Ñawi Producciones"
description: "Cómo diseñamos una web con estética cinematográfica para una productora audiovisual de cine documental, con integración de YouTube, modo dark premium y arquitectura Next.js."
image: "/nawi.png"
date: "2026-01-10"
author: "Rodrigo Torres"
tags: ["Next.js", "React", "Diseño Web", "UX/UI", "Caso de Estudio"]
---

## El brief: una productora que no quiere parecer una agencia genérica

Ñawi Producciones es una productora audiovisual dedicada al cine documental. Su misión es conservar la memoria y fortalecer la identidad cultural a través de relatos comunitarios. No hacen spots publicitarios — hacen cine con propósito.

Cuando nos contactaron, tenían claro lo que **no** querían: una web genérica de agencia con sliders de stock photos y textos corporativos vacíos. Querían algo que se sintiera como **entrar a una sala de cine**.

## La dirección de diseño: cinematográfico y visceral

### Paleta y estética

Optamos por un enfoque **dark-theme exclusivo** — no hay modo claro. La razón es conceptual: el cine se ve en la oscuridad. Todo el diseño gira alrededor de esta premisa:

- **Fondo negro profundo** (#0a0a0a) que simula una sala de cine
- **Tipografía bold y limpia** — títulos grandes que ocupan todo el viewport
- **Acentos en gradientes cálidos** (rosa a naranja) que evocan la calidez de las historias humanas
- **Sin ruido visual** — cada sección respira, con espaciados generosos

### La Hero Section: impacto inmediato

El headline ocupa prácticamente toda la pantalla: **"VISIÓN CREATIVA EN CADA HISTORIA"**. No hay carousel, no hay slider — solo una frase poderosa, un subtítulo y dos CTAs directos:
- Ir a su canal de YouTube (donde vive su portafolio)
- Formulario de contacto

La decisión de poner YouTube como CTA principal fue estratégica: el portafolio de una productora audiovisual no son mockups — son videos. Mandarlos directamente al canal reduce fricción.

### Próximo Lanzamiento: crear anticipación

Una sección dedicada al documental **AYARANGA** — su próximo lanzamiento. Esto convierte la web en algo vivo, no estático. Cada vez que tienen un nuevo proyecto, esta sección se actualiza y genera razones para volver.

### Manifiesto: la filosofía como diferenciador

En vez de un "Sobre nosotros" genérico, Ñawi tiene un **manifiesto**. Es una declaración de principios que explica por qué filman, qué los motiva, y qué creen. Esto conecta emocionalmente con clientes potenciales que buscan un equipo con valores alineados, no solo habilidades técnicas.

### Servicios: lo que hacen, sin adornos

Cinco servicios presentados como tarjetas limpias:
1. **Dirección y Fotografía**
2. **Producción**
3. **Arte y Color**
4. **Post-producción**
5. **Sonido**

Cada tarjeta tiene un ícono descriptivo y una explicación de una línea. Sin prosa innecesaria.

### Proceso de trabajo: transparencia operativa

Cuatro pasos lineales que le dicen al cliente exactamente qué esperar:
1. **Exploración** — Entender la historia
2. **Producción** — Filmar
3. **Post-producción** — Editar
4. **Entrega** — Producto final

## Decisiones técnicas

### Next.js para una web que podría crecer a plataforma

Aunque hoy es una landing page, elegimos Next.js por la escalabilidad futura. Si Ñawi decide agregar un blog de detrás de cámaras, un sistema de cotizaciones, o una galería privada para clientes, la arquitectura lo soporta sin reescribir nada.

### Rendimiento en dispositivos con pantallas de alta resolución

Las productoras audiovisuales atraen un público con dispositivos de alta gama. Optimizamos todas las imágenes para displays Retina/4K con el componente `next/image` y formatos WebP/AVIF.

## El resultado: una web que se siente como cine

El feedback del cliente lo resumió perfecto: *"Cuando entras a la web, sientes que estás en uno de nuestros documentales."*

Eso es exactamente lo que buscábamos. Una web de productora audiovisual no debería parecer una web — debería parecer una experiencia.

## Tecnologías utilizadas

| Categoría | Herramientas |
|-----------|-------------|
| Framework | Next.js, React, TypeScript |
| Estilos | Tailwind CSS (dark theme) |
| Optimización | next/image, WebP, AVIF |
| Integración | YouTube embed |
| Deploy | Vercel |

---

*¿Necesitas una web que transmita la esencia de tu marca? En **Árkos** no hacemos webs genéricas — diseñamos experiencias. [Conversemos](https://xn--rkos-4na.com/#contact).*
