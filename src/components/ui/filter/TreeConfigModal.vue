<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  Modal as AModal, Tree as ATree, Button as AButton,
  Input as AInput, Form as AForm, FormItem as AFormItem
} from '@arco-design/web-vue'
import { Plus, Trash2, FolderTree } from 'lucide-vue-next'

const props = defineProps<{
  visible: boolean
  modelValue: string // JSON string
}>()

const emit = defineEmits(['update:visible', 'ok'])

const treeData = ref<any[]>([])
const selectedKeys = ref<string[]>([])
const expandedKeys = ref<string[]>([])

// Parsing JSON safely
watch(() => props.visible, (val) => {
  if (val) {
    try {
      const parsed = JSON.parse(props.modelValue || '[]')
      treeData.value = Array.isArray(parsed) ? parsed : []
    } catch (e) {
      treeData.value = []
    }
    selectedKeys.value = []
    expandedKeys.value = []
  }
}, { immediate: true })

const selectedNode = computed(() => {
  if (!selectedKeys.value.length) return null
  return findNode(treeData.value, selectedKeys.value[0])
})

const findNode = (nodes: any[], key: string): any => {
  for (const node of nodes) {
    if (node.key === key) return node
    if (node.children) {
      const found = findNode(node.children, key)
      if (found) return found
    }
  }
  return null
}

const handleOk = () => {
  emit('ok', JSON.stringify(treeData.value))
  emit('update:visible', false)
}

const handleCancel = () => {
  emit('update:visible', false)
}

// Actions
const addRootNode = () => {
  const newKey = crypto.randomUUID()
  treeData.value.push({
    key: newKey,
    label: '新节点',
    value: newKey,
    children: []
  })
  selectedKeys.value = [newKey]
}

const addChildNode = () => {
  if (!selectedNode.value) return
  const newKey = crypto.randomUUID()
  if (!selectedNode.value.children) selectedNode.value.children = []
  selectedNode.value.children.push({
    key: newKey,
    label: '新子节点',
    value: newKey,
    children: []
  })
  if (!expandedKeys.value.includes(selectedNode.value.key)) {
    expandedKeys.value.push(selectedNode.value.key)
  }
  selectedKeys.value = [newKey]
}

const removeNode = () => {
  if (!selectedKeys.value.length) return
  const key = selectedKeys.value[0]
  
  const remove = (nodes: any[]): boolean => {
    const idx = nodes.findIndex(n => n.key === key)
    if (idx > -1) {
      nodes.splice(idx, 1)
      return true
    }
    for (const node of nodes) {
      if (node.children && remove(node.children)) return true
    }
    return false
  }

  remove(treeData.value)
  selectedKeys.value = []
}

// Form sync
// When selectedNode properties change, we ideally want to sync back to treeData.
// The computed `selectedNode` returns a reference to the object inside `treeData`, so modifying usage of `v-model` on it should work directly.

</script>

<template>
  <AModal
    :visible="visible"
    title="配置树形数据"
    @ok="handleOk"
    @cancel="handleCancel"
    width="600px"
  >
    <div class="flex h-[400px] gap-4">
      <!-- Left: Tree View -->
      <div class="w-1/2 flex flex-col border rounded-md">
        <div class="p-2 border-b bg-gray-50 flex justify-between items-center">
          <span class="text-xs font-bold text-gray-500">结构预览</span>
          <AButton size="mini" type="primary" @click="addRootNode">
            <template #icon><Plus /></template>
            添加根节点
          </AButton>
        </div>
        <div class="flex-1 overflow-auto p-2">
           <ATree
             block-node
             draggable
             :data="treeData"
             v-model:selected-keys="selectedKeys"
             v-model:expanded-keys="expandedKeys"
             :field-names="{ key: 'key', title: 'label', children: 'children' }"
           />
           <div v-if="!treeData.length" class="h-full flex flex-col items-center justify-center text-gray-400">
             <FolderTree class="w-8 h-8 mb-2 opacity-50" />
             <span class="text-xs">暂无数据，请添加根节点</span>
           </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="w-1/2 flex flex-col border rounded-md">
        <div class="p-2 border-b bg-gray-50">
          <span class="text-xs font-bold text-gray-500">节点属性</span>
        </div>
        <div class="flex-1 p-4" v-if="selectedNode">
          <AForm layout="vertical" :model="selectedNode">
            <AFormItem label="显示名称 (Label)">
              <AInput v-model="selectedNode.label" placeholder="如: 电子产品" />
            </AFormItem>
            <AFormItem label="唯一值 (Value)">
              <AInput v-model="selectedNode.value" placeholder="如: electronics" />
            </AFormItem>
            <AFormItem label="Key (唯一标识)">
              <AInput v-model="selectedNode.key" placeholder="自动生成，可修改" />
            </AFormItem>
          </AForm>
          
          <div class="mt-4 pt-4 border-t flex flex-col gap-2">
             <AButton type="outline" long @click="addChildNode">
               <template #icon><Plus /></template>
               添加子节点
             </AButton>
             <AButton type="primary" status="danger" long @click="removeNode">
               <template #icon><Trash2 /></template>
               删除当前节点
             </AButton>
          </div>
        </div>
        <div v-else class="flex-1 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
           <span class="text-xs">请在左侧选择一个节点进行编辑</span>
        </div>
      </div>
    </div>
  </AModal>
</template>

<style scoped>
:deep(.arco-tree-node-title-text) {
  font-size: 13px;
}
</style>
