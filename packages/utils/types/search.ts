export interface SearchRequest {
    query: string
    servers?: {
        from: number
        to: number
    }
    shards?: {
        from: number
        to: number
    }
    tags?: {
        tag_mode: string
        tags: string[]
    }
    target_types?: string[]
    total_members?: {
        from: number
        to: number
    }
    votes?: {
        from: number
        to: number
    }
}

export interface SearchBotResult {
    bot_id: string
    approximate_votes: number
    banner: {
        default_path: string
        errors: string[]
        exists: boolean
        last_modified: string | null
        path: string
        size: number
        type: string
    } | null
    clicks: number
    created_at: string
    invite_clicks: number
    library: string
    nsfw: boolean
    premium: boolean
    servers: number
    shards: number
    short: string
    tags: string[]
    type: string
    user: {
        avatar: string
        bot: boolean
        display_name: string
        extra_data: {
            [key: string]: any
        }
        flags: string[]
        id: string
        status: string
        username: string
    } | null
    vanity: string
    vanity_ref: string
    votes: number
}

export interface SearchServerResult {
    server_id: string
    approximate_votes: number
    avatar: {
        default_path: string
        errors: string[]
        exists: boolean
        last_modified: string | null
        path: string
        size: number
        type: string
    } | null
    banner: {
        default_path: string
        errors: string[]
        exists: boolean
        last_modified: string | null
        path: string
        size: number
        type: string
    } | null
    clicks: number
    invite_clicks: number
    name: string
    nsfw: boolean
    online_members: number
    premium: boolean
    short: string
    state: string
    tags: string[]
    total_members: number
    type: string
    vanity: string
    vanity_ref: string
    votes: number
}

export interface SearchResponse {
    bots: SearchBotResult[]
    servers: SearchServerResult[]
    target_types: string[]
}
