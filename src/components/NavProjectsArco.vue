<script setup lang="ts">
import { computed } from 'vue'
import type { LucideIcon } from "lucide-vue-next"
import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from "lucide-vue-next"
import { useNavigation } from '@/config/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu as AMenu, MenuItem as AMenuItem } from '@arco-design/web-vue'

const props = withDefaults(
  defineProps<{
    label?: string
    showMoreButton?: boolean
    projects: {
      name: string
      url: string
      icon: LucideIcon
    }[]
    showLabel?: boolean
    collapsed?: boolean
  }>(),
  {
    label: 'Projects',
    showMoreButton: true,
    showLabel: true,
    collapsed: false
  }
)

const { currentSubNav, setNavigation, setDetailTitle } = useNavigation()

const handleProjectClick = (projectName: string) => {
  setNavigation(props.label, projectName)
  setDetailTitle(null)
}

const selectedKeys = computed(() => {
  return [currentSubNav.value].filter(Boolean) as string[]
})
</script>

<template>
  <div class="mb-4">
    <div v-if="props.showLabel" class="px-4 mb-2 text-xs font-semibold text-muted-foreground/70">{{ props.label }}</div>
    
    <a-menu
      mode="vertical"
      :collapsed="collapsed"
      :selected-keys="selectedKeys"
      :style="{ width: '100%', border: 'none', backgroundColor: 'transparent' }"
      class="arco-nav-projects"
    >
      <a-menu-item 
        v-for="item in projects" 
        :key="item.name"
        @click="handleProjectClick(item.name)"
      >
        <template #icon>
            <component :is="item.icon" class="w-4 h-4" />
        </template>
        <div class="flex items-center justify-between w-full">
            <span>{{ item.name }}</span>
            
            <!-- Actions Dropdown - Stop propagation to prevent menu selection when clicking action -->
            <div @click.stop v-if="true"> <!-- Always show or show on hover via CSS -->
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <div class="p-1 rounded-sm hover:bg-muted/50 text-muted-foreground transition-colors">
                            <MoreHorizontal class="w-4 h-4 py-0" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-48" align="end">
                        <DropdownMenuItem>
                            <Folder class="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>View Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                             <Forward class="mr-2 h-4 w-4 text-muted-foreground" />
                             <span>Share Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                             <Trash2 class="mr-2 h-4 w-4 text-muted-foreground" />
                             <span>Delete Project</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
      </a-menu-item>

      <a-menu-item v-if="props.showMoreButton" key="more_actions" disabled class="opacity-70">
         <template #icon>
            <MoreHorizontal class="w-4 h-4" />
         </template>
         <span>More</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style scoped>
:deep(.arco-menu-inner) {
    padding: 4px 8px !important;
}

:deep(.arco-menu-item) {
    background-color: transparent;
    line-height: 40px;
    height: 40px;
    margin-bottom: 4px;
    border-radius: 4px;
    color: var(--color-text-2);
}

:deep(.arco-menu-item:hover) {
    background-color: var(--color-fill-2);
    color: var(--color-text-1);
}

:deep(.arco-menu-selected) {
    background-color: var(--color-primary-light-1) !important;
    color: rgb(var(--primary-6)) !important;
    font-weight: 500;
}

:deep(.arco-menu-icon) {
    margin-right: 10px !important;
}
</style>
