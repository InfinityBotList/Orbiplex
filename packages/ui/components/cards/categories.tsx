'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@byteutils/functions/cn'
import { ArrowRight } from 'lucide-react'

interface CategoryCardProps {
    name: string
    icon: React.ReactNode
    description: string
    count: number
    href: string
    className?: string
    gradientFrom?: string
    gradientTo?: string
}

export function CategoryCard({
    name,
    icon,
    description,
    count,
    href,
    className,
    gradientFrom = 'var(--primary)',
    gradientTo = 'var(--accent)'
}: CategoryCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={cn(
                'relative group overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-md transition-all duration-300',
                className
            )}
        >
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 z-0 bg-gradient-to-br opacity-5 group-hover:opacity-15 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
                }}
            />

            {/* Top corner decorative element */}
            <div
                className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
                }}
            />

            <Link href={href} className="block relative z-10">
                <div className="p-6 md:p-7">
                    <div className="flex items-center gap-4 mb-5">
                        <div
                            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
                            style={{
                                background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
                            }}
                        >
                            {icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{name}</h3>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <span className="font-medium">{count.toLocaleString()}</span>
                                <span>{count === 1 ? 'item' : 'items'}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-5 line-clamp-3">{description}</p>

                    <div className="flex items-center gap-2 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-primary">Browse Category</span>
                        <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

// Category grid component
interface CategoryGridProps {
    categories: {
        name: string
        icon: React.ReactNode
        description: string
        count: number
        href: string
        gradientFrom?: string
        gradientTo?: string
    }[]
    className?: string
}

export function CategoryGrid({ categories, className }: CategoryGridProps) {
    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
            {categories.map((category, index) => (
                <CategoryCard
                    key={category.name}
                    name={category.name}
                    icon={category.icon}
                    description={category.description}
                    count={category.count}
                    href={category.href}
                    gradientFrom={category.gradientFrom}
                    gradientTo={category.gradientTo}
                />
            ))}
        </div>
    )
}
