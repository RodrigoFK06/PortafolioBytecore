// lib/chatbot.ts
import { GoogleGenerativeAI } from '@google/generative-ai'

// Logger silenciable: solo imprime en desarrollo
const isDev = process.env.NODE_ENV === 'development'
const debug = {
  log: (...args: unknown[]) => isDev && console.log(...args),
  error: (...args: unknown[]) => console.error(...args), // errores siempre visibles
}
import type {
  Lead,
  ChatMessage,
  LeadAnalysis,
  ExtractedInfo,
  ChatbotResponse,
  ChatbotConfig
} from '@/types/chatbot'

// Configuración del chatbot
const config: ChatbotConfig = {
  enabled: process.env.CHATBOT_ENABLED === 'true',
  model: process.env.CHATBOT_MODEL || 'gemini-2.5-flash',
  maxTokens: parseInt(process.env.CHATBOT_MAX_TOKENS || '1000'),
  temperature: parseFloat(process.env.CHATBOT_TEMPERATURE || '0.7'),
  apiKey: process.env.GEMINI_API_KEY || ''
}

// Inicializar Gemini AI
const genAI = new GoogleGenerativeAI(config.apiKey)

// Sistema de prompts inteligente
const SYSTEM_PROMPTS = {
  base: `Eres ByteBot, el asistente de ventas virtual de Árkos, una agencia digital especializada en desarrollo web, diseño UI/UX y soluciones tecnológicas innovadoras.

🏢 INFORMACIÓN DE LA EMPRESA:
- Nombre: Árkos - "Mejoramos tus procesos"
- Ubicación: Trujillo, Perú (atendemos clientes locales e internacionales, 100% remotos)
- Email: rodrigoan.torresp@gmail.com
- WhatsApp: +51 961 869 348
- Sitio web: https://xn--rkos-4na.com/

💰 SERVICIOS Y PRECIOS 2025 (SOLES PERUANOS):

🌐 DESARROLLO WEB:
• Landing Page: S/ 300 (empresas nuevas, presencia digital funcional)
• Página Informativa Mediana: S/ 700 (mejor SEO, interacción con clientes)
• Tienda Virtual/Ecommerce: S/ 1500 (pasarela de pagos, panel admin, soporte)
• Plataforma Web Integral: S/ 2500 (sistemas admin empresarial personalizables)

💼 SOLUCIONES EMPRESARIALES:
• CRM Básico: S/ 2500 (organización cartera de clientes)
• CRM Avanzado: S/ 6000 (automatización, email marketing integrado)
• ERP Completo: S/ 4000 (inventarios, finanzas, RR.HH., gestión integral)
• Automatización de Procesos: S/ 500 (mejora eficiencia operativa)

📱 DESARROLLO MÓVIL:
• App Básica: S/ 3000 (funcionalidades esenciales)
• App Avanzada: S/ 6000 (características avanzadas)
• App Personalizada: S/ 4000 (solución a medida)

💻 SOFTWARE ESPECIALIZADO:
• Aplicación de Escritorio: S/ 2000
• Gestión de Bases de Datos: S/ 1000

✨ BENEFICIOS ADICIONALES:
- Atención personalizada y soporte técnico
- Modelos de pago: por etapas o mensualidades
- Descuentos por contratación múltiple
- Garantía y mantenimiento incluido

🎯 TU MISIÓN COMO AGENTE DE VENTAS:
1. **DESCUBRIMIENTO GRADUAL**: Primero pregunta sobre su negocio, industria y necesidades específicas
2. **CALIFICACIÓN INTELIGENTE**: Identifica presupuesto, timeline y urgencia SIN mencionar precios inmediatamente
3. **CONSTRUCCIÓN DE VALOR**: Explica beneficios y casos de éxito antes de cotizar
4. **PRECIOS ESTRATÉGICOS**: Solo menciona rangos de precio cuando el lead esté calificado (score >60)
5. **CIERRE CONSULTIVO**: Guía hacia videollamada o cotización personalizada

🚨 REGLAS IMPORTANTES: 
- USA SIEMPRE SOLES PERUANOS (S/)
- NO menciones precios en los primeros 2-3 mensajes
- Enfócate en entender el problema antes de vender la solución
- Sé consultivo, no agresivo en ventas

👤 PERSONALIDAD:
- Profesional pero amigable y cercano
- Conocedor técnico sin ser abrumador
- Orientado a soluciones prácticas
- Conciso pero informativo (50-150 palabras máximo)
- Proactivo en preguntas de calificación
- Usa emojis ocasionalmente para ser más humano

📋 REGLAS IMPORTANTES:
- SIEMPRE responde en español
- NO inventes precios fuera del rango establecido
- SI no sabes algo técnico específico, ofrece agendar una consulta
- PREGUNTA de manera natural, no como un formulario
- ADAPTA tu tono según el nivel técnico del cliente
- MENCIONA casos de éxito similares cuando sea relevante`,

  qualifying: `El usuario está en fase de CALIFICACIÓN. Tu objetivo es entender sus necesidades Y solicitar datos de contacto de manera natural:

🔍 PREGUNTAS CLAVE A EXPLORAR (una por vez):
- ¿Qué tipo de negocio o proyecto tienes?
- ¿Cuál es tu industria o sector?
- ¿Qué problema específico quieres resolver?
- ¿Actualmente tienes página web o sistema?
- ¿Es urgente o puedes planificarlo?

📞 RECOLECCIÓN DE DATOS (después de 3-4 intercambios):
- "Para enviarte información más detallada, ¿podrías compartir tu email?"
- "¿Tienes un número donde pueda contactarte para agendar una llamada?"
- "¿Cómo te llamas? Me gusta personalizar mis recomendaciones"
- "¿Representas a alguna empresa o es un proyecto personal?"

💡 ESTRATEGIA DE DESCUBRIMIENTO:
- Haz UNA pregunta por vez, conversacional
- Después del 3er mensaje, solicita datos de contacto naturalmente
- Relaciona las preguntas con lo que ya mencionó
- Ofrece valor a cambio de la información (propuesta, material, llamada)
- SIN MENCIONAR PRECIOS AÚN (solo si pregunta directamente)
- Enfócate en entender el PROBLEMA antes que la solución`,

  interested: `El usuario muestra INTERÉS. Construye valor y recolecta información faltante:

📈 ESTRATEGIAS PARA ESTA FASE:
- Explica cómo tu solución resuelve su problema específico
- Menciona casos de éxito similares (sin datos sensibles)
- Describe beneficios técnicos y de negocio
- Ofrece insights valiosos sobre su industria/proyecto
- 📞 RECOLECTA INFO FALTANTE: Si no tienes email/teléfono, solicítalo ahora
- "Para enviarte una propuesta detallada, necesito tu email"
- "¿Tienes un número donde coordinemos una videollamada?"
- Sugiere mejoras que no había considerado
- SOLO menciona rangos de precio si score >50

🎯 OBJETIVO: Posicionarte como el experto que necesita y completar datos de contacto`,

  ready: `El usuario está LISTO para avanzar. Facilita la decisión:

🚀 ACCIONES PRIORITARIAS:
- Proporciona cotización específica en SOLES (S/)
- Ofrece agendar videollamada GRATUITA para detalles
- Explica proceso paso a paso y timeline
- Menciona opciones de pago (etapas/mensualidades)
- Destaca garantías y soporte post-entrega
- Proporciona información de contacto directa
- Crea urgencia suave (disponibilidad, ofertas)

💼 CIERRE: Hazlo simple para que dé el siguiente paso`,

  converted: `El usuario está CONVERTIDO. Mantén el engagement y asegura el éxito:

✅ ACCIONES DE SEGUIMIENTO:
- Confirma los detalles del proyecto acordado
- Explica el proceso de inicio de trabajo
- Proporciona timeline detallado
- Ofrece soporte continuo durante el proyecto
- Sugiere servicios adicionales complementarios
- Mantén comunicación fluida y profesional

🎯 OBJETIVO: Asegurar satisfacción total y preparar futuros proyectos`
}

