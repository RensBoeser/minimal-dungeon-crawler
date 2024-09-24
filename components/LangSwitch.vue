<template>
  <ClientOnly>
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }" v-bind="$attrs">
      <UButton color="gray" variant="ghost" icon="i-material-symbols:translate" />

      <template v-for="code of localeCodes" :key="code" #[code]="{ item }">
        <code class="uppercase" :class="{ 'text-primary-400': locale === item.slot }">
          {{ item.slot }}
        </code>
        <span class="truncate" :class="{ 'text-primary-400': locale === item.slot }">
          {{ item.label }}
        </span>
      </template>
    </UDropdown>
  </ClientOnly>
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
