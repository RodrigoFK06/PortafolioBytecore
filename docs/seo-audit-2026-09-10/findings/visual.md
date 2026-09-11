# Auditoría visual — xn--rkos-4na.com (árkos.com)

Viewports: desktop 1440x900, móvil 390x844. 5 páginas: `/`, `/services/integracion-ia`, `/precios`, `/diagnostico`, `/blog/adopcion-de-ia-en-empresas`. Capturas en `screenshots/` (sufijo `_desktop`/`_mobile` = viewport visible, `_full` = página completa).

**Visual/UX: 85/100**
**Images: 65/100**

## Qué funciona

- H1 y CTA principal visibles sin hacer scroll en las 5 páginas, en desktop 1440 y móvil 390 (confirmado con `analyze_visual.py`: `h1_visible: true`, `cta_visible: true` en las 5).
- Sin overflow horizontal en ninguna página/viewport (`scrollWidth == innerWidth` verificado en las 10 combinaciones página×viewport).
- En `/diagnostico` (la página de mayor intención de conversión), el botón "Agendar por WhatsApp" con mensaje prellenado (`wa.me/51961869348?text=...`) queda visible sin scroll también en móvil 390x844.
- Alt text presente y descriptivo en el 100% de las imágenes evaluadas: tarjetas de portafolio usan el patrón `"Captura de pantalla del proyecto: [Nombre]"`, logos de testimonios usan `"Logo de [Cliente]"`, la foto del fundador dice `"Rodrigo Torres, fundador de Árkos"`.
- Lazy loading (`loading="lazy"`) aplicado correctamente en las ~23 imágenes de tarjetas de portafolio, todas debajo del pliegue.
- Estructura semántica y accesibilidad sólidas: `agent_ux_check.py` en home da score 100, 34 landmarks semánticos, 0 elementos interactivos sin nombre accesible.
- Fuente base de 16px, legible en móvil sin necesidad de zoom.
- Imágenes servidas vía el optimizador de Next.js (`/_next/image`), lo que habilita negociación automática de formato moderno (WebP/AVIF) según el header `Accept` del navegador.

## Hallazgos

### 1. Ventana breve de H1 invisible durante la animación de entrada (Low)
El H1 del hero usa una animación de "split text" (probablemente GSAP): en `/`, a ~130ms tras `domcontentloaded` el H1 tiene `opacity: 0` (2 nodos hijos, sin dividir aún); recién a ~290ms pasa a `opacity: 1` con el texto ya dividido en spans (12 nodos). En **todas** las capturas finales de este audit (que esperaron a `networkidle` + margen) el H1 se ve completo y visible — no se encontró ningún caso de H1 vacío en las capturas entregadas. El riesgo es solo para herramientas de captura instantánea o dispositivos/conexiones muy lentos que puedan congelar el frame dentro de esa ventana de ~150-300ms.
- Evidencia: `home_desktop.png`, `home_mobile.png` (H1 visible y completo); medición de timing hecha aparte, no corresponde a un archivo de captura.
- Recomendación: fijar un estado inicial visible por CSS (no depender solo de JS para pasar de opacity 0→1) o añadir un fallback estático para el primer frame / `prefers-reduced-motion` / no-JS.

### 2. Imágenes de portafolio solicitadas a 3840px para un slot de ~403x192px (High)
Las ~23 tarjetas de portafolio en home (RestHUB, FacturArkos, Precio Vivo, Nexora, Meridiano, Trama, etc.) se piden todas con `w=3840&q=75` vía `/_next/image`, pero se renderizan a solo 403x192px. Eso es ~9.5x más ancho de lo necesario (más del doble de lo que pediría incluso una pantalla retina 2x), lo que sugiere ausencia o mala configuración del atributo `sizes` en el componente `<Image>`, forzando potencialmente la descarga de la variante más grande del `srcset` en muchos navegadores.
- Evidencia: `home_desktop_full.png` (grid de tarjetas de portafolio); URLs capturadas en la extracción, ej. `.../_next/image?url=%2Fresthub.webp&w=3840&q=75` renderizada a 403x192.
- Recomendación: configurar `sizes` correctamente en el grid de portafolio (ej. `sizes="(max-width: 768px) 100vw, 420px"`) para que el navegador pida variantes de ~400-800px en vez de 3840px.

### 3. Formatos de origen mixtos, en su mayoría PNG/JPG en vez de WebP/AVIF (Medium)
De los archivos fuente identificados, la mayoría son `.png` (13) o `.jpg/.jpeg` (4: `precio-vivo.jpg`, `LoginOrquestador.jpeg`, `mare.jpg`, `kinetickblack.jpeg`) y solo 4 son `.webp` nativos (`resthub.webp`, `meridiano.webp`, `trama.webp`, `rodrigo-torres.webp`). Al pasar por `/_next/image` es probable que Next.js negocie WebP/AVIF automáticamente, pero **no se confirmó** el `Content-Type` realmente servido (ver "No evaluado").
- Evidencia: URLs en `home_desktop_full.png` / listado de imágenes de portafolio.
- Recomendación: verificar en Network/DevTools que la respuesta real sea `image/webp` o `image/avif`; si no lo es, revisar `images.formats` en `next.config` y que el CDN delante del dominio IDN no esté sirviendo el origen sin transformar.

