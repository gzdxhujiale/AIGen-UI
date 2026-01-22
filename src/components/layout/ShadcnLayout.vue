<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import draggable from 'vuedraggable'
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
  Pencil,
  Eye,
  GripVertical,
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// --- Logic & Config ---
import { useConfigStore } from '@/stores/configStore'
import { useConfigTeamStore } from '@/stores/config_team_Store'
import { useConfigPageStore } from '@/stores/config_page_Store'
import { useConfigMenuStore } from '@/stores/config_menu_Store'
import { useAuthStore } from '@/stores/authStore'
import { useNavigation } from '@/composables/useNavigation'
// import { defaultSidebarConfig } from '@/config/schema' // Removed
import type { TeamItem } from '@/types'

const configStore = useConfigStore()
const pageStore = useConfigPageStore()
const teamStore = useConfigTeamStore()
const menuStore = useConfigMenuStore()
const authStore = useAuthStore()
const { breadcrumbs, currentSubNav, setNavigation, setDetailTitle } = useNavigation()

// --- 状态与配置 ---
// const sidebarConfig = defaultSidebarConfig // Removed legacy config
const isLoggingOut = ref(false)
const accountDialogOpen = ref(false)

// --- 团队计算 ---
const effectiveTeams = computed<TeamItem[]>(() => {
  return teamStore.teams
})

const activeTeam = ref<TeamItem | null>(null)

watch(effectiveTeams, (newTeams) => {
    if (newTeams.length > 0 && (!activeTeam.value || !newTeams.find(t => t.name === activeTeam.value?.name))) {
        activeTeam.value = newTeams[0]
    }
}, { deep: true, immediate: true })

