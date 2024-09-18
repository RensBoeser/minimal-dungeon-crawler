<template>
  <SpeedInsights />

  <UContainer>
    <AppHeader />

    <UDivider class="mb-4" />

    <NuxtLoadingIndicator />
    <NuxtPage />
  </UContainer>
</template>

<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>
