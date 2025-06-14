'use client'

import { featuredServers } from '@byteutils/mocks/servers/featured'
import { SectionDivider } from '@byteui/components/sections/dividier'
import { ServerCard } from '@byteui/components/cards/servers'
import { cn } from '@byteutils/functions/cn'

interface FeaturedServerSectionProps {
    className?: string
}

export function FeaturedServersSection({ className }: FeaturedServerSectionProps) {
    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto">
                <SectionDivider
                    title="Featured Servers"
                    subtitle="Discover unique communities hand-selected by our team"
                    link="/servers"
                    linkText="View All Servers"
                    alignment="left"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {featuredServers.map(server => (
                        <ServerCard
                            key={server.id}
                            id={server.id}
                            name={server.name}
                            description={server.description}
                            icon={server.icon}
                            banner={server.banner}
                            verified={server.verified}
                            members={server.members}
                            online={server.online}
                            stars={server.stars}
                            tags={server.tags}
                            inviteUrl={server.inviteUrl}
                            guildFeatures={server.guildFeatures}
                            variant="featured"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
