// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmail, validateSMTPConfig } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Schema de validación para el formulario de contacto
const contactSchema = z.object({
  name: z.string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no puede exceder 50 caracteres." })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: "El nombre solo puede contener letras y espacios." }),
  email: z.string()
    .email({ message: "Por favor, introduce un email válido." })
    .max(100, { message: "El email no puede exceder 100 caracteres." }),
  company: z.string()
    .max(50, { message: "El nombre de la empresa no puede exceder 50 caracteres." })
    .optional(),
  subject: z.string()
    .min(5, { message: "El asunto debe tener al menos 5 caracteres." })
    .max(100, { message: "El asunto no puede exceder 100 caracteres." }),
  message: z.string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres." })
    .max(1000, { message: "El mensaje no puede exceder 1000 caracteres." }),
})

// IP del cliente
const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const remoteAddr = request.headers.get('remote-addr')
  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIP) return realIP
  if (remoteAddr) return remoteAddr
  return 'unknown'
}

// CORS coherente con middleware
function withCORS(res: NextResponse, req: NextRequest) {
  const origin = req.headers.get("origin") || ""
  const allowedEnv = process.env.CORS_ALLOWED_ORIGINS || "*"
  const allowedOrigins = allowedEnv.split(",").map((s) => s.trim()).filter(Boolean)
  const allowAll = allowedOrigins.includes("*")

  if (allowAll) {
    res.headers.set("Access-Control-Allow-Origin", "*")
  } else if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin)
  }

  res.headers.set("Vary", "Origin")
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key")
  return res
}

export async function OPTIONS(req: NextRequest) {
  const res = new NextResponse(null, { status: 204 })
  return withCORS(res, req)
}

export async function GET(req: NextRequest) {
  const res = NextResponse.json({ ok: true })
  return withCORS(res, req)
}

export async function POST(request: NextRequest) {
  try {
    // Verificar SMTP
    if (!validateSMTPConfig()) {
      console.error('Configuración SMTP incompleta')
      return NextResponse.json({ success: false, message: 'Configuración del servidor de correo incompleta' }, { status: 500 })
    }

    // Rate limit: 3 intentos por IP / 15 min
    const clientIP = getClientIP(request)
    const rateLimitResult = await rateLimit(clientIP, 3, 15 * 60 * 1000)
    if (!rateLimitResult.success) {
      return NextResponse.json({
        success: false,
        message: `Demasiadas solicitudes. Intenta nuevamente en ${Math.ceil(rateLimitResult.resetTime! / 60000)} minutos.`
      }, { status: 429 })
    }

    // Validación
    const body = await request.json()
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        message: 'Datos del formulario inválidos',
        errors: validationResult.error.format()
      }, { status: 400 })
    }

    // Sanitizar
    const sanitizedData = {
      name: validationResult.data.name.trim(),
      email: validationResult.data.email.trim().toLowerCase(),
      company: validationResult.data.company?.trim() || '',
      subject: validationResult.data.subject.trim(),
      message: validationResult.data.message.trim(),
    }

    // Enviar correo
    const emailResult = await sendContactEmail(sanitizedData)

    if (emailResult.success) {
      console.log(`Correo enviado exitosamente desde ${clientIP} - ${sanitizedData.email}`)
      const res = NextResponse.json({ success: true, message: '¡Mensaje enviado exitosamente! Te responderemos pronto.' }, { status: 200 })
      return withCORS(res, request)
    } else {
      console.error(`Error enviando correo desde ${clientIP}:`, emailResult.message)
      const res = NextResponse.json({ success: false, message: emailResult.message }, { status: 500 })
      return withCORS(res, request)
    }
  } catch (error) {
    console.error('Error en API de contacto:', error)
    const res = NextResponse.json({ success: false, message: 'Error interno del servidor. Por favor, intenta nuevamente.' }, { status: 500 })
    return withCORS(res, request)
  }
}

export async function PUT() {
  return NextResponse.json({ success: false, message: 'Método no permitido' }, { status: 405 })
}
export async function DELETE() {
  return NextResponse.json({ success: false, message: 'Método no permitido' }, { status: 405 })
}
