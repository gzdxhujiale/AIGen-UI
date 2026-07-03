import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchApi } from '@/api/request'
import { toast } from 'vue-sonner'
import type { TeamItem } from '@/types/navigation'
import * as Icons from 'lucide-vue-next'

const DEFAULT_TEAM_CONFIG: TeamItem[] = [{
    name: 'AIGen-UI',
    logo: Icons.GalleryVerticalEnd,
    plan: 'online',
    permissions: { navMain: 'all' }
}]

export const useConfigTeamStore = defineStore('config-team', () => {
    const teams = ref<TeamItem[]>([])
    const isLoaded = ref(false), isLoading = ref(false)
    const CACHE_KEY = 'aigen_team_config_cache'

    const _runAction = async (fn: () => Promise<any>, silent = false) => {
        if (!silent) isLoading.value = true
        try {
            const res = await fn()
            localStorage.setItem(CACHE_KEY, JSON.stringify(teams.value))
            return { success: true, data: res }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e)
            if (!silent) toast.error(msg)
            return { success: false, message: msg }
        } finally { isLoading.value = false }
    }

    const loadFromCache = () => {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) { teams.value = JSON.parse(cached); isLoaded.value = true }
    }

    const saveTeams = () => _runAction(async () => {
        const serialized = teams.value.map(t => ({ ...t, logo: typeof t.logo === 'string' ? t.logo : (t.logo as any)?.name || 'GalleryVerticalEnd' }))
        await fetchApi('/configs/team', {
            method: 'POST',
            body: JSON.stringify({ team_config: serialized })
        })
    })

    const loadTeams = () => _runAction(async () => {
        const { data } = await fetchApi('/configs/team')
        if (data?.team_config) teams.value = data.team_config
        else { teams.value = JSON.parse(JSON.stringify(DEFAULT_TEAM_CONFIG)); await saveTeams() }
        isLoaded.value = true
    })

    const addTeam = (team: TeamItem) => { teams.value.push(team); return saveTeams() }
    const updateTeam = (idx: number, up: Partial<TeamItem>) => {
        if (!teams.value[idx]) return { success: false, message: '不存在' }
        teams.value[idx] = { ...teams.value[idx], ...up }; return saveTeams()
    }
    const deleteTeam = (idx: number) => {
        if (!teams.value[idx]) return { success: false, message: '不存在' }
        teams.value.splice(idx, 1); return saveTeams()
    }

    return { teams, isLoaded, isLoading, loadFromCache, loadTeams, saveTeams, addTeam, updateTeam, deleteTeam }
})
