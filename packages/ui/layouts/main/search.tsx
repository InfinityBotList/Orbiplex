'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp, Bot, Server, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@byteutils/functions/cn'
import { useApiMutation } from '@byteutils/tanstack/react-query-client'
import { SearchRequest, SearchResponse } from '@byteutils/types/search'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResult {
    bots: any[]
    servers: any[]
    target_types: string[]
}

interface SearchBarProps {
    className?: string
    placeholder?: string
    showCategories?: boolean
}

// Popular categories - you can move this to a constants file
const POPULAR_CATEGORIES = [
    { id: 'music', name: 'Music', count: '500+' },
    { id: 'moderation', name: 'Moderation', count: '300+' },
    { id: 'fun', name: 'Fun', count: '400+' },
    { id: 'utility', name: 'Utility', count: '250+' },
    { id: 'gaming', name: 'Gaming', count: '200+' },
    { id: 'economy', name: 'Economy', count: '150+' }
]

export function BotSearchBar({
    className,
    placeholder = 'Search for bots, servers, or categories...',
    showCategories = true
}: SearchBarProps) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult | null>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [lastSearchQuery, setLastSearchQuery] = useState('')
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const resultsRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<NodeJS.Timeout>()
    const router = useRouter()

    // Search mutation
    const searchMutation = useApiMutation<SearchResponse, SearchRequest>({
        endpoint: '/list/search',
        method: 'POST',
        fetchOptions: { external: true },
        onSuccess: data => {
            // Ensure the data structure is what we expect
            setResults({
                bots: data?.bots || [],
                servers: data?.servers || [],
                target_types: data?.target_types || []
            })
            setError(null)
        },
        onError: error => {
            console.error('Search error:', error)
            setError('Failed to search. Please try again.')
            setResults(null)
        }
    })

    // Handle clicks outside of the search component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                // Only close if not hovering over results
                if (!isHovered) {
                    setIsFocused(false)
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isHovered])

    // Prevent closing when hovering over results
    const handleResultsMouseEnter = () => {
        setIsHovered(true)
    }

    const handleResultsMouseLeave = () => {
        setIsHovered(false)
    }

    // Keep dropdown open when user is interacting with it
    const handleInputFocus = () => {
        setIsFocused(true)
    }

    const handleInputBlur = () => {
        // Only close if not hovering over results
        setTimeout(() => {
            if (!isHovered) {
                setIsFocused(false)
            }
        }, 150)
    }

    // Debounced search function
    const debouncedSearch = useCallback(
        (searchQuery: string) => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }

            debounceRef.current = setTimeout(() => {
                const trimmedQuery = searchQuery.trim()

                // Prevent duplicate searches
                if (trimmedQuery === lastSearchQuery) {
                    return
                }

                // Prevent searching if already loading
                if (searchMutation.isPending) {
                    return
                }

                setLastSearchQuery(trimmedQuery)

                if (trimmedQuery) {
                    const searchRequest: SearchRequest = {
                        query: trimmedQuery,
                        target_types: ['bot', 'server']
                    }
                    searchMutation.mutate(searchRequest)
                } else {
                    setResults(null)
                    setError(null)
                    setLastSearchQuery('')
                }
            }, 300)
        },
        [searchMutation, lastSearchQuery]
    )

    // Handle query changes
    useEffect(() => {
        if (query.length > 0) {
            debouncedSearch(query)
        } else {
            setResults(null)
            setError(null)
            setLastSearchQuery('')
        }

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [query, debouncedSearch])

    const clearSearch = () => {
        setQuery('')
        setResults(null)
        setError(null)
        inputRef.current?.focus()
    }

    const handleSearchSubmit = (searchQuery: string) => {
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setIsFocused(false)
            setQuery(searchQuery)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSearchSubmit(query)
        }
    }

    const getAvatarUrl = (item: any) => {
        // Handle bot avatars (from user object)
        if (item.user?.avatar) {
            // If it's already an absolute URL, return as is
            if (item.user.avatar.startsWith('http')) {
                return item.user.avatar
            }
            // If it's a relative path, construct with CDN URL
            return `https://cdn.infinitybots.gg/${item.user.avatar}`
        }

        // Handle server/general avatars
        if (item.avatar?.exists && item.avatar.path) {
            // If it's already an absolute URL, return as is
            if (item.avatar.path.startsWith('http')) {
                return item.avatar.path
            }
            // If it's a relative path, construct with CDN URL
            return `https://cdn.infinitybots.gg/${item.avatar.path}`
        }

        // Handle default avatar paths
        if (item.avatar?.default_path) {
            if (item.avatar.default_path.startsWith('http')) {
                return item.avatar.default_path
            }
            return `https://cdn.infinitybots.gg/${item.avatar.default_path}`
        }

        // Fallback to a default avatar
        return '/default-avatar.png'
    }

    // Helper function to safely get array length
    const getArrayLength = (arr: any[] | undefined): number => {
        return Array.isArray(arr) ? arr.length : 0
    }

    // Determine if dropdown should be shown
    const shouldShowDropdown = isFocused && (query || showCategories)

    return (
        <div ref={searchRef} className={cn('relative w-full max-w-2xl mx-auto', className)}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />

                {query && (
                    <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <X className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {shouldShowDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        ref={resultsRef}
                        onMouseEnter={handleResultsMouseEnter}
                        onMouseLeave={handleResultsMouseLeave}
                        className="absolute z-50 w-full mt-2 bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-lg max-h-96 overflow-y-auto"
                    >
                        {/* Fixed header area */}
                        <div className="sticky top-0 z-10 bg-gradient-to-b from-card/95 to-card/80 backdrop-blur-xl border-b border-border/30">
                            {searchMutation.isPending ? (
                                <div className="flex items-center justify-center py-4">
                                    <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                                    <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
                                </div>
                            ) : error ? (
                                <div className="flex items-center justify-center py-4 text-muted-foreground">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            ) : null}
                        </div>

                        {/* Scrollable content area */}
                        <div className="overflow-y-auto max-h-[320px] overscroll-contain">
                            <div className="p-2 space-y-4">
                                {/* Quick Categories */}
                                {showCategories && !query && (
                                    <div className="p-2">
                                        <div className="text-xs font-medium text-muted-foreground/70 mb-3 px-2">
                                            POPULAR CATEGORIES
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {POPULAR_CATEGORIES.map(category => (
                                                <Link
                                                    key={category.id}
                                                    href={`/categories/${category.id}`}
                                                    className={cn(
                                                        'px-3 py-1.5 text-sm rounded-lg transition-all duration-200',
                                                        'bg-muted/50 hover:bg-primary/10 hover:text-primary',
                                                        'border border-border/50 hover:border-primary/30'
                                                    )}
                                                    onClick={() => setIsFocused(false)}
                                                >
                                                    {category.name}
                                                    <span className="ml-1.5 text-xs text-muted-foreground/70">
                                                        {category.count}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Search Results */}
                                {results && !searchMutation.isPending && !error && (
                                    <>
                                        {/* Bots */}
                                        {getArrayLength(results.bots) > 0 && (
                                            <div className="p-2">
                                                <div className="text-xs font-medium text-muted-foreground/70 mb-3 px-2 flex items-center gap-2">
                                                    <Bot className="w-3 h-3" /> BOTS ({getArrayLength(results.bots)})
                                                </div>
                                                <div className="space-y-1">
                                                    {results.bots.slice(0, 5).map(bot => (
                                                        <Link
                                                            key={bot.bot_id}
                                                            href={`/bots/${bot.vanity || bot.bot_id}`}
                                                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                                            onClick={() => setIsFocused(false)}
                                                        >
                                                            <Image
                                                                src={getAvatarUrl(bot)}
                                                                alt={
                                                                    bot.user?.display_name ||
                                                                    bot.user?.username ||
                                                                    'Bot'
                                                                }
                                                                width={40}
                                                                height={40}
                                                                className="rounded-full flex-shrink-0"
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium truncate">
                                                                    {bot.user?.display_name ||
                                                                        bot.user?.username ||
                                                                        'Unknown Bot'}
                                                                </div>
                                                                <div className="text-sm text-muted-foreground truncate">
                                                                    {bot.short}
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {(bot.votes || 0).toLocaleString()} votes
                                                                    </span>
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {(bot.servers || 0).toLocaleString()} servers
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                                {getArrayLength(results.bots) > 5 && (
                                                    <div className="text-center pt-2">
                                                        <Link
                                                            href={`/search?q=${encodeURIComponent(query)}&type=bots`}
                                                            className="text-xs text-primary hover:text-primary/80 transition-colors"
                                                            onClick={() => setIsFocused(false)}
                                                        >
                                                            View all {getArrayLength(results.bots)} bots →
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Servers */}
                                        {getArrayLength(results.servers) > 0 && (
                                            <div className="p-2 border-t border-border/50">
                                                <div className="text-xs font-medium text-muted-foreground/70 mb-3 px-2 flex items-center gap-2">
                                                    <Server className="w-3 h-3" /> SERVERS (
                                                    {getArrayLength(results.servers)})
                                                </div>
                                                <div className="space-y-1">
                                                    {results.servers.slice(0, 5).map(server => (
                                                        <Link
                                                            key={server.server_id}
                                                            href={`/servers/${server.vanity || server.server_id}`}
                                                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                                            onClick={() => setIsFocused(false)}
                                                        >
                                                            <Image
                                                                src={getAvatarUrl(server)}
                                                                alt={server.name}
                                                                width={40}
                                                                height={40}
                                                                className="rounded-full flex-shrink-0"
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium truncate">
                                                                    {server.name}
                                                                </div>
                                                                <div className="text-sm text-muted-foreground truncate">
                                                                    {server.short}
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {(server.total_members || 0).toLocaleString()}{' '}
                                                                        members
                                                                    </span>
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {(server.votes || 0).toLocaleString()} votes
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                                {getArrayLength(results.servers) > 5 && (
                                                    <div className="text-center pt-2">
                                                        <Link
                                                            href={`/search?q=${encodeURIComponent(query)}&type=servers`}
                                                            className="text-xs text-primary hover:text-primary/80 transition-colors"
                                                            onClick={() => setIsFocused(false)}
                                                        >
                                                            View all {getArrayLength(results.servers)} servers →
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* No Results */}
                                        {getArrayLength(results.bots) === 0 &&
                                            getArrayLength(results.servers) === 0 && (
                                                <div className="text-center py-8 text-muted-foreground">
                                                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                                    <p>No results found for &quot;{query}&quot;</p>
                                                    <p className="text-sm mt-1">Try adjusting your search terms</p>
                                                </div>
                                            )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* View All Results Button */}
                        {query && (
                            <div className="p-3 border-t border-border/50">
                                <button
                                    onClick={() => handleSearchSubmit(query)}
                                    className="w-full p-3 text-left hover:bg-accent/50 rounded-lg transition-colors flex items-center justify-between"
                                >
                                    <span>View all results for &quot;{query}&quot;</span>
                                    <TrendingUp className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
