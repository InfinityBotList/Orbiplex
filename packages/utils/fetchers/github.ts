import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query'

interface GitHubFetcherOptions {
    baseURL?: string
    timeout?: number
    userAgent?: string
    authToken?: string
}

interface GitHubResponse<T> {
    data: T
    headers: Record<string, string>
    status: number
}

// Rate limit state (module-level, not per-request)
let rateLimitRemaining = 60
let rateLimitReset = 0

function updateRateLimits(headers: Record<string, string>) {
    const remaining = headers['x-ratelimit-remaining']
    const reset = headers['x-ratelimit-reset']
    if (remaining) rateLimitRemaining = parseInt(remaining, 10)
    if (reset) rateLimitReset = parseInt(reset, 10)
}

export function getRateLimitInfo() {
    return {
        remaining: rateLimitRemaining,
        reset: rateLimitReset,
        resetTime: new Date(rateLimitReset * 1000)
    }
}

function getHeaders(options?: GitHubFetcherOptions) {
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': options?.userAgent || 'InfinityBotList'
    }
    const token = process.env.GITHUB_TOKEN
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers
}

async function githubFetch<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any,
    options?: GitHubFetcherOptions & { fetchOptions?: RequestInit }
): Promise<GitHubResponse<T>> {
    const baseURL = options?.baseURL || 'https://api.github.com'
    const url = endpoint.startsWith('http') ? endpoint : `${baseURL}${endpoint}`
    const headers = {
        ...getHeaders(options),
        ...(options?.fetchOptions?.headers || {})
    }
    const fetchOptions: RequestInit = {
        method,
        headers,
        ...options?.fetchOptions
    }
    if (data && method !== 'GET') {
        fetchOptions.body = JSON.stringify(data)
        // Ensure headers is a Record<string, string>
        if (typeof headers === 'object' && headers !== null && !Array.isArray(headers)) {
            ;(headers as Record<string, string>)['Content-Type'] = 'application/json'
        }
    }
    const res = await fetch(url, fetchOptions)
    const resHeaders: Record<string, string> = {}
    res.headers.forEach((v, k) => {
        resHeaders[k] = v
    })
    updateRateLimits(resHeaders)
    const contentType = res.headers.get('content-type') || ''
    let responseData: any = undefined
    if (contentType.includes('application/json')) {
        responseData = await res.json()
    } else {
        responseData = await res.text()
    }
    if (!res.ok) {
        const status = res.status
        const message = responseData?.message || res.statusText
        switch (status) {
            case 401:
            case 403:
                throw new Error(
                    `GitHub API Authentication Error: ${message}. Please check your GitHub token configuration.`
                )
            case 404:
                throw new Error(`GitHub API Resource Not Found: ${message}`)
            case 429:
                const resetTime = res.headers.get('x-ratelimit-reset')
                const retryAfter = resetTime ? new Date(parseInt(resetTime) * 1000) : 'unknown'
                throw new Error(`GitHub API Rate Limit Exceeded. Please try again after ${retryAfter}`)
            default:
                throw new Error(`GitHub API Error (${status}): ${message}`)
        }
    }
    return {
        data: responseData,
        headers: resHeaders,
        status: res.status
    }
}

// --- React Query hooks ---

export function useGitHubQuery<T = unknown, E = unknown>(
    key: QueryKey,
    endpoint: string,
    options?: UseQueryOptions<GitHubResponse<T>, E> & { fetcherOptions?: GitHubFetcherOptions }
) {
    return useQuery<GitHubResponse<T>, E>({
        queryKey: key,
        queryFn: () => githubFetch<T>('GET', endpoint, undefined, options?.fetcherOptions),
        ...options
    })
}

export function useGitHubMutation<T = unknown, V = any, E = unknown>(
    method: 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    options?: UseMutationOptions<GitHubResponse<T>, E, V> & { fetcherOptions?: GitHubFetcherOptions }
) {
    return useMutation<GitHubResponse<T>, E, V>({
        mutationFn: (variables: V) => githubFetch<T>(method, endpoint, variables, options?.fetcherOptions),
        ...options
    })
}

// Convenience hooks
export function useGitHubPost<T = unknown, V = any, E = unknown>(
    endpoint: string,
    options?: UseMutationOptions<GitHubResponse<T>, E, V> & { fetcherOptions?: GitHubFetcherOptions }
) {
    return useGitHubMutation<T, V, E>('POST', endpoint, options)
}

export function useGitHubPut<T = unknown, V = any, E = unknown>(
    endpoint: string,
    options?: UseMutationOptions<GitHubResponse<T>, E, V> & { fetcherOptions?: GitHubFetcherOptions }
) {
    return useGitHubMutation<T, V, E>('PUT', endpoint, options)
}

export function useGitHubDelete<T = unknown, V = any, E = unknown>(
    endpoint: string,
    options?: UseMutationOptions<GitHubResponse<T>, E, V> & { fetcherOptions?: GitHubFetcherOptions }
) {
    return useGitHubMutation<T, V, E>('DELETE', endpoint, options)
}

// --- Class-based API ---
class GitHubFetcher {
    async get<T = unknown>(endpoint: string, options?: GitHubFetcherOptions & { fetchOptions?: RequestInit }) {
        return githubFetch<T>('GET', endpoint, undefined, options)
    }
    async post<T = unknown, V = any>(
        endpoint: string,
        data?: V,
        options?: GitHubFetcherOptions & { fetchOptions?: RequestInit }
    ) {
        return githubFetch<T>('POST', endpoint, data, options)
    }
    async put<T = unknown, V = any>(
        endpoint: string,
        data?: V,
        options?: GitHubFetcherOptions & { fetchOptions?: RequestInit }
    ) {
        return githubFetch<T>('PUT', endpoint, data, options)
    }
    async delete<T = unknown, V = any>(
        endpoint: string,
        data?: V,
        options?: GitHubFetcherOptions & { fetchOptions?: RequestInit }
    ) {
        return githubFetch<T>('DELETE', endpoint, data, options)
    }
}

const githubFetcher = new GitHubFetcher()

export { GitHubFetcher, githubFetcher }
export default githubFetcher
