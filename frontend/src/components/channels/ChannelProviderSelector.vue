<template>
  <div class="w-full">
    <!-- 顶部供应商磁贴滚动 / 自适应网格 -->
    <div
      class="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3.5"
      role="radiogroup"
      aria-label="按供应商筛选渠道"
    >
      <!-- 选项 1: 全部 -->
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === 'all'"
        @click="select('all')"
        :class="[
          'relative flex items-center sm:flex-col sm:justify-center gap-3 p-3 sm:py-3.5 sm:px-2 rounded-2xl border transition-all duration-200 text-left sm:text-center group',
          modelValue === 'all'
            ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-500/80 ring-2 ring-blue-500/20 shadow-xs'
            : 'bg-white dark:bg-dark-900 border-black/[0.07] dark:border-white/10 hover:border-black/[0.15] dark:hover:border-white/20 hover:bg-gray-50/60 dark:hover:bg-dark-800/60 shadow-2xs'
        ]"
      >
        <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-zinc-100 dark:bg-dark-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-transform duration-200 group-hover:scale-105 shrink-0">
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="min-w-0">
          <span
            :class="[
              'block text-sm font-semibold tracking-tight transition-colors',
              modelValue === 'all' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#1d1d1f] dark:text-gray-100'
            ]"
          >
            全部
          </span>
          <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            全网监控
          </span>
        </div>
        <div
          v-if="modelValue === 'all'"
          class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
          aria-hidden="true"
        />
      </button>

      <!-- 选项 2: Claude -->
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === 'claude'"
        @click="select('claude')"
        :class="[
          'relative flex items-center sm:flex-col sm:justify-center gap-3 p-3 sm:py-3.5 sm:px-2 rounded-2xl border transition-all duration-200 text-left sm:text-center group',
          modelValue === 'claude'
            ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-500/80 ring-2 ring-blue-500/20 shadow-xs'
            : 'bg-white dark:bg-dark-900 border-black/[0.07] dark:border-white/10 hover:border-black/[0.15] dark:hover:border-white/20 hover:bg-gray-50/60 dark:hover:bg-dark-800/60 shadow-2xs'
        ]"
      >
        <div
          class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0"
          :style="{ backgroundColor: CLAUDE_BRAND.bgColor }"
        >
          <svg
            :width="CLAUDE_BRAND.iconSize || 28"
            :height="CLAUDE_BRAND.iconSize || 28"
            viewBox="0 0 24 24"
            fill="currentColor"
            fill-rule="evenodd"
            :style="{ color: CLAUDE_BRAND.iconColor }"
          >
            <path v-for="(p, idx) in CLAUDE_BRAND.paths" :key="idx" :d="p" />
          </svg>
        </div>
        <div class="min-w-0">
          <span
            :class="[
              'block text-sm font-semibold tracking-tight transition-colors',
              modelValue === 'claude' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#1d1d1f] dark:text-gray-100'
            ]"
          >
            Claude
          </span>
          <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            Anthropic
          </span>
        </div>
        <div
          v-if="modelValue === 'claude'"
          class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500"
          aria-hidden="true"
        />
      </button>

      <!-- 选项 3: GPT -->
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === 'gpt'"
        @click="select('gpt')"
        :class="[
          'relative flex items-center sm:flex-col sm:justify-center gap-3 p-3 sm:py-3.5 sm:px-2 rounded-2xl border transition-all duration-200 text-left sm:text-center group',
          modelValue === 'gpt'
            ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-500/80 ring-2 ring-blue-500/20 shadow-xs'
            : 'bg-white dark:bg-dark-900 border-black/[0.07] dark:border-white/10 hover:border-black/[0.15] dark:hover:border-white/20 hover:bg-gray-50/60 dark:hover:bg-dark-800/60 shadow-2xs'
        ]"
      >
        <div
          class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0"
          :style="{ backgroundColor: GPT_BRAND.bgColor }"
        >
          <svg
            :width="GPT_BRAND.iconSize || 26"
            :height="GPT_BRAND.iconSize || 26"
            viewBox="0 0 24 24"
            fill="currentColor"
            fill-rule="evenodd"
            :style="{ color: GPT_BRAND.iconColor }"
          >
            <path v-for="(p, idx) in GPT_BRAND.paths" :key="idx" :d="p" />
          </svg>
        </div>
        <div class="min-w-0">
          <span
            :class="[
              'block text-sm font-semibold tracking-tight transition-colors',
              modelValue === 'gpt' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#1d1d1f] dark:text-gray-100'
            ]"
          >
            GPT
          </span>
          <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            OpenAI
          </span>
        </div>
        <div
          v-if="modelValue === 'gpt'"
          class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500"
          aria-hidden="true"
        />
      </button>

      <!-- 选项 4: Gemini -->
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === 'gemini'"
        @click="select('gemini')"
        :class="[
          'relative flex items-center sm:flex-col sm:justify-center gap-3 p-3 sm:py-3.5 sm:px-2 rounded-2xl border transition-all duration-200 text-left sm:text-center group',
          modelValue === 'gemini'
            ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-500/80 ring-2 ring-blue-500/20 shadow-xs'
            : 'bg-white dark:bg-dark-900 border-black/[0.07] dark:border-white/10 hover:border-black/[0.15] dark:hover:border-white/20 hover:bg-gray-50/60 dark:hover:bg-dark-800/60 shadow-2xs'
        ]"
      >
        <div
          class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0"
          :style="{ backgroundColor: GEMINI_BRAND.bgColor }"
        >
          <svg
            :width="GEMINI_BRAND.iconSize || 28"
            :height="GEMINI_BRAND.iconSize || 28"
            viewBox="0 0 24 24"
            fill="currentColor"
            fill-rule="evenodd"
            :style="{ color: GEMINI_BRAND.iconColor }"
          >
            <path v-for="(p, idx) in GEMINI_BRAND.paths" :key="idx" :d="p" />
          </svg>
        </div>
        <div class="min-w-0">
          <span
            :class="[
              'block text-sm font-semibold tracking-tight transition-colors',
              modelValue === 'gemini' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#1d1d1f] dark:text-gray-100'
            ]"
          >
            Gemini
          </span>
          <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            Google
          </span>
        </div>
        <div
          v-if="modelValue === 'gemini'"
          class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500"
          aria-hidden="true"
        />
      </button>

      <!-- 选项 5: 国模 (四宫格合并: DeepSeek + GLM + Kimi + 留白) -->
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === 'domestic'"
        @click="select('domestic')"
        :class="[
          'relative col-span-2 sm:col-span-1 flex items-center sm:flex-col sm:justify-center gap-3 p-3 sm:py-3.5 sm:px-2 rounded-2xl border transition-all duration-200 text-left sm:text-center group',
          modelValue === 'domestic'
            ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-500/80 ring-2 ring-blue-500/20 shadow-xs'
            : 'bg-white dark:bg-dark-900 border-black/[0.07] dark:border-white/10 hover:border-black/[0.15] dark:hover:border-white/20 hover:bg-gray-50/60 dark:hover:bg-dark-800/60 shadow-2xs'
        ]"
      >
        <div class="transition-transform duration-200 group-hover:scale-105 shrink-0">
          <DomesticGridIcon />
        </div>
        <div class="min-w-0">
          <span
            :class="[
              'block text-sm font-semibold tracking-tight transition-colors',
              modelValue === 'domestic' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#1d1d1f] dark:text-gray-100'
            ]"
          >
            国模
          </span>
          <span class="block text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            DeepSeek · GLM · Kimi
          </span>
        </div>
        <div
          v-if="modelValue === 'domestic'"
          class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CLAUDE_BRAND, GPT_BRAND, GEMINI_BRAND } from '@/constants/providerBrands'
import DomesticGridIcon from '@/components/channels/DomesticGridIcon.vue'

export type ProviderCategory = 'all' | 'claude' | 'gpt' | 'gemini' | 'domestic'

defineProps<{
  modelValue: ProviderCategory
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ProviderCategory): void
}>()

function select(val: ProviderCategory) {
  emit('update:modelValue', val)
}
</script>
