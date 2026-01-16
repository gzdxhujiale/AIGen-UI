<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Layout as ALayout,
  LayoutHeader as ALayoutHeader,
  LayoutContent as ALayoutContent,
  LayoutSider as ALayoutSider,
  Button as AButton,
  Breadcrumb as ABreadcrumb,
  BreadcrumbItem as ABreadcrumbItem,
  Menu as AMenu,
  MenuItem as AMenuItem,
  SubMenu as ASubMenu,
  Dropdown as ADropdown,
  Doption as ADoption,
  Dgroup as ADgroup,
  Avatar as AAvatar,
  Divider as ADivider,
  Scrollbar as AScrollbar,
} from '@arco-design/web-vue'
import {
  IconMenuFold,
  IconMenuUnfold,
  IconNotification, 
  IconSettings
} from '@arco-design/web-vue/es/icon'
import {
  ChevronsUpDown,
  Plus,
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  ChevronRight
} from 'lucide-vue-next'
import { useConfigStore } from '@/stores/configStore'
import { useAuthStore } from '@/stores/authStore'
import { useNavigation } from '@/config/sidebar'
import type { TeamItem, TeamPermissions } from '@/config/sidebar'

const configStore = useConfigStore()
const authStore = useAuthStore()
const { breadcrumbs, currentNavId, setNavigation, setDetailTitle } = useNavigation()

// --- 状态管理 ---
const collapsed = ref(false)
const activeTeam = ref<TeamItem | null>(null)

// --- 团队逻辑 ---
const TEAM_ICONS = [GalleryVerticalEnd, AudioWaveform, Command]

const effectiveTeams = computed<TeamItem[]>(() => {
  const cloudTeams = authStore.teamsConfig
  if (Array.isArray(cloudTeams) && cloudTeams.length > 0) {
    return cloudTeams.map((t: any, index: number) => {
      const perms = t.permissions || []
      const isFullAccess = perms.includes('admin') || perms.includes('all') || perms.includes('write') || true
      const mappedPermissions: TeamPermissions = {
         navMain: isFullAccess ? 'all' : [],
         projects: isFullAccess ? 'all' : []
      }
      return {
        name: t.name || 'Unnamed Team',
        logo: TEAM_ICONS[index % TEAM_ICONS.length],
        plan: t.role || 'Member',
        permissions: mappedPermissions
      }
    })
  }
  return [] 
})

watch(effectiveTeams, (newTeams) => {
    if (newTeams.length > 0) {
        if (!activeTeam.value || !newTeams.find(t => t.name === activeTeam.value?.name)) {
            activeTeam.value = newTeams[0]
        }
    }
}, { deep: true, immediate: true })

const handleTeamSelect = (value: any) => {
    if (value === 'add_team') return 
    const team = effectiveTeams.value.find(t => t.name === value)
    if (team) activeTeam.value = team
}

// --- 导航过滤 ---
const filteredNavGroups = computed(() => {
  const team = activeTeam.value
  const navGroups = configStore.effectiveNavGroups
  if (!team || !team.permissions) return navGroups
  const { navMain, navItems } = team.permissions
  if (navMain === 'all' && !navItems) return navGroups

  return navGroups.map(group => {
    const filteredItems = group.items.filter(item => {
      const isMainVisible = navMain === 'all' || (Array.isArray(navMain) && navMain.includes(item.id))
      if (!isMainVisible) return false
      if (navItems && navItems[item.id]) {
        if (!item.items) return true
        const visibleSubItemIds = navItems[item.id] ?? []
        return item.items.filter(subItem => visibleSubItemIds.includes(subItem.id)).length > 0
      }
      return true
    }).map(item => {
        if (navItems && navItems[item.id] && item.items) {
             const visibleSubItemIds = navItems[item.id] ?? []
             return { ...item, items: item.items.filter(subItem => visibleSubItemIds.includes(subItem.id)) }
        }
        return item
    })
    return { ...group, items: filteredItems }
  }).filter(group => group.items.length > 0)
})

// --- 菜单处理 ---
const selectedKeys = computed(() => [currentNavId.value].filter(Boolean) as string[])

const openKeys = ref<string[]>([])
const isNavInitialized = ref(false)

