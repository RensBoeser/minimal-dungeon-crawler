<template>
  <ClientOnly>
    <UButton
      v-bind="$attrs"
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="() => (isDark = !isDark)"
    />
    <template #fallback>
      <UButton v-bind="$attrs" icon="i-heroicons-moon-20-solid" color="gray" variant="ghost" aria-label="Theme" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === "dark"
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  },
})
</script>
