import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/api/supabase'
import { toast } from 'vue-sonner'
import type { MenuConfig } from '@/types'

const DEFAULT_MENU_CONFIG: MenuConfig = {
    items: [
        {
            type: 'text-button',
            label: '权限申请'
        },
        {
            type: 'dropdown',
            label: '语言',
            options: [
                '中文',
                'English'
            ]
        }
    ]
}

export const useConfigMenuStore = defineStore('config-menu', () => {
    const menuConfig = ref<MenuConfig>(DEFAULT_MENU_CONFIG)
    const isLoaded = ref(false)
    const isLoading = ref(false)
    const CACHE_KEY = 'aigen_menu_config_cache'

    /**
     * 从本地缓存加载 (同步)
     */
    function loadFromCache() {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
            try {
                menuConfig.value = JSON.parse(cached)
                isLoaded.value = true
            } catch (e) {
                console.error('Failed to parse menu config cache', e)
            }
        }
    }

    /**
     * 加载菜单配置
     */
    async function loadMenu() {
        isLoading.value = true
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return { success: false, message: '用户未登录' }

            const { data, error } = await supabase
                .from('menu_configs')
                .select('menu_config')
                .eq('user_id', user.id)
                .maybeSingle()

            if (error) throw error

            if (data?.menu_config) {
                menuConfig.value = data.menu_config
                // 更新缓存
                localStorage.setItem(CACHE_KEY, JSON.stringify(menuConfig.value))
            } else {
                // 如果云端没数据，使用默认值
                menuConfig.value = JSON.parse(JSON.stringify(DEFAULT_MENU_CONFIG))
                // 自动保存初始默认值
                await saveMenu()
            }
            isLoaded.value = true
            return { success: true }
        } catch (error: any) {
            console.error('加载菜单配置失败:', error)
            toast.error('加载菜单配置失败: ' + error.message)
            return { success: false, message: error.message }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 保存菜单配置
     */
    async function saveMenu() {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return { success: false, message: '用户未登录' }

            const { error } = await supabase
                .from('menu_configs')
                .upsert({
                    user_id: user.id,
                    menu_config: menuConfig.value,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' })

            // 乐观更新缓存
            localStorage.setItem(CACHE_KEY, JSON.stringify(menuConfig.value))

            if (error) throw error
            return { success: true }
        } catch (error: any) {
            console.error('保存菜单配置失败:', error)
            return { success: false, message: error.message }
        }
    }

    /**
     * 更新组件配置 (通用)
     */
    async function updateMenu(newConfig: MenuConfig) {
        menuConfig.value = newConfig
        return await saveMenu()
    }

    return {
        menuConfig,
        isLoaded,
        isLoading,
        loadFromCache,
        loadMenu,
        saveMenu,
        updateMenu
    }
})
