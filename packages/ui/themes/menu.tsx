import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Moon, Sun, Monitor, Check, Palette, X } from 'lucide-react'
import { cn } from '@byteutils/functions'
import { useTheme } from 'next-themes'
import { useColorScheme } from './color-schemes/provider'

const themes = [
    {
        value: 'light',
        label: 'Light',
        icon: Sun,
        description: 'Clean and bright',
        preview: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    },
    {
        value: 'dark',
        label: 'Dark',
        icon: Moon,
        description: 'Easy on the eyes',
        preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    },
    {
        value: 'system',
        label: 'Auto',
        icon: Monitor,
        description: 'Follows device',
        preview: 'linear-gradient(135deg, #ffffff 0%, #0f172a 50%, #ffffff 100%)'
    }
]

const colorSchemes = [
    {
        value: 'purple',
        label: 'Purple',
        preview: ['#8b5cf6', '#a855f7', '#c4b5fd'],
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c4b5fd 100%)',
        description: 'Classic Orbiplex'
    },
    {
        value: 'blue',
        label: 'Blue',
        preview: ['#3b82f6', '#60a5fa', '#93c5fd'],
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
        description: 'Ocean depths'
    },
    {
        value: 'cyan',
        label: 'Cyan',
        preview: ['#06b6d4', '#22d3ee', '#67e8f9'],
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #67e8f9 100%)',
        description: 'Fresh waters'
    },
    {
        value: 'green',
        label: 'Green',
        preview: ['#10b981', '#34d399', '#6ee7b7'],
        gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
        description: 'Natural forest'
    },
    {
        value: 'pink',
        label: 'Pink',
        preview: ['#ec4899', '#f472b6', '#f9a8d4'],
        gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #f9a8d4 100%)',
        description: 'Warm sunset'
    },
    {
        value: 'orange',
        label: 'Orange',
        preview: ['#f97316', '#fb923c', '#fdba74'],
        gradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%)',
        description: 'Energy boost'
    },
    {
        value: 'red',
        label: 'Red',
        preview: ['#ef4444', '#f87171', '#fca5a5'],
        gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 50%, #fca5a5 100%)',
        description: 'Bold power'
    },
    {
        value: 'indigo',
        label: 'Indigo',
        preview: ['#6366f1', '#818cf8', '#a5b4fc'],
        gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)',
        description: 'Deep elegance'
    }
]

function ThemePreview({ theme, active, onClick }: { theme: any; active: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'relative group w-full p-3 rounded-xl border-2 transition-all duration-200 overflow-hidden py-4 px-4',
                active ? 'border-primary bg-card shadow-lg' : 'bg-card border-border hover:border-primary/50'
            )}
        >
            <div
                className="w-full h-16 rounded-lg mb-3 border border-border/30"
                style={{ background: theme.preview }}
            />
            <div className="flex items-center gap-3">
                <theme.icon size={20} className={active ? 'text-primary' : 'text-muted-foreground'} />
                <div className="text-left flex-1">
                    <div className={cn('font-medium text-sm', active && 'text-primary')}>{theme.label}</div>
                    <div className="text-xs text-muted-foreground">{theme.description}</div>
                </div>
                {active && <Check size={18} className="text-primary" />}
            </div>
        </button>
    )
}

function ColorSwatch({ scheme, active, onClick }: { scheme: any; active: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'relative group w-full p-3 rounded-xl border-2 transition-all duration-200 overflow-hidden bg-card py-4 px-4',
                active ? 'border-primary bg-primary/5 shadow-lg' : 'border-border hover:border-primary/50'
            )}
        >
            <div
                className="w-full h-12 rounded-lg mb-3 border border-border/30"
                style={{ background: scheme.gradient }}
            />
            <div className="flex items-center justify-between">
                <div className="text-left">
                    <div className={cn('font-medium text-sm', active && 'text-primary')}>{scheme.label}</div>
                    <div className="text-xs text-muted-foreground">{scheme.description}</div>
                </div>
                {active && <Check size={18} className="text-primary" />}
            </div>
        </button>
    )
}

