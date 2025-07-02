'use client'

import React from 'react'
import { featuredBots } from '@byteutils/mocks/bots/featured'
import { SectionDivider } from '@byteui/components/sections/dividier'
import { BotCard } from '@byteui/components/cards/bots'
import { useApiQuery } from '@byteutils/tanstack/react-query-client'
import { cn } from '@byteutils/functions/cn'
import { RefreshCw } from 'lucide-react'

interface FeaturedBotsSectionProps {
    className?: string
}

export function FeaturedBotsSection({ className }: FeaturedBotsSectionProps) {
    const {
        data: random,
        isLoading,
        refetch,
        isFetching
    } = useApiQuery<any>(['bots-random'], '/bots/@random', {
        fetchOptions: {
            external: true
        }
    })

    // Filter out NSFW bots and take first 6 SFW bots
    const filteredBots = random?.bots?.filter(bot => !bot.nsfw).slice(0, 6) || []

    const handleRefresh = async () => {
        await refetch()
    }

    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <SectionDivider
                        title="Featured Bots"
                        subtitle="A randomly generated list of Discord Bots."
                        alignment="left"
                        className="mb-6"
                    />

                    <button
                        onClick={handleRefresh}
                        disabled={isFetching}
                        className={cn(
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/50 bg-card/80 hover:bg-card text-xs font-medium transition-all duration-200',
                            'hover:border-primary/50 hover:shadow-sm',
                            'md:px-4 md:py-2 md:text-sm md:gap-2',
                            isFetching && 'opacity-50 cursor-not-allowed'
                        )}
                    >
                        <RefreshCw className={cn('w-3 h-3 md:w-4 md:h-4', isFetching && 'animate-spin')} />
                        <span className="hidden sm:inline">{isFetching ? 'Refreshing...' : 'More...'}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {isLoading
                        ? // Loading skeleton
                          Array.from({ length: 6 }).map((_, i) => (
                              <div key={`skeleton-${i}`} className="h-80 bg-muted rounded-xl animate-pulse mt-12" />
                          ))
                        : filteredBots.length > 0
                          ? filteredBots.map(bot => (
                                <BotCard
                                    key={bot.bot_id}
                                    id={bot.bot_id}
                                    name={bot.user.username}
                                    featured={true}
                                    variant="featured"
                                />
                            ))
                          : // Fallback to mock data if no SFW bots available
                            featuredBots
                                .slice(0, 6)
                                .map(bot => (
                                    <BotCard
                                        key={`fallback-${bot.id}`}
                                        id={bot.id}
                                        name={bot.name}
                                        featured={true}
                                        variant="featured"
                                    />
                                ))}
                </div>
            </div>
        </section>
    )
}
