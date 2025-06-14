"use client";

import React from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { cn } from "@byteutils/functions/cn";

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  variant?: "default" | "glass" | "highlight";
  hoverEffect?: boolean;
}

export function AnimatedCard({
  children,
  index = 0,
  className = "",
  variant = "default",
  hoverEffect = true
}: AnimatedCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smoother animation
      }
    })
  };

  // Dynamic hover animation based on variant and hoverEffect
  const hoverAnimation = hoverEffect ? {
    whileHover: {
      y: -5,
      scale: variant === "highlight" ? 1.03 : 1.02,
      transition: { type: "spring", stiffness: 300 }
    }
  } : {};

  // Get card style based on variant
  const cardStyle = {
    default: "bg-card border border-border/50 shadow-sm hover:shadow-md",
    glass: "glass-card hover:shadow-lg hover:border-primary/20",
    highlight: "bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 shadow-md hover:shadow-lg hover:border-primary/30"
  }[variant];

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...hoverAnimation}
      className={cn(
        "relative rounded-xl transition-all duration-300 overflow-hidden",
        cardStyle,
        className
      )}
    >
      {variant === "glass" && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-60 pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
