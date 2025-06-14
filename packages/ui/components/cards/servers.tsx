'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Verified, Users, Star, ArrowRight, Shield, MessageSquare, Activity } from 'lucide-react'
import { cn } from '@byteutils/functions/cn'

interface ServerCardProps {
    id: string
    name: string
    description: string
    icon: string
    banner?: string
    verified?: boolean
    members?: number
    online?: number
    stars?: number
    tags?: string[]
    inviteUrl?: string
    className?: string
    variant?: 'default' | 'compact' | 'featured'
    guildFeatures?: string[]
}

export function ServerCard({
    id,
    name,
    description,
    icon,
    banner,
    verified = false,
    members = 0,
    online,
    stars = 0,
    tags = [],
    inviteUrl,
    className,
    variant = 'default',
    guildFeatures = []
}: ServerCardProps) {
    const isCompact = variant === 'compact'
    const isFeatured = variant === 'featured'

    // Highlight key Discord server features
    const hasBoost = guildFeatures.includes('COMMUNITY')
    const hasVanityUrl = guildFeatures.includes('VANITY_URL')
    const hasActivities = guildFeatures.includes('ACTIVITIES')

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={cn(
                'relative group overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300',
                className
            )}
        >
            {/* Glassy background gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 opacity-80 pointer-events-none" />

            <Link href={`/servers/${id}`} className="block relative z-10">
                {/* Banner */}
                <div className={cn('relative overflow-hidden', isCompact ? 'h-24' : 'h-32')}>
                    {banner ? (
                        <Image src={banner} alt={`${name} banner`} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Card content */}
                <div className="p-5">
                    <div className="flex items-start gap-4">
                        {/* Server icon */}
                        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0 border-4 border-card mt-[-2rem]">
                            <Image src={icon} alt={name} fill className="object-cover" />
                        </div>

                        {/* Server info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold truncate">{name}</h3>
                                {verified && <Verified className="h-4 w-4 text-primary flex-shrink-0" />}
                            </div>
                            <p
                                className={cn(
                                    'text-sm text-muted-foreground',
                                    isCompact ? 'line-clamp-1' : 'line-clamp-2'
                                )}
                            >
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Member stats */}
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{members.toLocaleString()} members</span>
                        </div>
                        {online !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span>{online.toLocaleString()} online</span>
                            </div>
                        )}
                    </div>

                    {/* Server features */}
                    {isFeatured && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {hasBoost && (
                                <span className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-primary/20 text-primary-foreground">
                                    <Shield className="h-3 w-3" />
                                    Community
                                </span>
                            )}
                            {hasVanityUrl && (
                                <span className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-primary/20 text-primary-foreground">
                                    <MessageSquare className="h-3 w-3" />
                                    Custom URL
                                </span>
                            )}
                            {hasActivities && (
                                <span className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-primary/20 text-primary-foreground">
                                    <Activity className="h-3 w-3" />
                                    Activities
                                </span>
                            )}
                        </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && !isCompact && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {tags.slice(0, isFeatured ? 5 : 3).map(tag => (
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
                <div
                    className={cn(
                        'px-5 py-3 border-t border-border/50 bg-muted/30 backdrop-blur-sm flex items-center justify-between'
                    )}
                >
                    {stars > 0 && (
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span>{stars.toFixed(1)}</span>
                        </div>
                    )}

                    <div className="ml-auto">
                        <motion.div
                            className="text-sm text-primary font-medium flex items-center"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isFeatured ? (
                                <>
                                    View Server <ArrowRight className="ml-1 w-4 h-4" />
                                </>
                            ) : (
                                <>View Details →</>
                            )}
                        </motion.div>
                    </div>
                </div>
            </Link>

            {/* Join button for featured cards */}
            {isFeatured && inviteUrl && (
                <div className="px-5 py-4 border-t border-border/50">
                    <a
                        href={inviteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-center font-medium transition-colors"
                        onClick={e => e.stopPropagation()}
                    >
                        Join Server
                    </a>
                </div>
            )}
        </motion.div>
    )
}
