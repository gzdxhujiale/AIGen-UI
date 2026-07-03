<script setup lang="ts">
import { SignIn, SignUp, useSignIn } from '@clerk/vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { Message } from '@arco-design/web-vue'

const currentMode = ref('signin')
const isTestLoggingIn = ref(false)
const { isLoaded, signIn, setActive } = useSignIn()

const updateMode = () => {
  if (window.location.hash.includes('signup')) {
    currentMode.value = 'signup'
  } else {
    currentMode.value = 'signin'
  }
}

const handleTestLogin = async () => {
  if (!isLoaded.value) return
  isTestLoggingIn.value = true
  
  try {
    // 【重要提示】：请先在 Clerk 后台注册这个测试账号，并把真实的账号密码填在这里！
    const result = await signIn.value?.create({
      identifier: 'test@example.com',
      password: 'TestPassword123!'
    })
    
    if (result?.status === 'complete') {
      await setActive.value?.({ session: result.createdSessionId })
      Message.success('测试账号登录成功！')
    } else {
      Message.warning('需要进一步验证，请检查账号状态')
    }
  } catch (err: any) {
    console.error('Test login failed:', err)
    Message.error(err.errors?.[0]?.message || '测试登录失败，请检查账号密码是否正确')
  } finally {
    isTestLoggingIn.value = false
  }
}

onMounted(() => {
  updateMode()
  window.addEventListener('hashchange', updateMode)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', updateMode)
})
</script>

<template>
  <div class="w-full min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-50">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
    <div class="absolute bottom-0 left-0 -z-10 w-full h-1/2 bg-[linear-gradient(to_top,rgba(var(--primary-6-rgb),0.05),transparent)]"></div>
    
    <div class="w-full max-w-[400px] flex flex-col gap-4 justify-center animate-in fade-in zoom-in duration-700">
      <SignIn v-if="currentMode === 'signin'" signUpUrl="#signup" />
      <SignUp v-else signInUrl="#signin" />

      <!-- 一键测试登录按钮 -->
      <button 
        v-if="currentMode === 'signin'"
        @click="handleTestLogin" 
        :disabled="isTestLoggingIn"
        class="w-full py-2.5 px-4 bg-white/60 hover:bg-white backdrop-blur-sm text-[rgb(var(--primary-6))] rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-medium border border-[rgb(var(--primary-2))] shadow-sm hover:shadow active:scale-[0.98]"
      >
        <span v-if="isTestLoggingIn" class="i-lucide-loader-2 animate-spin w-4 h-4"></span>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        {{ isTestLoggingIn ? '登录中...' : '一键体验 (测试账号)' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: fadeIn 0.6s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
