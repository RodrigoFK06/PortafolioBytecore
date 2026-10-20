// lib/email.ts
import nodemailer from 'nodemailer'
import type { ContactFormData, EmailResponse, SMTPConfig, EmailTemplate } from '@/types/email'
import { FD_EMAIL_SECTIONS, resolveAnswer, type FineDiningSurveyData } from '@/lib/fine-dining-survey'

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
      <title>Nuevo contacto - Árkos</title>
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
          <div class="logo">Árkos</div>
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
          <p>Este correo fue enviado desde el formulario de contacto de Árkos</p>
          <p>Fecha: ${new Date().toLocaleString('es-ES')}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Nuevo contacto desde Árkos

Nombre: ${name}
Email: ${email}
${company ? `Empresa: ${company}` : ''}
Asunto: ${subject}

Mensaje:
${message}

---
Este correo fue enviado desde el formulario de contacto de Árkos
Fecha: ${new Date().toLocaleString('es-ES')}
  `.trim()

  return {
    subject: `[Árkos] ${subject}`,
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
        name: 'Árkos Portfolio',
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

// --- CUESTIONARIO FINE DINING ("Tu mirada experta sobre el fine dining") ---

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const generateSurveyTemplate = (data: FineDiningSurveyData): EmailTemplate => {
  const restaurant = (data.restaurant || '').trim()
  const respondent = (data.respondent || '').trim()
  const role = (data.role || '').trim()

  const identityLine = [respondent, role, restaurant].filter(Boolean).join(' · ') || 'Sin identificar'
  const adjuntos = data.adjuntos ?? []

  const formatSize = (bytes: number): string =>
    bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`

  const htmlAdjuntos = adjuntos.length
    ? `
        <div class="section">
          <h2>📎 Material adjunto (${adjuntos.length})</h2>
          ${adjuntos
            .map(
              (f) => `
          <div class="qa">
            <div class="a">
              <a href="${escapeHtml(f.url)}" style="color: #0a6ca8; text-decoration: none; font-weight: 600;">${escapeHtml(f.name)}</a>
              <span style="color: #6b7684; font-size: 12px;"> · ${escapeHtml(f.type || 'archivo')} · ${formatSize(f.size)}</span>
            </div>
          </div>`,
            )
            .join('')}
        </div>`
    : ''

  const htmlSections = FD_EMAIL_SECTIONS.map((section) => {
    const rows = section.fields
      .map((field) => {
        const answer = resolveAnswer(field, data[field.id])
        if (!answer) return ''
        return `
          <div class="qa">
            <div class="q">${escapeHtml(field.label)}</div>
            <div class="a">${escapeHtml(answer).replace(/\n/g, '<br>')}</div>
          </div>`
      })
      .join('')
    if (!rows) return ''
    return `<div class="section"><h2>${escapeHtml(section.title)}</h2>${rows}</div>`
  }).join('')

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Cuestionario Fine Dining - Árkos</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #2c3e50; background: #f5f7fa; padding: 20px; margin: 0; }
        .container { max-width: 720px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); overflow: hidden; }
        .header { background: linear-gradient(135deg, #0a6ca8, #084b74); color: #fff; padding: 28px 24px; }
        .header h1 { margin: 0; font-size: 22px; }
        .header p { margin: 6px 0 0; opacity: 0.9; font-size: 14px; }
        .content { padding: 24px; }
        .identity { background: #eef6fb; border-left: 4px solid #0a6ca8; padding: 14px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; }
        .section { margin-bottom: 26px; }
        .section h2 { font-size: 15px; color: #0a6ca8; border-bottom: 1px solid #e3e8ef; padding-bottom: 6px; margin: 0 0 12px; }
        .qa { margin-bottom: 14px; }
        .q { font-size: 13px; color: #6b7684; font-weight: 600; }
        .a { background: #f8fafc; border-radius: 6px; padding: 10px 12px; margin-top: 4px; border: 1px solid #eceff3; white-space: normal; }
        .footer { background: #f8f9fa; padding: 18px; text-align: center; font-size: 12px; color: #6c757d; border-top: 1px solid #e9ecef; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍽️ Nueva respuesta — Fine Dining</h1>
          <p>Cuestionario "Tu mirada experta sobre el fine dining"</p>
        </div>
        <div class="content">
          <div class="identity"><strong>Responde:</strong> ${escapeHtml(identityLine)}</div>
          ${htmlSections}
          ${htmlAdjuntos}
        </div>
        <div class="footer">
          <p>Enviado desde el cuestionario privado de Árkos · ${new Date().toLocaleString('es-PE')}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const textSections = FD_EMAIL_SECTIONS.map((section) => {
    const rows = section.fields
      .map((field) => {
        const answer = resolveAnswer(field, data[field.id])
        return answer ? `• ${field.label}\n  ${answer.replace(/\n/g, '\n  ')}` : ''
      })
      .filter(Boolean)
      .join('\n\n')
    return rows ? `\n${section.title}\n${'-'.repeat(section.title.length)}\n${rows}` : ''
  }).join('\n')

  const textAdjuntos = adjuntos.length
    ? `\n\nMaterial adjunto (${adjuntos.length})\n${'-'.repeat(16)}\n${adjuntos
        .map((f) => `• ${f.name} (${formatSize(f.size)})\n  ${f.url}`)
        .join('\n')}`
    : ''

  const text = `Nueva respuesta — Cuestionario Fine Dining (Árkos)
Responde: ${identityLine}
${textSections}${textAdjuntos}

---
Enviado ${new Date().toLocaleString('es-PE')}`.trim()

  const subjectWho = respondent || restaurant || 'Anónimo'

  return {
    subject: `🍽️ [Árkos · Fine Dining] Nueva respuesta: ${subjectWho}`,
    html,
    text,
  }
}

// Envía la respuesta del cuestionario de fine dining al correo de contacto.
export const sendSurveyEmail = async (data: FineDiningSurveyData): Promise<EmailResponse> => {
  try {
    const transporter = createTransporter()
    const template = generateSurveyTemplate(data)

    await transporter.verify()

    const mailOptions = {
      from: {
        name: 'Árkos · Fine Dining',
        address: process.env.SMTP_FROM || process.env.SMTP_USER || '',
      },
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || '',
      subject: template.subject,
      html: template.html,
      text: template.text,
    }

    const info = await transporter.sendMail(mailOptions)
    return { success: true, message: 'Respuesta enviada', messageId: info.messageId }
  } catch (error) {
    console.error('Error enviando cuestionario fine dining:', error)
    return { success: false, message: 'Error al enviar la respuesta. Por favor, intenta nuevamente.' }
  }
}
