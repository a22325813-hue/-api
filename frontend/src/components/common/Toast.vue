<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { isAdminRoute } from '@/utils/uiRouteScope'
import LegacyToast from './LegacyToast.vue'
import UserToast from './UserToast.vue'

const route = useRoute()
const adminRoute = computed(() => isAdminRoute(route))
</script>

<template>
  <LegacyToast v-if="adminRoute" />
  <UserToast v-else />
</template>
