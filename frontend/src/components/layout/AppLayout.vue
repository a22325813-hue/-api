<script setup lang="ts">
import { ref } from 'vue'
import UserAppLayout from './UserAppLayout.vue'

const layout = ref<{ replayTour: () => void } | null>(null)
defineExpose({ replayTour: () => layout.value?.replayTour() })
</script>

<template>
  <UserAppLayout ref="layout">
    <slot />
  </UserAppLayout>
</template>

