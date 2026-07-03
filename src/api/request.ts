import { useAuthStore } from '@/stores/authStore'

// Read from environment variable, fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api'

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
    const authStore = useAuthStore()
    const token = await authStore.getToken()
    
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {})
    }
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    } else {
        console.warn('fetchApi: token is null or empty for', endpoint)
    }
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers
    })
    
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'API Request Failed')
    }
    
    return data
}
