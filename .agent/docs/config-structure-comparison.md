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

---

## 5. 进阶优化建议 (Optimization Proposal)

针对 V2 结构的潜在挑战，我们建议在未来引入以下优化机制（V2.5 或 V3）：

### 5.1 运行时数据校验 (Runtime Validation)
引入 **Zod** 或 **Valibot** 等库。
*   **痛点**：当前 `importFullConfig` 和数据库读取仅依赖 TypeScript 静态类型，若数据源被污染（如手动修改 DB），前端可能白屏。
*   **建议**：在 Store 层增加 Schema 校验，拦截不合规的配置并降级处理（如显示“配置已损坏”而非崩溃）。

### 5.2 事务性操作 (Atomic Transactions via RPC)
使用 **Supabase RPC (Postgres Functions)** 封装复杂操作。
*   **痛点**：目前“新建页面”涉及两个 HTTP 请求（1. 更新导航 `navGroups` 2. 插入页面配置 `page_configs`）。如果第 2 步失败，会出现“有菜单但无页面”的僵尸节点。
*   **建议**：创建一个 Postgres 函数 `create_page_with_nav_item(nav_data, page_data)`，确保两者在一个数据库事务中同时成功或失败。

### 5.3 乐观更新与自动回滚 (Optimistic UI with Rollback)
*   **痛点**：当前 Store 直接修改本地状态 (`page1Configs.value[id] = ...`) 然后异步同步。如果同步失败，仅仅是显示 Error Toast，用户界面仍显示“成功”的状态，导致误导。
*   **建议**：实现一个状态机。在同步失败时，自动将本地 State 回滚到上一次的快照版本。

### 5.4 智能缓存策略 (Smart Caching)
*   **痛点**：虽然分散存储减小了首屏体积，但每次刷新都要几十个请求去拉取不同页面的配置（如果预加载的话）。
*   **建议**：
    1.  **关键路径预加载**：首屏仅并行加载 `Navigation` + `Current Page Config`。

---

## 6. 替代方案：多表关联结构 (Relational/Normalized V3)

用户提出的“多建几个表”的方案，即 **关系型数据库范式化 (Normalization)**。这种方案是将 JSON 中的字段拆解为独立的数据库表列。

### 6.1 架构设计
不再使用通用的 `user_configs` 表，而是建立业务专用的表结构：

```sql
-- 1. 导航表
CREATE TABLE navigation_items (
  id UUID PRIMARY KEY,
  parent_id UUID REFERENCES navigation_items(id), -- 支持无限层级
  title VARCHAR(255),
  icon VARCHAR(50),
  sort_order INT,
  page_id UUID -- 关联到具体页面
);

-- 2. 页面元数据表
CREATE TABLE pages (
  id UUID PRIMARY KEY,
  type VARCHAR(50), -- 'table', 'dashboard', 'form'
  title VARCHAR(255),
  layout_config JSONB -- 仍保留部分 JSON 用于存储纯前端 UI 状态
);

-- 3. 组件配置表 (完全拆解)
CREATE TABLE page_components (
  id UUID PRIMARY KEY,
  page_id UUID REFERENCES pages(id),
  area_type VARCHAR(20), -- 'filter', 'table', 'action'
  config JSONB
);
```

### 6.2 深度对比

| 维度 | V2 (当前: KV/Document) | V3 (多表: Relational) | 评价 |
| :--- | :--- | :--- | :--- |
| **查询灵活性** | **低**。只能按 key 查，查出来是一坨 JSON，无法用 SQL 查“所有开启了搜索功能的页面”。 | **高**。可以用 SQL 做复杂分析：`SELECT * FROM pages WHERE type='table'`。 | 如果你需要后端对配置进行统计分析，V3 完胜。 |
| **开发速度** | **快**。前端加个字段，后端不用改表结构，直接存 JSON。 | **慢**。前端加字段 -> 后端改表结构 (Migration) -> 更新 API 类型。 | V2 适合快速迭代的 UI  builder。 |
| **数据一致性** | **中**。依赖应用层逻辑维护引用关系。 | **极高**。数据库外键约束 (Foreign Key) 自动保证引用完整性。删除页面时自动阻止删除导航。 | V3 无论如何操作数据库，数据永远不会“断链”。 |
| **性能** | **极快** (简单 Key-Value 读取)。 | **中等**。需要多表 JOIN，复杂页面可能需要 JOIN 3-4 张表。 | V2 在高并发读场景下更有优势。 |

### 6.3 结论
*   **当前阶段 (V2)**：使用 `user_configs` + JSONB 是**最适合前端低代码/配置化项目**的方案。因为它灵活（Schema-less），前端可以随意调整 UI 配置结构而不需要后端配合改表。

---

## 7. 行业竞品对比 (Industry Comparison)

为了验证我们架构选择的合理性，我们分析了市面上主流开源/商业低代码平台的数据库设计模式。

