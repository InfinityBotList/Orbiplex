import React, { Suspense } from 'react'
import { AboutPage } from '@byteui/layouts/about/about-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About - Find Bots & Servers',
    description: 'About Infinity, the best place to find and discover Discord bots and servers.'
}

export default function SearchPage() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <AboutPage className="relative min-h-[92vh] w-full overflow-hidden" />
            </Suspense>
        </div>
    )
}
