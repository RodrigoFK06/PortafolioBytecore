// lib/email.ts
import nodemailer from 'nodemailer'
import type { ContactFormData, EmailResponse, SMTPConfig, EmailTemplate } from '@/types/email'

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
