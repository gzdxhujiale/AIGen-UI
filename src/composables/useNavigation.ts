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

    // 找到第一个可见的一级导航
    let firstMainNav: any = null
    let firstSubNav: any = null

    for (const group of navGroups) {
        firstMainNav = group.items.find(item => item.visible !== false)
        if (firstMainNav) {
            firstSubNav = firstMainNav.items?.[0]
            break
        }
    }

    if (firstMainNav) {
        currentMainNav.value = firstMainNav.title
        if (firstSubNav) {
            currentSubNav.value = firstSubNav.title
            _currentNavId.value = firstSubNav.id
        } else {
            // 如果一级菜单没有子项，则使用一级菜单自己的 ID (V9 通常有子项)
            _currentNavId.value = firstMainNav.id
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
        const navId = _currentNavId.value
        if (!navId) return undefined

        // 回退到导航树中查找显式指定的 template
        if (_navGroupsRef.value) {
            for (const group of _navGroupsRef.value) {
                // Flatten items search
                const allSubItems = group.items.flatMap(m => m.items || [])
                const subItem = allSubItems.find(item => item.id === navId)

                if (subItem) {
                    if (subItem.template) return subItem.template
                    // 只要有 component 配置，或者它是 AI 生成的（通常带有 component），就应该渲染 Page1
                    if (subItem.component) return 'Page1'

                    // 兜底：如果它是一个标准的导航项且没有指定特殊模板，默认也应该视作 Page1
                    // 除非它是 settings/profile 等特殊页面
                    return 'Page1'
                }
            }
        }
        return undefined
    })

    const currentPage = computed(() => {
        const navId = _currentNavId.value
        if (navId === 'settings') return 'Settings'
        if (navId === 'billing') return 'Billing'
        if (navId === 'profile') return 'profile'

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
