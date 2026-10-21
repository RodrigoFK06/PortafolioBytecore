---
title: "Cómo diseñamos un PMS para alquileres vacacionales desde cero"
description: "Caso técnico de VR PMS, el sistema de gestión de propiedades (PMS) que construimos con Next.js y React para un operador de alquileres vacacionales: calendario, reservas, propiedades y huéspedes en un solo panel."
image: "/vr-pms.png"
date: "2026-02-15"
author: "Rodrigo Torres"
tags: ["Next.js", "React", "PMS", "Caso de Estudio", "SaaS"]
---

## El problema: tres propiedades, WhatsApp y un Google Sheets

Quien opera alquileres vacacionales (por Airbnb, Booking o reservas directas) suele llevar propiedades, reservas, huéspedes y calendarios en hojas de cálculo o en herramientas que no se hicieron para ese trabajo. Lo que sale mal es casi siempre lo mismo: reservas que se cruzan (overbooking), check-ins que se olvidan y nadie que sepa de un vistazo cuánto está ocupado.

Un cliente llegó con ese problema. Tenía 3 propiedades en Perú y coordinaba todo por WhatsApp y Google Sheets. Necesitaba un solo lugar para la operación, pero las opciones del mercado (Guesty, Hostaway) costaban más de USD 100 al mes por propiedad.

## Lo que construimos: VR PMS

**VR PMS** (Vacation Rental Property Management System) es una aplicación web para llevar la operación de alquileres vacacionales desde un solo panel.

### Stack

- **Frontend:** React + Next.js con TypeScript
- **Estilos:** Tailwind CSS + shadcn/ui
- **Iconos:** Lucide React
- **Despliegue:** Vercel

Elegimos Next.js por tres cosas: renderizado en servidor para el SEO del sitio público, API Routes para el backend y páginas estáticas para el sitio comercial del producto.

### Los cinco módulos de la primera versión

#### 1. Panel (Dashboard): el negocio de un vistazo

El panel muestra en tiempo real:
- **Propiedades activas** y su estado
- **Reservas activas** del mes
- **Ingresos del mes**
- **Tasa de ocupación**, con un indicador de bajo, medio o alto
- **Check-ins y check-outs del día**, con hora y nombre del huésped

Cada métrica va en una tarjeta con un ícono de color. Los check-ins salen en verde y los check-outs en ámbar, para que el operador vea primero lo que tiene que atender hoy.

#### 2. Calendario por unidad (Schedule)

Fue el módulo más difícil. Es un **calendario horizontal tipo Gantt**:
- Cada fila es una propiedad o unidad
- Las columnas son los días del mes
- Los bloques de color marcan el estado: **confirmado** (verde), **pendiente** (amarillo), **mantenimiento** (gris), **limpieza** (cian) y **bloqueado** (rosa)

Cada bloque muestra el nombre del huésped y la duración de la estadía. Se navega por meses y tiene un botón "Hoy" para volver a la fecha actual.

#### 3. Reservas (Bookings)

Una tabla con todas las reservas:
- Nombre del huésped
- Propiedad asignada
- Fechas de entrada y salida
- Estado (confirmada, pendiente, cancelada)
- Monto total

#### 4. Propiedades (Properties)

Una cuadrícula con una tarjeta por propiedad:
- Foto
- Disponibilidad
- Ubicación
- Tarifa por noche

#### 5. Huéspedes (Guests)

La lista de huéspedes con nombre, correo y teléfono, que se edita desde la misma lista.

## Decisiones técnicas

### ¿Por qué shadcn/ui y no Material UI?

1. **Los componentes se copian al proyecto.** No son un paquete externo que haya que seguir actualizando.
2. **Se cambian sin pelear con el CSS.** Cada componente es código nuestro.
3. **Están hechos sobre Radix UI**, que ya resuelve buena parte de la accesibilidad: roles y atributos ARIA, y uso con teclado.
4. **Usan Tailwind**, igual que el resto del proyecto, así que no hay dos sistemas de estilos chocando.

### La barra lateral

La barra lateral es oscura y contrasta con el área de trabajo, que es clara; la sección activa se marca con el verde de la marca. Guarda el estado de navegación en el cliente para no volver a renderizar de más.

## Resultados

- **Tiempo de carga del dashboard:** <1.5s (First Contentful Paint)
- **Overbookings eliminados:** el calendario visual previene los cruces de fechas
- **Tiempo de gestión:** de ~2 horas al día (WhatsApp + Sheets) a ~20 minutos al día

## Cómo está hoy

El sistema siguió creciendo después de esta primera versión. Hoy la interfaz está en español y la barra lateral tiene diez secciones: Panel, Calendario, Reservas, Disponibilidad, Propiedades, Limpieza, Mantenimientos, Finanzas, Huéspedes y Usuarios. El calendario muestra en la misma vista las reservas, las limpiezas y los mantenimientos de todas las propiedades, con filtros por propiedad. Y el acceso se separa por rol: administración ve todo el sistema, ventas solo las propiedades que tiene asignadas, y recepción y propietarios entran a su propio portal.

## Tecnologías

- **Framework:** Next.js 14, React 18, TypeScript
- **Estilos:** Tailwind CSS, shadcn/ui
- **Iconos:** Lucide React
- **Calendario:** hecho a medida, sin librería externa
- **Despliegue:** Vercel

---

*¿Llevas tus alquileres entre WhatsApp y hojas de cálculo? En **Árkos** construimos sistemas de gestión a medida. [Escríbenos](https://xn--rkos-4na.com/#contact) y lo conversamos sin costo.*
