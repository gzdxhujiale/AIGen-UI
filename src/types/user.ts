import type { TeamItem } from './navigation'

export interface UserProfileState {
    userName: string
    avatarUrl: string
    teams: TeamItem[]
}
