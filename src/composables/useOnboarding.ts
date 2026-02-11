import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

/**
 * 用户引导 Composable
 * 使用 Driver.js 实现新用户引导功能
 */
export function useOnboarding() {
    const STORAGE_KEY = 'onboarding_completed'


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

                },
                steps: [
                    {
                        element: '.ai-trigger-btn',
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
                                    // 给一点时间让下拉菜单渲染出来
                                    setTimeout(() => {
                                        driverObj.moveNext()
                                    }, 400)
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
                            description: '用户中心包含三个核心功能：\n\n• 个人资料：配置您的职位、部门、所在地、个性化标签等信息。\n• 团队管理：管理您的团队信息和成员权限。',
                            side: 'left',
                            align: 'start'
                        }
                    },
                    {
                        element: '#nav-edit-mode',
                        popover: {
                            title: '✏️ 预览/编辑模式',
                            description: '核心切换开关。\n\n• **编辑模式**：可以实时修改导航、添加组件、调整布局。\n• **预览模式**：查看最终生效的用户界面效果。',
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
        shouldShowOnboarding
    }
}
