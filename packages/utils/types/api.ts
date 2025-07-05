// API response types for the search functionality

export interface User {
    id: string
    username: string
    discriminator: string
    avatar: string
    bot: boolean
}

export interface Avatar {
    exists: boolean
    path: string
    default_path: string
}

export interface Banner {
    exists: boolean
    path: string
    default_path: string
}

export interface Bot {
    bot_id: string
    user: User
    description: string
    long_description: string
    avatar: Avatar
    banner: Banner
    verified: boolean
    premium: boolean
    votes: number
    stars: number
    servers: number
    tags: string[]
    invite: string
    website?: string
    support_server?: string
    github?: string
    donate?: string
    privacy_policy?: string
    terms_of_service?: string
    created_at: string
    updated_at: string
}

export interface Server {
    server_id: string
    name: string
    short: string
    description: string
    avatar: Avatar
    banner: Banner
    invite_url: string
    type: boolean // verified
    total_members: number
    online_members: number
    stars: number
    tags: string[]
    vanity_url?: string
    nsfw: boolean
    created_at: string
    updated_at: string
}

export interface SearchResponse {
    bots: Bot[]
    servers: Server[]
    target_types: string[]
}

export interface StatsResponse {
    total_bots: number
    total_approved_bots: number
    total_packs: number
    total_users: number
    total_votes: number
}

export interface IndexResponse {
    top_voted: Bot[]
    new_bots: Bot[]
    featured_bots: Bot[]
    random_bots: Bot[]
}
