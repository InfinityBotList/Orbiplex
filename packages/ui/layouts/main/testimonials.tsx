'use client'

import { motion } from 'framer-motion'
import { TestimonialsGrid } from '@/packages/ui/components/testimonials/index'
import { useTestimonials } from '@/packages/utils/hooks/use-testimonials'
import { cn } from '@/packages/utils/functions/cn'

interface TestimonialsSectionProps {
    className?: string
}

function TestimonialsSection({ className }: TestimonialsSectionProps) {
    const { data: testimonials = [], isLoading, error } = useTestimonials(6)

    console.log(testimonials)

    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Real reviews from our Google Business page - discover why thousands choose Infinity List
                    </p>
                </motion.div>

                {error && (
                    <div className="text-center mb-8">
                        <p className="text-yellow-600 dark:text-yellow-400">
                            Unable to load latest reviews. Showing featured testimonials.
                        </p>
                    </div>
                )}

                <TestimonialsGrid className="mt-12" testimonials={testimonials} isLoading={isLoading} />
            </div>
        </section>
    )
}

export { TestimonialsSection }
