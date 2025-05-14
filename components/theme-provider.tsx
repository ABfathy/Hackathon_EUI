'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ 
  children, 
  storageKey = 'theme',
  defaultTheme = 'system',
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      storageKey={storageKey}
      defaultTheme={defaultTheme}
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
