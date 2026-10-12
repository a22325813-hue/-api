<template>
  <div class="space-y-4">
    <!-- 顶部厂商快速切换胶囊栏 -->
    <div v-if="!hideProviderNav" class="flex flex-wrap items-center gap-2">
      <button
        v-for="provider in providerOptions"
        :key="provider.value"
        type="button"
        :disabled="provider.count === 0"
        @click="$emit('update:provider', provider.value)"
        :class="[
          'relative flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 select-none border',
          provider.value === currentProvider
            ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500/80 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-blue-500/20'
            : provider.count === 0
              ? 'opacity-40 cursor-not-allowed border-black/[0.05] dark:border-white/[0.05] bg-gray-50/50 dark:bg-dark-800/50 text-gray-400'
              : 'border-black/[0.07] dark:border-white/10 bg-white dark:bg-dark-900 text-[#1d1d1f] dark:text-gray-200 hover:border-black/20 dark:hover:border-white/20 hover:bg-gray-50/80 dark:hover:bg-dark-800/80'
        ]"
      >
        <span class="flex items-center gap-1">
          <span
            v-for="platform in KEY_GROUP_PROVIDER_ICONS[provider.value]"
            :key="platform"
            class="flex h-5 w-5 items-center justify-center rounded-md"
            :class="platformBadgeClass(platform)"
          >
            <PlatformIcon :platform="platform" size="sm" />
          </span>
        </span>
        <span>{{ provider.label }}</span>
        <span
          class="rounded-full px-1.5 py-0.2 text-[10px] font-mono"
          :class="provider.value === currentProvider ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400'"
        >
          {{ provider.count }}
        </span>
      </button>
    </div>

    <!-- 搜索过滤栏与计数 -->
    <div class="flex items-center justify-between gap-3">
      <div class="relative flex-1">
        <svg
          class="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('keys.searchGroup')"
          class="w-full rounded-xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-dark-900 py-1.5 pl-8 pr-3 text-xs sm:text-sm text-[#1d1d1f] dark:text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          v-if="searchQuery"
          type="button"
          @click="searchQuery = ''"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <span class="text-xs text-[#6e6e73] dark:text-gray-400 shrink-0">
        {{ filteredGroups.length }} 个可用分组
      </span>
    </div>

    <!-- 分组精致卡片网格 -->
    <div
      v-if="filteredGroups.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1 select-none custom-scrollbar"
    >
      <div
        v-for="group in filteredGroups"
        :key="group.value"
        @click="$emit('update:modelValue', group.value)"
        :class="[
          'group relative flex flex-col justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer text-left',
          modelValue === group.value
            ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-500 shadow-xs ring-1 ring-blue-500/30'
            : 'bg-white dark:bg-dark-900 border-black/[0.07] dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:shadow-xs'
        ]"
      >
        <!-- 头部: 平台标识 + 组名 + 状态角标 -->
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2 min-w-0">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-2xs"
              :class="platformBadgeClass(group.platform)"
            >
              <PlatformIcon :platform="group.platform" size="md" />
            </span>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <span
                  class="text-xs sm:text-sm font-bold truncate tracking-tight transition-colors"
                  :class="modelValue === group.value ? 'text-blue-600 dark:text-blue-400' : 'text-[#1d1d1f] dark:text-gray-100'"
                >
                  {{ group.label }}
                </span>
                <span
                  v-if="group.subscriptionType && group.subscriptionType !== 'standard'"
                  class="rounded-md bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 text-[10px] font-medium text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/40"
                >
                  {{ group.subscriptionType }}
                </span>
              </div>
            </div>
          </div>

          <!-- 选中高亮圆点 -->
          <div
            v-if="modelValue === group.value"
            class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white shadow-2xs"
          >
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <!-- 描述与提示 -->
        <p
          v-if="group.description"
          class="text-xs text-[#6e6e73] dark:text-gray-400 line-clamp-2 mb-2.5 leading-relaxed"
          :title="group.description"
        >
          {{ group.description }}
        </p>

        <!-- 底部: 倍率信息药丸 -->
        <div class="flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.04] mt-auto">
          <div class="flex items-center gap-1.5">
            <span
              v-if="group.rate !== undefined"
              :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold', rateBadgeClass(group.platform)]"
            >
              <template v-if="group.userRate !== null && group.userRate !== undefined && group.userRate !== group.rate">
                <span class="mr-1 line-through opacity-50">{{ group.rate }}x</span>
                <span class="font-bold">{{ group.userRate }}x</span>
              </template>
              <template v-else>
                {{ group.rate }}x 基础费率
              </template>
            </span>

            <span
              v-if="group.peakRateEnabled"
              class="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-400"
            >
              含高峰期
            </span>
          </div>

          <span class="text-[11px] font-mono text-gray-400">
            ID: {{ group.value }}
          </span>
        </div>
      </div>
    </div>

    <!-- 无结果空状态 -->
    <div
      v-else
      class="rounded-2xl border border-dashed border-black/[0.08] dark:border-white/10 p-8 text-center bg-gray-50/50 dark:bg-dark-900/50"
    >
      <div class="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-800 text-gray-400">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-xs sm:text-sm text-[#6e6e73] dark:text-gray-400">
        未找到匹配的分组，请更换搜索词或选择其他厂商
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PlatformIcon from '@/components/common/PlatformIcon.vue'
import type { GroupPlatform, SubscriptionType } from '@/types'
import { KEY_GROUP_PROVIDER_ICONS, type KeyGroupProvider } from '@/utils/keyGroupProviders'

export interface GroupCardOption {
  value: number
  label: string
  description?: string | null
  rate?: number
  userRate?: number | null
  peakRateEnabled?: boolean
  subscriptionType?: SubscriptionType
  platform: GroupPlatform
}

interface ProviderOptionItem {
  value: KeyGroupProvider
  label: string
  count: number
}

const props = withDefaults(
  defineProps<{
    modelValue: number | null
    options: GroupCardOption[]
    currentProvider?: KeyGroupProvider
    providerOptions?: ProviderOptionItem[]
    hideProviderNav?: boolean
  }>(),
  {
    modelValue: null,
    currentProvider: 'anthropic',
    providerOptions: () => [],
    hideProviderNav: false
  }
)

defineEmits<{
  (e: 'update:modelValue', value: number | null): void
  (e: 'update:provider', value: KeyGroupProvider): void
}>()

const { t } = useI18n()
const searchQuery = ref('')

const filteredGroups = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return props.options
  return props.options.filter((opt) => {
    return (
      opt.label.toLowerCase().includes(query) ||
      (opt.description && opt.description.toLowerCase().includes(query)) ||
      String(opt.value).includes(query)
    )
  })
})

function platformBadgeClass(platform: GroupPlatform): string {
  switch (platform) {
    case 'anthropic':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
    case 'openai':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
    case 'gemini':
      return 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
    case 'deepseek':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
    case 'kimi':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
    default:
      return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
  }
}

function rateBadgeClass(platform: GroupPlatform): string {
  switch (platform) {
    case 'anthropic':
      return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
    case 'openai':
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
    case 'gemini':
      return 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300'
    default:
      return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
}
:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}
</style>
