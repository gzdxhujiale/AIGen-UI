<script setup lang="ts">
import { computed } from 'vue'
import { RangePicker as ARangePicker, DatePicker as ADatePicker } from '@arco-design/web-vue'
import dayjs from 'dayjs'

type Precision = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second'

const props = withDefaults(defineProps<{
  label: string
  modelValue: string | number | Date | (string | number | Date)[] | undefined
  mode?: 'range' | 'single'
  precision?: Precision
  width?: string
  disabled?: boolean
}>(), {
  mode: 'range',
  precision: 'date'
})

defineEmits<{
  'update:modelValue': [value: string | number | Date | (string | number | Date)[] | undefined]
}>()

// Map precision to Arco picker mode
const pickerMode = computed(() => {
  if (['year', 'month'].includes(props.precision)) return props.precision as 'year' | 'month'
  return 'date'
})

// Whether to show time picker
const showTime = computed(() => ['hour', 'minute', 'second'].includes(props.precision))

// Time format based on precision
const timeFormat = computed(() => {
  switch (props.precision) {
    case 'hour': return 'YYYY-MM-DD HH'
    case 'minute': return 'YYYY-MM-DD HH:mm'
    case 'second': return 'YYYY-MM-DD HH:mm:ss'
    default: return undefined
  }
})

// Quick date range shortcuts
const shortcuts = [
  { label: '近一天', value: () => [dayjs().subtract(1, 'day').toDate(), dayjs().toDate()] },
  { label: '近一周', value: () => [dayjs().subtract(7, 'day').toDate(), dayjs().toDate()] },
  { label: '近一月', value: () => [dayjs().subtract(1, 'month').toDate(), dayjs().toDate()] },
  { label: '近三月', value: () => [dayjs().subtract(3, 'month').toDate(), dayjs().toDate()] },
  { label: '近半年', value: () => [dayjs().subtract(6, 'month').toDate(), dayjs().toDate()] },
  { label: '近一年', value: () => [dayjs().subtract(1, 'year').toDate(), dayjs().toDate()] },
]
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-xs font-medium text-muted-foreground whitespace-nowrap">{{ label }}</label>
    <!-- Single Date Picker -->
    <ADatePicker
      v-if="mode === 'single'"
      :model-value="modelValue as (string | number | Date)"
      :mode="pickerMode"
      :show-time="showTime"
      :format="timeFormat"
      :disabled="disabled"
      allow-clear
      :class="!width && 'flex-1'"
      :style="width ? { width } : undefined"
      @update:model-value="(val: any) => $emit('update:modelValue', val)"
    />
    <!-- Date Range Picker -->
    <ARangePicker
      v-else
      :model-value="Array.isArray(modelValue) ? modelValue : []"
      :mode="pickerMode"
      :show-time="showTime"
      :format="timeFormat"
      :shortcuts="shortcuts"
      :disabled="disabled"
      allow-clear
      :class="!width && 'flex-1'"
      :style="width ? { width } : undefined"
      @update:model-value="(val: any) => $emit('update:modelValue', val)"
    />
  </div>
</template>
