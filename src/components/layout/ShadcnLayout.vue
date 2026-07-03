<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import draggable from 'vuedraggable'
import * as LucideIcons from 'lucide-vue-next'
import {
  ChevronRight, ChevronsUpDown, Plus, BadgeCheck, LogOut, Pencil, Eye, Trash2, GripVertical
} from 'lucide-vue-next'

// --- UI Components ---
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarInset, SidebarProvider, SidebarTrigger, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Message, Scrollbar as AScrollbar } from '@arco-design/web-vue'
import AIChatAssistant from '@/views/AIChatAssistant.vue'

// --- Stores & Composables ---
import { useConfigStore } from '@/stores/configStore'
import { useConfigPageStore } from '@/stores/config_page_Store'
import { useConfigTeamStore } from '@/stores/config_team_Store'
import { useConfigMenuStore } from '@/stores/config_menu_Store'
import { useAuthStore } from '@/stores/authStore'
import { useNavigation } from '@/composables/useNavigation'
import type { TeamItem, NavGroup } from '@/types'

const configStore = useConfigStore(), pageStore = useConfigPageStore(), teamStore = useConfigTeamStore()
const menuStore = useConfigMenuStore(), authStore = useAuthStore()
const { breadcrumbs, currentSubNav, setNavigation, setDetailTitle } = useNavigation()

// --- 状态 ---
const isLoggingOut = ref(false), activeTeam = ref<TeamItem | null>(null)
const effectiveTeams = computed(() => teamStore.teams)
watch(effectiveTeams, (ts) => { if (ts.length && (!activeTeam.value || !ts.find(t => t.name === activeTeam.value?.name))) activeTeam.value = ts[0] }, { immediate: true, deep: true })

// --- 导航路由逻辑 ---
const filteredNavGroups = computed(() => {
    const teams = pageStore.navGroups.flat() || []
    const applyFilter = (gs: NavGroup[]) => gs.map(g => ({ ...g, items: g.items.filter(i => i.visible !== false) })).filter(g => g.items.length > 0)
    
    if (configStore.isInPreviewMode) return applyFilter(teams)
    if (!activeTeam.value) return applyFilter(teams)

    const perms = activeTeam.value.permissions as any
    if (!perms || (perms.navMain === 'all' && !perms.navItems)) return applyFilter(teams)

    return teams.map(g => ({
        ...g,
        items: g.items.filter(i => perms.navMain === 'all' || perms.navMain?.includes(i.id))
            .map(i => {
                const subs = perms.navItems?.[i.id]
                return subs ? { ...i, items: i.items?.filter(s => subs.includes(s.id)) } : i
            }).filter(i => !i.items || i.items.length > 0)
    })).filter(g => g.items.length > 0)
})

const handleNavClick = (main: string, sub: string, id?: string) => { setNavigation(main, sub, id); setDetailTitle(null) }
const resolveIcon = (icon: any) => typeof icon === 'string' ? (LucideIcons as any)[icon] || icon : icon

// --- 动作分发 ---
const handleUserAction = (val: string) => {
    const actions: Record<string, () => void> = {
        logout: async () => {
            isLoggingOut.value = true
            try { await authStore.signOut(); Message.success('已退出') } catch (e: any) { Message.error(e.message || '失败') } finally { isLoggingOut.value = false }
        },
        profile: () => handleNavClick('账户', '个人资料', 'profile'),
        'toggle-edit': () => configStore.setEditMode(!configStore.isEditMode)
    }
    actions[val]?.()
}

// --- 统一弹窗逻辑 ---
const editDialog = reactive({ visible: false, title: '', mode: '', form: { idx: 0, mId: '', sId: '', title: '', icon: 'Settings', url: '#', pageType: 'list' as 'list' | 'form' } })
const _openNavDialog = (mode: string, params: any = {}) => {
    Object.assign(editDialog, { visible: true, mode, title: mode.includes('add') ? '新增导航' : '编辑导航' })
    Object.assign(editDialog.form, { idx: params.idx || 0, mId: params.mId || '', sId: params.sId || '', title: params.item?.name || params.item?.title || '', icon: params.item?.icon || 'Settings', url: params.item?.url || '#', pageType: params.item?.pageType || 'list' })
}

const handleEditSubmit = () => {
    const f = editDialog.form; if (!f.title) return Message.warning('请输入标题')
    const actions: any = {
        'add-main': () => pageStore.addNavMainItem({ title: f.title, icon: f.icon }),
        'edit-main': () => pageStore.updateNavMainItem(f.mId, { title: f.title, icon: f.icon }),
        'add-sub': () => pageStore.addSubPage(f.mId, { id: crypto.randomUUID(), name: f.title, pageType: f.pageType }),
        'edit-sub': () => pageStore.updateSubPage(f.mId, f.sId, { name: f.title, pageType: f.pageType })
    }
    actions[editDialog.mode]?.(); Message.success('操作成功'); editDialog.visible = false
}

