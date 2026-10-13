<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] flex flex-col items-center space-y-2.5"
      aria-live="polite"
      aria-atomic="true"
    >
      <TransitionGroup
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-6 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-95"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-center gap-3 px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-xl transition-all border"
          :class="[
            toast.type === 'error'
              ? 'bg-red-950/90 text-red-100 border-red-500/30'
              : 'bg-zinc-900/90 text-white border-white/15'
          ]"
        >
          <!-- Apple 极简微型状态点/图标 -->
          <div class="flex-shrink-0 flex items-center justify-center">
            <svg v-if="toast.type === 'success'" class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <svg v-else-if="toast.type === 'error'" class="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div v-else class="w-2 h-2 rounded-full bg-blue-400"></div>
          </div>

          <!-- 消息文本 -->
          <div class="text-xs md:text-sm font-medium tracking-tight whitespace-nowrap">
            <span v-if="toast.title" class="font-bold mr-1.5">{{ toast.title }}:</span>
            <span>{{ toast.message }}</span>
          </div>

          <!-- 关闭小叉号 -->
          <button
            @click="removeToast(toast.id)"
            class="ml-1 -mr-1 p-0.5 rounded-full text-zinc-400 hover:text-white transition-colors"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const toasts = computed(() => appStore.toasts)

const removeToast = (id: string) => {
  appStore.hideToast(id)
}
</script>

<style scoped>
.toast-progress {
  width: 100%;
  animation-name: toast-progress-shrink;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes toast-progress-shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
