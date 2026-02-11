<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import {
  Layout as ALayout, LayoutHeader as ALayoutHeader, LayoutContent as ALayoutContent, LayoutSider as ALayoutSider,
  Button as AButton, Breadcrumb as ABreadcrumb, BreadcrumbItem as ABreadcrumbItem, Menu as AMenu, MenuItem as AMenuItem,
  SubMenu as ASubMenu, Dropdown as ADropdown, Doption as ADoption, Dgroup as ADgroup, Avatar as AAvatar, Divider as ADivider,
  Scrollbar as AScrollbar, Select as ASelect, Option as AOption, RadioGroup as ARadioGroup, Radio as ARadio, Textarea as ATextarea,
  Modal as AModal, Input as AInput, Form as AForm, FormItem as AFormItem, Message, Popconfirm as APopconfirm, Checkbox as ACheckbox
} from '@arco-design/web-vue'
import * as ArcIcons from '@arco-design/web-vue/es/icon'
import { ChevronRight, ChevronsUpDown, LogOut, Plus, Pencil, Eye, Trash2, GripVertical } from 'lucide-vue-next'
import { useConfigStore } from '@/stores/configStore'
import { useConfigPageStore } from '@/stores/config_page_Store'
import { useConfigTeamStore } from '@/stores/config_team_Store'
import { useConfigMenuStore } from '@/stores/config_menu_Store'
import { useAuthStore } from '@/stores/authStore'
import { useAIStore } from '@/stores/aiStore'
import { useNavigation } from '@/composables/useNavigation'
import { supabase } from '@/api/supabase'
import type { TeamItem, NavGroup, MenuItem } from '@/types'
import AIChatAssistant from '@/views/AIChatAssistant.vue'
import draggable from 'vuedraggable'

const configStore = useConfigStore(), pageStore = useConfigPageStore(), teamStore = useConfigTeamStore()
const menuStore = useConfigMenuStore(), authStore = useAuthStore(), aiStore = useAIStore()
const { breadcrumbs, currentNavId, setNavigation, setDetailTitle } = useNavigation()

// --- 状态 ---
const collapsed = ref(false), isNavInitialized = ref(false), activeTeam = ref<TeamItem | null>(null)
const openKeys = ref<string[]>([])

const teamLogoUrl = computed(() => {
    const logoMap: Record<string, string> = { '2063994160@qq.com': 'black.jpeg' }
    return supabase.storage.from('team_avatars').getPublicUrl(logoMap[authStore.userEmail] || 'ai.svg').data.publicUrl
})

const effectiveTeams = computed(() => teamStore.teams)
watch(effectiveTeams, (ts) => { if (ts.length && (!activeTeam.value || !ts.find(t => t.name === activeTeam.value?.name))) activeTeam.value = ts[0] }, { immediate: true })

// --- 导航逻辑 ---
const filteredNavGroups = computed(() => {
    const teams = pageStore.navGroups.flat() || []
    const applyFilter = (gs: NavGroup[]) => gs.map(g => ({ ...g, items: g.items.filter(i => i.visible !== false) })).filter(g => g.items.length > 0)
    
    if (configStore.isInPreviewMode || aiStore.previewMode) return applyFilter(teams)
    if (!activeTeam.value) return applyFilter(teams)

    const perms = activeTeam.value.permissions as any
    if (!perms || (perms.navMain === 'all' && !perms.navItems)) return applyFilter(teams)

    return teams.map(g => ({
        ...g,
        items: g.items.filter(i => (i.visible !== false) && (perms.navMain === 'all' || perms.navMain?.includes(i.id)))
            .map(i => {
                const visibleSubs = perms.navItems?.[i.id]
                return visibleSubs ? { ...i, items: i.items?.filter(s => visibleSubs.includes(s.id)) } : i
            }).filter(i => !i.items || i.items.length > 0)
    })).filter(g => g.items.length > 0)
})

const selectedKeys = computed(() => [currentNavId.value].filter(Boolean) as string[])
const resolveIcon = (icon: any) => typeof icon === 'string' ? (ArcIcons as any)[icon] || icon : icon

