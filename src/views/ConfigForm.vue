<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  Input as AInput, Select as ASelect, Option as AOption,
  Textarea as ATextarea, Button as AButton, InputNumber as AInputNumber,
  InputTag as AInputTag
} from '@arco-design/web-vue'
import { Button as ShadcnButton } from '@/components/ui/button'
import { FormInput, Plus, Trash2 } from 'lucide-vue-next'
import { useConfigPageStore } from '@/stores/config_page_Store'

const props = defineProps<{
  type: 'filter' | 'column' | 'action' | 'card'
  modelValue: any
  availableColumns?: Array<{ key: string; label: string }>
}>()

const emit = defineEmits(['update:modelValue'])
const configPageStore = useConfigPageStore()
const formState = ref<any>({ ...props.modelValue })

// ----------------------------------------------------------------------
// 1. Data-Driven Schemas (配置化表单定义)
// ----------------------------------------------------------------------
const formSchemas = computed(() => ({
  filter: [
    { key: 'key', label: '字段名 (Key)', comp: 'input', props: { placeholder: '如: keyword' } },
    { key: 'label', label: '显示标签 (Label)', comp: 'input', props: { placeholder: '如: 关键词' } },
    { key: 'type', label: '类型 (Type)', comp: 'select', props: { options: [{value:'input',label:'输入框'},{value:'select',label:'下拉框'},{value:'date-range',label:'日期范围'},{value:'date',label:'单点日期'},{value:'tree-select',label:'树形选择'},{value:'radio',label:'单选框'},{value:'checkbox',label:'复选框'}] } },
    { key: 'precision', label: '时间精度', comp: 'select', showIf: (s:any) => ['date', 'date-range'].includes(s.type), props: { options: [{value:'year',label:'年'},{value:'month',label:'月'},{value:'date',label:'日'},{value:'hour',label:'时'},{value:'minute',label:'分'},{value:'second',label:'秒'}], placeholder: '默认:日' } },
    { key: 'placeholder', label: '占位文字', comp: 'input', props: { placeholder: '请输入...' } },
    { key: 'multiple', label: '启用多选', comp: 'checkbox', showIf: (s:any) => s.type === 'select' },
    { key: 'disabled', label: '禁用', comp: 'checkbox' },
    { key: 'options', label: '选项列表', comp: 'input-tag', showIf: (s:any) => ['select', 'radio', 'checkbox'].includes(s.type), props: { readonly: false, placeholder: '输入后回车添加' } },
    { key: 'treeOptions', label: '树形数据 JSON', comp: 'textarea', showIf: (s:any) => s.type === 'tree-select', props: { placeholder: '[{"key":"1",...}]', class: 'font-mono text-xs' } }
  ],
  column: [
    { key: 'key', label: '字段名 (Key)', comp: 'input', props: { placeholder: '如: user_name' } },
    { key: 'label', label: '显示标签', comp: 'input', props: { placeholder: '如: 用户名' } },
    { key: 'width', label: '宽度', comp: 'input', props: { placeholder: '如: 120px' } },
    { key: 'type', label: '类型', comp: 'select', props: { options: [{value:'text',label:'普通文本'},{value:'badge',label:'徽标'},{value:'status-badge',label:'状态点'},{value:'text-button',label:'文字按钮组'}] } },
    { key: 'buttons', label: '按钮Action Key', comp: 'input-tag', showIf: (s:any) => s.type === 'text-button' },
    { key: 'fixed', label: '固定方式', comp: 'select', props: { options: [{value:'none',label:'不固定'},{value:'left',label:'左侧固定'},{value:'right',label:'右侧固定'}] } },
    { key: 'align', label: '对齐方式', comp: 'select', props: { options: [{value:'left',label:'左对齐'},{value:'center',label:'居中'},{value:'right',label:'右对齐'}] } },
    { key: 'ellipsis', label: '内容过长省略', comp: 'checkbox' },
    { key: 'tooltip', label: '显示提示', comp: 'checkbox' }
  ],
  action: [
    { key: 'key', label: 'Key', comp: 'input', props: { placeholder: '如 search' } },
    { key: 'label', label: '按钮文本', comp: 'input', props: { placeholder: '如 查询' } },
    { key: 'variant', label: '样式', comp: 'select', props: { options: [{value:'primary',label:'Primary'},{value:'outline',label:'Outline'},{value:'text',label:'Text'},{value:'shadcn-outline',label:'Shadcn Outline'}] } },
    { key: 'className', label: '自定义样式类', comp: 'input', props: { placeholder: '可选，如 bg-emerald-50' } },
    { key: 'effectType', label: '交互效果', comp: 'select', props: { options: [{value:'none',label:'无反应'},{value:'modal',label:'弹窗-表单'},{value:'page-form',label:'新页面-表单'},{value:'table',label:'弹窗-表格'},{value:'drawer',label:'抽屉-表格'}] }, fullWidth: true },
    // Modal-specific fields defined separately in template for complexity
  ],
  card: [
    { key: 'key', label: 'Key', comp: 'input', props: { placeholder: 'total_users' } },
    { key: 'title', label: '标题', comp: 'input', props: { placeholder: '总用户数' } },
    { key: 'data', label: '数据', comp: 'input', props: { placeholder: '1,234' }, fullWidth: true }
  ]
}))

