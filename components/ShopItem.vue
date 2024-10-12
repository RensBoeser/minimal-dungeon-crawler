<template>
  <div class="border border-slate-800 rounded p-2 flex gap-3">
    <ui-item-avatar size="xl" :src="src" :title="title">
      <template #panel>
        <slot name="info" />
      </template>
    </ui-item-avatar>

    <div class="flex-1">
      <div class="flex justify-between items-end">
        <h2 class="text-sm">{{ title }}</h2>

        <u-badge v-if="isBought" class="font-mono text-xs" variant="soft" color="cyan" size="xs">
          {{ $t("actions.owned") }}
        </u-badge>

        <p v-else-if="canBuy" class="font-mono text-xs dark:text-gray-300">
          {{ $n(cost) }}
          <img width="16" class="object-contain inline-block" src="~/public/gameplay/gold.webp" :alt="$t('ui.user.gold')" />
        </p>

        <p v-else class="font-mono text-xs dark:text-gray-600">
          {{ $n(cost) }}
          <img width="16" class="object-contain inline-block" src="~/public/gameplay/gold.webp" :alt="$t('ui.user.gold')" />
        </p>
      </div>

      <u-divider class="my-1" />

      <div class="flex gap-2 justify-end">
        <UPopover v-if="$slots.info" mode="click" overlay>
          <UButton size="xs" color="gray" variant="ghost">
            <span class="dark:text-gray-400">Info</span>
          </UButton>

          <template #panel>
            <slot name="info" />
          </template>
        </UPopover>

        <template v-if="!isBought">
          <UButton v-if="canBuy" size="xs" class="font-mono" variant="soft" :disabled="disabled" @click="() => emit('buy')">
            {{ $t("actions.buy") }}
          </UButton>

          <UButton v-else size="xs" variant="soft" class="font-mono" disabled>
            {{ $t("actions.buy") }}
          </UButton>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "buy"): void
}>()

const props = withDefaults(
  defineProps<{
    cost?: number
    userGold?: number
    isBought?: boolean
    disabled?: boolean
    title?: string
    src?: string
  }>(),
  {
    cost: 0,
    userGold: 0,
    isBought: false,
    disabled: false,
    title: "Item Name",
    src: undefined,
  },
)
const { cost, userGold } = toRefs(props)

const canBuy = computed(() => userGold.value >= cost.value)
</script>
