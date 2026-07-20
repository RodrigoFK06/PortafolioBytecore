---
title: "Solutec System: cómo construimos un CRM de gestión de clientes con React"
description: "Caso de estudio sobre Solutec System, el CRM/ERP que construimos para Solutec DHA — servicio técnico a domicilio de reparación de electrodomésticos en Lima — con filtros avanzados, exportación a Excel y panel administrativo moderno."
image: "/solutec.png"
date: "2026-01-20"
author: "Rodrigo Torres"
tags: ["React", "Material UI", "CRM", "Frontend", "Caso de Estudio"]
---

## El problema: un servicio técnico con miles de clientes y todo en WhatsApp

Solutec DHA es un servicio técnico a domicilio liderado por Dharcy Villafuerte, especializado en reparación de electrodomésticos en Lima (refrigeradoras, lavadoras, cocinas, termas, campanas extractoras). Más de **2,500 clientes atendidos** en distritos como San Isidro, Miraflores, La Molina y Surco — y toda esa cartera vivía en **conversaciones de WhatsApp, una agenda física y hojas de Excel sueltas**.

Dharcy necesitaba responder preguntas operativas que su flujo no le permitía: ¿qué clientes tengo agendados esta semana?, ¿cuántas reparaciones repetí en el mismo aparato?, ¿qué garantías siguen vigentes?, ¿quiénes son mis clientes recurrentes y a quiénes les debo seguimiento?

## Solutec System: un CRM que hace exactamente lo que necesita un servicio técnico

En vez de implementar un CRM genérico como HubSpot o Salesforce (overkill para un servicio técnico unipersonal), diseñamos **Solutec System** — un sistema enfocado exclusivamente en la operación real del negocio.

### Stack tecnológico

- **Frontend:** React 18 con JavaScript
- **UI Library:** Material UI (MUI) — elegida por su apariencia profesional y componentes enterprise-ready
- **Tablas:** DataGrid de MUI con filtros, ordenamiento y paginación
- **Exportación:** Generación de XLSX y CSV desde el navegador
- **Deploy:** Vercel

### La decisión de Material UI

Para este proyecto, elegimos Material UI en vez de Tailwind CSS por tres razones:

1. **Componentes de tabla avanzados:** El DataGrid de MUI incluye filtrado, ordenamiento, selección múltiple y paginación out-of-the-box
2. **Consistencia operativa:** Es una herramienta de trabajo interno que se usa todos los días — Material UI da una interfaz "de oficina" sobria y predecible que no estorba
3. **Velocidad de desarrollo:** Los formularios con validación son más rápidos de implementar con los componentes MUI que con componentes custom

### Funcionalidades principales

#### Panel de métricas

Tarjetas resumen que muestran en tiempo real:
- Total de clientes registrados
- Clientes nuevos del mes
- Servicios en proceso
- Tasa de reincidencia (clientes que vuelven)

#### Listado de clientes con filtros avanzados

La tabla principal permite:
- **Buscar** por nombre, distrito o tipo de electrodoméstico
- **Filtrar** por estado (agendado, en servicio, finalizado, garantía vigente)
- **Ordenar** por fecha del último servicio, distrito o tipo de equipo
- **Seleccionar múltiples** registros para acciones masivas

#### Exportación de datos

Un requisito no negociable de Dharcy: **"Necesito poder sacar mis datos a Excel en cualquier momento"**. Implementamos exportación directa a:
- **XLSX** (compatible con Excel)
- **CSV** (compatible con cualquier herramienta)

La exportación respeta los filtros activos — si Dharcy está viendo solo clientes con garantía vigente este mes, el Excel contiene solo esos registros.

#### Registro y edición de clientes

Formularios estructurados con campos específicos del rubro:
- Nombre y datos de contacto
- DNI (identificación peruana)
- Distrito y dirección
- Tipo de electrodoméstico y marca
- Diagnóstico, repuestos usados y costo
- Vigencia de garantía
- Historial de servicios anteriores

## Lo que aprendimos: los servicios técnicos no necesitan Salesforce

La lección más valiosa de este proyecto es que **un servicio técnico a domicilio en Latinoamérica no necesita un CRM con 200 funciones**. Necesita:

1. **Ver todos sus clientes en un solo lugar** — No más WhatsApp + Excel disperso
2. **Buscar y filtrar rápido** — "Muéstrame los clientes de Miraflores con garantía vigente"
3. **Exportar a Excel** — Porque la contabilidad siempre lo pide en Excel
4. **Que funcione rápido en celular** — Las visitas pasan en casa del cliente, no en una oficina

Solutec System hace exactamente eso y nada más. Y por eso funciona.

## Contexto: la landing pública de Solutec DHA

Además del CRM, desarrollamos la landing pública de Solutec DHA (solutecdha.com) con Next.js y Tailwind CSS. Una landing premium con tono cálido y conversacional, conversaciones reales de WhatsApp con clientes satisfechos, galería de trabajos realizados y formulario de diagnóstico sin compromiso. Ambos productos trabajan juntos: la landing capta consultas desde Google y WhatsApp, y el CRM las gestiona end-to-end.

## Tecnologías utilizadas

| Categoría | Herramientas |
|-----------|-------------|
| Framework | React 18 |
| UI Library | Material UI (MUI) |
| Tablas | MUI DataGrid |
| Exportación | XLSX, CSV (browser-side) |
| Deploy | Vercel |

---

*¿Tu negocio sigue dependiendo de WhatsApp y Excel para gestionar clientes? En **Árkos** construimos CRMs simples y efectivos para servicios y PYMEs que no necesitan Salesforce. [Contáctanos](https://xn--rkos-4na.com/#contact).*
