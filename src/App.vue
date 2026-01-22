<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
// 导入页面模板
import Page1 from '@/views/Page1.vue'
import AuthPage from '@/views/AuthPage.vue'
import Profile from '@/views/Profile.vue'
import SkeletonLoading from '@/views/SkeletonLoading.vue'
import UpdateAnnouncement from '@/components/common/UpdateAnnouncement.vue'



// Composables
import { useNetworkStatus } from '@/composables/useNetworkStatus'
import { useOnboarding } from '@/composables/useOnboarding'

// Auth Store
import { useAuthStore } from '@/stores/authStore'
// Config Store
import { useConfigStore } from '@/stores/configStore'
import { useConfigTeamStore } from '@/stores/config_team_Store'
import { useConfigMenuStore } from '@/stores/config_menu_Store'
import { useConfigPageStore } from '@/stores/config_page_Store'

// Import layouts
import ArcoLayout from '@/components/layout/ArcoLayout.vue'
import ShadcnLayout from '@/components/layout/ShadcnLayout.vue'

import { useNavigation } from '@/composables/useNavigation'

const { currentPage } = useNavigation() 
const authStore = useAuthStore()
const configStore = useConfigStore()
const teamStore = useConfigTeamStore()
const menuStore = useConfigMenuStore()
const pageStore = useConfigPageStore()
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
    
    // 并行加载所有配置
    



    await Promise.all([
        teamStore.loadTeams(),
        menuStore.loadMenu(),
        pageStore.loadPageConfigs()
    ])
    
    console.log(`App: Parallel bootstrap finished in ${(performance.now() - startTime).toFixed(2)}ms`)

    
    // For test accounts, always force Arco style
    if (authStore.userEmail.toLowerCase().includes('test')) {
        configStore.navigationStyle = 'arco'
    } else if (localStorage.getItem('shadcn_nav_style_pref')) {
        // Sync style preference from local storage (already handled in configStore init, but ensuring here)
        // configStore.navigationStyle = ... 
    }
    
    // 启动用户引导
    startOnboarding(authStore.userEmail)
  }
})// 监听认证状态变化，登录后加载配置
watch(() => authStore.isAuthenticated, async (isAuth) => {
  if (isAuth) {
    // For test accounts, always force Arco style
    if (authStore.userEmail.toLowerCase().includes('test')) {
        configStore.navigationStyle = 'arco'
    }

    // Load configs

    
    await Promise.all([
        teamStore.loadTeams(),
        menuStore.loadMenu(),
        pageStore.loadPageConfigs()
    ])
    
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


