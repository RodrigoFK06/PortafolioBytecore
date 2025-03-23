"use client"

import { useRef, useEffect, useState } from "react"
import HeroCanvas from "@/components/HeroCanvas"
import { motion, useScroll, useTransform } from "framer-motion"

export default function HeroClient() {
  const ref = useRef(null)
  const [showCanvas, setShowCanvas] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setShowCanvas(true)
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 w-full h-full z-0">
      {showCanvas && <HeroCanvas />}
    </div>
  )
}
