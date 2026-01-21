# 配置架构重构方案

> 创建时间：2026-01-21
> 目标：实现配置文件结构原子化，配置数据纯粹化

---

## 一、现状问题分析

### 1.1 `src/config/schema.ts` 职责过重 (501 行)

**当前承载内容：**

| 职责类别 | 行范围 | 内容描述 |
|---------|--------|---------|
| 类型定义 | L18-228 | TreeNode, FilterConfig, TableColumn, NavMainItem 等 18+ 接口 |
| 常量定义 | L234-238 | COMMON_OPTIONS 公共选项 |
| Vue 组件 | L241-245 | AIGenLogo 渲染函数组件 |
| 默认配置 | L251-311 | defaultSidebarConfig 默认数据 |
| 工厂函数 | L320-382 | mergeSidebarConfig, createNavItem, createNavGroup 等 |
| 状态管理 | L388-393 | currentMainNav, currentSubNav 等响应式状态 |
| Composable | L423-494 | useNavigation() 导航状态管理 |
| 全局变量 | L500-501 | page1Configs 配置存储 |

**问题：** 类型定义、默认数据、运行时状态、业务逻辑混在一起，违反单一职责原则。

---

### 1.2 `src/stores/configStore.ts` 存储机制脆弱 (1308 行)

**脆弱代码示例（L515-568）：**

```typescript
// 辅助函数：查找匹配的括号
function findBalancedBlock(text: string, startIndex: number) { ... }

// 辅助函数：根据 ID 查找对象块
function findObjectBlockById(text: string, id: string) { ... }
```

**syncSidebarConfig()（L572-697）问题：**
- 使用正则表达式匹配代码块：`/(title:\s*['"])(.*?)(['"'])/`
- 通过字符串操作修改源码文件
- JSON 字段变长后易出错（括号匹配失败、引号转义问题）
- 开发环境专用，生产环境不可用

**当前 Supabase 存储结构（旧版）：**
```sql
user_configs (
    user_id uuid PRIMARY KEY,
    config_data jsonb,  -- 存储完整的大 JSON
    updated_at timestamp
)
```

---

### 1.3 新 Supabase 表结构

用户已变更表结构，需要适配：

```sql
user_configs (
    category   text,     -- 数据类型: navigation | page | app_settings | team
    resource_id text,    -- 唯一标识: nav-main | page-xxx | top-bar | team-list
    content    jsonb,    -- 纯数据 JSON
    PRIMARY KEY (user_id, category, resource_id)
)
```

---

## 二、重构目标

| 目标 | 描述 |
|------|------|
| 🎯 文件结构原子化 | 按职责拆分 schema.ts 为多个独立文件 |
| 🎯 配置数据纯粹化 | 剥离类型定义中的逻辑代码和运行时状态 |
| 🎯 存储机制健壮化 | 废弃正则表达式修改源码，全面使用 Supabase 分类存储 |
| 🎯 类型安全增强 | 提供更好的 TypeScript 类型推导和校验 |

---

## 三、重构方案

### 3.1 新文件结构

```
src/
├── types/                          # 🆕 纯类型定义
│   ├── index.ts                    # 统一导出
│   ├── navigation.ts               # 导航相关类型
│   ├── page-config.ts              # 页面配置类型
│   └── common.ts                   # 公共类型
│
├── config/
│   ├── constants.ts                # 🆕 常量定义 (COMMON_OPTIONS)
│   ├── defaults/                   # 🆕 默认配置数据
│   │   ├── index.ts
│   │   ├── sidebar.default.ts      # defaultSidebarConfig
│   │   └── page.default.ts         # 页面默认配置模板
│   ├── schema.ts                   # ⚠️ 保留但精简：仅保留辅助工厂函数
│   └── page1.ts                    # 可删除或归档
│
├── composables/                    # 🆕 Composable 函数
│   └── useNavigation.ts            # 从 schema.ts 提取的导航状态管理
│
├── stores/
│   ├── configStore.ts              # ⚠️ 重构：移除源码修改逻辑
│   └── services/                   # 🆕 服务层
│       ├── supabase-config.service.ts  # Supabase 分类存储服务
│       └── config-migration.service.ts # 配置迁移服务
│
└── components/
    └── AIGenLogo.vue               # 🆕 从 schema.ts 提取的 Logo 组件
```

---

### 3.2 详细文件拆分

#### 3.2.1 `src/types/navigation.ts`

