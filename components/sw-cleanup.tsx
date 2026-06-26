"use client"

import { useEffect } from "react"

// Este sitio NO es PWA. Si quedó un service worker viejo registrado en el mismo
// origen (p. ej. de otro proyecto corrido antes en localhost:3000), interceptaría
// las navegaciones y serviría un shell cacheado/roto (síntoma: "carga la 1ª vez,
// se cuelga al recargar"). Lo desregistramos y limpiamos sus caches.
export function ServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return

    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => registrations.forEach((r) => r.unregister()))
      .catch(() => {})

    if (typeof caches !== "undefined") {
      caches
        .keys()
        .then((keys) => keys.forEach((k) => caches.delete(k)))
        .catch(() => {})
    }
  }, [])

  return null
}
