import { useQuery } from '@tanstack/react-query'
import { GoogleBusinessService } from '../services/google-business'
import { TestimonialData } from '../types/reviews'

export function useTestimonials(limit: number = 6) {
    return useQuery<TestimonialData[]>({
        queryKey: ['testimonials', 'google-business', limit],
        queryFn: () => GoogleBusinessService.getReviews(limit),
        staleTime: 1000 * 60 * 30, // 30 minutes
        cacheTime: 1000 * 60 * 60, // 1 hour
        retry: 2,
        refetchOnWindowFocus: false
    })
}