// 初始化 openKeys (作为默认展开状态)
const initDefaultOpenKeys = () => {
    const keys: string[] = [...openKeys.value]
    filteredNavGroups.value.forEach(group => {
        group.items.forEach(item => {
            // 默认展开配置了 isOpen 的菜单
            if (item.isOpen && !keys.includes('sub-' + item.id)) {
                keys.push('sub-' + item.id)
            }
            // 默认展开当前选中项所在的菜单
            if (item.items?.some(sub => sub.id === currentNavId.value)) {
                if (!keys.includes('sub-' + item.id)) {
                    keys.push('sub-' + item.id)
                }
            }
        })
    })
    openKeys.value = keys
}

// 仅在初始结构就绪时执行一次默认展开
watch(filteredNavGroups, (newGroups) => {
    if (!isNavInitialized.value && newGroups.length > 0 && newGroups.some(g => g.items.length > 0)) {
        initDefaultOpenKeys()
        isNavInitialized.value = true
    }
}, { immediate: true })

// 当用户在其他地方切换导航 ID 时（如通过面包屑或代码跳转），自动打开对应父菜单
watch(currentNavId, (newId) => {
    if (!newId) return
    filteredNavGroups.value.forEach(group => {
        group.items.forEach(item => {
            if (item.items?.some(sub => sub.id === newId)) {
                if (!openKeys.value.includes('sub-' + item.id)) {
                    openKeys.value = [...openKeys.value, 'sub-' + item.id]
                }
            }
        })
    })
})

const handleNavClick = (mainNav: string, subNav: string, navId?: string) => {
    setNavigation(mainNav, subNav, navId)
    setDetailTitle(null)
}

const handleUserAction = async (value: any) => {
    switch (value) {
        case 'logout': await authStore.signOut(); break
        case 'profile': setNavigation('账户', '个人资料', 'profile'); setDetailTitle(null); break
        case 'upgrade':
        case 'settings': setNavigation('系统', '配置设置', 'settings'); setDetailTitle(null); break
        case 'billing': setNavigation('Account', 'Billing', 'billing'); setDetailTitle(null); break
    }
}

const handleSubNavClick = () => {
  if (breadcrumbs.value.detail) {
    setDetailTitle(null)
  }
}
</script>

