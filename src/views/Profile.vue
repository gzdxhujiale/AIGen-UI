<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { 
  Button as AButton, 
  Input as AInput, 
  Card as ACard, 
  Table as ATable, 
  Space as ASpace, 
  Alert as AAlert,
  Tooltip as ATooltip,
  Select as ASelect,
  Option as AOption,
  Upload as AUpload,
  Tag as ATag,
  Grid as AGrid,
  Message
} from '@arco-design/web-vue'
import { 
  IconUser, IconDelete, IconPlus, IconSafe, 
  IconRefresh, IconCamera, IconCheck, IconLocation, IconAt,
  IconIdcard, IconUserGroup
} from '@arco-design/web-vue/es/icon'
import { useConfigTeamStore } from '@/stores/config_team_Store'


const { Row: ARow, Col: ACol } = AGrid
const authStore = useAuthStore()
const teamStore = useConfigTeamStore()
import type { TeamItem } from '@/types/navigation'

// 基础资料默认数据
const baseProfile = {
  jobTitle: '产品经理',
  department: '中台-前端架构和平台工具团队',
  location: '广州市'
}

// 扩展详情数据（标签、数据等）
// 可选 type: 
// - 'tags': 字符串数组，渲染为一组灰色标签
// - 'tag': 字符串，渲染为单个灰色标签
// - 'hobbies': 字符串数组，渲染为红色风格的“爱好”标签
// - 'text': 字符串，渲染为普通文本
const detailItems = [
  { label: '团队', key: 'hobbies', value: ['HJL', ' Claude', 'Gemini'], type: 'tags' },
  { label: '前端', value: ['vue3', 'pinia', 'vite', 'ts'], type: 'tags' },
  { label: 'UIUX', key: 'zodiac', value: 'arco design', type: 'tag' },
  { label: '数据库', key: 'birthday', value: 'PostgreSQL', type: 'tag' },
  { label: 'AIAgent', key: 'birthday', value: 'Coze-豆包1.6极速速度', type: 'tag' }
]

// 个人资料数据
const profile = reactive({
  ...baseProfile,
  details: [...detailItems]
})

// 表单状态
const form = reactive({
  userName: '',
  avatarUrl: '',
  teams: [] as TeamItem[],
  ...baseProfile,
  details: JSON.parse(JSON.stringify(detailItems))
})

const editingName = ref('')

// 状态同步
watch(() => authStore.userDisplayName, (val: string) => {
  editingName.value = val
}, { immediate: true })

// 响应式自动保存逻辑
const isSaving = ref(false)
const isSaveSuccess = ref(false)

// 从 store 初始化表单数据
const initForm = () => {
  form.userName = authStore.userDisplayName || ''
  form.avatarUrl = authStore.userAvatar || ''
  form.teams = JSON.parse(JSON.stringify(teamStore.teams))
  
  // 初始化个人详情
  Object.assign(form, {
    jobTitle: profile.jobTitle,
    department: profile.department,
    location: profile.location,
    details: JSON.parse(JSON.stringify(profile.details))
  })
}

onMounted(() => {
  if (authStore.user) initForm()
})

const performSave = async () => {
    if (!authStore.user) return

    const isNameChanged = form.userName !== authStore.userDisplayName
    const isTeamsChanged = JSON.stringify(form.teams) !== JSON.stringify(teamStore.teams)
    const isProfileChanged = JSON.stringify({
      jobTitle: form.jobTitle,
      department: form.department,
      location: form.location,
      details: form.details
    }) !== JSON.stringify({
      jobTitle: profile.jobTitle,
      department: profile.department,
      location: profile.location,
      details: profile.details
    })
    
    if (!isNameChanged && !isTeamsChanged && !isProfileChanged) return

    isSaving.value = true
    isSaveSuccess.value = false
    try {
      if (isNameChanged) await authStore.updateUserMetadata({ full_name: form.userName })
      if (isTeamsChanged) {
        teamStore.teams = JSON.parse(JSON.stringify(form.teams))
        await teamStore.saveTeams()
      }
      if (isProfileChanged) {
        Object.assign(profile, {
          jobTitle: form.jobTitle,
          department: form.department,
          location: form.location,
          details: JSON.parse(JSON.stringify(form.details))
        })
      }
      isSaveSuccess.value = true
      setTimeout(() => { isSaveSuccess.value = false }, 2000)
    } catch (e) {
      Message.error('保存失败')
    } finally {
      isSaving.value = false
    }
}

