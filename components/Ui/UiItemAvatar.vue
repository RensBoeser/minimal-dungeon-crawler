<template>
  <UPopover :class="size === 'md' ? '-mb-1.5' : undefined" :disabled="$slots.panel === undefined" overlay>
    <UChip :show="!!count && count > 1" position="bottom-right" size="lg" :color="addedToCount ? 'primary' : 'gray'" inset class="cursor-default">
      <UAvatar class="rounded p-2 relative" :size="size">
        <img v-if="src" :src="src" :alt="title" />
      </UAvatar>

      <template #content>
        <span class="font-mono">{{ formattedCount }}</span>
      </template>
    </UChip>

    <template #panel>
      <slot name="panel" />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string
    title?: string
    count?: number
    size?: "md" | "lg" | "xl"
  }>(),
  {
    size: "md",
    src: undefined,
    title: undefined,
    count: 0,
  },
)
const { src, count, title } = toRefs(props)

const formattedCount = computed(() => {
  if (!count.value) {
    return 0
  }

  return count.value > 1000 ? `${(count.value / 1000).toFixed(1)}k` : count.value
})

const addedToCount = ref(0)

watch(count, (oldCount, newCount) => {
  if (!oldCount || (oldCount ?? 0) > (newCount ?? 0)) {
    addedToCount.value = (oldCount ?? 0) - (newCount ?? 0)
  }
})

watch(addedToCount, () => {
  setTimeout(() => {
    addedToCount.value = 0
  }, 1000)
})
</script>
