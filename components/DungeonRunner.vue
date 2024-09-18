<template>
  <UCard>
    <template #header>
      <h1 class="text-xl">{{ $t("ui.run.title") }}</h1>
    </template>

    <template #default>
      <UButton icon="i-ph:sword" size="xl" block :loading="isRunning" class="relative" @click="startRun">
        <span v-if="isRunning">{{ $t("actions.runningDungeon") }}...</span>
        <span v-else>{{ $t("actions.runDungeon") }}</span>
      </UButton>
    </template>

    <template #footer>
      <Transition name="slide-y-fade" mode="out-in">
        <div v-if="isRunning || loading" key="progress" class="flex flex-col justify-center items-center gap-4">
          <UProgress :value="runProgress" color="amber" indicator />

          <div class="flex flex-col justify-center items-center">
            <WeaponIcon :weapon-id="weaponId" />
            <span>{{ $t("actions.fighting") }}...</span>
          </div>
        </div>

        <DungeonResultItem v-else-if="lastRun" :key="lastRun.dateTime" :run="lastRun" />

        <div v-else key="no-runs" class="text-gray-400 text-center">{{ $t("ui.run.noRuns") }}</div>
      </Transition>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const experience = defineModel<number>("experience", { required: true })
const gold = defineModel<number>("gold", { required: true })
const inventory = defineModel<Record<EnemyDropId, number>>("inventory", { required: true })

const props = defineProps<{ weaponId: WeaponId }>()
const { weaponId } = toRefs(props)

const lastRun = ref<RunDungeonResult | null>(null)
const runProgress = ref(0)

const loading = ref(false)

const { isPending: isRunning, start: startRun } = useTimeoutFn(
  async () => {
    loading.value = true
    const runDungeonResult = await $fetch("/api/dungeon/run", { method: "POST" })
    loading.value = false

    // add drops to inventory
    for (const drop of runDungeonResult.enemyDrops) {
      inventory.value[drop]++
    }

    // add gold and experience
    experience.value += runDungeonResult.xpGained
    gold.value += runDungeonResult.levelledUpTo?.reward?.gold ?? 0

    // update last run
    lastRun.value = runDungeonResult
  },
  3000,
  { immediate: false },
)

watch(isRunning, () => {
  if (!isRunning.value) {
    return
  }

  runProgress.value = 0
  easeNumber(3000, (value) => {
    runProgress.value = Math.round(value)
  })
})
</script>

<style scoped>
.slide-y-fade-enter-active,
.slide-y-fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.slide-y-fade-enter,
.slide-y-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
