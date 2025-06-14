'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Shield, Sparkles } from 'lucide-react'
import { AnimatedCard } from '@byteui/components/cards/animated'
import { cn } from '@byteutils/functions/cn'

interface FeatureSectionProps {
    className?: string
}

export function FeaturesSection({ className }: FeatureSectionProps) {
    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Infinity List?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        The most comprehensive directory for Discord bots and servers with powerful features.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatedCard index={0} variant="glass" className="p-7">
                        <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-5">
                            <Search className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Easy Discovery</h3>
                        <p className="text-muted-foreground">
                            Find the perfect bots and servers with our advanced search and filtering options.
                        </p>
                    </AnimatedCard>

                    <AnimatedCard index={1} variant="glass" className="p-7">
                        <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-5">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Verified Quality</h3>
                        <p className="text-muted-foreground">
                            All listed bots and servers go through a verification process to ensure quality and safety.
                        </p>
                    </AnimatedCard>

                    <AnimatedCard index={2} variant="glass" className="p-7">
                        <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-5">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Modern Experience</h3>
                        <p className="text-muted-foreground">
                            Enjoy a beautiful, responsive interface with dark mode support and customizable themes.
                        </p>
                    </AnimatedCard>
                </div>
            </div>
        </section>
    )
}
