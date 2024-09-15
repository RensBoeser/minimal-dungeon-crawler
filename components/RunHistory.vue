<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t('ui.logs.title')}}</h1>
    </template>
      <TransitionGroup name="list" tag="ul" class="max-h-72 overflow-y-auto">
        <li v-for="run of pastRuns.toReversed()" :key="run.dateTime">
            <DungeonResultItem :run="run" />
        </li>
      </TransitionGroup>
  </UCard>
</template>

<script setup lang="ts">
import type { RunDungeonResult } from "~/server/api/dungeon/run.post"

const props = defineProps<{ pastRuns: Array<RunDungeonResult> }>()
const { pastRuns } = toRefs(props)
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease-in;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>