```typescript
// ============================================
// 导航相关类型定义
// ============================================
import type { LucideIcon } from 'lucide-vue-next'
import type { Page1Config } from './page-config'

export interface NavSubItem {
    id: string
    title: string
    url: string
    badge?: string
    template?: 'Page1' | 'Page2' | ''
    component?: Page1Config
}

export interface NavMainItem {
    id: string
    title: string
    url: string
    icon?: LucideIcon | string
    isOpen?: boolean
    items?: NavSubItem[]
}

export interface NavGroup {
    id?: string
    label: string
    showLabel?: boolean
    items: NavMainItem[]
}

export interface ProjectItem {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

export interface ProjectGroup {
    id?: string
    label: string
    showLabel?: boolean
    projects: ProjectItem[]
    showMoreButton?: boolean
}

export interface TeamPermissions {
    navMain: 'all' | string[]
    projects: 'all' | string[]
    navItems?: Record<string, string[]>
}

export interface TeamItem {
    name: string
    logo: LucideIcon
    plan: string
    permissions: TeamPermissions
}

export interface UserInfo {
    name: string
    email: string
    avatar: string
}

export interface SidebarConfig {
    user: UserInfo
    teams: TeamItem[]
    navGroups: NavGroup[]
    projectGroups: ProjectGroup[]
}
```

#### 3.2.2 `src/types/page-config.ts`

```typescript
// ============================================
// 页面配置相关类型定义
// ============================================

export interface TreeNode {
    value: string
    label: string
    children?: TreeNode[]
}

export interface FilterConfig {
    key: string
    type: 'input' | 'select' | 'date-range' | 'tree-select'
    label: string
    placeholder?: string
    options?: string[]
    treeOptions?: TreeNode[]
    defaultValue?: string | any | undefined
    visible?: boolean
}

export interface FilterAreaConfig {
    show?: boolean
    columns: number
    gap: string
    filters: FilterConfig[]
}

export interface CardItemConfig {
    key: string
    title: string
    data: string | number
}

export interface CardAreaConfig {
    show: boolean
    columns: number
    gap: string
    cardHeight?: string
    cardWidth?: string
    cards: CardItemConfig[]
}

export interface TableColumn {
    key: string
    label: string
    width?: string
    minWidth?: string
    type?: 'text' | 'badge' | 'status-badge' | 'text-button'
    fixed?: 'left' | 'right'
    align?: 'left' | 'center' | 'right'
    ellipsis?: boolean
    tooltip?: boolean
    visible?: boolean
    mockFormat?: 'text' | 'datetime' | 'number' | 'list'
    mockList?: string[]
    buttons?: string[]
}

export interface TableAreaConfig {
    show?: boolean
    height?: string
    scrollX?: boolean
    scrollY?: boolean
    stickyHeader?: boolean
    showCheckbox?: boolean
    fixedLayout?: boolean
    pageSize?: number
    columns: TableColumn[]
}

export interface ActionButtonConfig {
    key: string
    label: string
    variant?: 'primary' | 'outline' | 'text' | 'shadcn-outline'
    className?: string
    visible?: boolean
    effectType?: 'none' | 'modal'
    effectConfig?: {
        title?: string
        content?: string
        formItems?: FilterConfig[]
    }
}

export interface ActionsAreaConfig {
    show?: boolean
    buttons: ActionButtonConfig[]
}

export interface Page1Config {
    topBar?: {
        appOptions?: string[]
        langOptions?: string[]
    }
    filterArea: FilterAreaConfig
    actionsArea?: ActionsAreaConfig
    cardArea?: CardAreaConfig
    tableArea: TableAreaConfig
    mockData: () => any[]
}

// 不含 mockData 的配置类型（用于序列化）
export type Page1ConfigData = Omit<Page1Config, 'mockData'>
```

#### 3.2.3 `src/stores/services/supabase-config.service.ts`

