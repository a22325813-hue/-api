<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { isAdminRoute } from '@/utils/uiRouteScope'
import LegacyAppLayout from './LegacyAppLayout.vue'
import UserAppLayout from './UserAppLayout.vue'

const route = useRoute()
const adminRoute = computed(() => isAdminRoute(route))
const layout = ref<{ replayTour: () => void } | null>(null)
defineExpose({ replayTour: () => layout.value?.replayTour() })
</script>

<template>
  <component :is="adminRoute ? LegacyAppLayout : UserAppLayout" ref="layout">
    <slot />
  </component>
</template>