// Gestión de leads en memoria (en producción usar base de datos)
class LeadManager {
  private leads = new Map<string, Lead>()

  createLead(sessionId: string): Lead {
    const lead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      sessionId,
      status: 'qualifying',
      conversation: [],
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.leads.set(sessionId, lead)
    debug.log(`✅ Nuevo lead creado: ${lead.id}`)
    return lead
  }

  getLead(sessionId: string): Lead | undefined {
    return this.leads.get(sessionId)
  }

  updateLead(sessionId: string, updates: Partial<Lead>): Lead | undefined {
    const lead = this.leads.get(sessionId)
    if (lead) {
      Object.assign(lead, updates, { updatedAt: new Date() })
      this.leads.set(sessionId, lead)
      debug.log(`📝 Lead actualizado: ${lead.id}, Score: ${lead.score}`)
      return lead
    }
    return undefined
  }

  addMessage(sessionId: string, role: 'user' | 'assistant', message: string) {
    const lead = this.leads.get(sessionId)
    if (lead) {
      lead.conversation.push({
        role,
        message,
        timestamp: new Date()
      })
      lead.updatedAt = new Date()
      debug.log(`💬 Mensaje agregado (${role}): ${message.substring(0, 50)}...`)
    }
  }

  // Análisis inteligente del lead con IA
  analyzeLead(lead: Lead): LeadAnalysis {
    let score = 0
    const insights: string[] = []
    const nextActions: string[] = []

    // Puntuación basada en información recopilada
    if (lead.name) {
      score += 20
      insights.push('Nombre proporcionado')
    }
    if (lead.email) {
      score += 25
      insights.push('Email confirmado')
    }
    if (lead.company) {
      score += 15
      insights.push('Representa una empresa')
    }
    if (lead.projectType) {
      score += 20
      insights.push(`Proyecto definido: ${lead.projectType}`)
    }
    if (lead.budget) {
      score += 20
      insights.push(`Presupuesto mencionado: ${lead.budget}`)
    }
    if (lead.timeline) {
      score += 10
      insights.push(`Timeline definido: ${lead.timeline}`)
    }

    // Análisis de mensajes del usuario
    const userMessages = lead.conversation
      .filter(m => m.role === 'user')
      .map(m => m.message.toLowerCase())
      .join(' ')

    // Indicadores de interés alto
    const interestKeywords = [
      'precio', 'costo', 'cuanto', 'cotización', 'presupuesto',
      'reunión', 'llamada', 'contacto', 'contratar', 'trabajar'
    ]

    const urgencyKeywords = [
      'urgente', 'rápido', 'pronto', 'ya', 'inmediato',
      'necesito ya', 'para ayer'
    ]

    const projectKeywords = [
      'web', 'app', 'tienda', 'ecommerce', 'diseño',
      'desarrollo', 'página', 'sitio', 'plataforma'
    ]

    const qualityKeywords = [
      'profesional', 'calidad', 'serio', 'confiable',
      'experiencia', 'portafolio', 'referencias'
    ]

    // Análisis de patrones (más gradual)
    if (interestKeywords.some(word => userMessages.includes(word))) {
      score += 15
      insights.push('Muestra interés comercial')
      // Solo sugerir cotización si score ya es alto
      if (score >= 60) {
        nextActions.push('💰 Preparar cotización detallada')
      } else {
        nextActions.push('🔍 Continuar descubrimiento de necesidades')
      }
    }

    if (urgencyKeywords.some(word => userMessages.includes(word))) {
      score += 15
      insights.push('Indica urgencia en el proyecto')
      nextActions.push('⚡ Priorizar respuesta rápida')
    }

    if (projectKeywords.some(word => userMessages.includes(word))) {
      score += 10
      insights.push('Ha definido tipo de proyecto')
      nextActions.push('🎯 Profundizar en requerimientos específicos')
    }

    if (qualityKeywords.some(word => userMessages.includes(word))) {
      score += 10
      insights.push('Valora la calidad profesional')
      nextActions.push('🏆 Mostrar portafolio y casos de éxito')
    }

    // Análisis del flujo de conversación
    const messageCount = lead.conversation.filter(m => m.role === 'user').length
    if (messageCount >= 5) {
      score += 10
      insights.push('Conversación extendida - alta engagement')
    }

    // Penalizar si menciona precios muy temprano
    if (messageCount <= 2 && userMessages.includes('precio')) {
      score -= 5
      insights.push('Pregunta precios muy temprano')
    }

    // Determinar estado basado en score y comportamiento
    let status: Lead['status'] = 'qualifying'

    if (score >= 75) {
      status = 'ready'
      nextActions.push('🚀 Proponer reunión inmediata')
      nextActions.push('📧 Solicitar email para envío de propuesta')
      nextActions.push('💰 Enviar cotización personalizada')
    } else if (score >= 50) {
      status = 'interested'
      nextActions.push('📞 Preparar seguimiento en 24h')
      nextActions.push('💼 Enviar portafolio específico')
      // Solo mencionar rangos de precio en esta fase
    } else if (score >= 25) {
      nextActions.push('❓ Hacer más preguntas de calificación')
      nextActions.push('📚 Educar sobre beneficios del servicio')
    }

    return { status, score, insights, nextActions }
  }

