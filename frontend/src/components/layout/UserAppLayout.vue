<template>
  <div class="user-ui min-h-screen bg-[#fbfbfd] text-[#1d1d1f] dark:bg-dark-950 dark:text-gray-100">
    <!-- Apple Ambient Blurred Background Glow -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <div class="absolute -top-32 left-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl"></div>
      <div class="absolute -top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Header (全站置顶 Apple 导航栏) -->
    <AppHeader />

    <div class="flex">
      <!-- Sidebar (左侧紧贴顶栏下方) -->
      <AppSidebar />

      <!-- Main Content Area -->
      <div
        class="relative min-h-[calc(100vh-50px)] flex-1 transition-all duration-300 z-10"
        :class="[sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64']"
      >
        <!-- Main Content -->
        <main class="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/styles/onboarding.css'
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { useOnboardingTour } from '@/composables/useOnboardingTour'
import { useOnboardingStore } from '@/stores/onboarding'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './UserAppHeader.vue'

const appStore = useAppStore()
const authStore = useAuthStore()
const sidebarCollapsed = computed(() => appStore.sidebarCollapsed)
const isAdmin = computed(() => authStore.user?.role === 'admin')

const { replayTour } = useOnboardingTour({
  storageKey: isAdmin.value ? 'admin_guide' : 'user_guide',
  autoStart: true
})

const onboardingStore = useOnboardingStore()

onMounted(() => {
  onboardingStore.setReplayCallback(replayTour)
})

defineExpose({ replayTour })
</script>
