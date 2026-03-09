import sys

with open("ShaliCotizacion.html", "r", encoding="utf-8") as f:
    content = f.read()

# --- 1. CLAUSULA DE CONTINUIDAD ---
OLD_SAAS_END = """                </div>
              </div>

            </div>
          </div>"""

NEW_SAAS_END = """                </div>
              </div>

              <!-- Clausula de continuidad -->
              <div class="mt-5 rounded-xl border border-[#328298]/30 bg-[#D6EFF2]/15 dark:bg-[#1D4E6A]/15 p-4 text-xs text-neutral-700 dark:text-neutral-300 col-span-full">
                <p class="font-bold text-[#1D4E6A] dark:text-[#D6EFF2] uppercase tracking-wide text-[10px] mb-3">Clausula de Continuidad del Servicio (Modalidad Mensual)</p>
                <div class="grid gap-3 sm:grid-cols-3">
                  <div class="flex items-start gap-2">
                    <span class="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#328298] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                    <p><strong>Meses 1&ndash;6:</strong> Cuota completa segun el plan elegido (S/ 700 u S/ 800). Periodo de amortizacion activa del desarrollo.</p>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#328298] text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <p><strong>Meses 7&ndash;12 (obligatorio):</strong> Cuota reducida a la mitad (S/ 350 u S/ 400). Este segundo ciclo de 6 meses forma parte integral del contrato y no puede omitirse.</p>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#266F87] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                    <p><strong>Mes 13+ (opcional):</strong> Plan de mantenimiento minimo de <strong>S/ 40&ndash;50 / mes</strong> para ajustes menores. Al ser un sistema a medida, se recomienda mantener este soporte para garantizar su correcto funcionamiento a largo plazo.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>"""

if OLD_SAAS_END not in content:
    print("ERROR: marcador SAAS_END no encontrado")
    sys.exit(1)
content = content.replace(OLD_SAAS_END, NEW_SAAS_END, 1)
print("OK clausula continuidad")


# --- 2. DESCUENTO PAGO UNICO ANTICIPADO ---
OLD_FRAC = """                    <div class="flex items-center gap-2">
                      <span class="h-2 w-2 rounded-full bg-[#328298]"></span>
                      <span><strong>Por hitos:</strong> 4 cuotas del 25% seg\u00fan avance</span>
                    </div>
                  </div>
                </div>
              </div>"""

NEW_FRAC = """                    <div class="flex items-center gap-2">
                      <span class="h-2 w-2 rounded-full bg-[#328298]"></span>
                      <span><strong>Por hitos:</strong> 4 cuotas del 25% seg\u00fan avance</span>
                    </div>
                  </div>
                </div>
                <!-- Descuento pago cash anticipado -->
                <div class="mt-3 rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 px-4 py-3 flex items-start gap-3">
                  <span class="text-green-600 dark:text-green-400 font-bold text-base leading-none mt-0.5">&#10003;</span>
                  <div class="text-xs">
                    <p class="font-bold text-green-800 dark:text-green-300 mb-1">Descuento por Pago Cash &mdash; S/ 300 menos</p>
                    <p class="text-green-700 dark:text-green-400">Si el cliente realiza el pago completo en efectivo y por adelantado en un solo desembolso, se aplica un descuento directo de <strong>S/ 300</strong> sobre el precio de cualquier opci\u00f3n.</p>
                    <div class="mt-2 flex flex-wrap gap-3">
                      <span class="rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-3 py-1 font-semibold">Opci\u00f3n 1 al contado: S/ 3,200</span>
                      <span class="rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-3 py-1 font-semibold">Opci\u00f3n 2 al contado: S/ 3,700</span>
                    </div>
                  </div>
                </div>
              </div>"""

if OLD_FRAC not in content:
    print("ERROR: marcador FRAC no encontrado")
    sys.exit(1)
content = content.replace(OLD_FRAC, NEW_FRAC, 1)
print("OK descuento pago anticipado")


with open("ShaliCotizacion.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Archivo guardado")
