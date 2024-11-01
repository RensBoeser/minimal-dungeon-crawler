<template>
  <section>
    <h1 class="text-center">
      <span>{{ $t(`dungeons.${run.dungeonId}.name`) }}</span>
    </h1>

    <p class="text-center text-gray-400 text-xs mb-3">
      {{ $d(new Date(run.dateTime), "time") }}
    </p>

    <div class="flex gap-4">
      <section class="flex-1">
        <UDivider class="mb-3">
          <h2 class="text-sm">{{ $t("ui.run.enemiesDefeated") }}</h2>
        </UDivider>

        <ul class="flex flex-col">
          <li v-for="enemyRecord of enemiesDefeated" :key="enemyRecord.enemy.id" class="flex gap-2 justify-center">
            <EnemyIcon :dungeon-id="run.dungeonId" :enemy-id="enemyRecord.enemy.id" />
            <span class="font-mono">{{ enemyRecord.count }}x</span>
          </li>

          <li v-if="enemiesDefeated.length" class="text-center font-mono text-sm text-lime-300">+{{ run.xpGained }} {{ $t("ui.user.xp") }}</li>
          <li v-else class="text-center italic text-gray-400 mt-1">{{ $t("ui.run.noEnemiesDefeated") }}</li>
        </ul>
      </section>

      <section class="flex-1">
        <UDivider class="mb-3">
          <h2 class="text-sm">{{ $t("ui.run.enemyDrops") }}</h2>
        </UDivider>

        <ul class="flex flex-col">
          <li v-for="dropRecord of enemyDrops" :key="dropRecord.drop.id" class="flex gap-2 justify-center">
            <DropIcon :enemy-drop-id="dropRecord.drop.id" />
            <span class="font-mono">{{ dropRecord.count }}x</span>
            <UBadge v-if="statistics.totalDropsGathered[dropRecord.drop.id] === dropRecord.count" class="font-mono" variant="soft" color="primary">
              {{ $t("ui.general.new") }}!
            </UBadge>
          </li>

          <li v-if="!enemyDrops.length" class="text-center italic text-gray-400 mt-1">{{ $t("ui.run.noEnemyDrops") }}</li>
        </ul>
      </section>
    </div>

    <div v-if="run.levelledUpTo" class="text-center">
      <UDivider class="my-3">
        <h2 class="text-primary">{{ $t("ui.run.levelUp") }}! ({{ $t("ui.user.level") }} {{ run.levelledUpTo?.level }})</h2>
      </UDivider>

      <ul>
        <li v-if="run.levelledUpTo?.reward?.gold" class="flex gap-1 justify-center">
          <span>+{{ run.levelledUpTo?.reward?.gold }}</span>
          <img width="20px" class="object-contain" src="~/public/gameplay/gold.webp" alt="Gold" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { UserStatistics } from "~/server/utils/user"
import type { DungeonRun } from "~/utils/dungeons"

const props = defineProps<{
  run: DungeonRun
  statistics: UserStatistics
}>()
const { run, statistics } = toRefs(props)

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
