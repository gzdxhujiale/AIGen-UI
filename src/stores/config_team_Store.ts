import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/api/supabase'
import { toast } from 'vue-sonner'
import type { TeamItem } from '@/types/navigation'
import * as Icons from 'lucide-vue-next'

const DEFAULT_TEAM_CONFIG: TeamItem[] = [
    {
        name: 'AIGen-UI',
        logo: Icons.GalleryVerticalEnd as any, // 匹配原有逻辑，虽然 SQL 里默认是 IconMosaic
        plan: 'online', // SQL 里是 role，类型里是 plan，需要对齐
        permissions: { navMain: 'all', projects: 'all' } // 类型里是对象，SQL 默认里是数组，需要对齐类型
    }
]

export const useConfigTeamStore = defineStore('config-team', () => {
    const teams = ref<TeamItem[]>([])
    const isLoaded = ref(false)
    const isLoading = ref(false)

    /**
     * 加载团队配置
     */
    async function loadTeams() {
        isLoading.value = true
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return { success: false, message: '用户未登录' }

            const { data, error } = await supabase
                .from('team_configs')
                .select('team_config')
                .eq('user_id', user.id)
                .maybeSingle()

            if (error) throw error

            if (data?.team_config) {
                teams.value = data.team_config
            } else {
                // 如果云端没数据，使用默认值
                teams.value = JSON.parse(JSON.stringify(DEFAULT_TEAM_CONFIG))
                // 自动保存初始默认值
                await saveTeams()
            }
            isLoaded.value = true
            return { success: true }
        } catch (error: any) {
            console.error('加载团队配置失败:', error)
            toast.error('加载团队配置失败: ' + error.message)
            return { success: false, message: error.message }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 保存团队配置
     */
    async function saveTeams() {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return { success: false, message: '用户未登录' }

            // 转换图标为字符串进行持久化，如果 logo 是组件
            const serializedTeams = teams.value.map(team => ({
                ...team,
                logo: typeof team.logo === 'string' ? team.logo : (team.logo as any)?.name || 'GalleryVerticalEnd'
            }))

            const { error } = await supabase
                .from('team_configs')
                .upsert({
                    user_id: user.id,
                    team_config: serializedTeams,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' })

            if (error) throw error
            return { success: true }
        } catch (error: any) {
            console.error('保存团队配置失败:', error)
            return { success: false, message: error.message }
        }
    }

    /**
     * 添加团队
     */
    async function addTeam(team: TeamItem) {
        teams.value.push(team)
        return await saveTeams()
    }

    /**
     * 更新团队
     */
    async function updateTeam(index: number, updates: Partial<TeamItem>) {
        if (teams.value[index]) {
            teams.value[index] = { ...teams.value[index], ...updates }
            return await saveTeams()
        }
        return { success: false, message: '团队不存在' }
    }

    /**
     * 删除团队
     */
    async function deleteTeam(index: number) {
        if (teams.value[index]) {
            teams.value.splice(index, 1)
            return await saveTeams()
        }
        return { success: false, message: '团队不存在' }
    }

    return {
        teams,
        isLoaded,
        isLoading,
        loadTeams,
        saveTeams,
        addTeam,
        updateTeam,
        deleteTeam
    }
})
