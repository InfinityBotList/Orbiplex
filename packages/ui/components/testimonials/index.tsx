'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@byteutils/functions/cn'
import { QuoteIcon, Star } from 'lucide-react'
import { TestimonialData } from '@/packages/utils/types/reviews'

interface TestimonialProps {
    testimonial: TestimonialData
    className?: string
    index?: number
}

export function Testimonial({ testimonial, className, index = 0 }: TestimonialProps) {
    const { quote, author, role, avatar, rating } = testimonial

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={cn('relative p-8 glass-card group', className)}
        >
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <QuoteIcon className="w-10 h-10 text-primary" />
            </div>

            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Content */}
            <div className="relative z-10">
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                'w-4 h-4',
                                i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300 dark:text-gray-600'
                            )}
                        />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>
                </div>

                <p className="text-foreground/90 mb-8 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    &quot;{quote}&quot;
                </p>

                <div className="flex items-center">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-primary/20 shadow-md group-hover:border-primary/40 transition-colors duration-300">
                        <Image src={avatar} alt={author} fill className="object-cover" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">{author}</h4>
                        <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

interface TestimonialsGridProps {
    testimonials: TestimonialData[]
    className?: string
    isLoading?: boolean
}

export function TestimonialsGrid({ testimonials, className, isLoading }: TestimonialsGridProps) {
    if (isLoading) {
        return (
            <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="relative p-8 glass-card animate-pulse">
                        <div className="space-y-4">
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
                                ))}
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-full" />
                                <div className="h-4 bg-gray-300 rounded w-3/4" />
                                <div className="h-4 bg-gray-300 rounded w-1/2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-300 rounded-full" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-24" />
                                    <div className="h-3 bg-gray-300 rounded w-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
            {testimonials.map((testimonial, index) => (
                <Testimonial key={`${testimonial.author}-${index}`} testimonial={testimonial} index={index} />
            ))}
        </div>
    )
}
