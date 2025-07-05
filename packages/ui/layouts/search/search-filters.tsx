'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Hash, X } from 'lucide-react'
import { cn } from '@/packages/utils/functions/cn'

const CATEGORIES = [
    { id: 'moderation', name: 'Moderation', emoji: '🛡️' },
    { id: 'music', name: 'Music', emoji: '🎵' },
    { id: 'games', name: 'Games', emoji: '🎮' },
    { id: 'fun', name: 'Fun', emoji: '🎉' },
    { id: 'utility', name: 'Utility', emoji: '🔧' },
    { id: 'economy', name: 'Economy', emoji: '💰' },
    { id: 'logging', name: 'Logging', emoji: '📝' },
    { id: 'roleplay', name: 'Roleplay', emoji: '🎭' },
    { id: 'social', name: 'Social', emoji: '💬' },
    { id: 'nsfw', name: 'NSFW', emoji: '🔞' },
    { id: 'educational', name: 'Educational', emoji: '📚' },
    { id: 'productivity', name: 'Productivity', emoji: '⚡' }
]

interface SearchFiltersProps {
    className?: string
}

export function SearchFilters({ className }: SearchFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategory = searchParams?.get('category') || ''
    const currentQuery = searchParams?.get('q') || ''
    const currentType = searchParams?.get('type') || 'all'

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams?.toString())

        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }

        if (currentQuery) {
            params.set('q', currentQuery)
        }

        if (currentType !== 'all') {
            params.set('type', currentType)
        }

        router.push(`/search?${params.toString()}`)
    }

    return (
        <div className={cn('space-y-6', className)}>
            <div className="bg-gradient-to-b from-card/90 to-background/90 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Hash className="w-5 h-5 text-primary" />
                        Categories
                    </h3>
                    {currentCategory && (
                        <motion.button
                            onClick={() => updateFilter('category', '')}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X className="w-3 h-3" />
                            Clear
                        </motion.button>
                    )}
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin">
                    <motion.button
                        onClick={() => updateFilter('category', '')}
                        className={cn(
                            'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left',
                            !currentCategory
                                ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg'
                                : 'hover:bg-muted/50 border border-transparent hover:border-border/50'
                        )}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <span className="text-lg">🌟</span>
                        <span className="font-medium">All Categories</span>
                    </motion.button>

                    {CATEGORIES.map(category => (
                        <motion.button
                            key={category.id}
                            onClick={() => updateFilter('category', category.id)}
                            className={cn(
                                'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left',
                                currentCategory === category.id
                                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg'
                                    : 'hover:bg-muted/50 border border-transparent hover:border-border/50'
                            )}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <span className="text-lg">{category.emoji}</span>
                            <span className="font-medium">{category.name}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    )
}
