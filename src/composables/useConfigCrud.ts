import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

interface ConfigCrudOptions<T> {
    // 返回用于添加新项的默认'空'表单状态
    defaultForm: () => T

    // 执行实际保存的回调函数 (更新 store)
    // modifying: 如果正在编辑现有项则为 true，如果添加新项则为 false
    // index: 正在编辑的项的索引 (如果是添加则为 null)
    // form: 当前表单数据
    doSave: (modifying: boolean, index: number | null, form: T) => void

    // 执行删除的回调函数 (更新 store)
    doDelete?: (index: number) => void

    // 成功消息的可选翻译名称
    name?: string
}

export function useConfigCrud<T extends Record<string, any>>(options: ConfigCrudOptions<T>) {
    const dialogVisible = ref(false)
    const editingIndex = ref<number | null>(null)
    const mode = ref<'add' | 'edit'>('add')

    // 响应式表单数据
    const formData = ref<T>(options.defaultForm())

    /**
     * 以'添加'模式打开弹窗
     */
    const openAdd = () => {
        mode.value = 'add'
        editingIndex.value = null
        // 重置表单为默认值
        formData.value = options.defaultForm()
        dialogVisible.value = true
    }

    /**
     * 以'编辑'模式打开弹窗
     * @param index 列表中的项索引
     * @param item 当前项数据 (将被复制到表单)
     * @param transform 可选函数，用于在设置到表单前转换项数据 (例如将数组格式化为字符串)
     */
    const openEdit = (index: number, item: any, transform?: (item: any) => T) => {
        mode.value = 'edit'
        editingIndex.value = index

        if (transform) {
            formData.value = transform(item)
        } else {
            // 深拷贝以断开引用
            formData.value = JSON.parse(JSON.stringify(item))
        }

        dialogVisible.value = true
    }

    /**
     * 处理保存操作
     */
    const handleSave = () => {
        // 先缓存当前模式，防止关闭弹窗后 mode 被重置
        const isAddMode = mode.value === 'add'

        // 调用保存回调
        options.doSave(mode.value === 'edit', editingIndex.value, formData.value)

        dialogVisible.value = false
        Message.success(isAddMode ? `${options.name || '项'}添加成功` : `${options.name || '项'}更新成功`)
    }

    /**
     * 处理带确认的删除操作
     * @param index 要删除的项的索引
     * @param confirmMessage 自定义确认消息
     */
    const handleDelete = (index: number, _confirmMessage?: string) => {
        if (options.doDelete) {
            options.doDelete(index)
            Message.success('删除成功')
        }
    }

    /**
     * 手动关闭弹窗
     */
    const closeDialog = () => {
        dialogVisible.value = false
        editingIndex.value = null
    }

    return {
        name: options.name || '项',
        dialogVisible,
        editingIndex,
        mode,
        formData,
        openAdd,
        openEdit,
        handleSave,
        handleDelete,
        closeDialog
    }
}
