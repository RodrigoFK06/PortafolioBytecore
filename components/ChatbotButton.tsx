"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, SendHorizonal, X, Phone, Mail, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Markdown } from "@/components/markdown"
import { SITE_CONFIG } from "@/lib/constants"
import type { ChatMessage } from "@/types/chatbot"

interface SuggestedAction {
  icon: React.ReactNode
  label: string
  action: () => void
}

export default function ChatbotButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [suggestedActions, setSuggestedActions] = useState<string[]>([])
  const [shouldCollectContact, setShouldCollectContact] = useState(false)
  const [leadScore, setLeadScore] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'error'>('connected')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [sessionId] = useState(() => 
    `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
  )

  // Efecto para mostrar/ocultar el botón según scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Auto-scroll a los nuevos mensajes
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen, isTyping])

  // Mensaje de bienvenida cuando se abre el chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        role: "assistant",
        message: `${SITE_CONFIG.chatbot.welcomeMessage}

Estoy aquí para ayudarte con:
• 💰 **Cotizaciones personalizadas** para tu proyecto
• 🎯 **Consultoría técnica** especializada
• 📱 **Información detallada** sobre nuestros servicios
• 🚀 **Casos de éxito** y portafolio

¿Qué tipo de proyecto tienes en mente?`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return
    
    const userMessage = input.trim()
    const newUserMessage: ChatMessage = {
      role: "user",
      message: userMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInput("")
    setIsTyping(true)
    setConnectionStatus('connecting')

    try {
      const response = await fetch(SITE_CONFIG.chatbot.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        const botMessage: ChatMessage = {
          role: "assistant",
          message: result.response,
          timestamp: new Date()
        }

        setMessages(prev => [...prev, botMessage])
        setSuggestedActions(result.suggestedActions || [])
        setShouldCollectContact(result.shouldCollectContact || false)
        setLeadScore(result.leadScore || 0)
        setConnectionStatus('connected')
      } else {
        throw new Error(result.message || 'Error desconocido')
      }
    } catch (error) {
      console.error('Error en chatbot:', error)
      
      const errorMessage: ChatMessage = {
        role: "assistant",
        message: error instanceof Error && error.message.includes('rate limit') 
          ? "Has enviado muchos mensajes muy rápido. Espera un momento antes de continuar."
          : "Disculpa, hubo un problema de conexión. ¿Podrías intentar de nuevo?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      setConnectionStatus('error')
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickActions: SuggestedAction[] = [
    {
      icon: <Phone className="w-4 h-4" />,
      label: "Llamar",
      action: () => window.open(`tel:${SITE_CONFIG.contact.phone}`)
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      action: () => window.open(`mailto:${SITE_CONFIG.contact.email}`)
    },
    {
      icon: <ExternalLink className="w-4 h-4" />,
      label: "WhatsApp",
      action: () => {
        const message = encodeURIComponent(
          "Hola, vengo del chatbot de su página web. Me gustaría conversar sobre un proyecto."
        )
        window.open(`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${message}`, "_blank")
      }
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-green-500"
    if (score >= 45) return "bg-yellow-500"
    return "bg-gray-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Muy Interesado"
    if (score >= 45) return "Explorando"
    return "Inicial"
  }

  return (
    <>
      {/* Botón flotante */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 z-[9999]"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <Button
              size="icon"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir chatbot de ventas"
              className="relative rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-110 transition-all duration-300 w-16 h-16 hover:shadow-xl hover:shadow-blue-500/25"
            >
              <Bot className="h-8 w-8" />
              
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                AI
              </motion.div>
            </Button>
            
            <motion.div
              className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 pointer-events-none"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, delay: 2 }}
            >
              ¡Hola! ¿Necesitas ayuda con un proyecto?
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 w-96 h-[600px] z-[9999] flex flex-col overflow-hidden bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-xl"
            initial={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            transition={{ duration: 0.25, type: "spring" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-6 h-6" />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${
                    connectionStatus === 'connected' ? 'bg-green-500' : 
                    connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-base">ByteBot</h3>
                  <p className="text-xs opacity-90">
                    {connectionStatus === 'connected' ? 'Asistente IA • En línea' : 
                     connectionStatus === 'connecting' ? 'Conectando...' : 'Sin conexión'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {leadScore > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-white/20 text-white border-none"
                  >
                    {getScoreLabel(leadScore)}
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Acciones rápidas */}
            {shouldCollectContact && (
              <motion.div
                className="p-3 bg-blue-50 dark:bg-blue-900/20 border-b"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-2 font-medium">
                  ¿Listo para el siguiente paso?
                </p>
                <div className="flex gap-2 flex-wrap">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={action.action}
                      className="text-xs h-7 border-blue-200 hover:bg-blue-100"
                    >
                      {action.icon}
                      <span className="ml-1">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-muted-foreground font-medium">ByteBot</span>
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[85%] p-3 rounded-xl transition-all duration-200 ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto shadow-md"
                        : "bg-muted border border-border shadow-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Markdown content={msg.message} />
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.message}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Bot className="w-4 h-4 text-blue-600" />
                  <div className="bg-muted p-3 rounded-xl border border-border">
                    <div className="flex items-center gap-1">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span className="text-sm text-muted-foreground">ByteBot está escribiendo...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-border bg-background/50 p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={isTyping ? "Espera la respuesta..." : "Escribe tu mensaje..."}
                  disabled={isTyping}
                  className="flex-1 border-border focus:border-blue-500 transition-colors"
                  maxLength={1000}
                />
                <Button 
                  size="icon" 
                  onClick={sendMessage}
                  disabled={isTyping || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendHorizonal className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Powered by Gemini AI • ByteCore</span>
                {input.length > 0 && (
                  <span className={input.length > 900 ? "text-red-500" : "text-muted-foreground"}>
                    {input.length}/1000
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}