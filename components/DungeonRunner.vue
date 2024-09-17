<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t("ui.logs.title") }}</h1>
    </template>

    <template #default>
      <ul ref="scrollList" class="h-72 overflow-y-auto">
        <li v-for="run of pastRuns" :key="run.dateTime">
          <DungeonResultItem :run="run" />
        </li>
      </ul>
    </template>

    <template #footer>
      <UButton icon="i-ph:sword" block :loading="recovering" @click="runDungeon">
        <span v-if="recovering">{{ $t("actions.recovering") }}...</span>
        <span v-else>{{ $t("actions.runDungeon") }}</span>
      </UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const experience = defineModel<number>("experience", { required: true })
const gold = defineModel<number>("gold", { required: true })
const inventory = defineModel<Record<EnemyDropId, number>>("inventory", { required: true })
const pastRuns = defineModel<Array<RunDungeonResult>>("pastRuns", { required: true })

const recovering = ref(false)
const scrollList = ref<HTMLElement | null>(null)

const { y } = useScroll(scrollList, {
  behavior: usePreferredReducedMotion().value === "reduce" ? "instant" : "smooth",
})

watchDebounced(
  pastRuns,
  () => {
    if (scrollList.value) {
      console.log("scrolling")
      console.log(y.value, scrollList.value.scrollHeight)
      y.value = scrollList.value.scrollHeight
    }
  },
  { deep: true, immediate: true, debounce: 100 },
)

const runDungeon = async () => {
  recovering.value = true
  const runDungeonResult = await $fetch("/api/dungeon/run", { method: "POST" })

  // add drops to inventory
  for (const drop of runDungeonResult.enemyDrops) {
    inventory.value[drop]++
  }

  // add gold and experience
  experience.value += runDungeonResult.xpGained
  gold.value += runDungeonResult.levelledUpTo?.reward?.gold ?? 0

  // add run to history
  pastRuns.value.push(runDungeonResult)

  setTimeout(() => {
    recovering.value = false
  }, 1000)
}
</script>