const hMenuDialog = reactive({ visible: false, isEdit: false, idx: -1, form: { type: 'text-button', label: '', options: '' } })
const _openHMenuDialog = (idx = -1, item?: any) => {
    Object.assign(hMenuDialog, { visible: true, isEdit: idx > -1, idx, form: { type: item?.type || 'text-button', label: item?.label || '', options: item?.options?.join(',') || '' } })
}

const saveHMenu = async () => {
    const f = hMenuDialog.form; if (!f.label) return Message.warning('请填写标题')
    const newItem = { type: f.type as any, label: f.label, options: f.type === 'dropdown' ? f.options.split(/[,，]/).map(s => s.trim()).filter(Boolean) : undefined }
    const items = [...(menuStore.menuConfig?.items || [])]
    hMenuDialog.isEdit ? (items[hMenuDialog.idx] = newItem) : items.push(newItem)
    await menuStore.updateMenu({ items }); hMenuDialog.visible = false
}

const handleHeaderMenuDelete = async (idx: number) => {
    if (!window.confirm('确定删除?')) return
    const items = [...(menuStore.menuConfig?.items || [])]
    items.splice(idx, 1)
    await menuStore.updateMenu({ items })
}

const headerMenuList = computed({
    get: () => menuStore.menuConfig?.items || [],
    set: (v) => menuStore.updateMenu({ items: v })
})

