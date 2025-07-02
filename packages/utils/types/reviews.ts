export interface GoogleBusinessReview {
    reviewId: string
    reviewer: {
        displayName: string
        profilePhotoUrl: string
        isAnonymous: boolean
    }
    starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
    comment: string
    createTime: string
    updateTime: string
    reviewReply?: {
        comment: string
        updateTime: string
    }
}

export interface GoogleBusinessReviewsResponse {
    reviews: GoogleBusinessReview[]
    averageRating: number
    totalReviewCount: number
    nextPageToken?: string
}

export interface TestimonialData {
    quote: string
    author: string
    role: string
    avatar: string
    rating: number
    date: string
}
