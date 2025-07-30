// lib/email.ts
import nodemailer from 'nodemailer'
import type { ContactFormData, EmailResponse, SMTPConfig, EmailTemplate } from '@/types/email'
import type { Lead, ChatMessage } from '@/types/chatbot'

// Configuración SMTP
const createTransporter = () => {
  const config: SMTPConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  }

  return nodemailer.createTransport(config)
}

// Función para generar el template HTML del correo
const generateEmailTemplate = (data: ContactFormData): EmailTemplate => {
  const { name, email, company, subject, message } = data

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo contacto - ByteCore</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #007bff;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          font-weight: 600;
          color: #495057;
          display: block;
          margin-bottom: 5px;
        }
        .value {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
          border-left: 4px solid #007bff;
        }
        .message-content {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 4px;
          border-left: 4px solid #28a745;
          white-space: pre-wrap;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #dee2e6;
          text-align: center;
          font-size: 14px;
          color: #6c757d;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">ByteCore</div>
          <p>Nuevo mensaje de contacto</p>
        </div>
        
        <div class="field">
          <span class="label">Nombre:</span>
          <div class="value">${name}</div>
        </div>
        
        <div class="field">
          <span class="label">Email:</span>
          <div class="value">${email}</div>
        </div>
        
        ${company ? `
        <div class="field">
          <span class="label">Empresa:</span>
          <div class="value">${company}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <span class="label">Asunto:</span>
          <div class="value">${subject}</div>
        </div>
        
        <div class="field">
          <span class="label">Mensaje:</span>
          <div class="message-content">${message}</div>
        </div>
        
        <div class="footer">
          <p>Este correo fue enviado desde el formulario de contacto de ByteCore</p>
          <p>Fecha: ${new Date().toLocaleString('es-ES')}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Nuevo contacto desde ByteCore

Nombre: ${name}
Email: ${email}
${company ? `Empresa: ${company}` : ''}
Asunto: ${subject}

Mensaje:
${message}

---
Este correo fue enviado desde el formulario de contacto de ByteCore
Fecha: ${new Date().toLocaleString('es-ES')}
  `.trim()

  return {
    subject: `[ByteCore] ${subject}`,
    html,
    text,
  }
}

// Función principal para enviar correos
export const sendContactEmail = async (data: ContactFormData): Promise<EmailResponse> => {
  try {
    const transporter = createTransporter()
    const template = generateEmailTemplate(data)
    
    // Verificar la configuración
    await transporter.verify()
    
    // Configurar las opciones del correo
    const mailOptions = {
      from: {
        name: 'ByteCore Portfolio',
        address: process.env.SMTP_FROM || process.env.SMTP_USER || '',
      },
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || '',
      replyTo: data.email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    }

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions)
    
    return {
      success: true,
      message: 'Correo enviado exitosamente',
      messageId: info.messageId,
    }
  } catch (error) {
    console.error('Error enviando correo:', error)
    
    return {
      success: false,
      message: 'Error al enviar el correo. Por favor, intenta nuevamente.',
    }
  }
}

// Función para validar la configuración SMTP
export const validateSMTPConfig = (): boolean => {
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS']
  
  return requiredEnvVars.every(varName => {
    const value = process.env[varName]
    return value && value.trim() !== ''
  })
}

// --- NUEVO CÓDIGO PARA INFORMES DEL CHATBOT ---

