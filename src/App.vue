<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Page1 from '@/views/Page1.vue'
import AuthPage from '@/views/AuthPage.vue'
import Profile from '@/views/Profile.vue'
import SkeletonLoading from '@/views/SkeletonLoading.vue'
import ExceptionPage from '@/views/ExceptionPage.vue'
import DynamicFormPage from '@/views/DynamicFormPage.vue'
import { useNetworkStatus } from '@/composables/useNetworkStatus'

import { useOnboarding } from '@/composables/useOnboarding'
import { useAuthStore } from '@/stores/authStore'
import { useConfigStore } from '@/stores/configStore'
import { useConfigTeamStore } from '@/stores/config_team_Store'
import { useConfigMenuStore } from '@/stores/config_menu_Store'
import { useConfigPageStore } from '@/stores/config_page_Store'
import ArcoLayout from '@/components/layout/ArcoLayout.vue'
import ShadcnLayout from '@/components/layout/ShadcnLayout.vue'
import { useNavigation, initNavigation } from '@/composables/useNavigation'

const { currentPage, currentNavId, exceptionType } = useNavigation() 
const authStore = useAuthStore()
const configStore = useConfigStore()
const teamStore = useConfigTeamStore()
const menuStore = useConfigMenuStore()
const pageStore = useConfigPageStore()
const { startOnboarding } = useOnboarding()

const isConfigLoading = ref(true)

// Page Mapping
const pageComponents: Record<string, any> = { Page1, profile: Profile, DynamicFormPage }
const CurrentPageComponent = computed(() => pageComponents[currentPage.value] || Page1)

// Dynamic Layout
const LayoutComponent = computed(() => configStore.navigationStyle === 'arco' ? ArcoLayout : ShadcnLayout)

// Unified Bootstrap Logic
const bootstrapApp = async () => {
  isConfigLoading.value = true
  console.log('App: Bootstrapping...')
  const startTime = performance.now()

  // 1. Force styles for test accounts
  if (authStore.userEmail.toLowerCase().includes('test')) {
    configStore.navigationStyle = 'arco'
  }

  // 2. Load from Cache (Sync & Fast)
  try {
    teamStore.loadFromCache()
    menuStore.loadFromCache()
    pageStore.loadFromCache()
    
    if (pageStore.navGroups.length > 0) {
      initNavigation(pageStore.navGroups)
      isConfigLoading.value = false // Early interactive
      console.log(`App: Cache loaded in ${(performance.now() - startTime).toFixed(2)}ms`)
    }
  } catch (e) {
    console.warn('App: Cache load failed', e)
  }

  // 3. Background Sync (Async)
  try {
    await Promise.all([
      teamStore.loadTeams(),
      menuStore.loadMenu(),
      pageStore.loadPageConfigs()
    ])
    // Only init navigation if not already set (preserve user selection or cache)
    if (!currentNavId.value) {
      initNavigation(pageStore.navGroups)
    }
  } catch (e) {
    console.error('App: Sync failed', e)
  } finally {
    isConfigLoading.value = false
    console.log(`App: Ready in ${(performance.now() - startTime).toFixed(2)}ms`)
    startOnboarding(authStore.userEmail)
  }
}

onMounted(async () => {
  useNetworkStatus() // Init network monitoring
  await authStore.initialize()
  
  if (!authStore.isAuthenticated) {
    isConfigLoading.value = false
    return
  }
  await bootstrapApp()
})

watch(() => authStore.isAuthenticated, async (isAuth) => {
  if (isAuth) await bootstrapApp()
})

onUnmounted(() => authStore.cleanup())
</script>

<template>
  <SkeletonLoading v-if="authStore.isLoading || isConfigLoading" />
  <AuthPage v-else-if="!authStore.isAuthenticated" />
  <ExceptionPage v-else-if="exceptionType" :type="exceptionType" />
  <component :is="LayoutComponent" v-else>
    <Transition name="fade-slide" mode="out-in" appear>
      <component :is="CurrentPageComponent" :key="currentPage" />
    </Transition>
  </component>
</template>

<style>
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


