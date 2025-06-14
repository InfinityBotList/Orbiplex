'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@byteutils/functions/cn'
import { Bot, Server, ArrowRight } from 'lucide-react'

interface CTASectionProps {
    className?: string
}

export function CTASection({ className }: CTASectionProps) {
    return (
        <section className={cn('py-20', className)}>
            <div className="mx-auto px-4 w-full">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/50 to-accent/50 shadow-lg shadow-primary dark:shadow-primary">
                    {/* Overlay gradient for better text contrast */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-primary to-accent"
                        style={{ opacity: 0.2 }}
                    />

                    {/* Animated line pattern */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `
                                linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px),
                                linear-gradient(0deg, rgba(255,255,255,.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px',
                            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                        }}
                    />

                    {/* Enhanced blob effects */}
                    <motion.div
                        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-white/20 mix-blend-overlay filter blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.3, 0.2]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] rounded-full bg-white/20 mix-blend-overlay filter blur-3xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.3, 0.2]
                        }}
                        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    />

                    {/* Content */}
                    <div className="relative py-24 px-6 md:px-16 text-center z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-sm"
                        >
                            Ready to showcase your creation?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
                        >
                            Join thousands of Discord bot and server owners who trust Infinity List to grow their
                            community.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4"
                        >
                            <Link
                                href="/add-bot"
                                className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-black/25 backdrop-blur-sm border border-white/20 font-medium hover:bg-black/40 hover:border-white/30 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <Bot className="w-5 h-5" />
                                <span>Add Your Bot</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/add-server"
                                className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-black/25 backdrop-blur-sm border border-white/20 font-medium hover:bg-black/40 hover:border-white/30 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <Server className="w-5 h-5" />
                                <span>Add Your Server</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
