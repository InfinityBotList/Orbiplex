'use client'

import React, { useEffect } from 'react'
import { AnimatedTextCycle } from '@byteui/components/animations/text-cycle'
import { BotSearchBar } from '@byteui/layouts/main/search'
import { cn } from '@byteutils/functions/cn'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useApiQuery } from '@byteutils/tanstack/react-query-client'
import { ListStatistics } from '@byteutils/types/list'
import { Bot, Server, Sparkles, User } from 'lucide-react'

interface HeroSectionProps {
    className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 200], [1, 0])
    const scale = useTransform(scrollY, [0, 100], [1, 0.95])

    const springConfig = { stiffness: 100, damping: 30 }
    const springY = useSpring(y, springConfig)
    const springScale = useSpring(scale, springConfig)

    const [gradientPosition, setGradientPosition] = React.useState({ x: 0.5, y: 0.5 })

    const { data: stats } = useApiQuery<ListStatistics>(['stats-data'], '/list/stats', {
        fetchOptions: { external: true }
    })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth
            const y = e.clientY / window.innerHeight
            setGradientPosition({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
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

            {/* Content container */}
            <motion.div
                style={{
                    y: springY,
                    opacity,
                    scale: springScale
                }}
                className="relative z-10 flex flex-col items-center justify-center min-h-[92vh] container mx-auto px-4"
            >
                <div className="text-center max-w-4xl mx-auto">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span>Discover the </span>
                        <AnimatedTextCycle
                            words={['Best Bots.', 'Best Servers.']}
                            className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                            interval={4000}
                        />
                    </motion.h1>

                    <motion.p
                        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Begin your Discord journey with our extensive directory, featuring a wide array of bots,
                        servers, templates, stickers and more all tailored to enhancing your community experience.
                    </motion.p>

                    <motion.div
                        className="mt-8 flex flex-col items-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <BotSearchBar className="max-w-2xl" />

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
            </motion.div>

            {/* Wave separator */}
            <div className="absolute bottom-0 left-0 w-full z-10 overflow-hidden leading-[0] rotate-180">
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
