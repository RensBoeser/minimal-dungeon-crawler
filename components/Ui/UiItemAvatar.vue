<template>
  <UPopover :class="$slots.panel === undefined ? '-mb-1.5' : undefined" :disabled="$slots.panel === undefined" overlay>
    <UAvatar class="rounded p-2 relative cursor-default" :size="size">
      <img v-if="src" :src="src" :alt="title" />
      <div v-if="count" class="font-mono text-xs absolute bottom-0 right-1" style="text-shadow: 0 0 5px rgba(0, 0, 0, 1)">{{ formattedCount }}</div>
    </UAvatar>

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
    size?: "md" | "lg" | "xl" | "2xl"
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
