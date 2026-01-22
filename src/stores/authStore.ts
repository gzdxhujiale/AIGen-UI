import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from '@/api/supabase'
import { useConfigStore } from '@/stores/configStore'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref<User | null>(null)
    const session = ref<Session | null>(null)
    const isLoading = ref(true)
    const error = ref<string | null>(null)

    // Custom user config state
    // 注意: user_name 和 style 字段已从 user_configs 表移除
    // user_name 改用 Users 表的 display_name
    // style 默认使用 'arco'
    const customUserName = ref('')
    const teamsConfig = ref<any>(null)
    const stylePreference = ref<'shadcn' | 'arco'>('arco') // 默认 Arco Design
    const menuConfig = ref<any[]>([])

    let authSubscription: { unsubscribe: () => void } | null = null

    // Getters
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

    // Helper to fetch user configs
    // 注意: user_name, style, menu_config 字段已从 user_configs 表移除
    // 配置现在由 configStore 的分类存储管理
    const fetchUserConfigs = async () => {
        try {
            const configStore = useConfigStore()

            // 1. 并行获取团队配置和菜单配置
            const [teamsResult, appSettingsResult] = await Promise.all([
                configStore.loadTeams(),
                configStore.loadAppSettings()
            ])

            const { data: teamsData, error: teamsError } = teamsResult
            const { data: appSettingsData, error: appSettingsError } = appSettingsResult

            if (teamsError) {
                console.error('Error fetching teams config:', teamsError)
            }

            if (teamsData) {
                teamsConfig.value = teamsData
            } else {
                // 使用默认团队配置
                teamsConfig.value = [{
                    id: 'team-default',
                    name: 'AIGen-UI',
                    logo: 'IconMosaic',
                    role: 'online',
                    permissions: ['read']
                }]
            }

            if (appSettingsError) {
                console.error('Error fetching app settings:', appSettingsError)
            }

            if (appSettingsData && appSettingsData.items) {
                menuConfig.value = appSettingsData.items
            } else {
                // 使用默认菜单配置
                menuConfig.value = JSON.parse(JSON.stringify(DEFAULT_MENU_CONFIG))
            }

            // 注意: display_name 通过 userDisplayName computed 从 user_metadata 获取
        } catch (e) {
            console.error('Failed to fetch user configs:', e)
        }
    }

    // Actions
    // ... (rest of actions unchanged until update)

    /**
     * Update user profile configuration
     * 注意: user_name, style 已从 user_configs 移除
     * 使用 supabaseConfigService 的分类存储
     */
    const updateUserProfile = async (name: string, teams: any, style?: 'shadcn' | 'arco', menu?: any[]) => {
        if (!user.value) return { success: false, error: 'Not authenticated' }

        try {
            const configStore = useConfigStore()

            // 更新团队配置
            const { error: teamsError } = await configStore.saveTeams(teams)
            if (teamsError) throw new Error(teamsError)

            // 更新菜单配置 (app_settings)
            // 如果传入了 menu，则保存；否则保存当前的 menuConfig
            const menuToSave = menu || menuConfig.value
            // 包装在 items 属性中以匹配预期结构
            const { error: menuError } = await configStore.saveAppSettings({ items: menuToSave })
            if (menuError) throw new Error(menuError)



            // 更新本地状态
            customUserName.value = name
            teamsConfig.value = teams
            if (style) stylePreference.value = style
            if (menu) menuConfig.value = menu

            return { success: true }
        } catch (err: any) {
            console.error('Error updating profile:', err)
            return { success: false, error: err.message }
        }
    }

    /**
     * Update only menu configuration
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
     * Initialize auth state and set up listener
     */
    const initialize = async () => {
        isLoading.value = true
        error.value = null

        try {
            // Get current session
            const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession()

            if (sessionError) {
                console.error('Error getting session:', sessionError)
                error.value = sessionError.message
            } else {
                session.value = currentSession
                user.value = currentSession?.user ?? null

                // Fetch user configs if logged in
                if (user.value) {
                    const configStore = useConfigStore()
                    await configStore.initSupabase()
                    // Refactor: We moved fetchUserConfigs to App.vue for parallel executio
                    // await fetchUserConfigs()
                }
            }

            // Set up auth state change listener
            if (authSubscription) {
                authSubscription.unsubscribe()
            }

            const { data: { subscription } } = supabase.auth.onAuthStateChange(
                async (event: AuthChangeEvent, newSession: Session | null) => {
                    console.log('Auth state changed:', event)
                    session.value = newSession
                    user.value = newSession?.user ?? null

                    if (event === 'SIGNED_IN' && user.value) {
                        const configStore = useConfigStore()
                        await configStore.initSupabase()
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
            console.error('Error initializing auth:', err)
            error.value = err.message || 'Failed to initialize authentication'
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Sign in with email and password
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
            error.value = err.message || 'Sign in failed'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Sign up with email and password
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
            error.value = err.message || 'Sign up failed'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Sign out the current user
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
            error.value = err.message || 'Sign out failed'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Reset password - sends reset email
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
            error.value = err.message || 'Password reset failed'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Cleanup subscriptions
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