```typescript
// ============================================
// Supabase 分类配置存储服务
// ============================================
import { supabase } from '@/lib/supabase'
import type { NavGroup, TeamItem } from '@/types/navigation'
import type { Page1ConfigData } from '@/types/page-config'

// 配置类别枚举
export type ConfigCategory = 'navigation' | 'page' | 'app_settings' | 'team'

// 资源标识符
export type ResourceId = 
    | 'nav-main'           // 主导航配置
    | `page-${string}`     // 页面配置 (page-xxx)
    | 'top-bar'            // 顶部栏设置
    | 'team-list'          // 团队列表
    | 'user-preferences'   // 用户偏好设置

interface ConfigRecord {
    category: ConfigCategory
    resource_id: ResourceId
    content: any
}

export class SupabaseConfigService {
    
    private userId: string | null = null

    /**
     * 初始化服务，获取当前用户 ID
     */
    async init(): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            this.userId = user.id
            return true
        }
        return false
    }

    /**
     * 保存单个配置项
     */
    async saveConfig(
        category: ConfigCategory,
        resourceId: ResourceId,
        content: any
    ): Promise<{ success: boolean; error?: string }> {
        if (!this.userId) {
            return { success: false, error: '用户未登录' }
        }

        const { error } = await supabase
            .from('user_configs')
            .upsert({
                user_id: this.userId,
                category,
                resource_id: resourceId,
                content,
                updated_at: new Date().toISOString()
            }, { 
                onConflict: 'user_id,category,resource_id' 
            })

        if (error) {
            console.error('保存配置失败:', error)
            return { success: false, error: error.message }
        }
        
        return { success: true }
    }

    /**
     * 加载单个配置项
     */
    async loadConfig<T = any>(
        category: ConfigCategory,
        resourceId: ResourceId
    ): Promise<{ data: T | null; error?: string }> {
        if (!this.userId) {
            return { data: null, error: '用户未登录' }
        }

        const { data, error } = await supabase
            .from('user_configs')
            .select('content')
            .eq('user_id', this.userId)
            .eq('category', category)
            .eq('resource_id', resourceId)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return { data: null } // 记录不存在
            }
            return { data: null, error: error.message }
        }

        return { data: data?.content as T }
    }

    /**
     * 加载某个类别下的所有配置
     */
    async loadCategoryConfigs<T = any>(
        category: ConfigCategory
    ): Promise<{ data: Record<string, T>; error?: string }> {
        if (!this.userId) {
            return { data: {}, error: '用户未登录' }
        }

        const { data, error } = await supabase
            .from('user_configs')
            .select('resource_id, content')
            .eq('user_id', this.userId)
            .eq('category', category)

        if (error) {
            return { data: {}, error: error.message }
        }

        const result: Record<string, T> = {}
        for (const row of data || []) {
            result[row.resource_id] = row.content as T
        }

        return { data: result }
    }

    /**
     * 删除配置项
     */
    async deleteConfig(
        category: ConfigCategory,
        resourceId: ResourceId
    ): Promise<{ success: boolean; error?: string }> {
        if (!this.userId) {
            return { success: false, error: '用户未登录' }
        }

        const { error } = await supabase
            .from('user_configs')
            .delete()
            .eq('user_id', this.userId)
            .eq('category', category)
            .eq('resource_id', resourceId)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    }

    // ============================================
    // 业务层便捷方法
    // ============================================

    /**
     * 保存导航配置
     */
    async saveNavigation(navGroups: NavGroup[]): Promise<{ success: boolean; error?: string }> {
        return this.saveConfig('navigation', 'nav-main', navGroups)
    }

    /**
     * 加载导航配置
     */
    async loadNavigation(): Promise<{ data: NavGroup[] | null; error?: string }> {
        return this.loadConfig<NavGroup[]>('navigation', 'nav-main')
    }

    /**
     * 保存页面配置
     */
    async savePageConfig(
        pageId: string, 
        config: Page1ConfigData
    ): Promise<{ success: boolean; error?: string }> {
        return this.saveConfig('page', `page-${pageId}` as ResourceId, config)
    }

    /**
     * 加载单个页面配置
     */
    async loadPageConfig(pageId: string): Promise<{ data: Page1ConfigData | null; error?: string }> {
        return this.loadConfig<Page1ConfigData>('page', `page-${pageId}` as ResourceId)
    }

    /**
     * 加载所有页面配置
     */
    async loadAllPageConfigs(): Promise<{ data: Record<string, Page1ConfigData>; error?: string }> {
        const result = await this.loadCategoryConfigs<Page1ConfigData>('page')
        
        // 移除 resource_id 前缀 "page-"
        const cleaned: Record<string, Page1ConfigData> = {}
        for (const [key, value] of Object.entries(result.data)) {
            const pageId = key.replace(/^page-/, '')
            cleaned[pageId] = value
        }
        
        return { data: cleaned, error: result.error }
    }

    /**
     * 保存团队列表
     */
    async saveTeams(teams: TeamItem[]): Promise<{ success: boolean; error?: string }> {
        return this.saveConfig('team', 'team-list', teams)
    }

    /**
     * 加载团队列表
     */
    async loadTeams(): Promise<{ data: TeamItem[] | null; error?: string }> {
        return this.loadConfig<TeamItem[]>('team', 'team-list')
    }

    /**
     * 保存应用设置
     */
    async saveAppSettings(settings: Record<string, any>): Promise<{ success: boolean; error?: string }> {
        return this.saveConfig('app_settings', 'user-preferences', settings)
    }

    /**
     * 加载应用设置
     */
    async loadAppSettings(): Promise<{ data: Record<string, any> | null; error?: string }> {
        return this.loadConfig('app_settings', 'user-preferences')
    }
}

// 导出单例
export const supabaseConfigService = new SupabaseConfigService()
```

