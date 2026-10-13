<template>
  <header class="apple-nav-outer">
    <div class="apple-nav-inner">
      <!-- 1. 左侧 Brand 与移动端菜单切换按钮 -->
      <div class="flex items-center gap-2">
        <button
          v-if="user"
          @click="toggleMobileSidebar"
          class="flex lg:hidden items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          <svg class="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <router-link to="/home" class="nav-brand-group">
          <svg class="brand-apple-icon" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12.01-14.43-5.74-8.8-10.23-18.73-13.48-29.8C7.72 104.75 6.1 94.13 6.1 83.82c0-14.42 3.69-26.68 11.08-36.78 7.39-10.1 16.79-15.25 28.21-15.46 4.7 0 10.02 1.3 15.96 3.91 5.94 2.61 9.77 3.98 11.48 4.12 1.94-.14 5.97-1.57 12.1-4.29 6.12-2.72 11.39-3.97 15.8-3.77 12.03.62 21.6 4.88 28.71 12.78-10.81 6.53-16.1 15.68-15.88 27.44.22 9.14 3.65 16.78 10.28 22.92 6.64 6.14 14.54 9.54 23.71 10.19-2.22 6.74-5.07 13.48-8.54 20.21l-1.65 5.14zM119.22 33.15c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.89-10.39 19.78-12 1.09 7.39-1.37 14.38-7.38 20.97-6.01 6.59-12.8 10.49-20.35 11.7z"/>
          </svg>
          <span>{{ siteName || 'ZH-API' }}</span>
          <span class="brand-tag-pro">STUDY & DEV</span>
        </router-link>
      </div>

      <!-- 2. 中间 5 大栏目 (仅激活【主页】与【控制台】，其余保持视觉占位) -->
      <nav class="hidden md:flex items-center">
        <ul class="nav-menu-flow">
          <li>
            <router-link to="/home" :class="{ active: route.path === '/home' }">
              主页
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard" :class="{ active: isConsoleActive }">
              控制台
            </router-link>
          </li>
          <li>
            <span class="nav-placeholder-item" title="后续开放">工具链一键配置</span>
          </li>
          <li>
            <span class="nav-placeholder-item" title="后续开放">使用教程</span>
          </li>
          <li>
            <router-link to="/models" :class="{ active: isPricingActive }">
              模型与价格
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- 3. 右侧状态区域 (响应式智能切换) -->
      <div class="nav-right-cta">
        <!-- 未登录状态：显示 Apple 黑胶囊进入控制台按钮 -->
        <router-link v-if="!user" to="/login" class="btn-console-pill">
          进入控制台
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </router-link>

        <!-- 已登录状态：常驻专线状态、实时余额与用户头像下拉菜单 -->
        <div v-else class="flex items-center gap-2 sm:gap-3">
          <!-- 余额胶囊 -->
          <div class="relative group">
            <router-link
              :to="subscriptionFeatureEnabled ? '/subscriptions' : '/profile'"
              class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200/80 dark:bg-dark-800 dark:hover:bg-dark-700 transition-colors text-xs font-semibold text-zinc-900 dark:text-zinc-100"
            >
              <span class="text-zinc-400 dark:text-zinc-500 font-normal">余额:</span>
              <span>{{ formatHeaderMoney(availableBalance) }}</span>
              <span v-if="frozenBalance > 0" class="text-amber-600 dark:text-amber-300">
                {{ balanceFrozenText }} {{ formatHeaderMoney(frozenBalance) }}
              </span>
            </router-link>
          </div>

          <!-- 语言切换 (紧凑图标) -->
          <LocaleSwitcher />

          <!-- 用户头像与下拉菜单 -->
          <div class="relative" ref="dropdownRef">
            <button
              @click="toggleDropdown"
              class="flex items-center gap-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
              :aria-label="t('common.userMenu')"
            >
              <div class="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 text-xs font-semibold text-white shadow-sm ring-1 ring-black/10">
                <img
                  v-if="avatarUrl"
                  :src="avatarUrl"
                  :alt="displayName"
                  class="h-full w-full object-cover"
                />
                <span v-else>{{ userInitials }}</span>
              </div>
              <svg class="w-3.5 h-3.5 text-zinc-400 transition-transform duration-200" :class="{ 'rotate-180': dropdownOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <!-- 浮动菜单 -->
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl py-1.5 z-50 overflow-hidden text-xs"
              >
                <!-- 用户信息 -->
                <div class="px-4 py-2.5 border-b border-gray-100 dark:border-dark-800">
                  <div class="font-bold text-gray-900 dark:text-white truncate">{{ displayName }}</div>
                  <div class="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{{ user.email }}</div>
                </div>

                <div class="py-1">
                  <!-- Full navigation retains the separately served original admin frontend. -->
                  <a v-if="authStore.isAdmin" href="/admin/dashboard" @click="closeDropdown" class="flex items-center gap-2.5 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
                    <Icon name="grid" size="sm" />
                    <span>管理后台</span>
                  </a>
                  <router-link to="/dashboard" @click="closeDropdown" class="flex items-center gap-2.5 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
                    <Icon name="grid" size="sm" />
                    <span>控制台看板</span>
                  </router-link>

                  <router-link to="/keys" @click="closeDropdown" class="flex items-center gap-2.5 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
                    <Icon name="key" size="sm" />
                    <span>API 密钥管理</span>
                  </router-link>

                  <router-link to="/profile" @click="closeDropdown" class="flex items-center gap-2.5 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
                    <Icon name="user" size="sm" />
                    <span>个人中心</span>
                  </router-link>
                </div>

                <!-- 退出登录 -->
                <div class="border-t border-gray-100 dark:border-dark-800 pt-1">
                  <button
                    @click="handleLogout"
                    class="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    <span>退出登录</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import { FeatureFlags, isFeatureFlagEnabled } from '@/utils/featureFlags'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const appStore = useAppStore()

