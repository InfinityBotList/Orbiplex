'use client'

import { ServersIndex } from '@byteutils/types'
import { SectionDivider } from '@byteui/components/sections/dividier'
import { useApiQuery } from '@byteutils/tanstack/react-query-client'
import { ServerCard } from '@byteui/components/cards/servers'
import { cn } from '@byteutils/functions/cn'
interface FeaturedServerSectionProps {
    className?: string
}

export function FeaturedServersSection({ className }: FeaturedServerSectionProps) {
    const {
        data: index,
        isLoading,
        error
    } = useApiQuery<ServersIndex>(['servers-index'], '/servers/@index', {
        fetchOptions: {
            external: true
        }
    })

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
                    {index?.top_voted.map(server => (
                        <ServerCard
                            key={server.server_id}
                            id={server.server_id}
                            name={server.name}
                            description={server.short}
                            icon={server.avatar}
                            banner={server.banner}
                            verified={server.type}
                            members={server.total_members}
                            online={server.online_members}
                            stars={server.stars}
                            tags={server.tags}
                            inviteUrl={server.inviteUrl}
                            guildFeatures={server.guildFeatures}
                            featured={true}
                            variant="featured"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
