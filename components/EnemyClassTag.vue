<template>
  <UBadge class="font-mono" variant="subtle" :color="enemyClass.color">{{ enemyClass.id }}</UBadge>
</template>

<script setup lang="ts">
const props = defineProps<{ enemyClassId: EnemyClassId }>()
const { enemyClassId } = toRefs(props)

const enemyClass = computed(() => {
  return enemyClasses.find((enemyClass) => enemyClass.id === enemyClassId.value)!
})
</script>
