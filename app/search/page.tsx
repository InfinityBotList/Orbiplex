import React, { Suspense } from 'react'
import { SearchPageLayout } from '@byteui/layouts/search/search-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Search - Find Bots & Servers',
    description:
        'Search through thousands of Discord bots and servers. Find the perfect additions to your Discord community.'
}

export default function SearchPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 mt-20">
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchPageLayout />
                </Suspense>
            </main>
        </div>
    )
}
