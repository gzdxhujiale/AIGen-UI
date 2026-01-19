import { ref } from 'vue'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

/**
 * 用户引导 Composable
 * 使用 Driver.js 实现新用户引导功能
 */
export function useOnboarding() {
    const STORAGE_KEY = 'onboarding_completed'
    // 是否显示更新公告
    const showAnnouncement = ref(false)

    /**
     * 检查是否应该显示引导
     * @param userEmail - 当前用户的邮箱
     * @returns 是否应该显示引导
     */
    function shouldShowOnboarding(userEmail: string): boolean {
        // 测试账号每次都显示引导
        if (userEmail.toLowerCase().includes('test')) {
            return true
        }

        // 首次登录时显示引导
        const completed = localStorage.getItem(STORAGE_KEY)
        return !completed
    }

    /**
     * 标记引导已完成
     */
    function markOnboardingCompleted() {
        localStorage.setItem(STORAGE_KEY, 'true')
    }

    /**
     * 启动引导流程
     * @param userEmail - 当前用户的邮箱
     */
    function startOnboarding(userEmail: string) {
        if (!shouldShowOnboarding(userEmail)) {
            return
        }

        // 延迟启动，确保 DOM 已渲染
        setTimeout(() => {
            const driverObj = driver({
                showProgress: true,
                animate: true,
                allowClose: true,
                overlayColor: 'rgba(0, 0, 0, 0.6)',
                stagePadding: 8,
                stageRadius: 8,
                popoverClass: 'onboarding-popover',
                nextBtnText: '下一步',
                prevBtnText: '上一步',
                doneBtnText: '完成',
                progressText: '{{current}} / {{total}}',
                onDestroyed: () => {
                    // 关闭下拉菜单
                    document.body.click()
                    // 只有非测试账号才标记完成
                    if (!userEmail.toLowerCase().includes('test')) {
                        markOnboardingCompleted()
                    }

                    // 测试账号在引导结束后显示更新公告
                    if (userEmail.toLowerCase().includes('test')) {
                        setTimeout(() => {
                            showAnnouncement.value = true
                        }, 500)
                    }
                },
                steps: [
                    {
                        element: '.ai-chat-button',
                        popover: {
                            title: '🤖 AI 配置助手',
                            description: '点击这个按钮可以调用 AI 助手来帮助您生成和修改页面配置。只需描述您想要的效果，AI 会自动生成配置方案供您预览和确认。',
                            side: 'left',
                            align: 'center',
                            onNextClick: () => {
                                // 点击头像下拉菜单触发器
                                const trigger = document.querySelector('#user-avatar-trigger') as HTMLElement
                                if (trigger) {
                                    trigger.click()
                                    // 等待下拉菜单渲染后再进入下一步
                                    setTimeout(() => {
                                        driverObj.moveNext()
                                    }, 300)
                                } else {
                                    driverObj.moveNext()
                                }
                            }
                        }
                    },
                    {
                        element: '#nav-profile',
                        popover: {
                            title: '👤 用户中心',
                            description: '用户中心包含三个核心功能：\n\n• 基本信息配置 - 设置您的显示名称\n• 界面布局配置 - 选择导航风格和菜单栏配置\n• 团队管理配置 - 管理您的团队信息和权限',
                            side: 'left',
                            align: 'start'
                        }
                    },
                    {
                        element: '#nav-settings',
                        popover: {
                            title: '⚙️ 用户设置',
                            description: '在这里您可以配置页面的详细设置，包括筛选器、表格列、操作按钮等。所有配置都会实时保存到云端。',
                            side: 'left',
                            align: 'start'
                        }
                    }
                ]
            })

            driverObj.drive()
        }, 800)
    }

    /**
     * 重置引导状态（用于调试）
     */
    function resetOnboarding() {
        localStorage.removeItem(STORAGE_KEY)
    }

    return {
        startOnboarding,
        resetOnboarding,
        shouldShowOnboarding,
        showAnnouncement
    }
}