const handleNameBlur = async () => {
  if (editingName.value === authStore.userDisplayName) return
  isSaving.value = true
  try {
    const res = await authStore.updateUserMetadata({ full_name: editingName.value })
    if (res.success) {
      isSaveSuccess.value = true
      setTimeout(() => { isSaveSuccess.value = false }, 2000)
    } else {
      Message.error('用户名更新失败')
    }
  } catch (e) {
    Message.error('更新失败')
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
    permissions: { navMain: [] } 
  })
  await performSave()
}

const removeTeam = async (name: string) => {
  const index = form.teams.findIndex((t: TeamItem) => t.name === name)
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
  { title: '操作', slotName: 'actions', width: 80, align: 'center' as const }
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
      Message.error('头像上传失败')
    }
  } catch (err) {
    Message.error('头像上传出错')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="profile-page">
    <ARow :gutter="20">
      <!-- 左侧：个人信息面板 -->
      <ACol :span="24" :lg="8">
        <div class="profile-left">
          <div class="profile-card">
            <!-- 头像区域 -->
            <div class="avatar-section">
              <div class="avatar-wrapper">
                <div v-if="!form.avatarUrl" class="avatar-placeholder">
                  <IconUser class="text-4xl text-[var(--color-text-3)]" />
                </div>
                <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar-img" />
                <div class="avatar-overlay">
                  <IconCamera class="text-white text-xl mb-0.5" />
                  <span class="text-[9px] text-white font-medium">更换头像</span>
                </div>
                <AUpload :show-file-list="false" @change="handleAvatarUpload" class="avatar-upload-trigger">
                  <template #upload-button><div class="w-[88px] h-[88px] rounded-full"></div></template>
                </AUpload>
              </div>
            </div>

            <!-- 用户名 (可直接编辑) -->
            <div class="name-container">
              <input 
                v-model="editingName" 
                class="profile-name-input" 
                @blur="handleNameBlur" 
                @keyup.enter="handleNameBlur"
                placeholder="设置用户名"
              />
            </div>


            <!-- 信息列表 -->
            <div class="info-list">
              <div class="info-item">
                <IconIdcard class="info-icon" />
                <span>{{ profile.jobTitle }}</span>
              </div>
              <div class="info-item">
                <IconUserGroup class="info-icon" />
                <span>{{ profile.department }}</span>
              </div>
              <div class="info-item">
                <IconLocation class="info-icon" />
                <span>{{ profile.location }}</span>
              </div>
              <div class="info-item">
                <IconAt class="info-icon" />
                <span>{{ authStore.userEmail }}</span>
              </div>
            </div>



            <!-- 分隔线 -->
            <div class="profile-divider"></div>

            <!-- 动态详情区域 -->
            <div class="details-section">
              <div v-for="(item, idx) in profile.details" :key="idx" class="detail-row">
                <span class="detail-label">{{ item.label }}</span>
                
                <!-- 根据类型渲染内容 -->
                <div v-if="item.type === 'tags'" class="tags-list">
                  <ATag v-for="tag in (item.value as string[])" :key="tag" class="profile-tag">{{ tag }}</ATag>
                </div>
                
                <ATag v-else-if="item.type === 'tag'" class="profile-tag">{{ item.value }}</ATag>
                
                <div v-else-if="item.type === 'hobbies'" class="hobby-tags">
                  <span v-for="hobby in (item.value as string[])" :key="hobby" class="hobby-tag">{{ hobby }}</span>
                </div>
                
                <span v-else class="detail-value">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </ACol>

      <!-- 右侧：团队管理 -->
      <ACol :span="24" :lg="16">
        <div class="profile-right">
          <ACard :bordered="true" class="shadow-sm rounded-xl overflow-hidden">
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
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">即将推出</span>
              </template>
              <template #actions="{ record }">
                <ATooltip content="删除团队">
                  <AButton type="text" status="danger" size="small" @click="removeTeam(record.name)">
                    <template #icon><IconDelete /></template>
                  </AButton>
                </ATooltip>
              </template>
              <template #empty>
                <div class="flex flex-col items-center py-8 text-gray-400">
                  <IconSafe class="text-3xl mb-3 opacity-30" />
                  <p class="text-sm mb-3">还没有团队</p>
                  <AButton type="outline" size="small" @click="addTeam">
                    <template #icon><IconPlus /></template>
                    添加您的第一个团队
                  </AButton>
                </div>
              </template>
            </ATable>
          </ACard>
        </div>
      </ACol>
    </ARow>


    <!-- 底部保存状态提示 -->
    <div v-if="isSaving || isSaveSuccess" 
         class="fixed bottom-4 right-4 backdrop-blur shadow-lg border rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300 z-50"
         :class="isSaveSuccess ? 'bg-white/80 dark:bg-slate-800/80 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-white/80 dark:bg-slate-800/80 text-primary border-primary/20'">
      <IconRefresh v-if="isSaving" class="animate-spin" />
      <IconCheck v-else />
      <span class="text-xs font-medium">{{ isSaveSuccess ? '已自动保存' : '自动保存中...' }}</span>
    </div>
  </div>
</template>

<style scoped>
/* 页面整体布局 */
.profile-page {
  width: 100%;
  padding: 24px;
}

/* ========== 左侧面板 ========== */
.profile-left {
  width: 100%;
}

.profile-card {
  background: var(--color-bg-2);
  border-radius: 16px;
  border: 1px solid var(--color-border-2);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 32px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 头像 */
.avatar-section {
  margin-bottom: 16px;
}

.avatar-wrapper {
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  border: 3px solid var(--color-bg-1);
  outline: 4px solid rgba(var(--primary-6), 0.06);
}

.avatar-placeholder {
  position: absolute;
  inset: 0;
  background: var(--color-fill-3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

.avatar-upload-trigger {
  position: absolute;
  inset: 0;
  z-index: 20;
  opacity: 0;
  width: 100%;
  height: 100%;
}

/* 用于无边框编辑的输入框 */
.profile-name-input {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-1);
  margin: 0 0 6px;
  border: none;
  background: transparent;
  width: 100%;
  text-align: center;
  padding: 4px 0;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: text;
}

.profile-name-input:hover {
  background: var(--color-fill-2);
}

.profile-name-input:focus {
  background: var(--color-fill-1);
  outline: none;
  box-shadow: 0 0 0 1px var(--color-primary-light-2);
}

.name-container {
  padding: 0 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}



/* 信息列表 */
.info-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 8px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text-2);
  line-height: 1.6;
}

.info-icon {
  flex-shrink: 0;
  margin-top: 3px;
  font-size: 16px;
  color: var(--color-text-3);
}



/* 分隔线 */
.profile-divider {
  width: 100%;
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-border-2) 0px,
    var(--color-border-2) 4px,
    transparent 4px,
    transparent 8px
  );
  margin-bottom: 24px;
}

.details-section {
  width: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.tags-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.profile-tag {
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 12px;
  background: var(--color-fill-2);
  color: var(--color-text-2);
  border: 1px solid var(--color-border-2);
}

.detail-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-3);
  flex-shrink: 0;
  width: 44px;
}

.detail-value {
  font-size: 13px;
  color: var(--color-text-2);
}

.hobby-tags {
  display: flex;
  gap: 8px;
}

.hobby-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 14px;
  font-size: 12px;
  border-radius: 4px;
  background: #FFF0F0;
  color: #F76560;
  border: 1px solid #FFCCC7;
}

/* ========== 右侧面板 ========== */
.profile-right {
  width: 100%;
}

/* ========== 通用样式覆盖 ========== */
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

/* 响应式 */
@media (max-width: 900px) {
  .profile-page {
    flex-direction: column;
  }
  .profile-left {
    width: 100%;
  }
}
</style>
