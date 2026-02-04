<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Button as AButton, 
  Input as AInput, 
  Textarea as ATextarea, 
  Message,
  Card as ACard,
} from '@arco-design/web-vue'
import { Save } from 'lucide-vue-next'
import { useNavigation } from '@/composables/useNavigation'
import { useConfigPageStore } from '@/stores/config_page_Store'
import { FilterInput, FilterSelect, FilterDateRange, FilterTreeSelect } from '@/components/ui/filter'

const { currentNavId, detailKey, setDetailTitle } = useNavigation()
const pageStore = useConfigPageStore()

const formData = ref<Record<string, any>>({})
const loading = ref(false)

// Determine Context
const context = computed(() => {
  if (!currentNavId.value || !detailKey.value) return null
  
  const navTitle = pageStore.findNavTitleBySubId(currentNavId.value)
  if (!navTitle) return null
  
  const config = pageStore.getSubPageConfig(navTitle, currentNavId.value)
  if (!config?.component?.actionsArea?.buttons) return null
  
  const actionBtn = config.component.actionsArea.buttons.find(b => b.key === detailKey.value)
  if (!actionBtn || actionBtn.effectType !== 'page-form') return null
  
  return {
    navTitle,
    actionBtn,
    effectConfig: actionBtn.effectConfig
  }
})

const formItems = computed(() => context.value?.effectConfig?.formItems || [])

// Initialize Form Data
watch(context, (ctx) => {
  if (ctx && ctx.effectConfig?.formItems) {
    const data: Record<string, any> = {}
    ctx.effectConfig.formItems.forEach((item: any) => {
      data[item.key] = item.defaultValue || ''
    })
    formData.value = data
  }
}, { immediate: true })

const goBack = () => {
  setDetailTitle(null)
}

const handleSubmit = async () => {
  loading.value = true
  // Simulator API call
  await new Promise(resolve => setTimeout(resolve, 800))
  loading.value = false
  Message.success('提交成功')
  goBack()
}
</script>

<template>
  <div class="dynamic-form-page h-full flex flex-col">
    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="max-w-3xl mx-auto">
        <ACard :bordered="false" class="bg-transparent" :header-style="{ border: 'none' }">
          <div v-if="!context" class="py-10 text-center text-muted-foreground">
             配置不存在或已失效
          </div>
          <div v-else class="space-y-6 py-4">
             <div class="space-y-6">
                <template v-for="item in formItems" :key="item.key">
                   <div>
                      <FilterInput v-if="item.type === 'input'" :label="item.label" v-model="formData[item.key]" :placeholder="item.placeholder" />
                      <FilterSelect v-else-if="item.type === 'select'" :label="item.label" v-model="formData[item.key]" :options="item.options || []" :placeholder="item.placeholder" />
                      <FilterDateRange v-else-if="item.type === 'date-range'" :label="item.label" v-model="formData[item.key]" />
                      <FilterTreeSelect v-else-if="item.type === 'tree-select'" :label="item.label" v-model="formData[item.key]" :options="item.treeOptions || []" :placeholder="item.placeholder" />
                      <div v-else class="space-y-1.5">
                         <label class="text-xs font-medium text-muted-foreground">{{ item.label }}</label>
                         <ATextarea v-if="item.type === 'textarea'" v-model="formData[item.key]" :placeholder="item.placeholder" :auto-size="{minRows:3}" />
                         <AInput v-else v-model="formData[item.key]" :placeholder="item.placeholder" />
                      </div>
                   </div>
                </template>
             </div>
             
             <!-- Actions -->
             <div class="pt-4 flex justify-end gap-3 border-t">
                <AButton @click="goBack">取消</AButton>
                <AButton type="primary" :loading="loading" @click="handleSubmit">
                    <template #icon><Save class="w-4 h-4" /></template>
                    保存
                </AButton>
             </div>
          </div>
        </ACard>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.arco-card-body) {
  padding: 0;
  height: 80vh;
}
</style>
