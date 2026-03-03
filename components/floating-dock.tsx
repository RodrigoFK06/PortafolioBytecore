"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, SendHorizonal, X, Phone, Mail, ExternalLink, Loader2, MessageCircle, ArrowUp } from "lucide-react"
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

export default function FloatingDock() {
  const [isVisible, setIsVisible] = useState(false)
  
  // Chatbot states
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

  // Efecto para mostrar/ocultar el dock según scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Auto-scroll a los nuevos mensajes (Chatbot)
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
        message: `${SITE_CONFIG.chatbot.welcomeMessage}\n\nEstoy aquí para ayudarte con:\n• 💰 **Cotizaciones personalizadas** para tu proyecto\n• 🎯 **Consultoría técnica** especializada\n• 📱 **Información detallada** sobre nuestros servicios\n• 🚀 **Casos de éxito** y portafolio\n\n¿Qué tipo de proyecto tienes en mente?`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola, estoy interesado en contratar los servicios de Árkos. ¿Podemos conversar más sobre mi proyecto?"
    );
    const url = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

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

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Muy Interesado"
    if (score >= 45) return "Explorando"
    return "Inicial"
  }

  return (
    <>
      {/* Dock Flotante (Glassmorphism 2.0) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-6 md:bottom-8 right-4 md:right-8 z-[9999] flex flex-col items-center gap-2 p-2 bg-slate-50/50 dark:bg-[#050505]/50 backdrop-blur-[16px] border border-black/10 dark:border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
          >
            {/* Scroll to Top */}
            <Button
              size="icon"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-foreground/50 hover:text-foreground border-none transition-all duration-300"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>

            <div className="w-8 h-[1px] bg-black/10 dark:bg-white/10 my-1" />

            {/* WhatsApp */}
            <Button
              size="icon"
              onClick={openWhatsApp}
              className="group relative w-12 h-12 rounded-full bg-transparent hover:bg-green-500/10 text-foreground/50 hover:text-green-500 border-none transition-all duration-300"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              {/* Tooltip táctil/visual opcional */}
              <span className="absolute right-full mr-4 bg-background/90 text-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border">
                WhatsApp
              </span>
            </Button>

            <div className="w-8 h-[1px] bg-black/10 dark:bg-white/10 my-1" />

            {/* Chatbot Toggle */}
            <Button
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground border-none transition-all duration-300"
              aria-label="Abrir asistente IA"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="bot"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bot className="w-6 h-6 text-brand" />
                  </motion.div>
                )}
              </AnimatePresence>

              {!isOpen && (
                <>
                  <motion.div
                    className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="absolute right-full mr-4 bg-background/90 text-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border">
                    ByteBot IA
                  </span>
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ventana del Chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 md:bottom-8 right-20 md:right-28 w-[calc(100vw-6rem)] sm:w-96 h-[500px] md:h-[600px] max-h-[80vh] z-[9998] flex flex-col overflow-hidden bg-slate-50/95 dark:bg-[#050505]/95 backdrop-blur-[24px] border border-black/10 dark:border-white/10 shadow-2xl rounded-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
          >
            {/* Header Chiseled */}
            <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-black/5 dark:bg-white/5 relative overflow-hidden">
               {/* Shine effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative w-10 h-10 rounded-full bg-background flex justify-center items-center border border-border">
                  <Bot className="w-5 h-5 text-brand" />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-background ${connectionStatus === 'connected' ? 'bg-green-500' :
                      connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">ByteBot</h3>
                  <p className="text-xs text-foreground/60 font-mono tracking-wider uppercase">
                    {connectionStatus === 'connected' ? 'IA • Online' :
                      connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 relative z-10">
                {leadScore > 0 && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] uppercase font-mono tracking-wider bg-brand/10 text-brand border-none"
                  >
                    {getScoreLabel(leadScore)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Acciones rápidas */}
            {shouldCollectContact && (
              <motion.div
                className="p-3 bg-brand/5 border-b border-brand/10"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-brand mb-2 font-mono uppercase tracking-wider">
                  // Sugerencias
                </p>
                <div className="flex gap-2 flex-wrap">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={action.action}
                      className="text-xs h-7 border-brand/20 hover:bg-brand/10 text-foreground"
                    >
                      {action.icon}
                      <span className="ml-1">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
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
                       <Bot className="w-4 h-4 text-brand" />
                       <span className="text-[10px] text-foreground/50 font-mono tracking-widest uppercase">ByteBot</span>
                     </div>
                  )}

                  <div
                    className={`max-w-[85%] p-4 rounded-2xl transition-all duration-200 text-sm ${msg.role === "user"
                        ? "bg-foreground text-background ml-auto rounded-tr-none"
                        : "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground rounded-tl-none"
                      }`}
                  >
                    {msg.role === "assistant" ? (
                      <Markdown content={msg.message} />
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>
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
                  <Bot className="w-4 h-4 text-brand" />
                  <div className="bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-black/10 dark:border-white/10 rounded-tl-none">
                    <div className="flex items-center gap-2">
                       <div className="flex gap-1">
                          <motion.div className="w-1.5 h-1.5 rounded-full bg-brand" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                          <motion.div className="w-1.5 h-1.5 rounded-full bg-brand" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                          <motion.div className="w-1.5 h-1.5 rounded-full bg-brand" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={isTyping ? "Procesando..." : "Escribe tu directiva..."}
                  disabled={isTyping}
                  className="flex-1 bg-background border-border focus:border-brand transition-colors h-12 rounded-xl"
                  maxLength={1000}
                />
                <Button
                  size="icon"
                  onClick={sendMessage}
                  disabled={isTyping || !input.trim()}
                  className="h-12 w-12 bg-foreground text-background hover:bg-foreground/90 transition-opacity rounded-xl"
                >
                  {isTyping ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <SendHorizonal className="h-5 w-5" />
                  )}
                </Button>
              </div>

              <div className="flex justify-between items-center mt-3 text-[10px] text-foreground/40 font-mono uppercase tracking-widest">
                <span>AI Core v2.4</span>
                {input.length > 0 && (
                  <span className={input.length > 900 ? "text-red-500" : "text-foreground/40"}>
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
