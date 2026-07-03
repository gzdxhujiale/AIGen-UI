import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchApi } from '@/api/request'
import { toast } from 'vue-sonner'
import type { MenuConfig } from '@/types'

const DEFAULT_MENU_CONFIG: MenuConfig = {
    items: [{ type: 'text-button', label: '权限申请' }, { type: 'dropdown', label: '语言', options: ['中文', 'English'] }]
}

export const useConfigMenuStore = defineStore('config-menu', () => {
    const menuConfig = ref<MenuConfig>(DEFAULT_MENU_CONFIG)
    const isLoaded = ref(false), isLoading = ref(false)
    const CACHE_KEY = 'aigen_menu_config_cache'

    const _runAction = async (fn: () => Promise<any>, silent = false) => {
        if (!silent) isLoading.value = true
        try {
            const res = await fn()
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

    const saveMenu = () => _runAction(async () => {
        await fetchApi('/configs/menu', {
            method: 'POST',
            body: JSON.stringify({ menu_config: menuConfig.value })
        })
    })

    const loadMenu = () => _runAction(async () => {
        const { data } = await fetchApi('/configs/menu')
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
