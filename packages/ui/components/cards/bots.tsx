'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    BadgeCheck,
    ShieldCheck,
    ShieldAlert,
    Heart,
    Star,
    Zap,
    Users,
    ArrowRight,
    Eye,
    Vote,
    Server
} from 'lucide-react'
import { cn } from '@byteutils/functions/cn'
import { BotAvatarFallback, BotBannerFallback } from '../fallbacks/bot-fallbacks'
import { useApiQuery } from '@byteutils/tanstack/react-query-client'
import { BotReviewsResponse, BotStructure } from '@byteutils/types'

interface BotCardProps {
    id: string
    name: string
    description: string
    avatar: string
    banner?: string
    verified?: boolean
    votes?: number
    stars?: number
    featured?: boolean
    serverCount?: number
    tags?: string[]
    inviteUrl?: string
    className?: string
    variant?: 'default' | 'compact' | 'featured'
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
    variant = 'default'
}: BotCardProps) {
    const [avatarError, setAvatarError] = useState(false)
    const [bannerError, setBannerError] = useState(false)

    // Fetch full bot data
    const { data: botData } = useApiQuery<BotStructure>(['bot-data', id], `/bots/${id}`, {
        fetchOptions: {
            external: true
        }
    })

    // Fetch bot review data
    const { data: reviewData } = useApiQuery<BotReviewsResponse>(['bot-reviews', id], `/bot/${id}/reviews`, {
        fetchOptions: {
            external: true
        }
    })

    // Calculate average star rating from reviews
    const calculateAverageStars = () => {
        if (!reviewData?.reviews || reviewData.reviews.length === 0) return 0
        const totalStars = reviewData.reviews.reduce((sum, review) => sum + review.stars, 0)
        return totalStars / reviewData.reviews.length
    }

    const averageStars = calculateAverageStars()

    const isCompact = variant === 'compact'
    const isFeatured = variant === 'featured'

    // Check if bot is special (premium, certified, or featured)
    const isSpecialBot = featured || botData?.premium || botData?.type === 'certified'

    // Get status border color
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
                return 'border-card'
        }
    }

    // Get status border animation class
    const getStatusBorderAnimation = (status?: string) => {
        switch (status) {
            case 'online':
                return 'animate-border-pulse-green'
            case 'idle':
                return 'animate-border-pulse-yellow'
            case 'dnd':
                return 'animate-border-pulse-red'
            default:
                return ''
        }
    }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={cn(
                'relative group overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-md shadow-lg hover:shadow-lg transition-all duration-300',
                isSpecialBot && 'border-accent hover:shadow-accent',
                featured && 'ring-2 ring-primary/50',
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

            {/* Enhanced glassy background gradient for special bots */}
            <div
                className={cn(
                    'absolute inset-0 z-0 opacity-80 pointer-events-none',
                    isSpecialBot ? 'bg-gradient-to-br from-accent/15 via-primary/10 to-accent/15' : 'bg-card-rgb'
                )}
            />

            <Link href={`/bots/${id}`} className="block relative z-10">
                {/* Banner */}
                {((botData && botData?.banner) || isFeatured) && (
                    <div className="relative h-32 w-full overflow-hidden">
                        {botData?.banner && !bannerError ? (
                            <Image
                                src={`https://cdn.infinitybots.gg/${botData?.banner?.path}`}
                                alt={`${botData?.user?.username} banner`}
                                fill
                                className="object-cover"
                                onError={() => setBannerError(true)}
                            />
                        ) : (
                            <BotBannerFallback />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                        {featured ? (
                            <div
                                className="absolute top-3 right-3 px-2 py-1 bg-accent backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium flex items-center animate-pulse"
                                style={{ animationDuration: '3s' }}
                            >
                                <Zap className="w-3 h-3 mr-1" />
                                Featured
                            </div>
                        ) : botData?.premium ? (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 backdrop-blur-sm text-white rounded-full text-xs font-medium flex items-center">
                                <Star className="w-3 h-3 mr-1" />
                                Premium
                            </div>
                        ) : botData?.nsfw ? (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/90 backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium flex items-center">
                                <ShieldAlert className="w-3 h-3 mr-1" />
                                NSFW Bot (18+)
                            </div>
                        ) : botData?.type === 'certified' ? (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-accent to-primary backdrop-blur-sm text-primary-foreground rounded-full text-xs font-medium flex items-center">
                                <BadgeCheck className="w-3 h-3 mr-1" />
                                Certified
                            </div>
                        ) : null}
                    </div>
                )}

                {/* Background gradient for hover effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card content */}
                <div className={cn('p-5', (botData?.banner || isFeatured) && 'pt-0')}>
                    <div className="flex items-start gap-4">
                        {/* Bot avatar */}
                        <div
                            className={cn(
                                'relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0 border-4 transition-all duration-300',
                                getStatusBorderColor(botData?.user?.status),
                                getStatusBorderAnimation(botData?.user?.status),
                                (botData?.banner || isFeatured) && 'mt-[-2rem]'
                            )}
                        >
                            {botData && botData?.user?.avatar && !avatarError ? (
                                <Image
                                    src={botData?.user?.avatar}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                    onError={() => setAvatarError(true)}
                                />
                            ) : (
                                <BotAvatarFallback name={name} />
                            )}
                        </div>

                        {/* Bot info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold truncate">{botData?.user?.username}</h3>
                                {botData?.type === 'approved' && (
                                    <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                                )}
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

                    {/* Stats for featured view */}
                    {isFeatured && botData?.servers && (
                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                <span>{botData?.users.toLocaleString()} users</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Server className="h-4 w-4" />
                                <span>{botData?.servers.toLocaleString()} servers</span>
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    {botData?.tags.length > 0 && !isCompact && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {botData?.tags.slice(0, isFeatured ? 5 : 3).map(tag => <span key={tag}>{tag}</span>)}
                            {botData?.tags.length > (isFeatured ? 5 : 3) && (
                                <span className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary-foreground">
                                    +{botData?.tags.length - (isFeatured ? 5 : 3)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Card footer */}
                <div
                    className={cn(
                        'px-5 py-3 border-t border-border/50 bg-muted/30 backdrop-blur-sm',
                        isFeatured ? 'flex items-center justify-between' : 'grid grid-cols-2 gap-2'
                    )}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm">
                            <Vote className="h-4 w-4 text-red-500" />
                            <span>{botData?.votes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span>{averageStars > 0 ? averageStars.toFixed(1) : 'No reviews'}</span>
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
            {isFeatured && botData?.invite && (
                <div className="px-5 py-4 border-t border-border/50">
                    <a
                        href={botData?.invite}
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
