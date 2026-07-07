// app/api/survey/upload/route.ts
// Autoriza uploads directos navegador → Firebase Storage para el cuestionario
// fine dining. Los archivos NO pasan por esta función (evita el límite de ~4.5 MB
// del body en serverless). Flujo en dos pasos:
//   1. action "sign":     valida tipo/tamaño y emite URL firmada de subida (PUT).
//   2. action "complete": tras el PUT, escribe el token de descarga vía setMetadata
//      y devuelve la URL permanente. El token NO puede viajar como header del PUT:
//      HTTP/2 pone los headers en minúsculas y Firebase exige la clave camelCase
//      exacta "firebaseStorageDownloadTokens" en la metadata.
// Requiere las variables FIREBASE_ADMIN_* (storage temporal, proyecto "freedy").
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { getSurveyBucket, hasFirebaseAdminConfig } from '@/lib/firebase-admin'
import { FD_ALLOWED_CONTENT_TYPES, FD_MAX_FILE_SIZE, FD_MAX_FILES } from '@/lib/fine-dining-survey'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bodySchema = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('sign'),
    name: z.string().min(1).max(200),
    type: z.string().min(1).max(100),
    size: z.number().int().positive().max(FD_MAX_FILE_SIZE),
  }),
  z.object({
    action: z.literal('complete'),
    // Solo objetos del propio cuestionario: nunca mintear tokens de otras rutas.
    path: z.string().regex(/^estudio\/fine-dining\/[\w.\-]+$/),
  }),
])

const isAllowedType = (type: string): boolean =>
  FD_ALLOWED_CONTENT_TYPES.some((allowed) =>
    allowed.endsWith('/*') ? type.startsWith(allowed.slice(0, -1)) : type === allowed,
  )

const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIP) return realIP
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    if (!hasFirebaseAdminConfig()) {
      console.error('Variables FIREBASE_ADMIN_* no configuradas: adjuntos deshabilitados')
      return NextResponse.json(
        { error: 'La subida de archivos no está disponible por el momento.' },
        { status: 503 },
      )
    }

    // Cada archivo consume 2 peticiones (sign + complete). Margen generoso: el
    // límite existe para frenar abuso, no al grupo llenando el formulario junto.
    const clientIP = getClientIP(request)
    const rateLimitResult = await rateLimit(`survey-upload:${clientIP}`, FD_MAX_FILES * 10, 60 * 60 * 1000)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Demasiadas subidas desde esta conexión. Intenta más tarde.' },
        { status: 429 },
      )
    }

    const parsed = bodySchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Solicitud de subida inválida.' }, { status: 400 })
    }
    const bucket = getSurveyBucket()

    if (parsed.data.action === 'sign') {
      const { name, type, size } = parsed.data
      if (!isAllowedType(type)) {
        return NextResponse.json(
          { error: 'Tipo de archivo no permitido. Acepta fotos, videos, audios, PDF, Word y Excel.' },
          { status: 400 },
        )
      }

      const safeName = name.replace(/[^\w.\-]+/g, '_').slice(-120)
      const objectPath = `estudio/fine-dining/${Date.now()}-${randomUUID().slice(0, 8)}-${safeName}`

      const [uploadUrl] = await bucket.file(objectPath).getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 min para iniciar la subida
        contentType: type,
      })

      console.log(`Upload autorizado (${type}, ${Math.round(size / 1024)} KB): ${objectPath}`)
      return NextResponse.json({
        uploadUrl,
        path: objectPath,
        // El PUT debe llevar exactamente este Content-Type (la firma lo incluye).
        headers: { 'Content-Type': type },
      })
    }

    // action === 'complete'
    const file = bucket.file(parsed.data.path)
    const [exists] = await file.exists()
    if (!exists) {
      return NextResponse.json({ error: 'El archivo aún no termina de subir.' }, { status: 404 })
    }

    const downloadToken = randomUUID()
    await file.setMetadata({ metadata: { firebaseStorageDownloadTokens: downloadToken } })
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(parsed.data.path)}?alt=media&token=${downloadToken}`

    console.log(`Adjunto fine dining completado: ${parsed.data.path}`)
    return NextResponse.json({ downloadUrl })
  } catch (error) {
    console.error('Error en upload de cuestionario:', error)
    return NextResponse.json(
      { error: 'No se pudo preparar la subida. Intenta nuevamente.' },
      { status: 500 },
    )
  }
}
