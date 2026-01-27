<template>
  <div class="flex h-screen w-full bg-white dark:bg-slate-950 overflow-hidden">
    <!-- Sidebar Skeleton -->
    <div class="hidden md:flex w-64 flex-col border-r border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 p-4 gap-6">
      <!-- Logo Area -->
      <div class="h-10 w-32 bg-gray-200 dark:bg-slate-800 rounded-lg shimmer"></div>
      
      <!-- Nav Items -->
      <div class="flex flex-col gap-3 mt-4">
        <div v-for="i in 6" :key="`nav-${i}`" class="h-10 w-full bg-gray-200 dark:bg-slate-800 rounded-md shimmer" :style="{ animationDelay: `${i * 100}ms` }"></div>
      </div>

      <!-- User Profile Area (Bottom) -->
      <div class="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-800 shimmer"></div>
          <div class="flex-1 flex flex-col gap-2">
            <div class="h-4 w-24 bg-gray-200 dark:bg-slate-800 rounded shimmer"></div>
            <div class="h-3 w-16 bg-gray-200 dark:bg-slate-800 rounded shimmer"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col h-full overflow-hidden relative">
      <!-- Header Skeleton -->
      <div class="h-16 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-950">
        <div class="flex items-center gap-4">
          <div class="h-8 w-8 bg-gray-200 dark:bg-slate-800 rounded shimmer md:hidden"></div>
          <div class="flex flex-col gap-2">
            <div class="h-5 w-32 bg-gray-200 dark:bg-slate-800 rounded shimmer"></div>
            <div class="h-3 w-48 bg-gray-200 dark:bg-slate-800 rounded shimmer"></div>
          </div>
        </div>
        <div class="flex items-center gap-3">
            <div class="h-9 w-24 bg-gray-200 dark:bg-slate-800 rounded-full shimmer"></div>
            <div class="h-9 w-9 bg-gray-200 dark:bg-slate-800 rounded-full shimmer"></div>
        </div>
      </div>

      <!-- Page Content Skeleton -->
      <div class="flex-1 p-6 overflow-hidden flex flex-col gap-6">
        <!-- Top Filters / Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div v-for="j in 4" :key="`stat-${j}`" class="h-24 bg-gray-100 dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 p-4 flex flex-col gap-3 shimmer">
              <div class="h-4 w-8 bg-gray-200 dark:bg-slate-800 rounded"></div>
              <div class="h-8 w-20 bg-gray-200 dark:bg-slate-800 rounded"></div>
           </div>
        </div>

        <!-- Main Card / Table Area -->
        <div class="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm">
           <!-- Toolbar -->
           <div class="flex justify-between items-center mb-4">
              <div class="h-8 w-40 bg-gray-200 dark:bg-slate-800 rounded shimmer"></div>
              <div class="h-8 w-24 bg-gray-200 dark:bg-slate-800 rounded shimmer"></div>
           </div>
           
           <!-- Table Rows -->
           <div class="flex-1 flex flex-col gap-3">
              <div class="h-10 w-full bg-gray-100 dark:bg-slate-800/50 rounded shimmer mb-2"></div>
              <div v-for="k in 8" :key="`row-${k}`" class="h-12 w-full bg-gray-50 dark:bg-slate-800/30 rounded shimmer" :style="{ animationDelay: `${k * 50}ms`, opacity: 1 - (k * 0.05) }"></div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
  transform: translateX(-100%);
}

.dark .shimmer::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
