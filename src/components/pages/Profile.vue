<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { 
  Message, 
  Button as AButton, 
  Input as AInput, 
  Card as ACard, 
  Table as ATable, 
  Form as AForm, 
  FormItem as AFormItem, 
  Space as ASpace, 
  Grid as AGrid,
  Alert as AAlert,
  Typography as ATypography,
  Divider as ADivider,
  Tooltip as ATooltip,
  Scrollbar as AScrollbar,
  Switch as ASwitch,
  Modal as AModal,
  RadioGroup as ARadioGroup,
  Radio as ARadio,
  Textarea as ATextarea,
  Select as ASelect,
  Option as AOption
} from '@arco-design/web-vue'
import draggable from 'vuedraggable'
import { 
  IconUser, 
  IconEdit, 
  IconDelete, 
  IconPlus, 
  IconSafe, 
  IconCode, 
  IconAt,
  IconInfoCircle,
  IconDragDotVertical,
  IconRefresh
} from '@arco-design/web-vue/es/icon'
import { useConfigStore } from '@/stores/configStore'

const { Row: ARow, Col: ACol } = AGrid

// Use ATypography directly instead of destructuring
// 直接使用 ATypography 而不是解构
// const { Text: AText } = ATypography 

const authStore = useAuthStore()
const configStore = useConfigStore()
const isSaving = ref(false)

// Form state
// 表单状态
const form = reactive({
  userName: '',
  teams: [] as any[],
  menuConfig: [] as any[]
})

const menuDialog = reactive({
    visible: false,
    isEdit: false,
    editIndex: -1,
    form: {
        type: 'text-button',
        label: '',
        options: '' // 用于输入的逗号分隔字符串
    }
})

// Debounce timer
// 防抖定时器
let saveTimer: ReturnType<typeof setTimeout> | null = null

// --- Menu Configuration Methods ---
// --- 菜单配置方法 ---

const openAddMenuDialog = () => {
    menuDialog.isEdit = false
    menuDialog.editIndex = -1
    menuDialog.form = { type: 'text-button', label: '', options: '' }
    menuDialog.visible = true
}

const openEditMenuDialog = (index: number) => {
    const item = form.menuConfig[index]
    menuDialog.isEdit = true
    menuDialog.editIndex = index
    menuDialog.form = {
        type: item.type,
        label: item.label,
        options: item.options ? item.options.join(',') : ''
    }
    menuDialog.visible = true
}

const removeMenuItem = (index: number) => {
    form.menuConfig.splice(index, 1)
    autoSave() // 删除后触发自动保存
}

const saveMenuItem = () => {
    if (!menuDialog.form.label) {
        Message.warning('请输入按钮文字')
        return
    }

    const newItem: any = {
        type: menuDialog.form.type,
        label: menuDialog.form.label
    }

    if (menuDialog.form.type === 'dropdown') {
        if (!menuDialog.form.options) {
             Message.warning('请输入选项（以逗号分隔）')
             return
        }
        newItem.options = menuDialog.form.options.split(/[,，]/).map((s: string) => s.trim()).filter(Boolean)
    }

    if (menuDialog.isEdit && menuDialog.editIndex > -1) {
        form.menuConfig[menuDialog.editIndex] = newItem
    } else {
        form.menuConfig.push(newItem)
    }
    menuDialog.visible = false
    autoSave() // 添加/编辑后触发自动保存
}

const onMenuReorder = () => {
    autoSave()
}

// Initialize form data from store
// 从 store 初始化表单数据
const initForm = () => {
  form.userName = authStore.customUserName || authStore.userDisplayName
  form.teams = JSON.parse(JSON.stringify(authStore.teamsConfig || []))
  form.menuConfig = JSON.parse(JSON.stringify(authStore.menuConfig || []))
}

onMounted(() => {
  if (authStore.user) {
    initForm()
  }
})

// Auto-save function with debouncing
// 带防抖的自动保存函数
const autoSave = () => {
  if (saveTimer) {
    clearTimeout(saveTimer)
  }

  saveTimer = setTimeout(async () => {
    if (!authStore.user) return

    isSaving.value = true
    try {
      const result = await authStore.updateUserProfile(
        form.userName,
        form.teams,
        configStore.navigationStyle,
        form.menuConfig // Pass menu config
      )

      if (result.success) {
        // success feedback usually skipped for auto-save unless specific requirement
      } else {
         Message.error('保存失败: ' + (result.error || 'Unknown error'))
      }
    } catch (e) {
      console.error(e)
    } finally {
      isSaving.value = false
    }
  }, 1000) // 1 秒防抖
}

