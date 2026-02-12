// ============================================
// 统一导出所有类型定义
// ============================================

// 配置常量与类型
export {
    FILTER_TYPES, COLUMN_TYPES, BUTTON_VARIANTS,
    MOCK_FORMATS, FIXED_POSITIONS, ALIGN_OPTIONS, EFFECT_TYPES,
    PAGE_TYPES,
} from './config'

export type {
    FilterType, ColumnType, ButtonVariant,
    MockFormat, FixedPosition, AlignOption, EffectType,
    PageType,
} from './config'

// 页面配置类型
export type {
    TreeNode,
    FilterConfig,
    FilterAreaConfig,
    CardItemConfig,
    CardAreaConfig,
    TableColumn,
    TableAreaConfig,
    FormPageConfig,
    FormSection,
    ActionButtonConfig,
    ActionsAreaConfig,
    Page1Config,
    Page1ConfigData,
} from './page-config'

// 导航类型
export type {
    NavSubItem,
    NavMainItem,
    NavGroup,

    TeamPermissions,
    TeamItem,
    UserInfo,
    SidebarConfig,
    MenuItem,
    MenuConfig,
} from './navigation'
