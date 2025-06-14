"use client";

import React, { useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Search, Bot, Server, Sparkles, ArrowRight } from "lucide-react";
import { AnimatedTextCycle } from "@byteui/components/animations/text-cycle";
import { BotSearchBar } from "@byteui/layouts/main/search";
import { cn } from "@byteutils/functions/cn";

interface HeroSectionProps {
    className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);
    const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

    const springConfig = { stiffness: 100, damping: 30 };
    const springY = useSpring(y, springConfig);
    const springScale = useSpring(scale, springConfig);

    // Animated gradient background
    const [gradientPosition, setGradientPosition] = React.useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalized mouse position
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            setGradientPosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className={cn(
            "relative min-h-[92vh] w-full overflow-hidden",
            className
        )}>
            {/* Dynamic gradient background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Responsive gradient that moves with cursor */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20"
                    style={{
                        backgroundPosition: `${gradientPosition.x * 100}% ${gradientPosition.y * 100}%`,
                        backgroundSize: '200% 200%',
                    }}
                    animate={{
                        backgroundPosition: [
                            `${gradientPosition.x * 100}% ${gradientPosition.y * 100}%`,
                            `${(gradientPosition.x + 0.05) * 100}% ${(gradientPosition.y + 0.05) * 100}%`,
                        ],
                    }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                />

                {/* Mesh grid pattern */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--muted-foreground) 2px, transparent 0)',
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
                        y: ['25%', '20%', '25%'],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 mix-blend-multiply filter blur-3xl opacity-50"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Subtle noise texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

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
                        <span>
                            Discover the{" "}
                        </span>
                        <AnimatedTextCycle
                            words={["best Bots.", "best Servers.", "best Templates.", "best Stickers.", "and more."]}
                            className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                            interval={4000}
                        />
                    </motion.h1>

                    <motion.p
                        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Begin your Discord journey with our extensive directory, featuring a wide array of bots, servers, templates, stickers and more all tailored to enhancing your community experience.
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
                                <span>2,000+ Bots</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Server className="w-5 h-5" />
                                <span>5,000+ Servers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                <span>Active Community</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Wave separator */}
            <div className="absolute bottom-0 left-0 w-full z-10 overflow-hidden leading-[0] rotate-180">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] relative block">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-background" />
                </svg>
            </div>
        </section>
    );
}
