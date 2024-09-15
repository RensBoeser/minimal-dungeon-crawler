<template>
  <section class="mb-2">
    <UDivider>
      <UIcon class="inline-block mr-2" size="18" name="i-game-icons:crypt-entrance" />
      <h1 class="text-sm text-gray-400">
        {{ $d(new Date(run.dateTime), "time") }}
      </h1>
    </UDivider>

    <p>+{{ run.xpGained }} {{ $t('ui.user.xp') }}</p>

    <h3 v-if="enemiesDefeated.length">{{ $t('ui.logs.enemiesDefeated')}}</h3>
    <h3 v-else class="italic">{{ $t('ui.logs.noEnemiesDefeated')}}</h3>

    <div class="flex gap-3 flex-wrap">
      <div v-for="enemyRecord of enemiesDefeated" :key="enemyRecord.enemy.id" class="flex gap-1">
        <span class="font-bold">{{ enemyRecord.count }}</span>
        <EnemyIcon :dungeon-id="run.dungeonId" :enemy-id="enemyRecord.enemy.id" />
      </div>
    </div>

    <h3 v-if="enemyDrops.length">{{ $t('ui.logs.enemyDrops')}}</h3>
    <h3 v-else class="italic">{{ $t('ui.logs.noEnemyDrops')}}</h3>

    <div class="flex gap-3 flex-wrap">
      <div v-for="dropRecord of enemyDrops" :key="dropRecord.drop.id" class="flex gap-1">
        <span class="font-bold">{{ dropRecord.count }}</span>
        <DropIcon :enemy-drop-id="dropRecord.drop.id" />
      </div>
    </div>

    <template v-if="run.levelledUpTo">
      <h2 class="text-primary mt-3">{{ $t('ui.logs.levelUp') }}! ({{ $t('ui.user.level') }} {{ run.levelledUpTo.level }})</h2>

      <span>{{ $t('ui.logs.rewards') }}</span>
      <ul>
        <li v-if="run.levelledUpTo.reward?.gold" class="flex gap-1">
          <span>+{{ run.levelledUpTo.reward?.gold }}</span>
          <img width="20px" class="object-contain" src="~/public/gameplay/gold.webp" alt="Gold" />
        </li>
      </ul>
    </template>
  </section>
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
