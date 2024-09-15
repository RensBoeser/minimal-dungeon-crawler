<template>
  <div class="flex flex-wrap gap-4">
    <UserInventory v-model:experience="experience" v-model:weapon="weapon" v-model:gold="gold" v-model:inventory="inventory" class="w-80" />

    <DungeonPicker v-model:experience="experience" v-model:inventory="inventory" v-model:past-runs="pastRuns" v-model:gold="gold" class="w-80" />

    <RunHistory class="w-80" :past-runs="pastRuns" />

    <WeaponShop v-model:weapon="weapon" v-model:gold="gold" class="w-80" />
  </div>
</template>

<script setup lang="ts">
const gold = ref(0)
const weapon = ref<WeaponId>("fists")
const experience = ref(0)

const inventory = ref<Record<EnemyDropId, number>>({
  bone: 0,
  rottenMeat: 0,
  potteryShard: 0,
  oldCoin: 0,
})

const pastRuns = ref<Array<RunDungeonResult>>([])

const getInventory = async () => {
  const currentUser = await $fetch("/api/inventory")

  inventory.value = currentUser.inventory
  gold.value = currentUser.gold
  experience.value = currentUser.experience
  weapon.value = currentUser.weapon

  const runs = await $fetch("/api/dungeon/runs")
  pastRuns.value = runs
}

onMounted(getInventory)
</script>
