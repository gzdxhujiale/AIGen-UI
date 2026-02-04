<script setup lang="ts">
import { computed, ref } from 'vue'
import { Table as ATable, Empty as AEmpty, Skeleton as ASkeleton, SkeletonLine as ASkeletonLine, type TableColumnData } from '@arco-design/web-vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { TableColumn } from '@/types'
import { type TableConfig, mergeTableConfig } from './table-config'

// Props - 使用配置对象模式
interface Props {
  columns: TableColumn[]
  data: any[]
  config?: TableConfig
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

// Emits
const emit = defineEmits<{
  (e: 'row-click', record: any): void
  (e: 'selection-change', selectedKeys: (string | number)[]): void
  (e: 'action-click', action: string, record: any): void
  (e: 'page-change', page: number): void
  (e: 'column-resize', dataIndex: string, width: number): void
  (e: 'column-reorder', fromIndex: number, toIndex: number): void
  (e: 'row-reorder', data: any[]): void
}>()

// 合并用户配置与默认配置
const cfg = computed(() => mergeTableConfig(props.config))

// Internal State
const selectedKeys = ref<(string | number)[]>([])
const currentPage = ref(1)
const dragIndex = ref(-1)
const dragOverIndex = ref(-1)

// Helper: Status Styles
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

// Helper: Column Visibility
const visibleColumns = computed(() => {
  return props.columns.filter(c => c.visible !== false)
})

// Map to Arco Columns
const arcoColumns = computed<TableColumnData[]>(() => {
  const cols = visibleColumns.value
  
  // 找出最后一个非固定列的索引
  let lastNonFixedIndex = -1
  for (let i = cols.length - 1; i >= 0; i--) {
    if (!cols[i].fixed) {
      lastNonFixedIndex = i
      break
    }
  }
  
  return cols.map((col, index) => {
    let width: number | undefined = undefined
    
    if (col.width) {
      width = typeof col.width === 'string' ? parseInt(col.width) || 120 : col.width
    } else if (col.fixed) {
      width = 120
    } else if (index !== lastNonFixedIndex) {
      width = 120
    }

    return {
      title: col.label,
      dataIndex: col.key,
      width: width,
      fixed: col.fixed,
      align: col.align,
      ellipsis: col.ellipsis,
      tooltip: col.tooltip,
      slotName: col.key,
      titleSlotName: `title-${col.key}`,
      sortable: col.sortable ? { sortDirections: ['ascend', 'descend'] } : undefined,
      filterable: col.filterable ? {
        filters: Array.from(new Set(props.data.map(item => item[col.key]))).filter(Boolean).map(val => ({ text: String(val), value: String(val) })),
        filter: (value: any, record: any) => String(record[col.key]).includes(String(value)),
        multiple: true
      } : undefined
    }
  })
})

// Pagination Configuration
const paginationProps = computed(() => ({
  total: props.data.length,
  current: currentPage.value,
  pageSize: cfg.value.pagination.pageSize,
  showTotal: cfg.value.pagination.showTotal,
  showJumper: cfg.value.pagination.showJumper,
  size: 'small',
  showPageSize: false,
}))

// Scroll Configuration
const scroll = computed(() => {
  const x = cfg.value.scroll.x ? '100%' : undefined
  const y = cfg.value.scroll.y === true ? cfg.value.layout.height : (cfg.value.scroll.y || undefined)
  return { x, y }
})

// Selection Configuration
const rowSelection = computed(() => {
  if (!cfg.value.selection.enabled) return undefined
  return {
    type: 'checkbox' as const,
    showCheckedAll: cfg.value.selection.showCheckedAll,
    selectedRowKeys: selectedKeys.value,
    width: cfg.value.selection.width,
    onChange: (keys: (string | number)[]) => {
      selectedKeys.value = keys
      emit('selection-change', keys)
    }
  }
})

// Row Draggable Configuration
const rowDraggableConfig = computed(() => {
  if (!cfg.value.drag.row) return undefined
  return {
    type: 'handle' as const,
    width: 40,
    title: ' '
  }
})

// Event Handlers
const handlePageChange = (page: number) => {
  currentPage.value = page
  emit('page-change', page)
}

const handleRowClick = (record: any) => {
  emit('row-click', record)
}

const handleActionClick = (action: string, record: any, e: Event) => {
  e.stopPropagation()
  emit('action-click', action, record)
}

const handleRowChange = (data: any[]) => {
  emit('row-reorder', data)
}

const emptyBodyHeight = computed(() => {
  if (cfg.value.emptyData && cfg.value.pagination.pageSize) {
    return cfg.value.pagination.pageSize * 44
  }
  return undefined
})

// Column Drag Handlers
const handleDragStart = (e: DragEvent, index: number) => {
  if (!cfg.value.drag.column) return
  dragIndex.value = index
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
  }
}

const handleDragOver = (e: DragEvent, index: number) => {
  if (!cfg.value.drag.column) return
  e.preventDefault()
  dragOverIndex.value = index
}

const handleDrop = (toIndex: number) => {
  if (!cfg.value.drag.column || dragIndex.value === -1) return
  const fromIndex = dragIndex.value
  if (fromIndex !== toIndex) {
    emit('column-reorder', fromIndex, toIndex)
  }
  dragIndex.value = -1
  dragOverIndex.value = -1
}

const handleDragEnd = () => {
  dragIndex.value = -1
  dragOverIndex.value = -1
}
</script>

