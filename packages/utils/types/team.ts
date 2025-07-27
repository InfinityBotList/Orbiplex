export interface TeamMember {
    user: {
        id: string
        username: string
        display_name: string
        avatar: string
        bot: boolean
        status: 'online' | 'offline' | 'dnd' | 'idle'
        flags: string[]
        extra_data: {
            nickname: string
            mutual_guild: string
            preferred_guild: boolean
            public_flags: number
            avatar: {
                exists: boolean
                path: string
                default_path: string
                type: string
                size: number
                last_modified: string
            }
        }
    }
    positions: Array<{
        id: string
        name: string
        role_id: string
        perms: string[]
        created_at: string
        index: number
        corresponding_roles: Array<{
            name: string
            value: string
        }>
        icon: string
    }>
    perm_overrides: any[]
    no_autosync: boolean
    mfa_verified: boolean
    unaccounted: boolean
    created_at: string
}

export interface TeamResponse {
    members: TeamMember[]
}
