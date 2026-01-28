import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/api/supabase'
import { toast } from 'vue-sonner'
import type { TeamItem } from '@/types/navigation'
import * as Icons from 'lucide-vue-next'

const DEFAULT_TEAM_CONFIG: TeamItem[] = [{
    name: 'AIGen-UI',
    logo: Icons.GalleryVerticalEnd as any,
    plan: 'online',
    permissions: { navMain: 'all' }
}]

export const useConfigTeamStore = defineStore('config-team', () => {
    const teams = ref<TeamItem[]>([])
    const isLoaded = ref(false), isLoading = ref(false)
    const CACHE_KEY = 'aigen_team_config_cache'

    const _runAction = async (fn: (uid: string) => Promise<any>, silent = false) => {
        if (!silent) isLoading.value = true
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('用户未登录')
            const res = await fn(user.id)
            localStorage.setItem(CACHE_KEY, JSON.stringify(teams.value))
            return { success: true, data: res }
        } catch (e: any) {
            if (!silent) toast.error(e.message)
            return { success: false, message: e.message }
        } finally { isLoading.value = false }
    }

    const loadFromCache = () => {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) { teams.value = JSON.parse(cached); isLoaded.value = true }
    }

    const saveTeams = () => _runAction(async (uid) => {
        const serialized = teams.value.map(t => ({ ...t, logo: typeof t.logo === 'string' ? t.logo : (t.logo as any)?.name || 'GalleryVerticalEnd' }))
        const { error } = await supabase.from('team_configs').upsert({
            user_id: uid, team_config: serialized, updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })
        if (error) throw error
    })

    const loadTeams = () => _runAction(async (uid) => {
        const { data, error } = await supabase.from('team_configs').select('team_config').eq('user_id', uid).maybeSingle()
        if (error) throw error
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