const resolveComp = (type: string) => {
  const map: any = { input: AInput, select: ASelect, textarea: ATextarea, checkbox: 'input', 'input-tag': AInputTag }
  return map[type] || AInput
}

// ----------------------------------------------------------------------
// 2. Logic Simplification (逻辑简化)
// ----------------------------------------------------------------------
// 自动代理 JSON 字段 (Condition Rules)
const conditionRulesProxy = computed({
  get: (): any[] => {
    try { return JSON.parse(formState.value.conditionRules || '[]') } catch { return [] }
  },
  set: (val) => formState.value.conditionRules = JSON.stringify(val)
})

// 监听状态同步
watch(() => props.modelValue, (v) => { if(JSON.stringify(v)!==JSON.stringify(formState.value)) formState.value = JSON.parse(JSON.stringify(v)) }, { deep: true })
watch(formState, (v) => emit('update:modelValue', v), { deep: true })

// 辅助数据
const availablePages = computed(() => {
  const pages: { value: string; label: string }[] = []
  configPageStore.navGroups.forEach((g: any) => g.items.forEach((m: any) => m.items?.forEach((s: any) => pages.push({ value: s.id, label: s.name }))))
  return pages
})

const operatorOptions = [
  { value: '==', label: '等于' }, { value: '!=', label: '不等于' }, { value: '>', label: '大于' },
  { value: '<', label: '小于' }, { value: '>=', label: '大于等于' }, { value: '<=', label: '小于等于' }, { value: 'contains', label: '包含' }
]

// Modal/Table Effect Logic
watch(() => formState.value.effectType, (type) => {
  if ((['modal', 'table', 'drawer', 'page-form'].includes(type)) && !formState.value.effectConfig) formState.value.effectConfig = {}
})

const addCondition = () => conditionRulesProxy.value = [...conditionRulesProxy.value, { sourceColumn: '', operator: '==', compareValue: '', displayValue: '' }]
const removeCondition = (idx: number) => { const arr=[...conditionRulesProxy.value]; arr.splice(idx,1); conditionRulesProxy.value=arr }

const addEffectItem = () => {
  if(!formState.value.effectFormItems) formState.value.effectFormItems = []
  formState.value.effectFormItems.push({ key: `f_${Date.now().toString(36)}`, label: '新字段', type: 'input', placeholder: '', defaultValue: '' })
}
</script>

