// components/sections/ContactClient.tsx
"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"

export function ContactClient() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="bg-card p-8 rounded-lg shadow-sm border"
    >
      <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
      <ContactForm />
    </motion.div>
  )
}
