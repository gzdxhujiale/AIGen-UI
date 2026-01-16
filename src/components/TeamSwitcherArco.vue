<script setup lang="ts">
import { computed } from "vue"
// import { useConfigStore } from '@/stores/configStore'
import {
  Dropdown,
  Doption,
  Dgroup
} from '@arco-design/web-vue'
import type { TeamItem } from '@/config/sidebar'
import { ChevronsUpDown, Plus } from "lucide-vue-next"

const props = defineProps<{
  teams: TeamItem[]
  modelValue?: TeamItem
}>()

const emit = defineEmits<{
  'update:modelValue': [team: TeamItem]
}>()

const activeTeam = computed(() => props.modelValue ?? props.teams[0])

const handleSelect = (value: any) => {
    if (value === 'add_team') return 
    const team = props.teams.find(t => t.name === value)
    if (team) {
        emit('update:modelValue', team)
    }
}
</script>

<template>
  <div class="px-2 py-2">
      <Dropdown @select="handleSelect" trigger="click" position="br">
        <div class="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-fill-2)] cursor-pointer transition-colors border border-transparent hover:border-[var(--color-border-2)]">
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-[rgb(var(--primary-6))] text-white">
                <component :is="activeTeam?.logo" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium text-[var(--color-text-1)]">
                {{ activeTeam?.name }}
                </span>
                <span class="truncate text-xs text-[var(--color-text-3)]">{{ activeTeam?.plan }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4 text-[var(--color-text-3)]" />
        </div>
        <template #content>
            <Dgroup title="Teams">
                <Doption 
                    v-for="team in teams" 
                    :key="team.name" 
                    :value="team.name"
                >
                    <template #icon>
                        <component :is="team.logo" class="size-3.5" />
                    </template>
                    {{ team.name }}
                </Doption>
            </Dgroup>
            <!-- Divider is implicit in Arco if groups used, otherwise manually handling -->
            <Doption value="add_team">
                <template #icon><Plus class="size-3.5" /></template>
                Add team
            </Doption>
        </template>
      </Dropdown>
  </div>
</template>
