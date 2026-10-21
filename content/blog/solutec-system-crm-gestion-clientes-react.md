---
title: "Solutec System: cómo construimos un CRM de gestión de clientes con React"
description: "Caso de estudio de Solutec System, el CRM que construimos con React para Solutec DHA, un servicio técnico de electrodomésticos a domicilio en Lima: cartera de clientes, filtros y exportación a Excel."
image: "/solutec.png"
date: "2026-01-20"
author: "Rodrigo Torres"
tags: ["React", "Material UI", "CRM", "Frontend", "Caso de Estudio"]
---

## El problema: un servicio técnico con miles de clientes y todo en WhatsApp

Solutec DHA es un servicio técnico a domicilio liderado por Dharcy Villafuerte, especializado en reparación de electrodomésticos en Lima (refrigeradoras, lavadoras, cocinas, termas, campanas extractoras). Tiene más de **2,500 clientes atendidos** en distritos como San Isidro, Miraflores, La Molina y Surco, y toda esa cartera vivía en **conversaciones de WhatsApp, una agenda física y hojas de Excel sueltas**.

Dharcy necesitaba responder preguntas que su forma de trabajar no le dejaba contestar: ¿qué clientes tengo agendados esta semana?, ¿cuántas reparaciones repetí en el mismo aparato?, ¿qué garantías siguen vigentes?, ¿quiénes son mis clientes recurrentes y a quiénes les debo seguimiento?

## Solutec System: un CRM hecho para un servicio técnico

Descartamos un CRM genérico como HubSpot o Salesforce: para un servicio técnico de este tamaño era demasiado sistema. Diseñamos **Solutec System**, que solo tiene lo que la operación usa.

### Stack

- **Frontend:** React 18 con JavaScript
- **Componentes:** Material UI (MUI)
- **Tablas:** DataGrid de MUI con filtros, ordenamiento y paginación
- **Exportación:** XLSX y CSV generados en el navegador
- **Despliegue:** Vercel

### Por qué Material UI

Aquí elegimos Material UI en vez de Tailwind CSS por tres razones:

1. **La tabla.** El DataGrid de MUI ya trae filtros, ordenamiento, selección múltiple y paginación.
2. **Es una herramienta de oficina.** Se usa todo el día, y Material UI da una interfaz sobria y predecible que no distrae.
3. **Los formularios.** Con validación, salen más rápido con los componentes de MUI que hechos desde cero.

### Qué hace

#### Panel de métricas

Tarjetas que muestran en tiempo real:
- Total de clientes registrados
- Clientes nuevos del mes
- Servicios en proceso
- Tasa de reincidencia (clientes que vuelven)

#### Lista de clientes con filtros

La tabla principal permite:
- **Buscar** por nombre, distrito o tipo de electrodoméstico
- **Filtrar** por estado (agendado, en servicio, finalizado, garantía vigente)
- **Ordenar** por fecha del último servicio, distrito o tipo de equipo
- **Seleccionar varios** registros para acciones en bloque

#### Exportación a Excel

Dharcy lo pidió desde el principio: **"Necesito poder sacar mis datos a Excel en cualquier momento"**. La tabla exporta a:
- **XLSX** (Excel)
- **CSV** (cualquier otra herramienta)

La exportación respeta los filtros activos: si Dharcy está viendo solo los clientes con garantía vigente este mes, el Excel trae solo esos registros.

#### Ficha de cliente

Cada cliente tiene campos propios del rubro:
- Nombre y datos de contacto
- DNI
- Distrito y dirección
- Tipo de electrodoméstico y marca
- Diagnóstico, repuestos usados y costo
- Vigencia de la garantía
- Historial de servicios anteriores

Con el tiempo, el sistema creció más allá de la cartera: hoy también lleva los servicios, los pagos, los técnicos, el inventario y las cuentas.

## Lo que aprendimos: un servicio técnico no necesita Salesforce

**Un servicio técnico a domicilio no necesita un CRM con 200 funciones.** Necesita cuatro cosas:

1. **Ver todos sus clientes en un solo lugar**, no repartidos entre WhatsApp y Excel.
2. **Buscar y filtrar rápido:** "muéstrame los clientes de Miraflores con garantía vigente".
3. **Exportar a Excel**, porque la contabilidad siempre lo pide en Excel.
4. **Que funcione rápido en el celular**, porque las visitas pasan en casa del cliente, no en una oficina.

Solutec System hace eso, y Dharcy lo sigue usando hoy para operar su servicio.

## La web pública de Solutec DHA

Además del CRM, hicimos la web de Solutec DHA ([solutecdha.com](https://www.solutecdha.com)) con Next.js y Tailwind CSS: tono cercano, conversaciones reales de WhatsApp con clientes, galería de trabajos y un formulario de diagnóstico sin compromiso. Las dos piezas trabajan juntas: la web recibe las consultas que llegan desde Google y WhatsApp, y el CRM les hace seguimiento hasta cerrar el servicio.

## Tecnologías

- **Framework:** React 18
- **Componentes:** Material UI (MUI)
- **Tablas:** MUI DataGrid
- **Exportación:** XLSX, CSV (en el navegador)
- **Despliegue:** Vercel

---

*¿Tu negocio todavía lleva sus clientes entre WhatsApp y Excel? En **Árkos** construimos CRMs pequeños para servicios y pymes que no necesitan Salesforce. [Escríbenos](https://xn--rkos-4na.com/#contact).*
