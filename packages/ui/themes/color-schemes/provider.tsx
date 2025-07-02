'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

type ColorScheme = 'purple' | 'blue' | 'green' | 'pink' | 'orange' | 'teal' | 'cyan' | 'red' | 'indigo' | 'crimson'

type ColorContext = {
    colorScheme: ColorScheme
    setColorScheme: (colorScheme: ColorScheme) => void
}

const ColorSchemeContext = createContext<ColorContext | undefined>(undefined)

// Define color schemes for both light and dark themes
const schemes = {
    purple: {
        light: {
            'primary': 'hsl(270 67% 47%)',
            'primary-foreground': 'hsl(270 100% 98%)',
            'accent': 'hsl(316 67% 47%)',
            'accent-foreground': 'hsl(316 100% 98%)'
        },
        dark: {
            'primary': 'hsl(270 91% 65%)',
            'primary-foreground': 'hsl(270 100% 98%)',
            'accent': 'hsl(316 91% 65%)',
            'accent-foreground': 'hsl(316 100% 98%)'
        }
    },
    blue: {
        light: {
            'primary': 'hsl(221 83% 53%)',
            'primary-foreground': 'hsl(221 100% 98%)',
            'accent': 'hsl(199 89% 48%)',
            'accent-foreground': 'hsl(199 100% 98%)'
        },
        dark: {
            'primary': 'hsl(221 83% 65%)',
            'primary-foreground': 'hsl(221 100% 98%)',
            'accent': 'hsl(199 89% 65%)',
            'accent-foreground': 'hsl(199 100% 98%)'
        }
    },
    green: {
        light: {
            'primary': 'hsl(142 76% 36%)',
            'primary-foreground': 'hsl(142 100% 98%)',
            'accent': 'hsl(168 75% 36%)',
            'accent-foreground': 'hsl(168 100% 98%)'
        },
        dark: {
            'primary': 'hsl(142 70% 48%)',
            'primary-foreground': 'hsl(142 100% 98%)',
            'accent': 'hsl(168 70% 48%)',
            'accent-foreground': 'hsl(168 100% 98%)'
        }
    },
    pink: {
        light: {
            'primary': 'hsl(330 81% 60%)',
            'primary-foreground': 'hsl(330 100% 98%)',
            'accent': 'hsl(349 89% 60%)',
            'accent-foreground': 'hsl(349 100% 98%)'
        },
        dark: {
            'primary': 'hsl(330 81% 65%)',
            'primary-foreground': 'hsl(330 100% 98%)',
            'accent': 'hsl(349 89% 65%)',
            'accent-foreground': 'hsl(349 100% 98%)'
        }
    },
    orange: {
        light: {
            'primary': 'hsl(24 95% 50%)',
            'primary-foreground': 'hsl(24 100% 98%)',
            'accent': 'hsl(36 100% 50%)',
            'accent-foreground': 'hsl(36 100% 98%)'
        },
        dark: {
            'primary': 'hsl(24 95% 65%)',
            'primary-foreground': 'hsl(24 100% 98%)',
            'accent': 'hsl(36 100% 65%)',
            'accent-foreground': 'hsl(36 100% 98%)'
        }
    },
    crimson: {
        light: {
            'primary': 'hsl(336 80% 43%)',
            'primary-foreground': 'hsl(336 100% 98%)',
            'accent': 'hsl(346 89% 43%)',
            'accent-foreground': 'hsl(346 100% 98%)'
        },
        dark: {
            'primary': 'hsl(336 80% 55%)',
            'primary-foreground': 'hsl(336 100% 98%)',
            'accent': 'hsl(346 89% 55%)',
            'accent-foreground': 'hsl(346 100% 98%)'
        }
    },
    teal: {
        light: {
            'primary': 'hsl(170 80% 35%)',
            'primary-foreground': 'hsl(170 100% 98%)',
            'accent': 'hsl(180 70% 40%)',
            'accent-foreground': 'hsl(180 100% 98%)'
        },
        dark: {
            'primary': 'hsl(170 80% 45%)',
            'primary-foreground': 'hsl(170 100% 98%)',
            'accent': 'hsl(180 70% 50%)',
            'accent-foreground': 'hsl(180 100% 98%)'
        }
    }
}

export const colorSchemes = [
    {
        value: 'purple',
        label: 'Classic',
        description: 'Original purple theme',
        colors: { primary: '#8467fa', accent: '#bd63f9' }
    },
    {
        value: 'blue',
        label: 'Ocean',
        description: 'Deep blue waters',
        colors: { primary: '#3b82f6', accent: '#60a5fa' }
    },
    {
        value: 'green',
        label: 'Forest',
        description: 'Natural and calm',
        colors: { primary: '#10b981', accent: '#34d399' }
    },
    {
        value: 'pink',
        label: 'Sunset',
        description: 'Warm and vibrant',
        colors: { primary: '#ec4899', accent: '#f472b6' }
    },
    {
        value: 'orange',
        label: 'Amber',
        description: 'Energetic and warm',
        colors: { primary: '#f97316', accent: '#fb923c' }
    },
    {
        value: 'crimson',
        label: 'Blood',
        description: 'Deep and intense',
        colors: { primary: '#dc2626', accent: '#e96363' }
    },
    {
        value: 'teal',
        label: 'Teal',
        description: 'Cool and refreshing',
        colors: { primary: '#14b8a6', accent: '#06b6d4' }
    }
]

export function ColorSchemeProvider({
    children,
    defaultColorScheme = 'purple'
}: {
    children: React.ReactNode
    defaultColorScheme?: ColorScheme
}) {
    const [colorScheme, setColorSchemeState] = useState<ColorScheme>(defaultColorScheme)
    const { theme } = useTheme()

    // Apply colors based on the selected scheme
    useEffect(() => {
        const root = document.documentElement

        // Get the current theme mode
        const mode = theme === 'dark' ? 'dark' : 'light'

        // Apply the selected color scheme
        const selectedScheme = schemes[colorScheme]?.[mode] || schemes.purple[mode]

        // Update CSS variables
        for (const [key, value] of Object.entries(selectedScheme)) {
            root.style.setProperty(`--${key}`, value)
        }
    }, [colorScheme, theme])

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
