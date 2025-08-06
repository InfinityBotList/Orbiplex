export type UserStatus = 'online' | 'offline' | 'dnd' | 'idle'

export interface TeamMember {
    user: {
        id: string
        username: string
        display_name: string
        avatar: string
        bot: boolean
        status: UserStatus
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
    positions: TeamPosition[]
    perm_overrides: any[]
    no_autosync: boolean
    mfa_verified: boolean
    unaccounted: boolean
    created_at: string
}

export interface TeamPosition {
    id: string
    name: string
    role_id: string
    perms: string[]
    created_at: string
    index: number
    corresponding_roles: Array<{ name: string; value: string }>
    icon: string
}

export interface TeamResponse {
    members: TeamMember[]
}
