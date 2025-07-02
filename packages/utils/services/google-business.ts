import { fetcher } from '../tanstack/react-query-client'
import { GoogleBusinessReviewsResponse, GoogleBusinessReview, TestimonialData } from '../types/reviews'

export class GoogleBusinessService {
    private static readonly GOOGLE_BUSINESS_API = 'https://mybusiness.googleapis.com/v4'

    // Extracted from your Google Business URL
    private static readonly ACCOUNT_ID = '4390794481742643139'
    private static readonly LOCATION_ID = '4464207928996171155'

    static async getReviews(limit: number = 10): Promise<TestimonialData[]> {
        try {
            // Call your local Next.js API route, not the external API
            const response = await fetcher<GoogleBusinessReviewsResponse>(
                `/api/reviews/google-business?limit=${limit}`,
                { external: false } // This will call your local Next.js API
            )

            return this.transformReviewsToTestimonials(response.reviews)
        } catch (error) {
            console.warn('Failed to fetch Google Business reviews, falling back to static testimonials:', error)
            return this.getFallbackTestimonials()
        }
    }

    private static transformReviewsToTestimonials(reviews: GoogleBusinessReview[]): TestimonialData[] {
        return reviews
            .filter(review => review.comment && review.comment.trim().length > 0)
            .map(review => ({
                quote: review.comment,
                author: review.reviewer.isAnonymous ? 'Anonymous User' : review.reviewer.displayName,
                role: 'Verified Google Review',
                avatar: review.reviewer.profilePhotoUrl || '/default-avatar.png',
                rating: this.convertStarRating(review.starRating),
                date: review.createTime
            }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    private static convertStarRating(rating: GoogleBusinessReview['starRating']): number {
        const ratingMap = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            FOUR: 4,
            FIVE: 5
        }
        return ratingMap[rating] || 5
    }

    private static getFallbackTestimonials(): TestimonialData[] {
        return [
            {
                quote: 'Infinity List helped me find the perfect music bot for my server. The detailed reviews and features list made it easy to choose.',
                author: 'Server Owner',
                role: 'Discord Community Manager',
                avatar: '/logo.png',
                rating: 5,
                date: new Date().toISOString()
            },
            {
                quote: "As a bot developer, I've seen a significant increase in users since listing on Infinity List. The platform is a game-changer!",
                author: 'Bot Developer',
                role: 'Discord Bot Creator',
                avatar: '/logo.png',
                rating: 5,
                date: new Date().toISOString()
            },
            {
                quote: "The categories and filtering options make it so easy to find exactly what you're looking for. Best Discord resource out there!",
                author: 'Discord Moderator',
                role: 'Community Moderator',
                avatar: '/logo.png',
                rating: 5,
                date: new Date().toISOString()
            }
        ]
    }
}