// Watch for changes and auto-save
// 监听变化并自动保存
watch(() => form.teams, () => {
  autoSave()
}, { deep: true })

watch(() => configStore.navigationStyle, () => {
  autoSave()
})

// Watch for store changes
// 监听 store 变化
watch(() => authStore.customUserName, (newVal) => {
    if (newVal && !form.userName) {
        form.userName = newVal
    }
})

watch(() => authStore.teamsConfig, (newVal) => {
    if (newVal && form.teams.length === 0) {
        form.teams = JSON.parse(JSON.stringify(newVal))
    }
})

// Team Management Actions
// 团队管理操作
const addTeam = () => {
  form.teams.push({
    id: `team-${Date.now()}`,
    name: '新团队',
    role: 'member',
    permissions: ['read']
  })
}

const removeTeam = (id: string) => {
  const index = form.teams.findIndex(t => t.id === id)
  if (index !== -1) {
    form.teams.splice(index, 1)
  }
}

// Columns definition for table (kept for reference if needed, though we use custom slot rendering in template mostly)
// 表格列定义（保留作为参考，尽管主要在模板中使用自定义插槽渲染）
const columns = [
  { title: 'ID', dataIndex: 'id', slotName: 'id', width: 100 },
  { title: '团队名称', dataIndex: 'name', slotName: 'name' },
  { title: '角色 (Role)', dataIndex: 'role', slotName: 'role', width: 150 },
  { title: '权限 (Permissions)', dataIndex: 'permissions', slotName: 'permissions' },
  { title: '操作', slotName: 'actions', width: 80, align: 'center' }
]
</script>

