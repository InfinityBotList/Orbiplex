'use client'

import { VerticalBotCard } from '@byteui/components/bots/vertical-card'
import { CollectionCarousel } from '@byteui/components/carousels/collection'
import { trendingBotsCarousel } from '@byteutils/constants/trendingBotsCarousel'
import { SectionDivider } from '@byteui/components/sections/dividier'

import { cn } from '@byteutils/functions/cn'

interface TrendingBotsSectionProps {
    className?: string
}

export function TrendingBotsSection({ className }: TrendingBotsSectionProps) {
    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto">
                <SectionDivider
                    title="Trending This Week"
                    subtitle="The Discord bots gaining popularity right now"
                    link="/trending"
                    linkText="View All Trending"
                    alignment="left"
                />

                <div className="mt-12">
                    <CollectionCarousel itemsPerView={3} autoplay={true} showArrows={true} showDots={true}>
                        {trendingBotsCarousel.map(bot => (
                            <VerticalBotCard
                                key={bot.id}
                                id={bot.id}
                                name={bot.name}
                                description={bot.description}
                                avatar={bot.avatar}
                                banner={bot.banner}
                                verified={bot.verified}
                                votes={bot.votes}
                                stars={bot.stars}
                                featured={false}
                                serverCount={bot.serverCount}
                                tags={bot.tags}
                                inviteUrl={bot.inviteUrl}
                            />
                        ))}
                    </CollectionCarousel>
                </div>
            </div>
        </section>
    )
}
