<template>
  <div class="flex flex-wrap gap-4 mb-12">
    <div class="flex flex-col gap-4 w-80 flex-grow">
      <UserDetails v-model:user="user" />
      <UserInventory v-model:user="user" class="flex-1" />
    </div>

    <DungeonRunner v-model:user="user" class="w-96 flex-grow" />

    <div class="flex flex-col gap-4 w-80 flex-grow">
      <DungeonViewer />
      <WeaponShop v-model:user="user" class="flex-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DatabaseUser } from "~/server/utils/user"

const user = ref<DatabaseUser>({
  id: "TEMP",
  experience: 0,
  gold: 0,
  weapon: "fists",
  inventory: {},
  statistics: {
    totalDropsGathered: {},
    totalDungeonRuns: {},
    totalEnemiesDefeated: {},
    totalGoldEarned: 0,
  },
})

const getUser = async () => {
  const currentUser = await $fetch("/api/inventory")
  user.value = currentUser
}

onMounted(getUser)
</script>
