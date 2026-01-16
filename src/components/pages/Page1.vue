<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Button as AButton } from '@arco-design/web-vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FilterInput, FilterSelect, FilterDateRange, FilterTreeSelect, FilterCard, ArcoTable } from '@/components/ui/filter'
import { useNavigation } from '@/config/sidebar'
import { useConfigStore, type Page1Config } from '@/stores/configStore'

// --- Props ---
const props = defineProps<{
  navId?: string
  visibleSections?: ('filter' | 'actions' | 'card' | 'table')[]
}>()

// --- 获取导航状态 ---
const { currentNavId: routeNavId } = useNavigation()

// 优先使用传入的 prop，否则使用路由中的 navId
const currentNavId = computed(() => props.navId || routeNavId.value)

// Helper: Check if a section should be visible
const isSectionVisible = (section: 'filter' | 'actions' | 'card' | 'table') => {
  // If visibleSections prop is provided, strictly follow it
  if (props.visibleSections) {
    return props.visibleSections.includes(section)
  }
  // Otherwise, default to always true (visibility will be controlled by pageConfig flags in template)
  return true
}

// --- 使用 Pinia store ---
const configStore = useConfigStore()

// --- 获取当前页面配置 ---
const pageConfig = computed<Page1Config | undefined>(() => {
  const config = configStore.getPage1Config(currentNavId.value)
  return config
})

// --- 响应式数据 ---
const tableData = ref<any[]>([])

// 分页
const currentPage = ref(1)
const pageSize = computed(() => pageConfig.value?.tableArea.pageSize || 15)

// 顶部栏状态
const currentApp = ref(pageConfig.value?.topBar?.appOptions?.[0] ?? '')
const currentLang = ref(pageConfig.value?.topBar?.langOptions?.[0] ?? '')

// 从配置自动生成筛选状态
const filters = reactive<Record<string, any>>({})

// 根据 mockFormat 生成虚拟数据
function generateMockValue(format: string | undefined, label: string, index: number): string | number {
  switch (format) {
    case 'text':
      return `${label}${index + 1}`
    case 'datetime':
      const now = new Date()
      const randomDays = Math.floor(Math.random() * 30)
      const randomHours = Math.floor(Math.random() * 24)
      const randomMinutes = Math.floor(Math.random() * 60)
      const randomSeconds = Math.floor(Math.random() * 60)
      const date = new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const h = String(randomHours).padStart(2, '0')
      const m = String(randomMinutes).padStart(2, '0')
      const s = String(randomSeconds).padStart(2, '0')
      return `${year}-${month}-${day} ${h}:${m}:${s}`
    case 'number':
      return Math.floor(10000 + Math.random() * 90000)
    default:
      // 默认生成文本数据
      return `${label}${index + 1}`
  }
}

// 根据配置生成模拟数据
function generateMockData(): any[] {
  if (!pageConfig.value) return []
  
  const columns = pageConfig.value.tableArea.columns
  if (!columns || columns.length === 0) return []
  
  const rowCount = 20
  const data: any[] = []
  
  for (let i = 0; i < rowCount; i++) {
    const row: Record<string, any> = { id: i + 1 }
    
    columns.forEach(col => {
      // 无论是否有 mockFormat，都生成数据
      row[col.key] = generateMockValue(col.mockFormat, col.label, i)
    })
    
    data.push(row)
  }
  
  return data
}

// 加载数据函数
function loadData() {
  if (pageConfig.value?.mockData) {
    const mockData = pageConfig.value.mockData()
    if (mockData.length === 0) {
      tableData.value = generateMockData()
    } else {
      tableData.value = mockData
    }
  } else {
    tableData.value = generateMockData()
  }
  currentPage.value = 1
}

// 监听导航变化，重新加载数据
watch(currentNavId, () => {
  loadData()
}, { immediate: true })

// 监听配置变化，重置筛选状态并重新加载数据
watch(pageConfig, (config) => {
  if (config) {
    // 清空旧状态
    Object.keys(filters).forEach(key => delete filters[key])
    // 设置新状态
    config.filterArea.filters.forEach(filter => {
      filters[filter.key] = filter.defaultValue
    })
    // 重新加载数据（配置变化时）
    loadData()
  }
}, { immediate: true, deep: true })

// --- 计算属性 ---
const filteredData = computed(() => {
  return tableData.value
})

// 可见的筛选项
const visibleFilters = computed(() => {
  return pageConfig.value?.filterArea.filters.filter(f => f.visible !== false) || []
})

// 可见的列
const visibleColumns = computed(() => {
  return pageConfig.value?.tableArea.columns.filter(c => c.visible !== false) || []
})

// 可见的操作按钮
const visibleActions = computed(() => {
  return pageConfig.value?.actionsArea?.buttons?.filter((a: { visible?: boolean }) => a.visible !== false) || []
})

// --- 方法 ---
const handleRowClick = (record: any) => {
  console.log('Row clicked:', record)
}

const handleSelectionChange = (keys: (string | number)[]) => {
  console.log('Selection changed:', keys)
}

const handleActionClick = (action: string, record: any) => {
  console.log('Action clicked:', action, record)
}
</script>

