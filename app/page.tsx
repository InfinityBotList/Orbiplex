import React from 'react'
import { HeroSection } from '@byteui/layouts/main/hero'
import { FeaturesSection } from '@byteui/layouts/main/features'
import { FeaturedBotsSection } from '@byteui/layouts/main/bots/featured'
import { PopularBotsSection } from '@/packages/ui/layouts/main/bots/popular'
import { CategoriesSection } from '@/packages/ui/layouts/main/categories'
import { FeaturedServersSection } from '@/packages/ui/layouts/main/servers/featured'
import { TrendingBotsSection } from '@/packages/ui/layouts/main/bots/trending'
import { StatsSection } from '@/packages/ui/layouts/main/stats'
import { TestimonialsSection } from '@/packages/ui/layouts/main/testimonials'
import { CTASection } from '@/packages/ui/layouts/main/cta'

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 mt-20">
                {/* Hero Section */}
                <HeroSection className="relative min-h-[92vh] w-full overflow-hidden" />

                {/* Features Section */}
                <FeaturesSection className="py-24 px-4 bg-muted/30 dark:bg-secondary/20" />

                {/* Featured Bots Section */}
                <FeaturedBotsSection className="py-28 px-4" />

                {/* Popular Bots Section */}
                <PopularBotsSection className="py-28 px-4 bg-muted/30 dark:bg-secondary/20" />

                {/* Featured Servers Section */}
                <FeaturedServersSection className="py-28 px-4 bg-muted/30 dark:bg-secondary/20" />

                {/* Trending Bots Carousel */}
                <TrendingBotsSection className="py-28 px-4 bg-muted/30 dark:bg-secondary/20" />

                {/* Platform Stats */}
                <StatsSection className="py-28 px-4 bg-background dark:bg-background" />

                {/* Testimonials */}
                <TestimonialsSection className="py-28 px-4 bg-muted/30 dark:bg-secondary/20" />

                {/* CTA Section */}
                <CTASection className="py-28 px-4" />
            </main>
        </div>
    )
}
