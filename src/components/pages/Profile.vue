<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
  Typography as ATypography,
  Grid as AGrid,
  Divider as ADivider,
  Tooltip as ATooltip,
  Scrollbar as AScrollbar,
  Switch as ASwitch
} from '@arco-design/web-vue'
import { 
  IconUser, 
  IconEdit, 
  IconDelete, 
  IconPlus, 
  IconSafe, 
  IconCode, 
  IconAt,
  IconInfoCircle
} from '@arco-design/web-vue/es/icon'
import { useConfigStore } from '@/stores/configStore'

const { Row: ARow, Col: ACol } = AGrid
const { Text: AText } = ATypography

const authStore = useAuthStore()
const configStore = useConfigStore()
const isSaving = ref(false)

// Form state
const form = ref({
  userName: '',
  teams: [] as any[]
})

// Debounce timer
let saveTimer: ReturnType<typeof setTimeout> | null = null

// Initialize form data from store
const initForm = () => {
  form.value.userName = authStore.customUserName || authStore.userDisplayName
  form.value.teams = JSON.parse(JSON.stringify(authStore.teamsConfig || []))
}

onMounted(() => {
  if (authStore.user) {
    initForm()
  }
})

// Auto-save function with debouncing
const autoSave = async () => {
  if (saveTimer) {
    clearTimeout(saveTimer)
  }
  
  saveTimer = setTimeout(async () => {
    if (!authStore.user) return
    
    isSaving.value = true
    try {
      const result = await authStore.updateUserProfile(
        form.value.userName, 
        form.value.teams,
        configStore.navigationStyle
      )
      
      if (result.success) {
        // Silent success - no message for auto-save
      } else {
        Message.error(result.error || '保存失败')
      }
    } catch (e: any) {
      Message.error(e.message || '保存过程中发生错误')
    } finally {
      isSaving.value = false
    }
  }, 1000) // 1 second debounce
}

// Watch for changes and auto-save
watch(() => form.value.userName, () => {
  autoSave()
})

watch(() => form.value.teams, () => {
  autoSave()
}, { deep: true })

watch(() => configStore.navigationStyle, () => {
  autoSave()
})

// Watch for store changes
watch(() => authStore.customUserName, (newVal) => {
    if (newVal && !form.value.userName) {
        form.value.userName = newVal
    }
})

watch(() => authStore.teamsConfig, (newVal) => {
    if (newVal && form.value.teams.length === 0) {
        form.value.teams = JSON.parse(JSON.stringify(newVal))
    }
})

// Team Management Actions
const addTeam = () => {
  form.value.teams.push({
    id: `team-${Date.now()}`,
    name: '新团队',
    role: 'member',
    permissions: ['read']
  })
}