<template>
  <div v-if="pageConfig" class="h-full flex flex-col overflow-hidden">
    <!-- 顶部操作栏 Teleport -->
    <Teleport to="#breadcrumb-actions" defer>
      <div class="flex items-center gap-4">
        <!-- topBar 选择器（如果配置了的话） -->
        <template v-if="pageConfig.topBar">
          <!-- App 选择 -->
          <Select v-if="pageConfig.topBar.appOptions" v-model="currentApp">
            <SelectTrigger class="w-[120px] h-8 text-xs">
              <SelectValue placeholder="选择应用" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="app in pageConfig.topBar.appOptions" :key="app" :value="app">
                {{ app }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- 语言选择 -->
          <Select v-if="pageConfig.topBar.langOptions" v-model="currentLang">
            <SelectTrigger class="w-[100px] h-8 text-xs">
              <SelectValue placeholder="选择语言" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="lang in pageConfig.topBar.langOptions" :key="lang" :value="lang">
                {{ lang }}
              </SelectItem>
            </SelectContent>
          </Select>
        </template>
      </div>
    </Teleport>

    <!-- 主体内容-->
    <div 
      class="flex-1 flex flex-col p-6 gap-4"
    >
      
      <!-- 功能区 - 筛选条件 + 操作按钮 -->
      <div 
        v-if="(isSectionVisible('filter') && pageConfig.filterArea?.show !== false) || (isSectionVisible('actions') && pageConfig.actionsArea?.show !== false)"
        class="bg-background rounded-xl border shadow-sm"
      >
        <div class="p-5">
          <!-- 动态筛选表单区 -->
          <div 
            v-if="isSectionVisible('filter') && pageConfig.filterArea?.show !== false"
            class="grid mb-4"
            :style="{
              gridTemplateColumns: `repeat(${pageConfig.filterArea.columns}, 1fr)`,
              gap: pageConfig.filterArea.gap,
            }"
          >
            <template v-for="config in visibleFilters" :key="config.key">
              <!-- 输入框类型 -->
              <FilterInput
                v-if="config.type === 'input'"
                :label="config.label"
                v-model="filters[config.key]"
                :placeholder="config.placeholder"
              />
              
              <!-- 下拉框类型 -->
              <FilterSelect
                v-else-if="config.type === 'select'"
                :label="config.label"
                v-model="filters[config.key]"
                :options="config.options ?? []"
              />

              <!-- 日期范围选择类型 -->
              <FilterDateRange
                v-else-if="config.type === 'date-range'"
                :label="config.label"
                v-model="filters[config.key]"
              />

              <!-- 树形下拉框类型 -->
              <FilterTreeSelect
                v-else-if="config.type === 'tree-select'"
                :label="config.label"
                v-model="filters[config.key]"
                :options="config.treeOptions ?? []"
                :placeholder="config.placeholder"
              />
            </template>
          </div>

          <!-- 底部操作按钮 -->
          <div 
            v-if="isSectionVisible('actions') && pageConfig.actionsArea?.show !== false" 
            class="flex items-center justify-end pt-2 border-t"
          >
            <div class="flex items-center gap-3">
              <template v-for="(action, index) in visibleActions" :key="action.key">
                <!-- 分隔符（在第2个按钮后添加） -->
                <div v-if="index === 2" class="w-px h-6 bg-border mx-1"></div>
                <Button 
                  v-if="action.variant === 'shadcn-outline'"
                  variant="outline"
                  class="h-9 px-5"
                  :class="action.className"
                  @click="handleActionClick(action.key, null)"
                >
                  {{ action.label }}
                </Button>
                <AButton 
                  v-else
                  :type="action.variant as any ?? 'outline'"
                  class="h-9 px-5"
                  :class="action.className"
                  @click="handleActionClick(action.key, null)"
                >
                  {{ action.label }}
                </AButton>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- 卡片区 -->
      <div 
        v-if="isSectionVisible('card') && pageConfig.cardArea?.show"
        class="grid"
        :style="{
          gridTemplateColumns: `repeat(${pageConfig.cardArea.columns}, 1fr)`,
          gap: pageConfig.cardArea.gap,
        }"
      >
        <FilterCard
          v-for="card in pageConfig.cardArea.cards"
          :key="card.key"
          :title="card.title"
          :data="card.data"
          :height="pageConfig.cardArea.cardHeight"
          :width="pageConfig.cardArea.cardWidth"
        />
      </div>

      <!-- 列表区 - 使用 ArcoTable 组件 -->
      <div 
        v-if="isSectionVisible('table') && pageConfig.tableArea?.show !== false"
        class="flex-1"
        :class="{ 'shrink-0': !pageConfig.tableArea.scrollY }"
      >
        <ArcoTable
          :columns="visibleColumns"
          :data="filteredData"
          :show-checkbox="pageConfig.tableArea.showCheckbox"
          :page-size="pageSize"
          :height="pageConfig.tableArea.scrollY ? '100%' : pageConfig.tableArea.height"
          :scroll-x="pageConfig.tableArea.scrollX"
          :scroll-y="pageConfig.tableArea.scrollY"
          :sticky-header="pageConfig.tableArea.stickyHeader !== false"
          :bordered="{ wrapper: true, cell: true }"
          class="h-full"
          @row-click="handleRowClick"
          @selection-change="handleSelectionChange"
          @action-click="handleActionClick"
        />
      </div>
    </div>
  </div>

  <!-- 无配置时显示占位 -->
  <div v-else class="flex flex-col items-center justify-center h-full text-muted-foreground">
      <p class="text-lg font-medium">配置未找到</p>
      <p class="text-sm">Config ID: {{ currentNavId }}</p>
      <p class="text-xs text-muted-foreground mt-2">请检查配置导入日志</p>
  </div>
</template>

<style scoped>
/* Page1 组件样式已移至 ArcoTable 组件 */
</style>
