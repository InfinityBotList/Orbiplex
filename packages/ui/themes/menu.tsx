'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Laptop, Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useColorScheme } from './color-schemes/provider'
import { cn } from '@byteutils/functions'

interface ThemeOption {
    value: string
    label: string
    icon: React.ElementType
}

const themes: ThemeOption[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Laptop }
]

const colorSchemes = [
    { value: 'purple', label: 'Classic' },
    { value: 'blue', label: 'Ocean' },
    { value: 'cyan', label: 'Sky' },
    { value: 'green', label: 'Forest' },
    { value: 'pink', label: 'Sunset' },
    { value: 'orange', label: 'Amber' },
    { value: 'red', label: 'Ruby' },
    { value: 'indigo', label: 'Royal' },
    { value: 'crimson', label: 'Blood' }
]

export function ThemeMenu({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()
    const { colorScheme, setColorScheme } = useColorScheme()
    const [mounted, setMounted] = React.useState(false)

    // Prevent hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className={cn('relative', className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                suppressHydrationWarning
            >
                {mounted ? (
                    resolvedTheme === 'dark' ? (
                        <Moon size={20} className="text-primary" />
                    ) : (
                        <Sun size={20} className="text-primary" />
                    )
                ) : (
                    // Fallback icon for SSR
                    <Sun size={20} className="text-primary" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-card/95 backdrop-blur-xl border border-border/30 shadow-lg"
                    >
                        <div className="mb-2">
                            {themes.map(option => {
                                const Icon = option.icon
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => setTheme(option.value)}
                                        className={cn(
                                            'flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors',
                                            theme === option.value
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-muted/50'
                                        )}
                                    >
                                        <Icon size={16} />
                                        {option.label}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="pt-2 border-t border-border/30">
                            <div className="px-3 py-1 text-xs text-muted-foreground font-medium">Color Scheme</div>
                            <div className="mt-1">
                                {colorSchemes.map(scheme => (
                                    <button
                                        key={scheme.value}
                                        onClick={() => {
                                            setColorScheme(scheme.value)
                                            setIsOpen(false)
                                        }}
                                        className={cn(
                                            'flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors hover:bg-muted/50',
                                            colorScheme === scheme.value && 'text-primary font-medium'
                                        )}
                                    >
                                        <span>{scheme.label}</span>
                                        {colorScheme === scheme.value && <Check size={16} className="text-primary" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