const removeTeam = (id: string) => {
  const index = form.value.teams.findIndex(t => t.id === id)
  if (index !== -1) {
    form.value.teams.splice(index, 1)
  }
}

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
    <a-scrollbar style="height: 100%; overflow: auto;">
      <div class="p-8 max-w-[1400px] mx-auto">
        <a-space direction="vertical" size="large" fill>
          <!-- 基本信息：头像在左侧 -->
          <a-card :bordered="false" class="shadow-sm rounded-xl overflow-hidden">
            <template #title>
              <a-space>
                <icon-user class="text-primary" />
                <span class="font-bold">基本信息</span>
              </a-space>
            </template>
            
            <div class="flex flex-col gap-8">
              <!-- 表单编辑区域 -->
              <div class="w-full">
                <a-form :model="form" layout="vertical">
                  <a-form-item label="显示名称" feedback="修改后自动保存">
                    <div class="w-1/2">
                      <a-input v-model="form.userName" placeholder="请输入您的名字">
                        <template #prefix><icon-edit /></template>
                      </a-input>
                    </div>
                  </a-form-item>
                  
                  <a-form-item label="关联邮箱" disabled>
                    <div class="w-1/2">
                      <a-input :model-value="authStore.userEmail" disabled>
                        <template #prefix><icon-at /></template>
                      </a-input>
                    </div>
                    <template #extra>
                      <div class="flex items-center gap-1 mt-1 text-xs opacity-70">
                        <icon-info-circle /> 邮箱暂不支持修改
                      </div>
                    </template>
                  </a-form-item>

                  <a-form-item label="导航风格">
                    <a-row :gutter="12">
                      <a-col :span="12" :sm="12">
                        <div 
                          class="style-card transition-all"
                          :class="{ 'active': configStore.navigationStyle === 'shadcn' }"
                          @click="configStore.setNavigationStyle('shadcn')"
                        >
                          <div class="preview shadcn-preview"></div>
                          <span class="name">Shadcn UI</span>
                        </div>
                      </a-col>
                      <a-col :span="12" :sm="12">
                        <div 
                          class="style-card transition-all"
                          :class="{ 'active': configStore.navigationStyle === 'arco' }"
                          @click="configStore.setNavigationStyle('arco')"
                        >
                          <div class="preview arco-preview"></div>
                          <span class="name">Arco Design</span>
                        </div>
                      </a-col>
                    </a-row>
                  </a-form-item>

                  <a-form-item label="界面布局配置">
                    <div class="flex items-center justify-between p-3 border rounded-lg bg-[var(--color-bg-1)]">
                        <span class="text-[13px] font-medium text-[var(--color-text-2)]">筛选区与功能区融合</span>
                        <a-switch 
                            :model-value="configStore.filterActionFusion"
                            @update:model-value="(val: any) => configStore.setFilterActionFusion(val)"
                        />
                    </div>
                    <template #extra>
                        <div class="mt-1 text-xs text-[var(--color-text-3)]">
                            开启后，功能区的按钮将显示在筛选区最后一行的右侧
                        </div>
                    </template>
                  </a-form-item>
                </a-form>
              </div>
            </div>
          </a-card>

          <!-- Teams -->
          <a-card :bordered="false" class="shadow-sm rounded-xl flex flex-col">
            <template #title>
              <div class="flex items-center justify-between">
                <a-space>
                  <icon-safe class="text-primary" />
                  <span class="font-bold">团队与权限配置</span>
                </a-space>
                <a-button type="outline" size="small" @click="addTeam">
                  <template #icon><icon-plus /></template>
                  新增团队
                </a-button>
              </div>
            </template>
            
            <div class="mb-4">
              <a-alert type="info" show-icon>
                配置您在各个团队中的角色和操作权限。所有更改将自动保存。
              </a-alert>
            </div>

            <a-table 
              :columns="columns" 
              :data="form.teams" 
              :pagination="false"
              :bordered="{ wrapper: true, cell: false }"
              class="rounded-lg overflow-hidden border-none"
            >
              <template #id="{ record }">
                <a-text code class="text-[10px]">{{ record.id.replace('team-', '#') }}</a-text>
              </template>
              <template #name="{ record }">
                <a-input v-model="record.name" size="small" class="border-transparent hover:border-gray-300" />
              </template>
              <template #role="{ record }">
                <a-input v-model="record.role" size="small" class="border-transparent hover:border-gray-300" />
              </template>
              <template #permissions="{ record }">
                 <a-input 
                  :model-value="record.permissions?.join(', ')" 
                  @update:model-value="(val: string | number) => record.permissions = String(val).split(',').map((s: string) => s.trim()).filter(Boolean)" 
                  size="small" 
                  placeholder="如: admin, read, write"
                  class="border-transparent hover:border-gray-300"
                />
              </template>
              <template #actions="{ record }">
                <a-tooltip content="删除团队">
                  <a-button type="text" status="danger" size="small" @click="removeTeam(record.id)">
                    <template #icon><icon-delete /></template>
                  </a-button>
                </a-tooltip>
              </template>
            </a-table>

            <div class="mt-6">
              <a-divider orientation="left">原始 JSON 数据</a-divider>
              <div class="relative group">
                <pre class="json-code">
                  <icon-code class="code-icon" />{{ JSON.stringify(form.teams, null, 2) }}
                </pre>
              </div>
            </div>
          </a-card>
        </a-space>
      </div>
    </a-scrollbar>
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
