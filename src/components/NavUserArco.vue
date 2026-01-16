<script setup lang="ts">
import {
  Dropdown,
  Doption,
  Dgroup,
  Avatar
} from '@arco-design/web-vue'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'
import { useNavigation } from '@/config/sidebar'
// import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { setNavigation, setDetailTitle } = useNavigation()
// const router = useRouter() // Use router if needed, though most actions here are store based

const handleSelect = async (value: any) => {
    switch (value) {
        case 'logout':
            await authStore.signOut()
            break
        case 'profile':
            setNavigation('账户', '个人资料', 'profile')
            setDetailTitle(null)
            break
        case 'settings':
        case 'upgrade': // Map upgrade to settings as in Shadcn
            setNavigation('系统', '配置设置', 'settings')
            setDetailTitle(null)
            break
        case 'billing':
            setNavigation('Account', 'Billing', 'billing')
            setDetailTitle(null)
            break
        case 'notifications':
             // Placeholder or toast
            break
    }
}
</script>

<template>
  <div class="p-2 border-t border-[var(--color-border-2)]">
      <Dropdown @select="handleSelect" trigger="click" position="top">
        <div class="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-fill-2)] cursor-pointer transition-colors">
            <Avatar :size="32" class="bg-[var(--color-fill-3)]">
                <img v-if="authStore.userAvatar" :src="authStore.userAvatar" :alt="authStore.userDisplayName" />
                <span v-else>{{ authStore.userDisplayName.slice(0, 2).toUpperCase() }}</span>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold text-[var(--color-text-1)]">{{ authStore.userDisplayName }}</span>
                <span class="truncate text-xs text-[var(--color-text-3)]">{{ authStore.userEmail }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4 text-[var(--color-text-3)]" />
        </div>
        <template #content>
            <Dgroup title="Account">
                <Doption value="upgrade">
                    <template #icon><Sparkles /></template>
                    Upgrade to Pro
                </Doption>
            </Dgroup>
            <Dgroup>
                <Doption value="profile">
                    <template #icon><BadgeCheck /></template>
                    Account
                </Doption>
                <Doption value="billing">
                    <template #icon><CreditCard /></template>
                    Billing
                </Doption>
                <Doption value="notifications">
                    <template #icon><Bell /></template>
                    Notifications
                </Doption>
            </Dgroup>
            <Dgroup>
                <Doption value="logout">
                    <template #icon><LogOut /></template>
                    Log out
                </Doption>
            </Dgroup>
        </template>
      </Dropdown>
  </div>
</template>