<template>
  <div class="flex flex-col h-full bg-[var(--color-fill-2)] overflow-hidden">
    <AScrollbar style="height: 100%; overflow: auto;">
      <div class="p-4 max-w-[1400px] mx-auto">
        <ASpace direction="vertical" size="large" fill>
          
          <!-- Menu Config Dialog (Global within page) -->
          <!-- 菜单配置弹窗（页面全局） -->
          <AModal v-model:visible="menuDialog.visible" :title="menuDialog.isEdit ? '编辑按钮' : '新增按钮'" @ok="saveMenuItem">
              <AForm :model="menuDialog.form" layout="vertical">
                  <AFormItem label="按钮类型">
                      <ARadioGroup v-model="menuDialog.form.type" type="button">
                          <ARadio value="text-button">文字按钮</ARadio>
                          <ARadio value="dropdown">下拉菜单</ARadio>
                      </ARadioGroup>
                  </AFormItem>
                  <AFormItem label="按钮文字">
                      <AInput v-model="menuDialog.form.label" placeholder="例如：权限申请" />
                  </AFormItem>
                  <AFormItem v-if="menuDialog.form.type === 'dropdown'" label="选项配置" help="多个选项请用逗号分隔">
                      <ATextarea v-model="menuDialog.form.options" placeholder="例如：中文, English" />
                  </AFormItem>
              </AForm>
          </AModal>

          <!-- 顶部区域：基本信息与界面配置 -->
          <!-- 使用带间距的 ARow 和 ACol 进行布局 -->
          <ARow :gutter="24">
            <!-- 左侧列：基本信息 -->
            <ACol :span="24" :lg="12">
              <ACard :bordered="false" class="shadow-sm rounded-xl overflow-hidden h-full">
                <template #title>
                  <ASpace>
                    <icon-user class="text-primary" />
                    <span class="font-bold">基本信息</span>
                  </ASpace>
                </template>
                
                <AForm :model="form" layout="vertical">
                  <AFormItem label="显示名称" help="修改后自动保存">
                      <AInput v-model="form.userName" placeholder="请输入您的名字">
                        <template #prefix><icon-edit /></template>
                      </AInput>
                  </AFormItem>
                  
                  <AFormItem label="关联邮箱" disabled>
                      <AInput :model-value="authStore.userEmail" disabled>
                        <template #prefix><icon-at /></template>
                      </AInput>
                    <template #extra>
                      <div class="flex items-center gap-1 mt-1 text-xs opacity-70">
                        <icon-info-circle /> 邮箱暂不支持修改
                      </div>
                    </template>
                  </AFormItem>
                </AForm>
              </ACard>
            </ACol>
            
            <!-- 右侧列：界面布局配置 -->
            <ACol :span="24" :lg="12">
              <ACard :bordered="false" class="shadow-sm rounded-xl overflow-hidden h-full">
                <template #title>
                  <ASpace>
                    <icon-code class="text-primary" />
                    <span class="font-bold">界面布局配置</span>
                  </ASpace>
                </template>
                
                 <AForm :model="form" layout="vertical">
                     <!-- 1. 筛选区与功能区融合 -->
                    <AFormItem label="筛选区与功能区融合">
                        <div class="flex items-center justify-between p-3 border rounded-lg bg-[var(--color-bg-1)] w-full">
                            <span class="text-[13px] font-medium text-[var(--color-text-2)]">开启融合</span>
                            <ASwitch
                                :model-value="configStore.filterActionFusion"
                                @update:model-value="(val: any) => configStore.setFilterActionFusion(val)"
                            />
                        </div>
                        <template #extra>
                            <div class="mt-1 text-xs text-[var(--color-text-3)]">
                                功能区按钮将显示在筛选区右侧
                            </div>
                        </template>
                    </AFormItem>

                    <!-- 2. 导航风格 -->
                    <AFormItem label="导航风格">
                      <ASelect 
                        :model-value="configStore.navigationStyle"
                        @change="(val: any) => configStore.setNavigationStyle(val)"
                        placeholder="请选择导航风格"
                      >
                        <AOption value="shadcn">Shadcn UI</AOption>
                        <AOption value="arco">Arco Design</AOption>
                      </ASelect>
                    </AFormItem>

                    <!-- 3. 菜单栏配置 -->
                    <AFormItem label="菜单栏配置">
                      <div class="w-full flex flex-col gap-3">
                          <div class="flex items-center justify-between">
                              <span class="text-xs text-[var(--color-text-3)]">支持拖拽排序</span>
                              <AButton type="outline" size="mini" @click="openAddMenuDialog">
                                  <template #icon><icon-plus /></template>
                                  新增
                              </AButton>
                          </div>
                          
                          <div class="border rounded-lg bg-[var(--color-bg-1)] overflow-hidden">
                              <div v-if="form.menuConfig.length === 0" class="p-4 text-center text-[var(--color-text-3)] text-xs">
                                  暂无配置
                              </div>
                              <draggable 
                                  v-else 
                                  v-model="form.menuConfig" 
                                  item-key="label" 
                                  handle=".drag-handle"
                                  @end="onMenuReorder"
                                  class="divide-y divide-[var(--color-border-1)]"
                              >
                                  <template #item="{ element, index }">
                                      <div class="p-2 pl-3 flex items-center justify-between text-sm hover:bg-[var(--color-fill-2)] group">
                                          <div class="flex items-center gap-2 overflow-hidden">
                                              <icon-drag-dot-vertical class="drag-handle text-[var(--color-text-4)] cursor-move hover:text-[var(--color-text-2)] flex-shrink-0" />
                                              <div class="flex flex-col truncate">
                                                  <span class="font-medium text-[var(--color-text-1)] truncate">{{ element.label }}</span>
                                                  <span class="text-[10px] text-[var(--color-text-3)] truncate">
                                                      {{ element.type === 'text-button' ? '按钮' : '下拉' }}
                                                      <span v-if="element.type === 'dropdown' && element.options">
                                                          ({{ element.options.length }})
                                                      </span>
                                                  </span>
                                              </div>
                                          </div>
                                          <div class="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                              <AButton type="text" size="mini" @click="openEditMenuDialog(index)">
                                                  <template #icon><icon-edit /></template>
                                              </AButton>
                                              <AButton type="text" status="danger" size="mini" @click="removeMenuItem(index)">
                                                  <template #icon><icon-delete /></template>
                                              </AButton>
                                          </div>
                                      </div>
                                  </template>
                              </draggable>
                          </div>
                      </div>
                    </AFormItem>
                 </AForm>
              </ACard>
            </ACol>
          </ARow>
          
          <!-- Team Management (Full Width) -->
          <ACard :bordered="false" class="shadow-sm rounded-xl overflow-hidden">
            <template #title>
              <ASpace>
                <icon-safe class="text-primary" />
                <span class="font-bold">团队管理</span>
              </ASpace>
            </template>
            <template #extra>
              <AButton type="primary" size="small" @click="addTeam">
                <template #icon><icon-plus /></template>
                新增团队
              </AButton>
            </template>
            
            <div class="mb-4">
              <AAlert type="info" show-icon>
                配置您在各个团队中的角色和操作权限。所有更改将自动保存。
              </AAlert>
            </div>

            <ATable 
              :columns="columns" 
              :data="form.teams" 
              :pagination="false"
              :bordered="{ wrapper: true, cell: false }"
              class="rounded-lg overflow-hidden border-none"
            >
              <template #id="{ record }">
                <ATypography.Text code class="text-[10px]">{{ record.id.replace('team-', '#') }}</ATypography.Text>
              </template>
              <template #name="{ record }">
                <AInput v-model="record.name" size="small" class="border-transparent hover:border-gray-300" />
              </template>
              <template #role="{ record }">
                <ASelect v-model="record.role" size="small">
                  <AOption value="admin">管理员 (Admin)</AOption>
                  <AOption value="member">成员 (Member)</AOption>
                  <AOption value="viewer">访客 (Viewer)</AOption>
                </ASelect>
              </template>
              <template #permissions="{ record }">
                <AInput 
                  :model-value="record.permissions?.join(', ')" 
                  @update:model-value="(val: string | number) => record.permissions = String(val).split(',').map((s: string) => s.trim()).filter(Boolean)" 
                  size="small" 
                  placeholder="如: admin, read, write"
                  class="border-transparent hover:border-gray-300"
                />
              </template>
              <template #actions="{ record }">
                <ATooltip content="删除团队">
                  <AButton type="text" status="danger" size="small" @click="removeTeam(record.id)">
                    <template #icon><icon-delete /></template>
                  </AButton>
                </ATooltip>
              </template>
            </ATable>

            <div class="mt-6">
              <ADivider orientation="left">原始 JSON 数据</ADivider>
              <div class="relative group">
                <pre class="json-code">
                  <icon-code class="code-icon" />{{ JSON.stringify(form.teams, null, 2) }}
                </pre>
              </div>
            </div>
          </ACard>

          <!-- 底部保存状态提示 -->
          <div v-if="isSaving" class="fixed bottom-4 right-4 bg-white/80 backdrop-blur shadow-lg border rounded-full px-4 py-2 flex items-center gap-2 text-primary animate-fade-in z-50">
            <icon-refresh class="animate-spin" />
            <span class="text-xs font-medium">自动保存中...</span>
          </div>
          
        </ASpace>
      </div>
    </AScrollbar>
  </div>