| 平台 | 数据库选型 | 核心存储模式 | 架构特点 |
| :--- | :--- | :--- | :--- |
| **Appsmith** | MongoDB (NoSQL) | **Document-Based** | 典型的“应用即文档”模式。一个页面就是一个巨大的 JSON 文档，包含 DSL (组件树) 和 Actions。非常适合 Git 版本控制（直接导出为 JSON 文件），但难以进行细粒度的 SQL 查询。 |
| **Budibase** | CouchDB / SQL | **Document-Based** | 早期完全基于 CouchDB（每个视图、行数据都是文档）。现在支持 SQL，但其核心的应用定义（App Definition）仍然是松散的文档结构。 |
| **Retool / LowCoder** | PostgreSQL | **Hybrid (Relational + JSONB)** | **混合模式**。高层实体（App, Page, User, Resource）使用标准关系表存储；但在 `pages` 表中，有一个巨大的 `dsl` 或 `components` 字段 (JSONB) 来存储画布上的拖拽布局和属性配置。 |
| **AIGen-UI (V2)** | Supabase (PostgreSQL) | **Hybrid (Distributed JSON)** | 我们目前的 V2 方案最接近 **Retool** 的模式，但做了一层“分布式优化”：我们将 `Table`, `Filter`, `Action` 等区域也拆成了独立的记录，比 Retool 的单纯 JSONB 粒度更细，理论上加载性能更好。 |

### 结论
**“关系型表 + JSONB 内容”是当前低代码领域的最佳实践。**
*   纯关系型（把每个 Button 都存一行）太重，迁移成本高。
*   纯文档型（MongoDB）查询能力弱，不利于权限管理。
*   **AIGen-UI 的 V2 结构处于“混合模式”的前沿**，既享受了 SQL 的查询能力（按 Category 索引），又保留了 NoSQL 的灵活性。我们的“分区域存储”策略甚至比传统的“整页存储”更激进，有利于未来的协同编辑和增量加载。

---

## 8. V9 方案：基于模块的聚合存储 (Module-Clustered Architecture)

V9 方案是针对 V2 "过度拆分" 导致的状态维护困难问题提出的**终极平衡方案**。它融合了 V1 的原子性优势和 V2 的按需加载优势。

### 8.1 核心思想
**"按一级导航 (Module) 聚合配置"**。
不再让每个页面 (Page) 成为数据库中的孤岛，也不像 V1 那样全量打包。而是以**一级菜单** (Level 1 Nav) 为单位，将其下属的所有二级菜单页面的配置存储在同一行记录中。

### 8.2 数据库表结构设计 (Dedicated Tables)
摒弃通用的 KV 表 `user_configs`，建立业务专用的实体表，语义更清晰：

1.  **`team_configs`**
    *   一行代表一个用户的团队/项目集配置。
2.  **`menu_configs`**
    *   一行代表一个用户的完整导航树结构。
3.  **`page_configs`** (核心变更)
    *   **粒度**：一行 = 一个一级导航项 (Level 1 Nav Item)。
    *   **内容**：包含该一级导航下**所有**二级导航页面的配置。

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `id` | UUID | 主键 |
| `user_id` | UUID | 所属用户 |
| `nav_id` | String | 一级导航 ID (如 `nav-sales`) |
| `configs` | JSONB | Map 结构: `{ "sub-page-1": {...}, "sub-page-2": {...} }` |

### 8.3 优势评估

| 维度 | V2 (当前) | V9 (模块聚合) | 解析 |
| :--- | :--- | :--- | :--- |
| **状态维护** | **困难**。修改页面 A 需要单独存 A；新增页面 B 需要改导航 + 存 B。容易出现数据不同步。 | **简单**。类似 V1，修改某模块下的任何页面，只需读取该模块的大 JSON，改完整体保存。原子性高。 |
| **配置同步** | **复杂**。Store 需要维护无数个散落的 `pageConfigs` 对象。 | **直观**。Store 维护 `Record<ModuleID, ConfigMap>`。编辑模式修改配置时，仅需定位一级 ID 和二级 ID 直接覆盖更新。 |
| **加载性能** | **极快** (首屏)。但切换模块时可能产生碎片化请求。 | **均衡**。进入"销售"模块时，一次性拉取该模块所有页面配置。后续切换子页面零延迟。 |
| **数据库压力** | **大**。记录数 = 页面数。 | **小**。记录数 = 模块数 (通常 < 10)。 |

### 8.4 迁移路径
V9 是 V2 的逻辑升级，不需要重写前端组件，只需重构 Store 的 `save/load` 层级逻辑：
1.  **Load**: 点击一级菜单时，加载对应的 `page_configs` 记录。
2.  **Save**: 编辑页面时，获取当前一级菜单 ID -> 读取 JSON -> 修改对应二级 ID 的节点 -> 整体回写。