const handleNavClick = (main: string, sub: string, id?: string) => { setNavigation(main, sub, id); setDetailTitle(null) }

watch(currentNavId, (id) => {
    if (!id) return
    filteredNavGroups.value.forEach(g => g.items.forEach(i => {
        if (i.items?.some(s => s.id === id) && !openKeys.value.includes('sub-' + i.id)) openKeys.value.push('sub-' + i.id)
    }))
})

watch(filteredNavGroups, (gs) => {
    if (!gs.length) return
    if (!isNavInitialized.value) {
        gs.forEach(g => g.items.forEach(i => i.isOpen && openKeys.value.push('sub-' + i.id)))
        isNavInitialized.value = true
    }
    const allIds = gs.flatMap(g => g.items.flatMap(m => [m.id, ...(m.items?.map(s => s.id) || [])]))
    if (!currentNavId.value || (!allIds.includes(currentNavId.value) && !['settings', 'profile'].includes(currentNavId.value))) {
        const first = gs[0]?.items[0]; if (first) handleNavClick(first.title, first.items?.[0]?.name || first.title, first.items?.[0]?.id || first.id)
    }
}, { immediate: true })

// --- 动作处理 ---
const handleUserAction = (val: any) => {
    const actions: Record<string, () => void> = {
        logout: () => authStore.signOut(),
        profile: () => { setNavigation('账户', '个人资料', 'profile'); setDetailTitle(null) },
        settings: () => { setNavigation('系统', '配置设置', 'settings'); setDetailTitle(null) },
        'toggle-edit': () => configStore.setEditMode(!configStore.isEditMode)
    }
    actions[val]?.()
}

// --- 编辑弹窗统合 ---
const editDialog = reactive({ visible: false, title: '', mode: '', form: { groupIdx: 0, mainId: '', subId: '', title: '', icon: 'IconSettings', visible: true, url: '#' } })
const _openNavDialog = (mode: string, params: any = {}) => {
    Object.assign(editDialog, { visible: true, mode, title: mode.includes('add') ? '新增导航' : '编辑导航' })
    Object.assign(editDialog.form, { groupIdx: params.idx || 0, mainId: params.mId || '', subId: params.sId || '', title: params.item?.name || params.item?.title || '', icon: params.item?.icon || 'IconSettings', visible: params.item?.visible ?? true })
}

const handleEditSubmit = () => {
    const f = editDialog.form; if (!f.title) return Message.warning('请输入标题')
    const actions: any = {
        'add-main': () => pageStore.addNavMainItem({ title: f.title, icon: f.icon, visible: f.visible }),
        'edit-main': () => pageStore.updateNavMainItem(f.mainId, { title: f.title, icon: f.icon, visible: f.visible }),
        'add-sub': () => pageStore.addSubPage(f.mainId, { id: crypto.randomUUID(), name: f.title }),
        'edit-sub': () => pageStore.updateSubPage(f.mainId, f.subId, { name: f.title })
    }
    actions[editDialog.mode]?.(); Message.success('操作成功'); editDialog.visible = false
}

// --- Header 菜单 ---
const hMenuDialog = reactive({ visible: false, isEdit: false, idx: -1, form: { type: 'text-button', label: '', options: '', url: '' } })
const _openHMenuDialog = (idx = -1, item?: any) => {
    Object.assign(hMenuDialog, { visible: true, isEdit: idx > -1, idx, form: { type: item?.type || 'text-button', label: item?.label || '', options: item?.options?.join(',') || '', url: item?.url || '' } })
}

const saveHMenu = async () => {
    const f = hMenuDialog.form; if (!f.label) return Message.warning('请填写标题')
    const newItem = { 
        type: f.type as "text-button" | "dropdown", 
        label: f.label, 
        url: f.type === 'text-button' ? f.url : undefined,
        options: f.type === 'dropdown' ? f.options.split(/[,，]/).map(s => s.trim()).filter(Boolean) : undefined 
    }
    const items = [...(menuStore.menuConfig?.items || [])]
    hMenuDialog.isEdit ? (items[hMenuDialog.idx] = newItem) : items.push(newItem)
    await menuStore.updateMenu({ items }); hMenuDialog.visible = false
}

