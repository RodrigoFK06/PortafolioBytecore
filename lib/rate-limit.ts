// lib/rate-limit.ts
interface RateLimitEntry {
  count: number
  resetTime: number
}

interface RateLimitResult {
  success: boolean
  resetTime?: number
}

// Store en memoria para rate limiting (en producción usar Redis)
const store = new Map<string, RateLimitEntry>()

export async function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now()
  const key = `rateLimit:${identifier}`
  
  // Limpiar entradas expiradas
  const entry = store.get(key)
  
  if (entry && now > entry.resetTime) {
    store.delete(key)
  }
  
  // Obtener o crear entrada actual
  const currentEntry = store.get(key) || {
    count: 0,
    resetTime: now + windowMs
  }
  
  // Incrementar contador
  currentEntry.count++
  
  // Verificar si excede el límite
  if (currentEntry.count > limit) {
    store.set(key, currentEntry)
    return {
      success: false,
      resetTime: currentEntry.resetTime - now
    }
  }
  
  // Actualizar store
  store.set(key, currentEntry)
  
  return {
    success: true
  }
}

// Función para limpiar entradas expiradas periódicamente
export function cleanupExpiredEntries() {
  const now = Date.now()
  
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) {
      store.delete(key)
    }
  }
}

// Limpiar entradas expiradas cada 15 minutos
if (typeof window === 'undefined') { // Solo en el servidor
  setInterval(cleanupExpiredEntries, 15 * 60 * 1000)
}
