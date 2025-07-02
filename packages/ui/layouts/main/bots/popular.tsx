'use client'

import { SectionDivider } from '@byteui/components/sections/dividier'
import { useApiQuery } from '@byteutils/tanstack/react-query-client'
import { BotCard } from '@byteui/components/cards/bots'
import { cn } from '@byteutils/functions/cn'
import { BotsIndex } from '@/packages/utils/types'

interface PopularBotsSectionProps {
    className?: string
}

export function PopularBotsSection({ className }: PopularBotsSectionProps) {
    const { data: index, isLoading } = useApiQuery<BotsIndex>(['bots-index'], '/bots/@index', {
        fetchOptions: {
            external: true
        }
    })

    // Randomize and limit to 8 bots from top_voted
    const randomizedBots = index?.top_voted ? [...index.top_voted].sort(() => Math.random() - 0.5).slice(0, 8) : []

    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto">
                <SectionDivider
                    title="Popular Bots"
                    subtitle="The most-used Discord bots by our community"
                    link="/bots/popular"
                    linkText="See More"
                    alignment="left"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {isLoading
                        ? // Loading skeleton with proper keys
                          Array.from({ length: 8 }).map((_, i) => (
                              <div key={`skeleton-${i}`} className="h-64 bg-muted rounded-lg animate-pulse" />
                          ))
                        : randomizedBots.map(bot => (
                              <BotCard
                                  key={bot.user.id}
                                  id={bot.bot_id}
                                  name={bot.user.username}
                                  description={bot.short}
                                  avatar={bot.user.avatar}
                                  verified={bot.verified}
                                  votes={bot.votes}
                                  stars={bot.stars}
                                  serverCount={bot.servers}
                                  tags={bot.tags}
                                  inviteUrl={bot.inviteUrl}
                                  variant="default"
                              />
                          ))}
                </div>
            </div>
        </section>
    )
}