  // Obtener estadísticas para dashboard
  getStats() {
    const leads = Array.from(this.leads.values())
    const total = leads.length

    const byStatus = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const avgScore = total > 0
      ? (leads.reduce((sum, lead) => sum + lead.score, 0) / total).toFixed(1)
      : '0'

    const conversionRate = total > 0
      ? ((byStatus.converted || 0) / total * 100).toFixed(1)
      : '0'

    const recent = leads.filter(l =>
      Date.now() - l.updatedAt.getTime() < 24 * 60 * 60 * 1000
    ).length

    return {
      total,
      byStatus,
      avgScore,
      conversionRate,
      recent,
      hotLeads: leads.filter(l => l.score >= 70).length
    }
  }

  getAllLeads(): Lead[] {
    return Array.from(this.leads.values()).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  }
}

// Singleton del gestor de leads
const leadManager = new LeadManager()

// Servicio principal del chatbot
export class ByteChatbot {
  private model = genAI.getGenerativeModel({
    model: config.model,
    generationConfig: {
      maxOutputTokens: config.maxTokens,
      temperature: config.temperature,
    }
  })

  async generateResponse(sessionId: string, userMessage: string): Promise<ChatbotResponse & { lead?: Lead; shouldSendReport?: boolean }> {
    try {
      // Validar configuración
      if (!config.enabled) {
        throw new Error('Chatbot deshabilitado en configuración')
      }

      if (!config.apiKey) {
        throw new Error('API Key de Gemini no configurada')
      }

      // Obtener o crear lead
      let lead = leadManager.getLead(sessionId) || leadManager.createLead(sessionId)

      // Guardar información de contacto previa para detectar cambios
      const oldEmail = lead.email
      const oldPhone = lead.phone

      // Agregar mensaje del usuario
      leadManager.addMessage(sessionId, 'user', userMessage)

      // Extraer información del mensaje
      const extractedInfo = this.extractLeadInfo(userMessage, lead)
      if (extractedInfo && Object.keys(extractedInfo).length > 0) {
        lead = leadManager.updateLead(sessionId, extractedInfo) || lead
        debug.log('📊 Información extraída:', extractedInfo)
      }

      // Analizar lead y ajustar estado
      const analysis = leadManager.analyzeLead(lead)
      if (analysis.status !== lead.status || analysis.score !== lead.score) {
        lead = leadManager.updateLead(sessionId, {
          status: analysis.status,
          score: analysis.score
        }) || lead
        debug.log(`📈 Lead actualizado: ${analysis.status} (Score: ${analysis.score})`)
      }

      // Generar contexto para Gemini
      const context = this.buildContext(lead, userMessage, analysis)

      // Construir prompt completo
      const fullPrompt = `${SYSTEM_PROMPTS.base}

${SYSTEM_PROMPTS[lead.status]}

CONTEXTO ACTUAL:
${context}

ANÁLISIS DEL LEAD:
- Score actual: ${analysis.score}/100
- Estado: ${analysis.status}
- Insights: ${analysis.insights.join(', ')}

ÚLTIMO MENSAJE DEL USUARIO: "${userMessage}"

INSTRUCCIONES ESPECÍFICAS:
- Responde de manera natural y conversacional
- Adapta tu tono al nivel de interés mostrado
- Si el score es alto (>70), sé más directo sobre next steps
- Si el score es bajo (<30), enfócate en generar interés
- Usa la información que ya tienes para personalizar la respuesta
- NO repitas información ya mencionada anteriormente

BYTEBOT:`

      // Llamar a Gemini
      debug.log('🤖 Enviando prompt a Gemini...')
      const result = await this.model.generateContent(fullPrompt)
      const response = result.response.text()

      if (!response) {
        throw new Error('Respuesta vacía de Gemini')
      }

      // Agregar respuesta del bot
      leadManager.addMessage(sessionId, 'assistant', response)

      // Determinar acciones sugeridas
      const suggestedActions = analysis.nextActions.slice(0, 3) // Máximo 3 acciones

      // NUEVA LÓGICA: Detectar si se debe enviar informe por correo
      const isNewContactInfo = (!oldEmail && lead.email) || (!oldPhone && lead.phone)
      const shouldSendReport = Boolean(isNewContactInfo && lead.score >= 30) // Solo si tiene score mínimo

      if (shouldSendReport) {
        debug.log(`📧 [Chatbot] Se detectó nueva información de contacto para sesión ${sessionId}. Se marcará para enviar informe.`)
      }

      debug.log(`✅ Respuesta generada para lead ${lead.id}`)

      return {
        success: true,
        response: response.trim(),
        shouldCollectContact: analysis.score >= 50 && !lead.email,
        suggestedActions,
        leadScore: analysis.score,
        lead: lead, // Devolver el lead actualizado
        shouldSendReport: shouldSendReport // Nueva bandera para el informe
      }

    } catch (error) {
      debug.error('❌ Error en generateResponse:', error)

      // Respuesta de fallback
      const fallbackResponse = 'Disculpa, tuve un problema técnico momentáneo. ¿Podrías repetir tu consulta? Estoy aquí para ayudarte con tu proyecto. 😊'

      return {
        success: false,
        response: fallbackResponse,
        shouldCollectContact: false,
        suggestedActions: [],
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  private extractLeadInfo(message: string, lead: Lead): ExtractedInfo | null {
    const updates: ExtractedInfo = {}
    const lowerMessage = message.toLowerCase()

    // Extraer email con regex más preciso
    const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)
    if (emailMatch && !lead.email) {
      updates.email = emailMatch[0].toLowerCase()
    }

    // Extraer teléfono (formato Perú y otros)
    const phoneMatch = message.match(/(\+?51)?[\s-]?9\d{8}|\+?51[\s-]?\d{9}|(\+\d{1,3})?[\s-]?\d{6,14}/g)
    if (phoneMatch && !lead.phone) {
      updates.phone = phoneMatch[0].replace(/\s/g, '')
    }

    // Extraer nombre (patrones comunes más amplios)
    if (!lead.name) {
      const namePatterns = [
        /mi nombre es ([a-záéíóúñ\s]{2,30})/i,
        /me llamo ([a-záéíóúñ\s]{2,30})/i,
        /soy ([a-záéíóúñ\s]{2,30})/i,
        /nombre:\s*([a-záéíóúñ\s]{2,30})/i,
        /^([a-záéíóúñ]{2,15})\s+([a-záéíóúñ]{2,15})$/i // Captura "Juan Pérez" al inicio
      ]

      for (const pattern of namePatterns) {
        const match = message.match(pattern)
        if (match) {
          updates.name = match[1].trim()
          break
        }
      }
    }

    // Extraer empresa
    if (!lead.company) {
      const companyPatterns = [
        /empresa ([a-záéíóúñ\s]{2,50})/i,
        /compañía ([a-záéíóúñ\s]{2,50})/i,
        /trabajo en ([a-záéíóúñ\s]{2,50})/i,
        /represento a ([a-záéíóúñ\s]{2,50})/i
      ]

      for (const pattern of companyPatterns) {
        const match = message.match(pattern)
        if (match) {
          updates.company = match[1].trim()
          break
        }
      }
    }

    // Extraer tipo de proyecto con mayor precisión
    if (!lead.projectType) {
      if (lowerMessage.includes('tienda online') || lowerMessage.includes('ecommerce') || lowerMessage.includes('e-commerce')) {
        updates.projectType = 'E-commerce'
      } else if (lowerMessage.includes('app móvil') || lowerMessage.includes('aplicación móvil')) {
        updates.projectType = 'Aplicación Móvil'
      } else if (lowerMessage.includes('app web') || lowerMessage.includes('aplicación web') || lowerMessage.includes('sistema')) {
        updates.projectType = 'Aplicación Web'
      } else if (lowerMessage.includes('landing') || lowerMessage.includes('página de aterrizaje')) {
        updates.projectType = 'Landing Page'
      } else if (lowerMessage.includes('sitio web') || lowerMessage.includes('página web')) {
        updates.projectType = 'Sitio Web'
      } else if (lowerMessage.includes('diseño') && (lowerMessage.includes('ui') || lowerMessage.includes('ux'))) {
        updates.projectType = 'Diseño UI/UX'
      }
    }

    // Extraer presupuesto con patrones más amplios
    if (!lead.budget) {
      const budgetMatch = message.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(usd|dolares|dólares|soles|sol)/i)
      if (budgetMatch) {
        updates.budget = `$${budgetMatch[1]} ${budgetMatch[2].toUpperCase()}`
      } else if (lowerMessage.includes('poco presupuesto') || lowerMessage.includes('económico') || lowerMessage.includes('barato')) {
        updates.budget = 'Presupuesto Limitado'
      } else if (lowerMessage.includes('buen presupuesto') || lowerMessage.includes('sin problema de dinero') || lowerMessage.includes('presupuesto amplio')) {
        updates.budget = 'Presupuesto Amplio'
      }
    }

    // Extraer timeline
    if (!lead.timeline) {
      const timelinePatterns = [
        /en (\d+) (días?|semanas?|meses?)/i,
        /para (el próximo mes|la próxima semana|fin de mes)/i,
        /(urgente|rápido|pronto)/i
      ]

      for (const pattern of timelinePatterns) {
        const match = message.match(pattern)
        if (match) {
          updates.timeline = match[0]
          break
        }
      }
    }

    return Object.keys(updates).length > 0 ? updates : null
  }

  private buildContext(lead: Lead, currentMessage: string, analysis: LeadAnalysis): string {
    const info = []

    if (lead.name) info.push(`👤 Cliente: ${lead.name}`)
    if (lead.company) info.push(`🏢 Empresa: ${lead.company}`)
    if (lead.email) info.push(`📧 Email: ${lead.email}`)
    if (lead.projectType) info.push(`💻 Proyecto: ${lead.projectType}`)
    if (lead.budget) info.push(`💰 Presupuesto: ${lead.budget}`)
    if (lead.timeline) info.push(`⏰ Timeline: ${lead.timeline}`)

    const recentMessages = lead.conversation
      .slice(-6) // Últimos 6 mensajes para contexto
      .map(m => `${m.role === 'user' ? '👤 Usuario' : '🤖 ByteBot'}: ${m.message}`)
      .join('\n')

    return `
INFORMACIÓN RECOPILADA:
${info.length > 0 ? info.join('\n') : 'ℹ️ Sin información personal aún'}

CONVERSACIÓN RECIENTE:
${recentMessages}

ESTADO ACTUAL: ${lead.status} (Score: ${analysis.score}/100)
INSIGHTS: ${analysis.insights.join(' | ')}
    `.trim()
  }

  // Métodos públicos para dashboard/admin
  getAllLeads(): Lead[] {
    return leadManager.getAllLeads()
  }

  getStats() {
    return leadManager.getStats()
  }

  getLead(sessionId: string): Lead | undefined {
    return leadManager.getLead(sessionId)
  }

  // Método para validar configuración
  validateConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!config.apiKey) {
      errors.push('GEMINI_API_KEY no está configurada')
    }

    if (!config.enabled) {
      errors.push('Chatbot está deshabilitado')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

// Singleton del chatbot
export const chatbot = new ByteChatbot()

// Función de utilidad para validar la configuración
export function validateChatbotConfig() {
  return chatbot.validateConfig()
}
