// ============================================
// Supabase 分类配置存储服务
// ============================================
import { supabase } from '@/api/supabase'
import type { NavGroup, TeamItem, Page1ConfigData } from '@/types'

// 配置类别枚举
export type ConfigCategory = 'navigation' | 'page' | 'app_settings' | 'team'

// 资源标识符
export type ResourceId =
    | 'nav-main'           // 主导航配置
    | `page-${string}`     // 页面配置 (page-xxx)
    | 'top-bar'            // 顶部栏设置
    | 'team-list'          // 团队列表
    | 'user-preferences'   // 用户偏好设置

export class SupabaseConfigService {

    private userId: string | null = null

    /**
     * 初始化服务，获取当前用户 ID
     */
    async init(): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            this.userId = user.id
            return true
        }
        return false
    }

    /**
     * 保存单个配置项
     */
    async saveConfig(
        category: ConfigCategory,
        resourceId: ResourceId,
        content: any
    ): Promise<{ success: boolean; error?: string }> {
        if (!this.userId) {
            return { success: false, error: '用户未登录' }
        }

        const { error } = await supabase
            .from('user_configs')
            .upsert({
                user_id: this.userId,
                category,
                resource_id: resourceId,
                content,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'user_id,category,resource_id'
            })

        if (error) {
            console.error('保存配置失败:', error)
            return { success: false, error: error.message }
        }

        return { success: true }
    }

    /**
     * 加载单个配置项
     */
    async loadConfig<T = any>(
        category: ConfigCategory,
        resourceId: ResourceId
    ): Promise<{ data: T | null; error?: string }> {
        if (!this.userId) {
            return { data: null, error: '用户未登录' }
        }

        const { data, error } = await supabase
            .from('user_configs')
            .select('content')
            .eq('user_id', this.userId)
            .eq('category', category)
            .eq('resource_id', resourceId)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return { data: null } // 记录不存在
            }
            return { data: null, error: error.message }
        }

        return { data: data?.content as T }
    }

    /**
     * 加载某个类别下的所有配置
     */
    async loadCategoryConfigs<T = any>(
        category: ConfigCategory
    ): Promise<{ data: Record<string, T>; error?: string }> {
        if (!this.userId) {
            return { data: {}, error: '用户未登录' }
        }

        const { data, error } = await supabase
            .from('user_configs')
            .select('resource_id, content')
            .eq('user_id', this.userId)
            .eq('category', category)

        if (error) {
            return { data: {}, error: error.message }
        }

        const result: Record<string, T> = {}
        for (const row of data || []) {
            result[row.resource_id] = row.content as T
        }

        return { data: result }
    }

    /**
     * 删除配置项
     */
    async deleteConfig(
        category: ConfigCategory,
        resourceId: ResourceId
    ): Promise<{ success: boolean; error?: string }> {
        if (!this.userId) {
            return { success: false, error: '用户未登录' }
        }

        const { error } = await supabase
            .from('user_configs')
            .delete()
            .eq('user_id', this.userId)
            .eq('category', category)
            .eq('resource_id', resourceId)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    }

    // ============================================
    // 业务层便捷方法
    // ============================================

    /**
     * 保存导航配置
     */
    async saveNavigation(navGroups: NavGroup[]): Promise<{ success: boolean; error?: string }> {
        return this.saveConfig('navigation', 'nav-main', navGroups)
    }

    /**
     * 加载导航配置
     */
    async loadNavigation(): Promise<{ data: NavGroup[] | null; error?: string }> {
        return this.loadConfig<NavGroup[]>('navigation', 'nav-main')
    }

    /**
     * 保存页面配置
     */
    async savePageConfig(
        pageId: string,
        config: Page1ConfigData
    ): Promise<{ success: boolean; error?: string }> {
        return this.saveConfig('page', `page-${pageId}` as ResourceId, config)
    }

    /**
     * 加载单个页面配置
     */
    async loadPageConfig(pageId: string): Promise<{ data: Page1ConfigData | null; error?: string }> {
        return this.loadConfig<Page1ConfigData>('page', `page-${pageId}` as ResourceId)
    }

    /**
     * 加载所有页面配置
     */
    async loadAllPageConfigs(): Promise<{ data: Record<string, Page1ConfigData>; error?: string }> {
        const result = await this.loadCategoryConfigs<Page1ConfigData>('page')

        // 移除 resource_id 前缀 "page-"
        const cleaned: Record<string, Page1ConfigData> = {}
        for (const [key, value] of Object.entries(result.data)) {
            const pageId = key.replace(/^page-/, '')
            cleaned[pageId] = value
        }

        return { data: cleaned, error: result.error }
    }

    /**
     * 保存团队列表
     */
    async saveTeams(teams: TeamItem[]): Promise<{ success: boolean; error?: string }> {
        return this.saveConfig('team', 'team-list', teams)
    }

    /**
     * 加载团队列表
     */
    async loadTeams(): Promise<{ data: TeamItem[] | null; error?: string }> {
        return this.loadConfig<TeamItem[]>('team', 'team-list')
    }

    /**
     * 保存应用设置
     */
    async saveAppSettings(settings: Record<string, any>): Promise<{ success: boolean; error?: string }> {
        return this.saveConfig('app_settings', 'top-bar', settings)
    }

    /**
     * 加载应用设置
     */
    async loadAppSettings(): Promise<{ data: Record<string, any> | null; error?: string }> {
        return this.loadConfig('app_settings', 'top-bar')
    }
}

// 导出单例
export const supabaseConfigService = new SupabaseConfigService()

