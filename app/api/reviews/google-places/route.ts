import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    try {
        // Use Google Places API for reviews (publicly available)
        const placeId = process.env.GOOGLE_PLACE_ID // You need to find your Place ID
        const apiKey = process.env.GOOGLE_PLACES_API_KEY

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`
        )

        if (!response.ok) {
            throw new Error(`Google Places API error: ${response.status}`)
        }

        const data = await response.json()

        if (data.result && data.result.reviews) {
            const transformedReviews = data.result.reviews.slice(0, limit).map((review: any) => ({
                reviewId: review.author_name + review.time,
                reviewer: {
                    displayName: review.author_name,
                    profilePhotoUrl: review.profile_photo_url || '/logo.png',
                    isAnonymous: false
                },
                starRating: this.convertRating(review.rating),
                comment: review.text,
                createTime: new Date(review.time * 1000).toISOString(),
                updateTime: new Date(review.time * 1000).toISOString()
            }))

            return NextResponse.json({
                reviews: transformedReviews,
                averageRating: data.result.rating || 4.5,
                totalReviewCount: data.result.user_ratings_total || 0
            })
        }

        // Fallback to mock data
        return this.getMockData(limit)
    } catch (error) {
        console.error('Failed to fetch Google Places reviews:', error)
        return this.getMockData(limit)
    }
}

function getMockData(limit: number) {
    const mockReviews = [
        {
            reviewId: 'mock-1',
            reviewer: {
                displayName: 'Sarah Johnson',
                profilePhotoUrl: '/logo.png',
                isAnonymous: false
            },
            starRating: 'FIVE',
            comment:
                'Infinity List helped me find the perfect music bot for my server. The detailed reviews made it easy to choose!',
            createTime: new Date(Date.now() - 86400000 * 2).toISOString(),
            updateTime: new Date(Date.now() - 86400000 * 2).toISOString()
        }
        // ...more mock reviews
    ]

    return NextResponse.json({
        reviews: mockReviews.slice(0, limit),
        averageRating: 4.8,
        totalReviewCount: 127
    })
}

function convertRating(rating: number): string {
    if (rating >= 5) return 'FIVE'
    if (rating >= 4) return 'FOUR'
    if (rating >= 3) return 'THREE'
    if (rating >= 2) return 'TWO'
    return 'ONE'
}
