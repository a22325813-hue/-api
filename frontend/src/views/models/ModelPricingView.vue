<template>
  <div class="user-ui min-h-screen bg-[#fbfbfd] text-[#1d1d1f] dark:bg-dark-950 dark:text-gray-100 flex flex-col">
    <!-- Ambient Light Effects (沿用 ZH-API 柔和光晕) -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <div class="absolute -top-32 left-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl"></div>
      <div class="absolute -top-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- 置顶统一用户顶栏 -->
    <UserAppHeader />

    <!-- 主内容区 -->
    <main class="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <!-- 页面标头 -->
      <header class="text-center max-w-2xl mx-auto mb-10">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4 tracking-wide">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
          PRICING & MODELS
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-3">
          模型与价格
        </h1>
        <p class="text-sm sm:text-base text-[#6e6e73] dark:text-gray-400">
          选择模型品牌，查看各厂商支持的模型、计费规则与费率标准。
        </p>
      </header>

      <!-- 6 大品牌选择区 -->
      <section aria-label="模型品牌选择" class="mb-8">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <button
            v-for="brand in brands"
            :key="brand.id"
            type="button"
            @click="selectedBrandId = brand.id"
            :class="[
              'group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border transition-all duration-200 text-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
              selectedBrandId === brand.id
                ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-500/80 dark:border-blue-500/70 shadow-sm ring-1 ring-blue-500/30'
                : 'bg-white dark:bg-dark-900 border-black/[0.07] dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:shadow-sm'
            ]"
            :aria-pressed="selectedBrandId === brand.id"
          >
            <!-- 品牌徽标容器 (桌面端 56px，移动端 48px 大图标) -->
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-105"
              :style="{ backgroundColor: brand.bgColor }"
            >
              <svg
                :width="brand.iconSize || 32"
                :height="brand.iconSize || 32"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                fill-rule="evenodd"
                :style="{ color: brand.iconColor }"
                class="transition-colors duration-200"
              >
                <path v-for="(p, idx) in brand.paths" :key="idx" :d="p" />
              </svg>
            </div>

            <!-- 品牌主名 -->
            <span
              class="text-sm sm:text-base font-semibold tracking-tight transition-colors"
              :class="selectedBrandId === brand.id ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-[#1d1d1f] dark:text-gray-100'"
            >
              {{ brand.name }}
            </span>

            <!-- 厂商小字说明 -->
            <span class="text-xs text-[#6e6e73] dark:text-gray-400 mt-0.5">
              {{ brand.vendor }}
            </span>

            <!-- 选中高光小圆点 -->
            <div
              v-if="selectedBrandId === brand.id"
              class="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-blue-500"
              aria-hidden="true"
            ></div>
          </button>
        </div>
      </section>

      <!-- 单一品牌内容展示区 (只展示当前选中的品牌) -->
      <section
        v-if="currentBrand"
        aria-live="polite"
        class="bg-white dark:bg-dark-900 rounded-3xl border border-black/[0.07] dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-sm"
      >
        <!-- 品牌详情 Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.06] gap-4">
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-xs"
              :style="{ backgroundColor: currentBrand.bgColor }"
            >
              <svg
                :width="currentBrand.iconSize ? currentBrand.iconSize + 6 : 38"
                :height="currentBrand.iconSize ? currentBrand.iconSize + 6 : 38"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                fill-rule="evenodd"
                :style="{ color: currentBrand.iconColor }"
              >
                <path v-for="(p, idx) in currentBrand.paths" :key="idx" :d="p" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-bold text-[#1d1d1f] dark:text-white">
                  {{ currentBrand.name }}
                </h2>
                <span class="px-2 py-0.5 text-[11px] font-medium rounded-full bg-zinc-100 dark:bg-dark-800 text-zinc-600 dark:text-zinc-300">
                  {{ currentBrand.vendor }}
                </span>
              </div>
              <p class="text-xs sm:text-sm text-[#6e6e73] dark:text-gray-400 mt-1">
                {{ currentBrand.description }}
              </p>
            </div>
          </div>

          <!-- 快速动作: 前往控制台或获取密钥 -->
          <div class="flex items-center gap-2.5">
            <router-link
              to="/dashboard"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors shadow-xs"
            >
              <span>进入控制台</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- 价格表占位区域 (优雅的待补充与骨架提示，不放虚假价格) -->
        <div class="pt-8">
          <div class="rounded-2xl border border-dashed border-black/[0.1] dark:border-white/[0.1] p-8 sm:p-12 text-center bg-[#fbfbfd] dark:bg-dark-950/50">
            <div class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-[#1d1d1f] dark:text-white mb-2">
              {{ currentBrand.name }} 模型列表与价格标准筹备中
            </h3>
            <p class="text-xs sm:text-sm text-[#6e6e73] dark:text-gray-400 max-w-md mx-auto mb-6">
              已选定 {{ currentBrand.name }}（{{ currentBrand.vendor }}）。官方具体模型费率、分组折扣与端点计费正在核对中，稍后将在此处开放完整价格表。
            </p>

            <!-- 预留表格骨架示意 -->
            <div class="max-w-2xl mx-auto space-y-2 opacity-50 pointer-events-none" aria-hidden="true">
              <div class="h-8 bg-zinc-200/70 dark:bg-dark-800 rounded-lg"></div>
              <div class="h-10 bg-zinc-100 dark:bg-dark-800/60 rounded-lg"></div>
              <div class="h-10 bg-zinc-100 dark:bg-dark-800/60 rounded-lg"></div>
              <div class="h-10 bg-zinc-100 dark:bg-dark-800/60 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UserAppHeader from '@/components/layout/UserAppHeader.vue'

interface BrandItem {
  id: string
  name: string
  vendor: string
  description: string
  bgColor: string
  iconColor: string
  iconSize?: number
  paths: string[]
}

const brands: BrandItem[] = [
  {
    id: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    description: '涵盖 Opus, Sonnet, Haiku 等全系智能模型，支持长上下文与代码推理。',
    bgColor: '#FFF7ED',
    iconColor: '#D97706',
    iconSize: 30,
    paths: [
      'M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z'
    ]
  },
  {
    id: 'gpt',
    name: 'GPT',
    vendor: 'OpenAI',
    description: '涵盖 GPT-4o, o1, o3-mini 及经典大语言模型系列。',
    bgColor: '#F4F4F5',
    iconColor: '#18181B',
    iconSize: 28,
    paths: [
      'M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z'
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    description: '涵盖 Gemini 1.5 Pro, Flash 及最新一代多模态推理模型。',
    bgColor: '#EFF6FF',
    iconColor: '#2563EB',
    iconSize: 30,
    paths: [
      'M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z'
    ]
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    vendor: '深度求索',
    description: '涵盖 DeepSeek-V3, R1 满血推理及高性价比代码与通用模型。',
    bgColor: '#EEF2FF',
    iconColor: '#4F46E5',
    iconSize: 30,
    paths: [
      'M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136a9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287a.3.3 0 0 1 .113.074a.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078a.253.253 0 0 1-.114-.358a1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45'
    ]
  },
  {
    id: 'glm',
    name: 'GLM',
    vendor: '智谱 AI',
    description: '涵盖 GLM-4-Plus, GLM-4-Flash 等中英双语高性能认知大模型。',
    bgColor: '#EEF2FF',
    iconColor: '#3859FF',
    iconSize: 28,
    paths: [
      'M11.991 23.503a.24.24 0 0 0-.244.248a.24.24 0 0 0 .244.249a.24.24 0 0 0 .245-.249a.24.24 0 0 0-.22-.247zM9.671 5.365a1.697 1.697 0 0 1 1.099 2.132l-.071.172l-.016.04l-.018.054c-.07.16-.104.32-.104.498c-.035.71.47 1.279 1.186 1.314h.366c1.309.053 2.338 1.173 2.286 2.523c-.052 1.332-1.152 2.38-2.478 2.327h-.174c-.715.018-1.274.64-1.239 1.368c0 .124.018.23.053.337c.209.373.54.658.96.8c.75.23 1.517-.125 1.9-.782l.018-.035c.402-.64 1.17-.96 1.92-.711c.854.284 1.378 1.226 1.099 2.167a1.66 1.66 0 0 1-2.077 1.102a1.7 1.7 0 0 1-.907-.711l-.017-.035c-.2-.323-.463-.58-.851-.711l-.056-.018a1.646 1.646 0 0 0-1.954.746a1.66 1.66 0 0 1-1.065.764a1.677 1.677 0 0 1-1.989-1.279c-.209-.906.332-1.83 1.257-2.043a1.5 1.5 0 0 1 .296-.035h.018c.68-.071 1.151-.622 1.116-1.333a1.3 1.3 0 0 0-.227-.693a2.5 2.5 0 0 1-.366-1.403a2.4 2.4 0 0 1 .366-1.208c.14-.195.21-.444.227-.693c.018-.71-.506-1.261-1.186-1.332l-.07-.018a1.4 1.4 0 0 1-.299-.07l-.05-.019a1.7 1.7 0 0 1-1.047-2.114a1.68 1.68 0 0 1 2.094-1.101m-5.575 10.11c.26-.264.639-.367.994-.27s.633.379.728.74c.095.362-.007.748-.267 1.013c-.402.41-1.053.41-1.455 0a1.06 1.06 0 0 1 0-1.482zm14.845-.294c.359-.09.738.024.992.297c.254.274.344.665.237 1.025s-.396.634-.756.718c-.551.128-1.1-.22-1.23-.781a1.05 1.05 0 0 1 .757-1.26zm-.064-4.39c.314.32.49.753.49 1.206s-.176.886-.49 1.206c-.315.32-.74.5-1.185.5c-.444 0-.87-.18-1.184-.5a1.727 1.727 0 0 1 0-2.412a1.654 1.654 0 0 1 2.369 0m-11.243.163c.364.484.447 1.128.218 1.691a1.665 1.665 0 0 1-2.188.923c-.855-.36-1.26-1.358-.907-2.228a1.68 1.68 0 0 1 1.33-1.038a1.66 1.66 0 0 1 1.547.652'
    ]
  },
  {
    id: 'kimi',
    name: 'Kimi',
    vendor: '月之暗面',
    description: '涵盖 Moonshot 系列长文本大模型，擅长超长上下文阅读与中文长程对话。',
    bgColor: '#F4F4F5',
    iconColor: '#18181B',
    iconSize: 28,
    paths: [
      'M21.765.351C22.998.351 24 1.353 24 2.586S22.998 4.82 21.765 4.82h-1.974c-.15 0-.26-.12-.26-.26V2.586A2.237 2.237 0 0 1 21.765.35M9.41 13.388l8.447-8.377c.16-.16.07-.471-.14-.471h-4.55s-.1.02-.14.06l-9.099 9.029c-.14.14-.35.02-.35-.21V4.81c0-.15-.1-.27-.221-.27H.22c-.12 0-.22.12-.22.27v18.57c0 .15.1.27.22.27h3.137c.12 0 .22-.12.22-.27v-3.79c0-.08.03-.16.08-.21l2.826-2.796c.07-.07.16-.08.241-.03l7.546 5.551a8.9 8.9 0 0 0 4.018 1.493c.12.01.23-.11.23-.27V19.76c0-.14-.08-.25-.19-.26a5.8 5.8 0 0 1-2.355-.942l-6.533-4.73c-.14-.09-.15-.32-.03-.441'
    ]
  }
]

const selectedBrandId = ref<string>('claude')

const currentBrand = computed(() => {
  return brands.find(b => b.id === selectedBrandId.value) || brands[0]
})
</script>
