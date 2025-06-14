"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@byteutils/functions/cn";

interface AnimatedTextCycleProps {
    words: string[];
    className?: string;
    interval?: number;
}

export function AnimatedTextCycle({
    words,
    className,
    interval = 3000
}: AnimatedTextCycleProps) {
    const [index, setIndex] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIsAnimating(true);
            // Add a small delay before changing the word to sync with animation
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setTimeout(() => setIsAnimating(false), 300);
            }, 300);
        }, interval);

        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <span className="relative inline-block">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{
                        y: 40,
                        opacity: 0,
                        rotateX: -90,
                        scale: 0.9
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        scale: 1,
                        filter: "blur(0px)"
                    }}
                    exit={{
                        y: -40,
                        opacity: 0,
                        rotateX: 90,
                        scale: 0.9,
                        filter: "blur(2px)"
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1], // Custom ease curve for smooth animation
                        opacity: { duration: 0.25 }
                    }}
                    className={cn(
                        "inline-block origin-[50%_50%_-10px] perspective-1000",
                        isAnimating && "animate-text-shine",
                        className
                    )}
                    style={{
                        backfaceVisibility: "hidden",
                        transformStyle: "preserve-3d"
                    }}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
