<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue-sonner'
import { Loader2, Plus, Trash2, Save } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useConfigStore } from '@/stores/configStore'

const authStore = useAuthStore()
const configStore = useConfigStore()
const isSaving = ref(false)

// Form state
const form = ref({
  userName: '',
  teams: [] as any[]
})

// Initialize form data from store
const initForm = () => {
  form.value.userName = authStore.customUserName || authStore.userDisplayName
  // Deep copy teams config to avoid direct mutation of store state
  form.value.teams = JSON.parse(JSON.stringify(authStore.teamsConfig || []))
}

onMounted(() => {
  if (authStore.user) {
    initForm()
  }
})

// Watch for store changes (e.g. if loaded late)
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

// Initial style sync taken care of in App.vue or via direct binding
// Removing the immediate watch here as it causes a reset loop when switching styles before saving.


// Team Management Actions
const addTeam = () => {
  form.value.teams.push({
    id: `team-${Date.now()}`,
    name: 'New Team',
    role: 'member',
    permissions: ['read']
  })
}

const removeTeam = (index: number) => {
  form.value.teams.splice(index, 1)
}

const handleSave = async () => {
  if (!authStore.user) return
  
  isSaving.value = true
  try {
    const result = await authStore.updateUserProfile(
      form.value.userName, 
      form.value.teams,
      configStore.navigationStyle
    )
    
    if (result.success) {
      toast.success('保存成功', { description: '您的个人资料已更新' })
    } else {
      toast.error('保存失败', { description: result.error })
    }
  } catch (e: any) {
    toast.error('保存失败', { description: e.message })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col h-full overflow-hidden">
    
    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto p-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1600px]">
        
        <!-- Left Column: Basic Info & Profile -->
        <div class="lg:col-span-4 space-y-6">
          <Card class="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>您的公开个人资料信息。</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <!-- Avatar Placeholder (Future enhancement) -->
              <div class="flex justify-center py-4">
                <div class="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-3xl font-semibold text-muted-foreground">
                  {{ authStore.userDisplayName.slice(0, 2).toUpperCase() }}
                </div>
              </div>

              <div class="space-y-3">
                <label for="name" class="text-sm font-medium leading-none">显示名称</label>
                <Input id="name" v-model="form.userName" placeholder="请输入您的名字" />
              </div>
              
              <div class="space-y-3">
                 <label for="email" class="text-sm font-medium leading-none">关联邮箱</label>
                 <Input id="email" :value="authStore.userEmail" disabled class="bg-muted text-muted-foreground cursor-not-allowed opacity-80" />
                 <p class="text-[0.8rem] text-muted-foreground">邮箱用于登录和接收通知，暂不支持修改。</p>
              </div>
            </CardContent>
          </Card>

          <!-- System Settings -->
          <Card class="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>系统设置</CardTitle>
              <CardDescription>个性化您的界面体验。</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <!-- Navigation Style -->
              <div class="space-y-3">
                <label class="text-sm font-medium leading-none">导航样式</label>
                <div class="grid grid-cols-2 gap-4">
                  <div 
                    class="cursor-pointer border-2 rounded-lg p-3 flex flex-col items-center gap-2 hover:bg-muted/50 transition-colors"
                    :class="configStore.navigationStyle === 'shadcn' ? 'border-primary bg-muted/20' : 'border-border'"
                    @click="configStore.setNavigationStyle('shadcn')"
                  >
                     <div class="w-full h-12 bg-zinc-900/10 rounded border border-dashed border-zinc-900/20 flex items-center justify-center text-xs text-muted-foreground">Shadcn</div>
                     <span class="text-sm font-medium">Shadcn UI</span>
                  </div>
                  
                  <div 
                    class="cursor-pointer border-2 rounded-lg p-3 flex flex-col items-center gap-2 hover:bg-muted/50 transition-colors"
                    :class="configStore.navigationStyle === 'arco' ? 'border-primary bg-muted/20' : 'border-border'"
                    @click="configStore.setNavigationStyle('arco')"
                  >
                     <div class="w-full h-12 bg-blue-500/10 rounded border border-dashed border-blue-500/20 flex items-center justify-center text-xs text-primary">Arco</div>
                     <span class="text-sm font-medium">Arco Design</span>
                  </div>
                </div>
                <p class="text-[0.8rem] text-muted-foreground">选择您喜欢的侧边栏导航风格。</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Right Column: Teams Configuration -->
        <div class="lg:col-span-8 space-y-6">
          <Card class="border-border/60 shadow-sm flex flex-col h-full">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <div class="space-y-1">
                <CardTitle>团队配置 (JSON Config)</CardTitle>
                <CardDescription>配置您所属的团队、角色及权限 (NavMain/Projects)。</CardDescription>
              </div>
              <Button size="sm" variant="outline" @click="addTeam" class="h-9">
                <Plus class="w-4 h-4 mr-2" />
                新增团队
              </Button>
            </CardHeader>
            <CardContent class="flex-1">
                
              <div v-if="form.teams.length === 0" class="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/5">
                <div class="p-4 rounded-full bg-muted/30 mb-4">
                  <Plus class="w-8 h-8 text-muted-foreground/50" />
                </div>
                <p class="text-sm font-medium">暂无团队配置</p>
                <p class="text-xs mt-1 text-muted-foreground/70">点击右上角按钮添加您的第一个团队</p>
              </div>

              <div v-else class="space-y-6">
                <div class="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader class="bg-muted/40">
                      <TableRow>
                        <TableHead class="w-[80px]">ID</TableHead>
                        <TableHead>团队名称</TableHead>
                        <TableHead class="w-[120px]">角色 (Role)</TableHead>
                        <TableHead>权限 (Permissions)</TableHead>
                        <TableHead class="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow v-for="(team, index) in form.teams" :key="index" class="hover:bg-muted/5">
                        <TableCell class="font-mono text-xs text-muted-foreground py-3">{{ team.id.replace('team-', '#') }}</TableCell>
                        <TableCell class="py-3">
                          <Input v-model="team.name" class="h-8 shadow-none" placeholder="团队名称" />
                        </TableCell>
                        <TableCell class="py-3">
                          <Input v-model="team.role" class="h-8 shadow-none" placeholder="member" />
                        </TableCell>
                        <TableCell class="py-3">
                          <Input 
                            :model-value="team.permissions?.join(', ')" 
                            @update:model-value="(val) => team.permissions = String(val).split(',').map((s: string) => s.trim()).filter(Boolean)" 
                            class="h-8 shadow-none" 
                            placeholder="如: admin, read, write" 
                          />
                        </TableCell>
                        <TableCell class="py-3">
                          <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" @click="removeTeam(index)">
                            <Trash2 class="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div class="rounded-md bg-muted/30 border p-4">
                  <details class="text-xs group">
                    <summary class="cursor-pointer text-muted-foreground hover:text-foreground font-medium flex items-center select-none">
                      <span class="mr-2 opacity-50 transition-transform group-open:rotate-90">▶</span>
                      查看原始 JSON 数据
                    </summary>
                    <div class="mt-3 relative">
                      <pre class="overflow-auto max-h-[300px] font-mono text-[11px] leading-relaxed p-3 bg-muted/50 rounded border">{{ JSON.stringify(form.teams, null, 2) }}</pre>
                    </div>
                  </details>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    
    <!-- Footer Actions -->
    <div class="flex items-center justify-end gap-4 px-8 py-4 border-t bg-background/95 backdrop-blur z-10 shrink-0">
      <div class="text-xs text-muted-foreground mr-auto">
        所有更改需要保存后生效。
      </div>
      <Button :disabled="isSaving" @click="handleSave">
        <Loader2 v-if="isSaving" class="animate-spin w-4 h-4 mr-2" />
        <Save v-else class="w-4 h-4 mr-2" />
        保存所有更改
      </Button>
    </div>
  </div>
</template>
