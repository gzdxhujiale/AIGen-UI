<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Layout as ALayout,
  LayoutSider as ALayoutSider,
  LayoutHeader as ALayoutHeader,
  LayoutContent as ALayoutContent,
  Button as AButton
} from '@arco-design/web-vue'
import {
    IconMenuFold,
    IconMenuUnfold,
    IconNotification, 
    IconSettings
} from '@arco-design/web-vue/es/icon'

import {
  Breadcrumb as ABreadcrumb,
  BreadcrumbItem as ABreadcrumbItem
} from '@arco-design/web-vue'
import { useNavigation } from '@/config/sidebar'

import { useConfigStore } from '@/stores/configStore'
import { useAuthStore } from '@/stores/authStore'
import { defaultSidebarConfig, type TeamItem, type TeamPermissions } from '@/config/sidebar'
// Import Arco versions of components
import NavMainArco from '@/components/NavMainArco.vue'
import NavProjectsArco from '@/components/NavProjectsArco.vue'
import TeamSwitcherArco from '@/components/TeamSwitcherArco.vue'
import NavUserArco from '@/components/NavUserArco.vue'
import { GalleryVerticalEnd, AudioWaveform, Command } from 'lucide-vue-next'

// Composables logic duplicated/adapted from AppSidebar.vue to ensure standalone functionality
const configStore = useConfigStore()
const authStore = useAuthStore()
const sidebarConfig = defaultSidebarConfig // Fallback
const { breadcrumbs, setDetailTitle } = useNavigation()

// Collapse state
const collapsed = ref(false)
const onCollapse = (val: boolean) => {
  collapsed.value = val
}

const handleSubNavClick = () => {
  if (breadcrumbs.value.detail) {
    setDetailTitle(null)
  }
}

// ---------------------------------------------------------
// TEAM LOGIC (Copied/Adapted from AppSidebar.vue)
// ---------------------------------------------------------
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
  return sidebarConfig.teams
})

const activeTeam = ref<TeamItem>(effectiveTeams.value[0])

watch(effectiveTeams, (newTeams) => {
    if (newTeams.length > 0 && !newTeams.find(t => t.name === activeTeam.value.name)) {
        activeTeam.value = newTeams[0]
    }
}, { deep: true })

// ---------------------------------------------------------
// NAVIGATION FILTERING LOGIC
// ---------------------------------------------------------
const filteredNavGroups = computed(() => {
  const team = activeTeam.value
  const navGroups = configStore.effectiveNavGroups
  
  if (!team || !team.permissions) return navGroups
  
  const { navMain, navItems } = team.permissions

  if (navMain === 'all' && !navItems) {
    return navGroups
  }

  return navGroups.map(group => {
    const filteredItems = group.items.filter(item => {
      const isMainVisible = navMain === 'all' || (Array.isArray(navMain) && navMain.includes(item.id))
      if (!isMainVisible) return false

      if (navItems && navItems[item.id]) {
        if (!item.items) return true
        const visibleSubItemIds = navItems[item.id] ?? []
        const filteredSubItems = item.items.filter(subItem => visibleSubItemIds.includes(subItem.id))
        return filteredSubItems.length > 0
      }
      return true
    }).map(item => {
        if (navItems && navItems[item.id] && item.items) {
             const visibleSubItemIds = navItems[item.id] ?? []
             const filteredSubItems = item.items.filter(subItem => visibleSubItemIds.includes(subItem.id))
             return {
                 ...item,
                 items: filteredSubItems
             }
        }
        return item
    })

    return {
      ...group,
      items: filteredItems
    }
  }).filter(group => group.items.length > 0)
})

const filteredProjectGroups = computed(() => {
    const team = activeTeam.value
    if (!team || !team.permissions) return sidebarConfig.projectGroups

    const { projects } = team.permissions
    if (projects === 'all') return sidebarConfig.projectGroups

    return sidebarConfig.projectGroups.map(group => {
        const filteredProjects = group.projects.filter(project => Array.isArray(projects) && projects.includes(project.id))
        return {
            ...group,
            projects: filteredProjects
        }
    }).filter(group => group.projects.length > 0)
})

