<script setup lang="ts">
import { SignIn } from '@clerk/vue'
</script>

<template>
  <div class="w-full min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-50">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
    <div class="absolute bottom-0 left-0 -z-10 w-full h-1/2 bg-[linear-gradient(to_top,rgba(var(--primary-6-rgb),0.05),transparent)]"></div>
    
    <div class="w-full max-w-[400px] flex justify-center animate-in fade-in zoom-in duration-700">
      <SignIn />
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
