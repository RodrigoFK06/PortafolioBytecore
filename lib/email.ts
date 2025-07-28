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
  const { name, email, company, phone, score, status, conversation } = lead

  const formatConversation = (messages: ChatMessage[]) => {
    return messages
      .map(
        (msg) =>
          `<div class="message ${msg.role}"><strong>${
            msg.role === 'assistant' ? 'ByteBot' : 'Usuario'
          }:</strong><p>${msg.message.replace(/\n/g, '<br>')}</p></div>`
      )
      .join('')
  }

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Informe de Lead del Chatbot - ByteCore</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f9; padding: 20px; }
        .container { max-width: 700px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .lead-details { background: #f9f9f9; border: 1px solid #eee; border-left: 5px solid #007bff; padding: 20px; margin-bottom: 20px; border-radius: 5px; }
        .lead-details h2 { margin-top: 0; color: #007bff; }
        .lead-details p { margin: 5px 0; }
        .conversation-log { margin-top: 20px; }
        .conversation-log h2 { color: #007bff; }
        .message { padding: 10px; border-radius: 5px; margin-bottom: 10px; }
        .message.user { background: #e9ecef; }
        .message.assistant { background: #d1e7fd; }
        .message p { margin: 0; white-space: pre-wrap; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Informe de Lead del Chatbot</h1>
        </div>
        <div class="content">
          <div class="lead-details">
            <h2>Detalles del Lead</h2>
            <p><strong>Nombre:</strong> ${name || 'No proporcionado'}</p>
            <p><strong>Email:</strong> ${email ? `<a href="mailto:${email}">${email}</a>` : 'No proporcionado'}</p>
            <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
            <p><strong>Empresa:</strong> ${company || 'No proporcionada'}</p>
            <p><strong>Puntuación (Lead Score):</strong> ${score}</p>
            <p><strong>Estado:</strong> ${status}</p>
          </div>
          <div class="conversation-log">
            <h2>Registro de la Conversación</h2>
            ${formatConversation(conversation)}
          </div>
        </div>
        <div class="footer">
          <p>Este es un informe automático generado por ByteCore.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Informe de Lead del Chatbot - ByteCore
--------------------------------------
Detalles del Lead:
- Nombre: ${name || 'No proporcionado'}
- Email: ${email || 'No proporcionado'}
- Teléfono: ${phone || 'No proporcionado'}
- Empresa: ${company || 'No proporcionada'}
- Puntuación: ${score}
- Estado: ${status}

Conversación:
${conversation.map((msg) => `${msg.role === 'assistant' ? 'ByteBot' : 'Usuario'}: ${msg.message}`).join('\n\n')}
  `.trim()

  return {
    subject: `[ByteCore Chatbot] Nuevo Lead Calificado: ${name || email || 'Visitante'}`,
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
