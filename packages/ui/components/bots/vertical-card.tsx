"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Verified, Heart, Star, Zap, Users, ArrowRight } from "lucide-react";
import { cn } from "@byteutils/functions/cn";

interface VerticalBotCardProps {
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
}

export function VerticalBotCard({
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
}: VerticalBotCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "relative group overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-all duration-300",
        featured && "ring-2 ring-primary/50",
        className
      )}
    >
      <Link href={`/bots/${id}`} className="block">
        {/* Banner */}
        <div className="relative h-40 w-full overflow-hidden">
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

          {/* Bot avatar overlaying the banner */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative h-20 w-20 rounded-full overflow-hidden bg-muted flex-shrink-0 border-4 border-card">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5 pt-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="text-xl font-semibold">{name}</h3>
            {verified && (
              <Verified className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-red-500" />
              <span>{votes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500" />
              <span>{stars.toFixed(1)}</span>
            </div>
            {serverCount && (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{serverCount.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary-foreground">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Action buttons */}
      <div className="px-5 py-4 border-t border-border/50 flex gap-2">
        <Link
          href={`/bots/${id}`}
          className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-center font-medium text-sm transition-colors"
        >
          View Details
        </Link>
        {inviteUrl && (
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-center font-medium text-sm transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Add Bot
          </a>
        )}
      </div>
    </motion.div>
  );
}
