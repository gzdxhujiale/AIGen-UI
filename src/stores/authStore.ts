import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from '@/api/supabase'
// import { useConfigStore } from '@/stores/configStore'


export const useAuthStore = defineStore('auth', () => {
    // 状态
    const user = ref<User | null>(null)
    const session = ref<Session | null>(null)
    const isLoading = ref(true)
    const error = ref<string | null>(null)

    // style 默认使用 'arco'
    // style 默认使用 'arco'
    const customUserName = ref('')
    // const teamsConfig = ref<any>(null) // Removed
    // const stylePreference = ref<'shadcn' | 'arco'>('arco') // Removed
    // const menuConfig = ref<any[]>([]) // Removed

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
        const metaAvatar = user.value.user_metadata?.avatar_url || user.value.user_metadata?.picture
        if (metaAvatar) return metaAvatar

        // 默认回退到 avatars 桶下的 ai.svg
        return supabase.storage.from('avatars').getPublicUrl('ai.svg').data.publicUrl
    })



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
                        // Removed: await fetchUserConfigs() - handled by App.vue / layout init
                    } else if (event === 'SIGNED_OUT') {
                        error.value = null
                        customUserName.value = ''
                        // teamsConfig.value = null // Removed
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
     * 更新用户 Metadata (如显示名称)
     */
    const updateUserMetadata = async (metadata: { full_name?: string, avatar_url?: string }) => {
        isLoading.value = true
        error.value = null

        try {
            const { data, error: updateError } = await supabase.auth.updateUser({
                data: metadata
            })

            if (updateError) {
                error.value = updateError.message
                return { success: false, error: updateError.message }
            }

            // 更新成功后，Supabase 返回的数据中包含了最新的用户信息
            user.value = data.user
            return { success: true, data }
        } catch (err: any) {
            error.value = err.message || '更新用户信息失败'
            return { success: false, error: error.value }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 上传头像到 Supabase Storage
     */
    const uploadAvatar = async (file: File) => {
        if (!user.value) return { success: false, error: '用户未登录' }

        isLoading.value = true
        error.value = null

        try {
            const fileExt = file.name.split('.').pop()
            // 采用 用户ID/随机名 的结构，利于 RLS 策略管理
            const filePath = `${user.value.id}/${Math.random()}.${fileExt}`

            // 1. 上传到 avatars bucket
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 2. 获取公开 URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            // 3. 更新用户元数据
            return await updateUserMetadata({ avatar_url: publicUrl })
        } catch (err: any) {
            console.error('上传头像失败:', err)
            error.value = err.message || '上传头像失败'
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
        updateUserMetadata,
        uploadAvatar,
        cleanup
    }
})
