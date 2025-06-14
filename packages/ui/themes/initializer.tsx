'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

/**
 * ThemeInitializer component ensures a smooth initial theme transition
 * by preventing a flash of unstyled content (FOUC) when the page loads
 */
export function ThemeInitializer() {
    const { theme, setTheme } = useTheme()
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        // Get the initial theme from localStorage or system preference
        const initialTheme =
            localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

        // Set the theme immediately on mount
        setTheme(initialTheme)

        // Add transition after initial theme is set
        const timer = setTimeout(() => {
            document.documentElement.style.setProperty(
                'transition',
                'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
            )
            setIsInitialized(true)
        }, 100)

        // Handle system theme changes
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                setTheme(e.matches ? 'dark' : 'light')
            }
        }

        darkModeMediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            clearTimeout(timer)
            darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange)
            document.documentElement.style.removeProperty('transition')
        }
    }, [theme, setTheme])

    return null
}
