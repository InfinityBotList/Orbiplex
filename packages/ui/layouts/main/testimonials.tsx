'use client'

import { motion } from 'framer-motion'
import { TestimonialsGrid } from '@byteui/components/testimonials'
import { cn } from '@byteutils/functions/cn'

interface TestimonailSectionProps {
    className?: string
}

export function TestimonialsSection({ className }: TestimonailSectionProps) {
    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover why thousands of Discord communities and bot developers choose Infinity List
                    </p>
                </motion.div>

                <TestimonialsGrid
                    className="mt-12"
                    testimonials={[
                        {
                            quote: 'Infinity List helped me find the perfect music bot for my server. The detailed reviews and features list made it easy to choose.',
                            author: 'Indie ',
                            role: 'Server Owner',
                            avatar: '/logo.png'
                        },
                        {
                            quote: "As a bot developer, I've seen a significant increase in users since listing on Infinity List. The platform is a game-changer!",
                            author: 'Indie',
                            role: 'Bot Developer',
                            avatar: '/logo.png'
                        },
                        {
                            quote: "The categories and filtering options make it so easy to find exactly what you're looking for. Best Discord resource out there!",
                            author: 'Indie',
                            role: 'Discord Moderator',
                            avatar: '/logo.png'
                        }
                    ]}
                />
            </div>
        </section>
    )
}
