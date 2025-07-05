'use client'

import React from 'react'
import { Bot } from 'lucide-react'
import { cn } from '@byteutils/functions/cn'
import Image from 'next/image'

interface BotAvatarFallbackProps {
    name?: string
    className?: string
}

export function BotAvatarFallback({ name, className }: BotAvatarFallbackProps) {
    // Safe name handling with fallback
    const safeName = name || 'Bot'
    const initials =
        safeName
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2) || 'B'

    return (
        <div
            className={cn(
                'w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center',
                className
            )}
        >
            <span className="text-lg font-bold text-primary">{initials}</span>
        </div>
    )
}

interface BotBannerFallbackProps {
    className?: string
}

export function BotBannerFallback({ className }: BotBannerFallbackProps) {
    return (
        <div className={cn('w-full h-full bg-muted flex items-center justify-center', className)}>
            <Image
                src="https://cdn.infinitybots.gg/banners/default.webp"
                alt="Default Banner"
                fill
                className="object-cover"
            />
        </div>
    )
}
