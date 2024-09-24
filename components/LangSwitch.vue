<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton color="gray" variant="ghost" :label="locale.toUpperCase()" />

    <template v-for="code of localeCodes" :key="code" #[code]="{ item }">
      <code class="uppercase">{{ item.slot }}</code>
      <span class="truncate">{{ item.label }}</span>
    </template>
  </UDropdown>
</template>

<script setup lang="ts">
import type { UDropdown } from "#build/components"

const { localeCodes, locale, setLocale } = useI18n()

const items = computed((): InstanceType<typeof UDropdown>["items"] => {
  return [
    localeCodes.value.map((localeCode) => ({
      label: localeCode === "en" ? "English" : "Nederlands",
      slot: localeCode,
      click: () => setLocale(localeCode),
    })),
  ]
})
</script>
