<template>
  <div class="flex gap-4">
    <UserInventory class="w-80" :experience="user.experience" :weapon="user.weapon" :gold="user.gold" :inventory="inventory" />

    <DungeonPicker class="w-60" :experience="user.experience" :inventory="inventory" :past-runs="pastRuns" />

    <WeaponShop :weapon="user.weapon" :gold="user.gold" />

    <RunHistory class="flex-1 w-80" :past-runs="pastRuns" />
  </div>
</template>

<script setup lang="ts">
import type { RunDungeonResult } from "~/server/api/dungeon/run.post"

const user = ref<{
  gold: number
  weapon: WeaponId
  experience: number
}>({
  gold: 0,
  weapon: "fists",
  experience: 0,
})

const inventory = ref<Record<EnemyDropId, number>>({
  bone: 0,
  rottenMeat: 0,
})

const pastRuns = ref<Array<RunDungeonResult>>([])

const getInventory = async () => {
  const currentUser = await $fetch("/api/inventory")

  inventory.value.bone = currentUser.bone
  inventory.value.rottenMeat = currentUser.rottenMeat
  user.value.gold = currentUser.gold
  user.value.experience = currentUser.experience
  user.value.weapon = currentUser.weapon
}

onMounted(getInventory)
</script>
