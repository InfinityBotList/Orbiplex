"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@byteutils/functions";
import { ArrowRight } from "lucide-react";

interface SectionDividerProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  alignment?: "left" | "center" | "right";
  link?: string;
  linkText?: string;
}

export function SectionDivider({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  alignment = "center",
  link,
  linkText,
}: SectionDividerProps) {
  const containerAlignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      className={cn("relative mb-8", containerAlignmentClass[alignment], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
        <div>
          <h2 className={cn("text-3xl md:text-4xl font-bold", titleClassName)}>
            {title}
          </h2>

          {subtitle && (
            <p className={cn("text-muted-foreground mt-2 max-w-2xl", subtitleClassName)}>
              {subtitle}
            </p>
          )}
        </div>

        {link && linkText && (
          <Link
            href={link}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            {linkText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3 justify-center sm:justify-start">
        <motion.div
          className="h-1.5 bg-primary w-6 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: '1.5rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        <motion.div
          className="h-1.5 bg-gradient-to-r from-primary to-accent w-24 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: '6rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