const confirm = (msg: string) => window.confirm(msg)
const iconOptions = ['Settings', 'GalleryVerticalEnd', 'AudioWaveform', 'Command', 'Folder', 'Forward', 'MoreHorizontal', 'Trash2', 'Pencil', 'Eye'].map(v => ({ label: v, value: v }))
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div v-if="configStore.isInPreviewMode" class="p-2 text-center"><span class="preview-badge">{{ configStore.previewMode === 'override' ? '覆盖预览' : '追加预览' }}</span></div>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton size="lg">
                  <div class="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><component :is="activeTeam?.logo" class="size-4" /></div>
                  <div class="grid flex-1 text-left text-sm leading-tight"><span class="truncate font-medium">{{ activeTeam?.name }}</span><span class="truncate text-xs text-muted-foreground">{{ activeTeam?.plan }}</span></div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56" align="start" side="right" :side-offset="4">
                <DropdownMenuLabel class="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
                <DropdownMenuItem v-for="t in effectiveTeams" :key="t.name" @click="activeTeam = t" class="gap-2"><div class="size-6 flex items-center justify-center border rounded-sm"><component :is="t.logo" class="size-4" /></div>{{ t.name }}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2" @click="handleNavClick('Account', 'Profile', 'profile')"><Plus class="size-4" /><span class="font-medium text-muted-foreground">Add team</span></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <template v-if="!configStore.isEditMode">
          <SidebarGroup v-for="g in filteredNavGroups" :key="g.label">
            <SidebarGroupLabel v-if="g.showLabel !== false">{{ g.label }}</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible v-for="i in g.items" :key="i.id" as-child :default-open="i.isOpen || i.items?.some(s => s.name === currentSubNav)" class="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton :tooltip="i.title" :class="{ 'bg-sidebar-accent': i.items?.some(s => s.name === currentSubNav) }">
                      <component :is="resolveIcon(i.icon)" v-if="i.icon" /><span>{{ i.title }}</span><ChevronRight class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent><SidebarMenuSub><SidebarMenuSubItem v-for="s in i.items" :key="s.id"><SidebarMenuSubButton @click="handleNavClick(i.title, s.name, s.id)" :class="{ 'bg-sidebar-accent font-medium': currentSubNav === s.name }"><span>{{ s.name }}</span></SidebarMenuSubButton></SidebarMenuSubItem></SidebarMenuSub></CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        </template>
        <template v-else>
          <SidebarGroup v-for="(g, idx) in pageStore.navGroups" :key="idx">
            <div class="flex items-center justify-between px-2 mb-2"><SidebarGroupLabel>{{ g.label || 'Group' }}</SidebarGroupLabel><Button variant="ghost" size="icon" class="size-6" @click="_openNavDialog('add-main', {idx})"><Plus class="size-4" /></Button></div>
            <SidebarMenu><div v-for="i in g.items" :key="i.id" class="mb-2 border border-dashed rounded-md p-2 bg-muted/20">
              <div class="flex items-center justify-between group/main mb-2">
                <div class="flex items-center gap-2"><component :is="resolveIcon(i.icon)" class="size-4 text-muted-foreground" /><span class="text-sm font-medium">{{ i.title }}</span></div>
                <div class="flex gap-1 opacity-0 group-hover/main:opacity-100 transition-opacity"><Button variant="ghost" size="icon" class="size-6" @click="_openNavDialog('edit-main', {idx, mId: i.id, item: i})"><Pencil class="size-3" /></Button><Button variant="ghost" size="icon" class="size-6" @click="_openNavDialog('add-sub', {idx, mId: i.id})"><Plus class="size-3" /></Button><Button variant="ghost" size="icon" class="size-6 text-destructive" @click="() => confirm('删除?') && pageStore.deleteNavMainItem(i.id)"><Trash2 class="size-3" /></Button></div>
              </div>
              <draggable v-model="i.items" item-key="id" group="subs" handle=".drag-handle" class="flex flex-col gap-1 pl-2" @change="pageStore.savePageConfig(i.title, i as any)">
                <template #item="{ element: s }">
                  <div class="flex items-center justify-between p-1.5 rounded bg-background border border-transparent hover:border-border group/sub text-xs cursor-pointer" @click="handleNavClick(i.title, s.name, s.id)">
                    <div class="flex items-center gap-2 min-w-0"><GripVertical class="size-3 text-muted-foreground drag-handle shrink-0" /><span class="truncate">{{ s.name }}</span><span v-if="s.pageType === 'form'" class="px-1 py-0.5 text-[9px] font-medium bg-violet-100 text-violet-600 rounded shrink-0">Form</span></div>
                    <div class="flex gap-0.5 opacity-0 group-hover/sub:opacity-100"><Button variant="ghost" size="icon" class="size-5" @click.stop="_openNavDialog('edit-sub', {idx, mId: i.id, sId: s.id, item: s})"><Pencil class="size-3" /></Button><Button variant="ghost" size="icon" class="size-5 text-destructive" @click.stop="() => confirm('删除?') && pageStore.deleteSubPage(i.id, s.id)"><Trash2 class="size-3" /></Button></div>
                  </div>
                </template>
              </draggable>
            </div></SidebarMenu>
          </SidebarGroup>
        </template>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu><SidebarMenuItem><DropdownMenu><DropdownMenuTrigger as-child><SidebarMenuButton size="lg"><Avatar class="size-8 rounded-lg"><AvatarImage :src="authStore.userAvatar" /><AvatarFallback>{{ authStore.userDisplayName?.slice(-1).toUpperCase() }}</AvatarFallback></Avatar><div class="grid flex-1 text-left text-sm leading-tight"><span class="truncate font-medium">{{ authStore.userDisplayName }}</span><span class="truncate text-xs text-muted-foreground">{{ authStore.userEmail }}</span></div><ChevronsUpDown class="ml-auto size-4" /></SidebarMenuButton></DropdownMenuTrigger><DropdownMenuContent class="w-56" side="right" align="end" :side-offset="4"><DropdownMenuLabel class="p-2 font-normal"><div class="flex items-center gap-2"><Avatar class="size-8 rounded-lg"><AvatarImage :src="authStore.userAvatar" /><AvatarFallback>{{ authStore.userDisplayName?.slice(-1).toUpperCase() }}</AvatarFallback></Avatar><div class="grid flex-1 text-sm"><span class="font-semibold">{{ authStore.userDisplayName }}</span><span class="text-xs text-muted-foreground">{{ authStore.userEmail }}</span></div></div></DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuGroup><DropdownMenuItem @click="handleUserAction('toggle-edit')"><component :is="configStore.isEditMode ? Eye : Pencil" class="size-4 mr-2" />{{ configStore.isEditMode ? '预览模式' : '编辑模式' }}</DropdownMenuItem><DropdownMenuItem @click="handleUserAction('profile')"><BadgeCheck class="size-4 mr-2" />用户中心</DropdownMenuItem></DropdownMenuGroup><DropdownMenuSeparator /><DropdownMenuItem @click="handleUserAction('logout')" class="text-destructive"><LogOut class="size-4 mr-2" />退出登录</DropdownMenuItem></DropdownMenuContent></DropdownMenu></SidebarMenuItem></SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-20">
        <SidebarTrigger class="-ml-1" /><Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb class="flex-1"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink @click="setNavigation(breadcrumbs.main, breadcrumbs.sub)">{{ breadcrumbs.main }}</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator><BreadcrumbItem><BreadcrumbLink v-if="breadcrumbs.detail" @click="setDetailTitle(null)">{{ breadcrumbs.sub }}</BreadcrumbLink><BreadcrumbPage v-else>{{ breadcrumbs.sub }}</BreadcrumbPage></BreadcrumbItem><template v-if="breadcrumbs.detail"><BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator><BreadcrumbItem><BreadcrumbPage>{{ breadcrumbs.detail }}</BreadcrumbPage></BreadcrumbItem></template></BreadcrumbList></Breadcrumb>
        <div class="flex items-center gap-2">
          <template v-if="!configStore.isEditMode"><template v-for="(i, idx) in menuStore.menuConfig?.items" :key="idx"><Button v-if="i.type==='text-button'" variant="ghost" size="sm">{{ i.label }}</Button><div v-else-if="i.type==='dropdown'" class="flex items-center gap-2 text-xs text-muted-foreground"><span>{{ i.label }}</span><Select><SelectTrigger class="w-24 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem v-for="o in i.options" :key="o" :value="o">{{ o }}</SelectItem></SelectContent></Select></div></template></template>
          <div v-else class="flex items-center gap-2 p-1 border border-dashed rounded bg-primary/5 border-primary/30">
            <draggable v-model="headerMenuList" item-key="label" class="flex gap-2" handle=".drag-handle">
              <template #item="{ element, index }"><div class="flex items-center gap-1.5 bg-background border rounded px-2 py-1 text-xs"><GripVertical class="size-3 text-muted-foreground drag-handle" /><span>{{ element.label }}</span><Button variant="ghost" size="icon" class="size-5" @click="_openHMenuDialog(index, element)"><Pencil class="size-3" /></Button><Button variant="ghost" size="icon" class="size-5 text-destructive" @click="() => confirm('删除?') && handleHeaderMenuDelete(index)"><Trash2 class="size-3" /></Button></div></template>
            </draggable>
            <Button variant="outline" size="icon" class="size-6 border-dashed" @click="_openHMenuDialog()"><Plus class="size-4" /></Button>
          </div>
        </div>
      </header>
      <AScrollbar class="h-full" style="overflow-y: auto;">
        <div class="flex-1 min-h-full"><slot></slot></div>
      </AScrollbar>
    </SidebarInset>

    <AIChatAssistant />
    <Dialog v-model:open="editDialog.visible"><DialogContent class="sm:max-w-md"><DialogHeader><DialogTitle>{{ editDialog.title }}</DialogTitle></DialogHeader><div class="grid gap-4 py-4"><div class="grid grid-cols-4 items-center gap-4"><label class="text-right text-sm">标题</label><Input v-model="editDialog.form.title" class="col-span-3" /></div><div v-if="editDialog.mode.includes('main')" class="grid grid-cols-4 items-center gap-4"><label class="text-right text-sm">图标</label><Select v-model="editDialog.form.icon"><SelectTrigger class="col-span-3"><SelectValue /></SelectTrigger><SelectContent><SelectItem v-for="i in iconOptions" :key="i.value" :value="i.value">{{ i.label }}</SelectItem></SelectContent></Select></div><div v-if="editDialog.mode.includes('sub')" class="grid grid-cols-4 items-center gap-4"><label class="text-right text-sm">页面类型</label><div class="col-span-3 flex gap-3"><label class="flex items-center gap-1.5 text-sm cursor-pointer"><input type="radio" v-model="editDialog.form.pageType" value="list" class="w-4 h-4" />列表页</label><label class="flex items-center gap-1.5 text-sm cursor-pointer"><input type="radio" v-model="editDialog.form.pageType" value="form" class="w-4 h-4" />表单页</label></div></div></div><div class="flex justify-end"><Button @click="handleEditSubmit">保存</Button></div></DialogContent></Dialog>
    <Dialog v-model:open="hMenuDialog.visible"><DialogContent class="sm:max-w-md"><DialogHeader><DialogTitle>{{ hMenuDialog.isEdit ? '编辑' : '新增' }}菜单</DialogTitle></DialogHeader><div class="grid gap-4 py-4"><div class="flex gap-4 items-center px-4 text-sm"><label class="flex items-center gap-1"><input type="radio" v-model="hMenuDialog.form.type" value="text-button" />按钮</label><label class="flex items-center gap-1"><input type="radio" v-model="hMenuDialog.form.type" value="dropdown" />下拉</label></div><div class="grid grid-cols-4 items-center gap-4"><label class="text-right text-sm">标题</label><Input v-model="hMenuDialog.form.label" class="col-span-3" /></div><div v-if="hMenuDialog.form.type==='dropdown'" class="grid grid-cols-4 items-start gap-4"><label class="text-right text-sm pt-2">选项</label><textarea v-model="hMenuDialog.form.options" class="col-span-3 h-20 p-2 border rounded text-sm bg-background" placeholder="选项1,选项2"></textarea></div></div><div class="flex justify-end"><Button @click="saveHMenu">保存</Button></div></DialogContent></Dialog>
  </SidebarProvider>
</template>

<style scoped>
.preview-badge { display: inline-block; padding: 2px 10px; background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%); color: white; font-size: 0.7rem; font-weight: 600; border-radius: 99px; }
</style>