const isPricingActive = computed(() => route.path.startsWith('/models') || route.path.startsWith('/pricing'))
const isConsoleActive = computed(() => route.path !== '/home' && !isPricingActive.value)

const user = computed(() => authStore.user)
const siteName = computed(() => appStore.siteName)
const availableBalance = computed(() => Number(user.value?.balance || 0))
const frozenBalance = computed(() => Number(user.value?.frozen_balance || 0))
const balanceFrozenText = computed(() => t('common.frozenBalance') === 'common.frozenBalance' ? '冻结金额' : t('common.frozenBalance'))
const subscriptionFeatureEnabled = computed(() => isFeatureFlagEnabled(FeatureFlags.subscription))

const displayName = computed(() => user.value?.username || user.value?.email?.split('@')[0] || 'User')
const userInitials = computed(() => displayName.value.slice(0, 2).toUpperCase())
const avatarUrl = computed(() => user.value?.avatar_url || '')

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggleMobileSidebar() {
  appStore.toggleMobileSidebar()
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function closeDropdown() {
  dropdownOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

async function handleLogout() {
  closeDropdown()
  await authStore.logout()
  router.push('/login')
}

function formatHeaderMoney(val: number): string {
  return Number.isFinite(val) ? `$${val.toFixed(2)}` : '$0.00'
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.apple-nav-outer {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  height: 50px;
  transition: all 0.25s ease;
}

:global(.dark) .apple-nav-outer {
  background: rgba(18, 18, 20, 0.88);
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.apple-nav-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.nav-brand-group {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #1d1d1f;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

:global(.dark) .nav-brand-group {
  color: #ffffff;
}

.brand-apple-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.brand-tag-pro {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  background: linear-gradient(135deg, #0071e3 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 1px 6px;
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 9999px;
}

.nav-menu-flow {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 22px;
}

.nav-menu-flow a {
  text-decoration: none;
  font-size: 13px;
  color: rgba(29, 29, 31, 0.7);
  font-weight: 500;
  transition: color 0.18s ease;
  white-space: nowrap;
}

:global(.dark) .nav-menu-flow a {
  color: rgba(255, 255, 255, 0.7);
}

.nav-menu-flow a:hover {
  color: #0071e3;
}

.nav-menu-flow a.active {
  color: #1d1d1f;
  font-weight: 700;
}

:global(.dark) .nav-menu-flow a.active {
  color: #ffffff;
}

.nav-placeholder-item {
  font-size: 13px;
  color: rgba(29, 29, 31, 0.38);
  font-weight: 400;
  white-space: nowrap;
  cursor: default;
  user-select: none;
}

:global(.dark) .nav-placeholder-item {
  color: rgba(255, 255, 255, 0.35);
}

.nav-right-cta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.btn-console-pill {
  background: #1d1d1f;
  color: #ffffff;
  padding: 5px 14px;
  border-radius: 9999px;
  font-size: 12.5px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

:global(.dark) .btn-console-pill {
  background: #ffffff;
  color: #000000;
}

.btn-console-pill:hover {
  background: #0071e3;
  color: #ffffff;
  transform: translateY(-1px);
}
</style>