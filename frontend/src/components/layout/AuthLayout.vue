<template>
  <div class="relative flex min-h-screen flex-col bg-[#fbfbfd] text-[#1d1d1f] dark:bg-dark-950 dark:text-gray-100 overflow-hidden">
    <!-- 全局置顶 Apple 导航栏 -->
    <AppHeader />

    <!-- Ambient Glow Orbs -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <div class="absolute -top-32 left-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl"></div>
      <div class="absolute -top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
      <div class="w-full max-w-md">
        <!-- Brand Header -->
        <div class="mb-8 text-center">
          <div class="inline-flex items-center gap-2 mb-2">
            <svg class="w-7 h-7 text-[#1d1d1f] dark:text-white" viewBox="0 0 170 170" fill="currentColor">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12.01-14.43-5.74-8.8-10.23-18.73-13.48-29.8C7.72 104.75 6.1 94.13 6.1 83.82c0-14.42 3.69-26.68 11.08-36.78 7.39-10.1 16.79-15.25 28.21-15.46 4.7 0 10.02 1.3 15.96 3.91 5.94 2.61 9.77 3.98 11.48 4.12 1.94-.14 5.97-1.57 12.1-4.29 6.12-2.72 11.39-3.97 15.8-3.77 12.03.62 21.6 4.88 28.71 12.78-10.81 6.53-16.1 15.68-15.88 27.44.22 9.14 3.65 16.78 10.28 22.92 6.64 6.14 14.54 9.54 23.71 10.19-2.22 6.74-5.07 13.48-8.54 20.21l-1.65 5.14zM119.22 33.15c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.89-10.39 19.78-12 1.09 7.39-1.37 14.38-7.38 20.97-6.01 6.59-12.8 10.49-20.35 11.7z"/>
            </svg>
            <h1 class="text-2xl font-extrabold tracking-tight">{{ siteName || 'ZH-API' }}</h1>
          </div>
          <p class="text-xs text-[#86868b] tracking-wide uppercase font-semibold">
            Study & Developer Gateway
          </p>
        </div>

        <!-- Apple Glass Card Container -->
        <div class="bg-white/90 dark:bg-dark-900/90 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 border border-black/5 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
          <slot />
        </div>

        <!-- Footer Links -->
        <div class="mt-6 text-center text-sm text-[#86868b]">
          <slot name="footer" />
        </div>

        <!-- Copyright -->
        <div class="mt-8 text-center text-xs text-[#86868b]">
          &copy; {{ currentYear }} {{ siteName || 'ZH-API' }}. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import AppHeader from './AppHeader.vue'

const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'ZH-API')
const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  appStore.fetchPublicSettings()
})
</script>

<style scoped>
.text-gradient {
  @apply bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent;
}
</style>
