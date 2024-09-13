<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">Dungeon</h1>
    </template>

    <ul>
      <li>
        <span>Type:</span>
        <UIcon class="inline-block mx-1" size="18" name="i-game-icons:crypt-entrance" />
        <span class="font-bold">Crypt</span>
      </li>
    </ul>

    <template #footer>
      <UButton icon="i-ph:sword" class="mb-3" block :loading="recovering" @click="runDungeon">
        <span v-if="recovering">Recovering...</span>
        <span v-else>Run Dungeon</span>
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

const runDungeon = async () => {
  recovering.value = true
  const runDungeonResult = await $fetch("/api/dungeon/run", { method: "POST" })

  inventory.value.bone += runDungeonResult.enemyDrops.filter((drop) => drop === "bone").length
  inventory.value.rottenMeat += runDungeonResult.enemyDrops.filter((drop) => drop === "rottenMeat").length
  experience.value += runDungeonResult.xpGained

  pastRuns.value.push(runDungeonResult)

  setTimeout(() => {
    recovering.value = false
  }, 1000)
}
</script>