<template>
  <div class="arco-table-wrapper bg-background rounded-xl border border-border/60 shadow-sm flex flex-col">
    <ATable
      :columns="arcoColumns"
      :data="props.data"
      :scroll="scroll"
      :pagination="paginationProps"
      :loading="props.loading"
      :row-selection="rowSelection"
      row-key="id"
      :bordered="cfg.layout.bordered"
      :stripe="cfg.layout.stripe"
      :hoverable="cfg.layout.hover"
      :show-header="cfg.showHeader"
      :column-resizable="cfg.column.resizable"
      :sticky-header="cfg.scroll.stickyHeader"
      :table-layout-fixed="cfg.layout.fixed"
      :draggable="rowDraggableConfig"
      size="medium"
      @page-change="handlePageChange"
      @row-click="handleRowClick"
      @column-resize="(index: string, width: number) => emit('column-resize', index, width)"
      @change="handleRowChange"
    >
      <!-- Empty Slot -->
      <template #empty>
        <div 
          class="flex items-center justify-center w-full"
          :style="{ height: emptyBodyHeight ? `${emptyBodyHeight}px` : undefined }"
        >
          <AEmpty />
        </div>
      </template>

      <!-- Forward Header Slots -->
      <template v-for="(col, idx) in visibleColumns" :key="`header-${col.key}`" #[`title-${col.key}`]>
        <div 
          class="custom-header-cell flex items-center relative w-full group/header-cell h-full"
          :class="{ 
            'cursor-move': cfg.drag.column, 
            'bg-primary/5': dragOverIndex === idx && dragIndex !== idx 
          }"
          :draggable="cfg.drag.column"
          @dragstart="handleDragStart($event, idx)"
          @dragover="handleDragOver($event, idx)"
          @drop="handleDrop(idx)"
          @dragend="handleDragEnd"
        >
          <div class="flex-1 flex items-center min-w-0 pr-2">
            <slot :name="`header-${col.key}`" :column="col">
              <span class="truncate">{{ col.label }}</span>
            </slot>
          </div>

          <!-- Vertical indicator for drop target -->
          <div v-if="cfg.drag.column && dragOverIndex === idx && dragIndex !== idx" 
            class="absolute top-0 bottom-0 w-1 bg-primary z-20 pointer-events-none"
            :class="dragIndex < idx ? 'right-0' : 'left-0'"
          ></div>
        </div>
      </template>

      <!-- Forward/Handle Body Slots -->
      <template v-for="col in visibleColumns" :key="col.key" #[col.key]="{ record, rowIndex }">
        <slot :name="col.key" :record="record" :rowIndex="rowIndex" :column="col">
          <!-- Badge -->
          <Badge 
            v-if="col.type === 'badge'" 
            variant="outline" 
            class="font-medium bg-blue-50 text-blue-700 border-blue-200"
          >
            {{ record[col.key] }}
          </Badge>
          
          <!-- Status Badge -->
          <Badge 
            v-else-if="col.type === 'status-badge'" 
            variant="outline" 
            :class="getStatusClass(record.orderStatus || record[col.key])"
            class="text-xs font-medium px-2 py-1 rounded-md"
          >
            {{ record[col.key] }}
          </Badge>
          
          <!-- Text Buttons -->
          <div v-else-if="col.type === 'text-button'" class="flex items-center gap-2">
            <template v-if="col.buttons && col.buttons.length > 0">
              <template v-for="(btn, idx) in col.buttons" :key="idx">
                <div v-if="idx > 0" class="w-px h-4 bg-border/40"></div>
                <Button
                  variant="link"
                  size="sm"
                  class="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium"
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
              class="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium"
              @click="handleActionClick(record[col.key] || 'View', record, $event)"
            >
              {{ record[col.key] }}
            </Button>
          </div>
          
          <!-- Default Text -->
          <span v-else class="text-sm text-foreground/80">{{ record[col.key] || '' }}</span>
        </slot>
      </template>
    </ATable>

    <!-- Loading Overlay with Arco Skeleton -->
    <div v-if="props.loading" class="absolute inset-0 z-50 bg-background/80 backdrop-blur-[1px] flex flex-col p-4">
      <div class="bg-card border rounded-lg p-6 shadow-sm w-full h-full">
        <ASkeleton :animation="true">
          <ASkeletonLine :rows="8" :widths="['40%', '100%', '100%', '80%', '100%', '100%', '60%', '100%']" />
        </ASkeleton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Override Arco styles to match shadcn theme where needed */
.arco-table-wrapper :deep(.arco-table) {
  background: transparent;
  --color-text-1: hsl(var(--foreground));
  --color-text-2: hsl(var(--muted-foreground));
  --color-border-2: hsl(var(--border));
  --color-fill-2: hsl(var(--muted));
}

.arco-table-wrapper :deep(.arco-table-th-item-title) {
  font-weight: 700;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
}

.custom-header-cell {
  box-sizing: border-box;
}

/* Header Action Buttons Hover Logic */
.arco-table-wrapper :deep(.header-actions) {
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  transform: translateY(-50%) translateX(4px);
}

.arco-table-wrapper :deep(.arco-table-th:hover) .header-actions {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(-50%) translateX(0);
}

.arco-table-wrapper :deep(.arco-btn-link) {
  padding: 0;
  height: auto;
  line-height: inherit;
}

/* Pagination container alignment within Arco */
.arco-table-wrapper :deep(.arco-table-pagination) {
  margin-top: 0;
  border-top: 1px solid hsl(var(--border));
  padding: 0.75rem 1rem;
  background-color: hsl(var(--muted) / 0.2);
}

.arco-table-wrapper :deep(.arco-pagination) {
  justify-content: flex-end;
}

/* Ensure table expands to fill height */
.arco-table-wrapper :deep(.arco-table-container) {
  min-height: 200px;
}

/* Force centering for no-data */
.arco-table-wrapper :deep(.arco-table-no-data) {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 100%;
  height: 100%;
  inset: auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* Remove background from sorted columns */
.arco-table-wrapper :deep(.arco-table-td-sorted) {
  background-color: transparent;
}
</style>