// --- 导航过滤 ---
const filteredNavGroups = computed(() => {
  const team = activeTeam.value
  const navGroups = pageStore.navGroups.flat() // Use pageStore instead of configStore configStore.effectiveNavGroups
  
  // 如果没有导航组数据，直接返回空数组
  if (!navGroups || navGroups.length === 0) return []
  
  // 如果没有团队配置，直接返回所有导航
  if (!team) return navGroups
  
  // 检查 permissions 是否为有效的对象格式 (防止 Supabase 数据格式异常)
  const permissions = team.permissions
  if (!permissions || typeof permissions !== 'object' || Array.isArray(permissions)) {
    return navGroups
  }
  
  const { navMain, navItems } = permissions
  
  // 如果是全部权限且没有细粒度控制，直接返回
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
    // 使用 optional chaining 并提供空数组作为后备
    const currentProjectGroups = configStore.projectGroups || []
    
    if (!team || !team.permissions) return currentProjectGroups
    const { projects } = team.permissions
    if (projects === 'all') return currentProjectGroups

    return currentProjectGroups.map(group => {
        const filteredProjects = group.projects.filter((project: any) => Array.isArray(projects) && projects.includes(project.id))
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
const userDisplayName = computed(() => authStore.userDisplayName || 'User') // Fallback to 'User' since schema is removed
const userEmail = computed(() => authStore.userEmail || 'user@example.com')
const userAvatar = computed(() => authStore.userAvatar || '')
const initials = computed(() => userDisplayName.value.slice(0, 2).toUpperCase())

// --- 编辑模式逻辑 (从 ArcoLayout 移植) ---
const editDialogVisible = ref(false)
const editDialogTitle = ref('')
const editDialogMode = ref<'add-main' | 'edit-main' | 'add-sub' | 'edit-sub'>('add-main')
const editForm = reactive({
    groupIdx: 0,
    mainItemId: '',
    subItemId: '',
    title: '',
    url: '',
    icon: ''
})

const openAddMainDialog = (groupIdx: number) => {
    editDialogMode.value = 'add-main'
    editDialogTitle.value = '添加一级导航'
    editForm.groupIdx = groupIdx
    editForm.title = ''
    editForm.icon = 'Settings'
    editDialogVisible.value = true
}

const openEditMainDialog = (groupIdx: number, item: any) => {
    editDialogMode.value = 'edit-main'
    editDialogTitle.value = '编辑一级导航'
    editForm.groupIdx = groupIdx
    editForm.mainItemId = item.id
    editForm.title = item.title
    editForm.icon = typeof item.icon === 'string' ? item.icon : (item.icon?.name || 'Settings')
    editDialogVisible.value = true
}

const openAddSubDialog = (groupIdx: number, mainItemId: string) => {
    editDialogMode.value = 'add-sub'
    editDialogTitle.value = '添加二级导航'
    editForm.groupIdx = groupIdx
    editForm.mainItemId = mainItemId
    editForm.title = ''
    editForm.url = '#'
    editDialogVisible.value = true
}

const openEditSubDialog = (groupIdx: number, mainItemId: string, subItem: any) => {
    editDialogMode.value = 'edit-sub'
    editDialogTitle.value = '编辑二级导航'
    editForm.groupIdx = groupIdx
    editForm.mainItemId = mainItemId
    editForm.subItemId = subItem.id
    editForm.title = subItem.title
    editForm.url = subItem.url || '#'
    editDialogVisible.value = true
}

const handleEditSubmit = () => {
    if (!editForm.title) {
        Message.warning('请输入标题')
        return
    }

    if (editDialogMode.value === 'add-main') {
        pageStore.addNavMainItem({
            title: editForm.title,
            icon: editForm.icon,
        })
        Message.success('添加成功')
    } else if (editDialogMode.value === 'edit-main') {
        pageStore.updateNavMainItem(editForm.mainItemId, {
            title: editForm.title,
            icon: editForm.icon
        })
        Message.success('更新成功')
    } else if (editDialogMode.value === 'add-sub') {
        pageStore.addSubPage(editForm.mainItemId, {
            id: crypto.randomUUID(),
            name: editForm.title,
        })
        Message.success('添加成功')
    } else if (editDialogMode.value === 'edit-sub') {
        pageStore.updateSubPage(editForm.mainItemId, editForm.subItemId, {
            name: editForm.title
        })
         Message.success('更新成功')
    }
    editDialogVisible.value = false
}

const handleDeleteMain = (groupIdx: number, itemId: string) => {
    // 简单确认，因为 Popconfirm 不在 shadcn 默认组件中，或者需要额外引入
    if(!confirm('确定删除此一级导航及所有子项吗?')) return
    pageStore.deleteNavMainItem(itemId)
    Message.success('删除成功')
}

const handleDeleteSub = (groupIdx: number, mainItemId: string, subItemId: string) => {
    if(!confirm('确定删除此子项吗?')) return
    pageStore.deleteSubPage(mainItemId, subItemId)
    Message.success('删除成功')
}

const iconOptions = [
    { label: 'Settings', value: 'Settings' },
    { label: 'Gallery', value: 'GalleryVerticalEnd' },
    { label: 'Audio', value: 'AudioWaveform' },
    { label: 'Command', value: 'Command' },
    { label: 'Folder', value: 'Folder' },
    { label: 'Forward', value: 'Forward' },
    { label: 'More', value: 'MoreHorizontal' },
    { label: 'Trash', value: 'Trash2' },
    { label: 'Pencil', value: 'Pencil' },
    { label: 'Eye', value: 'Eye' },
]

const resolveIcon = (icon: any) => {
    if (typeof icon === 'string') {
        const iconMap: Record<string, any> = {
            Settings, GalleryVerticalEnd, AudioWaveform, Command,
            Folder, Forward, MoreHorizontal, Trash2, Pencil, Eye
        }
        return iconMap[icon] || icon
    }
    return icon
}

// --- Header Menu Editing ---
const menuEditDialog = reactive({
    visible: false,
    isEdit: false,
    editIndex: -1,
    form: {
        type: 'text-button',
        label: '',
        options: ''
    }
})

const openAddHeaderMenuDialog = () => {
    menuEditDialog.isEdit = false
    menuEditDialog.editIndex = -1
    menuEditDialog.form = { type: 'text-button', label: '', options: '' }
    menuEditDialog.visible = true
}

const openEditHeaderMenuDialog = (index: number, item: any) => {
    menuEditDialog.isEdit = true
    menuEditDialog.editIndex = index
    menuEditDialog.form = {
        type: item.type,
        label: item.label,
        options: item.options ? item.options.join(',') : ''
    }
    menuEditDialog.visible = true
}

const handleHeaderMenuSave = async () => {
    if (!menuEditDialog.form.label) {
        Message.warning('请输入按钮文字')
        return
    }

    const newItem: any = {
        type: menuEditDialog.form.type,
        label: menuEditDialog.form.label
    }

    if (menuEditDialog.form.type === 'dropdown') {
        if (!menuEditDialog.form.options) {
             Message.warning('请输入选项（以逗号分隔）')
             return
        }
        newItem.options = menuEditDialog.form.options.split(/[,，]/).map((s: string) => s.trim()).filter(Boolean)
    }

    const newConfig = [...(menuStore.menuConfig?.items || [])]

    if (menuEditDialog.isEdit && menuEditDialog.editIndex > -1) {
        newConfig[menuEditDialog.editIndex] = newItem
    } else {
        newConfig.push(newItem)
    }

    await menuStore.updateMenu({ items: newConfig })
    Message.success('菜单配置已更新')
    menuEditDialog.visible = false
}

const handleHeaderMenuDelete = async (index: number) => {
     if(!confirm('确定删除此菜单项吗?')) return
     const newConfig = [...(menuStore.menuConfig?.items || [])]
     newConfig.splice(index, 1)
     await menuStore.updateMenu({ items: newConfig })
     Message.success('菜单项已删除')
}

const headerMenuList = computed({
    get: () => menuStore.menuConfig?.items || [],
    set: async (val) => {
        await menuStore.updateMenu({ items: val })
    }
})
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
                            <DropdownMenuItem v-for="team in effectiveTeams" :key="team.name" @click="activeTeam = team" class="gap-2 p-2">
                                <div class="flex size-6 items-center justify-center rounded-sm border">
                                    <component :is="team.logo" class="size-4 shrink-0" />
                                </div>
                                {{ team.name }}
                                <DropdownMenuShortcut>⌘{{ effectiveTeams.indexOf(team) + 1 }}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem class="gap-2 p-2" @click="handleNavClick('Account', 'Profile', 'profile')">
                                <div class="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Plus class="size-4" />
                                </div>
                                <div class="font-medium text-muted-foreground">Add team</div>
                            </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <!-- 1.2 导航内容 -->
      <SidebarContent>
        <!-- Normal Mode -->
        <template v-if="!configStore.isEditMode">
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
        </template>

        <!-- Edit Mode -->
        <template v-else>
            <SidebarGroup v-for="(group, groupIdx) in pageStore.navGroups" :key="group.label || groupIdx">
                 <div class="flex items-center justify-between px-2 mb-2">
                    <SidebarGroupLabel>{{ group.label || 'Group' }}</SidebarGroupLabel>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        class="h-6 w-6 ml-auto" 
                        @click="openAddMainDialog(groupIdx)"
                    >
                        <Plus class="h-4 w-4" />
                    </Button>
                </div>

                <SidebarMenu>
                    <div v-for="(item) in group.items" :key="item.id" class="mb-2 border border-dashed rounded-md p-2">
                        <!-- Main Item Edit Row -->
                        <div class="flex items-center justify-between group/main-edit mb-2">
                            <div class="flex items-center gap-2">
                                <component :is="resolveIcon(item.icon)" class="h-4 w-4 text-muted-foreground" />
                                <span class="text-sm font-medium">{{ item.title }}</span>
                            </div>
                            <div class="flex items-center gap-1 opacity-50 group-hover/main-edit:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" class="h-6 w-6" @click="openEditMainDialog(groupIdx, item)">
                                    <Pencil class="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" class="h-6 w-6" @click="openAddSubDialog(groupIdx, item.id)">
                                    <Plus class="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" class="h-6 w-6 text-destructive" @click="handleDeleteMain(groupIdx, item.id)">
                                    <Trash2 class="h-3 w-3" />
                                </Button>
                            </div>
                        </div>

                        <!-- Sub Items Draggable -->
                        <draggable 
                            v-model="item.items"
                            item-key="id"
                            group="sub-items"
                            handle=".drag-handle"
                            class="flex flex-col gap-1 pl-2"
                        >
                            <template #item="{ element: sub }">
                                <div 
                                    class="flex items-center justify-between p-1.5 rounded bg-muted/30 border border-transparent hover:border-border group/sub-edit text-xs cursor-pointer hover:bg-muted transition-colors"
                                    @click="handleNavClick(item.title, sub.title, sub.id)"
                                >
                                    <div class="flex items-center gap-2 overflow-hidden">
                                        <GripVertical class="h-3 w-3 text-muted-foreground cursor-move drag-handle shrink-0" />
                                        <span class="truncate">{{ sub.title }}</span>
                                    </div>
                                    <div class="flex items-center gap-0.5 opacity-0 group-hover/sub-edit:opacity-100 transition-opacity shrink-0" @click.stop>
                                            <Button variant="ghost" size="icon" class="h-5 w-5" @click="openEditSubDialog(groupIdx, item.id, sub)">
                                                <Pencil class="h-3 w-3" />
                                            </Button>
                                            <Button variant="ghost" size="icon" class="h-5 w-5 text-destructive" @click="handleDeleteSub(groupIdx, item.id, sub.id)">
                                                <Trash2 class="h-3 w-3" />
                                            </Button>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </SidebarMenu>
            </SidebarGroup>
        </template>

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
                  <DropdownMenuItem @click="configStore.setEditMode(!configStore.isEditMode)">
                    <Pencil v-if="!configStore.isEditMode" />
                    <Eye v-else />
                    {{ configStore.isEditMode ? '预览模式' : '编辑模式' }}
                  </DropdownMenuItem>
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
        <div id="breadcrumb-actions" class="flex items-center gap-4 ml-auto">
            <!-- Normal Mode: Render Menu Items -->
            <template v-if="!configStore.isEditMode">
                <template v-for="(item, index) in menuStore.menuConfig?.items || []" :key="index">
                    <!-- Text Button -->
                    <Button 
                        v-if="item.type === 'text-button'" 
                        variant="ghost" 
                        size="sm" 
                        class="text-muted-foreground hover:text-primary"
                    >
                        {{ item.label }}
                    </Button>

                    <!-- Dropdown -->
                    <div v-else-if="item.type === 'dropdown'" class="flex items-center gap-2">
                        <span class="text-xs text-muted-foreground">{{ item.label }}</span>
                        <Select :default-value="item.options?.[0]">
                          <SelectTrigger class="w-[100px] h-8 text-xs">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem v-for="opt in item.options" :key="opt" :value="opt">{{ opt }}</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                </template>
            </template>

            <!-- Edit Mode: Render Draggable Menu Editor -->
            <div v-else class="flex items-center gap-2 p-1 border border-dashed border-primary/30 rounded bg-primary/5">
                <draggable 
                    v-model="headerMenuList" 
                    item-key="label" 
                    group="header-menu"
                    class="flex items-center gap-2"
                    handle=".drag-handle"
                >
                    <template #item="{ element, index }">
                        <div class="relative group border rounded px-2 py-1 bg-background flex items-center gap-2 cursor-default border-border">
                            <GripVertical class="h-3 w-3 text-muted-foreground cursor-move drag-handle" />
                            
                            <span v-if="element.type === 'text-button'" class="text-xs">{{ element.label }}</span>
                            <div v-else-if="element.type === 'dropdown'" class="flex items-center gap-1">
                                <span class="text-xs">{{ element.label }}</span>
                                <span class="text-[10px] text-muted-foreground">[Dropdown]</span>
                            </div>

                            <div class="flex items-center gap-1 ml-1">
                                <Button variant="ghost" size="icon" class="h-5 w-5" @click="openEditHeaderMenuDialog(index, element)">
                                    <Pencil class="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" class="h-5 w-5 text-destructive" @click="handleHeaderMenuDelete(index)">
                                    <Trash2 class="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </template>
                </draggable>
                <Button variant="outline" size="icon" class="h-6 w-6 border-dashed" @click="openAddHeaderMenuDialog">
                    <Plus class="h-3 w-3" />
                </Button>
            </div>
        </div>
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

    <!-- Nav Item Edit Dialog -->
    <Dialog v-model:open="editDialogVisible">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ editDialogTitle }}</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="nav-title" class="text-right text-sm font-medium">标题</label>
            <Input id="nav-title" v-model="editForm.title" class="col-span-3" />
          </div>
          <div v-if="editDialogMode.includes('main')" class="grid grid-cols-4 items-center gap-4">
            <label for="nav-icon" class="text-right text-sm font-medium">图标</label>
             <Select v-model="editForm.icon">
                <SelectTrigger class="col-span-3">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="icon in iconOptions" :key="icon.value" :value="icon.value">
                    <div class="flex items-center gap-2">
                         <!-- Since we don't have dynamic icon component ready for select item easily without complex setup, just showing text -->
                        {{ icon.label }}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
          </div>
          <div v-if="editDialogMode.includes('sub')" class="grid grid-cols-4 items-center gap-4">
            <label for="nav-url" class="text-right text-sm font-medium">URL</label>
            <Input id="nav-url" v-model="editForm.url" class="col-span-3" />
          </div>
        </div>
        <div class="flex justify-end">
            <Button @click="handleEditSubmit">保存</Button>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Menu Item Edit Dialog -->
    <Dialog v-model:open="menuEditDialog.visible">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>{{ menuEditDialog.isEdit ? '编辑菜单项' : '新增菜单项' }}</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
             <div class="grid grid-cols-4 items-center gap-4">
                <label class="text-right text-sm font-medium">类型</label>
                <div class="col-span-3 flex gap-4">
                     <!-- Simple Radio Implementation -->
                     <label class="flex items-center gap-2 text-sm">
                        <input type="radio" v-model="menuEditDialog.form.type" value="text-button" />
                        文字按钮
                     </label>
                     <label class="flex items-center gap-2 text-sm">
                        <input type="radio" v-model="menuEditDialog.form.type" value="dropdown" />
                        下拉菜单
                     </label>
                </div>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
                <label for="menu-label" class="text-right text-sm font-medium">标题</label>
                <Input id="menu-label" v-model="menuEditDialog.form.label" class="col-span-3" />
            </div>
            <div v-if="menuEditDialog.form.type === 'dropdown'" class="grid grid-cols-4 items-start gap-4">
                <label for="menu-options" class="text-right text-sm font-medium pt-2">选项</label>
                <!-- Using HTML textarea with shadcn-like styling -->
                <textarea 
                    id="menu-options" 
                    v-model="menuEditDialog.form.options" 
                    class="col-span-3 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="选项1, 选项2 (逗号分隔)"
                ></textarea>
            </div>
        </div>
        <div class="flex justify-end">
             <Button @click="handleHeaderMenuSave">保存</Button>
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
