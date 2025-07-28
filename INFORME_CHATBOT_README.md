# 📧 Sistema de Informes Automáticos del Chatbot

## 🎯 Descripción
Sistema automático que envía informes detallados por correo electrónico cada vez que el chatbot captura información de contacto valiosa de un potential cliente.

## 🔧 Cómo Funciona

### 1. Detección de Información de Contacto
- **Email**: Detecta cuando un usuario proporciona su email por primera vez
- **Teléfono**: Detecta cuando un usuario proporciona su número telefónico por primera vez
- **Lead Score Mínimo**: Solo envía informes si el lead tiene un score ≥ 30 (evita spam)

### 2. Qué se Incluye en el Informe
- ✅ **Datos del Lead**: Nombre, email, teléfono, empresa
- ✅ **Score de Calificación**: Puntuación automática del lead (0-100)
- ✅ **Estado del Lead**: qualifying, interested, ready, converted
- ✅ **Conversación Completa**: Todo el historial de mensajes
- ✅ **Timestamp**: Fecha y hora de la conversación

### 3. Flujo de Trabajo
```
Usuario proporciona email/teléfono 
    ↓
Chatbot detecta nueva información de contacto
    ↓
Se genera informe HTML profesional
    ↓
Se envía por correo a CONTACT_EMAIL
    ↓
Tienes notificación inmediata del nuevo lead
```

## 📋 Variables de Entorno Necesarias

```bash
# Para el servicio de correo
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-password-de-aplicacion
SMTP_FROM=tu-email@gmail.com
CONTACT_EMAIL=tu-email-donde-recibir-informes@gmail.com

# Para el chatbot
GEMINI_API_KEY=tu-api-key-de-gemini
CHATBOT_ENABLED=true
```

## 🎨 Características del Informe

### Diseño Profesional
- 📱 **Responsive**: Se ve bien en móvil y desktop
- 🎨 **HTML Estilizado**: Formato profesional con colores ByteCore
- 📊 **Secciones Claras**: Información organizada y fácil de leer
- 💬 **Conversación Formateada**: Distinción visual entre usuario y bot

### Información Estructurada
- **Header**: Logo y título del informe
- **Detalles del Lead**: Tabla con toda la información capturada
- **Conversación**: Log completo con timestamps
- **Footer**: Información de generación automática

## 🚀 Ejemplos de Uso

### Caso 1: Usuario Proporciona Email
```
Usuario: "Mi email es juan@empresa.com, ¿pueden enviarme más información?"
↓
Sistema detecta nuevo email
↓
Envía informe automático con toda la conversación
```

### Caso 2: Usuario Proporciona Teléfono
```
Usuario: "Mi número es +51 999 888 777"
↓
Sistema detecta nuevo teléfono
↓
Envía informe automático
```

## ⚙️ Configuración Técnica

### Archivos Modificados
- `lib/email.ts`: Nuevas funciones para generar y enviar informes
- `lib/chatbot.ts`: Lógica de detección de información de contacto
- `app/api/chatbot/route.ts`: Integración del envío de informes

### Funciones Clave
- `generateChatbotReportTemplate()`: Genera el HTML del informe
- `sendChatbotReportEmail()`: Envía el correo con el informe
- `generateResponse()`: Detecta cuando enviar informes

## 📈 Beneficios

1. **Seguimiento Proactivo**: Te enteras inmediatamente de nuevos leads
2. **Información Completa**: Tienes todo el contexto de la conversación
3. **Lead Scoring**: Sabes qué tan calificado está cada prospecto
4. **Automatización**: Cero intervención manual requerida
5. **Profesional**: Informes con formato empresarial

## 🔒 Consideraciones de Seguridad

- Los correos se envían solo a `CONTACT_EMAIL` configurado
- No se expone información sensible en logs
- Rate limiting protege contra spam
- Validación de datos antes del envío

## 🎯 Próximas Mejoras

- [ ] Dashboard web para ver todos los leads
- [ ] Integración con CRM
- [ ] Notificaciones SMS opcionales
- [ ] Análisis de conversiones
- [ ] Respuestas automáticas programadas
