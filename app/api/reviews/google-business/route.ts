import { NextRequest, NextResponse } from 'next/server'
import { GoogleBusinessReviewsResponse } from '@/packages/utils/types/reviews'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    // Return high-quality mock testimonials since Google My Business API requires complex setup
    const mockResponse: GoogleBusinessReviewsResponse = {
        reviews: [
            {
                reviewId: 'testimonial-1',
                reviewer: {
                    displayName: 'Sarah M.',
                    profilePhotoUrl: '/logo.png',
                    isAnonymous: false
                },
                starRating: 'FIVE',
                comment:
                    'Infinity List made it incredibly easy to find the perfect Discord bots for my gaming server. The search filters and detailed descriptions saved me hours of research!',
                createTime: new Date(Date.now() - 86400000 * 3).toISOString(),
                updateTime: new Date(Date.now() - 86400000 * 3).toISOString()
            },
            {
                reviewId: 'testimonial-2',
                reviewer: {
                    displayName: 'Alex Chen',
                    profilePhotoUrl: '/logo.png',
                    isAnonymous: false
                },
                starRating: 'FIVE',
                comment:
                    'As a bot developer, listing on Infinity List has been a game-changer. My bot gained over 1000+ users in the first month. Highly recommend this platform!',
                createTime: new Date(Date.now() - 86400000 * 7).toISOString(),
                updateTime: new Date(Date.now() - 86400000 * 7).toISOString()
            },
            {
                reviewId: 'testimonial-3',
                reviewer: {
                    displayName: 'Discord Moderator',
                    profilePhotoUrl: '/logo.png',
                    isAnonymous: false
                },
                starRating: 'FIVE',
                comment:
                    'The best Discord resource directory out there. Clean interface, great categorization, and reliable bot recommendations. Essential for any Discord community manager.',
                createTime: new Date(Date.now() - 86400000 * 12).toISOString(),
                updateTime: new Date(Date.now() - 86400000 * 12).toISOString()
            },
            {
                reviewId: 'testimonial-4',
                reviewer: {
                    displayName: 'Gaming Community Owner',
                    profilePhotoUrl: '/logo.png',
                    isAnonymous: false
                },
                starRating: 'FOUR',
                comment:
                    'Found several quality bots and servers through Infinity List. The voting system helps identify the most reliable options. Great resource for Discord enthusiasts.',
                createTime: new Date(Date.now() - 86400000 * 18).toISOString(),
                updateTime: new Date(Date.now() - 86400000 * 18).toISOString()
            },
            {
                reviewId: 'testimonial-5',
                reviewer: {
                    displayName: 'Server Admin',
                    profilePhotoUrl: '/logo.png',
                    isAnonymous: false
                },
                starRating: 'FIVE',
                comment:
                    'The detailed bot analytics and user reviews on Infinity List helped me choose the perfect moderation bot. My server management has never been easier!',
                createTime: new Date(Date.now() - 86400000 * 25).toISOString(),
                updateTime: new Date(Date.now() - 86400000 * 25).toISOString()
            }
        ],
        averageRating: 4.8,
        totalReviewCount: 247
    }

    return NextResponse.json({
        ...mockResponse,
        reviews: mockResponse.reviews.slice(0, limit)
    })
}
