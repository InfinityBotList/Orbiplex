'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Verified, Users, Star, ArrowRight, Activity, Shield } from 'lucide-react'
import { cn } from '@byteutils/functions/cn'

interface ServerListItemProps {
    server: any
    className?: string
}

export function ServerListItem({ server, className }: ServerListItemProps) {
    const [iconError, setIconError] = useState(false)

    const serverId = server?.server_id || server?.id
    const serverName = server?.name || 'Unknown Server'
    const serverDescription = server?.short || server?.description || 'No description available'
    const serverIcon = server?.avatar || server?.icon
    const serverVerified = server?.verified || false
    const serverMembers = server?.total_members || server?.members || 0
    const serverOnline = server?.online_members || server?.online
    const serverVotes = server?.votes || 0
    const serverTags = server?.tags || []
    const serverFeatured = server?.featured || false

    const iconUrl = serverIcon?.exists
        ? `https://cdn.infinitybots.gg/${serverIcon.path}`
        : 'https://cdn.infinitybots.gg/avatars/default.webp'

    return (
        <motion.div
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/90 to-background/90 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300',
                serverFeatured && 'border-accent/50 hover:border-accent/70',
                className
            )}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {serverFeatured && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 opacity-50 pointer-events-none" />
            )}

            <Link href={`/servers/${serverId}`} className="block relative z-10">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-muted flex-shrink-0 border-2 border-border/50">
                            {serverIcon && !iconError ? (
                                <Image
                                    src={iconUrl}
                                    alt={serverName}
                                    fill
                                    className="object-cover"
                                    onError={() => setIconError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                                    <span className="text-lg font-bold text-accent">
                                        {serverName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold truncate">{serverName}</h3>
                                {serverVerified && <Verified className="h-5 w-5 text-green-500 flex-shrink-0" />}
                                {serverFeatured && (
                                    <div className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium flex items-center">
                                        <Star className="w-3 h-3 mr-1" />
                                        Featured
                                    </div>
                                )}
                                {serverMembers > 50000 && (
                                    <div className="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-600 rounded-full text-xs font-medium flex items-center">
                                        <Users className="w-3 h-3 mr-1" />
                                        Popular
                                    </div>
                                )}
                            </div>

                            <p className="text-muted-foreground mb-4 line-clamp-2">{serverDescription}</p>

                            {/* Tags */}
                            {serverTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {serverTags.slice(0, 4).map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs rounded-lg bg-secondary/20 text-secondary-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {serverTags.length > 4 && (
                                        <span className="px-2 py-1 text-xs rounded-lg bg-secondary/10 text-secondary-foreground">
                                            +{serverTags.length - 4}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Stats */}
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    <span>{serverMembers.toLocaleString()} members</span>
                                </div>
                                {serverOnline !== undefined && (
                                    <div className="flex items-center gap-1.5">
                                        <Activity className="h-4 w-4 text-green-500" />
                                        <span>{serverOnline.toLocaleString()} online</span>
                                    </div>
                                )}
                                {serverVotes > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <Star className="h-4 w-4 text-amber-500" />
                                        <span>{serverVotes.toLocaleString()} votes</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <motion.div
                                className="text-accent font-medium flex items-center gap-2"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="hidden sm:inline">View Details</span>
                                <ArrowRight className="w-5 h-5" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
