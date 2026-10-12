<template>
  <div
    class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl p-1 bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80 dark:from-dark-800 dark:via-dark-800 dark:to-indigo-950/30 border border-black/[0.06] dark:border-white/10 shadow-2xs flex flex-col justify-between"
    aria-hidden="true"
  >
    <!-- 第一行: 左上 DeepSeek, 右上 GLM -->
    <div class="flex items-center justify-between w-full h-[17px] sm:h-[19px]">
      <!-- 左上: DeepSeek -->
      <div class="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] rounded-[6px] bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center p-0.5">
        <svg
          class="w-full h-full text-[#0284C7] dark:text-sky-400"
          viewBox="0 0 24 24"
          fill="currentColor"
          fill-rule="evenodd"
        >
          <path v-for="(p, idx) in DEEPSEEK_SUB_BRAND.paths" :key="idx" :d="p" />
        </svg>
      </div>

      <!-- 右上: GLM -->
      <div class="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] rounded-[6px] bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center p-0.5">
        <svg
          class="w-full h-full text-[#4F46E5] dark:text-indigo-400"
          viewBox="0 0 24 24"
          fill="currentColor"
          fill-rule="evenodd"
        >
          <path v-for="(p, idx) in GLM_SUB_BRAND.paths" :key="idx" :d="p" />
        </svg>
      </div>
    </div>

    <!-- 第二行: 左下 Kimi, 右下 留白空格 -->
    <div class="flex items-center justify-between w-full h-[17px] sm:h-[19px]">
      <!-- 左下: Kimi -->
      <div class="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] rounded-[6px] bg-zinc-100 dark:bg-dark-700 flex items-center justify-center p-0.5">
        <svg
          class="w-full h-full text-[#18181B] dark:text-gray-100"
          viewBox="0 0 24 24"
          fill="currentColor"
          fill-rule="evenodd"
        >
          <path v-for="(p, idx) in KIMI_SUB_BRAND.paths" :key="idx" :d="p" />
        </svg>
      </div>

      <!-- 右下: 精致留白空格 (呼吸点槽位，虚线质感) -->
      <div class="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] rounded-[6px] border border-dashed border-zinc-300/80 dark:border-white/20 bg-zinc-50/50 dark:bg-white/[0.02] flex items-center justify-center">
        <span class="w-1 h-1 rounded-full bg-zinc-300 dark:bg-white/20"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEEPSEEK_SUB_BRAND, GLM_SUB_BRAND, KIMI_SUB_BRAND } from '@/constants/providerBrands'
</script>
