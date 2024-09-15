<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton
      color="gray"
      variant="ghost"
      :label="locale === 'en' ? '🇬🇧 EN' : '🇳🇱 NL'"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
  </UDropdown>
</template>

<script setup lang="ts">
const { localeCodes, locale, setLocale } = useI18n()

const items = computed(() => {
  return [
    localeCodes.value.map((localeCode) => ({
      label: localeCode === "en" ? "🇬🇧 English" : "🇳🇱 Nederlands",
      click: () => setLocale(localeCode),
    })),
  ]
})
</script>
