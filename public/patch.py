"""
Patch 2: Fix broken HTML in ShaliCotizacion.html.
The previous patch injected new content mid-table instead of replacing the whole block.
This script replaces lines 181-256 (the broken section) with a clean version.
"""
with open("ShaliCotizacion.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Lines are 1-indexed. We keep:
#   lines 0..179  (before the Alcance section header)
#   lines 256..   (from the fraccionamiento bullet onwards)
# We replace lines 180..255 with the clean alcance block.

# Find boundary: line containing '<h2' before "Alcance del Desarrollo"
# and line containing '</div>' closing the old table.
# Based on view: broken section starts at line 181 (0-indexed 180) and ends at line 256 (0-indexed 255)

before = lines[:180]   # up to and not including old h2

# New alcance block (to go inside the existing .rounded-2xl .fx-card div)
new_alcance = """\
          <h2 class="text-lg font-semibold mb-4"><span class="shiny-text">Alcance del Desarrollo</span></h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6">Detalle exhaustivo de las funcionalidades solicitadas y su complejidad técnica estimada para el Sistema ERP Integral.</p>

          <div class="grid gap-4">
            <!-- Item 1 -->
            <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
              <div class="flex items-start justify-between gap-3 mb-2">
                <h4 class="font-bold text-sm text-neutral-900 dark:text-white">El fin del Copy-Paste (Roles Ultra-Granulares)</h4>
                <span class="inline-flex items-center rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap">Media-Alta</span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">Ya no es solo un rol de &ldquo;Vendedor&rdquo; genérico. Tabla relacional <code class="bg-neutral-100 dark:bg-neutral-800 px-1 rounded">vendedor_propiedad</code> para asignar qué casas específicas puede ver cada punto de venta.</p>
            </div>
            <!-- Item 2 -->
            <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
              <div class="flex items-start justify-between gap-3 mb-2">
                <h4 class="font-bold text-sm text-neutral-900 dark:text-white">Creación Automática de Propietarios</h4>
                <span class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap">Media</span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">Al crear la casa en el panel, se dispara la creación del usuario en Supabase Auth, generando una contraseña (o magic link) y asignando el RLS exclusivo para esa propiedad.</p>
            </div>
            <!-- Item 3 -->
            <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
              <div class="flex items-start justify-between gap-3 mb-2">
                <h4 class="font-bold text-sm text-neutral-900 dark:text-white">Notificaciones por Correo Automáticas</h4>
                <span class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap">Media</span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">Integración con Resend / SendGrid o AWS SES. Webhooks o triggers de DB para enviar correo al admin cada vez que un propietario actualice fechas bloqueadas.</p>
            </div>
            <!-- Item 4 -->
            <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
              <div class="flex items-start justify-between gap-3 mb-2">
                <h4 class="font-bold text-sm text-neutral-900 dark:text-white">Respaldos Locales &mdash; El &ldquo;Botón del Miedo&rdquo;</h4>
                <span class="inline-flex items-center rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap">Baja</span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">Botón en el panel de admin que hace un fetch y descarga un <code class="bg-neutral-100 dark:bg-neutral-800 px-1 rounded">.csv / .xlsx</code> con reservas y clientes. Valor comercial enorme por la paz mental que genera.</p>
            </div>
            <!-- Item 5 -->
            <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
              <div class="flex items-start justify-between gap-3 mb-2">
                <h4 class="font-bold text-sm text-neutral-900 dark:text-white">Reglas de Mascotas y Precios Dinámicos</h4>
                <span class="inline-flex items-center rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap">Media</span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">Campo <code class="bg-neutral-100 dark:bg-neutral-800 px-1 rounded">JSONB</code> en la tabla de propiedades para reglas flexibles (ej. <code class="bg-neutral-100 dark:bg-neutral-800 px-1 rounded">{"permite_mascotas": true, "tarifa_x_mascota": 60}</code>). Sin columnas hardcodeadas.</p>
            </div>
            <!-- Item 6 -->
            <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
              <div class="flex items-start justify-between gap-3 mb-2">
                <h4 class="font-bold text-sm text-neutral-900 dark:text-white">Comisiones Escalonadas por Volumen</h4>
                <span class="inline-flex items-center rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap">Alta</span>
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400">Lógica de negocio avanzada: el sistema lee el historial mensual del vendedor, determina en qué escalón de metas está y aplica el % de comisión correspondiente. Requiere consultas cruzadas optimizadas.</p>
            </div>
          </div>

"""

after = lines[256:]    # from the fraccionamiento bullets onward

new_lines = before + [new_alcance] + after

with open("ShaliCotizacion.html", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Done. Total lines:", len(new_lines))
