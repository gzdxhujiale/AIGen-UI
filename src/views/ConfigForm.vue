<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  Input as AInput,
  Select as ASelect,
  Option as AOption,
  Textarea as ATextarea,
  Button as AButton,
} from '@arco-design/web-vue'
import { Button as ShadcnButton } from '@/components/ui/button'
import { FormInput, Plus, Trash2 } from 'lucide-vue-next'
import { Message } from '@arco-design/web-vue'
import { useConfigPageStore } from '@/stores/config_page_Store'

interface ConditionRule {
  sourceColumn: string
  operator: string
  compareValue: string
  displayValue: string
}

const props = defineProps<{
  type: 'filter' | 'column' | 'action' | 'card'
  modelValue: any
  availableColumns?: Array<{ key: string; label: string }>  // 可用的列列表（用于条件格式）
}>()

const emit = defineEmits(['update:modelValue'])

const formState = ref<any>({ ...props.modelValue })

// 条件格式规则数组（用于可视化编辑）
const conditionRulesArray = ref<ConditionRule[]>([])

// 运算符选项
const operatorOptions = [
  { value: '==', label: '等于 (==)' },
  { value: '!=', label: '不等于 (!=)' },
  { value: '>', label: '大于 (>)' },
  { value: '<', label: '小于 (<)' },
  { value: '>=', label: '大于等于 (>=)' },
  { value: '<=', label: '小于等于 (<=)' },
  { value: 'contains', label: '包含 (contains)' }
]

// 初始化条件规则数组
function initConditionRules() {
  if (formState.value.conditionRules) {
    try {
      const parsed = JSON.parse(formState.value.conditionRules)
      if (Array.isArray(parsed)) {
        conditionRulesArray.value = parsed
      }
    } catch {
      conditionRulesArray.value = []
    }
  } else {
    conditionRulesArray.value = []
  }
}

const configPageStore = useConfigPageStore()

const availablePages = computed(() => {
  const pages: { value: string; label: string }[] = []
  // navGroups: [{ label: 'App', items: [{ title: 'Main1', items: [...] }] }]
  configPageStore.navGroups.forEach((group: any) => {
    group.items.forEach((mainItem: any) => {
      if (mainItem.items) {
        mainItem.items.forEach((subItem: any) => {
          pages.push({
            value: subItem.id,
            label: subItem.title
          })
        })
      }
    })
  })
  return pages
})

// 同步条件规则数组到 formState
function syncConditionRulesToFormState() {
  formState.value.conditionRules = JSON.stringify(conditionRulesArray.value)
}

// 添加条件规则
function addConditionRule() {
  conditionRulesArray.value.push({
    sourceColumn: '',
    operator: '==',
    compareValue: '',
    displayValue: ''
  })
  syncConditionRulesToFormState()
}

// 删除条件规则
function removeConditionRule(index: number) {
  conditionRulesArray.value.splice(index, 1)
  syncConditionRulesToFormState()
}

// 监听规则变化并同步
watch(conditionRulesArray, () => {
  syncConditionRulesToFormState()
}, { deep: true })

// 监听 prop 变化，更新内部状态
watch(() => props.modelValue, (newVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(formState.value)) {
    formState.value = JSON.parse(JSON.stringify(newVal))
    initConditionRules()
  }
}, { deep: true })

