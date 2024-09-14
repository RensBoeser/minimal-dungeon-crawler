<template>
  <div>
    <h2 class="text-sm text-gray-400 mb-1">{{ run.dateTime }}</h2>

    <span v-if="enemiesDefeated.length">Enemies defeated</span>
    <span v-else class="italic">No enemies defeated</span>

    <div class="flex gap-3 flex-wrap">
      <div v-for="enemyRecord of enemiesDefeated" :key="enemyRecord.enemy.id" class="flex gap-1">
        <code class="font-bold">{{ enemyRecord.count }}</code>
        <img class="object-contain" width="20px" :src="enemyRecord.enemy.icon" :alt="enemyRecord.enemy.name" />
      </div>
    </div>

    <span v-if="enemyDrops.length">Enemy drops</span>
    <span v-else class="italic">No enemy drops</span>

    <div class="flex gap-3 flex-wrap">
      <div v-for="dropRecord of enemyDrops" :key="dropRecord.drop.id" class="flex gap-1">
        <code class="font-bold">{{ dropRecord.count }}</code>
        <img class="object-contain" width="20px" :src="dropRecord.drop.icon" :alt="dropRecord.drop.name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RunDungeonResult } from "~/server/api/dungeon/run.post"

const props = defineProps<{
  run: RunDungeonResult
}>()
const { run } = toRefs(props)

const enemiesDefeated = computed(() => {
  const possibleEnemies = dungeons.find((dungeon) => dungeon.id === run.value.dungeonId)!.enemies
  const enemiesDefeated: Record<EnemyId, number> = {}

  run.value.enemiesDefeated.forEach((enemyId) => {
    if (enemyId in enemiesDefeated) {
      enemiesDefeated[enemyId]++
    } else {
      enemiesDefeated[enemyId] = 1
    }
  })

  return Object.entries(enemiesDefeated)
    .map(([enemyId, count]) => {
      const enemy = possibleEnemies.find((enemy) => enemy.id === enemyId)!

      return {
        enemy,
        count,
      }
    })
    .toSorted((a, b) => a.enemy.sortOrder - b.enemy.sortOrder)
})

const enemyDrops = computed(() => {
  const enemyDrops: Record<EnemyDropId, number> = {} as Record<EnemyDropId, number>

  run.value.enemyDrops.forEach((dropId) => {
    if (dropId in enemyDrops) {
      enemyDrops[dropId]++
    } else {
      enemyDrops[dropId] = 1
    }
  })

  return Object.entries(enemyDrops)
    .map(([dropId, count]) => {
      const drop = drops.find((drop) => drop.id === dropId)!

      return {
        drop,
        count,
      }
    })
    .toSorted((a, b) => a.drop.sortOrder - b.drop.sortOrder)
})
</script>
