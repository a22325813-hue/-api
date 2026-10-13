<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { isAdminRoute } from '@/utils/uiRouteScope'
import LegacyAppHeader from './LegacyAppHeader.vue'
import UserAppHeader from './UserAppHeader.vue'

const route = useRoute()
const adminRoute = computed(() => isAdminRoute(route))
</script>

<template>
  <LegacyAppHeader v-if="adminRoute" />
  <UserAppHeader v-else />
</template>
