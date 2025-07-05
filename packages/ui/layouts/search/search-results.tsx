'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2, AlertCircle, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { cn } from '@byteutils/functions/cn'
import { useApiQuery } from '@byteutils/tanstack/react-query-client'
import { SearchRequest, SearchResponse } from '@byteutils/types/search'
import { BotCard } from '@byteui/components/cards/bots'
import { ServerCard } from '@byteui/components/cards/servers'
import { BotListItem } from '@byteui/components/list-items/bot-list-item'
import { ServerListItem } from '@byteui/components/list-items/server-list-item'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface SearchResultsProps {
    className?: string
    viewMode?: 'grid' | 'list'
}

export function SearchResults({ className, viewMode = 'grid' }: SearchResultsProps) {
    const searchParams = useSearchParams()
    const query = searchParams?.get('q') || ''
    const type = searchParams?.get('type') || 'all'
    const category = searchParams?.get('category') || ''
    const sort = searchParams?.get('sort') || 'popular'

    const [currentPage, setCurrentPage] = useState(1)
    const [results, setResults] = useState<SearchResponse | null>(null)
    const pageSize = 20

    // Build search request
    const searchRequest: SearchRequest = {
        query: query.trim() || undefined,
        target_types: type === 'all' ? ['bot', 'server'] : [type.slice(0, -1) as 'bot' | 'server'],
        page: currentPage,
        limit: pageSize,
        sort: sort,
        order: 'desc',
        filters: category || undefined
    }

    // Fetch search results
    const { data, isLoading, error, refetch } = useApiQuery<SearchResponse>(['search', searchRequest], '/list/search', {
        fetchOptions: {
            external: true,
            method: 'POST',
            body: JSON.stringify(searchRequest)
        },
        enabled: true
    })

    // Update results when data changes
    useEffect(() => {
        if (data) {
            setResults(data)
        }
    }, [data])

    // Reset page when search parameters change
    useEffect(() => {
        setCurrentPage(1)
    }, [query, type, sort, category])

    // Calculate pagination
    const totalResults = (results?.bots?.length || 0) + (results?.servers?.length || 0)
    const totalPages = Math.ceil(totalResults / pageSize)
    const hasNextPage = currentPage < totalPages
    const hasPrevPage = currentPage > 1

    // Handle pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Show empty state for no query
    if (!query.trim()) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                    <Search className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to discover?</h3>
                <p className="text-muted-foreground max-w-md">
                    Search for bots, servers, or browse by category to find amazing Discord content
                </p>
            </div>
        )
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    // Show error state
    if (error) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <AlertCircle className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">Failed to load content. Please try again.</p>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    const bots = results?.bots || []
    const servers = results?.servers || []

    return (
        <div className={className}>
            {/* Bots Section */}
            {bots.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🤖</span>
                            <h2 className="text-xl font-semibold">Bots ({bots.length})</h2>
                        </div>
                        <Link
                            href="/bots"
                            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            View Details <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bots.map(bot => (
                                <BotCard key={bot.bot_id} bot={bot} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bots.map(bot => (
                                <BotListItem key={bot.bot_id} bot={bot} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Servers Section */}
            {servers.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🏠</span>
                            <h2 className="text-xl font-semibold">Servers ({servers.length})</h2>
                        </div>
                        <Link
                            href="/servers"
                            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            View Details <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {servers.map(server => (
                                <ServerCard key={server.server_id} server={server} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {servers.map(server => (
                                <ServerListItem key={server.server_id} server={server} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Empty State */}
            {bots.length === 0 && servers.length === 0 && (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <Search className="w-16 h-16 mx-auto mb-6 text-muted-foreground/50" />
                        <h3 className="text-xl font-semibold mb-2">No results found</h3>
                        <p className="text-muted-foreground">
                            {query ? `No results for "${query}"` : 'Try searching for something'}
                        </p>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!hasPrevPage}
                        className={cn(
                            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                            hasPrevPage
                                ? 'bg-muted/50 hover:bg-muted text-foreground'
                                : 'bg-muted/20 text-muted-foreground cursor-not-allowed'
                        )}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = i + 1
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={cn(
                                        'w-10 h-10 rounded-lg transition-colors',
                                        currentPage === pageNum
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted/50 hover:bg-muted text-foreground'
                                    )}
                                >
                                    {pageNum}
                                </button>
                            )
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!hasNextPage}
                        className={cn(
                            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                            hasNextPage
                                ? 'bg-muted/50 hover:bg-muted text-foreground'
                                : 'bg-muted/20 text-muted-foreground cursor-not-allowed'
                        )}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    )
}
