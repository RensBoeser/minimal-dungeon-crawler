<template>
  <UCard>
    <template #default>
      <UButton icon="i-ph:sword" block :loading="isRunning" class="relative" @click="startRun">
        <span v-if="isRunning">{{ $t("actions.runningDungeon") }}...</span>
        <span v-else>{{ $t("actions.runDungeon") }}</span>
      </UButton>
    </template>

    <template #footer>
      <div class="min-h-52 relative">
        <Transition name="slide-y-fade" mode="out-in">
          <div v-if="isRunning || loading" key="progress" class="flex flex-col justify-center items-center gap-4">
            <UProgress :value="runProgress" color="amber" indicator />

            <div class="flex flex-col justify-center items-center">
              <WeaponIcon :weapon-id="user.weapon" />
              <span>{{ $t("actions.fighting") }}...</span>
            </div>
          </div>

          <DungeonResultItem v-else-if="lastRun" :key="lastRun.dateTime" :run="lastRun" :statistics="user.statistics" />

          <div v-else key="no-runs" class="text-gray-400 text-center flex flex-col items-center">
            <span>{{ $t("ui.run.noRuns") }}</span>

            <UIcon name="i-game-icons:crypt-entrance" size="160" class="mt-4 opacity-10" />
          </div>
        </Transition>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const user = defineModel<DatabaseUser>("user", { required: true })

const lastRun = ref<DungeonRun | null>(null)
const runProgress = ref(0)
const loading = ref(false)

const { isPending: isRunning, start: startRun } = useTimeoutFn(
  async () => {
    loading.value = true
    const { run, user: currentUser } = await $fetch("/api/dungeon/run", { method: "POST" })
    loading.value = false

    user.value = currentUser
    lastRun.value = run
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
