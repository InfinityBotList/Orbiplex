import {
    useQuery,
    UseQueryOptions,
    QueryClient,
    QueryClientProvider,
    useMutation,
    UseMutationOptions
} from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // No caching at the client level
            cacheTime: 0,
            staleTime: 0,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1
        }
    }
})

// API Configuration
const API_CONFIG = {
    internal: {
        production: process.env.NEXT_PUBLIC_INTERNAL_API_URL || 'http://localhost:3000/api',
        staging: process.env.NEXT_PUBLIC_INTERNAL_API_URL || 'http://localhost:3000/api'
    },
    external: {
        production: process.env.NEXT_PUBLIC_API_URL || 'https://spider.infinitybots.gg',
        staging: process.env.NEXT_PUBLIC_API_STAGING_URL || 'https://spider-staging.infinitybots.gg'
    }
}

// Helper to resolve API URLs
export function resolveApiUrl(endpoint: string, options?: { staging?: boolean; external?: boolean }): string {
    if (options?.external) {
        // Use configured external API URLs (spider endpoints)
        const baseUrl =
            options?.staging || process.env.NODE_ENV !== 'production'
                ? API_CONFIG.external.staging
                : API_CONFIG.external.production

        return endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`
    }

    const baseUrl =
        options?.staging || process.env.NODE_ENV !== 'production'
            ? API_CONFIG.internal.staging
            : API_CONFIG.internal.production

    return endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`
}

// Generic fetcher for both internal and external APIs
export async function fetcher<T = unknown>(
    url: string,
    options?: RequestInit & { external?: boolean; staging?: boolean }
): Promise<T> {
    const resolvedUrl = resolveApiUrl(url, options)

    // If external, just fetch as is
    if (options?.external) {
        const res = await fetch(resolvedUrl, options)
        if (!res.ok) throw new Error(`External API error: ${res.status}`)
        return res.json()
    }

    // Internal API: add credentials, headers, etc. as needed
    const res = await fetch(resolvedUrl, {
        ...options,
        credentials: 'include',
        headers: {
            ...(options?.headers || {}),
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) throw new Error(`Internal API error: ${res.status}`)
    return res.json()
}

// Custom hook for queries
export function useApiQuery<T = unknown, E = unknown>(
    key: unknown[],
    url: string,
    options?: UseQueryOptions<T, E> & { fetchOptions?: RequestInit & { external?: boolean; staging?: boolean } }
) {
    return useQuery<T, E>({
        queryKey: key,
        queryFn: () => fetcher<T>(url, options?.fetchOptions),
        ...options
    })
}

// Custom hook for mutations
export function useApiMutation<TData = unknown, TVariables = unknown, TError = unknown>(
    options: {
        endpoint: string
        method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH'
        fetchOptions?: RequestInit & { external?: boolean; staging?: boolean }
    } & UseMutationOptions<TData, TError, TVariables>
) {
    const { endpoint, method = 'POST', fetchOptions, ...mutationOptions } = options

    return useMutation<TData, TError, TVariables>({
        mutationFn: async (variables: TVariables) => {
            const resolvedUrl = resolveApiUrl(endpoint, fetchOptions)

            const requestOptions: RequestInit = {
                ...fetchOptions,
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(fetchOptions?.headers || {})
                }
            }

            // Add body for POST/PUT/PATCH requests
            if (method !== 'DELETE' && variables) {
                requestOptions.body = JSON.stringify(variables)
            }

            // Add credentials for internal API
            if (!fetchOptions?.external) {
                requestOptions.credentials = 'include'
            }

            const res = await fetch(resolvedUrl, requestOptions)

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`)
            }

            return res.json()
        },
        ...mutationOptions
    })
}

export { QueryClientProvider }
