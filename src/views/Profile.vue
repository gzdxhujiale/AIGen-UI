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
  Select as ASelect,
  Option as AOption
} from '@arco-design/web-vue'
import { 
  IconUser, 
  IconEdit, 
  IconDelete, 
  IconPlus, 
  IconSafe, 
  IconAt,
  IconInfoCircle,
  IconCode,
  IconRefresh
} from '@arco-design/web-vue/es/icon'
import { useConfigStore } from '@/stores/configStore'

const { Row: ARow, Col: ACol } = AGrid

const authStore = useAuthStore()
const configStore = useConfigStore()
const isSaving = ref(false)

// Form state
// 表单状态
const form = reactive({
  userName: '',
  teams: [] as any[]
})

// Debounce timer
// 防抖定时器
let saveTimer: ReturnType<typeof setTimeout> | null = null

// Helper to safely extract array
const getArray = (data: any) => {
    if (Array.isArray(data)) return data
    if (data && Array.isArray(data.teams)) return data.teams
    return []
}

// Initialize form data from store
// 从 store 初始化表单数据
const initForm = () => {
  form.userName = authStore.customUserName || authStore.userDisplayName
  form.teams = JSON.parse(JSON.stringify(getArray(authStore.teamsConfig)))
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
        configStore.navigationStyle
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

// Watch for store changes
// 监听 store 变化
watch(() => authStore.customUserName, (newVal) => {
    if (newVal && !form.userName) {
        form.userName = newVal
    }
})

watch(() => authStore.teamsConfig, (newVal) => {
    // Only update if local form is empty or needs sync (be careful not to overwrite user edits)
    // But for initial load sync it is important
    const newTeams = getArray(newVal)
    if (newTeams.length > 0 && form.teams.length === 0) {
        form.teams = JSON.parse(JSON.stringify(newTeams))
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

// Columns definition for table
// 表格列定义
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
          
          <!-- 顶部区域：基本信息 -->
          <ARow :gutter="24">
            <!-- 基本信息（全宽） -->
            <ACol :span="24">
              <ACard :bordered="false" class="shadow-sm rounded-xl overflow-hidden h-full">
                <template #title>
                  <ASpace>
                    <icon-user class="text-primary" />
                    <span class="font-bold">基本信息</span>
                  </ASpace>
                </template>
                
                <AForm :model="form" layout="vertical">
                  <ARow :gutter="24">
                    <ACol :span="24" :lg="12">
                      <AFormItem label="显示名称" help="修改后自动保存">
                          <AInput v-model="form.userName" placeholder="请输入您的名字">
                            <template #prefix><icon-edit /></template>
                          </AInput>
                      </AFormItem>
                    </ACol>
                    
                    <ACol :span="24" :lg="12">
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
                    </ACol>
                  </ARow>
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
