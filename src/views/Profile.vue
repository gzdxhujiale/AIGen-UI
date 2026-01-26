<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
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
  Tooltip as ATooltip,
  Select as ASelect,
  Option as AOption,
  Upload as AUpload,
  Message
} from '@arco-design/web-vue'
import { 
  IconUser, 
  IconEdit, 
  IconDelete, 
  IconPlus, 
  IconSafe, 
  IconAt,
  IconInfoCircle,
  IconRefresh,
  IconCamera
} from '@arco-design/web-vue/es/icon'

import { useConfigTeamStore } from '@/stores/config_team_Store'

const { Row: ARow, Col: ACol } = AGrid

const authStore = useAuthStore()

const teamStore = useConfigTeamStore()
const isSaving = ref(false)

// 表单状态
const form = reactive({
  userName: '',
  avatarUrl: '',
  teams: [] as any[]
})

// 防抖定时器
let saveTimer: ReturnType<typeof setTimeout> | null = null


// 从 store 初始化表单数据
const initForm = () => {
  form.userName = authStore.userDisplayName
  form.avatarUrl = authStore.userAvatar
  form.teams = JSON.parse(JSON.stringify(teamStore.teams))
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

    // 检查是否有真正的数据变动，避免无意义的并发请求
    const isNameChanged = form.userName !== authStore.userDisplayName
    const isTeamsChanged = JSON.stringify(form.teams) !== JSON.stringify(teamStore.teams)
    
    if (!isNameChanged && !isTeamsChanged) return

    isSaving.value = true
    try {
      // 1. 更新用户信息（显示名称）
      if (isNameChanged) {
        await authStore.updateUserMetadata({ full_name: form.userName })
      }
      
      // 2. 更新团队信息
      if (isTeamsChanged) {
        teamStore.teams = JSON.parse(JSON.stringify(form.teams))
        await teamStore.saveTeams()
      }
    } catch (e) {
      console.error('自动保存失败:', e)
    } finally {
      isSaving.value = false
    }
  }, 1000) // 1 秒防抖
}

// 移除这里的 watch 监听，转为使用事件触发



// 团队管理操作
const addTeam = () => {
  form.teams.push({
    name: '新团队',
    logo: IconUser, // 默认图标
    plan: 'free',
    permissions: { navMain: [], projects: [] } 
  })
  autoSave() // 显式操作立即触发保存（带防抖）
}


const removeTeam = (name: string) => {
  const index = form.teams.findIndex(t => t.name === name)
  if (index !== -1) {
    form.teams.splice(index, 1)
    autoSave() // 显式操作立即触发保存
  }
}

// 表格列定义
const columns = [
  { title: '团队名称', dataIndex: 'name', slotName: 'name' },
  { title: '角色', dataIndex: 'plan', slotName: 'role', width: 150 },
  { title: '权限', dataIndex: 'permissions', slotName: 'permissions' },
  { title: '操作', slotName: 'actions', width: 80, align: 'center' }
]

