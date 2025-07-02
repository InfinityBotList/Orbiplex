'use client'

import { VerticalBotCard } from '@byteui/components/bots/vertical-card'
import { CollectionCarousel } from '@byteui/components/carousels/collection'
import { trendingBotsCarousel } from '@byteutils/constants/trendingBotsCarousel'
import { useApiQuery } from '@byteutils/tanstack/react-query-client'
import { SectionDivider } from '@byteui/components/sections/dividier'

import { cn } from '@byteutils/functions/cn'
import { BotsIndex } from '@/packages/utils/types'

interface TrendingBotsSectionProps {
    className?: string
}

export function TrendingBotsSection({ className }: TrendingBotsSectionProps) {
    const {
        data: index,
        isLoading,
        error
    } = useApiQuery<BotsIndex>(['bots-index'], '/bots/@index', {
        fetchOptions: {
            external: true
        }
    })

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
                        {isLoading || error
                            ? // Loading/error state - return empty array to trigger loading state in carousel
                              []
                            : index?.top_voted?.map(bot => (
                                  <VerticalBotCard
                                      key={bot.bot_id}
                                      id={bot.bot_id}
                                      name={bot.user.username}
                                      description={bot.description}
                                      avatar={bot.user.avatar}
                                      banner={bot.banner.default_path}
                                      verified={bot.verified}
                                      votes={bot.votes}
                                      stars={bot.stars}
                                      featured={false}
                                      serverCount={bot.servers}
                                      tags={bot.tags}
                                      inviteUrl={bot.inviteUrl}
                                  />
                              )) ||
                              // Fallback to mock data if API fails
                              trendingBotsCarousel.map(bot => (
                                  <VerticalBotCard
                                      key={`fallback-${bot.id}`}
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
