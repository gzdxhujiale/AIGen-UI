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
  IconUser, IconEdit, IconDelete, IconPlus, IconSafe, IconAt, 
  IconInfoCircle, IconRefresh, IconCamera, IconCheck
} from '@arco-design/web-vue/es/icon'
import { useConfigTeamStore } from '@/stores/config_team_Store'

const { Row: ARow, Col: ACol } = AGrid
const authStore = useAuthStore()
const teamStore = useConfigTeamStore()
import type { UserTeam } from '@/types/user'

// 2. 表单状态
const form = reactive({
  userName: '',
  avatarUrl: '',
  teams: [] as UserTeam[]
})

// 3. 响应式自动保存逻辑
const isSaving = ref(false)
const isSaveSuccess = ref(false)

// 从 store 初始化表单数据
const initForm = () => {
  form.userName = authStore.userDisplayName || ''
  form.avatarUrl = authStore.userAvatar || ''
  form.teams = JSON.parse(JSON.stringify(teamStore.teams))
}

onMounted(() => {
  if (authStore.user) initForm()
})

const performSave = async () => {
    if (!authStore.user) return

    // 检查是否有真正的数据变动
    const isNameChanged = form.userName !== authStore.userDisplayName
    const isTeamsChanged = JSON.stringify(form.teams) !== JSON.stringify(teamStore.teams)
    
    if (!isNameChanged && !isTeamsChanged) return

    isSaving.value = true
    isSaveSuccess.value = false
    try {
      if (isNameChanged) await authStore.updateUserMetadata({ full_name: form.userName })
      if (isTeamsChanged) {
        teamStore.teams = JSON.parse(JSON.stringify(form.teams))
        await teamStore.saveTeams()
      }
      // 保存成功反馈
      isSaveSuccess.value = true
      setTimeout(() => { isSaveSuccess.value = false }, 2000)
    } catch (e) {
      console.error('自动保存失败:', e)
    } finally {
      isSaving.value = false
    }
}

// 团队管理操作
const addTeam = async () => {
  form.teams.push({
    name: '新团队',
    logo: IconUser as any, 
    plan: 'free',
    permissions: { navMain: [], projects: [] } 
  })
  await performSave()
}

const removeTeam = async (name: string) => {
  const index = form.teams.findIndex(t => t.name === name)
  if (index !== -1) {
    form.teams.splice(index, 1)
    await performSave()
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
                <!-- 统一头像容器 -->
                <div class="relative w-[100px] h-[100px] rounded-full overflow-hidden shadow-md border-2 border-white ring-4 ring-primary/5 group cursor-pointer">
                  <!-- 1. 背景占位 -->
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
                  <!-- 4. 上传控制 -->
                  <AUpload :show-file-list="false" @change="handleAvatarUpload" class="absolute inset-0 z-20 opacity-0 w-full h-full">
                    <template #upload-button><div class="w-[100px] h-[100px] rounded-full"></div></template>
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
                        <AInput v-model="form.userName" placeholder="请输入您的名字" size="large" @blur="performSave">
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
            <AInput v-model="record.name" size="small" class="border-transparent hover:border-gray-300" @blur="performSave" />
          </template>
          <template #role="{ record }">
            <ASelect v-model="record.plan" size="small" @change="performSave">
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
               <!-- 按钮 type status 需要显式强转避免类型错误，或者忽略，此处用 any 绕过 -->
              <AButton type="text" status="danger" size="small" @click="removeTeam(record.name)">
                <template #icon><IconDelete /></template>
              </AButton>
            </ATooltip>
          </template>
        </ATable>
      </ACard>

      <!-- 底部保存状态提示 -->
      <div v-if="isSaving || isSaveSuccess" 
           class="fixed bottom-4 right-4 bg-white/80 backdrop-blur shadow-lg border rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300 z-50"
           :class="isSaveSuccess ? 'text-green-600 border-green-200' : 'text-primary border-primary/20'">
        <IconRefresh v-if="isSaving" class="animate-spin" />
        <IconCheck v-else />
        <span class="text-xs font-medium">{{ isSaveSuccess ? '已自动保存' : '自动保存中...' }}</span>
      </div>
      
    </ASpace>
  </div>
</template>

<style scoped>
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
