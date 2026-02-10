// ============================================
// 导航状态管理 Composable
// ============================================
import { ref, computed } from 'vue'
import type { NavGroup } from '@/types'

// 内部状态
const currentMainNav = ref('')
const currentSubNav = ref('')
const _currentNavId = ref('')
const detailTitle = ref<string | null>(null)
const _navGroupsRef = ref<NavGroup[] | null>(null)
const exceptionType = ref<'403' | '404' | '500' | null>(null)
const detailKey = ref<string | null>(null)
const detailType = ref<string | null>(null)

/**
 * 设置 navGroups 引用（由 configStore 调用）
 */
export function setNavGroupsRef(navGroups: NavGroup[]) {
    _navGroupsRef.value = navGroups
}

/**
 * 查找导航项上下文
 */
function findNavContext(navGroups: NavGroup[], navId: string) {
    for (const group of navGroups) {
        for (const mainItem of group.items) {
            // Check main item itself
            if (mainItem.id === navId) {
                return { mainNav: mainItem.title, subNav: '', navId: mainItem.id }
            }
            // Check sub items
            const subItem = mainItem.items?.find(item => item.id === navId)
            if (subItem) {
                return { mainNav: mainItem.title, subNav: subItem.name, navId: subItem.id }
            }
        }
    }
    return null
}

// 监听浏览器前进/后退
if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
        const params = new URLSearchParams(window.location.search)
        const navId = params.get('nav')
        if (navId && _navGroupsRef.value) {
            const ctx = findNavContext(_navGroupsRef.value, navId)
            if (ctx) {
                currentMainNav.value = ctx.mainNav
                currentSubNav.value = ctx.subNav
                _currentNavId.value = ctx.navId
            }
        }
    })
}



/**
 * 初始化导航状态（在配置加载后调用）
 */
export function initNavigation(navGroups: NavGroup[]) {
    if (!navGroups || navGroups.length === 0) return

    // 1. 优先尝试从 URL 初始化
    const params = new URLSearchParams(window.location.search)
    const urlNavId = params.get('nav')

    if (urlNavId) {
        const ctx = findNavContext(navGroups, urlNavId)
        if (ctx) {
            currentMainNav.value = ctx.mainNav
            currentSubNav.value = ctx.subNav
            _currentNavId.value = ctx.navId
            exceptionType.value = null
            return
        } else {
            // URL ID not found -> 404
            exceptionType.value = '404'
            return
        }
    }

    // 2. 只有在没有 URL 参数或参数无效时，才回退到默认第一个
    if (_currentNavId.value && findNavContext(navGroups, _currentNavId.value)) {
        return // 已经有有效状态，保持不变
    }

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
            currentSubNav.value = firstSubNav.name
            _currentNavId.value = firstSubNav.id
        } else {
            // 如果一级菜单没有子项，则使用一级菜单自己的 ID (V9 通常有子项)
            _currentNavId.value = firstMainNav.id
        }
        exceptionType.value = null

        // 初始化时也同步到 URL（可选，为了统一体验）
        const url = new URL(window.location.href)
        url.searchParams.set('nav', _currentNavId.value)
        window.history.replaceState({}, '', url.toString())
    }
}

/**
 * 导航状态管理 Composable
 */
export function useNavigation() {
    const setNavigation = (mainNav: string, subNav: string, navId?: string) => {
        currentMainNav.value = mainNav
        currentSubNav.value = subNav

        let targetId = navId
        if (!targetId) {
            const navGroups = _navGroupsRef.value || []
            // 简单的反向查找 ID
            for (const group of navGroups) {
                for (const mainItem of group.items) {
                    const subItem = mainItem.items?.find(item => item.name === subNav)
                    if (subItem) {
                        targetId = subItem.id
                        break
                    }
                }
                if (targetId) break
            }
        }

        if (targetId) {
            _currentNavId.value = targetId
            exceptionType.value = null
            // URL Sync
            const url = new URL(window.location.href)
            if (url.searchParams.get('nav') !== targetId) {
                url.searchParams.set('nav', targetId)
                window.history.pushState({}, '', url.toString())
            }
        }
    }

    const setDetailTitle = (title: string | null, key: string | null = null, type: string | null = null) => {
        detailTitle.value = title
        detailKey.value = title ? key : null
        detailType.value = title ? type : null
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

    const SPECIAL_PAGES: Record<string, string> = {
        settings: 'Settings',
        billing: 'Billing',
        profile: 'profile',
    }

    const currentPage = computed(() => {
        if (detailType.value === 'page-form') return 'DynamicFormPage'

        const navId = _currentNavId.value
        if (navId in SPECIAL_PAGES) return SPECIAL_PAGES[navId]

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
        detailKey,
        detailType,
        breadcrumbs,
        currentPage,
        currentTemplate,
        exceptionType, // Export exception state
        setNavigation,
        setDetailTitle,
    }
}
