import { Music, ShieldCheck, TrendingUp, Bot, Server } from 'lucide-react'

export const categories = [
    {
        name: 'Music',
        icon: <Music className="w-5 h-5 text-white" />,
        description:
            "Discord bots for playing music, managing playlists, and enhancing your server's audio experience.",
        count: 124,
        href: '/categories/music',
        gradientFrom: '#8467fa',
        gradientTo: '#bd63f9'
    },
    {
        name: 'Moderation',
        icon: <ShieldCheck className="w-5 h-5 text-white" />,
        description: 'Tools to help you moderate your server, prevent spam, and keep your community safe.',
        count: 98,
        href: '/categories/moderation',
        gradientFrom: '#3b82f6',
        gradientTo: '#60a5fa'
    },
    {
        name: 'Leveling',
        icon: <TrendingUp className="w-5 h-5 text-white" />,
        description: 'Track user activity, award XP, and create engaging progression systems for your server.',
        count: 57,
        href: '/categories/leveling',
        gradientFrom: '#10b981',
        gradientTo: '#34d399'
    },
    {
        name: 'Economy',
        icon: <Bot className="w-5 h-5 text-white" />,
        description: 'Create virtual economies with currencies, shops, and games to enhance engagement.',
        count: 72,
        href: '/categories/economy',
        gradientFrom: '#f97316',
        gradientTo: '#fb923c'
    },
    {
        name: 'Gaming',
        icon: <Server className="w-5 h-5 text-white" />,
        description: 'Bots for gaming features, stats tracking, matchmaking, and enhancing gaming experiences.',
        count: 86,
        href: '/categories/gaming',
        gradientFrom: '#14b8a6',
        gradientTo: '#2dd4bf'
    },
    {
        name: 'Utility',
        icon: <Bot className="w-5 h-5 text-white" />,
        description: 'Multi-purpose utility bots with various functions to enhance your Discord server.',
        count: 135,
        href: '/categories/utility',
        gradientFrom: '#ec4899',
        gradientTo: '#f472b6'
    }
]
