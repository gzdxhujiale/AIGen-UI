import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

interface ConfigCrudOptions<T> {
    // Returns the default 'empty' form state for adding a new item
    defaultForm: () => T

    // Callback to perform the actual save (update store)
    // modifying: true if editing an existing item, false if adding new
    // index: index of the item being edited (or null if adding)
    // form: the current form data
    doSave: (modifying: boolean, index: number | null, form: T) => void

    // Callback to perform delete (update store)
    doDelete?: (index: number) => void

    // Optional translation for success messages
    name?: string
}

export function useConfigCrud<T extends Record<string, any>>(options: ConfigCrudOptions<T>) {
    const dialogVisible = ref(false)
    const editingIndex = ref<number | null>(null)
    const mode = ref<'add' | 'edit'>('add')

    // Reactive form data
    const formData = ref<T>(options.defaultForm())

    /**
     * Open the dialog in 'Add' mode
     */
    const openAdd = () => {
        mode.value = 'add'
        editingIndex.value = null
        // Reset form to default
        formData.value = options.defaultForm()
        dialogVisible.value = true
    }

    /**
     * Open the dialog in 'Edit' mode
     * @param index Index of the item in the list
     * @param item Current item data (will be copied to form)
     * @param transform Optional function to transform item data before setting it to form (e.g. formatting arrays to strings)
     */
    const openEdit = (index: number, item: any, transform?: (item: any) => T) => {
        mode.value = 'edit'
        editingIndex.value = index

        if (transform) {
            formData.value = transform(item)
        } else {
            // Deep copy to break reference
            formData.value = JSON.parse(JSON.stringify(item))
        }

        dialogVisible.value = true
    }

    /**
     * Handle the save action
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
     * Handle delete action with confirmation
     * @param index Index of the item to delete
     * @param confirmMessage Custom confirmation message
     */
    const handleDelete = (index: number, _confirmMessage?: string) => {
        if (options.doDelete) {
            options.doDelete(index)
            Message.success('删除成功')
        }
    }

    /**
     * Close the dialog manually
     */
    const closeDialog = () => {
        dialogVisible.value = false
        editingIndex.value = null
    }

    return {
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