// Header content passing - we need the breadcrumbs and actions from App.vue
// Since we are replacing the App.vue layout structure, we need to handle slots or props for content?
// Actually App.vue will use this component as a wrapper.
// But App.vue has `<header>...</header>` and `<component :is="CurrentPageComponent" />`.
// If we switch layouts, `App.vue` template needs to be drastically different or `ArcoLayout` needs to accept slots.
</script>

<template>
  <a-layout class="layout-demo">
    <a-layout-sider
      :collapsed="collapsed"
      :trigger="null"
      hide-trigger
      collapsible
      breakpoint="xl"
      :width="250"
      class="border-r border-[var(--color-border-2)] bg-[var(--color-bg-2)] flex flex-col"
    >
        <!-- Sider Header -->
        <div class="h-14 flex items-center justify-center border-b border-[var(--color-border-2)]">
            <TeamSwitcherArco :teams="effectiveTeams" v-model="activeTeam" v-if="!collapsed" />
            <div v-else class="flex items-center justify-center w-full h-full">
                <component :is="activeTeam.logo" class="size-6 text-[rgb(var(--primary-6))]" />
            </div>
        </div>

        <!-- Scrollable Nav -->
        <div class="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
            <NavMainArco 
                v-for="(group, index) in filteredNavGroups" 
                :key="group.id ?? `nav-arco-${index}`"
                :label="group.label"
                :show-label="!collapsed && (group.showLabel ?? true)"
                :collapsed="collapsed"
                :items="group.items" 
            />
            <NavProjectsArco 
                v-for="(group, index) in filteredProjectGroups" 
                :key="group.id ?? `project-arco-${index}`"
                :label="group.label"
                :show-label="!collapsed && (group.showLabel ?? true)"
                :collapsed="collapsed"
                :projects="group.projects"
                :show-more-button="group.showMoreButton"
            />
        </div>

        <!-- Sider Footer -->
        <div class="mt-auto border-t border-[var(--color-border-2)]">
             <NavUserArco v-if="!collapsed" />
             <div v-else class="flex justify-center p-4">
                 <component :is="activeTeam.logo" class="size-4 text-muted-foreground" />
             </div>
        </div>
    </a-layout-sider>
    
    <a-layout>
      <a-layout-header class="h-16 px-4 bg-[var(--color-bg-2)] border-b border-[var(--color-border-2)] flex items-center justify-between">
          <!-- Header Left -->
          <div class="flex items-center gap-4 flex-1">
             <AButton shape="circle" size="small" @click="onCollapse(!collapsed)">
                 <IconMenuUnfold v-if="collapsed" />
                 <IconMenuFold v-else />
             </AButton>
             
             <!-- Built-in Breadcrumbs -->
             <ABreadcrumb>
                <ABreadcrumbItem>{{ breadcrumbs.main }}</ABreadcrumbItem>
                <ABreadcrumbItem v-if="breadcrumbs.detail">
                    <a class="cursor-pointer hover:text-[rgb(var(--primary-6))]" @click="handleSubNavClick">{{ breadcrumbs.sub }}</a>
                </ABreadcrumbItem>
                <ABreadcrumbItem v-else>{{ breadcrumbs.sub }}</ABreadcrumbItem>
                <ABreadcrumbItem v-if="breadcrumbs.detail">{{ breadcrumbs.detail }}</ABreadcrumbItem>
             </ABreadcrumb>
             
             <!-- Slot for Breadcrumbs -->
             <!-- Removed legacy slot usage -->
             
             <div id="breadcrumb-actions" class="flex items-center gap-4 ml-4"></div>
          </div>

          <!-- Header Right -->
          <div class="flex items-center gap-4">
              <AButton shape="circle" size="small">
                  <IconNotification />
              </AButton>
              <AButton shape="circle" size="small">
                  <IconSettings />
              </AButton>
          </div>
      </a-layout-header>
      
      <a-layout-content class="p-4 overflow-hidden flex flex-col min-h-0">
         <div class="bg-[var(--color-bg-2)] rounded-lg shadow-sm border border-[var(--color-border-2)] flex-1 overflow-hidden flex flex-col relative">
             <slot></slot>
         </div>
      </a-layout-content>
      
      <!-- Optional Footer -->
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
}

/* Custom scrollbar for sider */
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

/* Hide Arco default sider trigger */
:deep(.arco-layout-sider-trigger) {
    display: none;
}
</style>
