'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowUpDown, TrendingUp, Clock, Star, Users, Hash } from 'lucide-react'
import { cn } from '@/packages/utils/functions/cn'

const SORT_OPTIONS = [
    { value: 'popular', label: 'Most Popular', icon: TrendingUp },
    { value: 'newest', label: 'Newest', icon: Clock },
    { value: 'votes', label: 'Most Votes', icon: Star },
    { value: 'servers', label: 'Most Servers', icon: Users },
    { value: 'alphabetical', label: 'A-Z', icon: Hash }
]

interface SearchSortProps {
    className?: string
}

export function SearchSort({ className }: SearchSortProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentSort = searchParams?.get('sort') || 'popular'
    const currentQuery = searchParams?.get('q') || ''
    const currentType = searchParams?.get('type') || 'all'
    const currentCategory = searchParams?.get('category') || ''

    const updateSort = (value: string) => {
        const params = new URLSearchParams(searchParams?.toString())

        if (currentQuery) params.set('q', currentQuery)
        if (currentType !== 'all') params.set('type', currentType)
        if (currentCategory) params.set('category', currentCategory)
        params.set('sort', value)

        router.push(`/search?${params.toString()}`)
    }

    const currentSortOption = SORT_OPTIONS.find(opt => opt.value === currentSort)
    const CurrentIcon = currentSortOption?.icon || TrendingUp

    return (
        <div className={cn('flex items-center gap-3', className)}>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort by:</span>
            </div>

            <div className="relative">
                <motion.div
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-card/80 to-background/80 backdrop-blur-xl border border-border/50 rounded-lg transition-all duration-200 cursor-pointer group shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <CurrentIcon className="w-4 h-4 text-primary" />
                    <select
                        value={currentSort}
                        onChange={e => updateSort(e.target.value)}
                        className="appearance-none bg-transparent border-none outline-none text-sm font-medium cursor-pointer pr-2 text-foreground"
                    >
                        {SORT_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
            </div>
        </div>
    )
}
