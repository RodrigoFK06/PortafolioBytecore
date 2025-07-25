"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useThemeState } from "@/hooks/use-theme-state"

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useThemeState()

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="transition-all duration-200 hover:scale-105"
    >
      <motion.div
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative h-5 w-5"
      >
        <motion.div
          animate={{ opacity: theme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
        <motion.div
          animate={{ opacity: theme === "light" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </Button>
  )
}

