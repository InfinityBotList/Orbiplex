'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

type ColorScheme = 'purple' | 'blue' | 'cyan' | 'green' | 'pink' | 'orange' | 'red' | 'indigo' | 'crimson'

type ColorContext = {
    colorScheme: ColorScheme
    setColorScheme: (colorScheme: ColorScheme) => void
}

const ColorSchemeContext = createContext<ColorContext | undefined>(undefined)

// Enhanced color schemes with better definitions
const schemes = {
    purple: {
        light: {
            'primary': 'hsl(270 91% 65%)',
            'primary-foreground': 'hsl(270 100% 98%)',
            'accent': 'hsl(280 91% 70%)',
            'accent-foreground': 'hsl(280 100% 98%)'
        },
        dark: {
            'primary': 'hsl(270 91% 65%)',
            'primary-foreground': 'hsl(270 100% 98%)',
            'accent': 'hsl(280 91% 70%)',
            'accent-foreground': 'hsl(280 100% 98%)'
        }
    },
    blue: {
        light: {
            'primary': 'hsl(221 83% 53%)',
            'primary-foreground': 'hsl(221 100% 98%)',
            'accent': 'hsl(213 93% 68%)',
            'accent-foreground': 'hsl(213 100% 98%)'
        },
        dark: {
            'primary': 'hsl(221 83% 65%)',
            'primary-foreground': 'hsl(221 100% 98%)',
            'accent': 'hsl(213 93% 70%)',
            'accent-foreground': 'hsl(213 100% 98%)'
        }
    },
    cyan: {
        light: {
            'primary': 'hsl(188 94% 42%)',
            'primary-foreground': 'hsl(188 100% 98%)',
            'accent': 'hsl(187 85% 53%)',
            'accent-foreground': 'hsl(187 100% 98%)'
        },
        dark: {
            'primary': 'hsl(188 94% 50%)',
            'primary-foreground': 'hsl(188 100% 98%)',
            'accent': 'hsl(187 85% 60%)',
            'accent-foreground': 'hsl(187 100% 98%)'
        }
    },
    green: {
        light: {
            'primary': 'hsl(142 76% 36%)',
            'primary-foreground': 'hsl(142 100% 98%)',
            'accent': 'hsl(138 76% 42%)',
            'accent-foreground': 'hsl(138 100% 98%)'
        },
        dark: {
            'primary': 'hsl(142 70% 48%)',
            'primary-foreground': 'hsl(142 100% 98%)',
            'accent': 'hsl(138 70% 54%)',
            'accent-foreground': 'hsl(138 100% 98%)'
        }
    },
    pink: {
        light: {
            'primary': 'hsl(330 81% 60%)',
            'primary-foreground': 'hsl(330 100% 98%)',
            'accent': 'hsl(326 78% 65%)',
            'accent-foreground': 'hsl(326 100% 98%)'
        },
        dark: {
            'primary': 'hsl(330 81% 65%)',
            'primary-foreground': 'hsl(330 100% 98%)',
            'accent': 'hsl(326 78% 70%)',
            'accent-foreground': 'hsl(326 100% 98%)'
        }
    },
    orange: {
        light: {
            'primary': 'hsl(24 95% 53%)',
            'primary-foreground': 'hsl(24 100% 98%)',
            'accent': 'hsl(20 90% 58%)',
            'accent-foreground': 'hsl(20 100% 98%)'
        },
        dark: {
            'primary': 'hsl(24 95% 60%)',
            'primary-foreground': 'hsl(24 100% 98%)',
            'accent': 'hsl(20 90% 65%)',
            'accent-foreground': 'hsl(20 100% 98%)'
        }
    },
    red: {
        light: {
            'primary': 'hsl(0 84% 60%)',
            'primary-foreground': 'hsl(0 100% 98%)',
            'accent': 'hsl(0 72% 67%)',
            'accent-foreground': 'hsl(0 100% 98%)'
        },
        dark: {
            'primary': 'hsl(0 84% 65%)',
            'primary-foreground': 'hsl(0 100% 98%)',
            'accent': 'hsl(0 72% 70%)',
            'accent-foreground': 'hsl(0 100% 98%)'
        }
    },
    indigo: {
        light: {
            'primary': 'hsl(239 84% 67%)',
            'primary-foreground': 'hsl(239 100% 98%)',
            'accent': 'hsl(243 75% 72%)',
            'accent-foreground': 'hsl(243 100% 98%)'
        },
        dark: {
            'primary': 'hsl(239 84% 70%)',
            'primary-foreground': 'hsl(239 100% 98%)',
            'accent': 'hsl(243 75% 75%)',
            'accent-foreground': 'hsl(243 100% 98%)'
        }
    },
    crimson: {
        light: {
            'primary': 'hsl(348 83% 47%)',
            'primary-foreground': 'hsl(348 100% 98%)',
            'accent': 'hsl(0 84% 60%)',
            'accent-foreground': 'hsl(0 100% 98%)'
        },
        dark: {
            'primary': 'hsl(348 83% 55%)',
            'primary-foreground': 'hsl(348 100% 98%)',
            'accent': 'hsl(0 84% 65%)',
            'accent-foreground': 'hsl(0 100% 98%)'
        }
    }
}

export function ColorSchemeProvider({
    children,
    defaultColorScheme = 'purple'
}: {
    children: React.ReactNode
    defaultColorScheme?: ColorScheme
}) {
    const [colorScheme, setColorSchemeState] = useState<ColorScheme>(defaultColorScheme)
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Load saved color scheme on mount
    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem('color-scheme') as ColorScheme
        if (saved && schemes[saved]) {
            setColorSchemeState(saved)
        }
    }, [])

    // Apply colors based on the selected scheme
    useEffect(() => {
        if (!mounted) return

        const root = document.documentElement
        const mode = resolvedTheme === 'dark' ? 'dark' : 'light'
        const selectedScheme = schemes[colorScheme]?.[mode] || schemes.purple[mode]

        // Update CSS variables with smooth transition
        root.style.transition = 'color 0.3s ease, background-color 0.3s ease'

        for (const [key, value] of Object.entries(selectedScheme)) {
            root.style.setProperty(`--${key}`, value)
        }

        // Remove transition after a delay to prevent layout issues
        setTimeout(() => {
            root.style.transition = ''
        }, 300)
    }, [colorScheme, resolvedTheme, mounted])

    const setColorScheme = (newScheme: ColorScheme) => {
        setColorSchemeState(newScheme)
        localStorage.setItem('color-scheme', newScheme)
    }

    return <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>{children}</ColorSchemeContext.Provider>
}

export const useColorScheme = () => {
    const context = useContext(ColorSchemeContext)
    if (context === undefined) {
        throw new Error('useColorScheme must be used within a ColorSchemeProvider')
    }
    return context
}
