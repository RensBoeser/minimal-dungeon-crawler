<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">Past Runs</h1>
    </template>

    <ul class="max-h-80 overflow-y-auto">
      <template v-for="run of pastRuns.toReversed()" :key="run.dungeonId">
        <li>
          <DungeonResultItem :run="run" />
        </li>
        <UDivider class="my-2" />
      </template>
    </ul>
  </UCard>
</template>

<script setup lang="ts">
import type { RunDungeonResult } from "~/server/api/dungeon/run.post"

const props = defineProps<{ pastRuns: Array<RunDungeonResult> }>()
const { pastRuns } = toRefs(props)
</script>
