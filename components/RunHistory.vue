<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t('ui.logs.title')}}</h1>
    </template>

    <ul class="max-h-72 overflow-y-auto">
      <li v-for="run of pastRuns.toReversed()" :key="run.dungeonId">
        <DungeonResultItem :run="run" />
      </li>
    </ul>
  </UCard>
</template>

<script setup lang="ts">
import type { RunDungeonResult } from "~/server/api/dungeon/run.post"

const props = defineProps<{ pastRuns: Array<RunDungeonResult> }>()
const { pastRuns } = toRefs(props)
</script>
