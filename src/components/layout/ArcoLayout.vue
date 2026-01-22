<script setup lang="ts">
import { ref, computed, watch, markRaw, reactive } from 'vue'
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
  Select as ASelect,
  Option as AOption,
  RadioGroup as ARadioGroup,
  Radio as ARadio,
  Textarea as ATextarea
} from '@arco-design/web-vue'
import {
  IconMenuFold,
  IconMenuUnfold,
  IconSettings,
  IconApps,
  IconList,
  IconFile,
  IconFolder,
  IconHome,
  IconUser,
  IconDashboard,
  IconStorage,
  IconCalendar,
  IconSafe,
  IconFire,
  IconMosaic
} from '@arco-design/web-vue/es/icon'
import {
    ChevronRight,
    ChevronsUpDown,
    LogOut,
    Plus,
    GalleryVerticalEnd,
    AudioWaveform,
    Command,
    Pencil,
    Eye,
    Trash2,
    GripVertical
} from 'lucide-vue-next'
import { useConfigStore, type NavMainItem, type NavSubItem } from '@/stores/configStore'
import { useAuthStore } from '@/stores/authStore'
import { useNavigation } from '@/composables/useNavigation'
import type { TeamItem, TeamPermissions } from '@/types'
import { AIChatButton, AIChatWindow } from '@/components/ai'
import draggable from 'vuedraggable'
import { Modal as AModal, Input as AInput, Form as AForm, FormItem as AFormItem, Message, Popconfirm as APopconfirm } from '@arco-design/web-vue'

const configStore = useConfigStore()
const authStore = useAuthStore()
const { breadcrumbs, currentNavId, setNavigation, setDetailTitle } = useNavigation()

// --- 状态管理 ---
const collapsed = ref(false)
const activeTeam = ref<TeamItem | null>(null)

// --- 团队逻辑 ---
const TEAM_ICONS = [markRaw(GalleryVerticalEnd), markRaw(AudioWaveform), markRaw(Command)]

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
        logo: t.logo === 'IconMosaic' ? markRaw(IconMosaic) : (t.logo || TEAM_ICONS[index % TEAM_ICONS.length]),
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

const resolveIcon = (icon: any) => {
    if (!icon) return null
    if (typeof icon === 'string') {
        const iconMap: Record<string, any> = {
            IconSettings, IconApps, IconList, IconFile, IconFolder, IconHome, 
            IconUser, IconDashboard, IconStorage, IconCalendar, IconSafe, IconFire
        }
        return iconMap[icon] || icon
    }
    return icon
}

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
        case 'toggle-edit': configStore.setEditMode(!configStore.isEditMode); break
    }
}

const handleSubNavClick = () => {
  if (breadcrumbs.value.detail) {
    setDetailTitle(null)
  }
}
// --- 编辑模式逻辑 ---
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

const getGroupIndex = (label: string) => {
    return configStore.navGroups.findIndex(g => g.label === label)
}

const openAddMainDialog = (groupLabel: string) => {
    const idx = getGroupIndex(groupLabel)
    if (idx === -1) {
        Message.error('无法找到对应的导航组')
        return
    }
    editDialogMode.value = 'add-main'
    editDialogTitle.value = '添加一级导航'
    editForm.groupIdx = idx
    editForm.title = ''
    editForm.icon = 'IconSettings'
    editDialogVisible.value = true
}

const openEditMainDialog = (groupLabel: string, item: NavMainItem) => {
    const idx = getGroupIndex(groupLabel)
    if (idx === -1) return

    editDialogMode.value = 'edit-main'
    editDialogTitle.value = '编辑一级导航'
    editForm.groupIdx = idx
    editForm.mainItemId = item.id
    editForm.title = item.title
    editForm.icon = typeof item.icon === 'string' ? item.icon : (item.icon?.name || 'IconSettings')
    editDialogVisible.value = true
}

const openAddSubDialog = (groupLabel: string, mainItemId: string) => {
    const idx = getGroupIndex(groupLabel)
    if (idx === -1) return

    editDialogMode.value = 'add-sub'
    editDialogTitle.value = '添加二级导航'
    editForm.groupIdx = idx
    editForm.mainItemId = mainItemId
    editForm.title = ''
    editForm.url = '#'
    editDialogVisible.value = true
}

