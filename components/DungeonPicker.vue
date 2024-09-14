<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t('ui.dungeonPicker.title') }}</h1>
    </template>

    <ul class="h-64">
      <li>
        <span>{{ $t("ui.dungeonPicker.name" )}}:</span>
        <UIcon class="inline-block mx-1" size="18" name="i-game-icons:crypt-entrance" />
        <span class="font-bold">{{ $t(`dungeons.${dungeon.id}.name`) }}</span>
      </li>

      <li class="text-sm text-gray-400 mb-2">{{ $t(`dungeons.${dungeon.id}.description`) }}</li>

      <li>
        <span>{{ $t('ui.dungeonPicker.enemies') }}:</span>
        <div class="flex flex-wrap gap-1">
          <img
            v-for="enemy of dungeon.enemies"
            :key="enemy.id"
            class="object-contain"
            width="20px"
            :src="enemy.icon"
            :alt="$t(`enemies.${enemy.id}.name`)"
          />
        </div>
      </li>
    </ul>

    <template #footer>
      <UButton icon="i-ph:sword" block :loading="recovering" @click="runDungeon">
        <span v-if="recovering">{{ $t('actions.recovering') }}...</span>
        <span v-else>{{ $t('actions.runDungeon')}}</span>
      </UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { RunDungeonResult } from "~/server/api/dungeon/run.post"

const experience = defineModel<number>("experience", { required: true })
const inventory = defineModel<Record<EnemyDropId, number>>("inventory", { required: true })
const pastRuns = defineModel<Array<RunDungeonResult>>("pastRuns", { required: true })

const recovering = ref(false)

const dungeon = dungeons[0]

const runDungeon = async () => {
  recovering.value = true
  const runDungeonResult = await $fetch("/api/dungeon/run", { method: "POST" })

  for (const drop of runDungeonResult.enemyDrops) {
    inventory.value[drop]++
  }

  experience.value += runDungeonResult.xpGained

  pastRuns.value.push(runDungeonResult)

  setTimeout(() => {
    recovering.value = false
  }, 1000)
}
</script>
