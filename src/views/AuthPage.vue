<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { Loader2, Eye, EyeOff, ArrowLeft, Mail, Lock, User as UserIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/authStore'
import { Message } from '@arco-design/web-vue'

import { supabase } from '@/api/supabase'

const authStore = useAuthStore()
const currentView = ref<'login' | 'register' | 'forgot-password'>('login')
const form = reactive({ email: '', password: '', confirm: '', name: '', show: false, showConfirm: false })

const logoUrl = computed(() => supabase.storage.from('avatars').getPublicUrl('ai.svg').data.publicUrl)

// --- 校验逻辑 ---
const isEmailValid = computed(() => !form.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
const isMatch = computed(() => !form.confirm || form.password === form.confirm)

const canSubmit = computed(() => {
    if (authStore.isLoading || !isEmailValid.value || !form.email) return false
    if (currentView.value === 'login') return !!form.password
    if (currentView.value === 'register') return form.password.length >= 6 && form.password === form.confirm
    return true
})

// --- 动作处理器 ---
const handleAction = async (type: string) => {
    if (!canSubmit.value) return
    let res: any
    if (type === 'login') res = await authStore.signInWithPassword(form.email, form.password)
    else if (type === 'register') res = await authStore.signUp(form.email, form.password, { full_name: form.name || undefined })
    else res = await authStore.resetPassword(form.email)

    if (res.success) {
        if (type === 'forgot') { Message.success(res.data); currentView.value = 'login' }
        else if (type === 'register') { Message.success('注册成功，请查收验证邮件'); currentView.value = 'login' }
        else Message.success('欢迎回来')
    } else {
        Message.error(res.error || '操作失败')
    }
}

const switchView = (v: any) => { currentView.value = v; form.password = ''; form.confirm = ''; form.show = false }
</script>

<template>
  <div class="w-full min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-50">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
    <div class="absolute bottom-0 left-0 -z-10 w-full h-1/2 bg-[linear-gradient(to_top,rgba(var(--primary-6-rgb),0.05),transparent)]"></div>
    
    <div class="w-full max-w-[400px] transition-all duration-500 transform">
      <div class="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5">
        <!-- Logo & Header -->
        <div class="text-center mb-8">
          <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg mb-0 animate-in fade-in zoom-in duration-700 p-2 overflow-hidden border border-slate-100">
            <img :src="logoUrl" alt="AIGen Logo" class="w-full h-full object-contain" />
          </div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">AIGen UI</h1>
          <p class="text-slate-500 mt-1 text-sm">
            {{ currentView === 'login' ? '欢迎回来，请登录' : currentView === 'register' ? '开启您的 AI 生成之旅' : '找回您的账户访问权限' }}
          </p>
        </div>

        <!-- Forms Container -->
        <div class="space-y-5">
          <!-- Login -->
          <form v-if="currentView === 'login'" @submit.prevent="handleAction('login')" class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-700 ml-1">邮箱地址</label>
              <div class="relative group">
                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input v-model="form.email" type="email" placeholder="name@example.com" class="pl-10 h-11 bg-slate-50/50 border-slate-200 rounded-xl focus:ring-primary" :class="{ 'border-red-400': !isEmailValid }" />
              </div>
            </div>
            
            <div class="space-y-1.5">
              <div class="flex justify-between items-center ml-1">
                <label class="text-xs font-semibold text-slate-700">登录密码</label>
                <button type="button" @click="switchView('forgot-password')" class="text-xs text-primary hover:underline font-medium">忘记密码?</button>
              </div>
              <div class="relative group">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input v-model="form.password" :type="form.show ? 'text' : 'password'" placeholder="••••••••" class="pl-10 h-11 bg-slate-50/50 border-slate-200 rounded-xl" />
                <button type="button" @click="form.show = !form.show" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <Eye v-if="!form.show" class="size-4" /> <EyeOff v-else class="size-4" />
                </button>
              </div>
            </div>

            <Button type="submit" class="w-full h-11 rounded-xl font-semibold shadow-md active:scale-[0.98] transition-all" :disabled="!canSubmit">
              <Loader2 v-if="authStore.isLoading" class="mr-2 size-4 animate-spin" />
              立即登录
            </Button>

            <div class="relative py-2">
              <div class="absolute inset-0 flex items-center"><span class="w-full border-t border-slate-100"></span></div>
              <div class="relative flex justify-center text-[10px] uppercase tracking-widest text-slate-400"><span class="bg-white px-3">或使用测试账号</span></div>
            </div>

            <Button type="button" variant="outline" class="w-full h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50" @click="() => { form.email='test@example.com'; form.password='test'; handleAction('login') }" :disabled="authStore.isLoading">测试登录</Button>
            
            <p class="text-center text-sm text-slate-500 pt-2">
              还没有账号? <button type="button" @click="switchView('register')" class="text-primary font-semibold hover:underline">免费注册</button>
            </p>
          </form>

          <!-- Register -->
          <form v-else-if="currentView === 'register'" @submit.prevent="handleAction('register')" class="space-y-4">
             <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-700 ml-1">姓名</label>
              <div class="relative group">
                <UserIcon class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input v-model="form.name" placeholder="您的姓名" class="pl-10 h-11 bg-slate-50/50 rounded-xl" />
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-700 ml-1">邮箱</label>
              <Input v-model="form.email" type="email" placeholder="name@example.com" class="h-11 bg-slate-50/50 rounded-xl" :class="{ 'border-red-400': !isEmailValid }" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-700 ml-1">设置密码</label>
              <Input v-model="form.password" :type="form.show ? 'text' : 'password'" placeholder="至少 6 位密码" class="h-11 bg-slate-50/50 rounded-xl" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-700 ml-1">确认密码</label>
              <Input v-model="form.confirm" type="password" placeholder="再次输入密码" class="h-11 bg-slate-50/50 rounded-xl" :class="{ 'border-red-400': !isMatch }" />
            </div>
            <Button type="submit" class="w-full h-11 rounded-xl font-semibold" :disabled="!canSubmit">
              <Loader2 v-if="authStore.isLoading" class="mr-2 size-4 animate-spin" /> 开启注册
            </Button>
            <p class="text-center text-sm text-slate-500">已有账号? <button type="button" @click="switchView('login')" class="text-primary font-semibold hover:underline">返回登录</button></p>
          </form>

          <!-- Forgot -->
          <form v-else @submit.prevent="handleAction('forgot')" class="space-y-5">
             <div class="space-y-1.5 text-center px-4">
                <p class="text-xs text-slate-500">我们将向您的邮箱发送一个重置链接，请确保邮箱填写正确。</p>
             </div>
             <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-700 ml-1">邮箱地址</label>
              <Input v-model="form.email" type="email" placeholder="name@example.com" class="h-11 bg-slate-50/50 rounded-xl" />
            </div>
            <Button type="submit" class="w-full h-11 rounded-xl font-semibold" :disabled="!canSubmit">
              <Loader2 v-if="authStore.isLoading" class="mr-2 size-4 animate-spin" /> 发送重置链接
            </Button>
            <button type="button" @click="switchView('login')" class="w-full text-center text-sm text-slate-500 font-medium hover:text-primary transition-colors flex items-center justify-center gap-1">
              <ArrowLeft class="size-3" /> 返回登录
            </button>
          </form>
        </div>
      </div>
      
      <!-- Footer -->
      <p class="text-center text-slate-400 text-[10px] mt-8 uppercase tracking-[0.2em]">Powered by AIGen-UI Engine</p>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  border-color: rgb(var(--primary-6));
  box-shadow: 0 0 0 2px rgba(var(--primary-6-rgb), 0.1);
  outline: none;
}
.animate-in {
  animation: fadeIn 0.6s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
