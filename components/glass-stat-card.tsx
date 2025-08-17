"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { AnimatedCounter } from "./animated-counter"
import { cn } from "@/lib/utils"

interface GlassStatCardProps {
  value: number
  suffix?: string
  label: string
  gradient?: 'mint' | 'blue' | 'cyan' | 'teal'
  delay?: number
  className?: string
}

export function GlassStatCard({ 
  value, 
  suffix = "", 
  label, 
  gradient = 'mint',
  delay = 0,
  className 
}: GlassStatCardProps) {
  const { theme } = useTheme()
  
  const gradientClasses = {
    mint: 'bg-gradient-mint',
    blue: 'bg-gradient-blue', 
    cyan: 'bg-gradient-cyan',
    teal: 'from-teal-400 to-teal-600'
  }

  const textColorClasses = {
    mint: 'text-mint-400 dark:text-mint-200',
    blue: 'text-gradient-primary dark:text-gradient-secondary',
    cyan: 'text-gradient-tertiary dark:text-gradient-quaternary',
    teal: 'text-teal-500 dark:text-teal-300'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 text-center",
        // Glassmorphism effect
        "bg-white/10 dark:bg-white/5",
        "backdrop-blur-md border border-white/20 dark:border-white/10",
        "shadow-lg hover:shadow-xl hover:shadow-mint-400/20 dark:hover:shadow-mint-300/10",
        "transition-all duration-300",
        className
      )}
    >
      {/* Background gradient glow */}
      <div className={cn(
        "absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500",
        gradientClasses[gradient]
      )} />
      
      {/* Content */}
      <div className="relative z-10">
        <motion.div 
          className={cn(
            "text-3xl md:text-4xl font-bold mb-2",
            // Gradient text effect
            "bg-gradient-to-r bg-clip-text text-transparent",
            gradient === 'mint' && "from-mint-400 to-mint-600 dark:from-mint-200 dark:to-mint-400",
            gradient === 'blue' && "from-gradient-primary to-gradient-secondary",
            gradient === 'cyan' && "from-gradient-tertiary to-gradient-quaternary", 
            gradient === 'teal' && "from-teal-400 to-teal-600 dark:from-teal-200 dark:to-teal-400"
          )}
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        >
          <AnimatedCounter from={0} to={value} />
          <span>{suffix}</span>
        </motion.div>
        
        <motion.p 
          className="text-sm md:text-base text-muted-foreground/80 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        >
          {label}
        </motion.p>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-mint-400/20 via-teal-400/20 to-mint-400/20 bg-[length:200%_100%] animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}

interface GlassStatsGridProps {
  stats: Array<{
    value: number
    suffix?: string
    label: string
    gradient?: 'mint' | 'blue' | 'cyan' | 'teal'
  }>
  className?: string
}

export function GlassStatsGrid({ stats, className }: GlassStatsGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
      className
    )}>
      {stats.map((stat, index) => (
        <GlassStatCard
          key={index}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          gradient={stat.gradient}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}
