---
description: UI 组件库使用规范 - Arco Design 与 Shadcn/UI 的选择标准
---

# UI 组件库使用规范

本项目同时使用 **Arco Design** 和 **Shadcn/UI** 两套组件库。为避免选择困惑，请遵循以下规范。

## 统一规则

### 表单输入组件 → **使用 Arco Design**

| 组件类型 | 使用库 | 组件名 |
|---------|-------|--------|
| 输入框 | Arco | `AInput` |
| 数字输入 | Arco | `AInputNumber` |
| 文本域 | Arco | `ATextarea` |
| 下拉选择 | Arco | `ASelect` / `AOption` |
| 日期选择 | Arco | `ADatePicker` |
| 开关 | Arco | `ASwitch` |
| 复选框 | Arco | `ACheckbox` |

**原因**：Arco 表单组件功能更完整（校验、状态、尺寸等），且已有全局样式覆盖。

### 表格 → **使用 Arco Design**

- 使用 `ATable` 组件
- 已封装为 `ArcoTable.vue`

### 弹窗 → **使用 Arco Design**

- 使用 `AModal` 组件
- 消息提示使用 `Message` 组件

### 侧边栏/导航 → **按风格区分**

- Arco 风格：使用 `ArcoLayout.vue` + `AMenu`
- Shadcn 风格：使用 `ShadcnLayout.vue` + Sidebar 组件

### 按钮 → **配置驱动**

- 按配置中的 `variant` 决定：
  - `primary` / `outline` / `text` → `AButton`
  - `shadcn-outline` → Shadcn `Button`

## 何时使用 Shadcn/UI

1. 需要高度自定义的轻量组件（如头像、分隔线、面包屑）
2. 需要 Tailwind 深度集成的场景
3. 已有 Shadcn 组件封装（如 `@/components/ui/button`）

## 导入示例

```typescript
// ✅ Arco 表单组件
import { 
  Input as AInput, 
  Select as ASelect, 
  Option as AOption,
  Message 
} from '@arco-design/web-vue'

// ✅ Shadcn 按钮（仅在配置要求时使用）
import { Button } from '@/components/ui/button'

// ❌ 不要混用
// import { Input } from '@/components/ui/input' // 表单统一用 Arco
```

## 样式覆盖

全局 Arco 表单样式覆盖已在 `src/styles/arco-form-override.css` 中定义，无需在组件中重复。
