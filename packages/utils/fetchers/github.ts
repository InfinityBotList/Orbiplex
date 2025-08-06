interface GitHubFetcherOptions {
    baseURL?: string
    userAgent?: string
    authToken?: string
}

const defaultOptions: GitHubFetcherOptions = {
    baseURL: 'https://api.github.com',
    userAgent: 'InfinityBotList',
    authToken: process.env.GITHUB_TOKEN
}

export interface GitHubResponse<T> {
    data: T
    headers: Record<string, string>
    status: number
}

/**
 * Fetch function for GitHub API.
 * Designed to work directly with TanStack Query.
 */
export async function fetchGitHub<T>(
    endpoint: string,
    options: GitHubFetcherOptions = defaultOptions,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
): Promise<GitHubResponse<T>> {
    if (!options.authToken) {
        throw new Error('GitHub token not configured. Please set GITHUB_TOKEN environment variable.')
    }

    const url = `${options.baseURL}${endpoint}`
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': options.userAgent || 'FixFX-Wiki',
        'Authorization': `Bearer ${options.authToken}`,
        'Content-Type': 'application/json'
    }

    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    })

    const jsonData = await response.json().catch(() => ({}))

    if (!response.ok) {
        const message = jsonData?.message || response.statusText
        switch (response.status) {
            case 401:
            case 403:
                throw new Error(`GitHub Authentication Error: ${message}`)
            case 404:
                throw new Error(`GitHub Resource Not Found: ${message}`)
            case 429:
                const resetTime = response.headers.get('x-ratelimit-reset')
                const retryAfter = resetTime ? new Date(parseInt(resetTime) * 1000) : 'unknown'
                throw new Error(`GitHub Rate Limit Exceeded. Retry after ${retryAfter}`)
            default:
                throw new Error(`GitHub API Error (${response.status}): ${message}`)
        }
    }

    return {
        data: jsonData,
        headers: Object.fromEntries(response.headers.entries()),
        status: response.status
    }
}
