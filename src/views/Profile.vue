<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { 
  Button as AButton, 
  Input as AInput, 
  Card as ACard, 
  Table as ATable, 
  Form as AForm, 
  FormItem as AFormItem, 
  Space as ASpace, 
  Grid as AGrid,
  Alert as AAlert,
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


// 防抖定时器
let saveTimer: ReturnType<typeof setTimeout> | null = null

// Helper to safely extract array
const getArray = (data: any) => {
    if (Array.isArray(data)) return data
    if (data && Array.isArray(data.teams)) return data.teams
    return []
}


// 从 store 初始化表单数据
const initForm = () => {
  form.userName = authStore.userDisplayName
  // 以前是从 authStore 取，现在应该从 configStore 取，或者两者同步
  // 这里暂时保持从 configStore 初始化，因为我们要迁移到 configStore 管理团队
  form.teams = JSON.parse(JSON.stringify(configStore.teams))
}

onMounted(() => {
  if (authStore.user) {
    initForm()
  }
})


// 带防抖的自动保存函数
const autoSave = () => {
  if (saveTimer) {
    clearTimeout(saveTimer)
  }

  saveTimer = setTimeout(async () => {
    if (!authStore.user) return

    isSaving.value = true
    try {
      // 1. Update User Profile (Name)
      if (form.userName !== authStore.userDisplayName) {
        await authStore.updateUserProfile(form.userName, [], configStore.navigationStyle)
      }
      
      // 2. Update Teams (via ConfigStore -> Supabase)
      configStore.setTeams(form.teams)
      // Trigger save (debounced in store, but we can force or just let store handle it)
      // The store watcher will pick up changes to `teams` and save automatically if configured
      // But we might need to explicit save if deep watch isn't fully robust for nested objects without direct assignment
      // configStore.teams = form.teams // This triggers the watch

    } catch (e) {
      console.error(e)
    } finally {
      isSaving.value = false
    }
  }, 1000) // 1 秒防抖
}

// 监听变化并自动保存
watch(() => form.teams, () => {
  autoSave()
}, { deep: true })


// 监听 store 变化
watch(() => configStore.teams, (newVal) => {
    if (newVal && newVal.length > 0 && JSON.stringify(newVal) !== JSON.stringify(form.teams)) {
        form.teams = JSON.parse(JSON.stringify(newVal))
    }
}, { deep: true })

watch(() => authStore.teamsConfig, (newVal) => {

    const newTeams = getArray(newVal)
    if (newTeams.length > 0 && form.teams.length === 0) {
        form.teams = JSON.parse(JSON.stringify(newTeams))
    }
})

// 团队管理操作
const addTeam = () => {
  form.teams.push({
    name: '新团队',
    logo: IconUser, // Default logo
    plan: 'free',
    permissions: { navMain: [], projects: [] } 
  })
}

const removeTeam = (name: string) => {
  const index = form.teams.findIndex(t => t.name === name)
  if (index !== -1) {
    form.teams.splice(index, 1)
  }
}

// 表格列定义
const columns = [
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

              <template #name="{ record }">
                <AInput v-model="record.name" size="small" class="border-transparent hover:border-gray-300" />
              </template>
              <template #role="{ record }">
                <ASelect v-model="record.plan" size="small">
                  <AOption value="online">在线 (Online)</AOption>
                  <AOption value="enterprise">企业 (Enterprise)</AOption>
                  <AOption value="free">免费 (Free)</AOption>
                </ASelect>
              </template>
              <template #permissions>
                 <div class="text-xs text-gray-500">Todo: Permission Editor</div>
              </template>
              <template #actions="{ record }">
                <ATooltip content="删除团队">
                  <AButton type="text" status="danger" size="small" @click="removeTeam(record.name)">
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
