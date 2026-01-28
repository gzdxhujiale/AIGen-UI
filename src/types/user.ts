import type { Component } from 'vue'

export interface UserTeam {
    name: string
    logo: Component
    plan: 'free' | 'online' | 'enterprise'
    permissions: {
        navMain: string[]
    }
}

export interface UserProfileState {
    userName: string
    avatarUrl: string
    teams: UserTeam[]
}
