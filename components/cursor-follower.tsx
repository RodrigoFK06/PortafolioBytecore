"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    // Only show custom cursor on desktop
    const checkDevice = () => {
      const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window
      setIsVisible(!isMobile)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 400,
          mass: 0.3,
        }}
      />
    </>
  )
}

