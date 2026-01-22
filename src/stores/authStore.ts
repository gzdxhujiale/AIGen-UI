import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from '@/api/supabase'
// import { useConfigStore } from '@/stores/configStore'
import { useConfigTeamStore } from '@/stores/config_team_Store'
import { useConfigMenuStore } from '@/stores/config_menu_Store'
import { useConfigPageStore } from '@/stores/config_page_Store'

export const useAuthStore = defineStore('auth', () => {
    // 状态
    const user = ref<User | null>(null)
    const session = ref<Session | null>(null)
    const isLoading = ref(true)
    const error = ref<string | null>(null)

    // style 默认使用 'arco'
    const customUserName = ref('')
    const teamsConfig = ref<any>(null)
    const stylePreference = ref<'shadcn' | 'arco'>('arco') // 默认 Arco Design
    const menuConfig = ref<any[]>([])

    let authSubscription: { unsubscribe: () => void } | null = null

    // 计算属性 (Getters)
    const isAuthenticated = computed(() => !!user.value)

    const userDisplayName = computed(() => {
        if (customUserName.value) return customUserName.value
        if (!user.value) return ''
        return user.value.user_metadata?.full_name ||
            user.value.user_metadata?.name ||
            user.value.email?.split('@')[0] ||
            'User'
    })

    const userEmail = computed(() => user.value?.email || '')

    const userAvatar = computed(() => {
        if (!user.value) return ''
        return user.value.user_metadata?.avatar_url ||
            user.value.user_metadata?.picture ||
            ''
    })

    const DEFAULT_MENU_CONFIG = [
        { type: 'text-button', label: '权限申请' },
        { type: 'dropdown', label: '语言', options: ['中文', 'English'] }
    ]

    // 获取用户配置的辅助函数
    const fetchUserConfigs = async () => {
        try {
            const teamStore = useConfigTeamStore()
            const menuStore = useConfigMenuStore()
            const pageStore = useConfigPageStore()

            // 1. 并行获取团队配置、菜单配置和页面配置
            const [teamsResult, menuResult, pageResult] = await Promise.all([
                teamStore.loadTeams(),
                menuStore.loadMenu(),
                pageStore.loadPageConfigs()
            ])

            const { success: teamsSuccess, message: teamsError } = teamsResult
            const { success: menuSuccess, message: menuError } = menuResult
            const { success: pageSuccess, message: pageError } = pageResult

            if (!teamsSuccess) {
                console.error('获取团队配置失败:', teamsError)
            }

            if (teamStore.teams.length > 0) {
                teamsConfig.value = teamStore.teams
            } else {
                // 如果为空（理论上 loadTeams 已处理默认值，但这里做双重保险）
                teamsConfig.value = [{
                    id: 'team-default',
                    name: 'AIGen-UI',
                    logo: 'IconMosaic',
                    role: 'online',
                    permissions: ['read']
                }]
            }

            if (!menuSuccess) {
                console.error('获取应用设置失败:', menuError)
            }

            if (!pageSuccess) {
                console.error('获取页面配置失败:', pageError)
            }

            if (menuStore.menuConfig && menuStore.menuConfig.items) {
                menuConfig.value = menuStore.menuConfig.items
            } else {
                // 使用默认菜单配置
                menuConfig.value = JSON.parse(JSON.stringify(DEFAULT_MENU_CONFIG))
            }
        } catch (e) {
            console.error('获取用户配置失败:', e)
        }
    }


    /**
     * 更新用户个人资料配置
     */
    const updateUserProfile = async (name: string, teams: any, style?: 'shadcn' | 'arco', menu?: any[]) => {
        if (!user.value) return { success: false, error: '未登录' }

        try {
            const teamStore = useConfigTeamStore()
            const menuStore = useConfigMenuStore()

            // 更新团队配置
            const { success: teamsSuccess, message: teamsError } = await teamStore.saveTeams()
            if (!teamsSuccess) throw new Error(teamsError)

            const menuToSave = menu || menuConfig.value
            const { success: menuSuccess, message: menuError } = await menuStore.updateMenu({ items: menuToSave })
            if (!menuSuccess) throw new Error(menuError)



            // 更新本地状态
            customUserName.value = name
            teamsConfig.value = teams
            if (style) stylePreference.value = style
            if (menu) menuConfig.value = menu

            return { success: true }
        } catch (err: any) {
            console.error('更新个人资料失败:', err)
            return { success: false, error: err.message }
        }
    }

    /**
     * 仅更新菜单配置
     */
    const updateMenuConfig = async (menu: any[]) => {
        return updateUserProfile(
            customUserName.value,
            teamsConfig.value,
            stylePreference.value,
            menu
        )
    }

    // Actions

    /**
     * 初始化认证状态并设置监听器
     */
    const initialize = async () => {
        isLoading.value = true
        error.value = null

        try {
            // 获取当前会话
            const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession()

            if (sessionError) {
                console.error('获取会话失败:', sessionError)
                error.value = sessionError.message
            } else {
                session.value = currentSession
                user.value = currentSession?.user ?? null

                // 如果已登录，获取用户配置
                if (user.value) {
                }
            }

            // 设置认证状态变更监听器
            if (authSubscription) {
                authSubscription.unsubscribe()
            }

            const { data: { subscription } } = supabase.auth.onAuthStateChange(
                async (event: AuthChangeEvent, newSession: Session | null) => {
                    console.log('认证状态变更:', event)
                    session.value = newSession
                    user.value = newSession?.user ?? null

                    if (event === 'SIGNED_IN' && user.value) {
                        await fetchUserConfigs()
                    } else if (event === 'SIGNED_OUT') {
                        error.value = null
                        customUserName.value = ''
                        teamsConfig.value = null
                    }
                }
            )
            authSubscription = subscription

        } catch (err: any) {
            console.error('初始化认证失败:', err)
            error.value = err.message || '初始化认证失败'
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 使用邮箱和密码登录
     */
    const signInWithPassword = async (email: string, password: string) => {
        isLoading.value = true
        error.value = null

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (signInError) {
                error.value = signInError.message
                return { success: false, error: signInError.message }
            }

            return { success: true, data }
        } catch (err: any) {
            error.value = err.message || '登录失败'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 使用邮箱和密码注册
     */
    const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
        isLoading.value = true
        error.value = null

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata
                }
            })

            if (signUpError) {
                error.value = signUpError.message
                return { success: false, error: signUpError.message }
            }

            if (data.user && !data.session) {
                return {
                    success: true,
                    data,
                    message: '请检查您的邮箱以确认注册。'
                }
            }

            return { success: true, data }
        } catch (err: any) {
            error.value = err.message || '注册失败'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 退出登录
     */
    const signOut = async () => {
        isLoading.value = true
        error.value = null

        try {
            const { error: signOutError } = await supabase.auth.signOut()

            if (signOutError) {
                error.value = signOutError.message
                return { success: false, error: signOutError.message }
            }

            user.value = null
            session.value = null
            return { success: true }
        } catch (err: any) {
            error.value = err.message || '退出失败'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 重置密码 - 发送重置邮件
     */
    const resetPassword = async (email: string) => {
        isLoading.value = true
        error.value = null

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`
            })

            if (resetError) {
                error.value = resetError.message
                return { success: false, error: resetError.message }
            }

            return { success: true, message: '密码重置邮件已发送，请检查您的邮箱。' }
        } catch (err: any) {
            error.value = err.message || '密码重置失败'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 清理订阅
     */
    const cleanup = () => {
        if (authSubscription) {
            authSubscription.unsubscribe()
            authSubscription = null
        }
    }

    return {
        // State
        user,
        session,
        isLoading,
        error,
        customUserName,
        teamsConfig,
        stylePreference,
        menuConfig,
        // Getters
        isAuthenticated,
        userDisplayName,
        userEmail,
        userAvatar,
        // Actions
        initialize,
        signInWithPassword,
        signUp,
        signOut,
        resetPassword,
        updateUserProfile,
        updateMenuConfig,
        fetchUserConfigs, // Expose for parallel loading
        cleanup
    }
})
