'use client'

import React from 'react'
import { featuredBots } from '@byteutils/mocks/bots/featured'
import { SectionDivider } from '@byteui/components/sections/dividier'
import { BotCard } from '@byteui/components/cards/bots'
import { cn } from '@byteutils/functions/cn'

interface FeaturedBotsSectionProps {
    className?: string
}

export function FeaturedBotsSection({ className }: FeaturedBotsSectionProps) {
    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto">
                <SectionDivider
                    title="Featured Bots"
                    subtitle="Discover the best Discord bots handpicked by our team"
                    link="/bots"
                    linkText="View All Bots"
                    alignment="left"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {featuredBots.map(bot => (
                        <BotCard
                            key={bot.id}
                            id={bot.id}
                            name={bot.name}
                            description={bot.description}
                            avatar={bot.avatar}
                            banner={bot.banner}
                            verified={bot.verified}
                            votes={bot.votes}
                            stars={bot.stars}
                            featured={bot.featured}
                            serverCount={bot.serverCount}
                            tags={bot.tags}
                            inviteUrl={bot.inviteUrl}
                            variant="featured"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
