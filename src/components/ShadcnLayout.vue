<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  ChevronRight,
  ChevronsUpDown,
  Plus,
  BadgeCheck,
  LogOut,
  Settings,
  Loader2,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from 'lucide-vue-next'

// --- UI Components ---
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { AIChatButton, AIChatWindow } from '@/components/ai'
import { Message } from '@arco-design/web-vue'

// --- Logic & Config ---
import { useConfigStore } from '@/stores/configStore'
import { useAuthStore } from '@/stores/authStore'
import { useNavigation, defaultSidebarConfig } from '@/config/sidebar'
import type { TeamItem, TeamPermissions } from '@/config/sidebar'

const configStore = useConfigStore()
const authStore = useAuthStore()
const { breadcrumbs, currentSubNav, setNavigation, setDetailTitle } = useNavigation()

// --- 状态与配置 ---
const sidebarConfig = defaultSidebarConfig
const TEAM_ICONS = [GalleryVerticalEnd, AudioWaveform, Command]
const isLoggingOut = ref(false)
const accountDialogOpen = ref(false)

// --- 团队计算 ---
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
    if (newTeams.length > 0 && (!activeTeam.value || !newTeams.find(t => t.name === activeTeam.value?.name))) {
        activeTeam.value = newTeams[0]
    }
}, { deep: true, immediate: true })

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

const filteredProjectGroups = computed(() => {
    const team = activeTeam.value
    if (!team || !team.permissions) return sidebarConfig.projectGroups
    const { projects } = team.permissions
    if (projects === 'all') return sidebarConfig.projectGroups

    return sidebarConfig.projectGroups.map(group => {
        const filteredProjects = group.projects.filter(project => Array.isArray(projects) && projects.includes(project.id))
        return { ...group, projects: filteredProjects }
    }).filter(group => group.projects.length > 0)
})

// --- 处理器 ---
const handleNavClick = (mainNav: string, subNav: string, navId?: string) => {
  setNavigation(mainNav, subNav, navId)
  setDetailTitle(null)
}

const handleSubNavBreadcrumbClick = () => {
  if (breadcrumbs.value.detail) setDetailTitle(null)
}

const handleLogout = async () => {
  isLoggingOut.value = true
  try {
    const result = await authStore.signOut()
    if (result.success) Message.success('已退出登录')
    else Message.error(result.error || '退出失败，请重试')
  } finally {
    isLoggingOut.value = false
  }
}

// 预览模式
const isInPreviewMode = computed(() => configStore.isInPreviewMode)
const previewMode = computed(() => configStore.previewMode)

// 用户信息
const userDisplayName = computed(() => authStore.userDisplayName || sidebarConfig.user.name)
const userEmail = computed(() => authStore.userEmail || sidebarConfig.user.email)
const userAvatar = computed(() => authStore.userAvatar || sidebarConfig.user.avatar)
const initials = computed(() => userDisplayName.value.slice(0, 2).toUpperCase())
</script>