export function ThemeMenu({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [tab, setTab] = useState<'appearance' | 'accent'>('appearance')
    const { theme, setTheme, resolvedTheme } = useTheme()
    const { colorScheme, setColorScheme } = useColorScheme()
    const [mounted, setMounted] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Fixed body scroll management - this was the main issue
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            // Use removeProperty to completely remove the overflow style
            document.body.style.removeProperty('overflow')
        }

        return () => {
            document.body.style.removeProperty('overflow')
        }
    }, [isOpen])

    const handleClose = useCallback(() => {
        setIsOpen(false)
        // Immediately restore scroll
        document.body.style.removeProperty('overflow')
    }, [])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                e.preventDefault()
                e.stopPropagation()
                handleClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape, { capture: true })
        }

        return () => {
            document.removeEventListener('keydown', handleEscape, { capture: true })
        }
    }, [isOpen, handleClose])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                handleClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside, { capture: true })
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, { capture: true })
        }
    }, [isOpen, handleClose])

    const currentScheme = colorSchemes.find(s => s.value === colorScheme)

    return (
        <div className={cn('relative', className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Open theme menu"
            >
                <div className="relative">
                    {mounted && resolvedTheme === 'dark' ? (
                        <Moon size={20} className="text-primary" />
                    ) : (
                        <Sun size={20} className="text-primary" />
                    )}
                    <div
                        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-background"
                        style={{ backgroundColor: currentScheme?.preview[0] || '#8b5cf6' }}
                    />
                </div>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

                    <div
                        ref={menuRef}
                        className={cn(
                            'fixed md:absolute right-0 md:mt-3 top-0 md:top-auto z-50',
                            'w-full md:w-[480px] max-w-full',
                            'h-full md:h-auto md:max-h-[80vh]',
                            'rounded-none md:rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl overflow-hidden'
                        )}
                    >
                        <div className="flex items-center gap-3 px-8 py-4 border-b border-border bg-card">
                            <Palette size={22} className="text-primary" />
                            <h3 className="font-semibold text-lg tracking-tight flex-1">Customize Appearance</h3>
                            <button
                                onClick={handleClose}
                                className="p-1.5 rounded-full hover:bg-muted/50 transition-colors"
                                aria-label="Close theme menu"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex border-b border-border bg-card relative">
                            {[
                                { id: 'appearance', label: 'Theme', icon: Monitor },
                                { id: 'accent', label: 'Colors', icon: Palette }
                            ].map(tabItem => (
                                <button
                                    key={tabItem.id}
                                    className={cn(
                                        'flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 relative',
                                        tab === tabItem.id
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                    onClick={() => setTab(tabItem.id as any)}
                                >
                                    <tabItem.icon size={16} />
                                    {tabItem.label}
                                    {tab === tabItem.id && (
                                        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="p-6 bg-card/90 overflow-y-auto max-h-[calc(80vh-140px)]">
                            {tab === 'appearance' && (
                                <div className="space-y-4">
                                    <div className="text-center mb-6">
                                        <h4 className="text-base font-medium mb-2">Choose Theme</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Select your preferred appearance mode
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {themes.map(themeOption => (
                                            <ThemePreview
                                                key={themeOption.value}
                                                theme={themeOption}
                                                active={theme === themeOption.value}
                                                onClick={() => setTheme(themeOption.value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {tab === 'accent' && (
                                <div className="space-y-4">
                                    <div className="text-center mb-6">
                                        <h4 className="text-base font-medium mb-2">Accent Colors</h4>
                                        <p className="text-sm text-muted-foreground">Pick your favorite color scheme</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {colorSchemes.map(scheme => (
                                            <ColorSwatch
                                                key={scheme.value}
                                                scheme={scheme}
                                                active={colorScheme === scheme.value}
                                                onClick={() => setColorScheme(scheme.value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
