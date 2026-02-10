import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/api/supabase'
import { toast } from 'vue-sonner'
import type { MenuConfig } from '@/types'

const DEFAULT_MENU_CONFIG: MenuConfig = {
    items: [{ type: 'text-button', label: '权限申请' }, { type: 'dropdown', label: '语言', options: ['中文', 'English'] }]
}

export const useConfigMenuStore = defineStore('config-menu', () => {
    const menuConfig = ref<MenuConfig>(DEFAULT_MENU_CONFIG)
    const isLoaded = ref(false), isLoading = ref(false)
    const CACHE_KEY = 'aigen_menu_config_cache'

    const _runAction = async (fn: (userId: string) => Promise<any>, silent = false) => {
        if (!silent) isLoading.value = true
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('用户未登录')
            const res = await fn(user.id)
            localStorage.setItem(CACHE_KEY, JSON.stringify(menuConfig.value))
            return { success: true, data: res }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e)
            if (!silent) toast.error(msg)
            return { success: false, message: msg }
        } finally { isLoading.value = false }
    }

    const loadFromCache = () => {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) { menuConfig.value = JSON.parse(cached); isLoaded.value = true }
    }

    const saveMenu = () => _runAction(async (uid) => {
        const { error } = await supabase.from('menu_configs').upsert({
            user_id: uid, menu_config: menuConfig.value, updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })
        if (error) throw error
    })

    const loadMenu = () => _runAction(async (uid) => {
        const { data, error } = await supabase.from('menu_configs').select('menu_config').eq('user_id', uid).maybeSingle()
        if (error) throw error
        if (data?.menu_config) menuConfig.value = data.menu_config
        else { menuConfig.value = JSON.parse(JSON.stringify(DEFAULT_MENU_CONFIG)); await saveMenu() }
        isLoaded.value = true
    })

    const updateMenu = async (newConfig: MenuConfig) => {
        menuConfig.value = newConfig
        return await saveMenu()
    }

    return { menuConfig, isLoaded, isLoading, loadFromCache, loadMenu, saveMenu, updateMenu }
})
