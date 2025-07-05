'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Verified, Users, Star, ArrowRight, Shield, MessageSquare, Activity } from 'lucide-react'
import { cn } from '@byteutils/functions/cn'

interface ServerCardProps {
    server: any // Accept the full server object from search results
    className?: string
    variant?: 'default' | 'compact' | 'featured'
}

export function ServerCard({ server, className, variant = 'default' }: ServerCardProps) {
    const isCompact = variant === 'compact'
    const isFeatured = variant === 'featured'

    // Safely extract server data with fallbacks
    const serverId = server?.server_id || server?.id
    const serverName = server?.name || 'Unknown Server'
    const serverDescription = server?.short || server?.description || 'No description available'
    const serverIcon = server?.avatar || server?.icon
    const serverBanner = server?.banner
    const serverVerified = server?.verified || false
    const serverMembers = server?.total_members || server?.members || 0
    const serverOnline = server?.online_members || server?.online
    const serverVotes = server?.votes || 0
    const serverTags = server?.tags || []
    const serverInvite = server?.invite_url || server?.invite

    const isSpecialServer = isFeatured || serverMembers > 10000

    const avatarUrl = serverIcon?.exists
        ? `https://cdn.infinitybots.gg/${serverIcon.path}`
        : 'https://cdn.infinitybots.gg/avatars/default.webp'

    const bannerUrl = serverBanner?.exists ? `https://cdn.infinitybots.gg/${serverBanner.path}` : null

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={cn(
                'relative group overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300',
                isSpecialServer && 'border-accent hover:shadow-accent/20',
                isFeatured && 'ring-2 ring-primary/50',
                className
            )}
        >
            {/* Special server animated border gradient */}
            {isSpecialServer && (
                <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent via-primary to-accent/20 opacity-30 pointer-events-none animate-pulse"
                    style={{ animationDuration: '4s' }}
                />
            )}

            <Link href={`/servers/${serverId}`} className="block relative z-10">
                {/* Banner */}
                <div className={cn('relative overflow-hidden', isCompact ? 'h-24' : 'h-32')}>
                    {bannerUrl ? (
                        <Image src={bannerUrl} alt={`${serverName} banner`} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

                    {/* Server badges */}
                    {isFeatured ? (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-accent backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium flex items-center animate-pulse">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                        </div>
                    ) : serverMembers > 50000 ? (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 backdrop-blur-sm text-white rounded-full text-xs font-medium flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            Popular
                        </div>
                    ) : null}
                </div>

                {/* Card content */}
                <div className="p-5">
                    <div className="flex items-start gap-4">
                        {/* Server icon */}
                        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0 border-4 border-card mt-[-2rem]">
                            <Image src={avatarUrl} alt={serverName} fill className="object-cover" />
                        </div>

                        {/* Server info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold truncate">{serverName}</h3>
                                {serverVerified && <Verified className="h-4 w-4 text-primary flex-shrink-0" />}
                            </div>
                            <p
                                className={cn(
                                    'text-sm text-muted-foreground',
                                    isCompact ? 'line-clamp-1' : 'line-clamp-2'
                                )}
                            >
                                {serverDescription}
                            </p>
                        </div>
                    </div>

                    {/* Member stats */}
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{serverMembers.toLocaleString()} members</span>
                        </div>
                        {serverOnline !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span>{serverOnline.toLocaleString()} online</span>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {serverTags.length > 0 && !isCompact && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {serverTags.slice(0, isFeatured ? 5 : 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                            {serverTags.length > (isFeatured ? 5 : 3) && (
                                <span className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary-foreground">
                                    +{serverTags.length - (isFeatured ? 5 : 3)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Card footer */}
                <div className="px-5 py-3 border-t border-border/50 bg-muted/30 backdrop-blur-sm flex items-center justify-between">
                    {serverVotes > 0 && (
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span>{serverVotes.toLocaleString()}</span>
                        </div>
                    )}

                    <div className="ml-auto">
                        <motion.div
                            className="text-sm text-primary font-medium flex items-center"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                        >
                            View Details <ArrowRight className="ml-1 w-4 h-4" />
                        </motion.div>
                    </div>
                </div>
            </Link>

            {/* Join button for featured cards */}
            {isFeatured && serverInvite && (
                <div className="px-5 py-4 border-t border-border/50">
                    <a
                        href={serverInvite}
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