const openEditSubDialog = (groupLabel: string, mainItemId: string, subItem: NavSubItem) => {
    const idx = getGroupIndex(groupLabel)
    if (idx === -1) return

    editDialogMode.value = 'edit-sub'
    editDialogTitle.value = '编辑二级导航'
    editForm.groupIdx = idx
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
        configStore.addNavMainItem(editForm.groupIdx, {
            title: editForm.title,
            icon: editForm.icon,
            items: [],
            url: ''
        })
        Message.success('添加成功')
    } else if (editDialogMode.value === 'edit-main') {
        configStore.updateNavMainItem(editForm.groupIdx, editForm.mainItemId, {
            title: editForm.title,
            icon: editForm.icon
        })
        Message.success('更新成功')
    } else if (editDialogMode.value === 'add-sub') {
        const newId = configStore.addSubNavItem(editForm.groupIdx, editForm.mainItemId, {
            title: editForm.title,
            url: editForm.url
        })
        
        if (newId) {
             configStore.addPage1Config(newId, {
                filterArea: { columns: 4, gap: '16px', filters: [] },
                tableArea: { height: '500px', scrollX: true, scrollY: true, showCheckbox: true, columns: [] }
             })
        }
         Message.success('添加成功')
    } else if (editDialogMode.value === 'edit-sub') {
        configStore.updateSubNavItem(editForm.groupIdx, editForm.mainItemId, editForm.subItemId, {
            title: editForm.title,
            url: editForm.url
        })
         Message.success('更新成功')
    }
    editDialogVisible.value = false
}

const handleDeleteMain = (groupLabel: string, itemId: string) => {
    const idx = getGroupIndex(groupLabel)
    if (idx > -1) {
        configStore.deleteNavMainItem(idx, itemId)
        Message.success('删除成功')
    }
}

const handleDeleteSub = (groupLabel: string, mainItemId: string, subItemId: string) => {
    const idx = getGroupIndex(groupLabel)
    if (idx > -1) {
        configStore.deleteSubNavItem(idx, mainItemId, subItemId)
        Message.success('删除成功')
    }
}

const iconOptions = [
    { label: 'Settings', value: 'IconSettings' },
    { label: 'Apps', value: 'IconApps' },
    { label: 'List', value: 'IconList' },
    { label: 'File', value: 'IconFile' },
    { label: 'Folder', value: 'IconFolder' },
    { label: 'Home', value: 'IconHome' },
    { label: 'User', value: 'IconUser' },
    { label: 'Dashboard', value: 'IconDashboard' },
    { label: 'Storage', value: 'IconStorage' },
    { label: 'Calendar', value: 'IconCalendar' },
    { label: 'Safe', value: 'IconSafe' },
    { label: 'Fire', value: 'IconFire' },
    { label: 'Mosaic', value: 'IconMosaic' }
]

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

    // Clone current config
    // 注意：authStore.menuConfig 是 readonly ref (computed?) 还是 ref?
    // authStore definition says ref.
    const newConfig = [...(authStore.menuConfig || [])]

    if (menuEditDialog.isEdit && menuEditDialog.editIndex > -1) {
        newConfig[menuEditDialog.editIndex] = newItem
    } else {
        newConfig.push(newItem)
    }

    await authStore.updateMenuConfig(newConfig)
    Message.success('菜单配置已更新')
    menuEditDialog.visible = false
}

const handleHeaderMenuDelete = async (index: number) => {
     const newConfig = [...(authStore.menuConfig || [])]
     newConfig.splice(index, 1)
     await authStore.updateMenuConfig(newConfig)
     Message.success('菜单项已删除')
}



