---
title: "CalzaFlow: cómo digitalizamos la producción de calzado con un ERP especializado"
description: "Caso de estudio sobre CalzaFlow, un ERP diseñado específicamente para la industria de fabricación de calzado en Perú, con tablero Kanban de producción, calculadora de cuero y gestión de talleres externos."
image: "/calzaflow.png"
date: "2026-01-25"
author: "Árkos"
tags: ["Next.js", "React", "ERP", "Manufactura", "Caso de Estudio"]
---

## El contexto: la industria del calzado en Perú es artesanal — y eso es un problema operativo

Trujillo es el centro de la industria del calzado en Perú. Miles de pequeñas y medianas fábricas producen zapatos que se venden en todo el país. Pero la gestión de producción sigue siendo mayoritariamente manual: cuadernos, llamadas de WhatsApp a talleres externos, y cálculos de cuero hechos "al ojo".

Un fabricante local nos buscó con un dolor muy específico: **"No sé cuántos pares están en proceso, cuánto cuero necesito, ni si mis talleres van a entregar a tiempo."**

La solución no existía en el mercado. Los ERPs genéricos (SAP, Odoo) no entienden el flujo de producción del calzado. Necesitábamos construir algo desde cero.

## CalzaFlow: un ERP que habla el idioma del zapatero

**CalzaFlow** es un sistema de gestión diseñado exclusivamente para la cadena productiva del calzado. Cada módulo responde a un problema real de la industria.

### Stack tecnológico

- **Framework:** Next.js + React con TypeScript
- **Estilos:** Tailwind CSS con tema dark premium
- **Iconos:** Lucide React
- **Deploy:** Vercel

### Módulo 1: Dashboard de producción

La pantalla principal muestra el estado operativo en tiempo real:
- **Órdenes activas** con cantidad de pares en proceso
- **Pares en talleres satélite** (talleres externos que realizan etapas del proceso)
- **Stock de cuero disponible** (en pies cuadrados)
- **Alertas críticas** que requieren atención inmediata

Las alertas no son genéricas — son alertas de la industria: "Taller El Porvenir tiene 3 días de retraso en aparado" o "Stock de cuero negro por debajo del mínimo".

### Módulo 2: Nueva Orden — El pedido de producción

El formulario de nueva orden fue diseñado con el flujo real del fabricante:

1. **Datos del cliente** (tienda, distribuidor)
2. **Modelo de zapato** seleccionado del catálogo
3. **Matriz de tallas y colores** — una grilla donde el fabricante ingresa cuántos pares necesita por cada combinación de talla (35-44) y color

Esta matriz es fundamental. Un pedido típico no es "100 pares del modelo X", sino "15 pares talla 37 negro, 8 pares talla 39 marrón, 12 pares talla 40 negro…". Sin esta grilla, los errores de tallas son constantes.

### Módulo 3: Componentes — Inventario especializado

El inventario de calzado no son "productos" genéricos. CalzaFlow cataloga componentes específicos de la industria:
- **Suelas** (por tipo y talla)
- **Tacos** (por altura y material)
- **Falsas y plantillas** (por talla y tipo)
- **Cuero** (por tipo, color y cantidad en pies cuadrados)

Cada componente tiene alertas de stock bajo que se calculan automáticamente contra las órdenes activas.

### Módulo 4: Calculadora de cuero — La joya del sistema

Este módulo resuelve uno de los problemas más comunes (y costosos) de la industria: **calcular cuánto cuero comprar**.

La calculadora toma como inputs:
- **Cantidad total de pares** del lote
- **Consumo promedio por par** (en pies cuadrados)
- **Factor de desperdicio** (porcentaje de merma por corte)
- **Precio de mercado** del cuero (por pie cuadrado)

Y calcula:
- Cuero total necesario (incluyendo merma)
- Costo total estimado
- Cuero sobrante proyectado

Antes de CalzaFlow, este cálculo se hacía mental o con calculadora de mano, y los errores generaban sobrecostos importantes o, peor, faltaba cuero a mitad de la producción.

### Módulo 5: Talleres Externos — Kanban de producción

La fabricación de calzado en Perú tiene una característica particular: muchas fábricas no hacen todo internamente. Externalizan etapas del proceso a **talleres satélite** especializados. CalzaFlow trackea esta cadena con un **tablero Kanban de 4 columnas**:

1. **Corte** — El cuero se corta según los moldes del modelo
2. **Aparado** — Las piezas cortadas se cosen para formar la capellada
3. **Armado** — La capellada se une a la suela y se da forma al zapato
4. **Alistado** — Acabados finales, limpieza y empaque

Cada lote se mueve entre columnas conforme avanza en la cadena. El fabricante puede ver de un vistazo cuántos pares están en cada etapa y en qué taller.

## Lo que aprendimos: los ERPs verticales ganan

La principal lección de CalzaFlow es que **un ERP genérico nunca va a servir para una industria tan especializada**. Las entidades del sistema (modelos, tallas, tipos de cuero, talleres de aparado) no existen en ningún ERP estándar.

Cuando el software habla el idioma del usuario — "pares en aparado", no "unidades en proceso" — la adopción es inmediata. No necesitas capacitación porque el sistema refleja exactamente lo que el fabricante ya hace a mano.

## Tecnologías utilizadas

| Categoría | Herramientas |
|-----------|-------------|
| Framework | Next.js 14, React 18, TypeScript |
| Estilos | Tailwind CSS (dark theme) |
| UI | Componentes custom, Lucide React |
| Kanban | Implementación custom |
| Deploy | Vercel |

---

*¿Tu industria necesita un sistema de gestión a medida? En **Árkos** nos especializamos en ERPs verticales que hablan el idioma de tu negocio. [Hablemos](https://xn--rkos-4na.com/#contact).*
