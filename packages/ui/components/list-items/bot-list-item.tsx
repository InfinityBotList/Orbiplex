'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BadgeCheck, ShieldCheck, Star, Users, Server, ArrowRight, Zap, Heart } from 'lucide-react'
import { cn } from '@byteutils/functions/cn'

interface BotListItemProps {
    bot: any
    className?: string
}

export function BotListItem({ bot, className }: BotListItemProps) {
    const [avatarError, setAvatarError] = useState(false)

    const botId = bot?.bot_id || bot?.id
    const botName = bot?.user?.username || bot?.user?.display_name || bot?.name || 'Unknown Bot'
    const botDescription = bot?.short || bot?.description || 'No description available'
    const botAvatar = bot?.user?.avatar
    const botVerified = bot?.type === 'approved' || bot?.verified || false
    const botVotes = bot?.votes || 0
    const botServers = bot?.servers || 0
    const botUsers = bot?.users || 0
    const botTags = bot?.tags || []
    const botFeatured = bot?.featured || false
    const botPremium = bot?.premium || false

    const avatarUrl = botAvatar || 'https://cdn.infinitybots.gg/avatars/default.webp'

    return (
        <motion.div
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/90 to-background/90 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300',
                botFeatured && 'border-primary/50 hover:border-primary/70',
                className
            )}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {botFeatured && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 opacity-50 pointer-events-none" />
            )}

            <Link href={`/bots/${botId}`} className="block relative z-10">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-muted flex-shrink-0 border-2 border-border/50">
                            {botAvatar && !avatarError ? (
                                <Image
                                    src={avatarUrl}
                                    alt={botName}
                                    fill
                                    className="object-cover"
                                    onError={() => setAvatarError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                    <span className="text-lg font-bold text-primary">
                                        {botName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold truncate">{botName}</h3>
                                {botVerified && <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />}
                                {botFeatured && (
                                    <div className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium flex items-center">
                                        <Zap className="w-3 h-3 mr-1" />
                                        Featured
                                    </div>
                                )}
                                {botPremium && (
                                    <div className="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-600 rounded-full text-xs font-medium flex items-center">
                                        <Star className="w-3 h-3 mr-1" />
                                        Premium
                                    </div>
                                )}
                            </div>

                            <p className="text-muted-foreground mb-4 line-clamp-2">{botDescription}</p>

                            {/* Tags */}
                            {botTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {botTags.slice(0, 4).map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs rounded-lg bg-secondary/20 text-secondary-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {botTags.length > 4 && (
                                        <span className="px-2 py-1 text-xs rounded-lg bg-secondary/10 text-secondary-foreground">
                                            +{botTags.length - 4}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Stats */}
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>{botVotes.toLocaleString()} votes</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    <span>{botUsers.toLocaleString()} users</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Server className="h-4 w-4 text-green-500" />
                                    <span>{botServers.toLocaleString()} servers</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <motion.div
                                className="text-primary font-medium flex items-center gap-2"
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