<template>
  <a-layout class="arco-layout">
    <!-- 1. 侧边栏侧部 -->
    <a-layout-sider
      :collapsed="collapsed"
      :trigger="null"
      hide-trigger
      collapsible
      breakpoint="xl"
      :width="250"
      class="border-r border-[var(--color-border-2)] bg-[var(--color-bg-2)] h-screen shrink-0"
    >
      <div class="flex flex-col h-full overflow-hidden">
        <!-- 1.1 团队切换器 -->
        <div class="h-14 flex items-center px-2 border-b border-[var(--color-border-2)] shrink-0">
          <a-dropdown @select="handleTeamSelect" trigger="click" position="br" v-if="!collapsed">
            <div class="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-fill-2)] cursor-pointer transition-colors w-full overflow-hidden">
                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-[rgb(var(--primary-6))] text-white shrink-0">
                    <component :is="activeTeam?.logo" class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight overflow-hidden">
                    <span class="truncate font-medium text-[var(--color-text-1)]">{{ activeTeam?.name }}</span>
                    <span class="truncate text-xs text-[var(--color-text-3)]">{{ activeTeam?.plan }}</span>
                </div>
                <ChevronsUpDown class="ml-auto size-4 text-[var(--color-text-3)] shrink-0" />
            </div>
            <template #content>
                <a-dgroup key="teams_list" title="Teams">
                    <a-doption v-for="team in effectiveTeams" :key="team.name" :value="team.name">
                        <template #icon><component :is="team.logo" class="size-3.5" /></template>
                        {{ team.name }}
                    </a-doption>
                </a-dgroup>
                <a-doption key="add_team_opt" value="add_team">
                    <template #icon><Plus class="size-3.5" /></template>
                    Add team
                </a-doption>
            </template>
          </a-dropdown>
          <div v-else class="flex items-center justify-center w-full">
              <component :is="activeTeam?.logo" class="size-6 text-[rgb(var(--primary-6))]" />
          </div>
        </div>

        <!-- 1.2 主导航 -->
        <div class="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
          <div v-for="group in filteredNavGroups" :key="group.label" class="mb-6">
            <div v-if="!collapsed && (group.showLabel ?? true)" class="px-4 mb-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              {{ group.label }}
            </div>
            <a-menu
              mode="vertical"
              :collapsed="collapsed"
              :selected-keys="selectedKeys"
              v-model:open-keys="openKeys"
              :style="{ width: '100%', border: 'none', backgroundColor: 'transparent' }"
            >
              <template v-for="item in group.items" :key="item.id">
                <a-sub-menu v-if="item.items && item.items.length > 0" :key="'sub-'+item.id">
                  <template #title>
                    <div class="flex items-center justify-between w-full group/menu-item">
                      <div class="flex items-center gap-2">
                        <component :is="item.icon" v-if="item.icon" class="w-4 h-4" />
                        <span>{{ item.title }}</span>
                      </div>
                      <ChevronRight 
                        v-if="!collapsed"
                        class="ml-auto h-4 w-4 shrink-0 transition-transform duration-200"
                        :class="{ 'rotate-90': openKeys.includes('sub-' + item.id) }"
                      />
                    </div>
                  </template>
                  <a-menu-item 
                    v-for="sub in item.items" 
                    :key="sub.id" 
                    @click="handleNavClick(item.title, sub.title, sub.id)"
                  >
                    {{ sub.title }}
                  </a-menu-item>
                </a-sub-menu>
                <a-menu-item v-else :key="item.id" @click="handleNavClick(group.label, item.title, item.id)">
                  <template #icon><component :is="item.icon" v-if="item.icon" class="w-4 h-4" /></template>
                  {{ item.title }}
                </a-menu-item>
              </template>
            </a-menu>
          </div>
        </div>

        <!-- 1.3 用户底部栏 -->
        <div class="mt-auto border-t border-[var(--color-border-2)] p-2 shrink-0">
          <a-dropdown @select="handleUserAction" trigger="click" position="top">
            <div class="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-fill-2)] cursor-pointer transition-colors overflow-hidden">
                <a-avatar :size="32" class="bg-[var(--color-fill-3)] shrink-0">
                    <img v-if="authStore.userAvatar" :src="authStore.userAvatar" :alt="authStore.userDisplayName" />
                    <span v-else>{{ authStore.userDisplayName.slice(0, 2).toUpperCase() }}</span>
                </a-avatar>
                <div v-if="!collapsed" class="grid flex-1 text-left text-sm leading-tight overflow-hidden">
                    <span class="truncate font-semibold text-[var(--color-text-1)]">{{ authStore.userDisplayName }}</span>
                    <span class="truncate text-xs text-[var(--color-text-3)]">{{ authStore.userEmail }}</span>
                </div>
                <ChevronsUpDown v-if="!collapsed" class="ml-auto size-4 text-[var(--color-text-3)] shrink-0" />
            </div>
            <template #content>
                <div class="px-3 py-2 border-b border-[var(--color-border-1)] mb-1">
                    <p class="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-wider mb-2">Account</p>
                    <div class="flex items-center gap-2 py-1">
                        <a-avatar :size="28" class="bg-[var(--color-fill-3)] shrink-0">
                            <img v-if="authStore.userAvatar" :src="authStore.userAvatar" :alt="authStore.userDisplayName" />
                            <span v-else class="text-[10px]">{{ authStore.userDisplayName.slice(0, 2).toUpperCase() }}</span>
                        </a-avatar>
                        <div class="flex flex-col min-w-0">
                            <span class="text-sm font-semibold truncate text-[var(--color-text-1)]">{{ authStore.userDisplayName }}</span>
                            <span class="text-[11px] truncate text-[var(--color-text-3)]">{{ authStore.userEmail }}</span>
                        </div>
                    </div>
                </div>
                <a-doption value="upgrade">
                    <template #icon><Sparkles class="size-4 text-amber-500"/></template>
                    <span class="font-medium">Upgrade to Pro</span>
                </a-doption>
                <a-divider class="my-1" />
                <a-doption value="profile"><template #icon><BadgeCheck class="size-4 opacity-70"/></template>Account</a-doption>
                <a-doption value="billing"><template #icon><CreditCard class="size-4 opacity-70"/></template>Billing</a-doption>
                <a-doption value="notifications"><template #icon><Bell class="size-4 opacity-70"/></template>Notifications</a-doption>
                <a-divider class="my-1" />
                <a-doption value="logout" class="text-red-500">
                    <template #icon><LogOut class="size-4"/></template>
                    Log out
                </a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>
    </a-layout-sider>
    
    <!-- 2. 主体框架 -->
    <a-layout class="h-full overflow-hidden flex flex-col">
        <a-layout-header class="h-14 px-4 bg-[var(--color-bg-2)] border-b border-[var(--color-border-2)] flex items-center justify-between shrink-0 z-10">
            <!-- 页眉左侧 -->
            <div class="flex items-center gap-4 flex-1">
               <AButton shape="circle" size="small" @click="collapsed = !collapsed">
                   <IconMenuUnfold v-if="collapsed" />
                   <IconMenuFold v-else />
               </AButton>
               
               <!-- 面包屑 -->
               <ABreadcrumb>
                  <ABreadcrumbItem>{{ breadcrumbs.main }}</ABreadcrumbItem>
                  <ABreadcrumbItem v-if="breadcrumbs.detail">
                      <a class="cursor-pointer hover:text-[rgb(var(--primary-6))]" @click="handleSubNavClick">{{ breadcrumbs.sub }}</a>
                  </ABreadcrumbItem>
                  <ABreadcrumbItem v-else>{{ breadcrumbs.sub }}</ABreadcrumbItem>
                  <ABreadcrumbItem v-if="breadcrumbs.detail">{{ breadcrumbs.detail }}</ABreadcrumbItem>
               </ABreadcrumb>
               
               <div id="breadcrumb-actions" class="flex items-center gap-4 ml-4"></div>
               <a-divider direction="vertical" class="mx-2" />
            </div>

            <!-- 页眉右侧 -->
            <div class="flex items-center gap-4">
                <AButton shape="circle" size="small">
                    <IconNotification />
                </AButton>
                <AButton shape="circle" size="small" @click="handleUserAction('settings')">
                    <IconSettings />
                </AButton>
            </div>
        </a-layout-header>
        
        <a-layout-content class="flex-1 overflow-hidden min-h-0 bg-[var(--color-fill-2)]">
          <a-scrollbar style="height: 100%; overflow: auto;" outer-style="height: 100%;">
            <div class="p-4 min-h-full flex flex-col container-content">
               <div class="bg-[var(--color-bg-2)] rounded-lg shadow-sm border border-[var(--color-border-2)] flex-1 relative min-h-full overflow-hidden">
                   <slot></slot>
               </div>
            </div>
          </a-scrollbar>
        </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.arco-layout {
  height: 100vh;
  background: var(--color-fill-2);
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--color-fill-4);
    border-radius: 2px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background: var(--color-text-4);
}

