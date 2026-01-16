<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import AppSidebar from '@/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useNavigation } from '@/config/sidebar'
import { AIChatButton, AIChatWindow } from '@/components/ai'

const { breadcrumbs, setDetailTitle } = useNavigation()

const handleSubNavClick = () => {
  if (breadcrumbs.value.detail) {
    setDetailTitle(null)
  }
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <!-- Fixed Header -->
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background z-10">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb class="flex-1">
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">
                {{ breadcrumbs.main }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block">
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <!-- Second level: clickable if detail exists -->
              <BreadcrumbLink v-if="breadcrumbs.detail" href="#" @click.prevent="handleSubNavClick">
                {{ breadcrumbs.sub }}
              </BreadcrumbLink>
              <BreadcrumbPage v-else>{{ breadcrumbs.sub }}</BreadcrumbPage>
            </BreadcrumbItem>
            
            <!-- Third level: Detail page -->
            <template v-if="breadcrumbs.detail">
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{{ breadcrumbs.detail }}</BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
        
        <!-- Teleport Target -->
        <div id="breadcrumb-actions" class="flex items-center gap-4">
          <!-- Pages teleport actions here -->
        </div>
      </header>
      
      <!-- Main Content Area -->
      <div class="flex-1 min-h-0 flex flex-col">
          <slot></slot>
      </div>
    </SidebarInset>
    
    <!-- AI Chat Components -->
    <AIChatButton />
    <AIChatWindow />
  </SidebarProvider>
</template>
