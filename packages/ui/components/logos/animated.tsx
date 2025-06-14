"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@byteutils/functions";
import Image from "next/image";

interface AnimatedLogoProps {
  className?: string;
  textClassName?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  href?: string;
  linkClassName?: string;
}

export function AnimatedLogo({
  className,
  textClassName,
  size = "md",
  withText = true,
  href = "/",
  linkClassName,
}: AnimatedLogoProps) {
  const sizeClasses = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 40, height: 40 },
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const logoContent = (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <Image
          src="/logo.png"
          alt="Infinity List Logo"
          width={sizeClasses[size].width}
          height={sizeClasses[size].height}
          className="object-contain"
          priority
        />
      </motion.div>

      {withText && (
        <motion.span
          className={cn("font-bold", textSizeClasses[size], textClassName)}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Infinity List
        </motion.span>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className={linkClassName}>
      {logoContent}
    </Link>
  ) : (
    logoContent
  );
}
