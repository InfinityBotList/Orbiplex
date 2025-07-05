'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Grid,
    List,
    TrendingUp,
    Sparkles,
    Bot,
    Server,
    Users,
    Star,
    Filter,
    X,
    SlidersHorizontal
} from 'lucide-react'
import { cn } from '@byteutils/functions/cn'
import { SearchResults } from '@byteui/layouts/search/search-results'
import { SearchFilters } from '@byteui/layouts/search/search-filters'
import { SearchSort } from '@byteui/layouts/search/search-sort'

export function SearchPageLayout() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [gradientPosition, setGradientPosition] = useState({ x: 0.5, y: 0.5 })
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showMobileFilters, setShowMobileFilters] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const query = searchParams?.get('q') || ''
    const type = searchParams?.get('type') || 'all'

    // Initialize search value and sync with URL
    useEffect(() => {
        setSearchValue(query)
    }, [query])

    // Update URL when type changes
    const updateType = (newType: string) => {
        const params = new URLSearchParams(searchParams?.toString())

        if (newType !== 'all') {
            params.set('type', newType)
        } else {
            params.delete('type')
        }

        router.push(`/search?${params.toString()}`)
    }

    // Handle search submission
    const handleSearch = () => {
        const params = new URLSearchParams(searchParams?.toString())

        if (searchValue.trim()) {
            params.set('q', searchValue.trim())
        } else {
            params.delete('q')
        }

        router.push(`/search?${params.toString()}`)
    }

    // Mouse tracking for gradient
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth
            const y = e.clientY / window.innerHeight
            setGradientPosition({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Enhanced type selector options with better stats
    const typeOptions = [
        { id: 'all', label: 'All', emoji: '🌟', count: '3,500+', description: 'Everything' },
        { id: 'bots', label: 'Bots', emoji: '🤖', count: '2,000+', description: 'Discord Bots' },
        { id: 'servers', label: 'Servers', emoji: '🏠', count: '1,500+', description: 'Communities' }
    ]

    // Featured discovery categories
    const discoveryCategories = [
        { id: 'trending', name: 'Trending Now', icon: TrendingUp, count: 156, color: 'from-orange-500 to-red-500' },
        { id: 'new', name: 'New & Fresh', icon: Sparkles, count: 89, color: 'from-blue-500 to-purple-500' },
        { id: 'top-rated', name: 'Top Rated', icon: Star, count: 234, color: 'from-yellow-500 to-amber-500' },
        { id: 'most-used', name: 'Most Used', icon: Users, count: 445, color: 'from-green-500 to-emerald-500' }
    ]

    const hasActiveFilters = type !== 'all' || searchParams?.get('category') || searchParams?.get('sort') !== 'popular'

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Enhanced gradient background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                        background: `radial-gradient(1200px circle at ${gradientPosition.x * 100}% ${gradientPosition.y * 100}%, var(--primary) 0%, transparent 70%)`,
                        opacity: 0.06
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)',
                        backgroundSize: '80px 80px'
                    }}
                />
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-primary/4 to-accent/4 blur-3xl" />
                <motion.div
                    className="absolute bottom-0 left-0 w-[800px] h-[800px] translate-y-1/2 -translate-x-1/2 rounded-full bg-gradient-to-tr from-accent/4 to-primary/4 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            <div className="relative z-10 container max-w-screen-2xl mx-auto px-4 py-6 lg:py-8 mt-10">
                {/* Enhanced Header Section */}
                <div className="mb-8 lg:mb-12">
                    <div className="text-center">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-secondary text-sm font-medium mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Sparkles className="w-4 h-4" />
                            Discover Amazing Discord Content
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Level Up Your{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
                                Discord Experience
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Explore thousands of Discord bots, servers, and communities. Find exactly what you need to
                            enhance your Discord experience.
                        </motion.p>

                        {/* Quick Discovery Cards */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {discoveryCategories.map((category, index) => {
                                const Icon = category.icon
                                return (
                                    <motion.button
                                        key={category.id}
                                        className="group relative p-4 rounded-xl bg-gradient-to-b from-card/90 to-background/90 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
                                        whileHover={{ y: -2, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div
                                            className={cn(
                                                'w-10 h-10 rounded-lg flex items-center justify-center mb-2 mx-auto bg-gradient-to-r',
                                                category.color
                                            )}
                                        >
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-xs mb-1 group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">{category.count} items</p>
                                    </motion.button>
                                )
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Desktop Sidebar */}
                    <motion.aside
                        className="lg:col-span-3 hidden lg:block"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="sticky top-8 space-y-6">
                            {/* Type Selector */}
                            <div className="bg-gradient-to-b from-card/90 to-background/90 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Bot className="w-5 h-5 text-primary" />
                                    Content Type
                                </h3>
                                <div className="space-y-3">
                                    {typeOptions.map(typeOption => (
                                        <motion.button
                                            key={typeOption.id}
                                            onClick={() => updateType(typeOption.id)}
                                            className={cn(
                                                'w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200',
                                                type === typeOption.id
                                                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg'
                                                    : 'hover:bg-muted/50 border border-transparent hover:border-border/50'
                                            )}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="text-2xl">{typeOption.emoji}</span>
                                            <div className="flex-1 text-left">
                                                <div className="font-medium">{typeOption.label}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {typeOption.description}
                                                </div>
                                            </div>
                                            <div className="text-xs font-medium px-2 py-1 rounded-full bg-muted/50">
                                                {typeOption.count}
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Filters */}
                            <SearchFilters />
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <motion.main
                        className="lg:col-span-9"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        {/* Enhanced Search and Control Bar */}
                        <div className="bg-gradient-to-b from-card/90 to-background/90 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-lg mb-8">
                            {/* Search Bar */}
                            <div className="mb-6">
                                <div className="relative flex items-center">
                                    {/* Search Icon Container */}
                                    <div className="flex items-center justify-center w-12 h-16 px-4 py-4 bg-gradient-to-b from-card to-primary border border-accent rounded-l-2xl border-r-0">
                                        <Search className="w-5 h-5 text-muted-foreground" />
                                    </div>

                                    {/* Search Input */}
                                    <input
                                        type="text"
                                        placeholder="Search for bots, servers, or categories..."
                                        value={searchValue}
                                        onChange={e => setSearchValue(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                handleSearch()
                                            }
                                        }}
                                        className={cn(
                                            'flex-1 px-4 py-4 text-lg font-medium',
                                            'bg-transparent backdrop-blur-xl',
                                            'border border-accent border-l-0 rounded-r-2xl',
                                            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
                                            'transition-all duration-200',
                                            'placeholder:text-muted-foreground/70 text-foreground',
                                            'shadow-sm shadow-accent hover:shadow-accent'
                                        )}
                                    />

                                    {/* Clear Button */}
                                    <AnimatePresence>
                                        {searchValue && (
                                            <motion.button
                                                onClick={() => {
                                                    setSearchValue('')
                                                    const params = new URLSearchParams(searchParams?.toString())
                                                    params.delete('q')
                                                    router.push(`/search?${params.toString()}`)
                                                }}
                                                className="absolute right-3 p-1 hover:bg-muted/50 rounded-lg transition-colors z-10"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                {/* Mobile Type Selector */}
                                <div className="lg:hidden">
                                    <div className="flex items-center gap-2 p-2 rounded-xl bg-gradient-to-b from-card/80 to-background/80 backdrop-blur-xl border border-border/50">
                                        {typeOptions.map(typeOption => (
                                            <motion.button
                                                key={typeOption.id}
                                                onClick={() => updateType(typeOption.id)}
                                                className={cn(
                                                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm',
                                                    type === typeOption.id
                                                        ? 'bg-primary/20 text-primary shadow-lg'
                                                        : 'hover:bg-muted/50 text-muted-foreground'
                                                )}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span>{typeOption.emoji}</span>
                                                <span className="hidden sm:inline">{typeOption.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-between lg:justify-end gap-4">
                                    {/* Sort */}
                                    <SearchSort />

                                    {/* View Mode Toggle */}
                                    <div className="flex items-center gap-1 p-1 rounded-lg bg-gradient-to-b from-card/80 to-background/80 backdrop-blur-xl border border-border/50">
                                        <motion.button
                                            onClick={() => setViewMode('grid')}
                                            className={cn(
                                                'p-2 rounded-md transition-all duration-200',
                                                viewMode === 'grid'
                                                    ? 'bg-primary/20 text-primary shadow-lg'
                                                    : 'hover:bg-muted/50 text-muted-foreground'
                                            )}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Grid className="w-4 h-4" />
                                        </motion.button>
                                        <motion.button
                                            onClick={() => setViewMode('list')}
                                            className={cn(
                                                'p-2 rounded-md transition-all duration-200',
                                                viewMode === 'list'
                                                    ? 'bg-primary/20 text-primary shadow-lg'
                                                    : 'hover:bg-muted/50 text-muted-foreground'
                                            )}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <List className="w-4 h-4" />
                                        </motion.button>
                                    </div>

                                    {/* Mobile Filter Toggle */}
                                    <motion.button
                                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                                        className={cn(
                                            'lg:hidden p-2 rounded-lg transition-all duration-200 bg-gradient-to-b from-card/80 to-background/80 backdrop-blur-xl border border-border/50',
                                            showMobileFilters || hasActiveFilters
                                                ? 'bg-primary/20 text-primary border-primary/30'
                                                : 'hover:bg-muted/50 text-muted-foreground'
                                        )}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Active Filters Indicator */}
                            {hasActiveFilters && (
                                <motion.div
                                    className="mt-4 pt-4 border-t border-border/50"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Filter className="w-4 h-4" />
                                        <span>Active filters applied</span>
                                        <button
                                            onClick={() => {
                                                router.push('/search')
                                            }}
                                            className="text-primary hover:text-primary/80 transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Mobile Filters */}
                        <AnimatePresence>
                            {showMobileFilters && (
                                <motion.div
                                    className="lg:hidden mb-8"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="bg-gradient-to-b from-card/90 to-background/90 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold">Filters</h3>
                                            <button
                                                onClick={() => setShowMobileFilters(false)}
                                                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <SearchFilters />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Results */}
                        <Suspense
                            fallback={
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="h-80 bg-gradient-to-br from-card/60 to-background/60 backdrop-blur-xl rounded-2xl border border-border/50 animate-pulse"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            }
                        >
                            <SearchResults viewMode={viewMode} />
                        </Suspense>
                    </motion.main>
                </div>
            </div>
        </div>
    )
}
