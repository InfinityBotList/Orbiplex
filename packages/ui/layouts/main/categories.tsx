import React from 'react'
import { categories } from '@byteutils/constants/categories'
import { SectionDivider } from '@byteui/components/sections/dividier'
import { CategoryGrid } from '@byteui/components/cards/categories'
import { cn } from '@byteutils/functions/cn'

interface CategoriesSectionProps {
    className?: string
}

export function CategoriesSection({ className }: CategoriesSectionProps) {
    return (
        <section className={cn(className)}>
            <div className="container max-w-screen-xl mx-auto">
                <SectionDivider
                    title="Popular Categories"
                    subtitle="Browse Discord bots by category to find exactly what you need"
                    link="/categories"
                    linkText="View All Categories"
                    alignment="left"
                />

                <CategoryGrid
                    className="mt-12"
                    categories={categories.map(category => ({
                        name: category.name,
                        icon: category.icon,
                        description: category.description,
                        count: category.count,
                        href: `/categories/${category.slug}`,
                        gradientFrom: category.gradientFrom,
                        gradientTo: category.gradientTo
                    }))}
                    onCategoryClick={category => {
                        // Handle category click if needed
                        console.log(`Category clicked: ${category.name}`)
                    }}
                />
            </div>
        </section>
    )
}
