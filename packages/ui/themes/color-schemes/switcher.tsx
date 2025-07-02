'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check } from 'lucide-react'
import { useColorScheme, colorSchemes } from './provider'

export function ColorSchemeSwitcher() {
    const { colorScheme, setColorScheme } = useColorScheme()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center rounded-md w-10 h-10 bg-background hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Change color scheme"
            >
                <Palette className="w-5 h-5" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full right-0 mt-2 p-2 z-50 bg-card border border-border rounded-lg shadow-lg w-64 grid grid-cols-2 gap-2"
                        >
                            {colorSchemes.map(scheme => {
                                const isSelected = colorScheme === scheme.value
                                return (
                                    <button
                                        key={scheme.value}
                                        onClick={() => {
                                            setColorScheme(scheme.value)
                                            setIsOpen(false)
                                        }}
                                        className={`relative p-3 rounded-lg border transition-all text-left ${
                                            isSelected
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border hover:border-primary/30 hover:bg-muted/50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div
                                                className="w-4 h-4 rounded-full border-2 border-background"
                                                style={{ backgroundColor: scheme.colors.primary }}
                                            />
                                            {isSelected && <Check className="w-4 h-4 text-primary" />}
                                        </div>
                                        <div className="text-sm font-medium">{scheme.label}</div>
                                        <div className="text-xs text-muted-foreground">{scheme.description}</div>
                                    </button>
                                )
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
