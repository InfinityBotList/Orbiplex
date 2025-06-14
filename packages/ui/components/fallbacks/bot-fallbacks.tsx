import { cn } from '@byteutils/functions/cn'

interface BotAvatarFallbackProps {
    className?: string
    name: string
}

export function BotAvatarFallback({ className, name }: BotAvatarFallbackProps) {
    const initials = name
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()

    return (
        <svg
            className={cn('w-full h-full', className)}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Background with subtle gradient */}
            <defs>
                <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.9 }} />
                </linearGradient>
                <mask id="circleMask">
                    <circle cx="50" cy="50" r="50" fill="white" />
                </mask>
            </defs>

            {/* Base circle with gradient */}
            <circle cx="50" cy="50" r="50" fill="url(#avatarGradient)" />

            {/* Decorative wave pattern */}
            <g mask="url(#circleMask)" opacity="0.1">
                <path d="M-20 80 Q 0 60, 20 80 T 60 80 T 100 80 T 140 80" stroke="white" strokeWidth="2" fill="none" />
                <path d="M-20 90 Q 0 70, 20 90 T 60 90 T 100 90 T 140 90" stroke="white" strokeWidth="2" fill="none" />
                <path
                    d="M-20 100 Q 0 80, 20 100 T 60 100 T 100 100 T 140 100"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                />
            </g>

            {/* Initials */}
            <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="30"
                fontWeight="500"
                fontFamily="var(--font-geist-sans)"
            >
                {initials}
            </text>
        </svg>
    )
}

export function BotBannerFallback({ className }: { className?: string }) {
    return (
        <div className={cn('w-full h-full bg-muted flex items-center justify-center', className)}>
            <svg
                className="w-16 h-16 text-muted-foreground/20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    )
}