:deep(.arco-menu-inner) {
    padding: 0 4px !important;
}

:deep(.arco-menu-item), :deep(.arco-menu-inline-header) {
    background-color: transparent;
    border-radius: 6px;
    margin-bottom: 2px;
    color: var(--color-text-2);
    transition: all 0.2s;
}

:deep(.arco-menu-item:hover), :deep(.arco-menu-inline-header:hover) {
    background-color: var(--color-fill-2) !important;
    color: var(--color-text-1) !important;
}

:deep(.arco-menu-selected) {
    background-color: var(--color-primary-light-1) !important;
    color: rgb(var(--primary-6)) !important;
    font-weight: 500;
}

:deep(.arco-menu-selected .arco-icon) {
    color: rgb(var(--primary-6));
}

:deep(.arco-menu-inline-header.arco-menu-selected) {
    background-color: transparent !important;
    color: var(--color-text-1) !important;
}

/* 隐藏 Arco 默认的展开箭头 */
:deep(.arco-menu-icon-suffix) {
    display: none !important;
}

/* 确保菜单项内容撑满 */
:deep(.arco-menu-title) {
    display: flex;
    align-items: center;
    width: 100%;
    padding-right: 4px;
}

/* 强制内容区滚动条为细长风格 */
:deep(.arco-scrollbar-thumb-direction-vertical) {
    width: 6px !important;
}

:deep(.arco-scrollbar-track-direction-vertical) {
    width: 6px !important;
}

:deep(.arco-scrollbar-thumb-bar) {
    background-color: var(--color-fill-4) !important;
    border-radius: 4px !important;
}

:deep(.arco-scrollbar-thumb-bar:hover) {
    background-color: var(--color-text-3) !important;
}
</style>
