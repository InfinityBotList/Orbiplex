export interface BotsIndex {
    packs: []
    certified: BotIndexStructure[]
    premium: BotIndexStructure[]
    most_viewed: BotIndexStructure[]
    recently_added: BotIndexStructure[]
    top_voted: BotIndexStructure[]
}

export interface BotIndexStructure {
    bot_id: string
    clicks: number
    created_at: string
    invite_clicks: number
    library: string
    vanity: string
    vanity_ref: string
    nsfw: boolean
    premium: boolean
    servers: number
    shards: number
    short: string
    votes: number
    type: string
    tags: string[]
    approximate_votes: number
    user: {
        id: string
        bot: boolean
        flags: string[]
        avatar: string
        username: string
        display_name: string
        extra_data: any
        status: string
    }
    banner: {
        path: string
        size: number
        type: string
        exists: boolean
        errors: string[]
        default_path: string
        last_modified: string
    }
}

export interface ExtraLink {
    name: string
    value: string
}

export interface UserData {
    id: string
    username: string
    display_name: string
    avatar: string
    bot: boolean
    status: string
    flags: string[]
    extra_data: {
        cache?: string
        nickname?: string | null
        mutual_guild?: string
        preferred_guild?: boolean
        public_flags?: number
        avatar?: {
            exists: boolean
            path: string
            default_path: string
            type: string
            size: number
            last_modified: string
        }
    }
}

export interface BannerData {
    exists: boolean
    path: string
    default_path: string
    type: string
    size: number
    last_modified: string
}

export interface BotStructure {
    itag: string
    bot_id: string
    client_id: string
    extra_links: ExtraLink[]
    tags: string[]
    prefix: string
    user: UserData
    owner: UserData
    short: string
    library: string
    nsfw: boolean
    premium: boolean
    last_stats_post: string | null
    last_japi_update: string
    servers: number
    shards: number
    shard_list: any[]
    users: number
    votes: number
    approximate_votes: number
    clicks: number
    unique_clicks: number
    invite_clicks: number
    banner: BannerData
    invite: string
    type: string
    vanity_ref: string
    vanity: string
    vote_banned: boolean
    start_premium_period: string
    premium_period_length: string
    cert_reason: string | null
    uptime: number
    total_uptime: number
    uptime_last_checked: string
    approval_note: string
    created_at: string
    claimed_by: string | null
    updated_at: string
    last_claimed: string
    team_owner: string | null
    captcha_opt_out: boolean
    cache_server_uninvitable: any | null
}

export interface BotReviewAuthor {
    id: string
    username: string
    display_name: string
    avatar: string
    bot: boolean
    status: string
    flags: string[] | null
    extra_data: {
        cache?: string
        avatar?: {
            exists: boolean
            path: string
            default_path: string
            type: string
            size: number
            last_modified: string
        }
    }
}

export interface BotReview {
    id: string
    target_type: string
    target_id: string
    author: BotReviewAuthor
    owner_review: boolean
    content: string
    stars: number
    created_at: string
    parent_id: string | null
}

export interface BotReviewsResponse {
    reviews: BotReview[]
}
