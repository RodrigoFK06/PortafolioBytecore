# 📧 Sistema de Correos Árkos

## Configuración del Sistema de Correos

Este proyecto utiliza un sistema de correos personalizado construido con Next.js API Routes y Nodemailer, eliminando la dependencia de servicios externos como EmailJS.

### 🚀 Características

- ✅ **Sistema SMTP Propio**: Control total sobre el envío de correos
- ✅ **Rate Limiting**: Protección contra spam (3 intentos cada 15 minutos)
- ✅ **Validación Robusta**: Validación con Zod en frontend y backend
- ✅ **Templates HTML**: Correos con diseño profesional
- ✅ **Sanitización**: Protección contra inyecciones
- ✅ **Logging Seguro**: Sin exposición de datos sensibles
- ✅ **Multi-proveedor**: Compatible con Gmail, Outlook, SendGrid, etc.

### 📋 Configuración Inicial

1. **Copia el archivo de ejemplo:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configura las variables de entorno en `.env.local`:**

#### Para Gmail:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password_de_gmail
CONTACT_EMAIL=hola@bytecore.dev
```

#### Para Outlook/Hotmail:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu_email@outlook.com
SMTP_PASS=tu_contraseña
CONTACT_EMAIL=hola@bytecore.dev
```

#### Para SendGrid:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=tu_sendgrid_api_key
CONTACT_EMAIL=hola@bytecore.dev
```

### 🔐 Configuración de Gmail

1. **Habilita la verificación en 2 pasos** en tu cuenta de Google
2. **Genera una "Contraseña de aplicación":**
   - Ve a: [Cuenta de Google > Seguridad > Contraseñas de aplicaciones](https://myaccount.google.com/apppasswords)
   - Selecciona "Correo" y "Otro (nombre personalizado)"
   - Usa la contraseña generada en `SMTP_PASS`

### 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ContactForm   │───▶│  /api/contact   │───▶│   EmailService  │
│   (Frontend)    │    │   (API Route)   │    │   (Nodemailer)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   RateLimit     │
                       │   (Memoria)     │
                       └─────────────────┘
```

### 📁 Archivos del Sistema

- `app/api/contact/route.ts` - API Route principal
- `lib/email.ts` - Servicio de correos con Nodemailer
- `lib/rate-limit.ts` - Sistema de rate limiting
- `types/email.ts` - Tipos TypeScript
- `components/contact-form.tsx` - Formulario actualizado

### 🧪 Pruebas

1. **Desarrollo local:**
   ```bash
   pnpm dev
   ```

2. **Navega a** `http://localhost:3000`

3. **Envía un mensaje** de prueba desde el formulario de contacto

4. **Verifica los logs** en la consola del servidor

### 🔧 Personalización

#### Modificar el template del correo:
Edita la función `generateEmailTemplate` en `lib/email.ts`

#### Cambiar límites de rate limiting:
Modifica los parámetros en `app/api/contact/route.ts`:
```typescript
const rateLimitResult = await rateLimit(clientIP, 3, 15 * 60 * 1000)
//                                              ↑   ↑
//                                        intentos  tiempo (ms)
```

#### Agregar nuevos proveedores SMTP:
Actualiza la configuración en `lib/email.ts`

### 🚨 Seguridad

- ✅ Rate limiting implementado
- ✅ Validación de entrada en frontend y backend
- ✅ Sanitización de datos
- ✅ Headers de seguridad en Next.js
- ✅ No exposición de credenciales
- ✅ Logging sin datos sensibles

### 📈 Producción

Para producción, considera:

1. **Redis** para rate limiting distribuido
2. **SendGrid** o **Amazon SES** para mayor confiabilidad
3. **Monitoring** con servicios como Sentry
4. **Backup** de configuración SMTP

### 🐛 Troubleshooting

#### Error: "Configuración SMTP incompleta"
- Verifica que todas las variables de entorno estén configuradas
- Revisa que no haya espacios en blanco en las variables

#### Error: "Demasiadas solicitudes"
- El rate limiting está funcionando
- Espera 15 minutos o reinicia el servidor en desarrollo

#### Error de autenticación SMTP:
- Para Gmail: Usa contraseña de aplicación, no tu contraseña normal
- Para Outlook: Habilita "Aplicaciones menos seguras" si es necesario
- Verifica credenciales y configuración del host

### 🎯 Ventajas sobre EmailJS

1. **Control Total**: No dependes de servicios externos
2. **Sin Límites**: No hay restricciones de envío
3. **Personalización**: Templates y lógica completamente personalizables
4. **Seguridad**: Datos sensibles no salen de tu servidor
5. **Costo**: No hay costos adicionales por envío
6. **Profesional**: Emails desde tu propio dominio

---

¡Tu sistema de correos está listo! 🚀
