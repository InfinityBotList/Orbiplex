export interface ServersIndex {
    certified: ServerIndexStructure[]
    premium: ServerIndexStructure[]
    most_viewed: ServerIndexStructure[]
    top_voted: ServerIndexStructure[]
    recently_added: ServerIndexStructure[]
}

export interface ServerIndexStructure {
    server_id: string
    name: string
    total_members: number
    online_members: number
    short: string
    state: string
    type: string
    vanity: string
    vanity_ref: string
    votes: number
    approximate_votes: number
    invite_clicks: number
    clicks: number
    nsfw: boolean
    tags: [string]
    premium: boolean
    avatar: {
        exists: boolean
        path: string
        default_path: string
        last_modified: string
        size: number
        type: string
    }
    banner: {
        exists: boolean
        path: string
        default_path: string
        type: string
        errors: [string]
    }
}
