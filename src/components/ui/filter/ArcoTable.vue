<script setup lang="ts">
import { computed, ref } from 'vue'
import { Table as ATable, type TableColumnData } from '@arco-design/web-vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { TableColumn } from '@/config/schema'

// Props
interface Props {
  columns: TableColumn[]
  data: any[]
  showCheckbox?: boolean
  showCheckedAll?: boolean
  pageSize?: number
  height?: string
  scrollX?: boolean | string | number
  scrollY?: boolean | string | number
  stickyHeader?: boolean
  loading?: boolean
  bordered?: boolean | { wrapper?: boolean, cell?: boolean, headerCell?: boolean, bodyCell?: boolean }
  stripe?: boolean
  hover?: boolean
  showHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showCheckbox: true,
  showCheckedAll: true,
  pageSize: 15,
  height: '500px',
  scrollX: true,
  scrollY: true,
  stickyHeader: true,
  loading: false,
  bordered: true,
  stripe: false,
  hover: true,
  showHeader: true
})

// Emits
const emit = defineEmits<{
  (e: 'row-click', record: any): void
  (e: 'selection-change', selectedKeys: (string | number)[]): void
  (e: 'action-click', action: string, record: any): void
  (e: 'page-change', page: number): void
}>()

// Internal State
const selectedKeys = ref<(string | number)[]>([])
const currentPage = ref(1)

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
  return visibleColumns.value.map(col => {
    const isPercentage = typeof col.width === 'string' && col.width.endsWith('%')
    const width = (col.width && !isPercentage) ? parseInt(col.width) : undefined

    const cellStyle: any = {}
    if (col.minWidth) cellStyle.minWidth = col.minWidth
    if (isPercentage) cellStyle.width = col.width

    return {
      title: col.label,
      dataIndex: col.key,
      width: width,
      fixed: col.fixed,
      align: col.align,
      ellipsis: col.ellipsis,
      tooltip: col.tooltip,
      slotName: col.key, // Slot mapping for body
      titleSlotName: `title-${col.key}`, // Slot mapping for header
      cellStyle: Object.keys(cellStyle).length > 0 ? cellStyle : undefined,
      headerCellStyle: Object.keys(cellStyle).length > 0 ? cellStyle : undefined
    }
  })
})

// Pagination Configuration
const paginationProps = computed(() => ({
  total: props.data.length,
  current: currentPage.value,
  pageSize: props.pageSize,
  showTotal: true,
  showJumper: true,
  size: 'small',
  showPageSize: false,
}))

// Scroll Configuration
const scroll = computed(() => ({
  x: props.scrollX === true ? '100%' : props.scrollX,
  y: props.scrollY === true ? props.height : props.scrollY
}))

// Selection Configuration
const rowSelection = computed(() => {
  if (!props.showCheckbox) return undefined
  return {
    type: 'checkbox' as const,
    showCheckedAll: props.showCheckedAll,
    selectedRowKeys: selectedKeys.value,
    onChange: (keys: (string | number)[]) => {
      selectedKeys.value = keys
      emit('selection-change', keys)
    }
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
</script>

<template>
  <div class="arco-table-wrapper bg-background rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col">
    <ATable
      :columns="arcoColumns"
      :data="props.data"
      :scroll="scroll"
      :pagination="paginationProps"
      :loading="props.loading"
      :row-selection="rowSelection"
      row-key="id"
      :bordered="props.bordered"
      :stripe="props.stripe"
      :hoverable="props.hover"
      :show-header="props.showHeader"
      size="medium"
      @page-change="handlePageChange"
      @row-click="handleRowClick"
    >
      <!-- Forward Header Slots -->
      <template v-for="col in visibleColumns" :key="`header-${col.key}`" #[`title-${col.key}`]>
        <slot :name="`header-${col.key}`" :column="col">
          {{ col.label }}
        </slot>
      </template>

      <!-- Forward/Handle Body Slots -->
      <template v-for="col in visibleColumns" :key="col.key" #[col.key]="{ record, rowIndex }">
        <slot :name="col.key" :record="record" :rowIndex="rowIndex" :column="col">
          <!-- Default Render Logic based on 'type' -->
          
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
          <span v-else class="text-sm text-foreground/80 inline-block min-h-[22px]">{{ record[col.key] || '' }}</span>
        </slot>
      </template>
    </ATable>
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
  height: 100%;
  display: flex;
  flex-direction: column;
}

.arco-table-wrapper :deep(.arco-table-header) {
  flex-shrink: 0;
}

.arco-table-wrapper :deep(.arco-table-body) {
  flex: 1;
  height: 100% !important; /* Force height to take remaining space */
  position: relative;
  min-height: 200px; /* Ensure minimum height for no-data state */
}

/* Force centering for no-data */
.arco-table-wrapper :deep(.arco-table-no-data) {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 100%;
  height: 100%;
  inset: auto !important; /* Reset inset */
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>
