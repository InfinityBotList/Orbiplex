'use client'

import { motion } from 'framer-motion'
import { BotStatsDashboard } from '@byteui/components/bots/stats-dash'
import { cn } from '@byteutils/functions/cn'

interface StatsSectionProps {
    className?: string
}

export function StatsSection({ className }: StatsSectionProps) {
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
                    votes={384756}
                    stars={4.7}
                    servers={12467}
                    users={2500000}
                    reviews={8934}
                    uptime={99.8}
                />
            </div>
        </section>
    )
}
