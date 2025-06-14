'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@byteutils/functions/cn'
import { QuoteIcon } from 'lucide-react'

interface TestimonialProps {
    quote: string
    author: string
    role: string
    avatar: string
    className?: string
    index?: number
}

export function Testimonial({ quote, author, role, avatar, className, index = 0 }: TestimonialProps) {
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
    testimonials: Omit<TestimonialProps, 'index'>[]
    className?: string
}

export function TestimonialsGrid({ testimonials, className }: TestimonialsGridProps) {
    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
            {testimonials.map((testimonial, index) => (
                <Testimonial
                    key={index}
                    quote={testimonial.quote}
                    author={testimonial.author}
                    role={testimonial.role}
                    avatar={testimonial.avatar}
                    index={index}
                />
            ))}
        </div>
    )
}
