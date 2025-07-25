"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, SendHorizonal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading"
import { SITE_CONFIG } from "@/lib/constants"
import dynamic from "next/dynamic"
import { Markdown } from "@/components/markdown"

const CursorFollower = dynamic(() => import("./cursor-follower"), { ssr: false })

export default function ChatbotButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [sessionId] = useState(() => Date.now().toString(36) + Math.random().toString(36).substring(2))
  const webhookUrl = SITE_CONFIG.chatbot.webhookUrl

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
    setIsTyping(true)

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
      const botReply = data?.output ?? "Lo siento, hubo un error al responder."
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }])
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "Ups, no se pudo conectar al asistente. 😓" }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <>
      <CursorFollower />
      <AnimatePresence>
        {isVisible && !isOpen && (
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-40 right-8 z-50 w-[360px] h-[480px] bg-background border border-white/10 shadow-2xl rounded-xl flex flex-col glass-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                ¡Hola! Soy <strong>Bytebot</strong>, tu asistente virtual 🤖
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted-foreground hover:text-white"
              >
                <X />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-4 px-4 py-2 custom-scroll">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                      <Bot className="w-4 h-4" />
                      <span>Bytebot</span>
                    </div>
                  )}
                  <div
                    className={`text-sm px-4 py-2 rounded-xl max-w-[80%] whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-primary text-white self-end ml-auto"
                        : "bg-muted text-muted-foreground self-start"
                    }`}
                  >
                    <Markdown content={msg.text} />
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-sm px-4 py-2 rounded-xl bg-muted text-muted-foreground self-start max-w-[80%]">
                  Bytebot está escribiendo<span className="animate-pulse">...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
