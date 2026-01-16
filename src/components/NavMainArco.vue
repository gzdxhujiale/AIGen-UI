<script setup lang="ts">
import { computed } from 'vue'
import type { LucideIcon } from "lucide-vue-next"
import { useNavigation } from '@/config/sidebar'
import { Menu as AMenu, MenuItem as AMenuItem, SubMenu as ASubMenu } from '@arco-design/web-vue'

const props = withDefaults(
  defineProps<{
    label?: string
    items: {
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
      isOpen?: boolean
      items?: {
        id: string
        title: string
        url: string
      }[]
    }[]
    showLabel?: boolean
    isOpen?: boolean // Group has open items?
    collapsed?: boolean
  }>(),
  {
    label: 'Platform',
    showLabel: true,
    collapsed: false
  }
)

const { currentSubNav, setNavigation, setDetailTitle } = useNavigation()

// Mapping for selection
const selectedKeys = computed(() => {
  return [currentSubNav.value].filter(Boolean) as string[]
})

const openKeys = computed(() => {
  // If collapsed, don't supply open keys to avoid unwanted expansion behavior
  // although Arco typically handles this by ignoring them in collapsed state.
  return props.items
    .filter(item => item.isOpen || item.isActive || item.items?.some(sub => sub.title === currentSubNav.value))
    .map(item => item.title)
})

const handleItemClick = (mainNav: string, subNav: string, navId?: string) => {
   // For leaf items
   // If it's a sub item
   setNavigation(mainNav, subNav, navId)
   setDetailTitle(null)
}
</script>

<template>
  <div class="mb-4">
    <div v-if="props.showLabel" class="px-4 mb-2 text-xs font-semibold text-muted-foreground/70">{{ props.label }}</div>
    
    <a-menu
      mode="vertical"
      :collapsed="collapsed"
      :selected-keys="selectedKeys"
      :default-open-keys="openKeys"
      :style="{ width: '100%', border: 'none', backgroundColor: 'transparent' }"
      class="arco-nav-menu"
    >
        <template v-for="item in items" :key="item.title">
            <!-- Has Sub Items -->
            <a-sub-menu v-if="item.items && item.items.length > 0" :key="item.title">
                <template #title>
                    <span class="flex items-center gap-2">
                        <component :is="item.icon" v-if="item.icon" class="w-4 h-4" />
                        <span>{{ item.title }}</span>
                    </span>
                </template>
                <a-menu-item 
                    v-for="subItem in item.items" 
                    :key="subItem.title"
                    @click="handleItemClick(item.title, subItem.title, subItem.id)"
                >
                    {{ subItem.title }}
                </a-menu-item>
            </a-sub-menu>

            <!-- No Sub Items -->
            <a-menu-item v-else :key="'leaf-' + item.title" @click="handleItemClick(props.label, item.title, '')">
                <template #icon>
                    <component :is="item.icon" v-if="item.icon" class="w-4 h-4" />
                </template>
                {{ item.title }}
            </a-menu-item>
        </template>
    </a-menu>
  </div>
</template>

<style scoped>
:deep(.arco-menu-inner) {
    padding: 4px 8px !important;
}

:deep(.arco-menu-item), :deep(.arco-menu-inline-header) {
    background-color: transparent;
    line-height: 40px;
    height: 40px;
    margin-bottom: 4px;
    border-radius: 4px;
    color: var(--color-text-2);
    font-size: 14px;
}

:deep(.arco-menu-item:hover), :deep(.arco-menu-inline-header:hover) {
    background-color: var(--color-fill-2); 
    color: var(--color-text-1);
}

:deep(.arco-menu-selected) {
    background-color: var(--color-primary-light-1) !important;
    color: rgb(var(--primary-6)) !important;
    font-weight: 500;
}

:deep(.arco-menu-selected:hover) {
    background-color: var(--color-primary-light-1) !important;
}

:deep(.arco-menu-icon) {
    margin-right: 10px !important;
    font-size: 16px; 
    /* color: var(--color-text-3); */ 
}

:deep(.arco-menu-selected .arco-menu-icon) {
    color: rgb(var(--primary-6)); 
}
</style>
