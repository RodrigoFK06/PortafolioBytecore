// types/email.ts
export interface ContactFormData {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}

export interface EmailResponse {
  success: boolean
  message: string
  messageId?: string
}

export interface EmailError {
  success: false
  message: string
  error?: string
}

export interface SMTPConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}
