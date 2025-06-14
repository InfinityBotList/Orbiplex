"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@byteui/components/cards/animated";
import { cn } from "@byteutils/functions/cn";

interface FeatureSectionProps {
    className?: string;
}

export function FeaturesSection({ className }: FeatureSectionProps) {


    return (
        <section className={cn(
            "py-24 px-4 bg-muted/30 dark:bg-secondary/20",
            className
        )}>
            <div className="container max-w-screen-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Infinity List?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">The most comprehensive directory for Discord bots and servers with powerful features.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatedCard index={0} variant="glass" className="p-7">
                        <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Easy Discovery</h3>
                        <p className="text-muted-foreground">Find the perfect bots and servers with our advanced search and filtering options.</p>
                    </AnimatedCard>

                    <AnimatedCard index={1} variant="glass" className="p-7">
                        <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Verified Quality</h3>
                        <p className="text-muted-foreground">All listed bots and servers go through a verification process to ensure quality and safety.</p>
                    </AnimatedCard>

                    <AnimatedCard index={2} variant="glass" className="p-7">
                        <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Modern Experience</h3>
                        <p className="text-muted-foreground">Enjoy a beautiful, responsive interface with dark mode support and customizable themes.</p>
                    </AnimatedCard>
                </div>
            </div>
        </section>
    );
}