#### 3.2.4 `src/composables/useNavigation.ts`

```typescript
// ============================================
// 导航状态管理 Composable
// ============================================
import { ref, computed } from 'vue'
import type { NavGroup, NavSubItem } from '@/types/navigation'

// 内部状态
const currentMainNav = ref('')
const currentSubNav = ref('')
const currentNavId = ref('')
const detailTitle = ref<string | null>(null)
const navGroupsRef = ref<NavGroup[] | null>(null)

/**
 * 设置 navGroups 引用（由 configStore 调用）
 */
export function setNavGroupsRef(navGroups: NavGroup[]) {
    navGroupsRef.value = navGroups
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
            currentNavId.value = firstSubNav.id
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
            currentNavId.value = navId
        } else {
            const navGroups = navGroupsRef.value || []
            for (const group of navGroups) {
                for (const mainItem of group.items) {
                    const subItem = mainItem.items?.find(item => item.title === subNav)
                    if (subItem) {
                        currentNavId.value = subItem.id
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

    const navId = computed(() => currentNavId.value)

    const currentTemplate = computed(() => {
        if (navGroupsRef.value) {
            for (const group of navGroupsRef.value) {
                for (const mainItem of group.items) {
                    const subItem = mainItem.items?.find(
                        (item: NavSubItem) => item.id === currentNavId.value
                    )
                    if (subItem?.template) {
                        return subItem.template
                    }
                    if (subItem?.component) {
                        return 'Page1'
                    }
                }
            }
        }
        return undefined
    })

    const currentPage = computed(() => {
        if (currentNavId.value === 'settings') return 'Settings'
        if (currentNavId.value === 'billing') return 'Billing'
        if (currentNavId.value === 'profile') return 'profile'

        if (currentTemplate.value) {
            return currentTemplate.value
        }
        return currentSubNav.value
    })

    return {
        currentMainNav,
        currentSubNav,
        currentNavId: navId,
        detailTitle,
        breadcrumbs,
        currentPage,
        currentTemplate,
        setNavigation,
        setDetailTitle,
    }
}
```

---

### 3.3 重构后的 `configStore.ts` 核心变更

#### 需要删除的代码（约 300+ 行）：

| 行范围 | 功能 | 理由 |
|--------|------|------|
| L500-532 | `readSourceFile()`, `findBalancedBlock()` | 废弃源码修改 |
| L534-568 | `findObjectBlockById()` | 废弃源码修改 |
| L572-697 | `syncSidebarConfig()` | 废弃源码修改 |
| L699-734 | `savePage1Config()` | 废弃源码修改 |
| L741-878 | `generatePage1ConfigCode()` | 废弃源码修改 |

#### 需要重写的代码：

| 功能 | 原实现 | 新实现 |
|------|--------|--------|
| `saveToSupabaseInternal()` | 保存整个大 JSON | 调用 `supabaseConfigService` 分类保存 |
| `loadFromSupabase()` | 加载整个大 JSON | 调用 `supabaseConfigService` 分类加载 |

#### 新版 `saveToSupabaseInternal()` 示例：

```typescript
async function saveToSupabaseInternal(): Promise<{ success: boolean; message: string }> {
    try {
        const service = supabaseConfigService
        const inited = await service.init()
        if (!inited) {
            return { success: false, message: '用户未登录' }
        }

        // 1. 保存导航配置
        const navResult = await service.saveNavigation(navGroups.value)
        if (!navResult.success) {
            return { success: false, message: `导航保存失败: ${navResult.error}` }
        }

        // 2. 保存每个页面配置
        for (const [pageId, config] of Object.entries(page1Configs.value)) {
            const { mockData, ...configData } = config
            const pageResult = await service.savePageConfig(pageId, configData)
            if (!pageResult.success) {
                console.warn(`页面 ${pageId} 保存失败:`, pageResult.error)
            }
        }

        // 3. 保存应用设置（可选）
        await service.saveAppSettings({
            navigationStyle: navigationStyle.value,
            filterActionFusion: filterActionFusion.value
        })

        return { success: true, message: '配置已保存到云端' }
    } catch (e) {
        console.error('保存失败:', e)
        return { success: false, message: '保存失败: ' + (e as Error).message }
    }
}
```

