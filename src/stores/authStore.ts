import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useUser, useAuth, useClerk, useSession } from '@clerk/vue'

export const useAuthStore = defineStore('auth', () => {
    const { user, isLoaded } = useUser()
    const { isSignedIn } = useAuth()
    const { session } = useSession()
    const clerk = useClerk()
    
    const isLoading = computed(() => !isLoaded.value)
    const isAuthenticated = computed(() => !!isSignedIn.value)
    
    const userDisplayName = computed(() => 
        user.value?.fullName || 
        user.value?.firstName || 
        user.value?.primaryEmailAddress?.emailAddress?.split('@')[0] || 
        'User'
    )
    
    const userEmail = computed(() => user.value?.primaryEmailAddress?.emailAddress || '')
    const userAvatar = computed(() => user.value?.imageUrl || '')
    
    const signOut = async () => {
        await clerk.value?.signOut()
    }
    
    const updateUserMetadata = async (data: { full_name: string }) => {
        if (!user.value) return { success: false }
        try {
            await user.value.update({ firstName: data.full_name })
            return { success: true }
        } catch (e) {
            return { success: false }
        }
    }

    const uploadAvatar = async (file: File) => {
        if (!user.value) return { success: false }
        try {
            await user.value.setProfileImage({ file })
            return { success: true }
        } catch (e) {
            return { success: false }
        }
    }
    
    const getToken = async () => {
        if (!session.value) {
            console.warn('authStore: session is not ready yet!')
            return null
        }
        return await session.value.getToken()
    }
    
    return {
        user,
        isLoading,
        isAuthenticated,
        userDisplayName,
        userEmail,
        userAvatar,
        signOut,
        getToken,
        updateUserMetadata,
        uploadAvatar,
        // Mock obsolete functions so components don't break
        initialize: async () => {},
        cleanup: () => {}
    }
})
