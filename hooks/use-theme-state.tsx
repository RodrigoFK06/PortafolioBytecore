"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface UseThemeReturnType {
  theme: string | undefined
  setTheme: (theme: string) => void
  mounted: boolean
  isDark: boolean
  isLight: boolean
  toggleTheme: () => void
}

export function useThemeState(): UseThemeReturnType {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === "dark" : false
  const isLight = mounted ? theme === "light" : false

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return {
    theme: mounted ? theme : undefined,
    setTheme,
    mounted,
    isDark,
    isLight,
    toggleTheme,
  }
}