// Función para generar el template HTML del informe del chatbot
const generateChatbotReportTemplate = (lead: Lead): EmailTemplate => {
  const { name, email, company, phone, score, status, conversation, projectType, budget, timeline } = lead

  const formatConversation = (messages: ChatMessage[]) => {
    return messages
      .map((msg, index) => {
        const time = new Date(msg.timestamp).toLocaleString('es-ES')
        return `<div class="message ${msg.role}">
          <div class="message-header">
            <strong>${msg.role === 'assistant' ? '🤖 ByteBot' : '👤 Usuario'}</strong>
            <span class="timestamp">${time}</span>
          </div>
          <p>${msg.message.replace(/\n/g, '<br>')}</p>
        </div>`
      })
      .join('')
  }

  // Calcular duración de la conversación
  const firstMessage = conversation[0]?.timestamp
  const lastMessage = conversation[conversation.length - 1]?.timestamp
  const duration = firstMessage && lastMessage 
    ? `${Math.round((lastMessage.getTime() - firstMessage.getTime()) / (1000 * 60))} minutos`
    : 'N/A'

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>📊 Informe Completo de Lead - ByteCore</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f7fa; padding: 20px; margin: 0; }
        .container { max-width: 800px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .content { padding: 30px; }
        
        .lead-summary { background: #f8f9ff; border: 1px solid #e3e8ff; border-left: 5px solid #007bff; padding: 25px; margin-bottom: 25px; border-radius: 8px; }
        .lead-summary h2 { margin-top: 0; color: #007bff; font-size: 20px; }
        .lead-summary .stats { display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap; }
        .stat-item { background: white; padding: 12px 16px; border-radius: 6px; border: 1px solid #e0e6ed; min-width: 120px; }
        .stat-label { font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; }
        .stat-value { font-size: 16px; font-weight: 600; color: #2c3e50; margin-top: 2px; }
        
        .contact-info { background: #fff8e1; border-left: 5px solid #ffc107; padding: 20px; margin-bottom: 25px; border-radius: 8px; }
        .contact-info h3 { margin-top: 0; color: #f57c00; }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px; }
        .contact-item { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e0e6ed; }
        
        .conversation-log { margin-top: 25px; }
        .conversation-log h2 { color: #007bff; margin-bottom: 20px; }
        .conversation-header { background: #e9ecef; padding: 15px; border-radius: 8px 8px 0 0; border-bottom: 2px solid #dee2e6; }
        .conversation-body { max-height: 500px; overflow-y: auto; border: 1px solid #dee2e6; border-top: none; border-radius: 0 0 8px 8px; }
        
        .message { padding: 15px 20px; border-bottom: 1px solid #f1f3f5; }
        .message:last-child { border-bottom: none; }
        .message.user { background: #f8f9fa; }
        .message.assistant { background: #e7f3ff; }
        .message-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .message-header strong { color: #495057; }
        .timestamp { color: #6c757d; font-size: 12px; }
        .message p { margin: 0; white-space: pre-wrap; line-height: 1.5; }
        
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; border-top: 1px solid #dee2e6; }
        .priority-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .priority-high { background: #ffebee; color: #c62828; }
        .priority-medium { background: #fff3e0; color: #ef6c00; }
        .priority-low { background: #e8f5e8; color: #2e7d32; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Informe Completo de Lead</h1>
          <p>ByteCore - Sistema de Seguimiento Automático</p>
        </div>
        
        <div class="content">
          <div class="lead-summary">
            <h2>📋 Resumen del Lead</h2>
            <div class="stats">
              <div class="stat-item">
                <div class="stat-label">Lead Score</div>
                <div class="stat-value">${score}/100</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Estado</div>
                <div class="stat-value">${status}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Mensajes</div>
                <div class="stat-value">${conversation.length}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Duración</div>
                <div class="stat-value">${duration}</div>
              </div>
            </div>
            <div style="margin-top: 15px;">
              <span class="priority-badge ${score >= 70 ? 'priority-high' : score >= 40 ? 'priority-medium' : 'priority-low'}">
                ${score >= 70 ? '🔥 Alta Prioridad' : score >= 40 ? '⚡ Media Prioridad' : '📝 Baja Prioridad'}
              </span>
            </div>
          </div>

          <div class="contact-info">
            <h3>👤 Información de Contacto</h3>
            <div class="contact-grid">
              <div class="contact-item">
                <div class="stat-label">Nombre</div>
                <div class="stat-value">${name || '❌ No proporcionado'}</div>
              </div>
              <div class="contact-item">
                <div class="stat-label">Email</div>
                <div class="stat-value">${email ? `<a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>` : '❌ No proporcionado'}</div>
              </div>
              <div class="contact-item">
                <div class="stat-label">Teléfono</div>
                <div class="stat-value">${phone ? `<a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a>` : '❌ No proporcionado'}</div>
              </div>
              <div class="contact-item">
                <div class="stat-label">Empresa</div>
                <div class="stat-value">${company || '❌ No proporcionada'}</div>
              </div>
              <div class="contact-item">
                <div class="stat-label">Tipo de Proyecto</div>
                <div class="stat-value">${projectType || '❌ No especificado'}</div>
              </div>
              <div class="contact-item">
                <div class="stat-label">Presupuesto</div>
                <div class="stat-value">${budget || '❌ No mencionado'}</div>
              </div>
            </div>
          </div>

          <div class="conversation-log">
            <h2>💬 Registro Completo de la Conversación</h2>
            <div class="conversation-header">
              <strong>📅 Iniciada:</strong> ${new Date(firstMessage).toLocaleString('es-ES')} | 
              <strong>⏱️ Duración:</strong> ${duration} | 
              <strong>💬 Total mensajes:</strong> ${conversation.length}
            </div>
            <div class="conversation-body">
              ${formatConversation(conversation)}
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>🤖 Informe generado automáticamente por ByteCore</strong></p>
          <p>📅 ${new Date().toLocaleString('es-ES')} | 🔗 <a href="https://portafolio-bytecore.vercel.app" style="color: #007bff;">portafolio-bytecore.vercel.app</a></p>
          <p style="margin-top: 10px; font-size: 12px;">
            ${score >= 70 ? '🚨 <strong>ACCIÓN REQUERIDA:</strong> Lead de alta prioridad, contactar inmediatamente' : 
              score >= 40 ? '⚡ Lead calificado, agendar seguimiento en 24-48h' : 
              '📝 Lead inicial, continuar nurturing'}
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
📊 INFORME COMPLETO DE LEAD - BYTECORE
==========================================

🎯 RESUMEN:
- Lead Score: ${score}/100 (${score >= 70 ? 'ALTA PRIORIDAD 🔥' : score >= 40 ? 'Media Prioridad ⚡' : 'Baja Prioridad 📝'})
- Estado: ${status}
- Total mensajes: ${conversation.length}
- Duración: ${duration}

👤 INFORMACIÓN DE CONTACTO:
- Nombre: ${name || '❌ No proporcionado'}
- Email: ${email || '❌ No proporcionado'}
- Teléfono: ${phone || '❌ No proporcionado'}
- Empresa: ${company || '❌ No proporcionada'}
- Tipo de Proyecto: ${projectType || '❌ No especificado'}
- Presupuesto: ${budget || '❌ No mencionado'}
- Timeline: ${timeline || '❌ No definido'}

💬 CONVERSACIÓN COMPLETA:
${conversation.map((msg, index) => {
  const time = new Date(msg.timestamp).toLocaleString('es-ES')
  return `[${time}] ${msg.role === 'assistant' ? '🤖 ByteBot' : '👤 Usuario'}: ${msg.message}`
}).join('\n\n')}

📋 PRÓXIMOS PASOS RECOMENDADOS:
${score >= 70 ? '🚨 CONTACTAR INMEDIATAMENTE - Lead caliente listo para cierre' : 
  score >= 40 ? '⚡ Agendar seguimiento en 24-48h - Lead calificado' : 
  '📝 Continuar nurturing - Lead en fase inicial'}

---
🤖 Informe generado automáticamente por ByteCore
📅 ${new Date().toLocaleString('es-ES')}
🔗 https://portafolio-bytecore.vercel.app
  `.trim()

  return {
    subject: `🚨 [ByteCore] ${score >= 70 ? 'LEAD CALIENTE' : score >= 40 ? 'Lead Calificado' : 'Nuevo Lead'}: ${name || email || phone || 'Contacto Potencial'}`,
    html,
    text,
  }
}

// Función para enviar el informe del chatbot
export const sendChatbotReportEmail = async (lead: Lead): Promise<EmailResponse> => {
  try {
    const transporter = createTransporter()
    const template = generateChatbotReportTemplate(lead)

    const mailOptions = {
      from: {
        name: 'ByteCore Chatbot',
        address: process.env.SMTP_FROM || process.env.SMTP_USER || '',
      },
      to: process.env.CONTACT_EMAIL, // Se envía a tu correo de contacto
      subject: template.subject,
      html: template.html,
      text: template.text,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`Informe de lead enviado a ${process.env.CONTACT_EMAIL}. MessageId: ${info.messageId}`)

    return { success: true, message: 'Informe enviado' }
  } catch (error) {
    console.error('Error enviando informe de lead:', error)
    return { success: false, message: 'Error al enviar el informe' }
  }
}