const iconOptions = Object.keys(ArcIcons)
  .filter(key => key.startsWith('Icon') && key !== 'Icon')
  .map(key => ({ label: key.replace('Icon', ''), value: key }))
  .sort((a, b) => a.label.localeCompare(b.label))

const navStyles = computed(() => {
    const cfg = configStore.layoutConfig
    return {
        mainIcon: { fontSize: `${cfg.mainNavIconSize}px`, transform: `translateX(${cfg.mainNavIconX}px)` },
        mainName: { fontSize: `${cfg.mainNavNameSize}px`, transform: `translateX(${cfg.mainNavNameX}px)` },
        subName: { fontSize: `${cfg.subNavNameSize}px`, transform: `translateX(${cfg.subNavNameX}px)` }
    }
})

const handleMenuClick = (item: MenuItem) => {
  if (item.type === 'text-button' && item.url) {
    let targetUrl = item.url.trim()
    // 如果不是以 http/https 开头且不是以 / 开头，则自动补全 https://
    if (!targetUrl.startsWith('http') && !targetUrl.startsWith('/')) {
      targetUrl = 'https://' + targetUrl
    }
    window.open(targetUrl, '_blank')
  }
}
</script>

<template>
  <a-layout class="h-screen bg-[var(--color-fill-2)]">
    <a-layout-sider :collapsed="collapsed" :width="230" class="border-r border-[var(--color-border-2)] bg-[var(--color-bg-2)] transition-all">
      <div class="flex flex-col h-full overflow-hidden">
        <div class="h-14 flex items-center px-2 border-b border-[var(--color-border-2)]">
          <a-dropdown @select="(v: string) => v !== 'add_team' && (activeTeam = effectiveTeams.find(t => t.name === v)!)" trigger="click" position="br" v-if="!collapsed">
            <div class="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-fill-2)] cursor-pointer w-full overflow-hidden">
                <div class="size-8 rounded-lg bg-white border border-[var(--color-border-2)] flex items-center justify-center overflow-hidden"><img :src="teamLogoUrl" class="size-full" /></div>
                <div class="flex-1 min-w-0 text-left"><div class="truncate font-medium text-sm">{{ activeTeam?.name }}</div><div class="truncate text-xs text-gray-500">{{ activeTeam?.plan }}</div></div>
                <ChevronsUpDown class="size-4 text-gray-400" />
            </div>
            <template #content>
              <a-dgroup title="Teams"><a-doption v-for="t in effectiveTeams" :key="t.name" :value="t.name">{{ t.name }}</a-doption></a-dgroup>
              <a-doption value="add_team"><template #icon><Plus class="size-3.5" /></template>Add team</a-doption>
            </template>
          </a-dropdown>
          <div v-else class="w-full flex justify-center"><img :src="teamLogoUrl" class="size-8 rounded-lg" /></div>
        </div>

        <a-scrollbar class="flex-1 py-4 px-2" :outer-style="{overflow: 'auto', flex: '1', minHeight: '0'}">
          <div v-for="(g, idx) in (configStore.isEditMode ? pageStore.navGroups : filteredNavGroups)" :key="idx" class="mb-6">
            <div v-if="!collapsed && (g.showLabel !== false)" class="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">{{ g.label }}</div>
            <a-menu v-if="!configStore.isEditMode" mode="vertical" :collapsed="collapsed" :selected-keys="selectedKeys" v-model:open-keys="openKeys" class="!bg-transparent !border-none">
              <template v-for="i in g.items" :key="i.id">
                <a-sub-menu v-if="i.items?.length" :key="'sub-'+i.id">
                  <template #title>
                    <div class="flex items-center gap-1 w-full">
                      <component :is="resolveIcon(i.icon)" :style="navStyles.mainIcon" class="shrink-0" />
                      <span :style="navStyles.mainName" class="truncate">{{ i.title }}</span>
                      <ChevronRight v-if="!collapsed" class="ml-auto size-4 transition-transform shrink-0" :class="{'rotate-90': openKeys.includes('sub-'+i.id)}" />
                    </div>
                  </template>
                  <a-menu-item v-for="s in i.items" :key="s.id" class="!pl-8" @click="handleNavClick(i.title, s.name, s.id)">
                    <span :style="navStyles.subName">{{ s.name }}</span>
                  </a-menu-item>
                </a-sub-menu>
                <a-menu-item v-else :key="i.id" @click="handleNavClick(g.label, i.title, i.id)">
                  <div class="flex items-center gap-1">
                    <component :is="resolveIcon(i.icon)" :style="navStyles.mainIcon" class="shrink-0" />
                    <span :style="navStyles.mainName" class="truncate">{{ i.title }}</span>
                  </div>
                </a-menu-item>
              </template>
            </a-menu>
            <!-- 编辑模式导航 -->
            <div v-else class="edit-nav-container space-y-2.5 px-1">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{{ g.label }}</span>
                  <a-button size="mini" type="outline" class="!rounded-md !text-xs !px-1.5 !h-5" @click="_openNavDialog('add-main', {idx})"><Plus class="size-3 mr-0.5" /><span class="text-[11px]">添加</span></a-button>
                </div>
                <div v-for="i in g.items" :key="i.id" class="edit-nav-card rounded-lg border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:border-gray-300">
                    <div class="flex items-center justify-between px-3 py-2">
                        <div class="flex items-center gap-2 min-w-0">
                          <div class="flex items-center justify-center size-7 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600">
                            <component :is="resolveIcon(i.icon)" class="size-4" />
                          </div>
                          <span class="text-sm font-medium text-gray-800 truncate">{{ i.title }}</span>
                        </div>
                        <div class="flex items-center gap-0.5 shrink-0">
                          <a-button size="mini" type="text" class="!p-1 !rounded-md hover:!bg-blue-50" @click="_openNavDialog('edit-main', {idx, mId: i.id, item: i})"><Pencil class="size-3 text-gray-400 hover:text-blue-500" /></a-button>
                          <a-button size="mini" type="text" class="!p-1 !rounded-md hover:!bg-green-50" @click="_openNavDialog('add-sub', {idx, mId: i.id})"><Plus class="size-3 text-gray-400 hover:text-green-500" /></a-button>
                          <a-popconfirm content="确定删除?" @ok="pageStore.deleteNavMainItem(i.id)"><a-button size="mini" type="text" class="!p-1 !rounded-md hover:!bg-red-50"><Trash2 class="size-3 text-gray-400 hover:text-red-500" /></a-button></a-popconfirm>
                        </div>
                    </div>
                    <draggable v-if="i.items?.length" v-model="i.items" item-key="id" group="subs" handle=".drag-handle" class="px-2 pb-2 space-y-1" @change="pageStore.savePageConfig(i.title, i as any)">
                        <template #item="{ element: s }">
                            <div class="edit-nav-sub flex items-center justify-between py-1.5 px-2 bg-gray-50/80 border border-gray-100 rounded-md text-xs group/sub cursor-pointer transition-all duration-150 hover:bg-blue-50/50 hover:border-blue-200" @click="handleNavClick(i.title, s.name, s.id)">
                                <div class="flex items-center gap-2 min-w-0">
                                  <GripVertical class="size-3 text-gray-300 drag-handle cursor-move shrink-0 hover:text-gray-500" />
                                  <span class="truncate text-gray-600">{{ s.name }}</span>
                                </div>
                                <div class="flex gap-0.5 opacity-0 group-hover/sub:opacity-100 transition-opacity shrink-0">
                                  <a-button size="mini" type="text" class="!px-1 !py-0.5 !rounded" @click.stop="_openNavDialog('edit-sub', {idx, mId: i.id, sId: s.id, item: s})"><Pencil class="size-3 text-gray-400" /></a-button>
                                  <a-popconfirm content="确定删除?" @ok="pageStore.deleteSubPage(i.id, s.id)"><a-button size="mini" type="text" status="danger" class="!px-1 !py-0.5 !rounded"><Trash2 class="size-3" /></a-button></a-popconfirm>
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <div v-else class="px-3 pb-2">
                      <div class="text-[11px] text-gray-300 italic py-1">暂无子页面</div>
                    </div>
                </div>
            </div>
          </div>
        </a-scrollbar>
      </div>
    </a-layout-sider>

    <a-layout class="overflow-hidden bg-[var(--color-fill-2)]">
      <a-layout-header class="h-14 px-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 z-10">
        <div class="flex items-center gap-4 flex-1">
          <a-button shape="circle" size="small" @click="collapsed = !collapsed"><ArcIcons.IconMenuUnfold v-if="collapsed" /><ArcIcons.IconMenuFold v-else /></a-button>
          <a-breadcrumb><a-breadcrumb-item>{{ breadcrumbs.main }}</a-breadcrumb-item><a-breadcrumb-item v-if="breadcrumbs.detail" class="cursor-pointer" @click="setDetailTitle(null)">{{ breadcrumbs.sub }}</a-breadcrumb-item><a-breadcrumb-item v-else>{{ breadcrumbs.sub }}</a-breadcrumb-item><a-breadcrumb-item v-if="breadcrumbs.detail">{{ breadcrumbs.detail }}</a-breadcrumb-item></a-breadcrumb>
          <div id="breadcrumb-actions" class="flex items-center gap-4 ml-4"></div>
        </div>
        <div class="flex items-center gap-2">
            <template v-if="!configStore.isEditMode">
              <template v-for="(i, idx) in menuStore.menuConfig?.items" :key="idx">
                <a-button 
                  v-if="i.type==='text-button'" 
                  type="text" 
                  size="small" 
                  @click="handleMenuClick(i)"
                >
                  {{ i.label }}
                </a-button>
                <div v-else class="flex items-center gap-2 text-xs">
                  <span>{{ i.label }}</span>
                  <a-select size="small" style="width:100px" :default-value="i.options?.[0]">
                    <a-option v-for="o in i.options" :key="o">{{ o }}</a-option>
                  </a-select>
                </div>
              </template>
            </template>
            <div v-else class="flex items-center gap-2 p-1 border border-dashed border-primary/30 rounded bg-primary/5">
                <draggable v-model="menuStore.menuConfig.items" item-key="label" handle=".drag-handle" class="flex gap-2" @change="menuStore.updateMenu({items: menuStore.menuConfig.items})">
                    <template #item="{ element, index }">
                        <div class="flex items-center gap-2 bg-white border border-gray-200 rounded px-2 py-1 text-xs"><GripVertical class="size-3 text-gray-400 drag-handle" /><span>{{ element.label }}</span><a-button size="mini" type="text" class="!p-0.5" @click="_openHMenuDialog(index, element)"><Pencil class="size-3" /></a-button><a-popconfirm content="删除?" @ok="() => { menuStore.menuConfig.items.splice(index, 1); menuStore.updateMenu({items: menuStore.menuConfig.items}) }"><a-button size="mini" type="text" status="danger" class="!p-0.5"><Trash2 class="size-3" /></a-button></a-popconfirm></div>
                    </template>
                </draggable>
                <a-button size="mini" type="dashed" @click="_openHMenuDialog()"><Plus class="size-3" /></a-button>
            </div>
            <a-divider direction="vertical" class="mx-1 opacity-50" />
            <a-dropdown @select="handleUserAction" trigger="click" position="br">
                <div id="user-avatar-trigger" class="p-0.5 rounded-full hover:bg-gray-100 cursor-pointer border border-gray-200">
                    <a-avatar :size="32" :image-url="authStore.userAvatar" class="shadow-sm" />
                </div>
                <template #content>
                    <div class="py-1 min-w-[150px]">
                        <a-doption id="nav-profile" value="profile" class="py-2.5">
                            <template #icon><ArcIcons.IconUser class="size-4 opacity-70"/></template>
                            用户中心
                        </a-doption>
                        <a-doption id="nav-edit-mode" value="toggle-edit" class="py-2.5">
                            <template #icon><component :is="configStore.isEditMode ? Eye : Pencil" class="size-4 opacity-70"/></template>
                            {{ configStore.isEditMode ? '预览模式' : '编辑模式' }}
                        </a-doption>
                        <a-doption value="logout" class="text-red-500 py-2.5 font-medium">
                            <template #icon><LogOut class="size-4"/></template>
                            退出登录
                        </a-doption>
                    </div>
                </template>
            </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="flex-1 overflow-hidden bg-[var(--color-fill-2)]">
        <div class="h-full overflow-y-auto arco-native-scrollbar">
          <div class="p-3 min-h-full flex flex-col">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 relative min-h-full flex flex-col">
              <slot></slot>
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>

    <AIChatAssistant />
    <a-modal v-model:visible="editDialog.visible" :title="editDialog.title" @ok="handleEditSubmit"><a-form :model="editDialog.form" layout="vertical"><a-form-item label="标题" required><a-input v-model="editDialog.form.title" /></a-form-item><a-form-item v-if="editDialog.mode.includes('main')" label="图标"><a-select v-model="editDialog.form.icon" allow-search><a-option v-for="i in iconOptions" :key="i.value" :value="i.value"><template #icon><component :is="resolveIcon(i.value)" /></template>{{ i.label }}</a-option></a-select></a-form-item><a-form-item v-if="editDialog.mode.includes('main')" label="可见性"><a-checkbox v-model="editDialog.form.visible">侧边栏可见</a-checkbox></a-form-item></a-form></a-modal>
    <a-modal v-model:visible="hMenuDialog.visible" :title="hMenuDialog.isEdit ? '编辑菜单' : '新增菜单'" @ok="saveHMenu">
      <a-form :model="hMenuDialog.form" layout="vertical">
        <a-form-item label="类型">
          <a-radio-group v-model="hMenuDialog.form.type" type="button">
            <a-radio value="text-button">按钮</a-radio>
            <a-radio value="dropdown">下拉</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="标题" required>
          <a-input v-model="hMenuDialog.form.label" />
        </a-form-item>
        <a-form-item v-if="hMenuDialog.form.type === 'text-button'" label="跳转链接 (可选)">
          <a-input v-model="hMenuDialog.form.url" placeholder="https://..." />
        </a-form-item>
        <a-form-item v-if="hMenuDialog.form.type === 'dropdown'" label="选项 (逗号分隔)" required>
          <a-textarea v-model="hMenuDialog.form.options" />
        </a-form-item>
      </a-form>
    </a-modal>

  </a-layout>
