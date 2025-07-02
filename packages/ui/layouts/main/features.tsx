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
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Infinity List?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                        The most comprehensive directory for Discord bots and servers with powerful features designed
                        for the community.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    <AnimatedCard index={0} variant="glass" className="p-8 h-full">
                        <div className="flex flex-col h-full">
                            <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-6 flex-shrink-0">
                                <Search className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-3 text-foreground">Easy Discovery</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Find the perfect Discord bots and servers with our advanced search, smart filtering,
                                    and intuitive category system.
                                </p>
                            </div>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard index={1} variant="glass" className="p-8 h-full">
                        <div className="flex flex-col h-full">
                            <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-6 flex-shrink-0">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-3 text-foreground">Verified Quality</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Every listed bot and server undergoes our comprehensive verification process to
                                    ensure quality, safety, and reliability.
                                </p>
                            </div>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard index={2} variant="glass" className="p-8 h-full">
                        <div className="flex flex-col h-full">
                            <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-6 flex-shrink-0">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-3 text-foreground">Modern Experience</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Beautiful, responsive interface with dark mode support, customizable themes, and
                                    seamless user experience.
                                </p>
                            </div>
                        </div>
                    </AnimatedCard>
                </div>
            </div>
        </section>
    )
}
