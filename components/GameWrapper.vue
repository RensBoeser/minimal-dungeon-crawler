<template>
  <div v-if="user" class="flex flex-wrap gap-4 mb-12">
    <div class="flex flex-col gap-4 w-80 flex-grow">
      <UserDetails v-model:user="user" />
      <UserInventory v-model:user="user" class="flex-1" />
    </div>

    <DungeonRunner v-model:user="user" class="w-96 flex-grow" />

    <div class="flex flex-col gap-4 w-80 flex-grow">
      <DungeonViewer />
      <WeaponOverview v-model:user="user" class="flex-1" />
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-full">Loading...</div>
</template>

<script setup lang="ts">
import type { DatabaseUser } from "~/server/utils/user"

// const user = ref<DatabaseUser>({
//   id: "TEMP",
//   experience: 0,
//   gold: 0,
//   weapon: "fists",
//   inventory: {},
//   weaponsBought: [],
//   statistics: {
//     totalDropsGathered: {},
//     totalDungeonRuns: {},
//     totalEnemiesDefeated: {},
//     totalGoldEarned: 0,
//   },
// })

// const getUser = async () => {
//   const currentUser = await $fetch("/api/inventory")
//   user.value = currentUser
// }

// onMounted(getUser)

const { data: user } = useFetch<DatabaseUser>("/api/inventory")
</script>
