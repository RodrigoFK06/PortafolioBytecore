// lib/firebase-admin.ts
// Inicialización perezosa de firebase-admin para el storage TEMPORAL de adjuntos
// del cuestionario fine dining (bucket del proyecto "freedy"). Solo se usa en el
// servidor; la llave privada nunca llega al cliente.
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'

export const hasFirebaseAdminConfig = (): boolean =>
  Boolean(
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY &&
      process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
  )

const getAdminApp = (): App => {
  const existing = getApps()
  if (existing.length) return existing[0]
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // En .env la llave viaja con "\n" literales; el SDK necesita saltos reales.
      privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
  })
}

export const getSurveyBucket = () => getStorage(getAdminApp()).bucket()