<template>
  <SidebarProvider>
    <!-- 1. 侧边栏容器 -->
    <Sidebar collapsible="icon">
      <!-- 1.1 团队切换 -->
      <SidebarHeader>
        <div v-if="isInPreviewMode" class="preview-indicator">
          <span class="preview-badge">{{ previewMode === 'override' ? '覆盖预览' : '追加预览' }}</span>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <component :is="activeTeam?.logo" class="size-4" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-medium">{{ activeTeam?.name }}</span>
                    <span class="truncate text-xs">{{ activeTeam?.plan }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="right" :side-offset="4">
                <DropdownMenuLabel class="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
                <DropdownMenuItem v-for="(team, index) in effectiveTeams" :key="team.name" class="gap-2 p-2" @click="activeTeam = team">
                  <div class="flex size-6 items-center justify-center rounded-sm border">
                    <component :is="team.logo" class="size-3.5 shrink-0" />
                  </div>
                  {{ team.name }}
                  <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 p-2">
                  <div class="flex size-6 items-center justify-center rounded-md border bg-transparent"><Plus class="size-4" /></div>
                  <div class="font-medium text-muted-foreground">Add team</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <!-- 1.2 导航内容 -->
      <SidebarContent>
        <!-- 主导航分组 -->
        <SidebarGroup v-for="group in filteredNavGroups" :key="group.label">
          <SidebarGroupLabel v-if="group.showLabel ?? true">{{ group.label }}</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible v-for="item in group.items" :key="item.title" as-child :default-open="item.isOpen || item.items?.some(s => s.title === currentSubNav)" class="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title" :class="{ 'bg-sidebar-accent': item.items?.some(s => s.title === currentSubNav) }">
                    <component :is="item.icon" v-if="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                      <SidebarMenuSubButton as-child @click="handleNavClick(item.title, subItem.title, subItem.id)" :class="{ 'bg-sidebar-accent font-medium': currentSubNav === subItem.title }">
                        <a :href="subItem.url"><span>{{ subItem.title }}</span></a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        <!-- 项目分组 -->
        <SidebarGroup v-for="group in filteredProjectGroups" :key="group.label" class="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel v-if="group.showLabel ?? true">{{ group.label }}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.projects" :key="item.name">
              <SidebarMenuButton as-child @click="handleNavClick(group.label, item.name, item.id)" :class="{ 'bg-sidebar-accent font-medium': currentSubNav === item.name }">
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <SidebarMenuAction show-on-hover><MoreHorizontal /><span class="sr-only">More</span></SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-48 rounded-lg" side="right" align="start">
                  <DropdownMenuItem><Folder class="text-muted-foreground" /><span>View Project</span></DropdownMenuItem>
                  <DropdownMenuItem><Forward class="text-muted-foreground" /><span>Share Project</span></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Trash2 class="text-muted-foreground" /><span>Delete Project</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem v-if="group.showMoreButton"><SidebarMenuButton class="text-sidebar-foreground/70"><MoreHorizontal class="text-sidebar-foreground/70" /><span>More</span></SidebarMenuButton></SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <!-- 1.3 底部用户栏 -->
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton id="user-avatar-trigger" size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="userAvatar" :alt="userDisplayName" />
                    <AvatarFallback class="rounded-lg">{{ initials }}</AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-medium">{{ userDisplayName }}</span>
                    <span class="truncate text-xs">{{ userEmail }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="right" align="end" :side-offset="4">
                <DropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage :src="userAvatar" :alt="userDisplayName" />
                      <AvatarFallback class="rounded-lg">{{ initials }}</AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ userDisplayName }}</span>
                      <span class="truncate text-xs">{{ userEmail }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem id="nav-settings" @click="handleNavClick('系统', '配置设置', 'settings')"><Settings />用户设置</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem id="nav-profile" @click="handleNavClick('账户', '个人资料', 'profile')"><BadgeCheck />用户中心</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="handleLogout" :disabled="isLoggingOut">
                  <Loader2 v-if="isLoggingOut" class="animate-spin" />
                  <LogOut v-else />
                  {{ isLoggingOut ? '正在退出...' : '退出登录' }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    <!-- 2. 主体框架 -->
    <SidebarInset>
      <!-- 页眉 -->
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background z-10">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb class="flex-1">
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">{{ breadcrumbs.main }}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block"><ChevronRight /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink v-if="breadcrumbs.detail" href="#" @click.prevent="handleSubNavBreadcrumbClick">
                {{ breadcrumbs.sub }}
              </BreadcrumbLink>
              <BreadcrumbPage v-else>{{ breadcrumbs.sub }}</BreadcrumbPage>
            </BreadcrumbItem>
            <template v-if="breadcrumbs.detail">
              <BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage>{{ breadcrumbs.detail }}</BreadcrumbPage></BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
        <div id="breadcrumb-actions" class="flex items-center gap-4"></div>
      </header>
      
      <!-- 内容区域 -->
      <div class="flex-1 min-h-0 flex flex-col">
          <slot></slot>
      </div>
    </SidebarInset>
    
    <!-- AI 悬浮组件 -->
    <AIChatButton />
    <AIChatWindow />

    <!-- 账户信息弹窗 -->
    <Dialog v-model:open="accountDialogOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>账户信息</DialogTitle>
          <DialogDescription>您的用户资料</DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="flex items-center gap-4">
            <Avatar class="h-16 w-16">
              <AvatarImage :src="userAvatar" :alt="userDisplayName" />
              <AvatarFallback class="text-lg">{{ initials }}</AvatarFallback>
            </Avatar>
            <div class="flex-1">
              <h3 class="font-semibold text-lg">{{ userDisplayName }}</h3>
              <p class="text-sm text-muted-foreground">{{ userEmail }}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </SidebarProvider>
</template>

<style scoped>
.preview-indicator {
  padding: 8px 12px;
  text-align: center;
}
.preview-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
}
</style>
