// ============================================
// 导航状态管理 Composable
// ============================================
import { ref, computed } from 'vue'
import type { NavGroup, NavSubItem } from '@/types'

// 内部状态
const currentMainNav = ref('')
const currentSubNav = ref('')
const _currentNavId = ref('')
const detailTitle = ref<string | null>(null)
const _navGroupsRef = ref<NavGroup[] | null>(null)

/**
 * 设置 navGroups 引用（由 configStore 调用）
 */
export function setNavGroupsRef(navGroups: NavGroup[]) {
    _navGroupsRef.value = navGroups
}

/**
 * 初始化导航状态（在配置加载后调用）
 */
export function initNavigation(navGroups: NavGroup[]) {
    if (!navGroups || navGroups.length === 0) return

    const firstNavGroup = navGroups[0]
    const firstMainNav = firstNavGroup?.items[0]
    const firstSubNav = firstMainNav?.items?.[0]

    if (firstMainNav) {
        currentMainNav.value = firstMainNav.title
        if (firstSubNav) {
            currentSubNav.value = firstSubNav.title
            _currentNavId.value = firstSubNav.id
        }
    }
}

/**
 * 导航状态管理 Composable
 */
export function useNavigation() {
    const setNavigation = (mainNav: string, subNav: string, navId?: string) => {
        currentMainNav.value = mainNav
        currentSubNav.value = subNav
        if (navId) {
            _currentNavId.value = navId
        } else {
            const navGroups = _navGroupsRef.value || []
            for (const group of navGroups) {
                for (const mainItem of group.items) {
                    const subItem = mainItem.items?.find(item => item.title === subNav)
                    if (subItem) {
                        _currentNavId.value = subItem.id
                        return
                    }
                }
            }
        }
    }

    const setDetailTitle = (title: string | null) => {
        detailTitle.value = title
    }

    const breadcrumbs = computed(() => ({
        main: currentMainNav.value,
        sub: currentSubNav.value,
        detail: detailTitle.value,
    }))

    const currentNavId = computed(() => _currentNavId.value)

    const currentTemplate = computed(() => {
        if (_navGroupsRef.value) {
            for (const group of _navGroupsRef.value) {
                for (const mainItem of group.items) {
                    const subItem = mainItem.items?.find((item: NavSubItem) => item.id === _currentNavId.value)
                    if (subItem?.component) {
                        return 'Page1'
                    }
                }
            }
        }
        return undefined
    })

    const currentPage = computed(() => {
        if (_currentNavId.value === 'settings') return 'Settings'
        if (_currentNavId.value === 'billing') return 'Billing'
        if (_currentNavId.value === 'profile') return 'profile'

        if (currentTemplate.value) {
            return currentTemplate.value
        }
        return currentSubNav.value
    })

    return {
        currentMainNav,
        currentSubNav,
        currentNavId,
        detailTitle,
        breadcrumbs,
        currentPage,
        currentTemplate,
        setNavigation,
        setDetailTitle,
    }
}