// 监听内部状态变化，emit 更新
watch(formState, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

// Ensure effectConfig is initialized when effectType requires it
watch(() => formState.value.effectType, (newType) => {
  if ((newType === 'table' || newType === 'modal') && !formState.value.effectConfig) {
    formState.value.effectConfig = {}
  }
})

// 初始化
initConditionRules()

// --- Action Form Logic ---

const addEffectFormItem = () => {
  if (!formState.value.effectFormItems) {
    formState.value.effectFormItems = []
  }
  const id = Math.random().toString(36).substring(2, 7)
  formState.value.effectFormItems.push({
    key: `f_${id}`,
    label: '新字段',
    type: 'input',
    placeholder: '',
    options: [],
    defaultValue: ''
  })
}
const removeEffectFormItem = (index: any) => {
  if (formState.value.effectFormItems) {
    formState.value.effectFormItems.splice(index, 1)
  }
}

// --- Nested Column Config Logic ---
// (Previously used for column editing, now removed)
</script>

<template>
  <div class="config-form-container">
    <!-- ========================================== -->
    <!-- Filter Config Form                         -->
    <!-- ========================================== -->
    <div v-if="type === 'filter'" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium mb-1.5 block">字段名 (Key)</label>
          <AInput v-model="formState.key" placeholder="如: keyword" />
        </div>
        <div>
          <label class="text-sm font-medium mb-1.5 block">显示标签 (Label)</label>
          <AInput v-model="formState.label" placeholder="如: 关键词" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium mb-1.5 block">类型 (Type)</label>
          <ASelect v-model="formState.type" class="w-full">
            <AOption value="input">输入框 (Input)</AOption>
            <AOption value="select">下拉框 (Select)</AOption>
            <AOption value="date-range">日期范围 (DateRange)</AOption>
            <AOption value="tree-select">树形选择 (TreeSelect)</AOption>
          </ASelect>
        </div>
        <div>
          <label class="text-sm font-medium mb-1.5 block">占位文字 (Placeholder)</label>
          <AInput v-model="formState.placeholder" placeholder="请输入..." />
        </div>
      </div>

      <!-- 动态配置项 -->
      <div v-if="formState.type === 'select'" class="space-y-2 animate-in fade-in slide-in-from-top-1">
        <label class="text-sm font-medium block">
          选项列表 (Options) <span class="text-xs text-muted-foreground font-normal ml-1">使用逗号分隔</span>
        </label>
        <ATextarea
          v-model="formState.options"
          placeholder="例如: 选项A,选项B,选项C"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </div>

      <div v-if="formState.type === 'tree-select'" class="space-y-2 animate-in fade-in slide-in-from-top-1">
        <label class="text-sm font-medium block">
          树形数据 (Tree Options JSON)
        </label>
        <ATextarea
          v-model="formState.treeOptions"
          placeholder='[{"key": "1", "title": "Node 1", "children": [...]}]'
          :auto-size="{ minRows: 4, maxRows: 8 }"
          class="font-mono text-xs"
        />
      </div>
    </div>

    <!-- ========================================== -->
    <!-- Column Config Form                         -->
    <!-- ========================================== -->
    <div v-else-if="type === 'column'" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium mb-1.5 block">字段名 (Key)</label>
          <AInput v-model="formState.key" placeholder="如: user_name" />
        </div>
        <div>
          <label class="text-sm font-medium mb-1.5 block">显示标签 (Label)</label>
          <AInput v-model="formState.label" placeholder="如: 用户名" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium mb-1.5 block">宽度 (Width)</label>
          <AInput v-model="formState.width" placeholder="如: 120px" />
        </div>
        <div>
          <label class="text-sm font-medium mb-1.5 block">类型 (Type)</label>
          <ASelect v-model="formState.type" class="w-full">
            <AOption value="text">普通文本 (Text)</AOption>
            <AOption value="badge">徽标 (Badge)</AOption>
            <AOption value="status-badge">状态点 (Status Badge)</AOption>
            <AOption value="text-button">文字按钮组 (Text Button)</AOption>
          </ASelect>
        </div>
      </div>

      <!-- 模拟数据配置 -->
      <div class="p-3 border rounded-md bg-muted/20 space-y-3">
        <div class="grid grid-cols-2 gap-4">
           <div>
            <label class="text-sm font-medium mb-1.5 block">Mock 格式</label>
            <ASelect v-model="formState.mockFormat" class="w-full" placeholder="选择生成规则">
              <AOption value="none">无</AOption>
              <AOption value="text">随机文本</AOption>
              <AOption value="datetime">随机时间</AOption>
              <AOption value="number">随机数字</AOption>
              <AOption value="list">从列表随机</AOption>
              <AOption value="list-order">从列表顺序</AOption>
              <AOption value="conditional">条件格式</AOption>
            </ASelect>
          </div>
          <div v-if="formState.mockFormat === 'list' || formState.mockFormat === 'list-order'">
            <label class="text-sm font-medium mb-1.5 block">
              {{ formState.mockFormat === 'list-order' ? '顺序列表 (逗号隔开)' : '随机列表 (逗号隔开)' }}
            </label>
            <AInput 
              :model-value="Array.isArray(formState.mockList) ? formState.mockList.join(',') : formState.mockList" 
              @update:model-value="(v: string) => { formState.mockList = v.split(',').map((s: string) => s.trim()).filter(Boolean) }" 
              placeholder="A, B, C" 
            />
          </div>
          <div v-if="formState.mockFormat === 'conditional'" class="col-span-2">
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-medium">
                条件格式规则
                <span class="text-xs text-muted-foreground font-normal ml-1">当其他列满足条件时显示指定值</span>
              </label>
              <AButton size="mini" type="outline" @click="addConditionRule">
                <template #icon><Plus class="w-3 h-3" /></template>
                添加条件
              </AButton>
            </div>
            
            <div v-if="conditionRulesArray.length === 0" class="text-xs text-muted-foreground text-center py-4 border border-dashed rounded bg-muted/10">
              暂无条件规则，点击上方按钮添加
            </div>
            
            <div v-else class="space-y-2">
              <div
                v-for="(rule, ruleIndex) in conditionRulesArray"
                :key="ruleIndex"
                class="p-3 border rounded-lg bg-background/50 relative group"
              >
                <AButton
                  type="text"
                  status="danger"
                  size="mini"
                  class="!absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  @click="removeConditionRule(ruleIndex)"
                >
                  <Trash2 class="w-3 h-3" />
                </AButton>
                
                <div class="text-xs text-muted-foreground mb-2">条件 {{ ruleIndex + 1 }}</div>
                
                <div class="grid grid-cols-4 gap-2">
                  <!-- 源列选择 -->
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">检查列</label>
                    <ASelect 
                      v-model="rule.sourceColumn" 
                      size="small" 
                      class="w-full"
                      placeholder="选择列"
                      allow-search
                    >
                      <AOption 
                        v-for="col in availableColumns" 
                        :key="col.key" 
                        :value="col.key"
                      >
                        {{ col.label }} ({{ col.key }})
                      </AOption>
                    </ASelect>
                  </div>
                  
                  <!-- 运算符选择 -->
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">运算符</label>
                    <ASelect v-model="rule.operator" size="small" class="w-full">
                      <AOption 
                        v-for="op in operatorOptions" 
                        :key="op.value" 
                        :value="op.value"
                      >
                        {{ op.label }}
                      </AOption>
                    </ASelect>
                  </div>
                  
                  <!-- 比较值 -->
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">比较值</label>
                    <AInput 
                      v-model="rule.compareValue" 
                      size="small" 
                      class="w-full" 
                      placeholder="如: 80"
                    />
                  </div>
                  
                  <!-- 显示值 -->
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">显示值</label>
                    <AInput 
                      v-model="rule.displayValue" 
                      size="small" 
                      class="w-full" 
                      placeholder="如: 优秀"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div class="text-xs text-muted-foreground mt-2">
              提示: 条件按顺序匹配，第一个满足的条件生效。建议把更严格的条件放在前面。
            </div>
          </div>
        </div>
      </div>

      <!-- 按钮组配置 -->
      <div v-if="formState.type === 'text-button'" class="space-y-2 animate-in fade-in slide-in-from-top-1">
         <label class="text-sm font-medium block">
          按钮列表 (包含的 Action Key) <span class="text-xs text-muted-foreground font-normal ml-1">逗号分隔</span>
        </label>
        <AInput v-model="formState.buttons" placeholder="edit, delete, view" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium mb-1.5 block">固定方式 (Fixed)</label>
          <ASelect v-model="formState.fixed" class="w-full">
            <AOption value="none">不固定</AOption>
            <AOption value="left">左侧固定</AOption>
            <AOption value="right">右侧固定</AOption>
          </ASelect>
        </div>
         <div>
          <label class="text-sm font-medium mb-1.5 block">对齐方式 (Align)</label>
          <ASelect v-model="formState.align" class="w-full">
            <AOption value="left">左对齐</AOption>
            <AOption value="center">居中</AOption>
            <AOption value="right">右对齐</AOption>
          </ASelect>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
         <div class="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            v-model="formState.ellipsis"
            id="col-ellipsis"
            class="rounded border-input text-primary focus:ring-primary w-4 h-4"
          />
          <label for="col-ellipsis" class="text-sm">内容过长省略 (Ellipsis)</label>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            v-model="formState.tooltip"
            id="col-tooltip"
            class="rounded border-input text-primary focus:ring-primary w-4 h-4"
          />
          <label for="col-tooltip" class="text-sm">显示提示 (Tooltip)</label>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- Action Config Form                         -->
    <!-- ========================================== -->
    <div v-else-if="type === 'action'" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Key</label>
          <AInput v-model="formState.key" placeholder="如 search" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">按钮文本</label>
          <AInput v-model="formState.label" placeholder="如 查询" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">样式</label>
          <ASelect v-model="formState.variant" class="w-full">
            <AOption value="primary">Primary (主要)</AOption>
            <AOption value="outline">Outline (线形)</AOption>
            <AOption value="text">Text (文本)</AOption>
            <AOption value="shadcn-outline">Shadcn Outline (Shadcn 边框)</AOption>
          </ASelect>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">自定义样式类</label>
          <AInput v-model="formState.className" placeholder="可选，如 bg-emerald-50" />
        </div>
      </div>

      <!-- 交互效果配置 -->
      <div class="space-y-4 pt-2 border-t">
        <div class="space-y-2">
          <label class="text-sm font-medium">交互效果</label>
          <ASelect v-model="formState.effectType" class="w-full">
            <AOption value="none">无反应 (默认)</AOption>
            <AOption value="modal">弹窗-表单 (Modal-Form)</AOption>
            <AOption value="table">弹窗-表格 (Modal-Table)</AOption>
          </ASelect>
        </div>

        <!-- 弹窗配置项 -->
        <div v-if="formState.effectType === 'modal'" class="space-y-4 p-3 border rounded-md bg-muted/20 animate-in fade-in slide-in-from-top-1">
          <div class="space-y-2">
            <label class="text-xs font-medium">弹窗标题</label>
            <AInput v-model="formState.effectTitle" placeholder="请输入弹窗标题" />
          </div>
          <div class="space-y-2">
            <label class="text-xs font-medium">弹窗内容</label>
            <ATextarea
              v-model="formState.effectContent"
              :auto-size="{ minRows: 3, maxRows: 6 }"
              placeholder="请输入弹窗展示的详细信息"
            />
          </div>

          <!-- 弹窗表单项配置 -->
          <div class="space-y-3 pt-2 border-t mt-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold flex items-center gap-1">
                <FormInput class="w-3 h-3" />
                弹窗表单项 (可选)
              </label>
              <AButton size="mini" type="outline" @click="addEffectFormItem">
                <template #icon><Plus class="w-3 h-3" /></template>
                添加项
              </AButton>
            </div>

            <div v-if="!formState.effectFormItems || formState.effectFormItems.length === 0" class="text-[10px] text-muted-foreground text-center py-6 border border-dashed rounded bg-muted/5">
              暂无表单项，点击右上方按钮添加
            </div>

            <div v-else class="space-y-3">
              <div 
                v-for="(item, index) in formState.effectFormItems" 
                :key="item.key" 
                class="border rounded-md p-3 bg-muted/30 hover:bg-muted/50 transition-colors space-y-3 relative group"
              >
                <!-- Row 1: Basic Info -->
                <div class="grid grid-cols-[1fr_1fr_90px_32px] gap-2 items-start">
                  <!-- Label -->
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">显示标签</label>
                    <AInput v-model="item.label" size="mini" placeholder="标签" />
                  </div>
                  <!-- Key -->
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">字段 Key</label>
                    <AInput v-model="item.key" size="mini" placeholder="Key" />
                  </div>
                  <!-- Type -->
                  <div class="space-y-1">
                    <label class="text-[10px] text-muted-foreground">类型</label>
                    <ASelect v-model="item.type" size="mini">
                      <AOption value="input">输入框</AOption>
                      <AOption value="select">下拉框</AOption>
                      <AOption value="date-range">日期</AOption>
                      <AOption value="tree-select">树形</AOption>
                    </ASelect>
                  </div>
                  <!-- Delete -->
                  <div class="pt-5 flex justify-end">
                    <AButton type="text" status="danger" size="mini" @click="removeEffectFormItem(index)" class="!px-1">
                      <template #icon><Trash2 class="w-4 h-4" /></template>
                    </AButton>
                  </div>
                </div>

                <!-- Row 2: Placeholder -->
                <div class="space-y-1">
                  <label class="text-[10px] text-muted-foreground">占位提示</label>
                  <AInput v-model="item.placeholder" size="mini" placeholder="请输入..." />
                </div>

                <!-- Row 3: Options (Conditional) -->
                <div v-if="item.type === 'select'" class="space-y-1 pt-2 border-t border-dashed">
                  <label class="text-[10px] text-muted-foreground">选项 (逗号分隔)</label>
                  <ATextarea 
                    :model-value="item.options?.join(',')" 
                    @update:model-value="(v) => item.options = String(v).split(/[，,]/).map(s => s.trim()).filter(Boolean)" 
                    :auto-size="{ minRows: 2, maxRows: 4 }" 
                    class="text-xs"
                    placeholder="例如: 选项A,选项B" 
                  />
                </div>

                <div v-if="item.type === 'tree-select'" class="space-y-1 pt-2 border-t border-dashed">
                  <label class="text-[10px] text-muted-foreground">树形数据 JSON</label>
                  <ATextarea 
                    v-model="item.treeOptions"
                    :auto-size="{ minRows: 3, maxRows: 6 }" 
                    class="text-xs font-mono"
                    placeholder='[{"key":"1","title":"Node"}]' 
                  />
                </div>
              </div>
            </div>
        </div>
      </div>

        <!-- 表格弹窗配置项 -->
        <div v-if="formState.effectType === 'table'" class="space-y-4 p-3 border rounded-md bg-muted/20 animate-in fade-in slide-in-from-top-1">
          <div class="space-y-2">
            <label class="text-xs font-medium">弹窗标题</label>
            <AInput v-model="formState.effectTitle" placeholder="请输入弹窗标题" />
          </div>

          <!-- 关联页面选择 -->
           <div class="space-y-2">
            <label class="text-xs font-medium">关联表格页面</label>
            <ASelect 
              v-if="formState.effectConfig"
              v-model="formState.effectConfig.targetNavId" 
              placeholder="请选择要展示表格的目标页面"
            >
              <AOption v-for="page in availablePages" :key="page.value" :value="page.value">{{ page.label }}</AOption>
            </ASelect>
            <div v-else class="text-red-500 text-xs">配置数据异常，请重新添加此按钮</div>
            <div class="text-[10px] text-muted-foreground">
              * 选择后，弹窗将展示该页面的表格内容作为详情列表
            </div>
          </div>
        </div>
      </div>
      <!-- Preview Section -->
      <div class="space-y-2 pt-2 border-t">
        <label class="text-sm font-medium text-muted-foreground">预览</label>
        <div class="flex items-center gap-3 p-3 rounded-md bg-muted/30">
          <ShadcnButton
            v-if="formState.variant === 'shadcn-outline'"
            variant="outline"
            class="h-9 px-5"
            :class="formState.className"
          >
            {{ formState.label || '按钮文本' }}
          </ShadcnButton>
          <AButton
            v-else
            :type="formState.variant as any"
            :class="formState.className"
          >
            {{ formState.label || '按钮文本' }}
          </AButton>
          <span class="text-xs text-muted-foreground">← 按钮实际样式</span>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- Card Config Form                           -->
    <!-- ========================================== -->
    <div v-else-if="type === 'card'" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Key</label>
          <AInput v-model="formState.key" placeholder="如 total_users" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">标题</label>
          <AInput v-model="formState.title" placeholder="如 总用户数" />
        </div>
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">数据</label>
        <AInput v-model="formState.data" placeholder="如 1,234 或动态值" />
      </div>
    </div>

  </div>
</template>

<style scoped>
.config-form-container {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 4px;
}

/* 自定义滚动条样式，使其更精美 */
.config-form-container::-webkit-scrollbar {
  width: 4px;
}
.config-form-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.config-form-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
