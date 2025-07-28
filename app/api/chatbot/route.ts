// app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { chatbot, validateChatbotConfig } from '@/lib/chatbot'
import { rateLimit } from '@/lib/rate-limit'
import { sendChatbotReportEmail } from '@/lib/email'

// Schema de validación para el chat
const chatSchema = z.object({
  sessionId: z.string().min(1, 'SessionId es requerido').max(100, 'SessionId muy largo'),
  message: z.string().min(1, 'Mensaje es requerido').max(1000, 'Mensaje muy largo'),
})

// Schema para validación de headers
const validateRequest = (request: NextRequest) => {
  const contentType = request.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    throw new Error('Content-Type debe ser application/json')
  }
}

export async function POST(request: NextRequest) {
  console.log('🚀 Nueva consulta al chatbot recibida')
  
  try {
    // Validar configuración del chatbot
    const configValidation = validateChatbotConfig()
    if (!configValidation.valid) {
      console.error('❌ Configuración inválida:', configValidation.errors)
      return NextResponse.json({
        success: false,
        message: 'Chatbot no disponible temporalmente. Intenta contactarnos directamente.',
        error: 'CONFIG_ERROR'
      }, { status: 503 })
    }

    // Validar headers
    validateRequest(request)

    // Rate limiting - máximo 15 mensajes por minuto por IP
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
                     
    console.log(`📍 Request desde IP: ${clientIP}`)
    
    const rateLimitResult = await rateLimit(clientIP, 15, 60 * 1000)

    if (!rateLimitResult.success) {
      console.warn(`⚠️ Rate limit excedido para IP: ${clientIP}`)
      return NextResponse.json({
        success: false,
        message: 'Has enviado demasiados mensajes muy rápido. Espera un momento antes de continuar. ⏱️',
        error: 'RATE_LIMIT'
      }, { status: 429 })
    }

    // Parsear y validar el body
    let body
    try {
      body = await request.json()
    } catch (error) {
      console.error('❌ Error parsing JSON:', error)
      return NextResponse.json({
        success: false,
        message: 'Formato de datos inválido',
        error: 'INVALID_JSON'
      }, { status: 400 })
    }

    const validationResult = chatSchema.safeParse(body)

    if (!validationResult.success) {
      console.error('❌ Validación fallida:', validationResult.error.errors)
      return NextResponse.json({
        success: false,
        message: 'Datos de entrada inválidos',
        error: 'VALIDATION_ERROR',
        details: validationResult.error.errors
      }, { status: 400 })
    }

    const { sessionId, message } = validationResult.data

    console.log(`💬 Procesando mensaje para sesión: ${sessionId}`)
    console.log(`📝 Mensaje: "${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"`)

    // Sanitizar el mensaje
    const sanitizedMessage = message.trim().replace(/[<>]/g, '')

    if (!sanitizedMessage) {
      return NextResponse.json({
        success: false,
        message: 'El mensaje no puede estar vacío',
        error: 'EMPTY_MESSAGE'
      }, { status: 400 })
    }

    // Generar respuesta con IA
    const startTime = Date.now()
    const result = await chatbot.generateResponse(sessionId, sanitizedMessage)
    const responseTime = Date.now() - startTime

    console.log(`⚡ Respuesta generada en ${responseTime}ms`)

    if (!result.success) {
      console.error('❌ Error generando respuesta:', result.error)
      // No exponer errores internos al cliente
      return NextResponse.json({
        success: false,
        message: result.response, // Ya contiene mensaje amigable
        error: 'AI_ERROR'
      }, { status: 500 })
    }

    // NUEVO: Enviar informe por correo si es necesario
    if (result.shouldSendReport && result.lead) {
      // Envío asíncrono para no bloquear la respuesta al usuario
      sendChatbotReportEmail(result.lead).catch(err => {
        console.error(`[API Chatbot] Error enviando informe por correo para sesión ${sessionId}:`, err)
      })
      
      console.log(`📧 [API Chatbot] Informe de lead programado para envío: ${result.lead.email || result.lead.phone || sessionId}`)
    }

    // Log de éxito
    console.log(`✅ Respuesta exitosa para sesión ${sessionId}`)
    console.log(`📊 Lead Score: ${result.leadScore || 0}`)

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      response: result.response,
      shouldCollectContact: result.shouldCollectContact,
      suggestedActions: result.suggestedActions,
      leadScore: result.leadScore,
      responseTime
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('💥 Error crítico en API chatbot:', error)
    
    // Log detallado para debugging
    if (error instanceof Error) {
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json({
      success: false,
      message: 'Ups, tuve un problema técnico. ¿Podrías intentar de nuevo? Si persiste, contáctanos directamente. 😅',
      error: 'INTERNAL_ERROR'
    }, { status: 500 })
  }
}

// Endpoint para obtener estadísticas (opcional, para dashboard admin)
export async function GET(request: NextRequest) {
  try {
    // Verificar si es una request autorizada (opcional: agregar auth)
    const authHeader = request.headers.get('authorization')
    const isAuthorized = authHeader === `Bearer ${process.env.ADMIN_API_KEY}` || 
                        process.env.NODE_ENV === 'development'

    if (!isAuthorized) {
      return NextResponse.json({
        success: false,
        message: 'No autorizado'
      }, { status: 401 })
    }

    const stats = chatbot.getStats()
    const leads = chatbot.getAllLeads()

    return NextResponse.json({
      success: true,
      stats,
      leads: leads.slice(0, 10), // Solo los 10 más recientes
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    return NextResponse.json({
      success: false,
      message: 'Error interno'
    }, { status: 500 })
  }
}

// Endpoint para validar salud del servicio
export async function HEAD() {
  try {
    const configValidation = validateChatbotConfig()
    
    if (configValidation.valid) {
      return new Response(null, { status: 200 })
    } else {
      return new Response(null, { status: 503 })
    }
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

// Métodos no permitidos
export async function PUT() {
  return NextResponse.json({
    success: false,
    message: 'Método no permitido'
  }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({
    success: false,
    message: 'Método no permitido'
  }, { status: 405 })
}

export async function PATCH() {
  return NextResponse.json({
    success: false,
    message: 'Método no permitido'
  }, { status: 405 })
}
