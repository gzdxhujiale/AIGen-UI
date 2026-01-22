<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
// 导入页面模板
import Page1 from '@/views/Page1.vue'
import AuthPage from '@/views/AuthPage.vue'
import Profile from '@/views/Profile.vue'
import SkeletonLoading from '@/views/SkeletonLoading.vue'
import UpdateAnnouncement from '@/components/common/UpdateAnnouncement.vue'

// AI Components - Only types or global listeners if needed? 
// No, the UI buttons are now inside layouts.
// But wait, the previous code had AIChatButton/Window inside SidebarProvider in simple App.vue
// Now they are inside ShadcnLayout.
// What about ArcoLayout? 
// ArcoLayout doesn't have them yet. The user might want them global?
// For now I'm removing them from App.vue because I removed them from template.
// If I need them back I'll add them to layouts.

// Composables
import { useNetworkStatus } from '@/composables/useNetworkStatus'
import { useOnboarding } from '@/composables/useOnboarding'

// Auth Store
import { useAuthStore } from '@/stores/authStore'
// Config Store
import { useConfigStore } from '@/stores/configStore'

// Import layouts
import ArcoLayout from '@/components/layout/ArcoLayout.vue'
import ShadcnLayout from '@/components/layout/ShadcnLayout.vue'

import { useNavigation } from '@/composables/useNavigation'

const { currentPage } = useNavigation() 
const authStore = useAuthStore()
const configStore = useConfigStore()
const { startOnboarding, showAnnouncement } = useOnboarding()

// 页面模板映射
const pageComponents: Record<string, any> = {
  Page1,
  profile: Profile,
  // Page2, // 后续添加更多模板时，在此注册...
}

// 当前显示的组件 - 如果未找到模板则显示空白占位
const CurrentPageComponent = computed(() => pageComponents[currentPage.value])



// Initialize auth on mount
onMounted(async () => {
  await authStore.initialize()
  // 登录成功后并行加载所有配置
  if (authStore.isAuthenticated) {
    console.log('App: Starting parallel bootstrap...')
    const startTime = performance.now()
    
    await Promise.all([
        authStore.fetchUserConfigs(),
        // configStore.loadFromSupabase() // Removed: handled by authStore.fetchUserConfigs
    ])
    
    console.log(`App: Parallel bootstrap finished in ${(performance.now() - startTime).toFixed(2)}ms`)

    
    // For test accounts, always force Arco style
    if (authStore.userEmail.toLowerCase().includes('test')) {
        configStore.navigationStyle = 'arco'
    } else if (authStore.stylePreference) {
        // Sync style preference from user profile once on startup
        configStore.navigationStyle = authStore.stylePreference
    }
    
    // 启动用户引导
    startOnboarding(authStore.userEmail)
  }

  // 页面关闭/刷新前确保同步完成 - 移除，避免干扰用户
  // window.addEventListener('beforeunload', handleBeforeUnload)
})

// 页面关闭前处理 - 移除
/*
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (configStore.isSyncing) {
    // 提示用户有未保存的更改
    e.preventDefault()
    e.returnValue = '配置正在同步中，确定要离开吗？'
    // 尝试完成同步
    configStore.ensureSynced()
  }
}
*/

onUnmounted(() => {
  // window.removeEventListener('beforeunload', handleBeforeUnload)
})

// 监听认证状态变化，登录后加载配置
watch(() => authStore.isAuthenticated, async (isAuth) => {
  if (isAuth) {
    // await configStore.loadFromSupabase() // Removed: handled by authStore.fetchUserConfigs
    
    // For test accounts, always force Arco style
    if (authStore.userEmail.toLowerCase().includes('test')) {
        configStore.navigationStyle = 'arco'
    } else if (authStore.stylePreference) {
        // Sync style preference from user profile on login
        configStore.navigationStyle = authStore.stylePreference
    }
    
    // 启动用户引导
    startOnboarding(authStore.userEmail)
  }
})

// Cleanup on unmount
onUnmounted(() => {
  authStore.cleanup()
})

// Network status monitoring
useNetworkStatus()
</script>

<template>
  <!-- Loading state: show skeleton while auth or config is loading -->
  <SkeletonLoading v-if="authStore.isLoading" />

  <!-- Not authenticated: show login page -->
  <AuthPage v-else-if="!authStore.isAuthenticated" />

  <!-- Authenticated: show main app -->
  <template v-else>
      <ArcoLayout v-if="configStore.navigationStyle === 'arco'">
          <Transition name="fade-slide" mode="out-in" appear>
            <component :is="CurrentPageComponent" :key="currentPage" />
          </Transition>
      </ArcoLayout>

      <ShadcnLayout v-else>
          <Transition name="fade-slide" mode="out-in" appear>
            <component :is="CurrentPageComponent" :key="currentPage" />
          </Transition>
      </ShadcnLayout>

      <!-- Update Announcement Modal -->
      <UpdateAnnouncement v-model:open="showAnnouncement" />
  </template>
</template>

<style>
/* Loading state styles */
.loading-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(var(--background));
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  color: hsl(var(--primary));
  animation: spin 1s linear infinite;
}

.loading-text {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Page transition effects */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>


