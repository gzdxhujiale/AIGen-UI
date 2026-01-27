import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/api/supabase'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const session = ref<Session | null>(null)
    const isLoading = ref(true)
    const error = ref<string | null>(null)
    const customUserName = ref('')
    let authSubscription: { unsubscribe: () => void } | null = null

    // --- Getters ---
    const isAuthenticated = computed(() => !!user.value)
    const userDisplayName = computed(() =>
        customUserName.value || user.value?.user_metadata?.full_name || user.value?.user_metadata?.name || user.value?.email?.split('@')[0] || 'User'
    )
    const userEmail = computed(() => user.value?.email || '')
    const userAvatar = computed(() => {
        const meta = user.value?.user_metadata
        return meta?.avatar_url || meta?.picture || supabase.storage.from('avatars').getPublicUrl('ai.svg').data.publicUrl
    })

    // --- Private Helper ---
    async function _runAction<T>(fn: () => Promise<T>) {
        isLoading.value = true; error.value = null
        try {
            const data = await fn(); return { success: true, data }
        } catch (e: any) {
            error.value = e.message; return { success: false, error: e.message }
        } finally { isLoading.value = false }
    }

    // --- Actions ---
    const initialize = async () => {
        isLoading.value = true
        const { data: { session: cur } } = await supabase.auth.getSession()
        session.value = cur; user.value = cur?.user ?? null

        authSubscription?.unsubscribe()
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, next) => {
            session.value = next; user.value = next?.user ?? null
            if (event === 'SIGNED_OUT') { error.value = null; customUserName.value = '' }
        })
        authSubscription = subscription; isLoading.value = false
    }

    const signInWithPassword = (email: string, pass: string) =>
        _runAction(async () => {
            const { data, error: err } = await supabase.auth.signInWithPassword({ email, password: pass })
            if (err) throw err; return data
        })

    const signUp = (email: string, pass: string, meta?: any) =>
        _runAction(async () => {
            const { data, error: err } = await supabase.auth.signUp({ email, password: pass, options: { data: meta } })
            if (err) throw err; return data
        })

    const signOut = () => _runAction(async () => {
        const { error: err } = await supabase.auth.signOut()
        if (err) throw err; user.value = null; session.value = null
    })

    const resetPassword = (email: string) => _runAction(async () => {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`
        })
        if (err) throw err
        return '重置邮件已发送'
    })

    const updateUserMetadata = (metadata: any) => _runAction(async () => {
        const { data, error: err } = await supabase.auth.updateUser({ data: metadata })
        if (err) throw err; user.value = data.user; return data
    })

    const uploadAvatar = async (file: File) => {
        if (!user.value) return { success: false, error: '用户未登录' }
        return _runAction(async () => {
            const path = `${user.value!.id}/${Math.random()}.${file.name.split('.').pop()}`
            const { error: upErr } = await supabase.storage.from('avatars').upload(path, file)
            if (upErr) throw upErr
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
            const result = await updateUserMetadata({ avatar_url: publicUrl })
            if (!result.success) throw new Error(result.error)
            return result.data
        })
    }

    const cleanup = () => { authSubscription?.unsubscribe(); authSubscription = null }

    return {
        user, session, isLoading, error, customUserName, isAuthenticated, userDisplayName, userEmail, userAvatar,
        initialize, signInWithPassword, signUp, signOut, resetPassword, updateUserMetadata, uploadAvatar, cleanup
    }
})
