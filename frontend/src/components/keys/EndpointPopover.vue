<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClipboard } from '@/composables/useClipboard'
import type { CustomEndpoint } from '@/types'

const props = defineProps<{
  apiBaseUrl: string
  customEndpoints: CustomEndpoint[]
}>()

const { t } = useI18n()
const { copyToClipboard } = useClipboard()
const copiedEndpoint = ref<string | null>(null)

let copiedResetTimer: number | undefined

const allEndpoints = computed(() => {
  const items: Array<{ name: string; endpoint: string; description: string; isDefault: boolean }> = []
  if (props.apiBaseUrl) {
    items.push({
      name: t('keys.endpoints.title'),
      endpoint: props.apiBaseUrl,
      description: '',
      isDefault: true,
    })
  }
  for (const ep of props.customEndpoints) {
    items.push({ ...ep, isDefault: false })
  }
  return items
})

async function copy(url: string) {
  const success = await copyToClipboard(url, t('keys.endpoints.copied'))
  if (!success) return

  copiedEndpoint.value = url
  if (copiedResetTimer !== undefined) {
    window.clearTimeout(copiedResetTimer)
  }
  copiedResetTimer = window.setTimeout(() => {
    if (copiedEndpoint.value === url) {
      copiedEndpoint.value = null
    }
  }, 1800)
}

function tooltipHint(endpoint: string): string {
  return copiedEndpoint.value === endpoint
    ? t('keys.endpoints.copiedHint')
    : t('keys.endpoints.clickToCopy')
}

function speedTestUrl(endpoint: string): string {
  return `https://www.tcptest.cn/http/${encodeURIComponent(endpoint)}`
}

onBeforeUnmount(() => {
  if (copiedResetTimer !== undefined) {
    window.clearTimeout(copiedResetTimer)
  }
})
</script>

<template>
  <div v-if="allEndpoints.length > 0" class="flex flex-wrap gap-2.5">
    <div
      v-for="(item, index) in allEndpoints"
      :key="index"
      class="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 dark:bg-dark-800/80 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md transition-all hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
    >
      <span aria-hidden="true" class="flex h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"></span>
      <span class="font-bold text-gray-900 dark:text-white">{{ item.name }}</span>
      <span
        v-if="item.isDefault"
        class="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
      >{{ t('keys.endpoints.default') }}</span>

      <span class="text-gray-300 dark:text-dark-600">|</span>

      <div class="group/endpoint relative flex min-w-0 items-center gap-1.5">
        <div
          class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[24rem] -translate-x-1/2 translate-y-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left opacity-0 shadow-lg transition-all duration-150 group-hover/endpoint:translate-y-0 group-hover/endpoint:opacity-100 group-focus-within/endpoint:translate-y-0 group-focus-within/endpoint:opacity-100 dark:border-slate-700 dark:bg-slate-900"
        >
          <p v-if="item.description" class="max-w-[24rem] break-words text-xs leading-5 text-slate-600 dark:text-slate-200">{{ item.description }}</p>
          <p class="text-[11px] leading-4 text-primary-600 dark:text-primary-300" :class="item.description ? 'mt-1.5' : ''">{{ tooltipHint(item.endpoint) }}</p>
        </div>

        <code
          class="cursor-pointer break-all font-mono font-semibold text-gray-700 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-300"
          role="button"
          tabindex="0"
          :aria-label="`${tooltipHint(item.endpoint)}: ${item.endpoint}`"
          @click="copy(item.endpoint)"
          @keydown.enter.prevent="copy(item.endpoint)"
          @keydown.space.prevent="copy(item.endpoint)"
        >{{ item.endpoint }}</code>

        <button
          type="button"
          @click="copy(item.endpoint)"
          class="ml-1 rounded-full p-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          :title="tooltipHint(item.endpoint)"
          :aria-label="tooltipHint(item.endpoint)"
        >
          <svg v-if="copiedEndpoint === item.endpoint" class="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <svg v-else class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>

        <a
          :href="speedTestUrl(item.endpoint)"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-full p-1 text-gray-400 transition-colors hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400"
          :title="t('keys.endpoints.speedTest')"
          :aria-label="t('keys.endpoints.speedTest')"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
