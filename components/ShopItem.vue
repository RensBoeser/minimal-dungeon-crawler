<template>
  <div class="border border-slate-800 rounded p-2 flex gap-3">
    <ui-item-avatar size="xl" :src="src" :title="title">
      <template #panel>
        <slot name="info" />
      </template>
    </ui-item-avatar>

    <div class="flex-1">
      <h2 class="text-sm">{{ title }}</h2>

      <u-divider class="mb-1" />

      <div class="flex gap-2 justify-end">
        <UPopover v-if="$slots.info" mode="click" overlay>
          <UButton size="xs" color="gray" variant="ghost">
            <span class="dark:text-gray-400">Info</span>
          </UButton>

          <template #panel>
            <slot name="info" />
          </template>
        </UPopover>

        <UButton v-if="equipped" size="xs" color="cyan" variant="soft" disabled>
          {{ $t("actions.equipped") }}
        </UButton>

        <UButton v-else-if="!isBought && userGold >= cost" size="xs" class="font-mono" variant="soft" :disabled="disabled" @click="() => emit('buy')">
          {{ $n(cost) }}
          <img width="16" class="object-contain inline-block" src="~/public/gameplay/gold.webp" :alt="$t('ui.user.gold')" />
        </UButton>

        <UButton v-else-if="!isBought" size="xs" variant="soft" class="font-mono" disabled>
          {{ $n(cost) }}
          <img width="16" class="object-contain inline-block" src="~/public/gameplay/gold.webp" :alt="$t('ui.user.gold')" />
        </UButton>

        <UButton v-else size="xs" color="primary" variant="soft" :disabled="disabled" @click="() => emit('equip')">
          {{ $t("actions.equip") }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "buy" | "equip"): void
}>()

withDefaults(
  defineProps<{
    cost?: number
    userGold?: number
    isBought?: boolean
    equipped?: boolean
    disabled?: boolean
    title?: string
    src?: string
  }>(),
  {
    cost: 0,
    userGold: 0,
    isBought: false,
    equipped: false,
    disabled: false,
    title: "Item Name",
    src: undefined,
  },
)
</script>
