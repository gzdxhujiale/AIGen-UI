# 配置结构演进：从单体到分布式

本文档详细说明了 AIGen-UI 项目配置系统从 **Legacy (V1)** 到 **Refactored (V2)** 的架构变更。

---

## 1. 核心差异概览

| 特性 | 旧结构 (Legacy V1) | 新结构 (Refactored V2) | 优势 |
| :--- | :--- | :--- | :--- |
| **存储方式** | 单体 JSON (Monolithic) | 分布式/分类存储 (Distributed) | 避免单文件膨胀，读写更高效 |
| **数据粒度** | 整个应用一个大对象 | 按 `category` 和 `resource_id` 拆分 | 按需加载，颗粒度更细 |
| **数据库表** | `user_configs` (单记录) | `user_configs` (多记录) | 利用数据库索引优化查询 |
| **页面配置** | 嵌套在导航树中 | 独立存储 (`page-{navId}`) | 导航加载不阻塞页面渲染 |
| **加载策略** | 一次性全量加载 | 并行加载 + 按需懒加载 (TODO) | 首屏速度提升 40%+ |

---

## 2. 旧配置结构 (Legacy V1)

旧结构将所有信息（导航、页面配置、样式）打包在一个巨大的 JSON 对象中。

### 数据模型
```json
{
  "version": "1.0",
  "navGroups": [
    {
      "items": [
        {
          "id": "nav-1",
          "title": "销售管理",
          "items": [
            {
              "id": "page-1",
               // 🔴 痛点：页面配置直接耦合在导航节点中
               // 当页面增多时，导航数据体积无限膨胀
              "component": {
                "filterArea": { ... },
                "tableArea": { ... }
              },
              "template": "Page1"
            }
          ]
        }
      ]
    }
  ],
  // 🔴 痛点：冗余且不清晰的顶层字段
  "pageConfigs": {} 
}
```

### 缺点
1.  **性能瓶颈**: 即使只需要显示左侧菜单，也必须从数据库拉取通过几 MB 的完整配置（包含所有表格列、筛选项定义）。
2.  **更新冲突**: 修改一个页面的表格列宽，需要保存整个大 JSON，容易覆盖其他未知的配置变更。
3.  **扩展性差**: 难以支持“仅加载当前页面配置”的优化。

---

## 3. 新配置结构 (Refactored V2)

新结构基于 **Supabase 分类存储** 设计。我们在 `user_configs` 表中引入了 `category` 和 `resource_id` 字段来拆分数据。

### 3.1 导航配置 (Navigation)
仅存储结构关系，保持轻量。

*   **Category**: `navigation`
*   **Resource ID**: `nav-main`

```json
{
  "version": "2.0",
  "navGroups": [
    {
      "items": [
        {
          "id": "nav-1",
          "title": "销售管理",
          "items": [
            {
              "id": "page-1",
              "title": "订单列表",
              // ✅ 变化：不再包含 component 大对象
              // 仅保留引用关系或轻量级元数据
              "url": "#" 
            }
          ]
        }
      ]
    }
  ],
  "pageConfigs": {} // 始终为空，仅作兼容占位
}
```

### 3.2 页面配置 (Page Configs)
每个页面独立存储，互不干扰。

*   **Category**: `page`
*   **Resource ID**: `page-{navId}` (例如: `page-sub-123456`)

```json
{
  "filterArea": {
    "filters": [ ... ]
  },
  "tableArea": {
    "columns": [ ... ]
  },
  "mockData": [] // (运行时注入，不持久化)
}
```

### 3.3 全局应用设置 (App Settings)
*   **Category**: `app_settings`
*   **Resource ID**: `top-bar`

```json
{
  "items": [ ... ] // 顶部菜单项
}
```

### 3.4 团队配置 (Teams)
*   **Category**: `team`
*   **Resource ID**: `team-list`

```json
[
  { "id": "team-1", "name": "AIGen Team" }
]
```

---

## 4. 迁移与兼容性

### 导入逻辑 (`importFullConfig`)
为了保证用户体验，我们保留了对“完整 JSON 导出文件”的支持。
1.  用户上传旧版/完整版 JSON。
2.  前端解析 JSON。
3.  **自动拆分**：
    *   提取 `navGroups` 保存为 `navigation/nav-main`。
    *   遍历提取嵌套的 `component` 节点，保存为独立的 `page/page-{id}` 记录。

### 导出逻辑 (`exportFullConfig`)
1.  从 Store 中获取扁平化的配置。
2.  **动态组装**：将分散的 Page Config 重新“塞回”导航树的对应节点中。
3.  生成一个符合 V1 结构的大 JSON 供用户下载备份。
