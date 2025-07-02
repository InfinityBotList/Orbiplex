import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: false,
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.infinitybots.gg'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com'
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc'
            }
        ]
    }
}

export default nextConfig