// 头像上传处理
const handleAvatarUpload = async (fileList: any[]) => {
  const file = fileList[0]?.file
  if (!file) return

  isSaving.value = true
  try {
    const result = await authStore.uploadAvatar(file)
    if (result.success) {
      form.avatarUrl = authStore.userAvatar
      Message.success('头像更新成功')
    } else {
      Message.error(result.error || '头像上传失败')
    }
  } catch (err) {
    Message.error('头像上传出错')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="p-4 max-w-[1400px] mx-auto">
    <ASpace direction="vertical" size="large" fill>
      
      <!-- 顶部区域：基本信息 -->
      <ARow :gutter="24">
        <ACol :span="24">
          <ACard :bordered="false" class="shadow-sm rounded-xl overflow-hidden">
            <template #title>
              <ASpace>
                <IconUser class="text-primary" />
                <span class="font-bold">基本信息</span>
              </ASpace>
            </template>
            
            <div class="flex flex-col md:flex-row gap-8 items-start">
              <!-- 左侧：头像上传 -->
              <div class="flex flex-col items-center gap-4 shrink-0 px-4">
                <!-- 统一头像容器：设置固定大小并强制圆角剪裁 -->
                <div class="relative w-[100px] h-[100px] rounded-full overflow-hidden shadow-md border-2 border-white ring-4 ring-primary/5 group cursor-pointer">
                  
                  <!-- 1. 背景占位 (仅当没有头像时显示) -->
                  <div v-if="!form.avatarUrl" class="absolute inset-0 bg-[var(--color-fill-3)] flex items-center justify-center">
                    <IconUser class="text-5xl text-[var(--color-text-3)]" />
                  </div>
                  
                  <!-- 2. 头像图片 -->
                  <img v-if="form.avatarUrl" :src="form.avatarUrl" class="absolute inset-0 w-full h-full object-cover z-0" />
                  
                  <!-- 3. 交互遮罩层 -->
                  <div class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <IconCamera class="text-white text-3xl mb-1" />
                    <span class="text-[10px] text-white font-medium">更换头像</span>
                  </div>

                  <!-- 4. 真正的上传控制触点 (透明且覆盖最上层) -->
                  <AUpload
                    :show-file-list="false"
                    @change="handleAvatarUpload"
                    class="absolute inset-0 z-20 opacity-0 w-full h-full"
                  >
                    <template #upload-button>
                      <div class="w-[100px] h-[100px] rounded-full"></div>
                    </template>
                  </AUpload>
                </div>

                <div class="text-center">
                  <div class="text-sm font-bold text-[var(--color-text-1)]">{{ authStore.userDisplayName }}</div>
                  <div class="mt-1.5 px-3 py-0.5 bg-[var(--color-primary-light-1)] text-[rgb(var(--primary-6))] text-[10px] font-medium rounded-full border border-[rgb(var(--primary-2))]">账号所有者</div>
                </div>
              </div>

              <!-- 右侧：表单 -->
              <div class="flex-1 w-full pt-2">
                <AForm :model="form" layout="vertical">
                  <ARow :gutter="24">
                    <ACol :span="24" :lg="12">
                      <AFormItem label="显示名称" help="修改后自动保存">
                        <AInput v-model="form.userName" placeholder="请输入您的名字" size="large" @blur="autoSave">
                          <template #prefix><IconEdit /></template>
                        </AInput>
                      </AFormItem>
                    </ACol>
                    
                    <ACol :span="24" :lg="12">
                      <AFormItem label="关联邮箱" disabled>
                        <AInput :model-value="authStore.userEmail" disabled>
                          <template #prefix><IconAt /></template>
                        </AInput>
                        <template #extra>
                          <div class="flex items-center gap-1 mt-1 text-xs opacity-70">
                            <IconInfoCircle /> 邮箱暂不支持修改
                          </div>
                        </template>
                      </AFormItem>
                    </ACol>
                  </ARow>
                </AForm>
              </div>
            </div>
          </ACard>
        </ACol>
      </ARow>
      
      <!-- 团队管理 -->
      <ACard :bordered="false" class="shadow-sm rounded-xl overflow-hidden">
        <template #title>
          <ASpace>
            <IconSafe class="text-primary" />
            <span class="font-bold">团队管理</span>
          </ASpace>
        </template>
        <template #extra>
          <AButton type="primary" size="small" @click="addTeam">
            <template #icon><IconPlus /></template>
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
            <AInput v-model="record.name" size="small" class="border-transparent hover:border-gray-300" @blur="autoSave" />
          </template>
          <template #role="{ record }">
            <ASelect v-model="record.plan" size="small" @change="autoSave">
              <AOption value="online">在线 (Online)</AOption>
              <AOption value="enterprise">企业 (Enterprise)</AOption>
              <AOption value="free">免费 (Free)</AOption>
            </ASelect>
          </template>
          <template #permissions>
             <div class="text-xs text-secondary-foreground/60">权限细粒度编辑器 (Beta)</div>
          </template>
          <template #actions="{ record }">
            <ATooltip content="删除团队">
              <AButton type="text" status="danger" size="small" @click="removeTeam(record.name)">
                <template #icon><IconDelete /></template>
              </AButton>
            </ATooltip>
          </template>
        </ATable>
      </ACard>

      <!-- 底部保存状态提示 -->
      <div v-if="isSaving" class="fixed bottom-4 right-4 bg-white/80 backdrop-blur shadow-lg border rounded-full px-4 py-2 flex items-center gap-2 text-primary animate-fade-in z-50">
        <IconRefresh class="animate-spin" />
        <span class="text-xs font-medium">自动保存中...</span>
      </div>
      
    </ASpace>
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