</template>

<style scoped>
/* Arco Design Medium Scrollbar Style */
.arco-native-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
.arco-native-scrollbar::-webkit-scrollbar-thumb { border: 2px solid transparent; background-clip: content-box; background-color: var(--color-fill-4); border-radius: 5px; }
.arco-native-scrollbar::-webkit-scrollbar-thumb:hover { background-color: var(--color-fill-5); }
.arco-native-scrollbar::-webkit-scrollbar-track { background-color: transparent; }

:deep(.arco-menu-inner) { padding: 0 4px !important; }
:deep(.arco-menu-item), :deep(.arco-menu-inline-header) { border-radius: 6px; margin-bottom: 2px; color: var(--color-text-2); transition: all 0.2s; }
:deep(.arco-menu-selected) { color: rgb(var(--primary-6)) !important; font-weight: 600; }
/* 一级导航：透明底 + 左侧指示条 */
:deep(.arco-menu-item.arco-menu-selected) { background-color: transparent !important; }
:deep(.arco-menu-item.arco-menu-selected)::before { content: ''; position: absolute; left: 0; top: 8px; bottom: 8px; width: 3px; background-color: rgb(var(--primary-6)); border-radius: 0 4px 4px 0; }
/* 二级导航：改为更浅的灰底，字体设为蓝色，移除指示条 */
:deep(.arco-menu-inline-content .arco-menu-item.arco-menu-selected) { background-color: var(--color-fill-2) !important; color: rgb(var(--primary-6)) !important; }
:deep(.arco-menu-inline-content .arco-menu-item.arco-menu-selected)::before { display: none; }
:deep(.arco-menu-icon-suffix) { display: none !important; }
:deep(.arco-scrollbar-thumb-bar) { background-color: var(--color-fill-4) !important; border-radius: 4px !important; }
</style>
