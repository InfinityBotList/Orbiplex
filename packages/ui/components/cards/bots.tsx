'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BadgeCheck, ShieldCheck, ShieldAlert, Star, Zap, Users, ArrowRight, Vote, Server } from 'lucide-react'
import { cn } from '@byteutils/functions/cn'
import { BotAvatarFallback, BotBannerFallback } from '../fallbacks/bot-fallbacks'
import { BotStructure } from '@byteutils/types'

interface BotCardProps {
    bot: BotStructure
    className?: string
    variant?: 'default' | 'compact' | 'featured'
}

export function BotCard({ bot, className, variant = 'default' }: BotCardProps) {
    const [avatarError, setAvatarError] = useState(false)
    const [bannerError, setBannerError] = useState(false)

    const botId = bot.bot_id
    const botName = bot.user.display_name || bot.user.username || 'Unknown Bot'
    const botDescription = bot.short
    const botAvatar = bot.user.avatar
    const botBanner = bot.banner?.path
    const botVerified = bot.type === 'approved'
    const botVotes = bot.votes
    const botServers = bot.servers
    const botUsers = bot.users || 0
    const botTags = bot.tags || []
    const botFeatured = variant === 'featured'
    const botPremium = bot.premium
    const botNsfw = bot.nsfw
    const botInvite = bot.invite

    const isCompact = variant === 'compact'
    const isFeatured = variant === 'featured'
    const isSpecialBot = botFeatured || botPremium || bot.type === 'certified'

    const getStatusBorderColor = (status?: string) => {
        switch (status) {
            case 'online':
                return 'border-green-500'
            case 'idle':
                return 'border-yellow-500'
            case 'dnd':
                return 'border-red-500'
            case 'offline':
                return 'border-gray-500'
            default:
                return 'border-border'
        }
    }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={cn(
                'relative group overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300',
                isSpecialBot && 'border-accent hover:shadow-accent/20',
                botFeatured && 'ring-2 ring-primary/50',
                className
            )}
        >
            {/* Special bot animated border gradient */}
            {isSpecialBot && (
                <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent via-primary to-accent/20 opacity-30 pointer-events-none animate-pulse"
                    style={{ animationDuration: '4s' }}
                />
            )}

            <Link href={`/bots/${botId}`} className="block relative z-10">
                {/* Banner */}
                {(botBanner || isFeatured) && (
                    <div className="relative h-32 w-full overflow-hidden">
                        {botBanner && !bannerError ? (
                            <Image
                                src={
                                    botBanner.startsWith('http')
                                        ? botBanner
                                        : `https://cdn.infinitybots.gg/${botBanner}`
                                }
                                alt={`${botName} banner`}
                                fill
                                className="object-cover"
                                onError={() => setBannerError(true)}
                            />
                        ) : (
                            <BotBannerFallback />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

                        {/* Status badges */}
                        {botFeatured ? (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-accent backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium flex items-center animate-pulse">
                                <Zap className="w-3 h-3 mr-1" />
                                Featured
                            </div>
                        ) : botPremium ? (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 backdrop-blur-sm text-white rounded-full text-xs font-medium flex items-center">
                                <Star className="w-3 h-3 mr-1" />
                                Premium
                            </div>
                        ) : botNsfw ? (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/90 backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium flex items-center">
                                <ShieldAlert className="w-3 h-3 mr-1" />
                                NSFW
                            </div>
                        ) : bot.type === 'certified' ? (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-accent to-primary backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium flex items-center">
                                <BadgeCheck className="w-3 h-3 mr-1" />
                                Certified
                            </div>
                        ) : null}
                    </div>
                )}

                {/* Card content */}
                <div className={cn('p-5', (botBanner || isFeatured) && 'pt-0')}>
                    <div className="flex items-start gap-4">
                        {/* Bot avatar */}
                        <div
                            className={cn(
                                'relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0 border-4 transition-all duration-300',
                                getStatusBorderColor(bot.user.status),
                                (botBanner || isFeatured) && 'mt-[-2rem]'
                            )}
                        >
                            {botAvatar && !avatarError ? (
                                <Image
                                    src={
                                        botAvatar.startsWith('http')
                                            ? botAvatar
                                            : `https://cdn.infinitybots.gg${botAvatar}`
                                    }
                                    alt={botName}
                                    fill
                                    className="object-cover"
                                    onError={() => setAvatarError(true)}
                                />
                            ) : (
                                <BotAvatarFallback name={botName} />
                            )}
                        </div>

                        {/* Bot info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold truncate">{botName}</h3>
                                {botVerified && <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0" />}
                            </div>
                            <p
                                className={cn(
                                    'text-sm text-muted-foreground',
                                    isCompact ? 'line-clamp-1' : 'line-clamp-2'
                                )}
                            >
                                {botDescription}
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{botUsers} users</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Server className="h-4 w-4" />
                            <span>{botServers} servers</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {botTags.length > 0 && !isCompact && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {botTags.slice(0, isFeatured ? 5 : 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                            {botTags.length > (isFeatured ? 5 : 3) && (
                                <span className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary-foreground">
                                    +{botTags.length - (isFeatured ? 5 : 3)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Card footer */}
                <div className="px-5 py-3 border-t border-border/50 bg-muted/30 backdrop-blur-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm">
                            <Vote className="h-4 w-4 text-red-500" />
                            <span>{botVotes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span>0</span>
                        </div>
                    </div>

                    <motion.div
                        className="text-sm text-primary font-medium flex items-center"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                    >
                        View Details <ArrowRight className="ml-1 w-4 h-4" />
                    </motion.div>
                </div>
            </Link>

            {/* Action buttons for featured cards */}
            {isFeatured && botInvite && (
                <div className="px-5 py-4 border-t border-border/50">
                    <a
                        href={botInvite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-center font-medium transition-colors"
                        onClick={e => e.stopPropagation()}
                    >
                        Add to Discord
                    </a>
                </div>
            )}
        </motion.div>
    )
}