---

## 四、迁移步骤

### 阶段 1：文件拆分（不改变功能）

| 步骤 | 动作 | 预计工时 |
|------|------|---------|
| 1.1 | 创建 `src/types/` 目录，迁移所有类型定义 | 1h |
| 1.2 | 创建 `src/config/constants.ts`，迁移 `COMMON_OPTIONS` | 0.5h |
| 1.3 | 创建 `src/composables/useNavigation.ts`，迁移导航状态管理 | 1h |
| 1.4 | 创建 `src/components/AIGenLogo.vue`，迁移 Logo 组件 | 0.5h |
| 1.5 | 更新所有 import 路径，确保项目可运行 | 2h |
| 1.6 | 运行测试，修复潜在问题 | 1h |

### 阶段 2：存储服务重构

| 步骤 | 动作 | 预计工时 |
|------|------|---------|
| 2.1 | 创建 `SupabaseConfigService` 分类存储服务 | 2h |
| 2.2 | 创建配置迁移服务，支持旧数据迁移 | 1h |
| 2.3 | 重写 `saveToSupabaseInternal()` | 1h |
| 2.4 | 重写 `loadFromSupabase()` | 1h |
| 2.5 | 删除源码修改相关代码（300+ 行） | 0.5h |

### 阶段 3：验证与清理

| 步骤 | 动作 | 预计工时 |
|------|------|---------|
| 3.1 | 端到端测试（登录、加载、编辑、保存） | 2h |
| 3.2 | 删除 `src/config/page1.ts`（若无引用） | 0.5h |
| 3.3 | 更新文档和 README | 1h |

**总预计工时：约 14.5 小时**

---

## 五、风险与应对

| 风险 | 影响 | 应对措施 |
|------|------|---------|
| 旧数据格式不兼容 | 用户数据丢失 | 创建迁移服务，自动转换旧格式 |
| Import 路径大量变更 | 编译失败 | 使用 TypeScript 路径别名，逐步迁移 |
| Supabase 表结构变更 | API 调用失败 | 先验证表结构，再部署代码 |

---

## 六、验收标准

- [ ] `src/config/schema.ts` 行数 < 100 行（仅保留工厂函数）
- [ ] `src/stores/configStore.ts` 行数 < 800 行
- [ ] 所有类型定义在 `src/types/` 目录下
- [ ] 不再有正则表达式修改源码的逻辑
- [ ] Supabase 存储按 `category + resource_id` 分类
- [ ] 现有功能无回归（导航加载、配置保存、预览模式）

---

## 七、附录

### A. 类型定义清单

| 类型名 | 目标文件 | 依赖 |
|--------|----------|------|
| TreeNode | page-config.ts | 无 |
| FilterConfig | page-config.ts | TreeNode |
| FilterAreaConfig | page-config.ts | FilterConfig |
| CardItemConfig | page-config.ts | 无 |
| CardAreaConfig | page-config.ts | CardItemConfig |
| TableColumn | page-config.ts | 无 |
| TableAreaConfig | page-config.ts | TableColumn |
| ActionButtonConfig | page-config.ts | FilterConfig |
| ActionsAreaConfig | page-config.ts | ActionButtonConfig |
| Page1Config | page-config.ts | 多个 |
| NavSubItem | navigation.ts | Page1Config |
| NavMainItem | navigation.ts | NavSubItem |
| NavGroup | navigation.ts | NavMainItem |
| ProjectItem | navigation.ts | LucideIcon |
| ProjectGroup | navigation.ts | ProjectItem |
| TeamPermissions | navigation.ts | 无 |
| TeamItem | navigation.ts | TeamPermissions |
| UserInfo | navigation.ts | 无 |
| SidebarConfig | navigation.ts | 多个 |

### B. 命令行操作参考

```bash
# 创建目录结构
mkdir -p src/types src/config/defaults src/composables src/stores/services src/components

# 检查类型是否有循环依赖
npx madge --circular src/types/
```
