'use client'

import React, { useEffect } from 'react'
import { cn } from '@byteutils/functions/cn'
import { FeaturesSection } from '@byteui/layouts/main/features'
import { TechStacks } from '@byteui/layouts/about/tech-stacks'
import { TimelineComponent } from '@byteui/layouts/about/timeline'
import { motion, useScroll } from 'framer-motion'
import { useApiQuery } from '@byteutils/tanstack/react-query-client'
import { ListStatistics } from '@byteutils/types/list'
import { Bot, Server, Sparkles, User } from 'lucide-react'
import { FaCalendarAlt, FaRocket, FaUsers } from 'react-icons/fa'
import { TeamMember, TeamResponse } from '@byteutils/types/team'
import { TeamSection } from '@byteui/layouts/about/team'

interface HeroSectionProps {
    className?: string
}

export function AboutPage({ className }: HeroSectionProps) {
    const { scrollY } = useScroll()

    const [gradientPosition, setGradientPosition] = React.useState({ x: 0.5, y: 0.5 })

    const { data: stats } = useApiQuery<ListStatistics>(['stats-data'], '/list/stats', {
        fetchOptions: { external: true },
        queryKey: ['stats-data']
    })

    const {
        data: teamData,
        isLoading: teamLoading,
        error: teamError
    } = useApiQuery<TeamResponse>(['team'], '/list/team', {
        fetchOptions: { external: true },
        queryKey: ['team-data']
    })

    useEffect(() => {
        let animationFrameId: number | null = null

        const handleMouseMove = (e: MouseEvent) => {
            if (animationFrameId !== null) return // already queued

            animationFrameId = requestAnimationFrame(() => {
                const x = e.clientX / window.innerWidth
                const y = e.clientY / window.innerHeight
                setGradientPosition({ x, y })
                animationFrameId = null
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [])

    return (
        <section className={cn(className)}>
            {/* Dynamic gradient background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Cursor-following radial gradient */}
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                        background: `radial-gradient(800px circle at ${gradientPosition.x * 100}% ${gradientPosition.y * 100}%, var(--primary) 0%, transparent 100%)`,
                        opacity: 0.08
                    }}
                />

                {/* Mesh grid pattern */}
                <div
                    className="absolute inset-0"
                    style={{
                        opacity: 0.2,
                        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--accent) 2px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Animated blob shapes */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-primary/10 mix-blend-multiply filter blur-3xl opacity-70" />
                <motion.div
                    className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 mix-blend-multiply filter blur-3xl opacity-70"
                    animate={{
                        scale: [1, 1.1, 1],
                        x: ['-25%', '-20%', '-25%'],
                        y: ['25%', '20%', '25%']
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="fixed z-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
                    style={{
                        left: `calc(${gradientPosition.x * 100}% - 12rem)`,
                        top: `calc(${gradientPosition.y * 100}% - 12rem)`
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 0.8, 0.7]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />

                {/* Subtle noise texture */}
                <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
            </div>

            {/* Content container - remove scroll transforms */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[92vh] container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span>Welcome to Infinity List</span>
                    </motion.h1>

                    <motion.p
                        className="mt-2 text-lg md:text-xl text-muted-foreground max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Begin your Discord journey with our extensive directory, featuring a wide array of bots,
                        servers, templates, stickers and more all tailored to enhancing your community experience.
                    </motion.p>

                    <motion.div
                        className="mt-12 flex flex-col items-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-8 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Bot className="w-5 h-5" />
                                <span>{stats?.total_bots?.toLocaleString() || '2,000+'} Bots</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span>{stats?.total_users?.toLocaleString() || '5,000+'} Users</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                <span>{stats?.total_votes?.toLocaleString() || 'Many'} Votes</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* History Section */}
            <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Our History
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Created and Founded on{' '}
                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                    September 24, 2020
                                </span>{' '}
                                with the hope of providing Discord Users with an{' '}
                                <span className="font-semibold">&quot;above average&quot;</span> Bot Listing and
                                Advertising service unlike those that currently exist and have for years.
                            </p>
                            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                                    <span>4+ Years Strong</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUsers className="w-4 h-4 text-green-600" />
                                    <span>Growing Community</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaRocket className="w-4 h-4 text-purple-600" />
                                    <span>Constant Innovation</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <FeaturesSection className="py-24 px-4 bg-muted/30 dark:bg-secondary/20" />

            {/* Tech Stack Section */}
            <TechStacks />

            {/* Timeline Section */}
            <TimelineComponent />

            {/* Team section */}
            <TeamSection teamData={teamData?.members ?? []} isLoading={teamLoading} error={!!teamError} />

            {/* Wave separator */}
            <div className="relative bottom-0 left-0 w-full z-0 overflow-hidden leading-[0] rotate-180">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-[60px] relative block"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-background bg-primary/50"
                        style={{
                            fill: 'var(--primary)',
                            opacity: 0.6
                        }}
                    />
                </svg>
            </div>
        </section>
    )
}