<template>
  <div class="config-form-container space-y-4">
    <!-- 1. 通用动态表单渲染 -->
    <div class="grid grid-cols-2 gap-4">
      <template v-for="field in (formSchemas[type] as any[])" :key="field.key">
        <div v-if="!field.showIf || field.showIf(formState)" :class="field.fullWidth ? 'col-span-2' : ''">
          <div v-if="field.comp === 'checkbox'" class="flex items-center gap-2 pt-6">
             <input type="checkbox" v-model="formState[field.key]" class="rounded border-input text-primary focus:ring-primary w-4 h-4" :id="field.key"/>
             <label :for="field.key" class="text-sm cursor-pointer">{{ field.label }}</label>
          </div>
          <div v-else>
            <label class="text-sm font-medium mb-1.5 block">{{ field.label }}</label>
            <ASelect v-if="field.comp === 'select'" v-model="formState[field.key]" v-bind="field.props" class="w-full" />
            <component v-else :is="resolveComp(field.comp)" v-model="formState[field.key]" v-bind="field.props" class="w-full" />
          </div>
        </div>
      </template>
    </div>

    <!-- 2. Column 特殊配置: Mock Data -->
    <div v-if="type === 'column'" class="p-3 border rounded-md bg-muted/20 space-y-3">
       <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">Mock 格式</label>
            <ASelect v-model="formState.mockFormat" class="w-full" placeholder="选择规则">
               <AOption v-for="o in ['none', 'text', 'datetime', 'number', 'random-number', 'list', 'list-order', 'conditional']" :key="o" :value="o">{{ o === 'number' ? '序号' : o === 'random-number' ? '随机数字' : o }}</AOption>
            </ASelect>
          </div>
          <div v-if="formState.mockFormat === 'random-number'">
             <label class="text-sm font-medium mb-1.5 block">位数</label>
             <AInputNumber v-model="formState.mockDigits" :min="1" :max="10" :default-value="5" class="w-full" />
          </div>
          <div v-if="['list','list-order'].includes(formState.mockFormat)">
              <label class="text-sm font-medium mb-1.5 block">列表值</label>
              <AInputTag v-model="formState.mockList" placeholder="输入后回车添加" />
           </div>
          <!-- 条件格式 (Condition Rules) -->
          <div v-if="formState.mockFormat === 'conditional'" class="col-span-2">
             <div class="flex justify-between items-center mb-2"><label class="text-sm font-medium">条件规则</label><AButton size="mini" type="outline" @click="addCondition"><Plus class="w-3 h-3"/> 添加</AButton></div>
             <div class="space-y-2">
               <div v-for="(rule, idx) in conditionRulesProxy" :key="idx" class="p-2 border rounded bg-background/50 relative group grid grid-cols-4 gap-2">
                  <ASelect v-model="rule.sourceColumn" size="small" placeholder="列" allow-search><AOption v-for="c in availableColumns" :key="c.key" :value="c.key">{{c.label}}</AOption></ASelect>
                  <ASelect v-model="rule.operator" size="small"><AOption v-for="o in operatorOptions" :key="o.value" :value="o.value">{{o.label}}</AOption></ASelect>
                  <AInput v-model="rule.compareValue" size="small" placeholder="比较值" />
                  <AInput v-model="rule.displayValue" size="small" placeholder="显示值" />
                  <Trash2 class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-100 text-red-500 rounded-full p-0.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" @click="removeCondition(idx)" />
               </div>
             </div>
          </div>
       </div>
    </div>

    <!-- 3. Action 特殊配置: Modal/Table Config -->
    <div v-if="type === 'action' && formState.effectType !== 'none'" class="p-3 border rounded-md bg-muted/20 space-y-3 animate-in fade-in">
       <div><label class="text-xs font-medium">弹窗标题</label><AInput v-model="formState.effectTitle" /></div>
       
       <!-- Modal-Form -->
       <template v-if="['modal', 'page-form'].includes(formState.effectType)">
          <div><label class="text-xs font-medium">内容描述</label><ATextarea v-model="formState.effectContent" :auto-size="{minRows:2}" /></div>
          <div class="pt-2 border-t">
            <div class="flex justify-between items-center mb-2"><label class="text-xs font-bold flex gap-1"><FormInput class="w-3" /> 表单项</label><AButton size="mini" type="outline" @click="addEffectItem"><Plus class="w-3"/> 添加</AButton></div>
            <div class="space-y-2">
              <div v-for="(item, idx) in formState.effectFormItems" :key="item.key" class="p-2 border rounded bg-muted/30 relative group grid grid-cols-3 gap-2">
                 <AInput v-model="item.label" size="mini" placeholder="标签" />
                 <AInput v-model="item.key" size="mini" placeholder="Key" />
                 <ASelect v-model="item.type" size="mini"><AOption value="input">Input</AOption><AOption value="textarea">Textarea</AOption><AOption value="select">Select</AOption><AOption value="tree-select">Tree</AOption><AOption value="date-range">Date Range</AOption><AOption value="date">Date</AOption><AOption value="radio">Radio</AOption><AOption value="checkbox">Checkbox</AOption></ASelect>
                 <div v-if="item.type === 'select'" class="col-span-3 flex items-center gap-1.5 px-0.5">
                    <input type="checkbox" v-model="item.multiple" class="w-3 h-3 rounded" :id="'mult-' + item.key"/>
                    <label :for="'mult-' + item.key" class="text-[10px] text-muted-foreground whitespace-nowrap cursor-pointer">启用多选</label>
                 </div>
                 <AInputTag v-if="['select', 'radio', 'checkbox'].includes(item.type)" v-model="item.options" placeholder="输入后回车" class="col-span-3" />
                 <ASelect v-if="['date', 'date-range'].includes(item.type)" v-model="item.precision" size="mini" placeholder="时间精度" class="col-span-3">
                    <AOption value="year">年</AOption><AOption value="month">月</AOption><AOption value="date">日</AOption>
                    <AOption value="hour">时</AOption><AOption value="minute">分</AOption><AOption value="second">秒</AOption>
                 </ASelect>
                 <ATextarea v-if="item.type==='tree-select'" v-model="item.treeOptions" placeholder='[{"value":"1","label":"A"}]' class="col-span-3 text-[10px] font-mono" :auto-size="{minRows:1,maxRows:3}"/>
                 <Trash2 class="absolute top-1 right-1 w-3 h-3 text-red-400 cursor-pointer opacity-0 group-hover:opacity-100" @click="formState.effectFormItems.splice(idx,1)" />
              </div>
            </div>
          </div>
       </template>

       <!-- Modal-Table / Drawer-Table -->
       <div v-else-if="['table', 'drawer'].includes(formState.effectType)">
          <label class="text-xs font-medium">关联表格页面</label>
          <ASelect v-if="formState.effectConfig" v-model="formState.effectConfig.targetNavId" placeholder="选择目标页面"><AOption v-for="p in availablePages" :key="p.value" :value="p.value">{{ p.label }}</AOption></ASelect>
       </div>
    </div>
    
    <!-- Preview -->
    <div v-if="type === 'action'" class="pt-2 border-t flex items-center gap-3">
       <span class="text-xs text-muted-foreground mr-auto">预览:</span>
       <ShadcnButton v-if="formState.variant==='shadcn-outline'" variant="outline" class="h-8 text-xs" :class="formState.className">{{ formState.label||'按钮' }}</ShadcnButton>
       <AButton v-else :type="formState.variant" size="small" :class="formState.className">{{ formState.label||'按钮' }}</AButton>
    </div>
  </div>
</template>

<style scoped>
.config-form-container { max-height: 70vh; overflow-y: auto; padding-right: 4px; }
.config-form-container::-webkit-scrollbar { width: 4px; }
.config-form-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
</style>
