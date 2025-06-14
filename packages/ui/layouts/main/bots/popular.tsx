'use client'

import { popularBots } from '@byteutils/mocks/bots/popular'
import { SectionDivider } from '@byteui/components/sections/dividier'
import { BotCard } from '@byteui/components/cards/bots'
import { cn } from '@byteutils/functions/cn'

interface PopularBotsSectionProps {
    className?: string
}

export function PopularBotsSection({ className }: PopularBotsSectionProps) {
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
                    {popularBots.map(bot => (
                        <BotCard
                            key={bot.id}
                            id={bot.id}
                            name={bot.name}
                            description={bot.description}
                            avatar={bot.avatar}
                            verified={bot.verified}
                            votes={bot.votes}
                            stars={bot.stars}
                            serverCount={bot.serverCount}
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
