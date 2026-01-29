# AI 交互模式升级方案：覆盖与新建 (Overwrite vs Create New)

## 1. 背景与目标 (Background & Goal)
当前系统 AI 只支持 **“追加 (Append)”** 模式，即 AI 生成的配置只能作为新页面或新组件添加到现有结构中。
用户的期望是实现更灵活的交互：
1. **上下文感知**：用户表达意图时，自动携带当前**二级页面**的配置。
2. **完全生成**：AI 返回完整的二级页面配置。
3. **决策权**：用户决定是 **“覆盖当前页面 (Overwrite)”** 还是 **“作为新页面添加 (Create New)”**。

## 2. 核心流程设计 (Core Flow Design)

### 2.1 上下文注入 (Context Injection)
**现状**: 我们已经注入了完整的一级导航配置。
**改进**: 为了支持“覆盖”，我们需要更精准地告诉 AI 当前用户聚焦的是哪个“二级页面”。
*   **Action**: 在 `sendMessage` 中，除了发送完整的一级结构供参考外，**额外高亮/提取**当前选中的二级页面配置，提示 AI：“这是用户当前正在查看的页面配置，如果用户意图是修改，请基于此生成并在返回中包含完整的修改后配置。”

### 2.2 AI 响应协议 (AI Response Protocol)
AI 应当返回一个标准化的 `Page1ConfigData` (即 `component` 字段的内容)，或者包含页面元数据 (Title) 的包装对象。
*   **Prompt 调整**: 要求 AI 在修改时返回**完整的**配置 JSON，而不仅仅是差异补丁 (Patch)，这样前端可以直接进行全量替换。

### 2.3 前端状态管理 (`aiStore.ts`)
需要引入新的状态来管理“待决策”的预览配置。

*   **新增状态**:
    *   `previewMode`: 扩展为 `'pending_decision'` (待决策) | `'overwrite_preview'` (覆盖预览) | `'create_preview'` (新建预览)。
    *   `previewCandidate`: 暂存 AI 返回的配置，等待用户操作。
    *   `targetContextId`: 记录生成该配置时对应的当前页面 ID (防止用户切换页面后覆盖错对象)。

### 2.4 UI 交互层 (`AIChatAssistant.vue`)
在 AI 返回配置后，聊天窗口的“预览面板”不再直接显示“确认追加”，而是显示决策选项：

#### 交互状态 A：待决策 (Pending Decision)
显示：“AI 已生成新的页面配置，请选择应用方式：”
*   **[按钮 A] 覆盖当前页面**
    *   提示：“将替换 '用户管理' 页面的当前布局”
    *   Action: 预览覆盖效果，进入状态 B。
*   **[按钮 B] 另存为新页面**
    *   提示：“将在当前导航组下新建一个页面”
    *   Action: 预览新页面效果 (追加到导航末尾)，进入状态 C。

#### 交互状态 B/C：确认预览 (Confirm Preview)
用户点击上述按钮后，页面中央区域渲染预览效果。
*   **[确认应用]**: 执行即使。
*   **[返回/取消]**: 回到决策状态。

## 3. 技术实现方案 (Technical Implementation)

### 3.1 修改 `aiStore.ts`

```typescript
// 伪代码示例

// 1. 发送消息时记录当前页面 ID
function sendMessage() {
   // ... existing logic
   lastContextNavId.value = currentNavId.value // 记录上下文 ID
}

// 2. 处理 AI 响应
function handleAIResponse(config) {
   pendingConfig.value = config;
   // 默认先不进入 overwrite 模式，而是进入 'decision' 模式
   previewMode.value = 'decision'; 
}

// 3. 用户选择模式
function selectPreviewMode(mode: 'overwrite' | 'create') {
   if (mode === 'overwrite') {
       // 将 pendingConfig 临时应用到 currentNavId 对应的 store 状态中供预览
       configPageStore.setOverwritePreview(lastContextNavId.value, pendingConfig.value);
   } else {
       // 将 pendingConfig 追加到列表末尾供预览
       configPageStore.setAppendPreview(pendingConfig.value);
   }
   previewMode.value = mode; // 此时 UI 变为“确认/取消”按钮
}

// 4. 最终确认
async function commitChanges() {
    if (previewMode.value === 'overwrite') {
        await configPageStore.updateSubPageComponent(
            currentNavTitle, 
            lastContextNavId.value, 
            pendingConfig.value
        );
    } else {
        await configPageStore.addSubPage(currentNavTitle, {
            name: 'AI 生成页面',
            component: pendingConfig.value
        });
    }
}
```

### 3.2 修改 `config_page_Store.ts`
需要增强 `previewPageConfigs` 的逻辑：
*   **支持“原位替换”预览**: 目前 `previewPageConfigs` 主要是合并逻辑。需要支持“影子替换”，即在预览 Map 中，将指定的 `subId` 的 `component` 替换为新配置，但不改变 `items` 数组的结构。

### 3.3 修改 `AIChatAssistant.vue`
*   **Template**: 在 `preview-panel` 区域增加 `v-if="previewMode === 'decision'"` 的分支，渲染两个大按钮。
*   **Visual Feedback**: 
    *   “覆盖”模式下，左侧主视图应直接刷新为新配置。
    *   “新建”模式下，左侧导航栏应出现一个新的临时 Item 并被选中。

## 4. 总结与建议
此方案将用户的“意图确认”前置到了配置应用之前，大大降低了误操作覆盖现有配置的风险，同时保留了创建新页面进行 A/B 测试的灵活性。

**下一步建议**:
1.  先改造 `aiStore` 的状态定义。
2.  更新 UI 组件以支持决策视图。
3.  实现 Store 中的“影子替换”预览逻辑。