</template>

<style scoped>
.style-card {
  border: 2px solid var(--color-border);
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: var(--color-bg-2);
}

.style-card:hover {
  border-color: var(--color-primary-light-3);
  background: var(--color-primary-light-1);
}

.style-card.active {
  border-color: var(--color-primary);
  background: var(--color-primary-light-1);
}

.style-card .preview {
  width: 100%;
  height: 60px;
  border-radius: 6px;
}

.shadcn-preview {
  background: linear-gradient(135deg, #18181b 30%, #27272a 100%);
  position: relative;
}
.shadcn-preview::after {
  content: 'Z';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: 800;
  opacity: 0.1;
  font-size: 24px;
}

.arco-preview {
  background: linear-gradient(135deg, #165dff 30%, #4080ff 100%);
}

.style-card .name {
  font-size: 13px;
  font-weight: 600;
}

.json-code {
  background: var(--color-fill-3);
  padding: 16px;
  border-radius: 8px;
  font-size: 11px;
  max-height: 250px;
  overflow: auto;
  font-family: var(--font-mono);
  position: relative;
}

.code-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.2;
  font-size: 20px;
}

:deep(.arco-table-cell) {
  font-size: 13px;
}

:deep(.arco-card-header) {
  border-bottom: 1px solid var(--color-border-1);
  padding: 16px 20px;
}

:deep(.arco-card-body) {
  padding: 24px 20px;
}

:deep(.arco-form-item-label) {
  font-weight: 600;
  color: var(--color-text-2);
  margin-bottom: 8px;
}
</style>