const headerMenuList = computed({
    get: () => authStore.menuConfig || [],
    set: async (val) => {
        // This setter might be called frequently during drag.
        // We might want to debounce or wait for @end event.
        // vuedraggable modifies the array. if we pass store ref directly to v-model, it mutates.
        // If we use computed setter, we trigger action.
        await authStore.updateMenuConfig(val)
    }
})

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
      :width="230"
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
                        <template #icon>
                          <img v-if="typeof team.logo === 'string'" :src="team.logo" class="size-3.5" alt="team logo" />
                          <component v-else :is="team.logo" class="size-3.5" />
                        </template>
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
              v-if="!configStore.isEditMode"
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
                      <div class="flex items-center gap-1.5">
                        <component :is="resolveIcon(item.icon)" v-if="item.icon" class="w-4 h-4 shrink-0" />
                        <span class="truncate">{{ item.title }}</span>
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
                    class="secondary-nav-item"
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

            <!-- 编辑模式视图 -->
            <div v-else class="flex flex-col gap-2 px-2">
                 <div class="flex items-center justify-between px-2 mb-1">
                     <span class="text-xs font-bold text-muted-foreground">{{ group.label }}</span>
                     <a-button size="mini" type="text" @click="openAddMainDialog(group.label)">
                         <Plus class="w-3 h-3" />
                     </a-button>
                 </div>
                 
                 <div v-for="(item) in group.items" :key="item.id" class="border border-dashed border-[var(--color-border-3)] rounded-md p-2 bg-[var(--color-fill-1)]">
                     <!-- 一级菜单行 -->
                     <div class="flex items-center justify-between mb-2 group/main-edit">
                         <div class="flex items-center gap-2">
                             <component :is="resolveIcon(item.icon)" class="w-4 h-4 text-[var(--color-text-2)]" />
                             <span class="text-sm font-medium">{{ item.title }}</span>
                         </div>
                         <div class="flex items-center gap-1 opacity-0 group-hover/main-edit:opacity-100 transition-opacity">
                             <a-button size="mini" type="text" @click="openEditMainDialog(group.label, item)">
                                 <Pencil class="w-3 h-3" />
                             </a-button>
                             <a-button size="mini" type="text" @click="openAddSubDialog(group.label, item.id)">
                                 <Plus class="w-3 h-3" />
                             </a-button>
                              <a-popconfirm content="确定删除此一级导航及所有子项吗?" @ok="handleDeleteMain(group.label, item.id)">
                                 <a-button size="mini" type="text" status="danger">
                                     <Trash2 class="w-3 h-3" />
                                 </a-button>
                             </a-popconfirm>
                         </div>
                     </div>

                     <!-- 二级菜单拖拽列表 -->
                     <draggable 
                        v-model="item.items"
                        item-key="id"
                        group="sub-items"
                        ghost-class="ghost"
                        handle=".drag-handle"
                        class="flex flex-col gap-1 pl-4"
                     >
                        <template #item="{ element: sub }">
                            <div 
                                class="flex items-center justify-between p-1.5 bg-[var(--color-bg-2)] rounded border border-[var(--color-border-2)] group/sub-edit text-xs cursor-pointer hover:bg-[var(--color-fill-2)] transition-colors"
                                @click="handleNavClick(item.title, sub.title, sub.id)"
                            >
                                <div class="flex items-center gap-2 overflow-hidden">
                                    <GripVertical class="w-3 h-3 text-[var(--color-text-4)] cursor-move drag-handle shrink-0" />
                                    <span class="truncate">{{ sub.title }}</span>
                                </div>
                                <div class="flex items-center gap-0.5 opacity-0 group-hover/sub-edit:opacity-100 transition-opacity shrink-0" @click.stop>
                                     <a-button size="mini" type="text" class="!px-1" @click="openEditSubDialog(group.label, item.id, sub)">
                                         <Pencil class="w-3 h-3" />
                                     </a-button>
                                     <a-popconfirm content="确定删除此子项吗?" @ok="handleDeleteSub(group.label, item.id, sub.id)">
                                         <a-button size="mini" type="text" status="danger" class="!px-1">
                                             <Trash2 class="w-3 h-3" />
                                         </a-button>
                                     </a-popconfirm>
                                </div>
                            </div>
                        </template>
                     </draggable>
                 </div>
            </div>
          </div>
        </div>

      </div>
    </a-layout-sider>
    
    <!-- 2. 主体框架 -->
    <a-layout class="h-full overflow-hidden flex flex-col">
        <a-layout-header class="h-14 px-4 bg-[var(--color-bg-2)] border-b border-[var(--color-border-2)] flex items-center justify-between shrink-0 z-10">
            <!-- 页眉左侧 -->
            <div class="flex items-center gap-4 flex-1">
               <AButton shape="circle" size="small" @click="collapsed = !collapsed" class="mr-1">
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
            </div>

            <!-- 页眉右侧 -->
            <div class="flex items-center gap-2">
                <!-- 动态菜单按钮 -->
                <!-- 动态菜单按钮 -->
                <template v-if="!configStore.isEditMode">
                    <template v-for="(item, index) in authStore.menuConfig" :key="index">
                        <!-- 文字按钮 -->
                        <a-button 
                            v-if="item.type === 'text-button'" 
                            type="text" 
                            size="small" 
                            class="text-[var(--color-text-2)] hover:text-[rgb(var(--primary-6))]"
                        >
                            {{ item.label }}
                        </a-button>

                        <!-- 下拉菜单 (Label + Select) -->
                        <div v-else-if="item.type === 'dropdown'" class="flex items-center gap-2">
                            <span class="text-xs text-[var(--color-text-2)]">{{ item.label }}</span>
                            <a-select 
                                :style="{width:'100px'}" 
                                :default-value="item.options?.[0]" 
                                placeholder="请选择" 
                                size="small" 
                                :trigger-props="{ autoFitPopupMinWidth: true }"
                            >
                                <a-option v-for="opt in item.options" :key="opt">{{ opt }}</a-option>
                            </a-select>
                        </div>
                    </template>
                </template>

                <!-- 编辑模式下的动态菜单 -->
                <div v-else class="flex items-center gap-2 p-1 border border-dashed border-primary/30 rounded bg-primary/5">
                    <draggable 
                        v-model="headerMenuList" 
                        item-key="label" 
                        group="header-menu"
                        class="flex items-center gap-2"
                        handle=".drag-handle"
                    >
                        <template #item="{ element, index }">
                            <div class="relative group border border-[var(--color-border-2)] rounded px-2 py-1 bg-[var(--color-bg-1)] flex items-center gap-2 cursor-default">
                                <GripVertical class="w-3 h-3 text-[var(--color-text-4)] cursor-move drag-handle" />
                                
                                <!-- Preview -->
                                <span v-if="element.type === 'text-button'" class="text-xs">{{ element.label }}</span>
                                <div v-else-if="element.type === 'dropdown'" class="flex items-center gap-1">
                                    <span class="text-xs">{{ element.label }}</span>
                                    <span class="text-[10px] text-muted-foreground">[下拉]</span>
                                </div>

                                <!-- Actions -->
                                <div class="flex items-center gap-1 ml-1">
                                    <a-button size="mini" type="text" class="!p-0.5" @click="openEditHeaderMenuDialog(index, element)">
                                        <Pencil class="w-3 h-3" />
                                    </a-button>
                                    <a-popconfirm content="确定删除此菜单项吗?" @ok="handleHeaderMenuDelete(index)">
                                        <a-button size="mini" type="text" status="danger" class="!p-0.5">
                                            <Trash2 class="w-3 h-3" />
                                        </a-button>
                                    </a-popconfirm>
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <a-button size="mini" type="dashed" @click="openAddHeaderMenuDialog">
                        <Plus class="w-3 h-3" />
                    </a-button>
                </div>
                
                <a-divider direction="vertical" class="mx-1 opacity-50" />

                <!-- 用户头像 Dropdown -->
                <a-dropdown @select="handleUserAction" trigger="click" position="br">
                    <div id="user-avatar-trigger" class="p-0.5 rounded-full hover:bg-[var(--color-fill-2)] cursor-pointer transition-colors border border-[var(--color-border-2)] flex items-center justify-center">
                        <a-avatar 
                            :size="32" 
                            :style="{ backgroundColor: 'rgb(var(--primary-6))' }"
                            class="shadow-sm text-white"
                        >
                            <img v-if="authStore.userAvatar" :src="authStore.userAvatar" :alt="authStore.userDisplayName" />
                            <IconUser v-else />
                        </a-avatar>
                    </div>
                    <template #content>
                        <div class="py-1 min-w-[150px]">
                            <a-doption value="toggle-edit" class="py-2.5">
                                <template #icon>
                                    <Pencil v-if="!configStore.isEditMode" class="size-4 opacity-70"/>
                                    <Eye v-else class="size-4 opacity-70"/>
                                </template>
                                <span class="ml-1">{{ configStore.isEditMode ? '预览模式' : '编辑模式' }}</span>
                            </a-doption>
                            <a-doption value="profile" class="py-2.5" id="nav-profile">
                                <template #icon><IconUser class="size-4 opacity-70"/></template>
                                <span class="ml-1">用户中心</span>
                            </a-doption>

                            <a-doption value="logout" class="text-red-500 py-2.5 font-medium">
                                <template #icon><LogOut class="size-4"/></template>
                                <span class="ml-1">退出登录</span>
                            </a-doption>
                        </div>
                    </template>
                </a-dropdown>
            </div>
        </a-layout-header>
        <!-- 2.1 主内容 -->
        <a-layout-content class="flex-1 overflow-hidden min-h-0 bg-[var(--color-fill-2)]">
          <a-scrollbar style="height: 100%; overflow: auto;" outer-style="height: 100%;">
            <div class="p-3 min-h-full flex flex-col container-content">
               <div class="bg-[var(--color-bg-2)] rounded-lg shadow-sm border border-[var(--color-border-2)] flex-1 relative min-h-full overflow-hidden">
                   <slot></slot>
               </div>
            </div>
          </a-scrollbar>
        </a-layout-content>
    </a-layout>

    <!-- AI 悬浮组件 -->
    <AIChatButton />
    <AIChatWindow />

    <!-- 编辑/添加导航弹窗 -->
    <a-modal v-model:visible="editDialogVisible" :title="editDialogTitle" @ok="handleEditSubmit">
        <a-form :model="editForm" layout="vertical">
            <a-form-item field="title" label="标题" required>
                <a-input v-model="editForm.title" placeholder="请输入标题" />
            </a-form-item>
            <a-form-item v-if="editDialogMode.includes('main')" field="icon" label="图标">
                <a-select v-model="editForm.icon" placeholder="选择图标">
                    <a-option v-for="icon in iconOptions" :key="icon.value" :value="icon.value">{{ icon.label }}</a-option>
                </a-select>
            </a-form-item>
            <a-form-item v-if="editDialogMode.includes('sub')" field="url" label="URL (仅展示)">
                 <a-input v-model="editForm.url" placeholder="#" />
            </a-form-item>
        </a-form>
    </a-modal>

    <!-- 顶部菜单编辑弹窗 -->
    <a-modal v-model:visible="menuEditDialog.visible" :title="menuEditDialog.isEdit ? '编辑菜单项' : '新增菜单项'" @ok="handleHeaderMenuSave">
        <a-form :model="menuEditDialog.form" layout="vertical">
            <a-form-item field="type" label="类型">
                <a-radio-group v-model="menuEditDialog.form.type" type="button">
                    <a-radio value="text-button">文字按钮</a-radio>
                    <a-radio value="dropdown">下拉菜单</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="label" label="标题" required>
                <a-input v-model="menuEditDialog.form.label" placeholder="例如：使用文档" />
            </a-form-item>
            <a-form-item v-if="menuEditDialog.form.type === 'dropdown'" field="options" label="选项 (逗号分隔)" required>
                <a-textarea v-model="menuEditDialog.form.options" placeholder="例如：中文, English" />
            </a-form-item>
        </a-form>
    </a-modal>
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

/* 一级导航图标与文字更紧凑 */
:deep(.arco-menu-item .arco-icon), 
:deep(.arco-menu-inline-header .arco-icon) {
    margin-right: 6px !important;
}

/* 二级导航缩进 (比一级多 20px) */
/* 一级默认 padding-left 通常在 16px-32px 左右，这里强制二级缩进更多 */
:deep(.secondary-nav-item) {
    padding-left: 30px !important;
}

:deep(.arco-menu-inline-header.arco-menu-selected) {
    background-color: transparent !important;
    color: rgb(var(--primary-6)) !important;
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

/* 强制内容区滚动条为中等风格 */
:deep(.arco-scrollbar-thumb-direction-vertical),
:deep(.arco-scrollbar-track-direction-vertical) {
    width: 10px !important;
}

:deep(.arco-scrollbar-thumb-bar) {
    background-color: var(--color-fill-4) !important;
    border-radius: 4px !important;
}

:deep(.arco-scrollbar-thumb-bar:hover) {
    background-color: var(--color-text-3) !important;
}
</style>
