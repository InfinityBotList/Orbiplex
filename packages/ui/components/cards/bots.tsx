"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Verified, Heart, Star, Zap, Users, ArrowRight } from "lucide-react";
import { cn } from "@byteutils/functions/cn";

interface BotCardProps {
  id: string;
  name: string;
  description: string;
  avatar: string;
  banner?: string;
  verified?: boolean;
  votes?: number;
  stars?: number;
  featured?: boolean;
  serverCount?: number;
  tags?: string[];
  inviteUrl?: string;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export function BotCard({
  id,
  name,
  description,
  avatar,
  banner,
  verified = false,
  votes = 0,
  stars = 0,
  featured = false,
  serverCount,
  tags = [],
  inviteUrl,
  className,
  variant = "default",
}: BotCardProps) {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "relative group overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300",
        featured && "ring-2 ring-primary/50",
        className
      )}
    >
      {/* Glassy background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 opacity-80 pointer-events-none" />

      <Link href={`/bots/${id}`} className="block relative z-10">
        {/* Banner */}
        {(banner || isFeatured) && (
          <div className="relative h-32 w-full overflow-hidden">
            {banner ? (
              <Image
                src={banner}
                alt={`${name} banner`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

            {featured && (
              <div className="absolute top-3 right-3 px-2 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                Featured
              </div>
            )}
          </div>
        )}

        {/* Background gradient for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card content */}
        <div className={cn(
          "p-5",
          (banner || isFeatured) && "pt-0"
        )}>
          <div className="flex items-start gap-4">
            {/* Bot avatar */}
            <div className={cn(
              "relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0 border-4 border-card",
              (banner || isFeatured) && "mt-[-2rem]"
            )}>
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
              />
            </div>

            {/* Bot info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold truncate">{name}</h3>
                {verified && (
                  <Verified className="h-4 w-4 text-primary flex-shrink-0" />
                )}
              </div>
              <p className={cn(
                "text-sm text-muted-foreground",
                isCompact ? "line-clamp-1" : "line-clamp-2"
              )}>
                {description}
              </p>
            </div>
          </div>

          {/* Stats for featured view */}
          {isFeatured && serverCount && (
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{serverCount.toLocaleString()} servers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                <span>{votes.toLocaleString()} votes</span>
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && !isCompact && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.slice(0, isFeatured ? 5 : 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
              {tags.length > (isFeatured ? 5 : 3) && (
                <span className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary-foreground">
                  +{tags.length - (isFeatured ? 5 : 3)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className={cn(
          "px-5 py-3 border-t border-border/50 bg-muted/30 backdrop-blur-sm",
          isFeatured ? "flex items-center justify-between" : "grid grid-cols-2 gap-2"
        )}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Heart className="h-4 w-4 text-red-500" />
              <span>{votes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-amber-500" />
              <span>{stars.toFixed(1)}</span>
            </div>
          </div>

          {isFeatured ? (
            <div className="flex items-center gap-3">
              <motion.div
                className="text-sm text-primary font-medium flex items-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                View Details <ArrowRight className="ml-1 w-4 h-4" />
              </motion.div>
            </div>
          ) : (
            <div className="flex justify-end">
              <motion.div
                className="text-sm text-primary font-medium"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                View Details →
              </motion.div>
            </div>
          )}
        </div>
      </Link>

      {/* Action buttons for featured cards */}
      {isFeatured && inviteUrl && (
        <div className="px-5 py-4 border-t border-border/50">
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-center font-medium transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Add to Discord
          </a>
        </div>
      )}
    </motion.div>
  );
}
