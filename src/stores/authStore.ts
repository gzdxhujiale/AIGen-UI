import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref<User | null>(null)
    const session = ref<Session | null>(null)
    const isLoading = ref(true)
    const error = ref<string | null>(null)

    // Custom user config state
    const customUserName = ref('')
    const teamsConfig = ref<any>(null)
    const stylePreference = ref<'shadcn' | 'arco'>('shadcn')
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
    const fetchUserConfigs = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('user_configs')
                .select('user_name, teams_config, style, menu_config')
                .eq('user_id', userId)
                .single()

            if (error) {
                if (error.code === 'PGRST116') { // code for no rows found
                    console.log('No user_config found, using defaults')
                    // Not persisting creates, just using defaults in memory for now until save
                    menuConfig.value = JSON.parse(JSON.stringify(DEFAULT_MENU_CONFIG))
                } else {
                    console.error('Error fetching user_configs:', error)
                }
                return
            }

            if (data) {
                customUserName.value = data.user_name || ''
                // 如果 teams_config 为空，使用默认配置
                teamsConfig.value = data.teams_config && data.teams_config.length > 0
                    ? data.teams_config
                    : [{
                        id: 'team-default',
                        name: 'AIGen-UI',
                        logo: 'IconMosaic',
                        role: 'online',
                        permissions: ['read']
                    }]
                stylePreference.value = data.style || 'shadcn'

                menuConfig.value = data.menu_config && data.menu_config.length > 0
                    ? data.menu_config
                    : JSON.parse(JSON.stringify(DEFAULT_MENU_CONFIG))
            }
        } catch (e) {
            console.error('Failed to fetch user configs:', e)
        }
    }

    // Actions
    // ... (rest of actions unchanged until update)

    /**
     * Update user profile configuration
     */
    const updateUserProfile = async (name: string, teams: any, style?: 'shadcn' | 'arco', menu?: any[]) => {
        if (!user.value) return { success: false, error: 'Not authenticated' }

        try {
            const updates: any = {
                user_id: user.value.id,
                user_name: name,
                teams_config: teams,
                updated_at: new Date().toISOString()
            }

            if (style) {
                updates.style = style
            }

            if (menu) {
                updates.menu_config = menu
            } else {
                // If not provided, keep current? or pass current? 
                // Better to pass current value ensuring we don't erase it if called from somewhere else
                updates.menu_config = menuConfig.value
            }

            const { error: upsertError } = await supabase
                .from('user_configs')
                .upsert(updates, { onConflict: 'user_id' })

            if (upsertError) throw upsertError

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
                    await fetchUserConfigs(user.value.id)
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
                        await fetchUserConfigs(user.value.id)
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
        cleanup
    }
})
