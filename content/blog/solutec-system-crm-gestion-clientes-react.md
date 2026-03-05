---
title: "Solutec System: cómo construimos un CRM de gestión de clientes con React"
description: "Caso de estudio sobre Solutec System, un sistema de gestión de clientes para una empresa de estructuras metálicas con filtros avanzados, exportación de datos y panel administrativo moderno."
image: "/solutec.png"
date: "2026-01-20"
author: "Árkos"
tags: ["React", "Material UI", "CRM", "Frontend", "Caso de Estudio"]
---

## El problema: una empresa industrial sin visibilidad sobre sus clientes

Solutec DHA es una empresa trujillana especializada en estructuras metálicas, carpintería metálica, drywall y servicios para minería. Su equipo de ventas manejaba toda la información de clientes en hojas de Excel distribuidas entre varias computadoras. Resultado: **datos duplicados, información desactualizada, y cero capacidad de análisis**.

El gerente necesitaba responder preguntas simples que no podía: ¿Cuántos clientes nuevos tuvimos este mes? ¿Cuántos negocios están pendientes de cierre? ¿Quiénes son nuestros clientes más frecuentes?

## Solutec System: un CRM que hace exactamente lo que necesitan

En vez de implementar un CRM genérico como HubSpot o Salesforce (overkill para una PyME industrial), diseñamos **Solutec System** — un sistema enfocado exclusivamente en las operaciones reales de la empresa.

### Stack tecnológico

- **Frontend:** React 18 con JavaScript
- **UI Library:** Material UI (MUI) — elegida por su apariencia profesional y componentes enterprise-ready
- **Tablas:** DataGrid de MUI con filtros, ordenamiento y paginación
- **Exportación:** Generación de XLSX y CSV desde el navegador
- **Deploy:** Vercel

### La decisión de Material UI

Para este proyecto, elegimos Material UI en vez de Tailwind CSS por tres razones:

1. **Componentes de tabla avanzados:** El DataGrid de MUI incluye filtrado, ordenamiento, selección múltiple y paginación out-of-the-box
2. **Consistencia enterprise:** Los clientes de Solutec DHA son empresas mineras y constructoras acostumbradas a interfaces "de oficina" — Material UI transmite esa seriedad
3. **Velocidad de desarrollo:** Los formularios complejos con validación son más rápidos de implementar con los componentes MUI que con componentes custom

### Funcionalidades principales

#### Panel de métricas

Tarjetas resumen que muestran en tiempo real:
- Total de clientes registrados
- Clientes nuevos del mes
- Negocios en proceso
- Tasa de conversión

#### Listado de clientes con filtros avanzados

La tabla principal permite:
- **Buscar** por nombre, empresa o sector industrial
- **Filtrar** por estado (activo, inactivo, prospecto)
- **Ordenar** por fecha de registro, última interacción, monto total
- **Seleccionar múltiples** registros para acciones masivas

#### Exportación de datos

Un requisito no negociable del cliente: **"Necesito poder sacar mis datos a Excel en cualquier momento"**. Implementamos exportación directa a:
- **XLSX** (compatible con Excel)
- **CSV** (compatible con cualquier herramienta)

La exportación respeta los filtros activos — si el usuario está viendo solo clientes del sector minería, el Excel contiene solo esos registros.

#### Registro y edición de clientes

Formularios estructurados con campos específicos del sector:
- Razón social
- RUC (identificación fiscal peruana)
- Sector industrial (minería, construcción, retail)
- Persona de contacto
- Historial de interacciones

## Lo que aprendimos: las PyMEs no necesitan Salesforce

La lección más valiosa de este proyecto es que **las PyMEs industriales en Latinoamérica no necesitan un CRM con 200 funciones**. Necesitan:

1. **Ver todos sus clientes en un solo lugar** — No más Excel distribuido
2. **Buscar y filtrar rápido** — "Muéstrame todos los clientes de minería"
3. **Exportar a Excel** — Porque el contador lo pide en Excel, siempre
4. **Que funcione rápido** — Sin curva de aprendizaje de 3 meses

Solutec System hace exactamente eso y nada más. Y por eso funciona.

## Contexto: el sitio web corporativo de Solutec DHA

Además del CRM, desarrollamos el sitio web corporativo de Solutec DHA (solutecdha.com) con Next.js y Tailwind CSS. Una web institucional que muestra sus servicios, proyectos y formulario de contacto. Ambos productos trabajan juntos: el sitio web captura leads, y el CRM los gestiona.

## Tecnologías utilizadas

| Categoría | Herramientas |
|-----------|-------------|
| Framework | React 18 |
| UI Library | Material UI (MUI) |
| Tablas | MUI DataGrid |
| Exportación | XLSX, CSV (browser-side) |
| Deploy | Vercel |

---

*¿Tu equipo de ventas sigue usando Excel para gestionar clientes? En **Árkos** construimos CRMs simples y efectivos para PyMEs que no necesitan Salesforce. [Contáctanos](https://xn--rkos-4na.com/#contact).*
