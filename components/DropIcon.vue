<template>
  <UPopover mode="hover">
    <img width="24px" class="object-contain" :src="enemyDrop.icon" :alt="$t(`drops.${enemyDropId}.name`)" />

    <template #panel>
      <DropPopoverPanel :enemy-drop-id="enemyDropId" />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const props = defineProps<{ enemyDropId: EnemyDropId }>()
const { enemyDropId } = toRefs(props)

const enemyDrop = computed(() => {
  return drops.find((drop) => drop.id === enemyDropId.value)!
})
</script>
