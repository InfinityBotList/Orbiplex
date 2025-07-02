'use client'

import { motion } from 'framer-motion'
import { BotStatsDashboard } from '@byteui/components/bots/stats-dash'
import { useApiQuery } from '@byteutils/tanstack/react-query-client'
import { cn } from '@byteutils/functions/cn'

interface StatsSectionProps {
    className?: string
}

export function StatsSection({ className }: StatsSectionProps) {
    const { data: stats } = useApiQuery<ListStatistics>(['stats-data'], '/list/stats', {
        fetchOptions: { external: true }
    })

    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Infinity List <span className="text-gradient">by the Numbers</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
                        Join the ever-growing community of Discord bot and server enthusiasts
                    </p>
                </motion.div>

                <BotStatsDashboard
                    bots={stats?.total_bots}
                    approved_bots={stats?.total_approved_bots}
                    bot_packs={stats?.total_packs}
                    users={stats?.total_users}
                    votes={stats?.total_votes}
                    uptime={99.8}
                />
            </div>
        </section>
    )
}
