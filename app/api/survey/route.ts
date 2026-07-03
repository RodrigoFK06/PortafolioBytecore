// app/api/survey/route.ts
// Endpoint del cuestionario privado "Tu mirada experta sobre el fine dining".
import { NextRequest, NextResponse } from 'next/server'
import { sendSurveyEmail, validateSMTPConfig } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'
import { fineDiningSurveySchema } from '@/lib/fine-dining-survey'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIP) return realIP
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    if (!validateSMTPConfig()) {
      console.error('Configuración SMTP incompleta')
      return NextResponse.json({ success: false, message: 'Configuración del servidor de correo incompleta' }, { status: 500 })
    }

    // Rate limit: 5 envíos por IP / 30 min
    const clientIP = getClientIP(request)
    const rateLimitResult = await rateLimit(`survey:${clientIP}`, 5, 30 * 60 * 1000)
    if (!rateLimitResult.success) {
      return NextResponse.json({
        success: false,
        message: `Demasiados envíos. Intenta nuevamente en ${Math.ceil(rateLimitResult.resetTime! / 60000)} minutos.`,
      }, { status: 429 })
    }

    const body = await request.json()
    const validationResult = fineDiningSurveySchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        message: 'Datos del cuestionario inválidos',
        errors: validationResult.error.format(),
      }, { status: 400 })
    }

    // Honeypot: si viene relleno, respondemos "ok" sin enviar nada.
    if (validationResult.data.website && validationResult.data.website.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Gracias por tu respuesta.' }, { status: 200 })
    }

    const emailResult = await sendSurveyEmail(validationResult.data)

    if (emailResult.success) {
      console.log(`Cuestionario fine dining enviado desde ${clientIP}`)
      return NextResponse.json({ success: true, message: '¡Gracias! Recibimos tu respuesta.' }, { status: 200 })
    }

    // Red de seguridad: si el correo falla (p. ej. SMTP caído / credenciales),
    // NO perdemos la respuesta. Se registra el payload validado en los logs con un
    // marcador buscable para recuperarlo, y se responde OK para no perder al usuario.
    console.error(`SURVEY_SUBMISSION_FALLBACK ${JSON.stringify(validationResult.data)}`)
    return NextResponse.json({ success: true, message: '¡Gracias! Recibimos tu respuesta.' }, { status: 200 })
  } catch (error) {
    console.error('Error en API de cuestionario:', error)
    return NextResponse.json({ success: false, message: 'Error interno del servidor. Por favor, intenta nuevamente.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
