"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, SendHorizonal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatbotButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generar sessionId único por sesión
  const [sessionId] = useState(() => Date.now().toString(36) + Math.random().toString(36).substring(2))

  const webhookUrl = "https://n8n-latest-7g9v.onrender.com/webhook/7c460c7f-810b-431f-a1ff-d363248d0d8e/chat"

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = input.trim()
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }])
    setInput("")

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          action: "sendMessage",
          chatInput: userMessage,
        }),
      })

      const data = await res.json()
      const botReply = data?.[0]?.text ?? "Lo siento, hubo un error al responder."
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }])
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Ups, no se pudo conectar al asistente. 😓" }])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <>
      {/* Botón flotante */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-40 right-8 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="icon"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir chatbot"
              className="rounded-full shadow-md bg-purple-600 text-white"
            >
              <Bot className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal del chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative bg-background border border-white/10 shadow-xl rounded-xl w-[95%] max-w-md h-[90%] p-4 md:p-6 flex flex-col glass-effect">
              {/* Botón cerrar */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-sm text-muted-foreground hover:text-white"
              >
                <X />
              </button>

              {/* Área de mensajes */}
              <div className="overflow-y-auto flex-1 space-y-3 pr-1">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`text-sm px-4 py-2 rounded-xl max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-primary text-white self-end ml-auto"
                        : "bg-muted text-muted-foreground self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input y botón enviar */}
              <div className="mt-4 flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                />
                <Button size="icon" onClick={sendMessage}>
                  <SendHorizonal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