### 4. Link "Diagnóstico" del header con área de toque de solo 76x20px (Medium)
En desktop 1440, el link de navegación "Diagnóstico" mide 76x20px, por debajo del mínimo recomendado de 48x48px. En móvil 390, tanto "Diagnóstico" como "Contáctanos" del header devuelven un rect de 0x0 (probablemente colapsados dentro de un menú hamburguesa no verificado en este audit).
- Evidencia: `home_desktop.png`, `servicios-ia_desktop.png`, `precios_desktop.png`, `diagnostico_desktop.png`, `blog-adopcion-ia_desktop.png` (header, franja superior).
- Recomendación: ampliar el área de toque del link de header a mínimo 44-48px de alto con padding; confirmar por separado que el botón hamburguesa en móvil cumple 48x48px.

### 5. Mismo "hero image" detectado en las 5 páginas (Info)
`analyze_visual.py` reporta el mismo `hero_image` (el logo del header, `final - LOGO 2-01.png`) en las 5 páginas evaluadas. Esto confirma que ninguna página tiene una imagen o ilustración hero distintiva above-the-fold; el hero es puramente tipográfico. Es una decisión de diseño válida, no un bug, pero limita el reconocimiento visual instantáneo de "qué vende" a solo la copy del H1.
- Evidencia: `home_desktop.png`, `servicios-ia_desktop.png`, `precios_desktop.png`, `diagnostico_desktop.png`, `blog-adopcion-ia_desktop.png`.
- Recomendación: opcional — evaluar un elemento visual de apoyo (mockup, ícono) si se busca reforzar el mensaje en el primer segundo.

### 6. Logo del header se solicita dos veces por carga (Low)
El mismo archivo (`final - LOGO 2-01.png`) se pide dos veces por página vía `/_next/image` con `w=256` en ambos casos (header y footer/CTA final), renderizado a tamaños distintos (124x44 y 158x56).
- Evidencia: `home_desktop_full.png`.
- Recomendación: no crítico; considerar compartir un único recurso con `sizes` apropiado si se optimiza el presupuesto de requests.

## No evaluado

- Peso real transferido (KB) por imagen — no se midió `Content-Length` de red, solo dimensiones declaradas/renderizadas.
- Confirmación del `Content-Type` realmente servido por `/_next/image` (si negocia WebP/AVIF de verdad) — no se inspeccionaron las respuestas HTTP.
- Contraste de color (ratios WCAG) — no se calculó de forma automatizada; solo inspección visual disponible en las capturas.
- Funcionamiento e interacción del menú hamburguesa en móvil (tamaño del botón, apertura) — no se hizo clic ni se midió.
- Viewports tablet (768) y laptop (1366) — el alcance pedido fue solo desktop 1440 y móvil 390.
- Layout shift (CLS) con métricas reales (Lighthouse/CrUX) — no se ejecutó.
- Páginas individuales de casos de estudio del portafolio (`/portfolio/[slug]`) — fuera de las 5 páginas solicitadas.

```json
{"category":"Visual","score":85,"images_score":65,"what_works":["H1 y CTA principal visibles sin scroll en las 5 páginas (desktop 1440 y móvil 390)","Sin overflow horizontal en ninguna página/viewport","CTA de WhatsApp con mensaje prellenado visible sin scroll en /diagnostico móvil","Alt text presente y descriptivo en el 100% de imágenes evaluadas","Lazy loading correcto en tarjetas de portafolio","Accesibilidad semántica sólida (agent_ux_check score 100)","Fuente base 16px legible en móvil","Imágenes servidas vía optimizador de Next.js con negociación de formato"],"findings":[{"title":"Ventana breve de H1 invisible durante animación de entrada","severity":"Low","description":"El H1 del hero pasa por opacity:0 durante ~150-300ms tras domcontentloaded mientras el texto se divide para animarse; en las capturas finales (tras networkidle) el H1 siempre aparece completo y visible.","recommendation":"Fijar estado inicial visible por CSS y añadir fallback estático para el primer frame / no-JS / prefers-reduced-motion."},{"title":"Tarjetas de portafolio solicitadas a 3840px para un slot de ~403x192px","severity":"High","description":"Las ~23 imágenes de portafolio en home se piden con w=3840 vía /_next/image pero se renderizan a 403x192, sugiriendo falta o mala configuración del atributo sizes.","recommendation":"Configurar sizes correctamente en el grid de portafolio para pedir variantes de ~400-800px."},{"title":"Formatos de origen mayormente PNG/JPG en vez de WebP/AVIF","severity":"Medium","description":"13 imágenes de portafolio son PNG y 4 son JPG/JPEG; solo 4 son WebP nativos. Pasan por /_next/image pero no se confirmó el Content-Type realmente servido.","recommendation":"Verificar en Network que la respuesta sea image/webp o image/avif; revisar next.config images.formats si no."},{"title":"Link \"Diagnóstico\" del header con área de toque de 76x20px","severity":"Medium","description":"Por debajo del mínimo recomendado de 48x48px en desktop; en móvil el header colapsa a 0x0, probablemente detrás de un menú hamburguesa no verificado.","recommendation":"Ampliar el área de toque a mínimo 44-48px de alto; confirmar tamaño del botón hamburguesa en móvil."},{"title":"Mismo hero_image detectado en las 5 páginas","severity":"Info","description":"analyze_visual.py detecta el logo del header como hero_image en las 5 páginas; el hero es puramente tipográfico, sin imagen/ilustración distintiva por página.","recommendation":"Opcional: añadir elemento visual de apoyo si se busca reforzar el mensaje en el primer segundo."},{"title":"Logo del header solicitado dos veces por carga de página","severity":"Low","description":"El mismo archivo de logo se pide dos veces (header y footer) vía /_next/image con w=256 en ambos casos.","recommendation":"No crítico; compartir un único recurso con sizes apropiado si se optimiza el presupuesto de requests."}]}
```
