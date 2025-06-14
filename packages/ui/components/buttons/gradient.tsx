"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@byteutils/functions/cn";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        gradient: "text-white shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  href?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const GradientButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, gradientFrom, gradientTo, children, ...props }, ref) => {
    const gradientStyle = variant === "gradient" ? {
      background: `linear-gradient(to right, ${gradientFrom || "var(--primary)"}, ${gradientTo || "var(--accent)"})`,
      boxShadow: '0 4px 24px 0 rgba(6,182,212,0.15)',
      backdropFilter: 'blur(8px)',
      border: '1.5px solid var(--border)',
      transition: 'box-shadow 0.2s, transform 0.2s',
    } : {};

    const content = (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }),
          variant === "gradient" && "hover:scale-105 active:scale-98 focus:ring-2 focus:ring-primary/40")}
        ref={ref}
        style={gradientStyle}
        whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(6,182,212,0.25)' }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );

    if (href) {
      return <Link href={href}>{content}</Link>;
    }

    return content;
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton, buttonVariants };
