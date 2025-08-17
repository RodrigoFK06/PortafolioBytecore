// lib/design-system.ts - Sistema de diseño unificado

export const colors = {
  // Menta elegante - Colores principales
  mint: {
    light: '#A1FFCE',
    base: '#43E97B',
    dark: '#2DD859',
    text: '#1A5D37'
  },
  
  // Gradientes azul-celeste para elementos destacados
  gradients: {
    primary: 'linear-gradient(90deg, #00C6FF, #0072FF)',
    secondary: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    mint: 'linear-gradient(135deg, #A1FFCE, #43E97B)',
    success: 'linear-gradient(90deg, #43E97B, #2DD859)'
  },
  
  // Verde azulado profesional para elementos de confianza
  teal: {
    light: '#4DD0E1',
    base: '#00BFA6',
    dark: '#00A693'
  },
  
  // Sistema glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    strong: 'rgba(255, 255, 255, 0.25)',
    darkLight: 'rgba(0, 0, 0, 0.1)',
    darkMedium: 'rgba(0, 0, 0, 0.15)',
    darkStrong: 'rgba(0, 0, 0, 0.25)'
  }
}

export const glassmorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdrop: 'blur(4px)'
  },
  dark: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
    backdrop: 'blur(8px)'
  }
}

// Funciones utilitarias para aplicar el sistema
export const getAccentColor = (theme: 'light' | 'dark') => {
  return theme === 'light' ? colors.mint.base : colors.mint.light
}

export const getGradientText = (gradient: keyof typeof colors.gradients) => {
  return {
    background: colors.gradients[gradient],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }
}

export const getGlassStyle = (theme: 'light' | 'dark', intensity: 'light' | 'medium' | 'strong' = 'medium') => {
  const glass = theme === 'light' ? glassmorphism.light : glassmorphism.dark
  return {
    background: glass.background,
    backdropFilter: glass.backdrop,
    border: `1px solid ${glass.border}`,
    boxShadow: glass.shadow
  }
}
