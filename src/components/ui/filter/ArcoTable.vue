<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Table as ATable, Pagination as APagination } from '@arco-design/web-vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { TableColumn } from '@/config/page1'
import type { TableColumnData } from '@arco-design/web-vue'

// Props
interface Props {
  columns: TableColumn[]
  data: any[]
  showCheckbox?: boolean
  pageSize?: number
  height?: string
  scrollX?: boolean
  scrollY?: boolean
  stickyHeader?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showCheckbox: true,
  pageSize: 15,
  height: '500px',
  scrollX: true,
  scrollY: true,
  stickyHeader: true,
  loading: false
})

// Emits
const emit = defineEmits<{
  (e: 'row-click', record: any): void
  (e: 'selection-change', selectedKeys: (string | number)[]): void
  (e: 'action-click', action: string, record: any): void
}>()

// 选中的行
const selectedKeys = ref<(string | number)[]>([])

// 分页
const currentPage = ref(1)

// 状态样式映射
const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    pending: 'bg-orange-50 text-orange-700 border-orange-200',
    reviewing: 'bg-blue-50 text-blue-700 border-blue-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    failed: 'bg-rose-50 text-rose-700 border-rose-200',
  }
  return map[status] || 'bg-gray-50 text-gray-700 border-gray-200'
}

// 可见列
const visibleColumns = computed(() => {
  return props.columns.filter(c => c.visible !== false)
})

// 转换列配置为 Arco Table 格式
const arcoColumns = computed<TableColumnData[]>(() => {
  return visibleColumns.value.map(col => ({
    title: col.label,
    dataIndex: col.key,
    width: col.width ? parseInt(col.width) : undefined,
    fixed: col.fixed,
    slotName: col.key // 使用 slotName 来自定义渲染
  }))
})

// 分页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return props.data.slice(start, start + props.pageSize)
})

const totalCount = computed(() => props.data.length)

// 滚动配置
const scroll = computed(() => ({
  x: props.scrollX ? '100%' : undefined,
  y: props.scrollY ? props.height : undefined
}))

// 行选择配置
const rowSelection = computed(() => {
  if (!props.showCheckbox) return undefined
  return {
    type: 'checkbox' as const,
    showCheckedAll: true,
    selectedRowKeys: selectedKeys.value,
    onChange: (keys: (string | number)[]) => {
      selectedKeys.value = keys
      emit('selection-change', keys)
    }
  }
})

// 分页变化
const handlePageChange = (page: number) => {
  currentPage.value = page
}

// 行点击
const handleRowClick = (record: any) => {
  emit('row-click', record)
}

// 操作按钮点击
const handleActionClick = (action: string, record: any, e: Event) => {
  e.stopPropagation()
  emit('action-click', action, record)
}

// 监听数据变化重置分页
watch(() => props.data, () => {
  currentPage.value = 1
  selectedKeys.value = []
})
</script>

<template>
  <div class="arco-table-wrapper bg-background rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col">
    <!-- 表格区域 -->
    <div class="flex-1 min-h-0">
      <ATable
        :columns="arcoColumns"
        :data="paginatedData"
        :scroll="scroll"
        :pagination="false"
        :loading="loading"
        :row-selection="rowSelection"
        row-key="id"
        :bordered="false"
        size="medium"
        @row-click="handleRowClick"
      >
        <!-- 动态生成每列的 slot -->
        <template v-for="col in visibleColumns" :key="col.key" #[col.key]="{ record }">
          <!-- Badge 类型 -->
          <Badge 
            v-if="col.type === 'badge'" 
            variant="outline" 
            class="font-medium bg-blue-50 text-blue-700 border-blue-200"
          >
            {{ record[col.key] }}
          </Badge>
          
          <!-- 状态 Badge 类型 -->
          <Badge 
            v-else-if="col.type === 'status-badge'" 
            variant="outline" 
            :class="getStatusClass(record.orderStatus || record[col.key])"
            class="text-xs font-medium px-2 py-1 rounded-md"
          >
            {{ record[col.key] }}
          </Badge>
          
          <!-- 文字按钮类型 -->
          <div v-else-if="col.type === 'text-button'" class="flex items-center gap-2">
            <template v-if="col.buttons && col.buttons.length > 0">
              <template v-for="(btn, idx) in col.buttons" :key="idx">
                <div v-if="idx > 0" class="w-px h-4 bg-border/40"></div>
                <Button
                  variant="link"
                  size="sm"
                  class="h-auto p-0 text-primary hover:text-primary/80 font-medium"
                  @click="handleActionClick(btn, record, $event)"
                >
                  {{ btn }}
                </Button>
              </template>
            </template>
            <Button
              v-else
              variant="link"
              size="sm"
              class="h-auto p-0 text-primary hover:text-primary/80 font-medium"
              @click="handleActionClick(record[col.key], record, $event)"
            >
              {{ record[col.key] }}
            </Button>
          </div>
          
          <!-- 普通文本类型 -->
          <span v-else class="text-sm text-foreground/80">{{ record[col.key] ?? '-' }}</span>
        </template>
      </ATable>
    </div>

    <!-- 分页 -->
    <div class="flex justify-between items-center px-6 py-4 border-t bg-background/50">
      <div class="text-xs text-muted-foreground font-medium">
        共 <span class="text-foreground font-semibold">{{ totalCount }}</span> 条记录，
        显示第 <span class="text-foreground font-semibold">{{ ((currentPage - 1) * pageSize) + 1 }}</span> - 
        <span class="text-foreground font-semibold">{{ Math.min(currentPage * pageSize, totalCount) }}</span> 条
      </div>
      <APagination
        :total="totalCount"
        :current="currentPage"
        :page-size="pageSize"
        show-total
        show-jumper
        size="small"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.arco-table-wrapper :deep(.arco-table) {
  background: transparent;
}

.arco-table-wrapper :deep(.arco-table-th) {
  background: hsl(var(--muted) / 0.3);
  font-weight: 600;
  color: hsl(var(--foreground) / 0.8);
  border-bottom: 2px solid hsl(var(--border) / 0.3);
}

.arco-table-wrapper :deep(.arco-table-tr:hover .arco-table-td) {
  background: hsl(var(--muted) / 0.2);
}

.arco-table-wrapper :deep(.arco-table-td) {
  border-bottom: 1px solid hsl(var(--border) / 0.2);
}

.arco-table-wrapper :deep(.arco-pagination) {
  justify-content: flex-end;
}
</style>
